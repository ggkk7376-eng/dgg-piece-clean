import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
import nodemailer from "nodemailer";
import { z } from "zod";

const sendEmailSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(1, "Message is required"),
    subject: z.string().optional(),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const result = sendEmailSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { error: "Invalid form data", details: result.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        const { name, email, message, subject } = result.data;
        const { payload } = await import("@/lib/payload");
        console.log("[API send-email] Processing request from:", email, "Subject:", subject);

        const settings = await payload.findGlobal({
            slug: "settings",
        });

        const emailSettings = settings.email;
        let { host, port, username, password, sender } = emailSettings || {};

        // Fallback to environment variables if CMS settings are missing
        if (!host) {
            console.log("[API send-email] CMS SMTP settings missing, falling back to Environment Variables");
            host = process.env.SMTP_HOST;
            username = process.env.SMTP_USER;
            password = process.env.SMTP_PASS;
            if (process.env.SMTP_PORT) port = parseInt(process.env.SMTP_PORT);
        }

        // Fallback sender if not configured
        if (!sender) {
            sender = process.env.SMTP_USER || "info@dggpiece.pl"; // Improve fallback
        }

        if (!host || !username || !password || !sender) {
            console.error("Missing email configuration in CMS settings");
            return NextResponse.json(
                { error: "Server misconfiguration. Please contact administrator." },
                { status: 500 }
            );
        }

        const transporter = nodemailer.createTransport({
            host,
            port: port || 587,
            secure: port === 465, // true for 465, false for other ports
            auth: {
                user: username,
                pass: password,
            },
            tls: {
                rejectUnauthorized: false,
            },
            debug: true, // Enable debug logging
            logger: true, // Log to console
        });

        // Verify connection configuration
        try {
            await transporter.verify();
            console.log("[API send-email] SMTP connection verified");
        } catch (verifyError) {
            console.error("[API send-email] SMTP Verification Failed:", verifyError);
            return NextResponse.json(
                { error: "Failed to connect to email server (SMTP)", details: verifyError instanceof Error ? verifyError.message : String(verifyError) },
                { status: 500 }
            );
        }

        const emailSubject = subject
            ? `Zapytanie o produkt: ${subject} (od ${name})`
            : `Nowa wiadomość z formularza kontaktowego: ${name}`;

        await transporter.sendMail({
            from: `"${name}" <${sender}>`, // Send AS the configured sender (to avoid spoofing blocks), but set name
            replyTo: email, // Reply to the user's email
            to: sender, // Send TO the confirmed sender (the site owner)
            subject: emailSubject,
            text: `Wiadomość od: ${name} (${email})\n\nTemat: ${subject || 'Formularz kontaktowy'}\n\nTreść:\n${message}`,
            html: `
        <h2>${emailSubject}</h2>
        <p><strong>Od:</strong> ${name} (${email})</p>
        <p><strong>Temat:</strong> ${subject || 'Formularz kontaktowy'}</p>
        <p><strong>Treść:</strong></p>
        <blockquote style="white-space: pre-wrap; background: #f9f9f9; padding: 10px; border-left: 4px solid #ccc;">${message}</blockquote>
      `,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to send email:", error);
        return NextResponse.json(
            { error: "Failed to send email. Please try again later." },
            { status: 500 }
        );
    }
}
