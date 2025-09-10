import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const auth = req.headers.get("authorization") || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7).trim() : null;
    const decoded = token
      ? (verifyToken(token) as { id?: string } | null)
      : null;
    if (!decoded?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Accept both JSON and multipart form-data
    const contentType = req.headers.get("content-type") || "";
    let firstName = "";
    let lastName = "";
    let removeAvatar = false;
    let avatarFile: File | null = null;

    if (contentType.includes("multipart/form-data")) {
      const form = await req.formData();
      firstName = String(form.get("firstName") || "");
      lastName = String(form.get("lastName") || "");
      removeAvatar = String(form.get("removeAvatar") || "false") === "true";
      const file = form.get("avatar");
      avatarFile = file instanceof File ? file : null;
    } else {
      const body = (await req.json()) as {
        firstName?: string;
        lastName?: string;
        removeAvatar?: boolean;
      };
      firstName = (body.firstName || "").trim();
      lastName = (body.lastName || "").trim();
      removeAvatar = Boolean(body.removeAvatar);
    }

    const f = (firstName || "").trim();
    const l = (lastName || "").trim();
    if (!f || !l) {
      return NextResponse.json(
        { error: "First and last name are required" },
        { status: 400 }
      );
    }

    const newName = `${f} ${l}`.replace(/\s+/g, " ").trim();

    let newImageUrl: string | null | undefined = undefined;
    if (avatarFile) {
      // Save file to public/uploads/avatars/<userId>/filename
      const bytes = await avatarFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const ext =
        avatarFile.type && avatarFile.type.includes("/")
          ? `.${avatarFile.type.split("/").pop()}`
          : path.extname(avatarFile.name) || "";
      const safeExt = ext && ext.length <= 6 ? ext : "";
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}${safeExt}`;
      const dir = path.join(
        process.cwd(),
        "public",
        "uploads",
        "avatars",
        decoded.id
      );
      await mkdir(dir, { recursive: true });
      const fullPath = path.join(dir, fileName);
      await writeFile(fullPath, buffer);
      newImageUrl = path.posix.join(
        "/uploads",
        "avatars",
        decoded.id,
        fileName
      );
    } else if (removeAvatar) {
      newImageUrl = null; // explicit remove
    }

    const data: { name: string; image?: string | null } = { name: newName };
    if (newImageUrl !== undefined) {
      data.image = newImageUrl;
    }

    const user = await prisma.user.update({
      where: { id: decoded.id },
      data,
      select: { id: true, email: true, name: true, image: true },
    });

    return NextResponse.json({ message: "Profile updated", user });
  } catch (e) {
    console.error("[update-profile]", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
