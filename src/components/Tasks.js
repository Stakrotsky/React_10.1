import { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTasks, addTask, editTask, deleteTask } from '../redux/actions/tasksAction';
import { setEditTask, setTaskText } from '../redux/actions/uiActions';
import { setSearchQuery, setSorted } from '../redux/actions/filterActions';

class Tasks extends Component {
	componentDidMount() {
		this.props.fetchTasks();
	}

	handleAddTask = () => {
		const { taskText, addTask, setTaskText } = this.props;
		if (taskText.trim()) {
			addTask(taskText).then(() => {
				setTaskText('');
				this.props.setEditTask(null, '');
			});
		}
	};

	handleEditTask = (task) => {
		if (task) {
			this.props.setEditTask(task.id, task.text);
		} else {
			this.props.setEditTask(null, '');
		}
	};

	handleSaveEditedTask = () => {
		const { editTaskId, editTaskText, editTask, setEditTask } = this.props;
		if (editTaskText.trim()) {
			editTask(editTaskId, editTaskText).then(() => {
				setEditTask(null, '');
			});
		}
	};

	handleDeleteTask = (id) => {
		this.props.deleteTask(id);
	};

	handleSort = () => {
		const { isSorted, setSorted } = this.props;
		setSorted(!isSorted);
	};

	handleSearchChange = (e) => {
		this.props.setSearchQuery(e.target.value);
	};

	render() {
		const { tasks, searchQuery, isSorted } = this.props;

		const filteredTasks = tasks.filter((task) =>
			task.text.toLowerCase().includes(searchQuery.toLowerCase()),
		);

		const sortedTasks = isSorted
			? [...filteredTasks].sort((a, b) => a.text.localeCompare(b.text))
			: filteredTasks;

		return this.props.children({
			handleAddTask: this.handleAddTask,
			handleSaveEditedTask: this.handleSaveEditedTask,
			handleDeleteTask: this.handleDeleteTask,
			handleSort: this.handleSort,
			handleSearchChange: this.handleSearchChange,
			handleEditTask: this.handleEditTask,
			sortedTasks,
		});
	}
}

const mapStateToProps = (state) => ({
	taskText: state.ui.taskText,
	editTaskId: state.ui.editTaskId,
	editTaskText: state.ui.editTaskText,
	tasks: state.tasks.tasks,
	searchQuery: state.filters.searchQuery,
	isSorted: state.filters.isSorted,
});

const mapDispatchToProps = {
	fetchTasks,
	addTask,
	editTask,
	deleteTask,
	setEditTask,
	setTaskText,
	setSearchQuery,
	setSorted,
};

export const ConnectedTasks = connect(mapStateToProps, mapDispatchToProps)(Tasks);
