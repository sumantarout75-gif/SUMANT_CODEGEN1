import React, { useState } from "react";
import {
  LogIn,
  Send,
  Play,
  RefreshCw,
  Mail,
  Phone,
  LifeBuoy,
  Menu,
  X,
  User,
  Lock,
  ChevronDown,
  Code2,
} from "lucide-react";

const CodeQuestPro = () => {

  // Page UI states
  const [currentPage, setCurrentPage] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authModal, setAuthModal] = useState(null);

  // Generator states
  const [language, setLanguage] = useState("JavaScript");
  const [level, setLevel] = useState("Medium");
  const [question, setQuestion] = useState(
    "Click 'Generate' to fetch a challenge..."
  );

  // Call backend AI
  const handleGenerate = async () => {
    setQuestion("Generating challenge...");

    try {
      const response = await fetch("http://localhost:5000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language,
          level,
        }),
      });

      const data = await response.json();
      setQuestion(data.question);
    } catch (error) {
      setQuestion("Error connecting to AI backend");
    }
  };

  // Auth Modal Component
  const AuthModal = () => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#0f172a] border border-slate-800 w-full max-w-md rounded-2xl p-8 shadow-2xl relative">
        <button
          onClick={() => setAuthModal(null)}
          className="absolute top-4 right-4 text-slate-500 hover:text-white"
        >
          <X size={24} />
        </button>

        <h2 className="text-3xl font-bold text-white mb-2">
          {authModal === "login" ? "Welcome Back" : "Create Account"}
        </h2>

        <form className="space-y-4">
          {authModal === "register" && (
            <div className="space-y-1">
              <label className="text-xs text-slate-400">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-slate-500" size={18} />
                <input
                  type="text"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4"
                  placeholder="John Doe"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs text-slate-400">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-slate-500" size={18} />
              <input
                type="text"
                className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4"
                placeholder="name@example.com"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-slate-400">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-slate-500" size={18} />
              <input
                type="password"
                className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4"
              />
            </div>
          </div>

          <button className="w-full bg-indigo-600 py-3 rounded-lg font-bold text-white">
            {authModal === "login" ? "Sign In" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200">

      {authModal && <AuthModal />}

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#020617]/90 border-b border-slate-800 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-6">

          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setCurrentPage("home")}
          >
            <Code2 className="text-indigo-500" size={32} />
            <span className="text-2xl font-black text-white">
              CODE<span className="text-indigo-400">GEN</span>
            </span>
          </div>

          {/* Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-2 text-sm text-slate-400 bg-slate-900 px-4 py-2 rounded-lg border border-slate-800"
            >
              <Menu size={18} /> Explore <ChevronDown size={14} />
            </button>

            {isMenuOpen && (
              <div className="absolute top-12 left-0 w-48 bg-[#0f172a] border border-slate-800 rounded-xl shadow-2xl py-2">
                {["Practice", "Roadmaps", "Leaderboard"].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setCurrentPage(item.toLowerCase());
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-indigo-600/10 hover:text-indigo-400"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setAuthModal("login")}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-lg"
          >
            <LogIn size={18} /> Login
          </button>
        </div>
      </nav>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto p-6">

        <div className="text-center py-10">
          <h1 className="text-4xl font-black text-white mb-4">
            Level Up Your Logic
          </h1>
        </div>

        {/* Selectors */}
        <div className="flex gap-4 mb-6 justify-center">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-slate-900 border border-slate-800 px-4 py-3 rounded-xl"
          >
            <option>JavaScript</option>
            <option>Python</option>
            <option>Java</option>
            <option>C++</option>
          </select>

          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="bg-slate-900 border border-slate-800 px-4 py-3 rounded-xl"
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">

          {/* QUESTION */}
          <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-8">
            <h3 className="text-indigo-400 mb-4">Question</h3>
            <p>{question}</p>

            <button
              onClick={handleGenerate}
              className="mt-6 flex items-center justify-center gap-2 w-full py-4 bg-indigo-600 rounded-xl"
            >
              <RefreshCw size={20} /> Generate Question
            </button>
          </div>

          {/* EDITOR */}
          <div className="bg-[#0f172a] rounded-2xl border border-slate-800 flex flex-col">

            <textarea
              className="flex-grow bg-transparent p-6 font-mono text-indigo-300 outline-none resize-none min-h-[300px]"
              placeholder="// Write your code here..."
            />

            <div className="p-4 flex gap-3">
              <button className="flex-1 py-3 bg-slate-800 rounded-lg flex items-center justify-center gap-2">
                <Play size={16} /> Run Code
              </button>

              <button className="flex-1 py-3 bg-indigo-600 rounded-lg flex items-center justify-center gap-2">
                <Send size={16} /> Submit
              </button>
            </div>

          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="mt-20 border-t border-slate-800 pt-10 pb-10 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">

          <div>
            <h3 className="text-white font-bold mb-2">Platform Description</h3>
            <p className="text-slate-500 text-sm">
              CodeGen is an AI-driven platform that generates real-time coding
              challenges to help developers master technical interviews.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold mb-2">Customer Service</h3>
            <p className="text-slate-400 flex items-center gap-2">
              <Mail size={16} /> support@codegen.ai
            </p>
            <p className="text-slate-400 flex items-center gap-2">
              <Phone size={16} /> +1 (888) 123-4567
            </p>
          </div>

          <div className="text-right">
            <p className="text-slate-500 text-sm">Version</p>
            <p className="text-xl font-mono text-slate-300">v2.0.4</p>
          </div>

        </div>
      </footer>
    </div>
  );
};

export default CodeQuestPro;