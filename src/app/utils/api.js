import $fetch from '~util/fetch';
import { serverUrl } from './config.js';
import { getAppRouter } from '~util/index'

let baseFetchConfig = {
    credentials: 'include'
};

let redirectPage = (err_code)=>{
    let router = getAppRouter(err_code);
    let from = '';
    if(router){
        from = router.history.location.pathname + router.history.location.hash;
        router.history.push('/login',{from})
    }else{
        from = location.pathname + location.hash;
        location.href = '/login?from=' + from;
    }
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response.json())
        } else {
            return response.json().then((err)=>{
                if(err.err_code == '403001'){
                    redirectPage(err.err_code);
                }else if(err.err_code == '401001'){
                    if(location.href.indexOf('/login') < 0){
                        redirectPage(err.err_code);
                    }
                    return Promise.reject(err)
                }else{
                    return Promise.reject(err)
                }
            })
        }
}

let getConfig = (method, paramObj = {})=>{
    return Object.assign({
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paramObj)
        },baseFetchConfig)
}

export const $get = (url, paramObj = {})=>{
    url = `${serverUrl}${url}?params=${JSON.stringify(paramObj)}`;
    return $fetch(url, baseFetchConfig)
            .then(checkStatus)
}

export const $post = (url, paramObj = {}) => {
    url = serverUrl + url
    let config = getConfig('POST',paramObj);
    return $fetch(url,config).then(checkStatus)
}

export const $put = (url, paramObj = {}) => {
    url = serverUrl + url
    let config = getConfig('PUT',paramObj);
    return $fetch(url,config).then(checkStatus)
}

export const $delete = (url, paramObj = {}) => {
    url = serverUrl + url
    let config = getConfig('DELETE',paramObj);
    return $fetch(url,config).then(checkStatus)
}

export const $download = (url, paramObj = {}) => {
    url = `${serverUrl}${url}?params=${JSON.stringify(paramObj)}`;
    window.open(url)
}