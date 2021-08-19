function capitalizeFirstLetter(str = '') {
  if (!str) return '';

  const firstLetter = str.charAt(0);

  return firstLetter.toUpperCase() + str.substring(1);
}

export {capitalizeFirstLetter};
