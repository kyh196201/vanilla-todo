// Utils
import {formatTime} from 'Utils/date';

const checkboxTemplate = ({id, title, isCompleted}) => {
  const $checkbox = isCompleted
    ? `<input type="checkbox" id="${id}" class="todo-item__checkbox" checked>`
    : `<input type="checkbox" id="${id}" class="todo-item__checkbox" />`;

  return `
	${$checkbox}
	<label class="todo-item__label ${isCompleted ? 'completed' : ''}" for="${id}">
		<p class="todo-item__title">${title}</p>
	</label>
  `;
};

const editTemplate = todo => {
  const {id, title, timestamp} = todo;

  return `
      <li class="todo-item" data-id="${id}">
	  	<div class="todo-item__top">
			<input type="text" class="todo-item__edit" value="${title}">
			<div class="todo-item__btns">
				<button type="button" aria-label="done" class="todo-item__btn todo-item__btn--done">
					<i class="fas fa-check"></i>
				</button>
				<button type="button" aria-label="redo" class="todo-item__btn todo-item__btn--redo">
					<i class="fas fa-redo-alt"></i>
				</button>
			</div>
		</div>
		<div class="todo-item__date">
			<span>${formatTime(timestamp)}</span>
		</div>
      </li>`;
};

const todoTemplate = todo => {
  const {id, timestamp} = todo;

  const $checkbox = checkboxTemplate(todo);

  return `
      <li class="todo-item" data-id="${id}">
	  	<div class="todo-item__top">
			${$checkbox}
			<div class="todo-item__btns">
				<button type="button" aria-label="edit" class="todo-item__btn todo-item__btn--edit">
					<i class="fas fa-edit"></i>
				</button>
				<button type="button" aria-label="delete" class="todo-item__btn todo-item__btn--delete">
					<i class="fas fa-times"></i>
				</button>
			</div>
		</div>
		<div class="todo-item__date">
			<span>${formatTime(timestamp)}</span>
		</div>
      </li>`;
};

export {todoTemplate, editTemplate};
