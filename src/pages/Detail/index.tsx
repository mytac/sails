import React, { useEffect } from 'react';
import {Descriptions} from 'antd';
import {parseUrlSearchParams} from '../../utils'
import {mockdata} from './config'
import './style.css';

const Detail: React.FC=()=>{
    
    useEffect(()=>{
        // 请求
        const search=parseUrlSearchParams()
        console.log('search',search)
    },[])

    const data=Object.entries(mockdata).map(([k,v])=>({label:k,value:v}))
    return (
        <div className="detail_page">
             <Descriptions title="" bordered>
                {data.map(({label,value})=>( <Descriptions.Item label={label} key={label}>{value}</Descriptions.Item>))}
            </Descriptions>
        </div>
    )
}

export default Detail