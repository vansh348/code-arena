import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const AuthContext = createContext(null);

export const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

// Configure axios defaults
axios.defaults.baseURL = API;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('ca_token'));
  const [loading, setLoading] = useState(true);
  const socketRef = useRef(null);

  // Set up socket connection
  const connectSocket = (userId) => {
    if (socketRef.current) socketRef.current.disconnect();
    socketRef.current = io(SOCKET_URL, { transports: ['websocket', 'polling'] });
    socketRef.current.emit('join_user_room', userId);
    return socketRef.current;
  };

  const disconnectSocket = () => {
    if (socketRef.current) { socketRef.current.disconnect(); socketRef.current = null; }
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.get('/auth/me')
        .then(res => {
          setUser(res.data);
          connectSocket(res.data._id);
        })
        .catch(() => {
          localStorage.removeItem('ca_token');
          setToken(null);
          delete axios.defaults.headers.common['Authorization'];
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
    return () => disconnectSocket();
  }, [token]); // eslint-disable-line

  const login = async (email, password) => {
    const { data } = await axios.post('/auth/login', { email, password });
    localStorage.setItem('ca_token', data.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    setToken(data.token);
    setUser(data.user);
    connectSocket(data.user._id);
    return data;
  };

  const register = async (username, email, password) => {
    const { data } = await axios.post('/auth/register', { username, email, password });
    localStorage.setItem('ca_token', data.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    setToken(data.token);
    setUser(data.user);
    connectSocket(data.user._id);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('ca_token');
    delete axios.defaults.headers.common['Authorization'];
    setToken(null);
    setUser(null);
    disconnectSocket();
  };

  const updateUser = (updates) => setUser(prev => ({ ...prev, ...updates }));

  return (
    <AuthContext.Provider value={{
      user, token, loading,
      login, register, logout, updateUser,
      socket: socketRef.current,
      getSocket: () => socketRef.current
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
