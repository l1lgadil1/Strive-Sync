import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AppState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
}

interface AppStore extends AuthState, AppState {
  // Auth actions
  setUser: (user: User | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
  
  // App actions
  toggleTheme: () => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

// Create a custom storage object that safely handles server-side rendering
const createNoopStorage = () => {
  return {
    getItem: (_name: string) => {
      return null;
    },
    setItem: (_name: string, _value: string) => {},
    removeItem: (_name: string) => {},
  };
};

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      // Auth state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      // App state
      theme: 'light',
      sidebarOpen: true,
      
      // Auth actions
      setUser: (user) => set({ user }),
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setIsLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      logout: () => set({ user: null, isAuthenticated: false, error: null }),
      
      // App actions
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
    }),
    {
      name: 'strive-sync-storage',
      storage: createJSONStorage(() => (typeof window !== 'undefined' ? window.localStorage : createNoopStorage())),
      skipHydration: true,
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        theme: state.theme,
      }),
    }
  )
); 