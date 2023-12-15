const BASE_URL='http://localhost:8000/'

const request=(url:string,method:'post'|'get'='get',data={})=>{
    const options:any = {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
          mode: 'cors',
      };
    
      if (method==='post'&&data) {
        options.body = JSON.stringify(data);
      }
    
      return window.fetch(BASE_URL+url, options)
        .then(response => {
          if (!response) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
}

export default request