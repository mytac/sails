import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  Button,
  message,
  Modal,
  Form,
  Row,
  Input,
  Space,
  theme,
  PaginationProps,
  Col,
  Select,
} from 'antd';
import request from '@utils/request';
import { UserContext } from '../../App';
import StockBadge from '@component/StockBadge';
import './style.css';

const { Option } = Select;

const App: React.FC = () => {
  const userContext = React.useContext(UserContext);
  const [filterForm] = Form.useForm();
  const { userInfo } = userContext;

  const [stockList, setStockList] = useState([]);
  const [industry, setIndustry] = useState([]);
  const [area, setArea] = useState([]);
  const [pageIndex,setPageIndex]=useState(1)
  const [visible, setVisible] = useState(false);

  const queryStockList = async (page=1) => {
    try {
      const params=filterForm.getFieldsValue()
      const stockList = await request('/stock-pageList/', 'post', { page ,...params});
      const arr: any = JSON.parse(stockList);
      const data: any = arr.map((item: any) => ({ ...item.fields }));
      setStockList(data);
    } catch (err) {
      //@ts-ignore
      // setStockList(mockdata);
    }
  };

  const queryOptions = async () => {
    try {
      const { area, industry } = await request('/stock/filter_options/', 'get');
      setIndustry(industry);
      setArea(area);
    } catch (err) {
      //@ts-ignore
      // setStockList(mockdata);
    }
  };

  useEffect(() => {
    queryStockList();
    queryOptions();
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
      dataIndex: 'change',
      key: 'change',
      render: (value: number) => (
        <span style={{ color: value > 0 ? 'red' : 'green' }}>{value}%</span>
      ),
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
            <Button type="link">
              <Link to={`/detail?ts_code=${code}`}>详情</Link>
            </Button>
            <Button type="link">
              <Link to={`/predict?ts_code=${code}`}>预测</Link>
            </Button>
          </div>
        );
      },
    },
  ];

  const isLogin = userInfo?.userId;

  const pagination:PaginationProps={
    total:100,
    pageSize:50,
    showSizeChanger:false,
    current:pageIndex,
    onChange:(page)=>{
        console.log('page',page)
        setPageIndex(page)
        queryStockList(page)
    }

  }
  return (
    <>
      <Form form={filterForm} className="query-box" onFinish={queryStockList.bind(null,undefined)}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item name="name" label="股票名称">
              <Input placeholder="请输入股票名称" allowClear/>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item name="ts_code" label="股票代码">
              <Input placeholder="请输入股票代码" allowClear/>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="industry" label="行业">
              <Select placeholder="请选择行业" allowClear>
                {industry.map((i) => (
                  <Option key={i} value={i}>
                    {i}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Form.Item name="area" label="地区">
              <Select placeholder="请选择地区" allowClear>
                {area.map((i) => (
                  <Option key={i} value={i}>
                    {i}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={16} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
            <Button
              style={{ margin: '0 8px' }}
              onClick={() => {
                filterForm.resetFields();
              }}
            >
              重置
            </Button>
          </Col>
        </Row>
      </Form>
      <div className="list">
        <Table columns={columns} dataSource={stockList} pagination={pagination}/>
      </div>
    </>
  );
};

export default App;
