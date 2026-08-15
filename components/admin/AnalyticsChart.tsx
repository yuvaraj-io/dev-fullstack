"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { Box, Button, ButtonGroup, Typography, Paper, CircularProgress } from "@mui/material";

export default function AnalyticsChart() {
  const [range, setRange] = useState<"day" | "week" | "month">("week");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/analytics?range=${range}`);
        const json = await res.json();
        if (json.success) {
          setData(json.data);
        }
      } catch (err) {
        console.error("Failed to fetch analytics", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [range]);

  return (
    <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3, alignItems: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>Website Analytics</Typography>
        <ButtonGroup size="small" variant="outlined">
          <Button 
            onClick={() => setRange("day")} 
            variant={range === "day" ? "contained" : "outlined"}
          >
            Day
          </Button>
          <Button 
            onClick={() => setRange("week")} 
            variant={range === "week" ? "contained" : "outlined"}
          >
            Week
          </Button>
          <Button 
            onClick={() => setRange("month")} 
            variant={range === "month" ? "contained" : "outlined"}
          >
            Month
          </Button>
        </ButtonGroup>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 300 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ width: "100%", height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} allowDecimals={false} />
              <Tooltip 
                contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                labelStyle={{ fontWeight: "bold", marginBottom: "4px" }}
              />
              <Legend wrapperStyle={{ paddingTop: "20px" }} />
              <Line 
                type="monotone" 
                name="Total Views"
                dataKey="totalViews" 
                stroke="#14b8a6" 
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                name="Unique Visitors"
                dataKey="uniqueVisitors" 
                stroke="#7c3aed" 
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Paper>
  );
}
