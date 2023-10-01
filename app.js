document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const taskName = document.getElementById('task-name').value;
        const dueDate = document.getElementById('due-date').value;
        const assignee = document.getElementById('assignee').value;
        const reminderDate = document.getElementById('reminder-date').value; // Get reminder date

        if (taskName && dueDate && assignee) {
            createTask(taskName, dueDate, assignee,reminderDate) ;
            taskForm.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });

    function createTask(name, date, assignee,reminderDate) {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task');

        const taskInfo = document.createElement('div');
        taskInfo.innerHTML = `
            <p><strong>Task:</strong> ${name}</p>
            <p><strong>Due Date:</strong> ${date}</p>
            <p><strong>Assignee:</strong> ${assignee}</p>
            <p><strong>Reminder Date:</strong> ${reminderDate || 'Not set'}</p>
        `;

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', () => {
            taskItem.remove();
        });

        taskItem.appendChild(taskInfo);
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
        if (reminderDate) {
            const currentDate = new Date().toISOString().split('T')[0];
            if (reminderDate >= currentDate) {
                const timeUntilReminder = new Date(reminderDate) - new Date();
                setTimeout(() => {
                    alert(`Reminder: Task "${name}" is due today!`);
                }, timeUntilReminder);
            }
        }
    }
    function showNotification(message) {
        if (Notification.permission === 'granted') {
            const notification = new Notification('Task Reminder', {
                body: message,
            });
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                    showNotification(message);
                }
            });
        }
    }

    // Request permission for notifications when the page loads
    if (Notification.permission !== 'granted') {
        Notification.requestPermission();
    }
});





