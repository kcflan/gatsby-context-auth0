import React from 'react';
import { useUser } from '../context/userContext';
import Permission from '../components/permission';

function AuthenticatedApp() {
  const user = useUser();
  return (
    <>
      <div style={{ border: 'solid 1px #99f' }}>
        <div>AUTH</div>
        <div>APP</div>
        {/* <Header />
      <Content />
      <Footer /> */}
        <div>
          <h2>User Profile</h2>
          <ul>
            <li>ID: {user.id}</li>
            <li>Email: {user.email}</li>
            <li>Role: {user.role}</li>
          </ul>
        </div>
        <Permission
          role="visitor"
          perform="home-page:visit"
          yes={() => (
            <div>
              <h1>Visitor Dashboard</h1>
            </div>
          )}
          no={() => (
            <>
              <p>No Access</p>
            </>
          )}
        />
      </div>
    </>
  );
}

export default AuthenticatedApp;
