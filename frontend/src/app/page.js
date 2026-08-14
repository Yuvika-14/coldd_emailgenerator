"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Sparkles, ArrowRight, Zap, Target, Mail, CheckCircle, ChevronDown } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [openFAQ, setOpenFAQ] = useState(null);

  const handleTryForFree = () => {
    router.push("/sign-in?redirect_url=/dashboard");
  };

  const scrollToHowItWorks = () => {
    const element = document.getElementById("how-it-works") || document.getElementById("demo");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToFAQ = () => {
    document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center selection:bg-purple-500 selection:text-white">
      {/* Top Navigation Bar */}
      <nav className="w-full max-w-7xl px-6 py-4 flex items-center justify-between border-b border-slate-800/80 backdrop-blur-md sticky top-0 z-50 bg-slate-950/80">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push("/")}>
          <div className="p-2 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-xl shadow-lg shadow-purple-500/20">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">ColdEmail AI</span>
        </div>

        <ul className="hidden md:flex gap-8 items-center text-sm font-medium text-slate-300">
          <li className="hover:text-purple-400 transition-colors cursor-pointer" onClick={() => router.push("/dashboard")}>
            Dashboard
          </li>
          <li className="hover:text-purple-400 transition-colors cursor-pointer" onClick={scrollToHowItWorks}>
            How It Works
          </li>
          <li className="hover:text-purple-400 transition-colors cursor-pointer" onClick={scrollToFAQ}>
            FAQ
          </li>
        </ul>

        <button
          onClick={handleTryForFree}
          className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl font-medium shadow-md hover:shadow-purple-500/25 transition-all text-sm flex items-center gap-2"
        >
          Get Started
          <ArrowRight className="w-4 h-4" />
        </button>
      </nav>

      {/* Hero Section */}
      <main className="w-full max-w-5xl px-6 pt-24 pb-16 text-center space-y-8 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-800/60 bg-purple-950/40 text-purple-300 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          AI-Powered Job Outreach
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight max-w-4xl leading-tight">
          Generate Hyper-Personalized Cold Emails for <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Any Job Application</span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl font-normal leading-relaxed">
          Instantly parse job posting requirements, match them against your technical portfolio, and draft tailored emails that get responses from recruiters.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            onClick={handleTryForFree}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-lg font-semibold shadow-xl shadow-purple-500/20 hover:shadow-purple-500/35 transition-all flex items-center justify-center gap-3"
          >
            Start Generating Emails
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Feature Highlights / How It Works Section */}
        <section id="how-it-works" className="w-full pt-16 space-y-6 scroll-mt-24">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">How It Works</h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">
              Transform job links into hyper-personalized cold emails in three simple steps.
            </p>
          </div>

          <div id="demo" className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
            <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-3">
              <div className="w-10 h-10 bg-purple-950/80 border border-purple-800/50 rounded-xl flex items-center justify-center text-purple-400">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">Automated Scraping</h3>
              <p className="text-slate-400 text-sm">
                Paste any job link. Our LLM pipeline extracts roles, required years of experience, and key technical stack requirements automatically.
              </p>
            </div>

            <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-3">
              <div className="w-10 h-10 bg-indigo-950/80 border border-indigo-800/50 rounded-xl flex items-center justify-center text-indigo-400">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">ChromaDB Vector Matching</h3>
              <p className="text-slate-400 text-sm">
                Vector store matching queries your exact portfolio projects to include the most relevant project links in every cold email.
              </p>
            </div>

            <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-3">
              <div className="w-10 h-10 bg-emerald-950/80 border border-emerald-800/50 rounded-xl flex items-center justify-center text-emerald-400">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">One-Click Outreach</h3>
              <p className="text-slate-400 text-sm">
                Get concise, professional cold email drafts ready to send to hiring managers and recruiters in seconds.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* FAQ Section */}
      <section id="faq" className="w-full max-w-3xl px-6 py-20 border-t border-slate-800/80 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-white">Frequently Asked Questions</h2>
          <p className="text-slate-400 text-sm">Everything you need to know about ColdEmail AI</p>
        </div>

        <div className="space-y-4">
          {[
            {
              question: "How does ColdEmail AI customize emails for each job?",
              answer: "It scrapes the job posting URL, extracts explicit skills and experience requirements, and performs similarity search on your portfolio CSV using ChromaDB to highlight the best matching project."
            },
            {
              question: "What job sites and links are supported?",
              answer: "ColdEmail AI works with public job postings across LinkedIn, Lever, Greenhouse, Workday, company career pages, and direct job site URLs."
            },
            {
              question: "Can I customize candidate information?",
              answer: "Yes, candidate details and skills are retrieved from your candidate text profile and matched against the exact requirements of the job."
            }
          ].map((faq, index) => (
            <div key={index} className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
              <button
                type="button"
                className="flex w-full items-center justify-between p-5 text-left font-medium text-white hover:text-purple-300 transition-all"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${openFAQ === index ? "rotate-180 text-purple-400" : ""}`}
                />
              </button>
              {openFAQ === index && (
                <div className="px-5 pb-5 text-slate-300 text-sm leading-relaxed border-t border-slate-800/60 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-slate-800/80 py-8 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} ColdEmail AI Generator. All rights reserved.
      </footer>
    </div>
  );
}
