import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api, API_BASE_URL } from '../../context/DataContext';


const AdminRoute = ({ children }) => {
  const location = useLocation();
  const [isValidating, setIsValidating] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      const adminToken = localStorage.getItem('adminToken');
      const adminInfo = localStorage.getItem('adminInfo');

      // If no token or info, redirect to login
      if (!adminToken || !adminInfo) {
        setIsAuthenticated(false);
        setIsValidating(false);
        return;
      }

      try {
        // Parse admin info
        const admin = JSON.parse(adminInfo);
        
        // Check if role is valid
        if (!admin || !['admin', 'staff', 'superadmin'].includes(admin.role)) {
          throw new Error('Invalid role');
        }

        // Verify token with backend
        const response = await api.get(`${API_BASE_URL}/api/admin/profile`, {
          headers: {
            Authorization: `Bearer ${adminToken}`
          }
        });

        // If token is valid
        if (response.data.success) {
          setIsAuthenticated(true);
        } else {
          throw new Error('Invalid token');
        }
      } catch (error) {
        console.error('Token validation failed:', error);
        
        // Clear invalid token
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminInfo');
        setIsAuthenticated(false);
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, [location.pathname]); // Re-validate on route change

  // Show loading while validating
  if (isValidating) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Verifying access...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // If authenticated, render children
  return children;
};

export default AdminRoute;