import { useEffect } from 'react';
import { ControlPanel, Todo } from './components';
import { useTodoContext } from './TodoContext';
import styles from './app.module.css';

export const App = () => {
	const {
		todos,
		onTodoAdd,
		onTodoEdit,
		onTodoTitleChange,
		onTodoCompletedChange,
		onTodoSave,
		onTodoRemove,
		setSearchPhrase,
		setIsAlphabetSorting,
	} = useTodoContext();

	return (
		<div className={styles.app}>
			<ControlPanel
				onTodoAdd={onTodoAdd}
				onSearch={setSearchPhrase}
				onSorting={setIsAlphabetSorting}
			/>
			<div>
				{todos.map(({ id, title, completed, isEditing = false }) => (
					<Todo
						key={id}
						id={id}
						title={title}
						completed={completed}
						isEditing={isEditing}
						onEdit={() => onTodoEdit(id)}
						onTitleChange={(newTitle) => onTodoTitleChange(id, newTitle)}
						onCompletedChange={(newCompleted) =>
							onTodoCompletedChange(id, newCompleted)
						}
						onSave={() => onTodoSave(id)}
						onRemove={() => onTodoRemove(id)}
					/>
				))}
			</div>
		</div>
	);
};
