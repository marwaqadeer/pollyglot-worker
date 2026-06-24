import { useState } from "react";
import Header from "./components/Header";
import TranslateForm from "./components/TranslateForm";
import Result from "./components/Result";
import "./App.css";

function App() {
  const [translation, setTranslation] = useState("");
  const [originalText, setOriginalText] = useState("");

  const resetApp = () => {
    setTranslation("");
    setOriginalText("");
  };

  return (
    <div className="container">
      <Header />

      {!translation ? (
        <TranslateForm
           setTranslation={setTranslation}
           setOriginalText={setOriginalText}
        />
      ) : (
        <Result
           originalText={originalText}
           translation={translation}
           resetApp={resetApp}
        />
      )}
    </div>
  );
}

export default App; 