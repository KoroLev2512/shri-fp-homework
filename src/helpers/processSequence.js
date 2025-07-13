/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import Api from '../tools/api';

const api = new Api();

const isValidString = s =>
  s.length < 10 &&
  s.length > 2 &&
  Number(s) > 0 &&
  /^[0-9.]+$/.test(s);

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
  Promise.resolve(value)
    .then(val => {
      writeLog(val);
      return val;
    })
    .then(val => {
      if (!isValidString(val)) {
        return Promise.reject('ValidationError');
      }
      return val;
    })
    .then(val => {
      const rounded = Math.round(Number(val));
      writeLog(rounded);
      return rounded;
    })
    .then(num =>
      api.get('https://api.tech/numbers/base')({ from: 10, to: 2, number: num })
        .then(({ result }) => {
          writeLog(result);
          return result;
        }),
    )
    .then(binary => {
      writeLog(binary.length);
      return binary.length;
    })
    .then(len => {
      const squared = len * len;
      writeLog(squared);
      return squared;
    })
    .then(sq => {
      const remainder = sq % 3;
      writeLog(remainder);
      return remainder;
    })
    .then(id =>
      api.get(`https://animals.tech/${id}`)({})
        .then(({ result }) => {
          writeLog(result);
          return result;
        }),
    )
.then(handleSuccess)
.catch(err => {
      const message = err === 'ValidationError' ? 'ValidationError' : (err && err.message) || String(err);
      handleError(message);
    });
};

export default processSequence;
