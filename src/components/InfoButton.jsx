import { useState } from "react";
import Swal from "sweetalert2";

export default function InfoButton() {
  const [isVisible, setIsVisible] = useState(true);

  const showApiInfo = () => {
    Swal.fire({
      title: "🔄 API Evolution Story",
      html: `
        <div style="text-align: left; line-height: 1.6; font-size: 14px;">
          <div style="margin-bottom: 15px;">
            <strong style="color: #ff9500;">🎓 Originally:</strong><br/>
            Built with WBS Course API (gen-ai-wbs-consumer-api)<br/>
            • Worked perfectly during development<br/>
            • Had usage limits and time restrictions<br/>
            • Part of educational curriculum
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #00ff88;">🚀 Now:</strong><br/>
            Upgraded to Pollinations.ai<br/>
            • Completely free and unlimited<br/>
            • Real AI image generation<br/>
            • Perfect for demos and portfolio
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #00ffff;">🤔 Why Changed?</strong><br/>
            • WBS API was educational/limited<br/>
            • Needed sustainable solution for portfolio<br/>
            • Wanted to showcase adaptability skills
          </div>
          
          <div style="border-top: 1px solid #444; padding-top: 10px; margin-top: 15px;">
            <strong style="color: #00ffff;">💡 Developer Note:</strong><br/>
            Original WBS code is preserved in the source code to demonstrate proper API integration skills and development history.
          </div>
        </div>
      `,
      background: "#1f2937",
      color: "#adbbce",
      confirmButtonColor: "#00ffff",
      confirmButtonText: "Got it! 👍",
      customClass: {
        popup: "shadow-[0_0_20px_#00ffff] rounded-lg",
        title: "text-[#00ffff]",
        confirmButton:
          "bg-[#00ffff] hover:bg-[#00cccc] text-[#1f2937] font-bold px-6 py-2 rounded transition-colors duration-300",
      },
      showCloseButton: true,
      allowOutsideClick: true,
      width: window.innerWidth < 640 ? "90%" : "500px",
      padding: window.innerWidth < 640 ? "1rem" : "2rem",
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-2 left-2 sm:bottom-4 sm:left-4 z-50">
      <button
        onClick={showApiInfo}
        className="bg-[#1f2937] hover:bg-[#00ffff] 
                   text-[#00ffff] hover:text-[#1f2937] transition-all duration-300
                   border-2 border-[#00ffff] rounded-full 
                   w-10 h-10 sm:w-12 sm:h-12 
                   flex items-center justify-center shadow-lg 
                   drop-shadow-[0_0_10px_#00ffff] hover:drop-shadow-[0_0_15px_#00ffff]
                   font-bold text-sm sm:text-lg animate-pulse hover:animate-none"
        title="API Info & Development Story"
        aria-label="Show API information"
      >
        <span className="text-xs sm:text-base">ℹ️</span>
      </button>

      {/* Schließen Button */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 
                   bg-red-500 hover:bg-red-600 
                   text-white rounded-full 
                   w-4 h-4 sm:w-5 sm:h-5 
                   flex items-center justify-center 
                   text-xs font-bold shadow-md transition-colors duration-200"
        title="Hide info button"
        aria-label="Hide info button"
      >
        ×
      </button>
    </div>
  );
}
