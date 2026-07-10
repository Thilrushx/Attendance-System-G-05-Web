import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Wraps a route so it redirects when the required token is absent.
 * @param {string} tokenKey - localStorage key to check ('admintoken' | 'lecturertoken')
 * @param {string} redirectTo - path to redirect to when unauthenticated
 */
const ProtectedRoute = ({ children, tokenKey, redirectTo }) => {
    const token = localStorage.getItem(tokenKey);
    if (!token) return <Navigate to={redirectTo} replace />;
    return children;
};

export default ProtectedRoute;
