/**
 * Utility untuk memformat tanggal ke format lokal Bahasa Indonesia
 * Contoh: "2026-07-20" -> "20 Juli 2026"
 */
export function formatTanggalIndonesia(dateStr?: string | null): string {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateStr;
  }
}
