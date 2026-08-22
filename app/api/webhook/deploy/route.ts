import { NextRequest, NextResponse } from "next/server";
import { exec } from "node:child_process";
import crypto from "node:crypto";

const WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET;

async function handleDeploy(req: NextRequest) {
  try {
    const rawBody = await req.text();
    
    // Only verify signature if it's a POST request from GitHub and we have a secret
    if (req.method === "POST" && WEBHOOK_SECRET) {
      const signature = req.headers.get("x-hub-signature-256");
      if (!signature) {
        return NextResponse.json({ error: "Missing GitHub signature header" }, { status: 401 });
      }

      const hmac = crypto.createHmac("sha256", WEBHOOK_SECRET);
      const digest = `sha256=${hmac.update(rawBody).digest("hex")}`;

      const isValid =
        signature.length === digest.length &&
        crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));

      if (!isValid) {
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
      }
    }

    console.log(`[WEBHOOK] Authorized ${req.method} request received. Initiating background deployment...`);

    // Execute deploy script in background detached process
    const scriptPath = process.env.DEPLOY_SCRIPT_PATH || "/var/www/dev-fullstack/scripts/deploy.sh";
    const command = `nohup bash "${scriptPath}" > /tmp/deploy.log 2>&1 &`;
    
    console.log(`[WEBHOOK] Executing command: ${command}`);

    exec(command, (error) => {
      if (error) {
        console.error("[WEBHOOK] Failed to execute deploy script:", error);
      }
    });

    console.log("[WEBHOOK] Deployment triggered. Logs will be written to /tmp/deploy.log");

    return NextResponse.json({
      success: true,
      message: "Deployment process triggered successfully in the background. Check /tmp/deploy.log on server.",
    });
  } catch (error) {
    console.error("[WEBHOOK] Webhook error:", error);
    return NextResponse.json({ error: "Internal server error triggering deployment." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  return handleDeploy(req);
}

export async function GET(req: NextRequest) {
  return handleDeploy(req);
}
