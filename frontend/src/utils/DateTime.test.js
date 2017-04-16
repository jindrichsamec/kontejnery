import MockDate from 'mockdate'
import * as DateTime from './DateTime'

describe('DateTime', () => {

  beforeEach(() => {
    MockDate.set(1487076708000)
  })

  afterEach(() => {
    MockDate.reset();
  })

  it('should return today date at midnight', () => {
    const expected = new Date(2017, 1, 14, 0, 0, 0)
    expect(DateTime.getToday()).toEqual(expected)
  })

  describe('getTomorrowDate', () => {

    it('should return tomorrow date', () => {
      const expected = new Date(2017, 1, 15, 0, 0, 0)
      expect(DateTime.getTomorrowDate()).toEqual(expected)
    })

    it('should return day after given date', () => {
      const expected = new Date(2017, 3, 12, 0, 0, 0)
      const date = new Date(2017, 3, 11, 10, 23, 11)
      expect(DateTime.getTomorrowDate(date)).toEqual(expected)
    })

  })

  describe('formatDayName', () => {

    ['', 'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota', 'Neděle'].forEach((value, index) => {

      it('should return day name', () => {
        expect(DateTime.formatDayName(index)).toBe(value)
      })

    })

  })

  it('should format date', () => {
    expect(DateTime.formatDate(new Date(2017, 3, 12))).toBe('12. 4. 2017')
  })

})
