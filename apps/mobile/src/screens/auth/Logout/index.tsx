
import { useEffect } from 'react';
import {useAuth} from '../../../contexts/auth';

export function Logout() {
  const {signOut} = useAuth();
  useEffect(() => {
    //signOut();
  }, []);

  return null;
};
