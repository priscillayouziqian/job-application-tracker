import React from 'react';

const Login = () => {
    const handleGoogleLogin = () => {
        // Redirect to the Google OAuth2 login page
        window.location.href = 'https://localhost:3443/users/auth/google';
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Login</h2>
            <button onClick={handleGoogleLogin} style={{ padding: '10px 20px', fontSize: '16px' }}>
                Login with Google
            </button>
        </div>
    );
};

export default Login; 