import React, { useState, useEffect, useMemo } from 'react';
import RenderStoryViewer from './RenderStoryViewer';
import { useOktaAuth } from '@okta/okta-react';

const StoryViewerContainer = ({ LoadingComponent }) => {
  const { authState, authService } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [memoAuthService] = useMemo(() => [authService], []);

  useEffect(() => {
    let isSubscribed = true;

    memoAuthService
      .getUser()
      .then(info => {
        if (isSubscribed) {
          setUserInfo(info);
        }
      })
      .catch(error => {
        isSubscribed = false;
        return setUserInfo(null);
      });
    return () => (isSubscribed = false);
  }, [memoAuthService]);

  return (
    <>
      {authState.isAuthenticated && !userInfo && (
        <LoadingComponent message="Fetching user profile..." />
      )}
      {authState.isAuthenticated && userInfo && (
        <RenderStoryViewer userInfo={userInfo} authService={authService} />
      )}
    </>
  );
};
export default StoryViewerContainer;
