// app/api/auth/[...nextauth]/route.ts
import NextAuth, { AuthOptions } from "next-auth"; // Thêm AuthOptions
import CredentialsProvider from "next-auth/providers/credentials";

// 1. Tách cấu hình ra biến riêng và export nó
export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const isValid =
          credentials?.username === process.env.ADMIN_USERNAME &&
          credentials?.password === process.env.ADMIN_PASSWORD;

        if (isValid) {
          return { id: "1", name: "Admin", email: "admin@example.com" };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 giờ (tính bằng giây). Sau 1 ngày sẽ tự đăng xuất.
    // maxAge: 30 * 24 * 60 * 60, // Mặc định là 30 ngày
  },
  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
