import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  ReactNode,
} from 'react';

export interface AuthUser {
  fullName: string;
  matricNumber: string;
  faculty: string;
  department: string;
  email: string;
  password: string;
  initials: string;
}

interface AuthContextType {
  registeredUsers: AuthUser[];
  currentUser: AuthUser | null;
  registerUser: (newUser: Omit<AuthUser, 'initials'>) => {
    success: boolean;
    message: string;
    user?: AuthUser;
  };
  loginUser: (matricNumber: string, password: string) => {
    success: boolean;
    message: string;
    user?: AuthUser;
  };
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [registeredUsers, setRegisteredUsers] = useState<AuthUser[]>([]);
  const registeredUsersRef = useRef<AuthUser[]>([]);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    registeredUsersRef.current = registeredUsers;
  }, [registeredUsers]);

  const buildInitials = (fullName: string) => {
    return fullName
      .trim()
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join('');
  };

  const registerUser = (newUser: Omit<AuthUser, 'initials'>) => {
    const normalizedMatric = newUser.matricNumber.trim().toLowerCase();

    if (
      registeredUsersRef.current.some(
        (user) => user.matricNumber.trim().toLowerCase() === normalizedMatric
      )
    ) {
      return {
        success: false,
        message: 'Matric number already registered. Please log in instead.',
      };
    }

    const userToSave: AuthUser = {
      ...newUser,
      initials: buildInitials(newUser.fullName),
    };

    setRegisteredUsers((prevUsers) => [...prevUsers, userToSave]);
    registeredUsersRef.current = [...registeredUsersRef.current, userToSave];
    setCurrentUser(userToSave);

    return {
      success: true,
      message: 'Account created successfully! You are now logged in.',
      user: userToSave,
    };
  };

  const loginUser = (matricNumber: string, password: string) => {
    const normalizedMatric = matricNumber.trim().toLowerCase();
    const user = registeredUsersRef.current.find(
      (item) =>
        item.matricNumber.trim().toLowerCase() === normalizedMatric &&
        item.password === password
    );

    if (!user) {
      return {
        success: false,
        message: 'Invalid matric number or password. Please try again.',
      };
    }

    setCurrentUser(user);

    return {
      success: true,
      message: 'Login successful.',
      user,
    };
  };

  const logoutUser = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ registeredUsers, currentUser, registerUser, loginUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
