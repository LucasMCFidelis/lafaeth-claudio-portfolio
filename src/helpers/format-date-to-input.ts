export function formatDateToInput(date?: Date | null) {
  if (!date) return null;
  return date.toISOString().split("T")[0];
}
