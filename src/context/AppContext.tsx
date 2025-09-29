import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User, ServiceProvider, Category, Review } from '../types';

interface AppState {
  currentUser: User | null;
  providers: ServiceProvider[];
  categories: Category[];
  reviews: Review[];
  isLoading: boolean;
}

type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_PROVIDERS'; payload: ServiceProvider[] }
  | { type: 'ADD_PROVIDER'; payload: ServiceProvider }
  | { type: 'UPDATE_PROVIDER'; payload: ServiceProvider }
  | { type: 'SET_CATEGORIES'; payload: Category[] }
  | { type: 'SET_REVIEWS'; payload: Review[] }
  | { type: 'ADD_REVIEW'; payload: Review }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: AppState = {
  currentUser: null,
  providers: [],
  categories: [],
  reviews: [],
  isLoading: false,
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => void;
  updateProvider: (provider: ServiceProvider) => void;
}>({
  state: initialState,
  dispatch: () => {},
  login: async () => false,
  register: async () => false,
  logout: () => {},
  updateProvider: () => {},
});

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, currentUser: action.payload };
    case 'SET_PROVIDERS':
      return { ...state, providers: action.payload };
    case 'ADD_PROVIDER':
      return { ...state, providers: [...state.providers, action.payload] };
    case 'UPDATE_PROVIDER':
      return {
        ...state,
        providers: state.providers.map(p => 
          p.id === action.payload.id ? action.payload : p
        ),
      };
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    case 'SET_REVIEWS':
      return { ...state, reviews: action.payload };
    case 'ADD_REVIEW':
      return { ...state, reviews: [...state.reviews, action.payload] };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    // Load data from localStorage on app start
    const loadData = () => {
      try {
        const userData = localStorage.getItem('helpin_user');
        const providersData = localStorage.getItem('helpin_providers');
        const reviewsData = localStorage.getItem('helpin_reviews');

        if (userData) {
          dispatch({ type: 'SET_USER', payload: JSON.parse(userData) });
        }

        if (providersData) {
          dispatch({ type: 'SET_PROVIDERS', payload: JSON.parse(providersData) });
        }

        if (reviewsData) {
          dispatch({ type: 'SET_REVIEWS', payload: JSON.parse(reviewsData) });
        }

        // Initialize categories
        dispatch({
          type: 'SET_CATEGORIES',
          payload: [
            { id: '1', name: 'Handyman', icon: 'Wrench', description: 'Home repairs and maintenance' },
            { id: '2', name: 'Technician', icon: 'Smartphone', description: 'Electronics and appliances' },
            { id: '3', name: 'Health', icon: 'Heart', description: 'Healthcare services' },
            { id: '4', name: 'Events', icon: 'Calendar', description: 'Event planning and management' },
            { id: '5', name: 'Emergency', icon: 'Siren', description: 'Emergency services' },
            { id: '6', name: 'Cleaning', icon: 'Sparkles', description: 'Cleaning services' },
            { id: '7', name: 'Transportation', icon: 'Car', description: 'Transportation services' },
            { id: '8', name: 'Beauty', icon: 'Scissors', description: 'Beauty and wellness' },
          ],
        });
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate login - in real app, this would be an API call
      const users = JSON.parse(localStorage.getItem('helpin_users') || '[]');
      const user = users.find((u: any) => u.email === email && u.password === password);
      
      if (user) {
        const { password: _, ...userWithoutPassword } = user;
        dispatch({ type: 'SET_USER', payload: userWithoutPassword });
        localStorage.setItem('helpin_user', JSON.stringify(userWithoutPassword));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (userData: any): Promise<boolean> => {
    try {
      const users = JSON.parse(localStorage.getItem('helpin_users') || '[]');
      const newUser = {
        ...userData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      localStorage.setItem('helpin_users', JSON.stringify(users));

      if (userData.type === 'provider') {
        const newProvider: ServiceProvider = {
          id: Date.now().toString(),
          userId: newUser.id,
          name: userData.name,
          category: userData.category || 'Other',
          description: userData.description || '',
          phone: userData.phone,
          whatsapp: userData.whatsapp,
          email: userData.email,
          location: userData.location || '',
          rating: 0,
          reviewCount: 0,
          isVerified: false,
          profileViews: 0,
          searches: 0,
          createdAt: new Date().toISOString(),
        };

        const providers = [...state.providers, newProvider];
        dispatch({ type: 'ADD_PROVIDER', payload: newProvider });
        localStorage.setItem('helpin_providers', JSON.stringify(providers));
      }

      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    dispatch({ type: 'SET_USER', payload: null });
    localStorage.removeItem('helpin_user');
  };

  const updateProvider = (provider: ServiceProvider) => {
    dispatch({ type: 'UPDATE_PROVIDER', payload: provider });
    localStorage.setItem('helpin_providers', JSON.stringify(state.providers.map(p => 
      p.id === provider.id ? provider : p
    )));
  };

  return (
    <AppContext.Provider value={{ state, dispatch, login, register, logout, updateProvider }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};