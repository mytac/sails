import React, { FC } from 'react';
import './style.css';

const StockBadge: FC<{ title: string; value: number;changeRatio:number;changeValue:number }> = ({
  title,
  value,
  changeRatio,
  changeValue,
}) => {
  return (
    <div className="head_stock">
      <p className="title" >{title}</p>
      <p className="value" style={{color:changeValue>0?'red':'green'}}>{value}</p>
      <p className="change" style={{color:changeValue>0?'red':'green'}}>
        {changeRatio}({changeValue}%)
      </p>
    </div>
  );
};

export default StockBadge;
