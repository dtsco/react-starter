import React from 'react';
import styled from 'styled-components';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { logUser, dataUser, setToken } from 'store/reducers/authSlice';

const GoogleButon = styled(GoogleLogin)`
  &&& {
    width: 100%;
    justify-content: center;
  }
`;

function GoogleAuth() {
  const dispatch = useDispatch();
  const responseGoogle = (responce) => {
    
      dispatch(logUser({ status: true, source: 'google' }));
      console.log(responce, 'responce')
      dispatch(
        dataUser({
          data: {
            name: responce.profileObj.givenName,
            last_name: responce.profileObj.familyName,
            avatar:responce.profileObj.imageUrl
          },
        }),
      );
      dispatch(setToken({ access_token: responce.accessToken}));
      localStorage.setItem('access_token', responce.accessToken )
    
  };

  return (
    <div>
      <GoogleButon
        style={{ width: '100%' }}
        clientId="892188101174-6pkt5makqm03oalg1q8m3d0e6vdmagsu.apps.googleusercontent.com"
        onSuccess={responseGoogle}
      />
    </div>
  );
}

export default GoogleAuth;
