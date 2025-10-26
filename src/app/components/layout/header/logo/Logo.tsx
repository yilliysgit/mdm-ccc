import { Link } from '@/i18n/routing'

export function Logo() {
  return (
    <Link 
      href="/" 
      className="flex items-center gap-4 group"
      aria-label="Marocains du Monde - Home"
    >
      <img
        src="/images/mdm-ccc-logo.svg"
        alt="Marocains du Monde Classic Car Club"
        className="w-64 transition-transform group-hover:scale-105"
      />
      
    </Link>
  );
}