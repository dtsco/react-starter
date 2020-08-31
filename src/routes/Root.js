import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DefaultLayout from 'layout/default/index';
import LanguageProvider from '../utils/LanguageProvider';
// import HomePage from "./pages/home"


function RootRouter() {
  return (
    <DefaultLayout>
      <LanguageProvider>
        home
      </LanguageProvider>
    </DefaultLayout>
  );
}

export default RootRouter;
