import * as i18n from 'i18n-js';
import { TxKeyPath } from './i18n';
import { LanguageEnum } from '@appTypes/enums';

/**
 * Translates text.
 *
 * @param key The i18n key.
 * @param options The i18n options.
 * @returns The translated text.
 *
 * @example
 * Translations:
 *
 * ```en.ts
 * {
 *  "hello": "Hello, {{name}}!"
 * }
 * ```
 *
 * Usage:
 * ```ts
 * import { translate } from "i18n-js"
 *
 * translate("common.ok", { name: "world" })
 * // => "Hello world!"
 * ```
 */
export function translate(key: TxKeyPath, options?: i18n.TranslateOptions) {
    return i18n.t(key, options);
}

export function changeLanguage(language: LanguageEnum) {
    i18n.locale = language;
}

export function getAppLanguage(): string {
    return i18n.currentLocale().toString();
}
