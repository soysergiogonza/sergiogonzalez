import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

export const formatDate = (dateString: string): string => {
  const date = parseISO(dateString);
  return format(date, "d 'de' MMMM 'de' yyyy", { locale: es }).toUpperCase();
};
