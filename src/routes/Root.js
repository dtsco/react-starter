import React from 'react';
import DefaultLayout from 'layout/default/index';
import LanguageProvider from '../utils/LanguageProvider';
import Home from '../pages/Home/index';


function RootRouter() {
  return (
    <DefaultLayout>
      <LanguageProvider>
        <Home/>
      </LanguageProvider>
    </DefaultLayout>
  );
}

export default RootRouter;
