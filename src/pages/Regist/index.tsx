import React, { useEffect } from 'react';
import { Form, Input, Button,message } from 'antd';
import {useHistory} from 'react-router'
import { parseUrlSearchParams } from '@utils/index';
import request from '@utils/request';
import './style.css';

const Regist: React.FC = () => {

  const [form]=Form.useForm()
  const history=useHistory()

  useEffect(() => {
    // 请求
    const search = parseUrlSearchParams();
    console.log('search', search);
  }, []);

  const onFinish= async (values:any)=>{
    console.log('values',values)
    try{
    const {username,password,confirm,email}=values
    if(password!==confirm){
      message.error("密码不一致，请重新输入！")
    }else{
      await request('/register/','post',{username,password,email})
      message.success("注册成功，请重新登陆")
      history.push('/login')
    }
    }catch(err){
      console.log(err)
    }
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

        <Form.Item
          label="邮箱"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
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
