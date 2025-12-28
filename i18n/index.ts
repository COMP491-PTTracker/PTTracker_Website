export { en, type TranslationKeys } from './en';
export { tr } from './tr';

export type Language = 'en' | 'tr';

export const translations = {
    en: () => import('./en').then(m => m.en),
    tr: () => import('./tr').then(m => m.tr),
};
