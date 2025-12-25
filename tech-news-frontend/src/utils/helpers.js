/**
 * Truncates a string to a specified length and adds an ellipsis.
 * @param {string} str - The string to truncate.
 * @param {number} length - The maximum length.
 * @returns {string} Truncated string.
 */
export const truncateText = (str, length = 100) => {
  if (!str) return '';
  return str.length > length ? `${str.substring(0, length)}...` : str;
};

/**
 * Formats a date string to a locale-specific string.
 * @param {string|Date} date - The date to format.
 * @returns {string} Formatted date string.
 */
export const formatDate = (date) => {
  if (!date) return new Date().toLocaleDateString();
  return new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
