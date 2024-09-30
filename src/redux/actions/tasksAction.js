import { tasksAPI } from '../../api/api';

export const FETCH_TASKS = 'FETCH_TASKS';
export const ADD_TASK = 'ADD_TASK';
export const EDIT_TASK = 'EDIT_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const SET_ERROR = 'SET_ERROR';
export const SET_LOADING = 'SET_LOADING';

export const fetchTasks = () => async (dispatch) => {
	dispatch({ type: SET_LOADING, payload: true });
	try {
		const tasks = await tasksAPI.fetchAll();
		dispatch({ type: FETCH_TASKS, payload: tasks });
	} catch (error) {
		dispatch({ type: SET_ERROR, payload: error.message });
	} finally {
		dispatch({ type: SET_LOADING, payload: false });
	}
};

export const addTask = (taskText) => async (dispatch) => {
	try {
		const newTask = await tasksAPI.create(taskText);
		dispatch({ type: ADD_TASK, payload: newTask });
	} catch (error) {
		dispatch({ type: SET_ERROR, payload: error.message });
	}
};

export const editTask = (id, text) => async (dispatch) => {
	try {
		const updatedTask = await tasksAPI.update(id, text);
		dispatch({ type: EDIT_TASK, payload: updatedTask });
	} catch (error) {
		dispatch({ type: SET_ERROR, payload: error.message });
	}
};

export const deleteTask = (id) => async (dispatch) => {
	try {
		await tasksAPI.delete(id);
		dispatch({ type: DELETE_TASK, payload: id });
	} catch (error) {
		dispatch({ type: SET_ERROR, payload: error.message });
	}
};
