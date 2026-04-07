"use client";

import { useState } from "react";

export default function Home() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [intensity, setIntensity] = useState("brutal");

  const callAPI = async (mode) => {
    if (!code) return;

    setLoading(true);
    setResult("");

    const res = await fetch("/api/roast", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
        language: "javascript",
        intensity: mode || intensity,
      }),
    });

    const data = await res.json();
    setResult(data.result);
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  };

  return (
    <main className="min-h-screen flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-2 text-red-500">
        AI Roast My Code 🔥
      </h1>

      <p className="text-gray-400 mb-6">
        Paste your code. Regret your decisions.
      </p>

      <textarea
        className="w-full max-w-3xl h-64 p-4 bg-gray-900 border border-gray-700 rounded-xl focus:outline-none"
        placeholder="Paste your terrible code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      {/* Controls */}
      <div className="flex gap-3 mt-4 flex-wrap justify-center">
        <select
          value={intensity}
          onChange={(e) => setIntensity(e.target.value)}
          className="bg-gray-800 px-3 py-2 rounded"
        >
          <option value="light">Light 😏</option>
          <option value="brutal">Brutal 💀</option>
          <option value="career-ending">Career Ending ☠️</option>
        </select>

        <button
          onClick={() => callAPI()}
          className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-xl"
        >
          {loading ? "Roasting..." : "Roast Me"}
        </button>

        <button
          onClick={() => callAPI("cope")}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl"
        >
          Cope 🤡
        </button>
      </div>

      {/* Output */}
      {result && (
        <div className="mt-8 w-full max-w-3xl bg-gray-900 border border-gray-700 p-5 rounded-xl">
          <pre className="whitespace-pre-wrap text-sm">{result}</pre>

          <button
            onClick={copyToClipboard}
            className="mt-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
          >
            Copy
          </button>
        </div>
      )}
    </main>
  );
}
