/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

import {
  allPass,
  filter,
  equals,
  values,
  length as arrLength,
  countBy,
  identity,
  toPairs,
  any,
  all,
  prop,
  whereEq,
} from 'ramda';

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([
  whereEq({ star: 'red', square: 'green' }),
  obj => obj.triangle === 'white' && obj.circle === 'white',
]);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = obj =>
  arrLength(filter(equals('green'), values(obj))) >= 2;

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = obj => {
  const [reds, blues] = ['red', 'blue'].map(color =>
    arrLength(filter(equals(color), values(obj))),
  );
  return reds === blues;
};

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = whereEq({
  circle: 'blue',
  star: 'red',
  square: 'orange',
});

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = obj => {
  const counts = countBy(identity, values(obj));
  return any(([color, count]) => color !== 'white' && count >= 3, toPairs(counts));
};

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = obj =>
  arrLength(filter(equals('green'), values(obj))) === 2 &&
  prop('triangle', obj) === 'green' &&
  arrLength(filter(equals('red'), values(obj))) === 1;

// 7. Все фигуры оранжевые.
export const validateFieldN7 = obj =>
  all(equals('orange'), values(obj));

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = obj => {
  const color = prop('star', obj);
  return color !== 'red' && color !== 'white';
};

// 9. Все фигуры зеленые.
export const validateFieldN9 = obj =>
  all(equals('green'), values(obj));

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = obj => {
  const triangleColor = prop('triangle', obj);
  return triangleColor === prop('square', obj) && triangleColor !== 'white';
};
