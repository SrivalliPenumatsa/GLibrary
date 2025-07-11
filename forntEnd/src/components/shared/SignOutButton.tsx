"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useUser } from "@/services/contexts/UserContext";

export function SignOutButton() {
  const router = useRouter();
  const { setUser } = useUser();

  const handleLogout = async () => {
    try {
      setUser(null);

      await signOut({ redirect: false });

      await fetch("/api/auth/logout", { method: "POST" });

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full mt-4 p-3 rounded-lg bg-[#C45E4C] text-white hover:bg-[#B05444] transition-colors duration-200 font-medium shadow-md hover:shadow-lg"
    >
      Logout
    </button>
  );
}
