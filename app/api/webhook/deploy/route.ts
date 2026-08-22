import { NextRequest, NextResponse } from "next/server";
import { exec } from "node:child_process";
import crypto from "node:crypto";

const WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-hub-signature-256");

    // If secret is configured, verify HMAC signature from GitHub
    if (WEBHOOK_SECRET) {
      if (!signature) {
        return NextResponse.json(
          { error: "Missing GitHub signature header" },
          { status: 401 }
        );
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

    let payload: { ref?: string; action?: string } = {};
    try {
      payload = JSON.parse(rawBody);
    } catch {
      console.error("[WEBHOOK] Invalid JSON body received.");
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    console.log(`[WEBHOOK] Received payload for ref: ${payload.ref}, action: ${payload.action}`);

    // Only trigger deployment when pushing/merging into master
    const targetBranch = "refs/heads/master";
    if (payload.ref && payload.ref !== targetBranch) {
      console.log(`[WEBHOOK] Ignored push to ${payload.ref}. Expected ${targetBranch}.`);
      return NextResponse.json({
        message: `Ignored push to ${payload.ref}. Only ${targetBranch} triggers deployment.`,
      });
    }

    console.log("[WEBHOOK] Ref matches master! Initiating background deployment...");

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
    return NextResponse.json(
      { error: "Internal server error triggering deployment." },
      { status: 500 }
    );
  }
}
