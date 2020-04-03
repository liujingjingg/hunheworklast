import querySrting from 'query-string'
let rootUrl='https://www.fastmock.site/mock/e05194a2eb8271db8f8e204ca40ae052/api';
let myFetch={
    get(url,queryParams){
        url=rootUrl+url
        if(queryParams){
            url+="?"+querySrting.stringify(queryParams)
        }
        console.log(url)
        return fetch(url)
            .then(res=>res.json())
    },
    post(url,body){
        return fetch(rootUrl+url,{
            method:'POST',
            headers:{
               "Accept":'application/json',
               "Content-Type":'application/json'
            },
            body:JSON.stringify(body)
        })
            .then(res=>res.json())
    }
}

export {myFetch};