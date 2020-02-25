import React from 'react';
import { Link } from 'gatsby';
import { useAuth } from 'react-use-auth';

import Layout from '../components/layout';
import Image from '../components/image';
import SEO from '../components/seo';

const loadAuthenticatedApp = () => import('../components/authenticated-app');
const AuthenticatedApp = React.lazy(loadAuthenticatedApp);
const UnauthenticatedApp = React.lazy(() =>
  import('../components/unauthenticated-app')
);

const IndexPage = () => {
  // pre-load the authenticated side in the background while the user's
  // filling out the login form.
  React.useEffect(() => {
    loadAuthenticatedApp();
  }, []);

  const { isAuthenticated, user } = useAuth();
  return (
    <Layout>
      <React.Suspense fallback={<>{/* spinner */}</>}>
        {isAuthenticated() && <h1>Hi {user.email}</h1> ? (
          <AuthenticatedApp />
        ) : (
          <UnauthenticatedApp />
        )}
      </React.Suspense>
      <SEO title="Home" />
      {!isAuthenticated() && <h1>Hi people</h1>}
      {isAuthenticated() && <h1>Hi {user.email}</h1>}
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  );
};

export default IndexPage;
