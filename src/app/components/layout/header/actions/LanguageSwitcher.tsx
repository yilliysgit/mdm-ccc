'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Globe } from '@phosphor-icons/react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const languages = [
    { code: 'nl', label: 'NL' },
    { code: 'fr', label: 'FR' },
    { code: 'en', label: 'EN' },
  ];


  const changeLocale = (newLocale: string) => {
  console.log('🔄 Switching locale...');
  console.log('Current locale:', locale);
  console.log('Current pathname:', pathname);
  console.log('New locale:', newLocale);
  
  startTransition(() => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    console.log('Path without locale:', pathWithoutLocale);
    
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    console.log('New path:', newPath);
    
    router.push(newPath);
    setIsOpen(false);
  });
};


  return (


    
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Change language"
      >
        <Globe size={20} />
        <span className="font-medium uppercase">{locale}</span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop om dropdown te sluiten */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown menu */}
          <div className="absolute right-0 mt-2 py-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLocale(lang.code)}
                disabled={isPending}
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors flex items-center justify-between ${
                  locale === lang.code ? 'bg-gray-50 font-semibold' : ''
                }`}
              >
                <span>{lang.label}</span>
                {locale === lang.code && (
                  <span className="text-green-600">✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}