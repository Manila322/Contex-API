import React from 'react';
import ReactDOM from 'react-dom/client';
import { TodoProvider } from './TodoContext';
import { App } from './app';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<TodoProvider>
		<App />
	</TodoProvider>,
);
