export function downCountDate(date: string, langCode: any): any {
  let countDownDate = new Date(date).getTime();
  let now = new Date().getTime();
  let distance = countDownDate - now;

  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  let result = {};

  if (distance < 0) {
    result = {
      total: countDownDate,
      tick: distance,
      result: 'EXPIRED',
      percent: 0,
    };
  } else {
    result = {
      total: countDownDate,
      tick: distance,
      result: `${days}${langCode.d} \n ${hours}${langCode.h} ${minutes}${langCode.m} \n ${seconds}${langCode.s}`,
      percent: calc(countDownDate / 1000, now, distance),
    };
  }

  return result;
}

function calc(c: number, n: number, d: number) {
  //TODO
  //c = 100%
  //c - d = tick%
  return Math.floor((100 * (c - d)) / c);
}

export function calculatePercentage(total: number, tick: number): number {
  return Math.floor(100 - (tick * 100) / (total / 1000));
}
