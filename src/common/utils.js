import {Place, MAX_HOURS, HOURS_FORMAT, POSITIVE_SIGN, NEGATIVE_SIGN, MAX_DAYS} from '../common/consts.js';

export const render = (container, template, place = Place.BEFOREEND) => {
  container.insertAdjacentHTML(place, template);
};

export const getRandomNumber = (max, min = 0) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const getBoolean = () => Math.random() > 0.5;

export const castTimeFormat = (value) => {
  return value < MAX_HOURS ? `0${value}` : String(value);
};

export const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % HOURS_FORMAT);
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

export const getRandomDate = () => {
  const targetDate = new Date();
  const sign = getBoolean() ? POSITIVE_SIGN : NEGATIVE_SIGN;
  const diffValue = sign * getRandomNumber(MAX_DAYS);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};
