export const filterTasks = (tasks, query) => {
	return tasks.filter((task) => task.text.toLowerCase().includes(query.toLowerCase()));
};

export const sortTasks = (tasks, isSorted) => {
	if (isSorted) {
		return [...tasks].sort((a, b) => a.text.localeCompare(b.text));
	}
	return tasks;
};
