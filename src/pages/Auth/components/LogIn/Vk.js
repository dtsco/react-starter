import React from 'react';
import { Button } from 'antd';
import VK from 'vk-openapi';
import { useDispatch, useSelector } from 'react-redux';
import get from 'lodash/get';
import { logUser, dataUser, setToken } from 'store/reducers/authSlice';
import { ReactComponent as Vkicon } from 'images/vkin.svg';

function ButtonVk() {
  const dispatch = useDispatch();
  const source = useSelector((state) => get(state, 'user.source', false));
  const logIn = () => {
    VK.Auth.login(function (e) {
      if (e.status === 'connected') {
        console.log(e, 'vk');
        dispatch(logUser({ status: true, source: 'vk' }));
        dispatch(
          dataUser({
            data: {
              name: e.session.user.first_name,
              last_name: e.session.user.last_name,
            },
          }),
        );
        dispatch(setToken({ access_token: e.session.sid }));
        localStorage.setItem('access_token', e.session.sid);
      }
    });
  };

  return (
    <div>
      {!source && (
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
            logIn();
          }}
        >
          <div>
            <Vkicon />
          </div>
          <div>
            <div className="ml-10">Вход</div>
          </div>
        </Button>
      )}
    </div>
  );
}

export default ButtonVk;
