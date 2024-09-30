import {
	SET_LOADING,
	SET_ERROR,
	SET_TASK_TEXT,
	SET_EDIT_TASK,
	SET_EDIT_TASK_TEXT,
} from '../actions/uiActions';

const initialState = {
	isLoading: false,
	error: null,
	taskText: '',
	editTaskId: null,
	editTaskText: '',
};

export const uiReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_LOADING:
			return { ...state, isLoading: action.payload };
		case SET_ERROR:
			return { ...state, error: action.payload };
		case SET_TASK_TEXT:
			return { ...state, taskText: action.payload };
		case SET_EDIT_TASK:
			return {
				...state,
				editTaskId: action.payload.id,
				editTaskText: action.payload.text,
			};
		case SET_EDIT_TASK_TEXT:
			return { ...state, editTaskText: action.payload };
		default:
			return state;
	}
};
