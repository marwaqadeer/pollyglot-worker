export default function Result({
    originalText,
    translation,
    resetApp,
}) {
    return (
        <div className="card">
            <h2>Original text ⬇️</h2>

            <textarea
              value={originalText}
              readOnly
            />

            <h2>Your translation ⬇️</h2>

            <textarea
              value={translation}
              readOnly
            />

            <button onClick={resetApp}>
                Start Over
            </button>
        </div>
    );
}