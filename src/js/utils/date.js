import {DAYS} from 'Utils/constant';

const getMonth = date => date.getMonth() + 1;

const getDate = date => date.getDate();

const getDay = date => date.getDay();

const getHours = date => date.getHours();

const getMinutes = date => date.getMinutes();

const formatDate = (value = new Date()) => {
  try {
    let dateInstance = value;

    if (!(value instanceof Date)) {
      dateInstance = new Date(value);
    }

    const month = getMonth(dateInstance);
    const date = getDate(dateInstance);
    const day = getDay(dateInstance);

    return `${month}/${date} ${DAYS[day]}.`;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

const formatTime = (value = new Date()) => {
  try {
    let dateInstance = value;

    if (!(value instanceof Date)) {
      dateInstance = new Date(value);
    }

    let hours = getHours(dateInstance);
    let postFix = 'AM';
    const minutes = getMinutes(dateInstance);

    if (hours > 12) {
      postFix = 'PM';
      hours -= 12;
    }

    const minutesAsString = minutes < 10 ? `0${minutes}` : `${minutes}`;

    return `${hours}:${minutesAsString} ${postFix}`;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

export {getMonth, getDate, getDay, formatDate, formatTime};
