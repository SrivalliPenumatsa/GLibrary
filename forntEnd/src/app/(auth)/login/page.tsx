'use client'

import { signIn } from '@/auth';
import { MailLoginModal } from '@/components/auth/MailLoginModel';
import { MailSignInModal } from '@/components/auth/MailSignInModel';
import { handleGoogleSignIn } from '@/services/actions/authActions';
import { useState } from 'react';

export default function LoginPage() {
  
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleMailSignIn = () => {
    setIsSignInModalOpen(true);
  };

  const handleMailLogin = () => {
    setIsLoginModalOpen(true);
  };
  
  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-[#29221F]">
      {/* Background*/}
      <div className="absolute inset-0 bg-[url('/staticFiles/lib.jpg')] bg-cover bg-center filter blur-md brightness-75"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#29221F]/70 to-[#81322A]/70"></div>
      
      {/* Content   */}
      <div className="relative z-10 w-full max-w-5xl mx-4 bg-[#F5F1ED] bg-opacity-95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-[#A38579]/30">
        <div className="flex flex-col lg:flex-row">
          {/* Welcome  */}
          <div className="p-10 lg:p-14 lg:w-1/2 flex flex-col justify-center bg-[#F5F1ED]">
            <div className="text-center lg:text-left">
              <div className="mb-6">
                <h1 className="text-4xl font-bold text-[#81322A] mb-3">Welcome to Glass Library</h1>
              </div>
              <p className="text-[#29221F] text-lg mb-4 font-serif italic leading-relaxed">
              A bibliophile's dream—swoon over fictional crushes, scream 'Wait, what just happened?!' at twists, and geek out over every delicious detail. Because great books are better shared.
              </p>
            </div>
            <p className=" text-sm text-[#81322A] italic">
                "A reader lives a thousand lives before he dies." - George R.R. Martin
              </p>
          </div>
          
          {/* Login  */}
          <div className="p-10 lg:p-14 lg:w-1/2 bg-[#DAD7CE] flex flex-col items-center justify-center relative">
            <div className="w-full max-w-sm text-center">
              <h2 className="text-3xl font-semibold mb-6 text-[#81322A]">Continue Your Journey</h2>
              
              <form
                action={handleGoogleSignIn}
                className="w-full"
              >
                <button 
                  className="w-full px-8 py-4 bg-[#C45E4C] text-white rounded-xl font-medium hover:bg-[#B05444] 
                  transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3
                  transform hover:-translate-y-1"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.784-1.664-4.153-2.675-6.735-2.675-5.522 0-10 4.477-10 10s4.478 10 10 10c8.396 0 10-7.496 10-10 0-0.67-0.069-1.325-0.189-1.955h-9.811z"/>
                  </svg>
                  <span className="text-lg">Sign in with Google</span>
                </button>
              </form>

              <form action={handleMailSignIn}>
              <button 
                  className="w-full mt-6 px-8 py-4 bg-[#C45E4C] text-white rounded-xl font-medium hover:bg-[#B05444] 
                  transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3
                  transform hover:-translate-y-1"
                >
                  <span className="text-lg">Sign in with Email</span>
                </button>
              </form>

              <form action={handleMailLogin}>
              <button 
                  className="w-full mt-6 px-8 py-4 bg-[#C45E4C] text-white rounded-xl font-medium hover:bg-[#B05444] 
                  transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3
                  transform hover:-translate-y-1"
                >
                  <span className="text-lg">Log in with Email</span>
                </button>
              </form>
              
            </div>
          </div>
        </div>
      </div>
      <MailSignInModal isOpen={isSignInModalOpen} onClose={() => setIsSignInModalOpen(false)} />
      <MailLoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </div>
  );
}
