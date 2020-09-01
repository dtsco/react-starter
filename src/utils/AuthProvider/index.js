import React, { useEffect } from 'react';
import VK from 'vk-openapi';
import { useDispatch, useSelector } from 'react-redux';
import get from 'lodash/get';
import { logUser, dataUser, setToken } from 'store/reducers/authSlice';
import { GoogleLogin } from 'react-google-login';

export function AuthProvider({ children }) {
  const dispatch = useDispatch();
  useEffect(() => {

    //vk auth
    VK.init({ apiId: 7578595 });
    VK.Auth.getLoginStatus(function (e) {
      if (e.session) {
        dispatch(logUser({ status: true, source: 'vk' }));
        VK.Auth.login(function (e) {
          dispatch(
            dataUser({
              data: {
                name: e.session.user.first_name,
                last_name: e.session.user.last_name,
              },
            }),
          );
          dispatch(setToken({ access_token: e.session.sid }));
        });
      }
    });

    //google auth
    const userGoogle = (val) => {
      if (val.getBasicProfile()) {
        dispatch(logUser({ status: true, source: 'google' }));
        dispatch(
          dataUser({
            data: {
              name: val.getBasicProfile().getGivenName(),
              last_name: val.getBasicProfile().getFamilyName(),
              avatar: val.getBasicProfile().getImageUrl(),
            },
          }),
        );
      }
    };
    window.gapi.load('auth2', function () {
      const auth2 = window.gapi.auth2.init({
        client_id:
          '892188101174-6pkt5makqm03oalg1q8m3d0e6vdmagsu.apps.googleusercontent.com',
        scope: 'profile',
      });
      auth2.currentUser.listen(userGoogle);
      // });
    });
  }, [VK, window]);

  return <>{children}</>;
}
export default AuthProvider;
