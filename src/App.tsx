import React,{useState,createContext} from 'react';
import {Route,Switch,BrowserRouter,useHistory} from 'react-router-dom'
import {  Breadcrumb,Layout,Menu,Input,} from 'antd'
import { Index,Detail,Login,Regist } from './pages/index';


import routers from './router';

import './App.css';

const { Header, Content, Footer } = Layout;
export const UserContext = createContext<any>({});

function App() {
  const [activeMenuIndex,setMenuActiveIndex]=useState<string|null>(null)
  const history = useHistory()
  const [userInfo, setUserInfo] = useState({});  

  const menus = routers.map(({ title, path }) => {
    return {
      key: title,
      label: title,
      keyPath:path
    };
  });

  if(activeMenuIndex===null&&menus.length){
    setMenuActiveIndex(menus[0]?.key)
  }
   // 搜索股票，进入股票详情页
   const onSearchStock=()=>{

   }

   // @ts-ignore
   const onMenuClick=({  key, keyPath })=>{
    setMenuActiveIndex(key)
    if(history){
      history.push(keyPath)
    }
   }


   const value = {  
    userInfo,  
    setUserInfo,  
  };

  return (
    <UserContext.Provider value={value}>
    <Layout className="layout">
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="top_inner">
      <Input.Search placeholder="请输入股票名称" className='top_input_wrapper' onSearch={onSearchStock}/>

      <Menu
        className='menu_wrapper'
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[routers[0].title]}
        items={menus}
        onClick={onMenuClick}
      />
      </div>
     
    </Header>
    <Content style={{ padding: '0 50px', margin: '0 auto', width: '800px' }}>
      {/* @ts-ignore */}
      <p>userid: {userInfo?.userId}</p>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>

      <div className="site-layout-content">
      <BrowserRouter>
          <Switch>
            <Route path="/" component={Index} exact/>
            <Route path="/login" component={Login} exact/>
            <Route path="/detail" component={Detail} exact/>
            <Route path="/regist" component={Regist} exact/>
            {/* 一般写在所有路由注册的最下方，当所有路由都无法匹配时，跳转到Redirect指定的路由 */}
            {/* <Redirect to="/index"/> */}
            </Switch>
        </BrowserRouter>

      </div>


      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
    </UserContext.Provider>
  );
}

export default App;
