const checkboxTemplate = ({title, isCompleted}) => {
  const $checkbox = isCompleted
    ? `<input type="checkbox" class="todo-item__checkbox" checked>`
    : `<input type="checkbox" class="todo-item__checkbox" />`;

  const $title = isCompleted ? `<strike>${title}</strike>` : title;

  return `
	  <div class="todo-item__checkbox-wrapper pretty p-default">
		${$checkbox}
		<div class="state p-danger">
			<label>
			  <span class="todo-item__title">
				${$title}
			  </span>
			</label>
		</div>
	  </div>
	`;
};

const editInputTemplate = title => `
	  <div class="todo-item__edit-wrapper">
		<input type="text" class="todo-item__edit" value="${title}">
	  </div>
	`;

const editTemplate = todo => {
  const {id, title} = todo;
  const $inputTemplate = editInputTemplate(title);

  return `
      <li class="todo-item" data-id="${id}">
        ${$inputTemplate}
		<div class="todo-item__btns">
			<button type="button" aria-label="done" class="todo-item__btn todo-item__btn--done">
				<i class="fas fa-check"></i>
			</button>
			<button type="button" aria-label="redo" class="todo-item__btn todo-item__btn--redo">
				<i class="fas fa-redo-alt"></i>
			</button>
		</div>
      </li>`;
};

const todoTemplate = todo => {
  const {id} = todo;

  const $checkbox = checkboxTemplate(todo);

  return `
      <li class="todo-item" data-id="${id}">
        ${$checkbox}
		<div class="todo-item__btns">
			<button type="button" aria-label="edit" class="todo-item__btn todo-item__btn--edit">
				<i class="fas fa-edit"></i>
			</button>
			<button type="button" aria-label="delete" class="todo-item__btn todo-item__btn--delete">
				<i class="fas fa-times"></i>
			</button>
		</div>
      </li>`;
};

export {todoTemplate, editTemplate};
