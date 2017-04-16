import keymirror from 'keymirror'
import { getToday, getTomorrowDate } from './DateTime'

export const interval = keymirror({
  TODAY: null,
  TOMORROW: null,
  NEXT_SEVEN_DAYS: null,
  THIS_MONTH: null,
  ALL: null
})

const getNextSevenDaysDatesInterval = () => {
  const today = getToday()
  const afterWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)
  return {since: today, till: afterWeek}
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
  } else if (intervalName === interval.NEXT_SEVEN_DAYS) {
    return getNextSevenDaysDatesInterval()
  } else if (intervalName === interval.THIS_MONTH) {
    return getThisMonthDatesInterval()
  } else {
    return {since: null, till: null}
  }

}

export const formatTimeInterval = (dateTimeFrom, dateTimeTo) => {
  return `${dateTimeFrom.getHours()}:${pad(dateTimeFrom.getMinutes())} -
    ${dateTimeTo.getHours()}:${pad(dateTimeTo.getMinutes())}`
}
