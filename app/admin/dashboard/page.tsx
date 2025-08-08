import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  console.log("🔍 Server Session:", session);

  if (!session) {
    console.warn("⚠️ No session found. Redirecting...");
    redirect("/auth/signin");
  }

  if (session.user.role !== "admin") {
    console.warn(`⚠️ Access denied. Role '${session.user.role}' is not 'admin'`);
    redirect("/auth/signin");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mt-20">Admin Dashboard</h1>
      <p>Welcome, {session.user.name}!</p>
    </div>
  );
}
