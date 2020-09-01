import React from 'react';
import styled from 'styled-components';
import { GoogleLogout } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { logUser, dataUser, setToken } from 'store/reducers/authSlice';

const GoogleButon = styled(GoogleLogout)`
  &&& {
    width: 100%;
    justify-content: center;
  }
`;

function GoogleAuth() {
  const dispatch = useDispatch();
  const logOut = (responce) => {
    dispatch(logUser({ status: false, source: null }));
    dispatch(
      dataUser({
        data: {
          name: null,
          last_name: null,
          avatar: null,
        },
      }),
    );
    dispatch(setToken({ access_token: null }));
    localStorage.removeItem('access_token');
  };

  return (
    <div>
      <GoogleLogout
        style={{ width: '100%' }}
        clientId="892188101174-6pkt5makqm03oalg1q8m3d0e6vdmagsu.apps.googleusercontent.com"
        onLogoutSuccess={logOut}
      />
    </div>
  );
}

export default GoogleAuth;
