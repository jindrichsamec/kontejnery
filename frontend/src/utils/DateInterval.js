import keymirror from 'keymirror'
import { getToday, getTomorrowDate, getModayDate } from './DateTime'

export const interval = keymirror({
  TODAY: null,
  TOMORROW: null,
  THIS_WEEK: null,
  NEXT_WEEK: null,
  THIS_MONTH: null,
  ALL: null
})

const getThisWeekDatesInterval = () => {
  const monday = getModayDate(getToday())
  const mondayAfterWeek = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 7)
  return {since: monday, till: mondayAfterWeek}
}

const getNextWeekDatesInterval = () => {
  const monday = getModayDate(getToday())
  const mondayAfterWeek = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 7)
  const mondayAfterTwoWeeks = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 14)
  return {since: mondayAfterWeek, till: mondayAfterTwoWeeks}
}

const getThisMonthDatesInterval = () => {
  const today = getToday()
  return {since: new Date(today.getFullYear(), today.getMonth(), 1), till: new Date(today.getFullYear(), today.getMonth() + 1, 0)}
}

const pad = (s) => {
  const str = '' + s
  const pad = '00'
  return pad.substring(0, pad.length - str.length) + str
}

export const convertIntervalToDates = (intervalName) => {

  if (intervalName === interval.TODAY) {
    return {since: getToday(), till: getTomorrowDate()}
  } else if (intervalName === interval.TOMORROW) {
    const tomorrow = getTomorrowDate()
    return {since: tomorrow, till: getTomorrowDate(tomorrow)}
  } else if (intervalName === interval.THIS_WEEK) {
    return getThisWeekDatesInterval()
  } else if (intervalName === interval.NEXT_WEEK) {
    return getNextWeekDatesInterval()
  } else if (intervalName === interval.THIS_MONTH) {
    return getThisMonthDatesInterval()
  } else {
    return {since: null, till: null}
  }

}

export const formatInterval = (dateTimeFrom, dateTimeTo) => {
  return `${dateTimeFrom.getDate()}. ${dateTimeFrom.getMonth() + 1}.
    ${dateTimeFrom.getHours()}:${pad(dateTimeFrom.getMinutes())} -
    ${dateTimeTo.getHours()}:${pad(dateTimeTo.getMinutes())}`
}
