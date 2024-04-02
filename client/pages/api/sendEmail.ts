import { NextApiRequest, NextApiResponse } from "next";
const nodemailer = require("nodemailer");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Preflight Check:
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  // Allow only POST Methods
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  if (req.method === "POST") {
    const { from, to, subject, text } = req.body;
    const transporter = nodemailer.createTransport({
      host: "127.0.0.1",
      port: 1025,
      ignoreTLS: true,
    });

    try {
      await transporter.sendMail({
        from,
        to,
        subject,
        text,
      });
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Failed to send email" });
    }
  }
}
