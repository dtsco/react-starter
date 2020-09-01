import React from 'react';
import { useDispatch } from 'react-redux';
import { logUser, dataUser, setToken } from 'store/reducers/authSlice';
import { Button } from 'antd';
import VK from 'vk-openapi';
import { ReactComponent as Vkicon } from 'images/vkin.svg';

function VkAuth() {
  const dispatch = useDispatch();
  const logOut = () => {
    VK.Auth.logout(function (e) {
      dispatch(logUser({ status: null, source: null }));
      dispatch(
        dataUser({
          data: {
            name: null,
            last_name: null,
          },
        }),
      );
      dispatch(setToken({ access_token: null }));
      localStorage.removeItem('access_token');
    });
  };

  return (
    <div>
       <Button
          style={{
            background: '#4a76a8',
            border: 'none',
            color: 'white',
            display: 'flex',
            width: '200px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => {
            logOut();
          }}
        >
          <div>
            <Vkicon />
          </div>
          <div>
            <div className="ml-10">Выход</div>
          </div>
        </Button>
    </div>
  );
}

export default VkAuth;
