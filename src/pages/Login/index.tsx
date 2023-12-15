import React, { useEffect,useContext } from 'react';
import { Form, Input, Checkbox, Button, message } from 'antd';
import { parseUrlSearchParams } from '@utils/index';
import request from '@utils/request';
import {useHistory} from 'react-router'
import { UserContext } from '../../App';  

import './style.css';

const Login: React.FC = () => {
  const userContext = React.useContext(UserContext);
  const { userInfo, setUserInfo } = userContext;
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
    const {username,password}=values
      const {retCode,userId}=await request('/login/','post',{username,password})
      if(retCode>0){
        message.error(retCode===1?"账户或密码错误，请重新输入！":"用户不存在")
      }else{
        message.success("登陆成功")
        setUserInfo({userId})
        history.push('/')
      }
    }catch(err){
      message.error("网络错误")
      console.log(err)
    }
  }


  return (
    <div className="login_page">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
          onFinish={onFinish}
        autoComplete="on"
        form={form}
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
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>记住我</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
