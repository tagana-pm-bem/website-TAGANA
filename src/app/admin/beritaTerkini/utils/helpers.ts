import { Status, Kategori } from "../types";
import { STATUS_BADGE, KATEGORI_CONFIG } from "../constants";

/**
 * Get CSS classes for status badge
 */
export const getStatusBadge = (status: Status): string => {
  return STATUS_BADGE[status];
};

/**
 * Get CSS classes for kategori badge
 */
export const getKategoriBadge = (kategori: Kategori): string => {
  return KATEGORI_CONFIG[kategori].badge;
};

/**
 * Get title for kategori
 */
export const getKategoriTitle = (kategori: Kategori): string => {
  return KATEGORI_CONFIG[kategori].title ?? "";
};

/**
 * Get active badge classes for kategori filter
 */
export const getKategoriActiveBadge = (kategori: Kategori): string => {
  return KATEGORI_CONFIG[kategori].activeBadge;
};

/**
 * Format date string to readable format
 */
export const formatDate = (dateString: string): string => {
  // For now, return as is. You can implement date formatting logic here
  return dateString;
};

/**
 * Truncate text to specified length
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};
