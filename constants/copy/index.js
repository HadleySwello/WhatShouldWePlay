/**
 * Copy module — single source of truth for user-facing strings.
 * Default locale: en. Structure ready for future i18n.
 */
import en from './en';

const copy = en;

/**
 * Replace {{key}} placeholders in string with values from vars.
 * @param {string} str - Template string with {{key}} placeholders
 * @param {Record<string, string|number>} vars - Key-value pairs to interpolate
 * @returns {string}
 */
export function t(str, vars = {}) {
  if (typeof str !== 'string') return '';
  return Object.keys(vars).reduce(
    (acc, key) => acc.replace(new RegExp(`{{${key}}}`, 'g'), String(vars[key])),
    str
  );
}

export default copy;
export { en };
