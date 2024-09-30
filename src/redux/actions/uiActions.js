export const SET_TASK_TEXT = 'SET_TASK_TEXT';
export const SET_EDIT_TASK = 'SET_EDIT_TASK';
export const SET_EDIT_TASK_TEXT = 'SET_EDIT_TASK_TEXT';
export const SET_ERROR = 'SET_ERROR';
export const SET_LOADING = 'SET_LOADING';

export const setTaskText = (text) => ({
	type: SET_TASK_TEXT,
	payload: text,
});

export const setEditTask = (id, text) => ({
	type: SET_EDIT_TASK,
	payload: { id, text },
});

export const setEditTaskText = (text) => ({
	type: SET_EDIT_TASK_TEXT,
	payload: text,
});
