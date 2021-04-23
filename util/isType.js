/*
 * @Author: zhangyang
 * @Date: 2020-11-12 10:23:05
 * @LastEditTime: 2020-11-12 14:07:15
 * @Description: 判断变量的类型
 */
function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}
function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}
function isNumber(num) {
  return Object.prototype.toString.call(num) === '[object Number]';
}
function isString(str) {
  return Object.prototype.toString.call(str) === '[object String]';
}
function isBoolean(bool) {
  return Object.prototype.toString.call(bool) === '[object Boolean]';
}
function isNull(n) {
  return Object.prototype.toString.call(n) === '[object Null]';
}
function isUndefined(u) {
  return Object.prototype.toString.call(u) === '[object Undefined]';
}
function isMap(m) {
  return Object.prototype.toString.call(m) === '[object Map]';
}
function isWeakMap(m) {
  return Object.prototype.toString.call(m) === '[object WeakMap]';
}
function isSet(s) {
  return Object.prototype.toString.call(s) === '[object Set]';
}
function isWeakSet(s) {
  return Object.prototype.toString.call(s) === '[object WeakSet]';
}
function isArrayBuffer(s) {
  return Object.prototype.toString.call(s) === '[object ArrayBuffer]';
}
function isRegExp(reg) {
  return Object.prototype.toString.call(reg) === '[object RegExp]';
}
function isFunction(f) {
  return Object.prototype.toString.call(f) === '[object Function]';
}
function isSymbol(s) {
  return Object.prototype.toString.call(s) === '[object Symbol]';
}
export {
  isArray,
  isObject,
  isNumber,
  isString,
  isBoolean,
  isNull,
  isUndefined,
  isMap,
  isWeakMap,
  isSet,
  isWeakSet,
  isArrayBuffer,
  isRegExp,
  isFunction,
  isSymbol
}