export const formatDate = (dateString: string, locale = 'es-CO'): string => {
  return new Date(dateString)
    .toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    .toUpperCase();
};
