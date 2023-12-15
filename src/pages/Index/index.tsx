import React, { useEffect } from 'react';
import {Link} from 'react-router-dom'
import {
  Table,
  Button,
  Form,
  Input,
  Row,
} from 'antd';

import { mockdata } from './config';
import './style.css';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const App: React.FC = () => {
  const [form] = Form.useForm();

  const queryStockList=()=>{

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
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '现价',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: '涨跌幅',
      dataIndex: 'delta',
      key: 'delta',
    },
    {
      title: '总市值',
      dataIndex: 'delta',
      key: 'delta',
    },
    {
      title: '操作',
      dataIndex: 'code',
      key: 'code',
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
            <Table columns={columns} dataSource={mockdata} />
          </div>
        </>
  );
};

export default App;
