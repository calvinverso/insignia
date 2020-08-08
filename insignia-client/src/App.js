import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Statistics } from './components/Statistics';

import { Layout, Menu } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

function App() {
  return (
    <div>
      <Layout className="App">
        <Header className="header">Insignia</Header>
        <Layout>
          {/**
          <Sider>left sidebar</Sider>
           */}
          <Content style={{margin: 'auto'}}>
            <Statistics />
          </Content>
        </Layout>
        <Footer>footer</Footer>
      </Layout>
    </div>
  );
}

export default App;
