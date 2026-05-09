import { useEffect, useState }
from 'react';

import API from '../api/axios';

import Navbar from '../components/Navbar';

function Projects() {

    const [projects, setProjects] = useState([]);

    const [formData, setFormData] = useState({

        title: '',
        description: ''
    });


    // Handle input
    const handleChange = (e) => {

        setFormData({

            ...formData,
            [e.target.name]: e.target.value
        });
    };


    // Fetch projects
    const fetchProjects = async () => {

        try {

            const token =
                localStorage.getItem('token');

            const response = await API.get(
                '/projects',
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            setProjects(response.data);

        } catch (error) {

            console.log(error);
        }
    };


    // Create project
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token =
                localStorage.getItem('token');

            const response = await API.post(
                '/projects',
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
                description: ''
            });

            fetchProjects();

        } catch (error) {

            alert(
                error.response?.data?.message
                || 'Project creation failed'
            );
        }
    };


    useEffect(() => {

        fetchProjects();

    }, []);


    return (

        <>
            <Navbar />

            <div style={styles.container}>

                <h1>Projects</h1>


                {/* Create Project Form */}

                <form
                    onSubmit={handleSubmit}
                    style={styles.form}
                >

                    <input
                        type="text"
                        name="title"
                        placeholder="Project title"
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

                    <button
                        type="submit"
                        style={styles.button}
                    >
                        Create Project
                    </button>

                </form>


                {/* Project List */}

                <div style={styles.projectContainer}>

                    {
                        projects.map((project) => (

                            <div
                                key={project.id}
                                style={styles.card}
                            >

                                <h3>
                                    {project.title}
                                </h3>

                                <p>
                                    {project.description}
                                </p>

                                <small>
                                    Created By:
                                    {' '}
                                    {project.created_by_name}
                                </small>

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

    projectContainer: {

        display: 'grid',

        gridTemplateColumns:
            'repeat(auto-fit, minmax(250px, 1fr))',

        gap: '20px'
    },

    card: {

        border: '1px solid #ccc',

        padding: '20px',

        borderRadius: '10px',

        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    }
};

export default Projects;