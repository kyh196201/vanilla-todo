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

const todoTemplate = todo => {
  const {id} = todo;

  const $checkbox = checkboxTemplate(todo);

  return `
      <li class="todo-item" data-id="${id}">
        ${$checkbox}
        <button type="button" aria-label="edit" class="todo-item__btn todo-item__btn--edit">
          <i class="fas fa-edit"></i>
        </button>
        <button type="button" aria-label="delete" class="todo-item__btn todo-item__btn--delete">
          <i class="fas fa-times"></i>
        </button>
      </li>`;
};

export default todoTemplate;
