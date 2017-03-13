export const getToday = () => {
  const now = new Date()
  now.setHours(0, 0, 0, 0);
  return now;
}

export const getModayDate = (current) => {
  const diff = current.getDay() === 0 ? 6 : (current.getDay() - 1)
  return new Date(current.getFullYear(), current.getMonth(), current.getDate() - diff, 0, 0, 0);
}

export const getTomorrowDate = (baseDate = getToday()) => {
  return new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + 1, 0, 0, 0)
}
