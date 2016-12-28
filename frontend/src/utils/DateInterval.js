import keymirror from 'keymirror'
import { getToday, getTomorrowDate, getModayDate, getSundayDate } from './DateTime'

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

const pad = (s) => {
  const str = '' + s
  const pad = '00'
  return pad.substring(0, pad.length - str.length) + str
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

export const formatInterval = (dateTimeFrom, dateTimeTo) => {
  return `${dateTimeFrom.getDate()}. ${dateTimeFrom.getMonth() + 1}.
    ${dateTimeFrom.getHours()}:${pad(dateTimeFrom.getMinutes())} -
    ${dateTimeTo.getHours()}:${pad(dateTimeTo.getMinutes())}`
}