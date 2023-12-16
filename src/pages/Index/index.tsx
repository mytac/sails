import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, message, Modal, Form, Row, Input } from 'antd';
import request from '@utils/request';
import { mockdata } from './config';
import { UserContext } from '../../App';
import StockBadge from '@component/StockBadge'

import './style.css';

const App: React.FC = () => {
  const userContext = React.useContext(UserContext);
  const [form] = Form.useForm();
  const { userInfo } = userContext;

  const [stockList, setStockList] = useState([]);
  const [visible, setVisible] = useState(false);

  const queryStockList = async () => {
    try {
      if (userInfo?.userId) {
        const { stockList } = await request('/selectStock/', 'post', {});
        //@ts-ignore
        setStockList(mockdata);
        // setStockList(stockList);
      } else {
        message.error('请先登录查看自选股');
      }
    } catch (err) {
        //@ts-ignore
        setStockList(mockdata);
    }
  };

  useEffect(() => {
    queryStockList();
  }, []);

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
      render: (code: string) => {
        return (
          <div className="table_ops_wrapper">
            <Button type="link" onClick={onDel.bind(null,code)}>删除</Button>
            <Button type="link">
              <Link to={`/detail?code=${code}`} target="_blank">
                详情
              </Link>
            </Button>
            <Button type="link">预测</Button>
          </div>
        );
      },
    },
  ];

  const isLogin=userInfo?.userId

  const queryStock= async (ts_code:string)=>{
    try {
      if (isLogin) {
        await request(`/stock/selectStock/addStock/${userInfo?.userId}/${ts_code}`, 'get', {});
        message.success("自选股添加成功")
      } else {
        message.error('请先登录查看自选股');
      }
    } catch (err) {}
  }

  // 添加自选股
  const onFinish = async (values: any) => {
    const {ts_code}=values
    try {
      if (isLogin) {
        await request(`/stock/selectStock/addStock/${userInfo?.userId}/${ts_code}`, 'get', {});
        message.success("自选股添加成功")
      } else {
        message.error('请先登录查看自选股');
      }
    } catch (err) {}
  };

  // 删除股票
  const onDel=async (ts_code:string)=>{
    try {
      if (isLogin) {
        await request(`/stock/selectStock/delStock/${userInfo?.userId}/${ts_code}`, 'get', {});
        message.success("自选股删除成功")
      } else {
        message.error('请先登录查看自选股');
      }
    } catch (err) {}
  }

  return (
    <>
      <div className="head">
      <StockBadge title="上证指数" value={2942.56} changeRatio={-0.56} changeValue={-16.43}/>
      <StockBadge title="深证成指" value={2942.56} changeRatio={-0.35} changeValue={-32.64}/>
      <StockBadge title="创业板指" value={2942.56} changeRatio={-0.65} changeValue={-12.01}/>
      </div>

      <div className="list">
        <Button onClick={setVisible.bind(null,true)} className='add-btn' type='primary'>添加自选</Button>
        <Table columns={columns} dataSource={stockList} />
      </div>

      <Modal title="添加自选股" open={visible} footer={null} onCancel={setVisible.bind(null,false)}>
        <Form form={form} name="control-hooks" onFinish={onFinish}>
          <Row>
            <Form.Item name="ts_code" label="股票" rules={[{ required: true }]}>
              <Input placeholder="请输入股票代码" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                添加
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default App;
