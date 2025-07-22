import { NavLink } from "react-router-dom";


export default function Navbar() {
  return (

<header className="backdrop-blur-md bg-gradient-to-r 
   from-[#659898] via-[#263a4a] via-60% to-[#1f2937] to-80% bg-opacity-30 
   p-2 sm:p-4 sticky top-0 z-50 shadow-md">

        <nav className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
          <div className="flex items-center gap-2 sm:gap-5">

{/* verlinkugn zur Home */}
  <NavLink to="">
  <img src="/KamiCrafter Logo-w.png" alt="Website-Logo" 
       className="w-[60px] sm:w-[80px] md:w-[100px]" />
</NavLink>
      <div className="relative text-white font-bold 
      text-2xl sm:text-3xl font-mono select-none">
        
<span className="relative z-10">Where Monsters Are Born</span>
<span className="absolute top-0 left-0
    text-orange-300 opacity-70" style={{ clipPath: 'inset(0px 0px 45%)', 
    transform: 'translate(-2px, -2px)' }}>
  Where Monsters Are Born
</span>

<span className="absolute top-0 left-0 text-blue-400 opacity-70"
    style={{ clipPath: 'inset(45% 0px 0px)', transform: 'translate(2px, 2px)' }}>
      Where Monsters Are Born </span>

            </div>
          </div>

          <ul className="flex gap-2 sm:gap-4">
            <li>
              <NavLink to="/saved" 
              className="relative px-2 sm:px-4 py-1 sm:py-2 text-[#adbbce] font-bold 
                        text-sm sm:text-base transition duration-300
                        hover:text-[#00ffff] hover:drop-shadow-[0_0_6px_#00ffff]
                        border border-transparent hover:border-[#00ffff50] rounded">
                Saved Creations
              </NavLink>
            </li>
          </ul>

        </nav>
        
      </header>
  );
}


