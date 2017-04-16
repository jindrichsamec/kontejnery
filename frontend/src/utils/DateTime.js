export const getToday = () => {
  const now = new Date()
  now.setHours(0, 0, 0, 0);
  return now;
}

export const getTomorrowDate = (baseDate = getToday()) => {
  return new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + 1, 0, 0, 0)
}

export const formatDayName = (day) => {
  const dayNames = ['Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota', 'Neděle']
  return dayNames[day - 1] || '';
}

export const formatDate = (date) => {
  return `${date.getDate()}. ${date.getMonth() + 1}. ${date.getFullYear()}`
}
