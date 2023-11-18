import React from 'react';
import {Route,Redirect,Switch,BrowserRouter} from 'react-router-dom'
import {  Breadcrumb,
  Layout,
  Menu,
  Table,
  Button,
  Form,
  Input,
  Row,} from 'antd'
import { Index,Detail } from './pages/index';
import 'antd/dist/antd.css';

import routers from './router';

import './App.css';

const { Header, Content, Footer } = Layout;

function App() {
  const menus = routers.map(({ title, path }) => {
    return {
      key: title,
      label: title,
    };
  });
   // 搜索股票，进入股票详情页
   const onSearchStock=()=>{

   }
 
  return (
    <Layout className="layout">
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="top_inner">
      <Menu
        className='menu_wrapper'
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[routers[0].title]}
        items={menus}
      />
      <Input.Search placeholder="请输入股票名称" className='top_input_wrapper' onSearch={onSearchStock}/>
      </div>
     
    </Header>
    <Content style={{ padding: '0 50px', margin: '0 auto', width: '800px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>

      <div className="site-layout-content">
      <BrowserRouter>
            <Route path="/" component={Index}/>
            <Route path="/detail" component={Detail}/>
            {/* <Route path="/getAllScore" component={AllStudent}/> */}
            {/* 一般写在所有路由注册的最下方，当所有路由都无法匹配时，跳转到Redirect指定的路由 */}
            {/* <Redirect to="/insetScore"/> */}
        </BrowserRouter>

      </div>


      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
}

export default App;
