"use client";
import { useState } from "react";
import { Sparkles, Copy, Check, ExternalLink, Briefcase, Code, AlertCircle, Loader2 } from "lucide-react";

const Url = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailData, setEmailData] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e) => {
    if (e) e.preventDefault();
    if (!url.trim()) {
      setError("Please enter a job posting URL.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setEmailData(null);
      setCopied(false);

      const res = await fetch("/api/generate-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Failed to generate cold email.");
      }

      if (data.status === "success" && data.email) {
        setEmailData(data);
      } else {
        setError("Could not generate email from the provided URL.");
      }
    } catch (err) {
      console.error("Error generating cold email:", err);
      setError(err.message || "Failed to connect to backend server. Make sure the FastAPI server is running on http://127.0.0.1:8000.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (emailData?.email) {
      navigator.clipboard.writeText(emailData.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 space-y-8">
      {/* Search Header & Input Box */}
      <div className="bg-slate-900/80 border border-slate-800 backdrop-blur-md rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col space-y-1">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-400" />
            Generate Personalized Cold Email
          </h2>
          <p className="text-slate-400 text-sm">
            Paste any job posting URL. Our AI will scrape the key details, query your portfolio database for matched projects, and compose a tailored email.
          </p>
        </div>

        <form onSubmit={handleGenerate} className="flex flex-col sm:flex-row gap-3">
          <input
            type="url"
            placeholder="Paste Job Posting URL (e.g., https://jobs.example.com/role)..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium rounded-xl shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shrink-0"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate Email
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="flex items-center gap-2 p-4 bg-red-950/50 border border-red-800 rounded-xl text-red-300 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Generated Content Results */}
      {emailData && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Job Insights Badge Grid */}
          {emailData.job && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-slate-400 text-sm font-medium mb-2">
                  <Briefcase className="w-4 h-4 text-purple-400" />
                  Job Details
                </div>
                <div className="text-lg font-semibold text-white">
                  {emailData.job.role || "Job Role"}
                </div>
                {emailData.job.experience && (
                  <div className="text-sm text-purple-300 mt-1">
                    Experience required: {emailData.job.experience}
                  </div>
                )}
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-slate-400 text-sm font-medium mb-2">
                  <Code className="w-4 h-4 text-indigo-400" />
                  Matched Required Skills
                </div>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {Array.isArray(emailData.job.skills) && emailData.job.skills.length > 0 ? (
                    emailData.job.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-purple-950/80 border border-purple-800/60 text-purple-200 text-xs font-medium rounded-full"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-500 text-sm">General Technical Skills</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Generated Cold Email Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="px-6 py-4 bg-slate-800/50 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                Generated Cold Email
              </h3>
              <button
                onClick={handleCopy}
                className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg border border-slate-700 text-sm font-medium transition-all flex items-center gap-1.5"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>
            </div>
            <div className="p-6">
              <pre className="whitespace-pre-wrap font-sans text-slate-200 text-base leading-relaxed select-text bg-slate-950/60 p-5 rounded-xl border border-slate-800/80 overflow-x-auto">
                {emailData.email}
              </pre>
            </div>
          </div>

          {/* Matched Portfolio Links Section */}
          {Array.isArray(emailData.links) && emailData.links.length > 0 && (
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-5 space-y-3">
              <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
                Relevant Portfolio Links Included
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {emailData.links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-slate-950 border border-slate-800 hover:border-purple-500/50 text-purple-400 hover:text-purple-300 rounded-lg text-sm transition-all flex items-center justify-between group"
                  >
                    <span className="truncate">{link}</span>
                    <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-purple-400 shrink-0 ml-2" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Url;
