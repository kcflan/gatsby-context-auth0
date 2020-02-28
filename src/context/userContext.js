import React from 'react';
import { useAuth } from 'react-use-auth';
import { useAsync } from 'react-async';
import axios from 'axios';

const UserContext = React.createContext();

function UserProvider(props) {
  const { user } = useAuth();
  const [firstAttemptFinished, setFirstAttemptFinished] = React.useState(false);

  const {
    data = { role: null },
    error,
    isLoading,
    isRejected,
    isPending,
    isSettled,
    reload,
  } = useAsync({
    promiseFn: loadUserRole,
    // userEmail: user.email,
    // userEmail: 'test@test.test',
    // userEmail: 'Shanna@melissa.tv',
    userEmail: 'email@doesnot.exist',
  });

  React.useLayoutEffect(() => {
    if (isSettled) {
      setFirstAttemptFinished(true);
    }
  }, [isSettled]);

  if (!firstAttemptFinished) {
    if (isPending) {
      return (
        <>
          <h2>pending...</h2>
        </>
      );
      //   return <FullPageSpinner />;
    }
    if (isRejected) {
      return (
        <div style={{ color: 'red' }}>
          <p>Uh oh... There's a problem. Try refreshing the app.</p>
          <pre>{error.message}</pre>
        </div>
      );
    }
  }
  const { role } = data;
  //   console.log('role: ', role);
  //   console.log('data: ', data);

  const roleUser = { ...user, role: role }; // { ...user, role: 'visitor' };

  return <UserContext.Provider value={roleUser} {...props} />;
}

function useUser() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserProvider`);
  }
  return context;
}

export { UserProvider, useUser };

const loadUserRole = async ({ userEmail }) => {
  //   let q = await fetch(
  //     `http://my-json-server.typicode.com/kflan-io/gatsby-context-auth0/users`,
  //     { mode: 'no-cors' }
  //   )
  //     .then(res => (res.ok ? res : Promise.reject(res)))
  //     .then(res => res.json());

  let url = `http://my-json-server.typicode.com/kflan-io/gatsby-context-auth0/users?email=${userEmail}`;
  let axiosRole = await axios
    .get(url)
    .then(res => {
      // Transform the raw data by extracting the nested objects
      const users = res.data.map(obj => obj);
      console.log('all users: ', users);
      console.log('users[0]: ', users[0]);
      //using users[0] to take the first entry with that email address
      let { role } = users[0];

      return { role: role };
    })
    .catch(err => {
      // Something went wrong. Log the error and and re-render with default visitor role.
      console.log('Log:  Error', err);
      return { role: 'visitor' };
    });

  //   return { role: 'visitor' };
  return axiosRole;
};
