"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { Mail, Sparkles } from "lucide-react";

const Header = () => {
  const path = usePathname();
  const router = useRouter();

  return (
    <header className="w-full bg-slate-950/90 border-b border-slate-800/80 sticky top-0 z-40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div
          className="flex items-center gap-3 cursor-pointer select-none"
          onClick={() => router.push("/dashboard")}
        >
          <div className="p-2 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-xl shadow-md shadow-purple-500/20">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-white tracking-tight leading-none">
              ColdEmail AI
            </span>
            <span className="text-[10px] font-medium text-purple-400 tracking-wider uppercase mt-0.5">
              Outreach Dashboard
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <button
            onClick={() => router.push("/dashboard")}
            className={`transition-colors py-1 px-3 rounded-lg flex items-center gap-1.5 ${
              path === "/dashboard"
                ? "bg-purple-950/60 text-purple-300 border border-purple-800/50"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            Generator
          </button>
        </nav>

        {/* User Account Controls */}
        <div className="flex items-center gap-3">
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-9 h-9 border border-slate-700 hover:border-purple-500 transition-all",
              },
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
