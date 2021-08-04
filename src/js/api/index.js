// api
import {domain} from 'Config/';

export const fetchTodos = async () => {
  const response = await fetch(domain.todo, {
    method: 'GET',
  });

  return await response.json();
};

export const createTodo = async todoData => {
  try {
    const response = await fetch(domain.todo, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoData),
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const deleteTodo = async id => {
  const url = `${domain.todo}/${id}`;

  try {
    const response = await fetch(url, {
      method: 'DELETE',
    });

    return await response.json();
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const updateTodo = async (id, todoData) => {
  try {
    const url = `${domain.todo}/${id}`;

    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoData),
    });

    return await response.json();
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
