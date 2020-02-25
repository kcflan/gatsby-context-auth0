import React from 'react';
import { useAuth } from 'react-use-auth';
import { useUser } from '../context/userContext';

const Nav = () => {
  const { isAuthenticated, login, logout } = useAuth();

  const user = useUser();
  return (
    <>
      <p>hello world: {user.name}</p>
      <p>hello world: {user.role}</p>
      <nav>
        {!isAuthenticated() && <button onClick={() => login()}>Login</button>}

        {isAuthenticated() && <button onClick={() => logout()}>Logout</button>}
      </nav>
    </>
  );
};

export default Nav;
