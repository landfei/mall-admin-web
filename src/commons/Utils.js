import { isEqual } from 'lodash';

/**
 * 对比两个参数是否类似
 *
 * @param {any} param1
 * @param {any} param2
 * @return {boolean}
 */
export function isSame(param1, param2) {
  if (param1 || param2) {
    return isEqual(param1, param2);
  }
  return true;
}

/**
 * 笛卡尔积算法
 *
 * @param {array[array]} 需要生成笛卡尔积的元数据, 是一个二维数组[[a, b],[c,d]]
 * @return {array} 返回笛卡尔积一维数组
 */
export function createCartesian(array = []) {
  if (array.length < 2) return array[0] || [];
  return [].reduce.call(array, function (col, set) {
    var res = [];
    col.forEach(function (c) {
      set.forEach(function (s) {
        var t = [].concat(Array.isArray(c) ? c : [c]);
        t.push(s);
        res.push(t);
      })
    });
    return res;
  });
}
