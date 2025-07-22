import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

// Prop children übergeben weiter --->
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
    // User ausloggen
  const logout = () => setUser(null); 

  // Login-Modal angaben:
  const login = (username, password) => {
// username muss genau 'user' sein und password 'pass'
    if (username === 'user' && password === 'pass') {
      setUser({ name: username });
//user speichern
      return true;
    }
    return false;
  };


  // Werte an die App weitergeben ALso : in childern speichern 
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}


export const useAuth = () => useContext(AuthContext);
// → useAuth überall in App benutzen kann 
