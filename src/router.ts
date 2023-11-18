interface Router {
  title: string;
  path: string;
  // component:string;
  hideInMenu?:boolean
}

const routers: Array<Router> = [
  { title: '首页', path: './index'},
  // { title: '账户管理', path: './account' },
  // { title: '详情', path: './detail', hideInMenu:true },
];

export default routers;
