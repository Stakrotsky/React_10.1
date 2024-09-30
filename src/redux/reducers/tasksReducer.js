import { FETCH_TASKS, ADD_TASK, EDIT_TASK, DELETE_TASK } from '../actions/tasksAction';

const initialState = {
	tasks: [],
};

export const tasksReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_TASKS:
			return { ...state, tasks: action.payload };
		case ADD_TASK:
			return { ...state, tasks: [...state.tasks, action.payload] };
		case EDIT_TASK:
			return {
				...state,
				tasks: state.tasks.map((task) =>
					task.id === action.payload.id ? action.payload : task,
				),
			};
		case DELETE_TASK:
			return {
				...state,
				tasks: state.tasks.filter((task) => task.id !== action.payload),
			};
		default:
			return state;
	}
};
