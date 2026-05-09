import { useEffect, useState }
from 'react';

import API from '../api/axios';

import Navbar from '../components/Navbar';

function Tasks() {

    const [tasks, setTasks] = useState([]);

    const [formData, setFormData] = useState({

        title: '',
        description: '',
        due_date: '',
        project_id: '',
        assigned_to: ''
    });


    // Handle input
    const handleChange = (e) => {

        setFormData({

            ...formData,
            [e.target.name]: e.target.value
        });
    };


    // Fetch tasks
    const fetchTasks = async () => {

        try {

            const token =
                localStorage.getItem('token');

            const response = await API.get(
                '/tasks',
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            setTasks(response.data);

        } catch (error) {

            console.log(error);
        }
    };


    // Create task
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token =
                localStorage.getItem('token');

            const response = await API.post(
                '/tasks',
                formData,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            alert(response.data.message);

            setFormData({

                title: '',
                description: '',
                due_date: '',
                project_id: '',
                assigned_to: ''
            });

            fetchTasks();

        } catch (error) {

            alert(
                error.response?.data?.message
                || 'Task creation failed'
            );
        }
    };


    // Update task status
    const updateStatus = async (
        taskId,
        status
    ) => {

        try {

            const token =
                localStorage.getItem('token');

            await API.put(
                `/tasks/${taskId}`,
                { status },
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            fetchTasks();

        } catch (error) {

            console.log(error);
        }
    };


    useEffect(() => {

        fetchTasks();

    }, []);


    return (

        <>
            <Navbar />

            <div style={styles.container}>

                <h1>Tasks</h1>


                {/* Create Task Form */}

                <form
                    onSubmit={handleSubmit}
                    style={styles.form}
                >

                    <input
                        type="text"
                        name="title"
                        placeholder="Task title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        style={styles.input}
                    />

                    <input
                        type="date"
                        name="due_date"
                        value={formData.due_date}
                        onChange={handleChange}
                        style={styles.input}
                    />

                    <input
                        type="number"
                        name="project_id"
                        placeholder="Project ID"
                        value={formData.project_id}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />

                    <input
                        type="number"
                        name="assigned_to"
                        placeholder="Assign User ID"
                        value={formData.assigned_to}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />

                    <button
                        type="submit"
                        style={styles.button}
                    >
                        Create Task
                    </button>

                </form>


                {/* Task List */}

                <div style={styles.taskContainer}>

                    {
                        tasks.map((task) => (

                            <div
                                key={task.id}
                                style={styles.card}
                            >

                                <h3>
                                    {task.title}
                                </h3>

                                <p>
                                    {task.description}
                                </p>

                                <p>
                                    Status:
                                    {' '}
                                    <strong>
                                        {task.status}
                                    </strong>
                                </p>

                                <p>
                                    Project:
                                    {' '}
                                    {task.project_name}
                                </p>

                                <p>
                                    Assigned To:
                                    {' '}
                                    {task.assigned_user}
                                </p>

                                <p>
                                    Due Date:
                                    {' '}
                                    {task.due_date
                                        ?.split('T')[0]}
                                </p>


                                {/* Status Buttons */}

                                <div style={styles.statusButtons}>

                                   <button
    style={styles.statusButton}
                                        onClick={() =>
                                            updateStatus(
                                                task.id,
                                                'pending'
                                            )
                                        }
                                    >
                                        Pending
                                    </button>

                                    <button
    style={styles.statusButton}
                                        onClick={() =>
                                            updateStatus(
                                                task.id,
                                                'in_progress'
                                            )
                                        }
                                    >
                                        In Progress
                                    </button>

                                   <button
    style={styles.statusButton}
                                        onClick={() =>
                                            updateStatus(
                                                task.id,
                                                'completed'
                                            )
                                        }
                                    >
                                        Completed
                                    </button>

                                </div>

                            </div>
                        ))
                    }

                </div>

            </div>
        </>
    );
}



// Styles

const styles = {

    container: {

        padding: '40px'
    },

    form: {

        display: 'flex',

        flexDirection: 'column',

        gap: '15px',

        width: '400px',

        marginBottom: '30px'
    },

    input: {

        padding: '10px'
    },

    button: {

        padding: '10px',

        cursor: 'pointer'
    },

    taskContainer: {

        display: 'grid',

        gridTemplateColumns:
            'repeat(auto-fit, minmax(300px, 1fr))',

        gap: '20px'
    },

    card: {

        border: '1px solid #ccc',

        padding: '20px',

        borderRadius: '10px',

        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    },

    statusButtons: {

    display: 'flex',

    gap: '10px',

    marginTop: '15px',

    flexWrap: 'wrap'
},
statusButton: {

    padding: '8px 14px',

    border: 'none',

    borderRadius: '5px',

    cursor: 'pointer',

    backgroundColor: '#222',

    color: 'white',

    fontSize: '14px'
},
};

export default Tasks;