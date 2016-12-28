export const getToday = () => {
  return new Date()
}

export const getModayDate = (current) => {
  const diff = current.getDay() === 0 ? 6 : (current.getDay() - 1)
  return new Date(current.getFullYear(), current.getMonth(), current.getDate() - diff);
}

export const getSundayDate = (monday) => {
  return new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 6);
}

export const getTomorrowDate = () => {
  const today = getToday()
  return new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
}