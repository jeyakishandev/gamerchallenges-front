import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store';

export default function Logout() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    logout();
    navigate('/');
  }, [logout, navigate]);
  
  return null;
}