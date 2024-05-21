import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
  } from 'react';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import {useMutation} from 'react-query';
  import {api} from '../services/api';
  
  type ISignInData = {username: string; password: string};
  type IUserData = {
    user: {
      cuid: string;
      email: string;
    };
    token: string;
  };
  type IAuthContext = {
    signed: boolean;
    signIn(data: ISignInData): Promise<void>;
    signOut(): void;
    loading: boolean;
    user?: IUserData;
    error: any;
  };
  type IAuthProvider = {
    children: ReactNode;
  };
  
  const AuthContext = createContext<IAuthContext>({} as IAuthContext);
  
  export const AuthProvider: React.FC<IAuthProvider> = ({children}) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<IUserData | undefined>();
    const [error, setError] = useState<any>(null);
  
    const loginMutation = useMutation(
      ({username, password}: ISignInData) =>
        api.get('/auth', {
          auth: {
            username: username,
            password: password,
          },
        }),
      {
        onSuccess: async (data, variables, context) => {
          try {
            api.defaults.headers.Authorization = `Bearer ${data.data.token}`;
            const jsonValue = JSON.stringify(data.data);
            await AsyncStorage.setItem('@inlocco/login', jsonValue);
            setUser(data.data);
          } catch (e) {
            setError(e);
            console.error('onSuccessErro', e);
          }
          setLoading(false);
        },
        onError: (e, variables, context) => {
          console.error(e, variables, context);
          setError(e);
          setLoading(false);
        },
      },
    );
  
    const signIn = async (data: ISignInData) => {
      loginMutation.mutate(data);
      loginMutation.isLoading && setLoading(true);
    };
  
    const signOut = async () => {
      try {
        await AsyncStorage.clear();
        setUser(undefined);
      } catch (e) {
        console.error(e);
        setError(e);
      }
    };
  
    const loadData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@inlocco/login');
        const userData = jsonValue != null ? JSON.parse(jsonValue) : null;
        api.defaults.headers.Authorization = `Bearer ${userData.token}`;
        setUser(userData);
      } catch (e) {
        console.error(e);
        setError(e);
      }
    };
  
    useEffect(() => {
      loadData();
    }, []);
  
    return (
      <AuthContext.Provider
        value={{
          signed: !!user,
          loading,
          signIn,
          signOut,
          user,
          error,
        }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export function useAuth() {
    const context = useContext(AuthContext);
    return context;
  }
  