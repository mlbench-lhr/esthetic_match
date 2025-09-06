import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import { verifyToken } from "@/lib/auth";

function generateEmailVerifiedTemplate(username: string): string {
  return `
  <div style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
      <h2 style="color: #2c3e50; text-align: center;">Email Verified Successfully</h2>
      <p style="font-size: 16px; color: #333;">Hi <strong>${username}</strong>,</p>
      <p style="font-size: 16px; color: #333;">
        Welcome to <strong>Esthetic</strong>! Your email address has been successfully verified.
      </p>

      <p style="font-size: 16px; color: #333;">
        Welcome to Esthetic — we're excited to have you on board!
      </p>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;" />

      <p style="font-size: 14px; color: #777;">
        Contact Support:<br/>
        Email: <a href="mailto:estheticmatch@gmail.com" style="color: #2c3e50; text-decoration: none;">estheticmatch@gmail.com</a>
      </p>
    </div>
  </div>
  `;
}

export async function POST(req: NextRequest) {
  try {
    // Admin auth: Authorization: Bearer <token>
    const auth = req.headers.get("authorization") || "";
    const token = auth?.startsWith("Bearer ") ? auth.slice(7).trim() : null;
    const decoded = token ? verifyToken(token) : null;
    if (!decoded) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { firstName, lastName, email, password } = (await req.json()) as {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    };

    if (
      !firstName?.trim() ||
      !lastName?.trim() ||
      !email?.trim() ||
      !password
    ) {
      return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
    }

    const existing = await prisma.doctor.findUnique({ where: { email } });
    if (existing && existing.emailVerified) {
      return NextResponse.json(
        { message: "Doctor already exists." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!existing) {
      await prisma.doctor.create({
        data: {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          password: hashedPassword,
          emailVerified: true,
        },
      });
    }

    const fullName = `${firstName} ${lastName}`;
    const html = generateEmailVerifiedTemplate(fullName);

    const { EMAIL_USER, EMAIL_PASS } = process.env as Record<
      string,
      string | undefined
    >;
    if (EMAIL_USER && EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: { user: EMAIL_USER, pass: EMAIL_PASS },
        });
        await transporter.sendMail({
          from: EMAIL_USER,
          to: email,
          subject: "Your Doctor Account Created",
          html,
        });
      } catch (e) {
        console.error("Email send failed:", e);
      }
    } else {
      console.log(
        `[admin-signup] Email to ${email}\nSubject: Your Doctor Account Created\n${html}`
      );
    }

    return NextResponse.json(
      { message: "Registered. You can login with your email." },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Signup error." }, { status: 500 });
  }
}
