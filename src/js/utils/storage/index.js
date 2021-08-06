import {LS_KEY} from 'Config/';

const setItem = data => {
  localStorage.setItem(LS_KEY, JSON.stringify(data));
  return true;
};

const getItem = () => {
  const data = localStorage.getItem(LS_KEY);

  return data ? JSON.parse(data) : [];
};

export {setItem, getItem};
