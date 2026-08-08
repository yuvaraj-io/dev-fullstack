import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import {
  getAuthenticatedUserDocument,
  getCurrentUser,
  getSessionTokenFromCookie,
  hashPassword,
  normalizeUsername,
  SESSION_COOKIE,
  toPublicUser,
  verifyPassword,
} from "@/lib/auth";
import { cookies } from "next/headers";

async function getSessionToken() {
  const cookieStore = await cookies();
  return getSessionTokenFromCookie(cookieStore.get(SESSION_COOKIE)?.value ?? null);
}

export async function GET() {
  try {
    const user = await getCurrentUser(await getSessionToken());

    if (!user) {
      return NextResponse.json({ success: false, user: null }, { status: 401 });
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Me error", error);
    return NextResponse.json({ success: false, user: null }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const auth = await getAuthenticatedUserDocument(await getSessionToken());

    if (!auth) {
      return NextResponse.json(
        { success: false, message: "You must be signed in to update your profile." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const updates: {
      username?: string;
      fullName?: string;
      profileImage?: string;
      passwordHash?: string;
      updatedAt: Date;
    } = { updatedAt: new Date() };

    if (body?.username !== undefined) {
      const username = normalizeUsername(String(body.username ?? ""));

      if (!username) {
        return NextResponse.json(
          { success: false, message: "Username is required." },
          { status: 400 }
        );
      }

      if (username !== auth.user.username) {
        if (!/^[a-z0-9._-]{3,30}$/.test(username)) {
          return NextResponse.json(
            {
              success: false,
              message:
                "Username must be 3–30 characters and use only letters, numbers, dots, underscores, or hyphens.",
            },
            { status: 400 }
          );
        }

        const existingUser = await auth.db.collection("users").findOne({
          username,
          _id: { $ne: auth.user._id },
        });

        if (existingUser) {
          return NextResponse.json(
            { success: false, message: "Username already exists." },
            { status: 409 }
          );
        }

        updates.username = username;
      }
    }

    if (body?.fullName !== undefined) {
      const fullName = String(body.fullName ?? "").trim();

      if (!fullName) {
        return NextResponse.json(
          { success: false, message: "Name is required." },
          { status: 400 }
        );
      }

      if (fullName.length > 80) {
        return NextResponse.json(
          { success: false, message: "Name must be 80 characters or fewer." },
          { status: 400 }
        );
      }

      updates.fullName = fullName;
    }

    if (body?.removeProfileImage === true) {
      updates.profileImage = "";
    } else if (body?.profileImage !== undefined) {
      const profileImage = String(body.profileImage ?? "").trim();

      if (profileImage && !profileImage.startsWith("data:image/") && !profileImage.startsWith("/")) {
        return NextResponse.json(
          { success: false, message: "Invalid profile image." },
          { status: 400 }
        );
      }

      updates.profileImage = profileImage;
    }

    const currentPassword = body?.currentPassword !== undefined ? String(body.currentPassword) : "";
    const newPassword = body?.newPassword !== undefined ? String(body.newPassword) : "";
    const confirmPassword =
      body?.confirmPassword !== undefined ? String(body.confirmPassword) : "";
    const wantsPasswordChange = Boolean(currentPassword || newPassword || confirmPassword);

    if (wantsPasswordChange) {
      if (!currentPassword || !newPassword || !confirmPassword) {
        return NextResponse.json(
          {
            success: false,
            message: "Current password, new password, and confirmation are required.",
          },
          { status: 400 }
        );
      }

      if (newPassword.length < 6) {
        return NextResponse.json(
          { success: false, message: "New password must be at least 6 characters." },
          { status: 400 }
        );
      }

      if (newPassword !== confirmPassword) {
        return NextResponse.json(
          { success: false, message: "New password and confirmation do not match." },
          { status: 400 }
        );
      }

      if (!verifyPassword(currentPassword, auth.user.passwordHash)) {
        return NextResponse.json(
          { success: false, message: "Current password is incorrect." },
          { status: 400 }
        );
      }

      if (currentPassword === newPassword) {
        return NextResponse.json(
          { success: false, message: "New password must be different from the current password." },
          { status: 400 }
        );
      }

      updates.passwordHash = hashPassword(newPassword);
    }

    const hasProfileChanges =
      updates.username !== undefined ||
      updates.fullName !== undefined ||
      updates.profileImage !== undefined ||
      updates.passwordHash !== undefined;

    if (!hasProfileChanges) {
      return NextResponse.json(
        { success: false, message: "No profile changes provided." },
        { status: 400 }
      );
    }

    await auth.db.collection("users").updateOne(
      { _id: auth.user._id as ObjectId },
      { $set: updates }
    );

    const updatedUser = await auth.db.collection("users").findOne({ _id: auth.user._id });

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "Unable to update profile." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: wantsPasswordChange ? "Profile and password updated successfully." : undefined,
      user: toPublicUser({
        _id: updatedUser._id as ObjectId,
        username: updatedUser.username,
        fullName: updatedUser.fullName,
        profileImage: updatedUser.profileImage,
        role: updatedUser.role,
      }),
    });
  } catch (error) {
    console.error("Profile update error", error);
    return NextResponse.json(
      { success: false, message: "Unable to update profile." },
      { status: 500 }
    );
  }
}
