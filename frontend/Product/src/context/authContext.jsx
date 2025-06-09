import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth.js";
import Cookies from "js-cookie";

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context){
        throw new Error("useAuth must be used whitin an AuthProvider");
    }
    return context;
}

export const AuthProvider = ({children}) => {
    const [ user, setUser ] = useState(null);
    const [ isAuthenticated, setIsAuthenticated ] = useState(false);
    const [ errors, setErrors] = useState([]);
    const [ loading, setLoading] = useState(true);
    const [ loginLoading, setLoginLoading] = useState(false); // Nuevo estado para loading de login
    
    const signup = async (user) => {
        try {
            setLoginLoading(true);
            const res = await registerRequest(user);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            setErrors(error.response.data);
        } finally {
            setLoginLoading(false);
        }
    }

    const signin = async (user) => {
        try {
            setLoginLoading(true);
            setErrors([]); // Limpiar errores previos
            
            const res = await loginRequest(user);
            
            // Verificar inmediatamente el token después del login
            if (res.data && res.data.token) {
                Cookies.set('token', res.data.token);
                
                // Verificar el token inmediatamente
                const verifyRes = await verifyTokenRequest(res.data.token);
                
                if (verifyRes.data) {
                    setUser(verifyRes.data);
                    setIsAuthenticated(true);
                } else {
                    throw new Error('Token verification failed');
                }
            } else {
                setUser(res.data);
                setIsAuthenticated(true);
            }
            
        } catch (error) {
            console.error('Login error:', error);
            
            // Limpiar estado en caso de error
            setIsAuthenticated(false);
            setUser(null);
            Cookies.remove('token');
            
            if (Array.isArray(error.response?.data)){
                return setErrors(error.response.data)
            }
            setErrors([error.response?.data?.message || 'Error al iniciar sesión'])
        } finally {
            setLoginLoading(false);
        }
    }

    const logout = async () => {
        setLoginLoading(true);
        
        // Limpiar todo el estado
        Cookies.remove('token');
        setIsAuthenticated(false);
        setUser(null);
        setErrors([]);
        
        setLoginLoading(false);
    }

    // Limpiar errores después de 5 segundos
    useEffect(() => {
        if (errors.length > 0){
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);

            return () => clearTimeout(timer)
        }
    }, [errors]);

    // Verificar autenticación al cargar la app
    useEffect(() => {
        async function checkLogin() {
            try {
                const cookies = Cookies.get();

                if (!cookies.token){
                    setIsAuthenticated(false);
                    setUser(null);
                    setLoading(false);
                    return;
                }

                const res = await verifyTokenRequest(cookies.token);
                
                if(!res.data){
                    // Token inválido, limpiar todo
                    Cookies.remove('token');
                    setIsAuthenticated(false);
                    setUser(null);
                    setLoading(false);
                    return;
                } 
                
                // Token válido, establecer usuario
                setIsAuthenticated(true);
                setUser(res.data);

            } catch (error) {
                console.error('Token verification error:', error);
                
                // Error en verificación, limpiar todo
                Cookies.remove('token');
                setIsAuthenticated(false);
                setUser(null);
            } finally {
                setLoading(false);
            }
        }
        
        checkLogin();
    }, [])

    return(
        <AuthContext.Provider value={{
            user,
            signup, 
            signin,
            logout,
            loading,
            loginLoading, // Nuevo estado expuesto
            isAuthenticated,
            errors
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}