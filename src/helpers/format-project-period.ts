const monthFormatter = new Intl.DateTimeFormat("pt-BR", {
  month: "long",
  timeZone: "UTC",
});

const formatMonthYear = (date: string) => {
  const [year, month] = date.split("-").map(Number);
  const name = monthFormatter.format(new Date(Date.UTC(year, month - 1, 1)));
  return `${name.charAt(0).toUpperCase()}${name.slice(1)} ${year}`;
};

export const formatProjectPeriod = (
  startDate: string,
  endDate?: string | null
) => {
  const start = formatMonthYear(startDate);
  if (!endDate) return start;

  const end = formatMonthYear(endDate);
  return start === end ? start : `${start} - ${end}`;
};
