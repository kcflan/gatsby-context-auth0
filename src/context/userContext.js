import React from 'react';
import { useAuth } from 'react-use-auth';
import { useAsync } from 'react-async';

const UserContext = React.createContext();

function UserProvider(props) {
  const [firstAttemptFinished, setFirstAttemptFinished] = React.useState(false);
  const { user } = useAuth();

  const {
    data = { user: null },
    error,
    isLoading,
    isRejected,
    isPending,
    isSettled,
    reload,
  } = useAsync({
    promiseFn: loadUserData,
  });

  React.useLayoutEffect(() => {
    if (isSettled) {
      setFirstAttemptFinished(true);
    }
  }, [isSettled]);

  if (!firstAttemptFinished) {
    if (isPending) {
      return <></>;
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

const loadUserData = async () => {
  //TODO look up the role based on email address...
  //   await fetch('https://jsonplaceholder.typicode.com/users')
  //     .then(res => (res.ok ? res : Promise.reject(res)))
  //     .then(res => res.json());
  return { role: 'visitor' };
};
