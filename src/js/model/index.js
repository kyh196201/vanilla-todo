import {getItem, setItem} from 'Utils/storage/';

const todoModel = {
  data: getItem(),

  update(id, todoData) {
    const self = this;
    const {data} = self;
    const {title, isCompleted} = todoData;
    const target = self.find(id);

    return new Promise((resolve, reject) => {
      if (target) {
        const index = self.findIndex(id);

        const newItem = {
          id,
          title: title ?? target.title,
          isCompleted: isCompleted ?? target.isCompleted,
        };

        const newData = [
          ...data.slice(0, index),
          newItem,
          ...data.slice(index + 1),
        ];

        self.data = newData;
        setItem(newData);

        resolve({
          message: 'success',
          data: {
            todoItem: newItem,
          },
        });
      } else {
        reject(new Error('update failed'));
      }
    });
  },

  add(title) {
    const self = this;
    const {data} = self;
    const id = Math.max(0, ...data.map(d => d.id)) + 1;
    const newItem = {
      id,
      title,
      isCompleted: false,
    };

    const newData = [...data, newItem];
    self.data = newData;
    setItem(newData);

    return Promise.resolve({
      message: 'success',
      data: {
        todoItem: newItem,
      },
    });
  },

  delete(id) {
    const self = this;
    const {data} = self;
    const target = this.find(id);

    return new Promise((resolve, reject) => {
      if (target) {
        const index = self.findIndex(id);
        const newData = [...data.slice(0, index), ...data.slice(index + 1)];
        self.data = newData;
        setItem(newData);

        resolve({
          message: 'success',
          data: {
            todoItem: target,
          },
        });
      } else {
        reject(new Error('delete failed'));
      }
    });
  },

  read() {
    const self = this;

    return Promise.resolve({
      message: 'success',
      data: {
        todoList: [...self.data],
      },
    });
  },

  find(id) {
    return this.data.find(item => item.id === id);
  },

  findIndex(id) {
    return this.data.findIndex(item => item.id === id);
  },
};

export default todoModel;
