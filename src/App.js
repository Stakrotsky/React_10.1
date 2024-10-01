import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTaskText, setEditTaskText, setEditTask } from './redux/actions/uiActions';
import { Tasks } from './components/Tasks';

export const App = () => {
	const { taskText, editTaskId, editTaskText } = useSelector((state) => state.ui);
	const { isSorted, error, isLoading } = useSelector((state) => state.filters);

	const dispatch = useDispatch();

	const {
		handleAddTask,
		handleSaveEditedTask,
		handleDeleteTask,
		handleSort,
		handleSearchChange,
		handleEditTask,
		sortedTasks,
	} = Tasks();

	return (
		<div className="min-h-screen bg-gray-100 p-5">
			<h3 className="text-2xl font-bold mb-4">Список задач:</h3>
			<div className="mb-4 flex space-x-2">
				<input
					type="text"
					value={taskText}
					onChange={(e) => dispatch(setTaskText(e.target.value))}
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
			{error && <div className="text-red-500 mb-4">{error}</div>}
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
					{isSorted ? 'Отмена сортировки' : 'Сортировать по алфавиту'}
				</button>
			</div>
			<div>
				<h3 className="text-xl font-bold mb-2">Текущие задачи:</h3>
				{isLoading ? (
					<div className="loader">Загрузка...</div>
				) : (
					<ul className="space-y-2">
						{sortedTasks.map((task) => (
							<li key={task.id} className="border-b pb-2">
								{editTaskId === task.id ? (
									<div className="flex space-x-2">
										<input
											type="text"
											value={editTaskText}
											onChange={(e) =>
												dispatch(setEditTaskText(e.target.value))
											}
											className="border border-gray-300 rounded p-2 w-full"
										/>
										<div className="flex space-x-2">
											<button
												onClick={handleSaveEditedTask}
												className="bg-green-500 text-white px-4 py-2 rounded"
											>
												Сохранить
											</button>
											<button
												onClick={() =>
													dispatch(setEditTask(null, ''))
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
												onClick={() => handleEditTask(task)}
												className="bg-yellow-500 text-white px-4 py-2 rounded"
											>
												Изменить
											</button>
											<button
												onClick={() => handleDeleteTask(task.id)}
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
				)}
			</div>
		</div>
	);
};
