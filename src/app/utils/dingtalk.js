import {getPlatform} from '~util/index';
import {$get} from '~util/api';

let ddState = {}

function config(){
    return new Promise((resolve,reject)=>{
        let doConfig = ()=>{
            let {agentId,corpId,timeStamp,nonceStr,signature} = ddState.signature
            ddState.DingTalk.config({
                 agentId,
                 corpId,
                 timeStamp,
                 nonceStr,
                 signature,
                 jsApiList: ['runtime.permission.requestAuthCode','runtime.info']
            });
            ddState.DingTalk.ready((res)=>{
                console.log(res);
                console.log('ddState.DingTalk.ready',ddState.DingTalk, ddState.signature)
                let {DingTalk, signature} = ddState;
                resolve({DingTalk, signature});
            });
            ddState.DingTalk.error(function(err){
                /**
                    {
                    message:"错误信息",//message信息会展示出钉钉服务端生成签名使用的参数，请和您生成签名的参数作对比，找出错误的参数
                    errorCode:"错误码"
                    }
                **/
                console.log('dd error: ', err);
                reject(err)
                
            });
        }
        if(ddState.signature){
            doConfig();
        }else{
            console.log('/api/login/ding')
            $get('/api/users/login/ding',{url:location.href.replace(/[(\/)|(\?.*)]$/g,'')})
                .then(({ data }) => {
                ddState.signature = data;
                doConfig();
            }).catch(err=>{
               reject(err);
            })
        }
    })
}

ddState.initial = ()=>{
    let category = '';
    let platform = getPlatform();
    if(platform == 'DingTalk_Desktop'){
        category = 'pc';
    }else if(platform == 'DingTalk'){
        category = 'mobile';
    }else{
        category = 'plain';
    }
    if(category != 'plain'){
        ddState.ready = new Promise((resolve,reject)=>{
            import (
            /* webpackChunkName: "dingtalk-api" */
            `../vendor/dingtalk-1-${category}.js`)
            .then(dd=>{
                ddState.DingTalk = dd;
            }).then(()=>{
                return config();
            }).then((dd)=>{
                resolve(dd);
            }).catch(err=>{
                reject(err)
            })
        })
    }else{
        ddState.ready = Promise.resolve()
    }
}

export default ddState;