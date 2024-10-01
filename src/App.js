import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ConnectedTasks } from './components/Tasks';
import { setTaskText, setEditTaskText } from './redux/actions/uiActions';

class App extends Component {
	render() {
		const {
			taskText,
			editTaskId,
			editTaskText,
			isSorted,
			error,
			isLoading,
			setTaskText,
			setEditTaskText,
		} = this.props;

		return (
			<ConnectedTasks>
				{({
					handleAddTask,
					handleSaveEditedTask,
					handleDeleteTask,
					handleSort,
					handleSearchChange,
					handleEditTask,
					sortedTasks,
				}) => (
					<div className="min-h-screen bg-gray-100 p-5">
						<h3 className="text-2xl font-bold mb-4">Список задач:</h3>
						{error && <div className="text-red-500 mb-4">{error}</div>}
						{isLoading ? (
							<div>Загрузка...</div>
						) : (
							<>
								<div className="mb-4 flex space-x-2">
									<input
										type="text"
										value={taskText}
										onChange={(e) => setTaskText(e.target.value)}
										placeholder="Ввести новую задачу"
										className="border border-gray-300 rounded p-2 w-full"
									/>
									<button
										onClick={handleAddTask}
										className="bg-blue-500 text-white px-4 py-2 rounded"
									>
										Добавить задачу
									</button>
								</div>
								<div className="flex space-x-2 mb-4">
									<input
										type="text"
										onChange={handleSearchChange}
										placeholder="Поиск задач"
										className="border border-gray-300 rounded p-2 w-full"
									/>
									<button
										onClick={handleSort}
										className="bg-blue-500 text-white px-4 py-2 rounded"
									>
										{isSorted
											? 'Отмена сортировки'
											: 'Сортировать по алфавиту'}
									</button>
								</div>
								<div>
									<h3 className="text-xl font-bold mb-2">
										Текущие задачи:
									</h3>
									<ul className="space-y-2">
										{sortedTasks.map((task) => (
											<li key={task.id} className="border-b pb-2">
												{editTaskId === task.id ? (
													<div className="flex space-x-2">
														<input
															type="text"
															value={editTaskText}
															onChange={(e) =>
																setEditTaskText(
																	e.target.value,
																)
															}
															className="border border-gray-300 rounded p-2 w-full"
														/>
														<div className="flex space-x-2">
															<button
																onClick={
																	handleSaveEditedTask
																}
																className="bg-green-500 text-white px-4 py-2 rounded"
															>
																Сохранить
															</button>
															<button
																onClick={() =>
																	handleEditTask(null)
																}
																className="bg-gray-300 px-4 py-2 rounded"
															>
																Отмена
															</button>
														</div>
													</div>
												) : (
													<div className="flex justify-between items-center">
														<span>{task.text}</span>
														<div className="flex space-x-2">
															<button
																onClick={() =>
																	handleEditTask(task)
																}
																className="bg-green-500 text-white px-4 py-2 rounded"
															>
																Изменить
															</button>
															<button
																onClick={() =>
																	handleDeleteTask(
																		task.id,
																	)
																}
																className="bg-red-500 text-white px-4 py-2 rounded"
															>
																Удалить
															</button>
														</div>
													</div>
												)}
											</li>
										))}
									</ul>
								</div>
							</>
						)}
					</div>
				)}
			</ConnectedTasks>
		);
	}
}

const mapStateToProps = (state) => ({
	taskText: state.ui.taskText,
	editTaskId: state.ui.editTaskId,
	editTaskText: state.ui.editTaskText,
	isSorted: state.filters.isSorted,
	error: state.filters.error,
	isLoading: state.filters.isLoading,
});

const mapDispatchToProps = {
	setTaskText,
	setEditTaskText,
};

export const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
