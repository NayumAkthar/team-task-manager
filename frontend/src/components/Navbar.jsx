import { useNavigate }
from 'react-router-dom';

function Navbar() {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem('token');

        localStorage.removeItem('user');

        navigate('/');
    };

    return (

        <div style={styles.navbar}>

            <h2
                style={styles.logo}
                onClick={() => navigate('/dashboard')}
            >
                Team Task Manager
            </h2>

            <div style={styles.links}>

                <button
                    style={styles.button}
                    onClick={() => navigate('/dashboard')}
                >
                    Dashboard
                </button>

                <button
                    style={styles.button}
                    onClick={() => navigate('/projects')}
                >
                    Projects
                </button>

                <button
                    style={styles.button}
                    onClick={() => navigate('/tasks')}
                >
                    Tasks
                </button>

                <button
                    style={styles.logoutButton}
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

        </div>
    );
}



const styles = {

    navbar: {

        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',

        padding: '15px 30px',

        backgroundColor: '#222',

        color: 'white'
    },

    logo: {

        cursor: 'pointer'
    },

    links: {

        display: 'flex',
        gap: '10px'
    },

    button: {

        padding: '10px 15px',
        border: 'none',
        cursor: 'pointer'
    },

    logoutButton: {

        padding: '10px 15px',

        border: 'none',

        cursor: 'pointer',

        backgroundColor: 'red',

        color: 'white'
    }
};

export default Navbar;