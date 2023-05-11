const MS_DAY = 24 * 60 * 60 * 1000;

const getDayOfYear = (inputDate = new Date()) => {
  const firstDayOfYear = Date.UTC(inputDate.getFullYear(), 0, 0);
  const date = Date.UTC(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());
  return (date - firstDayOfYear) / MS_DAY;
};

const getYear = (julianYearLastDigit) => {
  const currentYear = new Date().getFullYear();
  if (!julianYearLastDigit) return currentYear;
  const year = (Math.trunc(currentYear / 10) * 10) + parseInt(julianYearLastDigit, 10);
  const finalYear = currentYear > year ? year + 10 : year;
  return finalYear;
};

const iataJulianDateRegexp = /^(?<julianYearLastDigit>\d)?(?<julianDayOfYear>\d{3})$/;

const getUTCDate = (input) => {
  const { groups: { julianYearLastDigit, julianDayOfYear } } = input.match(iataJulianDateRegexp);
  const year = getYear(julianYearLastDigit);
  const date = new Date(Date.UTC(year, 0, parseInt(julianDayOfYear, 10)));
  if (getDayOfYear() > getDayOfYear(date)) {
    date.setFullYear(date.getFullYear() + 1);
  }
  return date;
};

module.exports = {
  getUTCDate
};
