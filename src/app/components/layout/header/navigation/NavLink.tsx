import { Link } from '@/i18n/routing'; // ✅ MOET dit zijn, NIET 'next/link'
import { ReactNode } from 'react';

interface NavLinkProps {
  href: string;
  children: ReactNode;
}

export function NavLink({ href, children }: NavLinkProps) {
  return (
    <Link 
      href={href}
      className="hover:text-green-700 transition-colors"
    >
      {children}
    </Link>
  );
}