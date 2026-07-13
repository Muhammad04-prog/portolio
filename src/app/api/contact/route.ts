import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    console.log(`[Contact Form Submission] Name: ${name}, Email: ${email}, Message: ${message}`);

    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;

    if (telegramToken && telegramChatId) {
      const text = `📬 *New Portfolio Message*\n\n👤 *Name:* ${name}\n📧 *Email:* ${email}\n💬 *Message:* ${message}`;
      const telegramUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
      
      const response = await fetch(telegramUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text,
          parse_mode: "Markdown",
        }),
      });

      if (!response.ok) {
        console.error("Failed to send notification to Telegram:", await response.text());
      }
    }

    return NextResponse.json({ success: true, message: "Message sent successfully!" });
  } catch (error: any) {
    console.error("Error in /api/contact:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
