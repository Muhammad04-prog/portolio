import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parsing middleware
  app.use(express.json());

  // API Route for contact form
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, message } = req.body;

      if (!name || !email || !message) {
        res.status(400).json({ error: "Missing required fields" });
        return;
      }

      console.log(`[Contact Form Submission] Name: ${name}, Email: ${email}, Message: ${message}`);

      // Optional integrations: Telegram & Email
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

      res.status(200).json({ success: true, message: "Message sent successfully!" });
    } catch (error: any) {
      console.error("Error in /api/contact:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Vite integration middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
