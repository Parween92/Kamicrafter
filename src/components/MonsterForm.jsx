import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

//Liste/Fiter,die von Home zu Saven übergeben wird
const categories = [
  "Magic",
  "Sci-Fi",
  "Horror",
  "Fantasy",
  "Cyberpunk",
  "undefined",
];

//Pollinations.ai
const USE_FREE_AI_API = true;

function MonsterForm({ onSubmit }) {
  const [monsterData, setMonsterData] = useState({
    monstername: "",
    basisanimal: "",
    style: "",
    weakness: "",
    backstory: "",
    attacktype: "",
    aggressionlevel: 50,
    category: categories[0],
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    if (USE_FREE_AI_API) {
      try {
        // Prompt aus monsterData
        const prompt =
          `Create a terrifying monster named ${monsterData.monstername}. 
        It is a mutated ${monsterData.basisanimal} with ${monsterData.attacktype} attacks, 
        wearing ${monsterData.style} armor. Its weakness is ${monsterData.weakness}. 
        Aggression level: ${monsterData.aggressionlevel}/100. 
        Backstory: ${monsterData.backstory}. 
        Category: ${monsterData.category}. 
        Make it detailed, non-human, scary and creative. Digital art style.`
            .replace(/\s+/g, " ")
            .trim();

        const encodedPrompt = encodeURIComponent(prompt);
        const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=512&height=512&model=flux&seed=${Math.floor(
          Math.random() * 1000000
        )}`;

        await new Promise((resolve) => setTimeout(resolve, 2000));

        const generatedMonster = {
          ...monsterData,
          imageUrl: imageUrl,
        };

        onSubmit(generatedMonster);

        Swal.fire({
          title: "AI Monster Created!",
          text: "Your AI-generated monster has been summoned using Pollinations.ai!",
          imageUrl: "/KamiCrafter Logo-w.png",
          imageAlt: "Generated Monster",
          imageWidth: 150,
          customClass: {
            popup: "shadow-[0_0_15px_#00ffff] rounded",
          },
          background: "#1f2937",
          color: "#00ffff",
          confirmButtonColor: "#00ffff",
          html: `<p>Powered by free Pollinations.ai API! 🚀</p>`,
          showConfirmButton: true,
          showCloseButton: false,
        });

        setLoading(false);
        return;
      } catch (error) {
        console.error("Pollinations API error:", error);
        setError("AI generation failed. Please try again.");
        setLoading(false);
        return;
      }
    }

    /* 
    ========================================
    ORIGINAL WBS API CODE (AUSKOMMENTIERT)
    ========================================
    Diese API war Teil des WBS-Kurses und funktionierte korrekt,
    wurde aber durch kostenlose Alternative ersetzt da:
    - API-Key war begrenzt/zeitlich limitiert
    - Kostenpflichtig nach Ablauf
    - Für Demo-Zwecke nicht ideal
    
    Der Code zeigt die korrekte Implementierung der originalen API:
    */

    // FALLBACK: Originale WBS API (kostenpflichtig/begrenzt) - FUNKTIONAL ABER AUSKOMMENTIERT
    /*
    const prompt = `Create a monster named ${monsterData.monstername}. 
    It is a terrifying mutated ${monsterData.basisanimal} 
    with ${monsterData.attacktype}, 
    wearing ${monsterData.style} armor. 
    Its weakness is ${monsterData.weakness}. 
    It has an aggression level of ${monsterData.aggressionlevel}. 
    Backstory: ${monsterData.backstory}. 
    The monster belongs to the ${monsterData.category} category.
    Make it look non-human, detailed, and creative.`;

    try {
      const response = 
      await axios.post('https://gen-ai-wbs-consumer-api.onrender.com/api/v1/images/generations',
        {
          model: 'dall-e-3',
          prompt,
          response_format: 'b64_json',
          n: 1,
          size: '1024x1024',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            provider: 'open-ai',
            mode: 'production',
            Authorization: 'dqifrec44k4zyzlumqbu8', // Original WBS API Key
          },
        }
      );

      if (Array.isArray(response.data) && response.data[0]?.b64_json) {
        const base64Image = `data:image/png;base64,${response.data[0].b64_json}`;
        const generatedMonster = {
          ...monsterData,
          imageUrl: base64Image,
        };

        onSubmit(generatedMonster);

        Swal.fire({   
          title: "It's Alive!",
          text: 'Your AI-generated monster has been summoned.',
          imageUrl: '/KamiCrafter Logo-w.png',
          imageAlt: 'Generated Monster',
          imageWidth: 150,
          customClass: {
            popup: 'shadow-[0_0_15px_#00ffff] rounded',
          },
          background: '#1f2937',
          color: '#00ffff',
          confirmButtonColor: '#00ffff',
          html: `<p>Your AI-generated monster has been summoned.</p>`,
          showConfirmButton: true,
          showCloseButton: false,
        });

      } else {
        setError('No image data received from API.');
      }

    } catch (error) {
      console.error('Image generation error:', error.response || error.message);
      setError('Image generation failed. Please try again.');
    } finally {
      setLoading(false);
    }
    */

    // Code bleibt zur Dokumentation - zeigt korrekte API-Integration von WBS-Kurs
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      {USE_FREE_AI_API && (
        <div
          className="bg-[#1f29379a] border border-[#00ffff50] rounded-lg 
                        px-3 py-1 mb-2 drop-shadow-[0_0_10px_#00ffff50]"
        >
          <p className="text-[#00ffff] text-xs font-bold">
            🚀 Free AI Mode: Powered by Pollinations.ai - Real AI-generated
            monsters!
          </p>
        </div>
      )}

      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      {/* loading message mit Spinner anzeigen beim generieren  */}
      {loading && (
        <div className="flex items-center gap-2 mt-2">
          <span className="loading loading-ring loading-sm text-[#00ffff]"></span>
          <p className="text-[#00ffff] font-bold text-xs">
            {USE_FREE_AI_API
              ? "AI is creating your unique monster..."
              : "Generating image..."}
          </p>
        </div>
      )}

      <input
        className="bg-[#1f29379a] px-3 py-1.5 text-white font-bold text-sm w-full
                   border border-transparent focus:border-[#00ffff50] rounded transition-colors"
        placeholder="Monster Name"
        type="text"
        required
        value={monsterData.monstername}
        onChange={(e) =>
          setMonsterData({ ...monsterData, monstername: e.target.value })
        }
      />

      <input
        className="bg-[#1f29379a] px-3 py-1.5 text-white font-bold text-sm w-full
                   border border-transparent focus:border-[#00ffff50] rounded transition-colors"
        type="text"
        required
        placeholder="Basis Animal"
        value={monsterData.basisanimal}
        onChange={(e) =>
          setMonsterData({ ...monsterData, basisanimal: e.target.value })
        }
      />

      <input
        className="bg-[#1f29379a] px-3 py-1.5 text-white font-bold text-sm w-full
                   border border-transparent focus:border-[#00ffff50] rounded transition-colors"
        type="text"
        required
        placeholder="Style"
        value={monsterData.style}
        onChange={(e) =>
          setMonsterData({ ...monsterData, style: e.target.value })
        }
      />

      <input
        className="bg-[#1f29379a] px-3 py-1.5 text-white font-bold text-sm w-full
                   border border-transparent focus:border-[#00ffff50] rounded transition-colors"
        type="text"
        required
        placeholder="Weakness"
        value={monsterData.weakness}
        onChange={(e) =>
          setMonsterData({ ...monsterData, weakness: e.target.value })
        }
      />

      <input
        className="bg-[#1f29379a] px-3 py-1.5 text-white font-bold text-sm w-full
                   border border-transparent focus:border-[#00ffff50] rounded transition-colors"
        type="text"
        required
        placeholder="Backstory"
        value={monsterData.backstory}
        onChange={(e) =>
          setMonsterData({ ...monsterData, backstory: e.target.value })
        }
      />

      <input
        className="bg-[#1f29379a] px-3 py-1.5 text-white font-bold text-sm w-full
                   border border-transparent focus:border-[#00ffff50] rounded transition-colors"
        type="text"
        required
        placeholder="Attack Type"
        value={monsterData.attacktype}
        onChange={(e) =>
          setMonsterData({ ...monsterData, attacktype: e.target.value })
        }
      />

      <label className="flex flex-col text-[#adbbce] font-bold text-sm">
        <span className="pb-0.5 pl-1 text-xs">Aggression: ↓</span>

        <input
          className="bg-[#1f29379a] px-3 py-1.5 text-white font-bold text-sm w-full
                   border border-transparent focus:border-[#00ffff50] rounded transition-colors"
          type="number"
          required
          min="0"
          max="100"
          placeholder="Aggression Level"
          value={monsterData.aggressionlevel}
          onChange={(e) =>
            setMonsterData({
              ...monsterData,
              aggressionlevel: Number(e.target.value),
            })
          }
        />
      </label>

      <select
        className="bg-[#1f29379a] px-3 py-1.5 text-white font-bold text-sm w-full
                   border border-transparent focus:border-[#00ffff50] rounded transition-colors"
        value={monsterData.category}
        onChange={(e) =>
          setMonsterData({ ...monsterData, category: e.target.value })
        }
      >
        {/* mapen damit die optionen angeziget werden ---key */}
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <button
        type="submit"
        disabled={loading}
        className="bg-[#1f2937] hover:bg-[#00ffff] 
        hover:text-[#1f2937] drop-shadow-[0_0_10px_#00ffff] 
        shadow-lg text-white font-bold px-6 py-1.5 mt-2 w-full
        text-sm
        rounded disabled:opacity-50 disabled:cursor-not-allowed
        transition-all duration-300 hover:drop-shadow-[0_0_15px_#00ffff]"
      >
        {loading ? "Generating..." : "Generate Monster"}
      </button>
    </form>
  );
}

export default MonsterForm;

//Formular zum Ausfüllen, was man auf der Seite sieht
// Parameter eingeben (Stil, Tier, Fähigkeiten)
// Kategorien für Dropdown
//Bild generieren
/* //Wenn a truth ist (also nicht leer, null oder false), wird b zurückgegeben.
//Wenn a false ist (z. B. null, false, ""), wird b übersprungen */
