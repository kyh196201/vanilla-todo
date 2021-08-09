// Firebase instance
import uuidv4 from 'Utils/uuid';
import firebaseInstance from './index';

// Utils
const {database, firebase} = firebaseInstance;

// get server timestamp
// Ref: https://stackoverflow.com/questions/34718668/firebase-timestamp-to-date-and-time
const getServerTimestamp = () => firebase.database.ServerValue.TIMESTAMP;

const createTodo = title => {
  database.ref('todos/').push({
    id: uuidv4(),
    title,
    timestamp: getServerTimestamp(),
  });
};

const fetchTodos = async () => {
  try {
    const dbRef = firebase.database().ref();
    const snapshot = await dbRef.child('todos').get();
    if (snapshot.exists()) {
      const result = snapshot.val();

      return {
        isError: false,
        data: {
          todos: result,
        },
      };
    }
    throw new Error('No data available');
  } catch (error) {
    console.error(error.message);

    return {
      isError: true,
      message: error.message,
    };
  }
};

export {createTodo, fetchTodos};
