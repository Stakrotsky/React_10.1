import { SET_SEARCH_QUERY, SET_SORTED } from '../actions/filterActions';

const initialState = {
	searchQuery: '',
	isSorted: false,
};

export const filterReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_SEARCH_QUERY:
			return { ...state, searchQuery: action.payload };
		case SET_SORTED:
			return { ...state, isSorted: action.payload };
		default:
			return state;
	}
};
