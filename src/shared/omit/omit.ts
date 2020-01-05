export const omit = <T>(object: object, keys: string|string[]): T => {
  let parsedKeys = [];

  if (Array.isArray(keys)) {
    parsedKeys = keys;
  } else {
    parsedKeys = [keys];
  }

  return Object.entries(object)
    .reduce((acc, [key, value]) => {

      if (parsedKeys.includes(key)) {
        return acc;
      }

      return {
        ...acc,
        [key]: value,
      };
    }, {}) as T;
};
