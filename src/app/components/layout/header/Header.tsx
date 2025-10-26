import { Logo } from "./logo/Logo";
import { Navigation } from "./navigation/Navigation";
import SimpleCTA from "./actions/Ctabutton";
import LanguageSwitcher from "./actions/LanguageSwitcher";
import { SocialButtons } from "./actions/SocialButtons";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-amber-50/95 shadow-md">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-2">
        <div className="flex h-20 items-center justify-between">
          <Logo />
          <Navigation />
          
          <div className="flex items-center gap-4">
            <SocialButtons className="hidden md:flex" />
            
            {/* LanguageSwitcher heeft geen props meer nodig */}
            <LanguageSwitcher />

            <SimpleCTA href="/aanmelden" variant="primary">
              Aanmelden
            </SimpleCTA>
            
            <button 
              className="lg:hidden p-2 hover:bg-amber-100 rounded-lg transition-colors text-green-800"
              aria-label="Open menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}