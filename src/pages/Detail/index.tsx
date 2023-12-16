import React, { useEffect,useState } from 'react';
import {Descriptions,Empty} from 'antd';
import {parseUrlSearchParams} from '../../utils'
import request from '@utils/request';
import './style.css';

const Detail: React.FC=()=>{
    const [detail,setDetail]=useState({})
    useEffect(()=>{
        // 请求
        const search=parseUrlSearchParams()
        const {ts_code}=search
        if(ts_code){
            fetchDetail(ts_code)
        }
    },[])

    const fetchDetail=async (ts_code:string)=>{
        try{
            const list = await request(`/stock-info?ts_code=${ts_code}`, 'post', {});
            const data=list[0]
            setDetail(data)
        }catch(err){
            console.error()
        }
    }

    const data:any=Object.entries(detail).map(([k,v])=>({label:k,value:v}))
    return (
        <div className="detail_page">
            {data.length?
            (
                <Descriptions title="" bordered>
                {/* @ts-ignore */}
                {data.map(({label,value})=>( <Descriptions.Item label={label} key={label}>{value}</Descriptions.Item>))}
            </Descriptions>
            ):
            <Empty/>
        }
             
        </div>
    )
}

export default Detail