import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, addTask, editTask, deleteTask } from '../redux/actions/tasksAction';
import { setEditTask, setTaskText } from '../redux/actions/uiActions';
import { setSearchQuery, setSorted } from '../redux/actions/filterActions';

export const Tasks = (props) => {
	const dispatch = useDispatch();

	const { taskText, editTaskId, editTaskText } = useSelector((state) => state.ui);
	const { tasks } = useSelector((state) => state.tasks);
	const { searchQuery, isSorted } = useSelector((state) => state.filters);

	useEffect(() => {
		dispatch(fetchTasks());
	}, [dispatch]);

	const handleAddTask = () => {
		if (taskText.trim()) {
			dispatch(addTask(taskText)).then(() => {
				dispatch(setTaskText(''));
			});
		}
	};

	const handleEditTask = (task) => {
		dispatch(setEditTask(task.id, task.text));
	};

	const handleSaveEditedTask = () => {
		if (editTaskText.trim()) {
			dispatch(editTask(editTaskId, editTaskText)).then(() => {
				dispatch(setEditTask(null, ''));
			});
		}
	};

	const handleDeleteTask = (id) => {
		dispatch(deleteTask(id));
	};

	const handleSort = () => {
		dispatch(setSorted(!isSorted));
	};

	const handleSearchChange = (e) => {
		dispatch(setSearchQuery(e.target.value));
	};

	const filteredTasks = tasks.filter((task) =>
		task.text.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	const sortedTasks = isSorted
		? [...filteredTasks].sort((a, b) => a.text.localeCompare(b.text))
		: filteredTasks;

	return {
		handleAddTask,
		handleSaveEditedTask,
		handleDeleteTask,
		handleSort,
		handleSearchChange,
		handleEditTask,
		sortedTasks,
	};
};
