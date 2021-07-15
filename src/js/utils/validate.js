export const isArray = value => {
  return Array.isArray(value);
};

export const isPlainObject = value => {
  return Object.prototype.toString.call(value) === '[object Object]';
};

export const isElement = el => {
  return el instanceof HTMLElement;
};
