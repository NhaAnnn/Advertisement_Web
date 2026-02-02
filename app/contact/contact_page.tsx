"use client"; // File này bắt buộc phải là Client Component

import React, { useState, useRef } from "react";
import { Send, Loader2 } from "lucide-react";

// Cấu hình Google Form
const GOOGLE_FORM_CONFIG = {
  URL: "https://docs.google.com/forms/d/e/1FAIpQLSe6mYTbFhYkYRJ6am4vP7Nrc3ev4T0LPH3KdSTGeSuJ30Q-mw/formResponse",
  ENTRY_IDS: {
    NAME: "entry.657724628",
    PHONE: "entry.75967512",
    EMAIL: "entry.1327365006",
    MESSAGE: "entry.793401319",
  },
};

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const googleFormData = new FormData();

    googleFormData.append(
      GOOGLE_FORM_CONFIG.ENTRY_IDS.NAME,
      (formData.get("user_name") as string) || "",
    );
    googleFormData.append(
      GOOGLE_FORM_CONFIG.ENTRY_IDS.PHONE,
      (formData.get("user_phone") as string) || "",
    );
    googleFormData.append(
      GOOGLE_FORM_CONFIG.ENTRY_IDS.EMAIL,
      (formData.get("user_email") as string) || "",
    );
    googleFormData.append(
      GOOGLE_FORM_CONFIG.ENTRY_IDS.MESSAGE,
      (formData.get("message") as string) || "",
    );

    try {
      await fetch(GOOGLE_FORM_CONFIG.URL, {
        method: "POST",
        body: googleFormData,
        mode: "no-cors",
      });
      alert("Gửi yêu cầu thành công! Chúng tôi sẽ liên hệ lại sớm nhất.");
      formRef.current?.reset();
    } catch (error) {
      console.error("Lỗi gửi form:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface p-8 md:p-12 rounded-sm border border-border relative shadow-sm">
      <h3 className="text-3xl font-serif text-foreground mb-2">Gửi tin nhắn</h3>
      <p className="text-muted text-sm mb-10">
        Điền thông tin bên dưới, chúng tôi sẽ phản hồi trong vòng 24h.
      </p>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2 group">
            <label className="text-xs font-bold uppercase tracking-widest text-muted group-focus-within:text-primary transition-colors">
              Họ và tên
            </label>
            <input
              type="text"
              name="user_name"
              required
              className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted/30 focus:outline-none focus:border-primary transition-colors"
              placeholder="Nguyễn Văn A"
            />
          </div>
          <div className="space-y-2 group">
            <label className="text-xs font-bold uppercase tracking-widest text-muted group-focus-within:text-primary transition-colors">
              Số điện thoại
            </label>
            <input
              type="tel"
              name="user_phone"
              required
              className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted/30 focus:outline-none focus:border-primary transition-colors"
              placeholder="0909 xxx xxx"
            />
          </div>
        </div>

        <div className="space-y-2 group">
          <label className="text-xs font-bold uppercase tracking-widest text-muted group-focus-within:text-primary transition-colors">
            Email
          </label>
          <input
            type="email"
            name="user_email"
            required
            className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted/30 focus:outline-none focus:border-primary transition-colors"
            placeholder="example@gmail.com"
          />
        </div>

        <div className="space-y-2 group">
          <label className="text-xs font-bold uppercase tracking-widest text-muted group-focus-within:text-primary transition-colors">
            Nội dung cần tư vấn
          </label>
          <textarea
            name="message"
            required
            rows={4}
            className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted/30 focus:outline-none focus:border-primary transition-colors resize-none"
            placeholder="Tôi quan tâm đến dịch vụ in bao bì..."
          />
        </div>

        <div className="pt-6">
          <button
            type="submit"
            disabled={loading}
            className="group relative px-10 py-4 bg-primary text-white font-bold uppercase tracking-widest rounded-sm hover:shadow-lg hover:bg-primary-dark transition-all flex items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                Đang gửi... <Loader2 className="w-4 h-4 animate-spin" />
              </>
            ) : (
              <>
                Gửi yêu cầu{" "}
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
