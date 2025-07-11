// import Link from "next/link";
// import NavLinks from "./NavLinks";
// import { auth, signOut } from "@/auth";
// import { FaUserCircle } from "react-icons/fa";
// import { cookies } from "next/headers";

// export default async function Sidebar() {
//   const session = await auth();

//   const handleLogout = async () => {
//     "use server";
//     (await cookies()).delete("authToken");
//     await signOut({ redirectTo: "/login" });
//   };
//   const token = (await cookies()).get("authToken");
//   const getUserName = async () => {
//     const response = await fetch("http://localhost:3000/api/user", {
//       method: "GET",
//       headers: {
//         JwtToken: `${token?.value}`,
//         "Content-Type": "application/json",
//       },
//       next: { tags: ["user"] },
//     });
//     const user = await response.json();
//     return user.name;
//   };

//   return (
//     <div className="h-full p-4 flex flex-col bg-[#81322A] shadow-[4px_0_15px_rgba(0,0,0,0.2)] border-r border-[#5A241F]">
//       <Link
//         className="mb-1 flex flex-col items-center justify-center p-4 hover:bg-[#6B2A23] rounded-xl transition-colors duration-200"
//         href="/"
//       >
//         <div className="text-2xl mb-4 font-bold text-center text-[#F5F1ED] tracking-wide">
//           Glass Library
//         </div>
//         <div className="flex items-center justify-center gap-3 p-2  rounded-lg">
//           <FaUserCircle className="w-8 h-8 text-[#F5F1ED]" />
//           <span className="text-lg text-[#F5F1ED] font-medium truncate max-w-[150px]">
//             {session ? session.user.name : getUserName()}
//           </span>
//         </div>
//       </Link>

//       <div className="flex-1 p-4 mt-3 bg-[#F5F1ED] rounded-xl border border-[#A38579] shadow-inner">
//         <NavLinks token={token?.value} />
//         <div className="h-auto w-full grow"></div>
//         <form action={handleLogout}>
//           <button className="w-full mt-4 p-3 rounded-lg bg-[#C45E4C] text-white hover:bg-[#B05444] transition-colors duration-200 font-medium shadow-md hover:shadow-lg">
//             Logout
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { SignOutButton } from "./SignOutButton";
import { cookies } from "next/headers";
import NavLinks from "./NavLinks";
import { UserProvider } from "../../services/contexts/UserContext";
import { UserNameDisplay } from "./UserNameDisplay"; // New client component

export default async function Sidebar() {

  return (
    <UserProvider>
      <SidebarContent/>
    </UserProvider>
  );
}

async function SidebarContent() {
  return (
    <div className="h-full p-4 flex flex-col bg-[#81322A] shadow-[4px_0_15px_rgba(0,0,0,0.2)] border-r border-[#5A241F]">
      <Link
        href="/"
        className="mb-1 flex flex-col items-center justify-center p-4 hover:bg-[#6B2A23] rounded-xl transition-colors duration-200"
      >
        <div className="text-2xl mb-4 font-bold text-center text-[#F5F1ED] tracking-wide">
          Glass Library
        </div>
        <div className="flex items-center justify-center gap-3 p-2 rounded-lg">
          <FaUserCircle className="w-8 h-8 text-[#F5F1ED]" />
          <UserNameDisplay/>
        </div>
      </Link>

      <div className="flex-1 p-4 mt-3 bg-[#F5F1ED] rounded-xl border border-[#A38579] shadow-inner">
        <NavLinks />
        <div className="h-auto w-full grow"></div>
        <SignOutButton  />
      </div>
    </div>
  );
}