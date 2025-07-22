import { useState, useEffect, useRef } from "react";
import MonsterForm from "../components/MonsterForm";
import DownloadableImage from "../components/DownloadableImage";
import Swal from "sweetalert2";

// POPUp LoginModal, um anzumelden
// Componente zur Darstellung eines Login-Fensters
function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Wenn das Modal geschlossen ist, soll nichts passiern/anzeigen
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Login Beim Form ist done----> onLoginsuccess
    if (email.trim() && password.trim()) {
      onLoginSuccess();
      onClose();
    } else {
      alert("Please enter your email and password");
    }
  };
  //schließen nachdem submiten

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex 
    justify-center items-center z-50"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded shadow-lg max-w-sm w-full
         text-white flex flex-col gap-4"
      >
        <h2 className="text-2xl mb-4">Please log in</h2>

        <input
          type="email"
          placeholder="E-Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded text-black"
          required
        />
        <input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded text-black"
          required
        />
        <button
          type="submit"
          className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 
          rounded"
        >
          Login
        </button>

        <button
          type="button"
          onClick={onClose}
          className="mt-2 text-sm underline text-white"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default function Home() {
  // Zustände für Schritt, monsterData....
  const [monsterData, setMonsterData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [savedMonsters, setSavedMonsters] = useState([]);

  const videoRef = useRef(null);

  const [step, setStep] = useState("form");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  // Effekt: Video langsam abspielen & gespeicherte Monster aus localStorage holen
  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.5;
    // wenn auf saved geklickt wird, dann in local saven--->
    const saved = localStorage.getItem("savedMonsters");
    if (saved) setSavedMonsters(JSON.parse(saved));
  }, []);

  // saved Monster im localStorage sichern, wenn sich NUR Liste ändert
  useEffect(() => {
    localStorage.setItem("savedMonsters", JSON.stringify(savedMonsters));
  }, [savedMonsters]);

  // Formular abschicken:
  const handleFormSubmit = (generatedMonster) => {
    setLoading(true);

    //  Ladezustand festlegen dann Daten speichern in setMo.. dann Schritte wechelsn...
    setTimeout(() => {
      setMonsterData(generatedMonster);
      setLoading(false);
      setStep("result");
    }, 2000);
  };

  // Diese Funktion wird aufgerufen, wenn Save Button gedrückt wird
  const handleSaveClick = () => {
    if (!isLoggedIn) {
      setLoginModalOpen(true);
    } else if (monsterData) {
      saveMonster(monsterData);
    } else {
      alert("Kein Monster zum Speichern vorhanden.");
    }
  };

  // Monster speichern und den Popup zeigen das bedeuetet geschaftt!!--> in Localstorage
  const saveMonster = (monster) => {
    setSavedMonsters((prev) => [...prev, monster]);

    //sweetalert message anzeigen
    Swal.fire({
      title: "It's Alive!",
      text: "Your AI-generated monster has been summoned.",
      imageUrl: "/KamiCrafter Logo-w.png",
      imageAlt: "Generated Monster",
      imageWidth: 150,
      background: "#1f2937",
      color: "#00ffff",
      confirmButtonColor: "#00ffff",
      customClass: {
        popup: "shadow-[0_0_15px_#00ffff] rounded",
      },

      html: `<p>Your AI-generated monster has been summoned.</p>`,
    });
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setLoginModalOpen(false);
    saveMonster(monsterData);
  };

  return (
    <div className="relative min-h-screen bg-black flex flex-col">
      {/* VIDEO BG */}

      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ filter: "brightness(50%)", zIndex: 0 }}
      >
        <source src="/video-bg_LQ.mp4" type="video/mp4" />
      </video>

      {/* Dunkle Überlagerung über das Video */}
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{
          background: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6))",
          mixBlendMode: "multiply",
          zIndex: 1,
        }}
      />

      {/* Inhalte */}
      <main
        className="flex flex-col items-center justify-start relative z-10 flex-grow 
                       px-2 sm:px-4 py-6 sm:py-10"
      >
        <section
          className="bg-[#1f29379a] rounded-lg shadow-lg 
                         p-4 md:p-6 max-w-4xl w-full mb-8 
                         flex flex-col lg:flex-row gap-6"
        >
          {/* Das Formular - Kompaktere Breite */}
          <div className="w-full lg:w-2/5">
            <MonsterForm onSubmit={handleFormSubmit} />
          </div>

          {/* Bereich für Bildanzeige - Kompaktere Breite */}
          <div
            className="w-full lg:w-3/5 flex flex-col justify-center items-center 
                    bg-gray-800 rounded-md border-2 border-dashed border-gray-600 
                    p-4 min-h-[250px] lg:min-h-[400px] text-[#adbbce]"
          >
            {loading ? (
              <>
                <span className="loading loading-ring loading-xl text-[#adbbce]"></span>
                <p className="mt-4 text-center font-semibold">
                  Image will appear here after generation
                </p>
              </>
            ) : monsterData && monsterData.imageUrl ? (
              <DownloadableImage
                imageUrl={monsterData.imageUrl}
                alt={monsterData.name || "Monster"}
                downloadName={`${monsterData.name || "monster"}.png`}
                onSave={handleSaveClick} // <--- Save Button Callback
              />
            ) : (
              <p className="italic p-6 text-center">
                Image will appear here after generation
              </p>
            )}
          </div>
        </section>
      </main>

      {/* Login Modal */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
