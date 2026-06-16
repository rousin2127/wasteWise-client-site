import React from 'react';
import { Navigate } from 'react-router';
import useAuth from '../../hooks/useAuth';

const RoleRoute = ({ allow, children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="max-w-4xl mx-auto p-6">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (!allow?.includes(user.role)) return <Navigate to="/dashboard" replace />;
  return children;
};

export default RoleRoute;

