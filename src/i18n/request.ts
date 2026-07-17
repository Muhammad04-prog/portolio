import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';
import ruMessages from '../../messages/ru.json';
import enMessages from '../../messages/en.json';
import tjMessages from '../../messages/tj.json';

export default getRequestConfig(async ({requestLocale}) => {
  // Validate that the incoming `locale` parameter is valid
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  let messages;
  if (locale === 'en') {
    messages = enMessages;
  } else if (locale === 'tj') {
    messages = tjMessages;
  } else {
    messages = ruMessages;
  }

  return {
    locale,
    messages
  };
});
