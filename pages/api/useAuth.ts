import { useState, useEffect } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { User } from 'firebase/auth';
import { auth, googleProvider } from './firebase';

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  const signInWithGoogle = async () => {
    //const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return { user, signInWithGoogle, signOut };
};

export default useAuth;
