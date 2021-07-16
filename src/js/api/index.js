// api
import {domain} from '../config/index.js';

export const fetchTodo = async () => {
  const response = await fetch(domain.todo, {
    method: 'GET',
  });

  return await response.json();
};

export const createTodo = async todoData => {
  const response = await fetch(domain.todo, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todoData),
  });

  const result = await response.json();

  return result;
};

export const deleteTodo = async id => {
  const url = `${domain.todo}/${id}`;

  const response = await fetch(url, {
    method: 'DELETE',
  });

  const result = await response.json();

  return result;
};

export const updateTodo = async (id, todoData) => {
  const url = `${domain.todo}/${id}`;

  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todoData),
  });

  const result = await response.json();
  return result;
};
