import keymirror from 'keymirror'

export const interval = keymirror({
  TODAY: null,
  TOMORROW: null,
  THIS_WEEK: null,
  NEXT_WEEK: null,
  THIS_MONTH: null,
  ALL: null
})

const getToday = () => {
  return new Date()
}

const getModayDate = (current) => {
  const diff = current.getDay() === 0 ? 6 : (current.getDay() - 1)
  return new Date(current.getFullYear(), current.getMonth(), current.getDate() - diff);
}

const getSundayDate = (monday) => {
  return new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 6);
}

const getTomorrowDate = () => {
  const today = getToday()
  return new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
}

const getThisWeekDatesInterval = () => {
  const monday = getModayDate(getToday())
  return {from: monday, to: getSundayDate(monday)}
}

const getNextWeekDatesInterval = () => {
  const monday = getModayDate(getToday())
  const mondayAfterWeek = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 7)
  return {from: mondayAfterWeek, to: getSundayDate(mondayAfterWeek)}
}

const getThisMonthDatesInterval = () => {
  const today = getToday()
  return {from: new Date(today.getFullYear(), today.getMonth(), 1), to: new Date(today.getFullYear(), today.getMonth() + 1, 0)}
}

export const convertIntervalToDates = (intervalName) => {

  if (intervalName === interval.TODAY) {
    const today = getToday()
    return {from: today, to: today}
  } else if (intervalName === interval.TOMORROW) {
    const tomorrow = getTomorrowDate()
    return {from: tomorrow, to: tomorrow}
  } else if (intervalName === interval.THIS_WEEK) {
    return getThisWeekDatesInterval()
  } else if (intervalName === interval.NEXT_WEEK) {
    return getNextWeekDatesInterval()
  } else if (intervalName === interval.THIS_MONTH) {
    return getThisMonthDatesInterval()
  } else {
    return {from: null, to: null}
  }

}
