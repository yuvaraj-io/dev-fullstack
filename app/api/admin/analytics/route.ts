import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const range = searchParams.get("range") || "week"; // "day", "week", "month"
    
    const db = await getDb();
    
    let format = "%Y-%m-%d";
    const matchDate = new Date();
    
    if (range === "day") {
      format = "%Y-%m-%d %H:00"; // Hourly
      matchDate.setHours(matchDate.getHours() - 24);
    } else if (range === "week") {
      matchDate.setDate(matchDate.getDate() - 7);
      matchDate.setHours(0,0,0,0);
    } else if (range === "month") {
      matchDate.setDate(matchDate.getDate() - 30);
      matchDate.setHours(0,0,0,0);
    }

    const pipeline = [
      {
        $match: {
          timestamp: { $gte: matchDate }
        }
      },
      {
        $group: {
          _id: { 
            date: { $dateToString: { format: format, date: "$timestamp" } },
            visitorId: "$visitorId" 
          },
          views: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: "$_id.date",
          uniqueVisitors: { $sum: 1 },
          totalViews: { $sum: "$views" }
        }
      },
      {
        $sort: { "_id": 1 }
      }
    ];

    // @ts-ignore
    const results = await db.collection("analytics").aggregate(pipeline).toArray();

    // Fill in missing dates/hours with zero values to ensure continuous graph
    const filledData = [];
    
    if (range === "day") {
      for (let i = 24; i >= 0; i--) {
        const d = new Date();
        d.setHours(d.getHours() - i);
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        const hh = String(d.getHours()).padStart(2, '0');
        const dateStr = `${yyyy}-${mm}-${dd} ${hh}:00`;
        
        const existing = results.find(r => r._id === dateStr);
        filledData.push({
          label: `${hh}:00`,
          fullDate: dateStr,
          uniqueVisitors: existing ? existing.uniqueVisitors : 0,
          totalViews: existing ? existing.totalViews : 0
        });
      }
    } else {
      const days = range === "week" ? 7 : 30;
      for (let i = days - 1; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        const dateStr = `${yyyy}-${mm}-${dd}`;
        
        const existing = results.find(r => r._id === dateStr);
        filledData.push({
          label: `${mm}/${dd}`,
          fullDate: dateStr,
          uniqueVisitors: existing ? existing.uniqueVisitors : 0,
          totalViews: existing ? existing.totalViews : 0
        });
      }
    }

    return NextResponse.json({ success: true, data: filledData });
  } catch (error) {
    console.error("Analytics fetch error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
