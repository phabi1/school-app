import * as _ from 'lodash';

export function difference(object, base) {
  function changes(a: any, b: any) {
    return _.transform(a, function (result, value, key) {
      if (!_.isEqual(value, b[key])) {
        result[key] = (_.isObject(value) && _.isObject(b[key])) ? changes(value, b[key]) : value;
      }
    });
  }
  return changes(object, base);
}
