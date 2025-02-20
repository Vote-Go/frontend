import React from "react";

export default function Header() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  return (
    <header className="bg-black text-white sticky top-0 z-50">
      <div className="container mx-auto flex flex-wrap p-5 md:flex-row">
        <a className="flex items-center text-white mb-4 md:mb-0 pr-4" href="/">
          <span className="text-2xl font-bold tracking-tighter">
            Vote<span className="text-gray-400">&</span>Go
          </span>
        </a>
        
        <MobileMenuButton 
          isOpen={navbarOpen} 
          toggle={() => setNavbarOpen(!navbarOpen)}
        />
        
        <NavigationMenu isOpen={navbarOpen} />
      </div>
    </header>
  );
}

const MobileMenuButton = ({ isOpen, toggle }) => (
  <button
    className="md:hidden ml-auto pb-3 focus:outline-none"
    onClick={toggle}
    aria-label="Toggle navigation"
  >
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
        d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
    </svg>
  </button>
);

const NavigationMenu = ({ isOpen }) => (
  <div className={`md:flex flex-grow items-center ${isOpen ? "flex" : "hidden"}`}>
    <nav className="md:ml-auto flex flex-wrap items-center gap-6 font-medium">
      <NavLink href="/markets">Markets</NavLink>
      <NavLink href="/leaderboard">Leaderboard</NavLink>
      <NavLink href="/faq">FAQ</NavLink>
    </nav>
    <button className="ml-4 px-6 py-2 border border-white hover:bg-white hover:text-black transition-colors">
      Connect Wallet
    </button>
  </div>
);

const NavLink = ({ href, children }) => (
  <a href={href} className="hover:text-gray-300 transition-colors">
    {children}
  </a>
);
