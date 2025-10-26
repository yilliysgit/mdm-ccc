import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Playfair_Display, Quicksand } from "next/font/google";
import Header from '../components/layout/header/Header';
import "../globals.css";

// Configureer fonts
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-serif',
  display: 'swap', // Voorkomt FOUT
});

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  const locales = ['nl', 'fr', 'en'];
  if (!locales.includes(locale)) {
    return null;
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${playfair.variable} ${quicksand.variable}`}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Header />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}