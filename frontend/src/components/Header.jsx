export default function Header() {
    return (
        <header className="header">
            <img
               src="/parrot.png"
               alt="parrot"
               className="parrot"
            />

            <div className="title-area">
                <h1>PollyGlot</h1>
                <p>Perfect Translation Every Time</p>
            </div>
        </header>
    );
}