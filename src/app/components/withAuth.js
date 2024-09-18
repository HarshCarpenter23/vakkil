// components/withAuth.js
import React from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '../hooks/useAuth';

const withAuth = (WrappedComponent) => {
  const ComponentWithAuth = (props) => {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();

    React.useEffect(() => {
      if (!loading && !isAuthenticated) {
        router.push('/signin');
      }
    }, [isAuthenticated, loading, router]);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      return null; // Or a loading spinner or message
    }

    return <WrappedComponent {...props} />;
  };

  // Set a display name for easier debugging
  ComponentWithAuth.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return ComponentWithAuth;
};

export default withAuth;
