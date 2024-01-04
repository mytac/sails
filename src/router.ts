import React,{ReactNode} from 'react'
import { Index,Detail,Login,Regist,Hangqing } from './pages/index';

interface Router {
  title: string;
  path: string;
  // component:string;
  hideInMenu?:boolean;
  component:React.FC
}

const routers: Array<Router> = [
  { title: '首页', path: '/',component:Index},
  { title: '登录', path: '/login',component:Login },
  { title: '注册', path: '/regist',component:Regist },
  { title: '行情', path: '/hangqing',component:Hangqing},
  { title: '详情', path: '/detail',component:Detail},
];


export default routers;
