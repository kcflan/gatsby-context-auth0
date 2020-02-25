import React from 'react';
import { useAuth } from 'react-use-auth';

const Nav = () => {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <nav>
      {!isAuthenticated() && <button onClick={() => login()}>Login</button>}

      {isAuthenticated() && <button onClick={() => logout()}>Logout</button>}
    </nav>
  );
};

export default Nav;
