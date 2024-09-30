import config from '../config.json';
const tasksEndpoint = config.baseURL;

const checkResponse = async (response) => {
	if (!response.ok) {
		const errorMessage = await response.text();
		throw new Error(errorMessage || 'Ошибка при выполнении запроса');
	}
	return await response.json();
};

export const tasksAPI = {
	async fetchAll() {
		const response = await fetch(tasksEndpoint);
		return checkResponse(response);
	},

	fetchById: async (id) => {
		const response = await fetch(`${tasksEndpoint}/${id}`);
		return checkResponse(response);
	},

	async create(taskText) {
		if (taskText.trim() === '') {
			throw new Error('Задача не может быть пустой');
		}

		const response = await fetch(tasksEndpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ text: taskText }),
		});
		if (!response.ok) throw new Error('Ошибка при добавлении задачи');
		return checkResponse(response);
	},

	async update(taskId, editTaskText) {
		if (editTaskText.trim() === '') {
			throw new Error('Текст задачи не может быть пустым');
		}

		const response = await fetch(`${tasksEndpoint}/${taskId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ text: editTaskText }),
		});

		if (!response.ok) throw new Error('Ошибка при обновлении задачи');

		return checkResponse(response);
	},

	async delete(taskId) {
		const response = await fetch(`${tasksEndpoint}/${taskId}`, {
			method: 'DELETE',
		});

		if (!response.ok) throw new Error('Ошибка при удалении задачи');
		return checkResponse(response);
	},
};
