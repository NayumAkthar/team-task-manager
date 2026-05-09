import { useState } from 'react';

import { useNavigate, Link }
from 'react-router-dom';

import API from '../api/axios';

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        email: '',
        password: ''
    });


    // Handle input
    const handleChange = (e) => {

        setFormData({

            ...formData,
            [e.target.name]: e.target.value
        });
    };


    // Handle login
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await API.post(
                '/auth/login',
                formData
            );

            // Store token
            localStorage.setItem(
                'token',
                response.data.token
            );

            // Store user
            localStorage.setItem(
                'user',
                JSON.stringify(response.data.user)
            );

            alert(response.data.message);

            navigate('/dashboard');

        } catch (error) {

            alert(
                error.response?.data?.message
                || 'Login failed'
            );
        }
    };


    return (

        <div style={styles.container}>

            <form
                onSubmit={handleSubmit}
                style={styles.form}
            >

                <h2>Login</h2>

                <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    onChange={handleChange}
                    required
                    style={styles.input}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    onChange={handleChange}
                    required
                    style={styles.input}
                />

                <button
                    type="submit"
                    style={styles.button}
                >
                    Login
                </button>

                <p>

                    Don't have account?

                    <Link to="/signup">
                        Signup
                    </Link>

                </p>

            </form>

        </div>
    );
}



// Inline styles
const styles = {

    container: {

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    },

    form: {

        width: '300px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    },

    input: {

        padding: '10px'
    },

    button: {

        padding: '10px',
        cursor: 'pointer'
    }
};

export default Login;