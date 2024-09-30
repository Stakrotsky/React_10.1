export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
export const SET_SORTED = 'SET_SORTED';

export const setSearchQuery = (query) => ({
	type: SET_SEARCH_QUERY,
	payload: query,
});

export const setSorted = (isSorted) => ({
	type: SET_SORTED,
	payload: isSorted,
});
