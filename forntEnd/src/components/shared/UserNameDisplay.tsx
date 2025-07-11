import { cookies } from "next/headers";

export async function UserNameDisplay() {
  const token = (await cookies()).get("accessToken")?.value;
  const getUserName = async () => {
    const response = await fetch("http://localhost:3000/api/user", {
      method: "GET",
      headers: {
        accessToken: `${token}`,
        "Content-Type": "application/json",
      },
      next: { tags: ["user"] },
    });
    const user = await response.json();
    return user.name;
  };
  return (
    <span className="text-lg text-[#F5F1ED] font-medium truncate max-w-[150px]">
      {getUserName() || "Guest"}
    </span>
  );
}