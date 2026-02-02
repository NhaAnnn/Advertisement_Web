import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

// Khởi tạo transporter Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validate dữ liệu
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Thiếu thông tin bắt buộc (name, email, message)" },
        { status: 400 },
      );
    }

    // Email gửi đến công ty
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // Gửi về email công ty
      subject: `Yêu cầu tư vấn từ ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2>Yêu cầu tư vấn mới từ khách hàng</h2>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">

          <p><strong>Họ tên:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Số điện thoại:</strong> ${phone || "Không cung cấp"}</p>

          <h3 style="margin-top: 20px;">Nội dung yêu cầu:</h3>
          <p style="background: #f5f5f5; padding: 15px; border-left: 4px solid #3B82F6; white-space: pre-wrap;">
            ${message}
          </p>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="font-size: 12px; color: #999;">
            Email này được gửi tự động từ website Hoàng Thảo Anh
          </p>
        </div>
      `,
    };

    // Gửi email
    await transporter.sendMail(mailOptions);

    // Email xác nhận gửi đến khách hàng
    const confirmationEmail = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Xác nhận yêu cầu tư vấn - Hoàng Thảo Anh",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2>Cảm ơn bạn đã liên hệ!</h2>

          <p>Xin chào <strong>${name}</strong>,</p>
          <p>Chúng tôi đã nhận được yêu cầu tư vấn của bạn. Đội ngũ của Hoàng Thảo Anh sẽ liên hệ với bạn sớm nhất có thể.</p>

          <h3>Thông tin yêu cầu của bạn:</h3>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Số điện thoại:</strong> ${phone || "Không cung cấp"}</p>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p>Nếu có bất kỳ câu hỏi, vui lòng liên hệ:</p>
          <p>
            <strong>Hotline:</strong> 0909 979 376<br>
            <strong>Email:</strong> ctyhoangthaoanh@gmail.com
          </p>

          <p style="font-size: 12px; color: #999; margin-top: 30px;">
            © 2025 Hoàng Thảo Anh - In ấn & Quảng cáo
          </p>
        </div>
      `,
    };

    await transporter.sendMail(confirmationEmail);

    return NextResponse.json(
      { message: "Email gửi thành công!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Lỗi gửi email:", error);
    return NextResponse.json(
      { error: "Không thể gửi email. Vui lòng thử lại sau." },
      { status: 500 },
    );
  }
}
