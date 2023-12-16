const parseUrlSearchParams=()=>{
    const url=new URL(window.location.href)
    const searchParams:any = new URLSearchParams(url.search);
    const params:any = {};
  
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
  
    return params;
  }

  // {ts_code: "000001.SH", trade_date: "2020-02-17", close: 2983.6224, open: 2924.9913, high: 2983.6371,…}
  const getChartDataFromBoldData=(key:string,boldData:any,dataSpan:number=20)=>{
    const {legend,series_list,x_axis}=boldData
    if(key==='date'){
      return x_axis.slice(-dataSpan)
    }
    const findKeyIndex=legend.indexOf(key)
    if(findKeyIndex>-1){
      return series_list[findKeyIndex].data.slice(-dataSpan)
    }
  }

  function convertDateFormat(dateString:string) {  
    let year = dateString.substring(0, 4);  
    let month = dateString.substring(4, 6);  
    let day = dateString.substring(6, 8);  
      
    return `${year}-${month}-${day}`;  
  }

  

  const genChartData=(boldData:any,ts_code:string,dataSpan:number=20)=>{
    const close=getChartDataFromBoldData('close',boldData,dataSpan)
    const open=getChartDataFromBoldData('open',boldData,dataSpan)
    const high=getChartDataFromBoldData('high',boldData,dataSpan)
    const low=getChartDataFromBoldData('low',boldData,dataSpan)
    const amount=getChartDataFromBoldData('amount',boldData,dataSpan)
    const vol=getChartDataFromBoldData('vol',boldData,dataSpan)
    const date=getChartDataFromBoldData('date',boldData,dataSpan)

    return close.map((_:any,index:number)=>({
      ts_code,
      close:close[index],
      open:open[index],
      high:high[index],
      low:low[index],
      amount:amount[index],
      vol:vol[index],
      trade_date:convertDateFormat(date[index]),
    }))
  }

  export {parseUrlSearchParams,genChartData}