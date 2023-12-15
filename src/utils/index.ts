const parseUrlSearchParams=()=>{
    const url=new URL(window.location.href)
    const searchParams:any = new URLSearchParams(url.search);
    const params:any = {};
  
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
  
    return params;
  }

  export {parseUrlSearchParams}