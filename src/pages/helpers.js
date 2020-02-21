export function formatCurrency(num) {
  return num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}

export const getRandomInt = (min, max) => {
  const plusOrMinus = Math.random() < 0.5 ? -1 : 1;
  min = Math.ceil(min);
  max = Math.floor(max);
  return 1 + (((Math.floor(Math.random() * (max - min + 1)) + min) * plusOrMinus) / 100);
}

export function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this, args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}