import React from 'react';
import {
  Table,
  Button,
  Form,
  Input,
  Row,
  Descriptions
} from 'antd';
import {mockdata} from './config'
import './style.css';

const Detail: React.FC=()=>{

    const data=Object.entries(mockdata).map(([k,v])=>({label:k,value:v}))
    return (
        <div className="detail_page">
             <Descriptions title="User Info" bordered>
                {data.map(({label,value})=>( <Descriptions.Item label={label} key={label}>{value}</Descriptions.Item>))}
    </Descriptions>
        </div>
    )
}

export default Detail