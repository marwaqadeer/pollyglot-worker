import { useState } from "react";

export default function TranslateForm({
    setTranslation,
    setOriginalText,
}) {
    const [text, setText] = useState("");
    const [language, setLanguage] = useState("French");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!text.trim()) {
            alert("Please enter text to translate.");
            return;
        }

        setLoading(true);

        try { 
            const response = await fetch(
                "https://pollyglot-worker.marwaqadeer2.workers.dev",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        text,
                        language,
            }),
        }
    );

    const data = await response.json();
    
    console.log("Worker response:", data);

    if (!response.ok) {
        throw new Error(data.error || "Translation failed")
    }

    setOriginalText(text);
    setTranslation(data.translation);
    } catch (error) {
        console.error( error);
        alert("Translation failed. Please try again.");
    } finally {
        setLoading(false);
    }

    }

    return (
        <form className="card" onSubmit={handleSubmit}>
            <h2>Text to translate ⬇️</h2>

            <textarea
               value={text}
               onChange={(e) => setText(e.target.value)}
               placeholder="How are you?"
            />

            <h2>Select language ⬇️</h2>

            <label>
                <input 
                  type="radio"
                  value="French"
                  checked={language === "French"}
                  onChange={(e) =>
                    setLanguage(e.target.value)
                  }
                />
                French 🇫🇷
            </label>

            <label>
                <input
                  type="radio"
                  value="Spanish"
                  checked={language === "Spanish"}
                  onChange={(e) =>
                    setLanguage(e.target.value)
                  }
                />
                Spanish 🇪🇸
            </label>

            <label>
                <input
                  type="radio"
                  value="Japanese"
                  checked={language === "Japanese"}
                  onChange={(e) => 
                    setLanguage(e.target.value)
                  }
                />
                Japanese 🇯🇵
            </label>

            <button type="submit" disabled={loading}>
                {loading ? "Translating..." : "Translate"}
            </button>
        </form>
    );
}