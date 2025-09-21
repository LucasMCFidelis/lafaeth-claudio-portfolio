export function formatDateToInput(date?: Date | null) {
  if (!date) return undefined;
  return date.toISOString().split("T")[0];
}
