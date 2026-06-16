import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';

const DashboardRedirect = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    const role = user?.role;
    if (role === 'admin') navigate('/dashboard/admin', { replace: true });
    else if (role === 'collector') navigate('/dashboard/collector', { replace: true });
    else navigate('/dashboard/resident', { replace: true });
  }, [user, loading, navigate]);

  return <div className="flex items-center justify-center min-h-screen bg-slate-50">Redirecting...</div>;
};

export default DashboardRedirect;

