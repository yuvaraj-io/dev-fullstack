export interface InquiryNotificationPayload {
  name: string;
  email?: string;
  phone?: string;
  projectType: string;
  estimatedBudget?: string;
  timeline?: string;
  details?: string;
  createdAt?: Date;
}

export function formatInquiryMessage(data: InquiryNotificationPayload): string {
  const timeStr = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return `🚀 *NEW PROJECT INQUIRY RECEIVED!*
━━━━━━━━━━━━━━━━━━━━
👤 *Client:* ${data.name}
📧 *Email:* ${data.email || "Not provided"}
📞 *Phone:* ${data.phone || "Not provided"}
💼 *Project:* ${data.projectType}
💰 *Budget:* ${data.estimatedBudget || "Custom"}
⏱️ *Timeline:* ${data.timeline || "Flexible"}

📝 *Client Brief:*
"${data.details || "No additional brief provided."}"
━━━━━━━━━━━━━━━━━━━━
⏰ *Received at:* ${timeStr} IST
🌐 *Source:* Yuvidev Pricing & Onboarding`;
}

/**
 * Dispatches an automated WhatsApp notification to your WhatsApp Business / Personal phone.
 * Supports:
 * 1. CallMeBot WhatsApp API (Free instant WhatsApp gateway)
 * 2. UltraMsg / Green API (Direct WhatsApp HTTP API)
 * 3. Twilio WhatsApp API
 * 4. Custom Webhook (Zapier, Make, Telegram, Discord, etc.)
 */
export async function sendWhatsAppInquiryNotification(
  data: InquiryNotificationPayload
): Promise<{ success: boolean; provider?: string; error?: string }> {
  const message = formatInquiryMessage(data);

  const targetPhone = (
    process.env.WHATSAPP_NOTIFICATION_PHONE ||
    process.env.ADMIN_WHATSAPP_PHONE ||
    "917204447908"
  ).replace(/\D/g, "");

  // 1. Provider: Official Meta WhatsApp Business Cloud API
  const metaPhoneId = process.env.META_WHATSAPP_PHONE_NUMBER_ID?.trim();
  const metaToken = process.env.META_WHATSAPP_TOKEN?.trim();
  if (metaPhoneId && metaToken) {
    try {
      const url = `https://graph.facebook.com/v19.0/${metaPhoneId}/messages`;
      
      // Attempt freeform text first
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${metaToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: targetPhone,
          type: "text",
          text: {
            preview_url: false,
            body: message,
          },
        }),
      });

      const resData = await res.json();
      if (res.ok && resData?.messages) {
        return { success: true, provider: "meta_cloud_api" };
      }

      // If Meta rejects freeform text (outside 24h window), try default hello_world template
      if (resData?.error?.code === 131047 || resData?.error?.message?.includes("template")) {
        const tplRes = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${metaToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to: targetPhone,
            type: "template",
            template: {
              name: "hello_world",
              language: { code: "en_US" },
            },
          }),
        });
        const tplData = await tplRes.json();
        if (tplRes.ok && tplData?.messages) {
          return { success: true, provider: "meta_cloud_api (template hello_world)" };
        }
      }

      const errMsg = resData?.error?.message || "Meta Cloud API error";
      console.error("Meta WhatsApp Cloud API error detail:", resData);
      return { success: false, provider: "meta_cloud_api", error: errMsg };
    } catch (err: any) {
      console.error("Meta WhatsApp Cloud API network error:", err);
      return { success: false, provider: "meta_cloud_api", error: err.message };
    }
  }

  // 2. Provider: CallMeBot (Free & Simple)
  const callMeBotApiKey = process.env.CALLMEBOT_API_KEY?.trim();
  if (callMeBotApiKey) {
    try {
      const url = `https://api.callmebot.com/whatsapp.php?phone=+${targetPhone}&text=${encodeURIComponent(
        message
      )}&apikey=${encodeURIComponent(callMeBotApiKey)}`;
      const res = await fetch(url, { method: "GET" });
      if (res.ok) {
        return { success: true, provider: "callmebot" };
      }
    } catch (err: any) {
      console.error("CallMeBot notification error:", err);
    }
  }

  // 3. Provider: UltraMsg Instance (Direct WhatsApp Gateway)
  const ultraMsgInstance = process.env.ULTRAMSG_INSTANCE_ID?.trim();
  const ultraMsgToken = process.env.ULTRAMSG_TOKEN?.trim();
  if (ultraMsgInstance && ultraMsgToken) {
    try {
      const formattedTo = targetPhone.startsWith("+") ? targetPhone : `+${targetPhone}`;
      const url = `https://api.ultramsg.com/${ultraMsgInstance}/messages/chat`;
      
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          token: ultraMsgToken,
          to: formattedTo,
          body: message,
        }),
      });

      const resData = await res.json();
      if (res.ok && (resData?.sent === "true" || resData?.id || resData?.message === "ok")) {
        return { success: true, provider: "ultramsg" };
      } else {
        console.warn("UltraMsg response warning:", resData);
      }
    } catch (err: any) {
      console.error("UltraMsg notification error:", err);
    }
  }

  // 3. Provider: Twilio WhatsApp
  const twilioSid = process.env.TWILIO_ACCOUNT_SID?.trim();
  const twilioAuth = process.env.TWILIO_AUTH_TOKEN?.trim();
  const twilioFrom = process.env.TWILIO_WHATSAPP_FROM?.trim() || "whatsapp:+14155238886";
  if (twilioSid && twilioAuth) {
    try {
      const authHeader = Buffer.from(`${twilioSid}:${twilioAuth}`).toString("base64");
      const res = await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${authHeader}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            From: twilioFrom.startsWith("whatsapp:") ? twilioFrom : `whatsapp:${twilioFrom}`,
            To: targetPhone.startsWith("whatsapp:") ? targetPhone : `whatsapp:+${targetPhone}`,
            Body: message,
          }),
        }
      );
      if (res.ok) {
        return { success: true, provider: "twilio" };
      }
    } catch (err: any) {
      console.error("Twilio WhatsApp notification error:", err);
    }
  }

  // 4. Provider: Generic Webhook (Zapier / Make / n8n / Discord)
  const webhookUrl = process.env.WHATSAPP_WEBHOOK_URL?.trim();
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: targetPhone,
          message,
          data,
          text: message,
          content: message,
        }),
      });
      if (res.ok) {
        return { success: true, provider: "webhook" };
      }
    } catch (err: any) {
      console.error("Generic Webhook notification error:", err);
    }
  }

  // Fallback: Log to server console so it is never lost
  console.log("=== WHATSAPP INQUIRY ALERT (Configure API key for live push) ===");
  console.log(message);
  console.log("===============================================================");

  return {
    success: false,
    error: "No WhatsApp provider API keys configured in .env.local. Logged to server console.",
  };
}
