import React from "react";

export default function Footer() {
  return (
    <div className="">
      {/* Fußzeile */}

      <footer
        className=" text-[#adbbce] text-center py-2 sm:py-4 
                    mt-auto relative z-20 backdrop-blur-md bg-gradient-to-r 
                    from-[#659898] via-[#263a4a] to-[#1f2937] bg-opacity-30
                    text-xs sm:text-sm md:text-base"
      >
        <span className="block sm:inline">Powered by PA.Kamicrafter</span>
        <span className="hidden sm:inline mx-2">·</span>
        <span className="block sm:inline">© 2025</span>
      </footer>
    </div>
  );
}
