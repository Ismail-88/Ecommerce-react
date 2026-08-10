import { useAuth, useClerk } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { FullPageSpinner } from './ui/Spinner';

const ProtectedRoute = ({ children }) => {
    const { isLoaded, isSignedIn } = useAuth();
    const { openSignIn } = useClerk();
    const location = useLocation();

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            openSignIn({ redirectUrl: location.pathname + location.search });
        }
    }, [isLoaded, isSignedIn, openSignIn, location.pathname, location.search]);

    if (!isLoaded) {
        return <FullPageSpinner label="Checking session..." />;
    }

    if (!isSignedIn) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute
