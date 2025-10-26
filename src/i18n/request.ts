import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  // Static imports for edge runtime compatibility
  // Correct path: from src/i18n/ to src/messages/
  const messages = {
    nl: (await import('../messages/nl.json')).default,
    fr: (await import('../messages/fr.json')).default,
    en: (await import('../messages/en.json')).default,
  };

  return {
    locale,
    messages: messages[locale as keyof typeof messages]
  };
});