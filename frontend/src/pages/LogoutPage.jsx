// frontend/src/pages/LogoutPage.jsx

import React from 'react';
import Confetti from 'react-confetti';

const LogoutPage = () => {
    const [showConfetti, setShowConfetti] = React.useState(true);
    const [loggedOut, setLoggedOut] = React.useState(false);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setShowConfetti(false);
        }, 8000); // Show confetti for 3 seconds

        return () => clearTimeout(timer);
    }, []);

    const handleLogout = () => {
        setLoggedOut(true);
        // Add your logout logic here (e.g., remove token, reset state, etc.)
        // Redirect to login page or home page after logout
        window.location.href = '/Signup';
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {showConfetti && <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
                numberOfPieces={200}
                recycle={false}
                gravity={0.1}
                wind={0}
                friction={0.98}
                initialVelocityX={Math.random() * 4 + 2}
                initialVelocityY={Math.random() * -10}
            />}
            <button
                className={`btn btn-primary ${loggedOut ? 'btn-disabled' : ''}`}
                onClick={handleLogout}
                disabled={loggedOut}
            >
                {loggedOut ? 'Logging out...' : 'Logout'}
            </button>
        </div>
    );
};

export default LogoutPage;