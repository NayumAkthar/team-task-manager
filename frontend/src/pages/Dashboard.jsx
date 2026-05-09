import { useEffect, useState }
from 'react';

import { useNavigate }
from 'react-router-dom';

import API from '../api/axios';

import Navbar from '../components/Navbar';

function Dashboard() {

    const navigate = useNavigate();

    const [stats, setStats] = useState({

        totalTasks: 0,
        completedTasks: 0,
        pendingTasks: 0,
        overdueTasks: 0
    });


    // Fetch dashboard data
    const fetchDashboard = async () => {

        try {

            const token =
                localStorage.getItem('token');

            const response = await API.get(
                '/dashboard',
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            setStats(response.data);

        } catch (error) {

            alert('Unauthorized');

            navigate('/');
        }
    };


    useEffect(() => {

        fetchDashboard();

    }, []);


    return (

        <>
            <Navbar />

            <div style={styles.container}>

                <h1>Dashboard</h1>

                <div style={styles.cardContainer}>

                    <div style={styles.card}>
                        <h2>Total Tasks</h2>
                        <p>{stats.totalTasks}</p>
                    </div>

                    <div style={styles.card}>
                        <h2>Completed</h2>
                        <p>{stats.completedTasks}</p>
                    </div>

                    <div style={styles.card}>
                        <h2>Pending</h2>
                        <p>{stats.pendingTasks}</p>
                    </div>

                    <div style={styles.card}>
                        <h2>Overdue</h2>
                        <p>{stats.overdueTasks}</p>
                    </div>

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

    cardContainer: {

        display: 'grid',

        gridTemplateColumns:
            'repeat(auto-fit, minmax(200px, 1fr))',

        gap: '20px',

        marginTop: '30px'
    },

    card: {

        border: '1px solid #ccc',

        padding: '20px',

        borderRadius: '10px',

        textAlign: 'center',

        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    }
};

export default Dashboard;