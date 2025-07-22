import { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

// Die Kategorie auch hier erstllen
const categories = [
  "All",
  "Magic",
  "Sci-Fi",
  "Horror",
  "Fantasy",
  "Cyberpunk",
  "Other",
];

// Animationen für Download- und Löschbuttons von Lottie...
const deleteLottieUrl =
  "https://lottie.host/1ce24962-1253-4b6f-b3a3-71c44f3b7589/wvmmG1pa0B.lottie";
const downloadLottieUrl =
  "https://lottie.host/06b1297f-7a74-465a-b258-df6eb92ba104/P8X8Nq5Lj3.lottie";

// gespeicherte Monster und aktueller Filterzustand ..
export default function SavedCreations() {
  const [savedMonsters, setSavedMonsters] = useState([]);
  const [filter, setFilter] = useState("All");

  // Wenn Seite wird geladen dann --> gespeicherte Monster aus localStorage holen
  useEffect(() => {
    const saved = localStorage.getItem("savedMonsters");
    if (saved) {
      setSavedMonsters(JSON.parse(saved));
    }
  }, []);

  //handleDelete:  Funktion zum Löschen eines Monsters aus der Liste und localStorage
  const handleDelete = (indexToDelete) => {
    const updated = savedMonsters.filter((_, i) => i !== indexToDelete);
    setSavedMonsters(updated);
    localStorage.setItem("savedMonsters", JSON.stringify(updated));
  };

  // Nur Monster zeigen, die zum Filter passen, also unter magic kommt nur die zur magic gehört :)
  const filteredMonsters =
    filter === "All"
      ? savedMonsters
      : savedMonsters.filter((m) => m.category === filter);
  // bei All sollen aber alle da sein

  return (
    <div className="min-h-screen bg-[#1f2937] text-white p-6 pb-20">
      <div className="max-w-6xl mx-auto">
        <h1
          className="text-3xl font-bold mb-6 text-center 
 text-[#00ffff]"
        >
          Gallery of Your Imagination
        </h1>
        <p className="text-md mb-10 text-center text-[#adbbce]">
          Explore the visuals and stories you've summoned.
        </p>

        {/* Dropdown zur Auswahl der Kategorie */}
        <div className="flex justify-center mb-8">
          <select
            className=" bg-[#1f2937] hover:bg-[#00ffff] 
        hover:text-[#1f2937] drop-shadow-[0_0_10px_#00ffff] 
        shadow-lg text-white font-bold p-2 rounded-lg  border 
  border-[#00ffff50] focus:outline-none "
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {/* wieder hier mappen  */}
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Wenn keine Monster da sind , dann No ...*/}
        {filteredMonsters.length === 0 ? (
          <p className="text-center text-[#adbbce]">
            No monsters found in this category.
          </p>
        ) : (
          // sonst Monsterkarten anzeigen
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMonsters.map((monster, index) => (
              <div
                key={index}
                className="relative flex flex-col justify-between bg-[#2d3748] p-4 rounded-xl 
 shadow-lg border border-[#00ffff30]"
              >
                {/* Download Button als Overlay oben rechts über dem Bild */}
                <a
                  href={monster.imageUrl}
                  download={`${monster.monstername || "monster"}.png`}
                  className="absolute top-3 right-1 w-14 h-14 rounded-full overflow-hidden cursor-pointer 
bg-[#1f2937] z-10"
                  aria-label="Download Monster"
                >
                  <DotLottieReact
                    src={downloadLottieUrl}
                    loop
                    autoplay
                    className="w-full h-full pointer-events-none"
                  />

                  {/* Hover Overlay mit dem Nav-Verlauf */}
                  <div
                    className="absolute inset-0 opacity-0 hover:opacity-80 transition-opacity 
    rounded-full bg-gradient-to-r from-[#659898] via-[#263a4a] to-[#1f2937] pointer-events-none"
                  ></div>
                </a>

                {/* Monsterbild anzeigen */}
                <img
                  src={monster.imageUrl}
                  alt={monster.monstername}
                  className="rounded-md mb-4 w-full object-contain"
                />
                <h3 className="text-orange-300 text-xl font-bold mb-2 text-center">
                  {monster.monstername}
                </h3>

                <p className="text-center text-sm italic text-[#00ffffcc] mb-2">
                  Kategorie: {monster.category || "Unkategorisiert"}
                </p>

                {/* Monsterdetails als Profil*/}
                <div className="text-sm space-y-1 text-[#adbbce]">
                  <p>
                    <span className="font-semibold text-orange-300">
                      Basis Animal:
                    </span>{" "}
                    {monster.basisanimal}
                  </p>
                  <p>
                    <span className="font-semibold text-orange-300">
                      Style:
                    </span>{" "}
                    {monster.style}
                  </p>
                  <p>
                    <span className="font-semibold text-orange-300">
                      Weakness:
                    </span>{" "}
                    {monster.weakness}
                  </p>
                  <p>
                    <span className="font-semibold text-orange-300">
                      Attack Type:
                    </span>{" "}
                    {monster.attacktype}
                  </p>
                  <p>
                    <span className="font-semibold text-orange-300">
                      Aggression Level:
                    </span>{" "}
                    {monster.aggressionlevel}
                  </p>
                  <p>
                    <span className="font-semibold text-orange-300">
                      Backstory:
                    </span>{" "}
                    <br />
                    {monster.backstory}
                  </p>
                </div>

                {/* Delete Button*/}
                <div className="flex justify-end  mt-4">
                  <button
                    onClick={() => handleDelete(index)}
                    className="relative w-24 rounded-full overflow-hidden cursor-pointer text-orange-300"
                    aria-label="Delete Monster"
                    type="button"
                  >
                    <DotLottieReact
                      src={deleteLottieUrl}
                      loop
                      autoplay
                      className="w-full h-full pointer-events-none"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
