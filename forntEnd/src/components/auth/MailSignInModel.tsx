"use client";

import { Modal } from "../modal/Modal";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEyeInvisible as AiOutlineEyeInvisibleIcon } from "react-icons/ai";

interface MailSignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MailSignInModal: React.FC<MailSignInModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();


  const validatePasswordMatch = (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) return "Passwords do not match.";
    if (!/[A-Z]/.test(password))
      return "Password must contain at least one uppercase letter.";
    if (!/[0-9]/.test(password))
      return "Password must contain at least one number.";
    if (!/[!@#$%^&*]/.test(password))
      return "Password must contain at least one special character (!@#$%^&*).";
    return null;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const username = formData.get("username") as string;

    const passwordError = validatePasswordMatch(password, confirmPassword);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    try {
      if (!e.currentTarget.checkValidity()) {
        setError("Please fix the errors in the form.");
        return;
      }

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, username }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Sign-in failed");
      }

      const data = await response.json();

      onClose();
      router.push("/");
    } catch (err) {
      console.error("Sign-in error:", err);
      setError(
        err instanceof Error ? err.message : "An error occurred during sign-in."
      );
    }
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-[#F5E8C7] p-6 rounded-xl shadow-lg border border-[#8A6D3B] max-w-md w-full">
        <h2 className="text-xl font-semibold mb-6 text-[#5C4033]">
          Sign In with Email
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-[#5C4033]"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              className="w-full p-3 border border-[#8A6D3B] rounded-lg bg-[#DAD7CE] text-[#5C4033] placeholder-[#A38579] invalid:border-[#C45E4C] focus:invalid:border-[#C45E4C]"
              placeholder="Enter your username"
              required
              minLength={3}
              maxLength={50}
              pattern="^[a-zA-Z0-9_]+$"
              title="Username must contain only letters, numbers, and underscores."
            />
          </div>
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
          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-[#5C4033]"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              className="w-full p-3 border border-[#8A6D3B] rounded-lg bg-[#DAD7CE] text-[#5C4033] placeholder-[#A38579] invalid:border-[#C45E4C] focus:invalid:border-[#C45E4C] pr-10"
              placeholder="Confirm your password"
              required
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#5C4033] hover:text-[#81322A] focus:outline-none"
              aria-label={
                showConfirmPassword
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
            >
              {showConfirmPassword ? (
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
              Sign In
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
