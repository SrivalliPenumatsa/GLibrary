"use client";

import { Modal } from "../modal/Modal";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible as AiOutlineEyeInvisibleIcon } from "react-icons/ai";

interface MailLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MailLoginModal: React.FC<MailLoginModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      if (!e.currentTarget.checkValidity()) {
        setError("Please fix the errors in the form.");
        return;
      }

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      onClose();
      router.push("/");
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err instanceof Error ? err.message : "An error occurred during login."
      );
    }
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-[#F5E8C7] p-6 rounded-xl shadow-lg border border-[#8A6D3B] max-w-md w-full">
        <h2 className="text-xl font-semibold mb-6 text-[#5C4033]">
          Login with Email
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#5C4033]"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full p-3 border border-[#8A6D3B] rounded-lg bg-[#DAD7CE] text-[#5C4033] placeholder-[#A38579] invalid:border-[#C45E4C] focus:invalid:border-[#C45E4C]"
              placeholder="Enter your email"
              required
              maxLength={255}
            />
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#5C4033]"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              className="w-full p-3 border border-[#8A6D3B] rounded-lg bg-[#DAD7CE] text-[#5C4033] placeholder-[#A38579] invalid:border-[#C45E4C] focus:invalid:border-[#C45E4C] pr-10"
              placeholder="Enter your password"
              required
              minLength={8}
              maxLength={128}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#5C4033] hover:text-[#81322A] focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <AiOutlineEyeInvisibleIcon size={20} />
              ) : (
                <AiOutlineEye className="mt-4 mr-2" size={20} />
              )}
            </button>
          </div>
          {error && <p className="text-sm text-[#C45E4C]">{error}</p>}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#A38579] text-[#F5E8C7] rounded-lg hover:bg-[#92786D]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#D4A017] text-[#5C4033] rounded-lg hover:bg-[#B38614]"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
