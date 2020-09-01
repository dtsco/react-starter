import React from 'react';
import VK from './components/LogIn/Vk';
import Google from './components/LogIn/Google';

export function LogIn() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div>
        <div className="mb-10">
          <VK />
        </div>
        <div className="mb-10">
          <Google />
        </div>
      </div>
    </div>
  );
}
export default LogIn;
