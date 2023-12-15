import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { parseUrlSearchParams } from '../../utils';
import './style.css';

const Regist: React.FC = () => {

  const [form]=Form.useForm()

  useEffect(() => {
    // 请求
    const search = parseUrlSearchParams();
    console.log('search', search);
  }, []);

  const onFinish=()=>{
    
  }

  return (
    <div className="regist_page">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
          onFinish={onFinish}
        form={form}
        autoComplete="off"
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="密码确认"
          name="confirm"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>


        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Regist;
