import { useState } from "react";
import "./App.css";

export default function App() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("French");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const translateText = async () => {
    if (!text) return;

    setLoading(true);
    setResult("");

    try {
      const res = await fetch("https://pollyglot-worker.marwaqadeer2.workers.dev", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, language }),
      });

      const data = await res.json();
      setResult(data.translation || "No response");
    } catch {
      setResult("Error translating text");
    }

    setLoading(false);
  };

  const resetAll = () => {
    setText("");
    setLanguage("French");
    setResult("");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>PollyGlot AI Translator</h1>

      <textarea
        placeholder="Text to translate"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <div>
        <label>
          <input 
            type="radio"
            value="French"
            checked={language === "French"}
            onChange={(e) => setLanguage(e.target.value)}
          />
          French
        </label>

        <label style={{ marginLeft: "10px" }}>
          <input
            type="radio"
            value="Spanish"
            checked={language === "Spanish"}
            onChange={(e) => setLanguage(e.target.value)}
          />
          Spanish
        </label>

        <label style={{ marginLeft: "10px" }}>
          <input
            type="radio"
            value="Japanese"
            checked={language === "Japanese"}
            onChange={(e) => setLanguage(e.target.value)}
          />
          Japanese
        </label>
      </div>

      <br />

      <button onClick={translateText}>
        {loading ? "Translating..." : "Translate"}
      </button>

      <button onClick={resetAll} style={{ marginLeft: "10px" }}>
        Start Over
      </button>

      <hr />

      <h3>Original Text</h3>
      <p>{text}</p>

      <h3>Translation</h3>
      <p>{result}</p>
    </div>
  );
}