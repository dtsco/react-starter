import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, ConfigProvider } from 'antd';
import ruRU from 'antd/es/locale/ru_RU';
import { useSelector } from 'react-redux';
import { get } from 'lodash';
const { Header, Content } = Layout;

const Template = styled(Layout)`
  min-height: 100vh;
`;

function DefaultLayout({ children }) {
  const LogIn = useSelector((state) => get(state, 'user.isAuth', false));
  return (
    <ConfigProvider locale={ruRU}>
      <Template>
        {LogIn && (
          <Header className="flex items-center justify-between flex-row">
            header
          </Header>
        )}
        <Layout className="relative">{children}</Layout>
      </Template>
    </ConfigProvider>
  );
}

DefaultLayout.propTypes = {};

export default DefaultLayout;
