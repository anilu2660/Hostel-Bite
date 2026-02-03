import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in on mount
        const storedUser = authService.getUserFromStorage();
        if (storedUser) {
            setUser(storedUser);
        }
        setLoading(false);
    }, []);

    const login = async (email, password, loginType = 'student') => {
        try {
            const response = await authService.login(email, password, loginType);
            if (response.success) {
                setUser(response.data);
                toast.success(`Welcome back, ${response.data.name}!`);
                return { success: true };
            }
        } catch (error) {
            const message = error.response?.data?.message || 'Login failed';
            const hint = error.response?.data?.hint;

            // Return error data without showing toast
            // Let the Login component display the error
            return { success: false, message, hint };
        }
    };

    const signup = async (userData) => {
        try {
            const response = await authService.register(userData);
            if (response.success) {
                setUser(response.data);
                toast.success(`Account created successfully! Welcome, ${response.data.name}!`);
                return { success: true };
            }
        } catch (error) {
            const message = error.response?.data?.message || 'Signup failed';
            toast.error(message);
            return { success: false, message };
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        toast.success('Logged out successfully');
    };

    const isAdmin = user?.role === 'admin';

    const value = {
        user,
        loading,
        login,
        signup,
        logout,
        isAdmin,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
