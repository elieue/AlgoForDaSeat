function toCamelCase(str) {
  return str.replace(/_([a-z])/g, (_, g) => g.toUpperCase());
}

function normalizeObject(obj) {
  const newObj = {};
  for (let key in obj) {
    newObj[toCamelCase(key)] = obj[key];
  }
  return newObj;
}

module.exports = { normalizeObject };