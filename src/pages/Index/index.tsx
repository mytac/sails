import React, { useEffect,useState } from 'react';
import {Link} from 'react-router-dom'
import {Table,Button,message} from 'antd';
import request from '@utils/request';
import { mockdata } from './config';
import { UserContext } from '../../App';  

import './style.css';


const App: React.FC = () => {
  const userContext = React.useContext(UserContext);
  const { userInfo } = userContext;

  const [stockList,setStockList]=useState([])

  const queryStockList=async ()=>{
    try{
      if(userInfo?.userId){
        const {stockList}=await request('/selectStock/','post',{})
        setStockList(stockList)
      }else{
        message.error("请先登录查看自选股")
      }
      
    }catch(err){
    }
  }


  useEffect(()=>{
  queryStockList()
  },[])


  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '代码',
      dataIndex: 'ts_code',
      key: 'ts_code',
    },
    {
      title: '现价',
      dataIndex: 'close',
      key: 'close',
    },
    {
      title: '涨跌幅',
      dataIndex: 'pct_chg',
      key: 'pct_chg',
    },
    {
      title: '所属行业',
      dataIndex: 'industry',
      key: 'industry',
    },
    {
      title: '操作',
      dataIndex: 'ts_code',
      key: 'ts_code',
      render: (code:string) => {
        return (
          <div className="table_ops_wrapper">
            <Button type="link">删除</Button>
            <Button type="link">
              <Link to={`/detail?code=${code}`} target='_blank'>详情</Link>
              </Button>
            <Button type="link">预测</Button>
          </div>
        );
      },
    },
  ];

  const onFinish = (values: any) => {
    console.log(values);
  };

 
  return (
    
        <>
          <div className="head">
            <div className="head_stock">沪深</div>
            <div className="head_stock">沪深</div>
            <div className="head_stock">沪深</div>
          </div>

          <div className="list">
            <div className="home_search_block">
              {/* <Form
                {...layout}
                form={form}
                name="control-hooks"
                onFinish={onFinish}
              >
                <Row>
                  <Form.Item
                    name="code"
                    label="股票"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="请输入股票名称" />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      搜索
                    </Button>
                  </Form.Item>
                </Row>
              </Form> */}
              
            </div>
            <Table columns={columns} dataSource={stockList} />
          </div>
        </>
  );
};

export default App;
