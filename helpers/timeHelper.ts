export const getCalendarBounds = (
  focusedDate: string,
): { firstDay: string; lastDay: string } => {
  const date = new Date(focusedDate);

  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);

  const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const firstDayOfCalendar = new Date(firstDayOfMonth);
  const firstDayOfMonthDay = firstDayOfCalendar.getDay();
  if (firstDayOfMonthDay !== 0) {
    firstDayOfCalendar.setDate(
      firstDayOfCalendar.getDate() - firstDayOfMonthDay + 1,
    );
  }

  const lastDayOfCalendar = new Date(lastDayOfMonth);
  const lastDayOfMonthDay = lastDayOfCalendar.getDay();
  if (lastDayOfMonthDay !== 6) {
    lastDayOfCalendar.setDate(
      lastDayOfCalendar.getDate() + (6 - lastDayOfMonthDay) + 1,
    );
  }

  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  return {
    firstDay: formatDate(firstDayOfCalendar),
    lastDay: formatDate(lastDayOfCalendar),
  };
};
