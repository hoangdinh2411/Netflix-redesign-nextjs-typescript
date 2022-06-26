import { onAuthStateChanged, signInWithEmailAndPassword, User, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { auth } from '../firebase';
import Loading from './../components/Loading';

interface IAuth {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn:(email:string, password:string)=>Promise<void>;
  signUp:(email:string, password:string)=>Promise<void>;
  startLoadingScreen: ()=>void;
  endLoadingScreen: ()=>void;
}
type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthContent = React.createContext<IAuth>({
  user: null,
  loading: false,
  error: null,  
  signIn:async ()=>{},
  signUp:async ()=>{},
  startLoadingScreen: ()=>{},
  endLoadingScreen: ()=>{}
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [initialLoading, setInitialLoading] = useState<boolean>(true);

  const startLoadingScreen = ()=>{
    setLoading(true)
  }
  const endLoadingScreen = ()=>{
    setLoading(false)
  }
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        router.push('/login');

      }
      setInitialLoading(false)
    });
  }, [auth]);

 
  const signIn  = async(email:string, password:string)=>{
    startLoadingScreen()
    await signInWithEmailAndPassword(auth, email, password)
    .then(userCredential=>{
      setUser(userCredential.user)
    })
    .catch(err=>{
      setError(err)
      endLoadingScreen()
    })
    .finally(() => endLoadingScreen())

  }

  const signUp = async(email:string, password:string)=>{
    startLoadingScreen();

    await createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential=>{
      setUser(userCredential.user)

    })
    .catch(err=>{
      setError(err.message)
      endLoadingScreen()

    })
    .finally(() => endLoadingScreen())
  }
  const memoedValue = useMemo(
    () => ({ user, loading, error ,signIn,signUp,startLoadingScreen, endLoadingScreen}),
    [user, loading, error],
  );

  return (
    <AuthContent.Provider value={memoedValue}>{!initialLoading && children}</AuthContent.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContent);
}
