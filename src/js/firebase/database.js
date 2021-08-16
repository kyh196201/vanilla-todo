// Firebase instance
import {db} from './index';

const todoDb = db.collection('todos');

/**
 * create todo item
 * @param {string} title
 * @returns firestroe ref
 */
const createTodo = async title => {
  try {
    const todoData = {
      title,
      isCompleted: false,
      timestamp: Date.now(),
    };

    const ref = await todoDb.add(todoData);

    return ref.id;
  } catch (error) {
    console.error('createTodo error', error);
    throw error;
  }
};

/**
 * fetch todo list
 * @returns array
 */
const fetchTodo = async () => {
  try {
    const snapshot = await todoDb.get();

    const todos = [];

    snapshot.forEach(doc => {
      console.log(`${doc.id} => ${doc.data()}`);

      todos.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return todos;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * delete todo item
 * @param {string} id : firestore collection document id
 * @returns boolean
 */
const deleteTodo = async id => {
  try {
    const item = todoDb.doc(id);
    await item.delete();
    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 1. 변경될 수 있는 사항: 순서, 체크 여부, 타이틀, 상세 내용, 날짜?
 */
const updateTodo = async (id, todoData = {}) => {
  try {
    const item = todoDb.doc(id);
    const result = await item.update(todoData);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {createTodo, fetchTodo, deleteTodo, updateTodo};
