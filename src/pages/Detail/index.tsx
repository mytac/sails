import React, { useEffect,useState } from 'react';
import {Descriptions,Empty} from 'antd';
import {parseUrlSearchParams} from '../../utils'
import request from '@utils/request';
import {genChartData} from '@utils/index';
import LineChart from '@component/LineChart'
import {ATTR_MAP} from './config'
import './style.css';

const SPAN=60

const Detail: React.FC=()=>{
    const [detail,setDetail]=useState<any>({})
    const [charData,setChartData]=useState([])
    useEffect(()=>{
        // 请求
        const search=parseUrlSearchParams()
        const {ts_code}=search
        if(ts_code){
            fetchDetail(ts_code)
            fetchValue(ts_code)
        }
    },[])

    const fetchDetail=async (ts_code:string)=>{
        try{
            const list = await request(`/stock-info?ts_code=${ts_code}`, 'get', {});
            const {fields}=JSON.parse(list)[0]
            setDetail(fields)
        }catch(err){
            console.error(err)
        }
    }

    // 历史走势
    const fetchValue=async(ts_code:string)=>{
        try{
            const list = await request(`/stock/chart/line/?ts_code=${ts_code}`, 'get', {});
            const data=genChartData(list.data,ts_code,SPAN)
            setChartData(data)
        }catch(err){
            console.error(err)
        }
    }

    // @ts-ignore
    const data:any=Object.entries(detail).map(([k,v])=>({label:ATTR_MAP[k],value:v}))
    return (
        <div className="detail_page">
            {data.length?
            (
                <Descriptions title={`${detail.name}近${SPAN}天走势`} bordered>
                {/* @ts-ignore */}
                {data.filter(d=>d.label).map(({label,value})=>( <Descriptions.Item label={label} key={label}>{value}</Descriptions.Item>))}
            </Descriptions>
            ):
            <Empty/>
        }

        <div className="chart">
            <LineChart charData={charData}/>
        </div>
             
        </div>
    )
}

export default Detail