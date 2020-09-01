import React from 'react';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import GoogleLogOut from '../Auth/components/LogOut/Google';
import VkLogout from '../Auth/components/LogOut/Vk';

function Home() {
  const user = useSelector((state) => get(state, 'user.data', null));
  const source = useSelector((state) => get(state, 'user.source', null));
  return (
    <div className="h-screen flex items-center justify-center">
      Hello!
      {user ? user.name : null}
      {user ? user.last_name : null}
      <div>
        {source ? source === 'vk' ? <VkLogout /> : <GoogleLogOut /> : null}
      </div>
    </div>
  );
}
export default Home;
