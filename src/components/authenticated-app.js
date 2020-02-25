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

        <Permission
          role={user.role}
          perform="home-page:visit"
          data={{
            userId: user.id,
            // postOwnerId: post.ownerId,
          }}
          yes={() => (
            <div>
              <h1>Visitor Dashboard</h1>
              <p>userid: {user.id}</p>
              <button className="btn btn-sm btn-danger">Delete Post</button>
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
