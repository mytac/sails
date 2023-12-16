import React,{FC}  from 'react';
import { Stock } from '@ant-design/plots';

import './style.css';
const DemoLine:FC<{charData:any}> = ({charData}) => {
  const config = {
    data:charData,
    xField: 'trade_date',
    yField: ['open', 'close', 'high', 'low'],
  };

  return (
    <div className="line_chart_wrapper">
      {/* @ts-ignore */}
     <Stock {...config} />
    </div>
  );
};

export default DemoLine;
