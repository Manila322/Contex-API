import React, { createContext, useContext, useState, useEffect } from 'react';
import { createTodo, readTodos, updateTodo, deleteTodo } from './api';
import { addTodoInTodos, findTodo, removeTodoInTodos, setTodoInTodos } from './utils';
import { NEW_TODO_ID } from './constants';

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
	const [todos, setTodos] = useState([]);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [isAlphabetSorting, setIsAlphabetSorting] = useState(false);

	useEffect(() => {
		readTodos(searchPhrase, isAlphabetSorting).then(setTodos);
	}, [searchPhrase, isAlphabetSorting]);

	const onTodoAdd = () => {
		setTodos(addTodoInTodos(todos));
	};

	const onTodoSave = (todoId) => {
		const { title, completed } = findTodo(todos, todoId) || {};

		if (todoId === NEW_TODO_ID) {
			createTodo({ title, completed }).then((todo) => {
				let updatedTodos = setTodoInTodos(todos, {
					id: NEW_TODO_ID,
					isEditing: false,
				});
				updatedTodos = removeTodoInTodos(updatedTodos, NEW_TODO_ID);
				updatedTodos = addTodoInTodos(updatedTodos, todo);
				setTodos(updatedTodos);
			});
		} else {
			updateTodo({ id: todoId, title }).then(() => {
				setTodos(setTodoInTodos(todos, { id: todoId, isEditing: false }));
			});
		}
	};

	const onTodoEdit = (id) => {
		setTodos(setTodoInTodos(todos, { id, isEditing: true }));
	};

	const onTodoTitleChange = (id, newTitle) => {
		setTodos(setTodoInTodos(todos, { id, title: newTitle }));
	};

	const onTodoCompletedChange = (id, newCompleted) => {
		updateTodo({ id, completed: newCompleted }).then(() => {
			setTodos(setTodoInTodos(todos, { id, completed: newCompleted }));
		});
	};

	const onTodoRemove = (id) => {
		deleteTodo(id).then(() => setTodos(removeTodoInTodos(todos, id)));
	};

	return (
		<TodoContext.Provider
			value={{
				todos,
				onTodoAdd,
				onTodoSave,
				onTodoEdit,
				onTodoTitleChange,
				onTodoCompletedChange,
				onTodoRemove,
				setSearchPhrase,
				setIsAlphabetSorting,
			}}
		>
			{children}
		</TodoContext.Provider>
	);
};

export const useTodoContext = () => useContext(TodoContext);
