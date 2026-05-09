import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import API from '../api/axios';

function Signup() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        name: '',
        email: '',
        password: '',
        role: 'member'
    });

    // Handle input changes
    const handleChange = (e) => {

        setFormData({

            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle form submit
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await API.post(
                '/auth/signup',
                formData
            );

            alert(response.data.message);

            navigate('/');

        } catch (error) {

            alert(
                error.response?.data?.message
                || 'Signup failed'
            );
        }
    };

    return (

        <div style={styles.container}>

            <form
                onSubmit={handleSubmit}
                style={styles.form}
            >

                <h2>Signup</h2>

                <input
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    onChange={handleChange}
                    required
                    style={styles.input}
                />

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

                <select
                    name="role"
                    onChange={handleChange}
                    style={styles.input}
                >

                    <option value="member">
                        Member
                    </option>

                    <option value="admin">
                        Admin
                    </option>

                </select>

                <button
                    type="submit"
                    style={styles.button}
                >
                    Signup
                </button>

                <p>

                    Already have account?

                    <Link to="/">
                        Login
                    </Link>

                </p>

            </form>

        </div>
    );
}


// Simple inline styles
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

export default Signup;