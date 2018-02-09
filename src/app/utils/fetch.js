import {apiTimeout} from './config';

let $fetch = (fetch_promise, timeout) =>{
      var abort_fn = null;

      //这是一个可以被reject的promise
      var abort_promise = new Promise(function(resolve, reject) {
             abort_fn = function() {
                reject('abort promise');
             };
      });

      //这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
       var abortable_promise = Promise.race([
             fetch_promise,
             abort_promise
       ]);
       abortable_promise.abort = abort_fn;
       if(timeout){
            setTimeout(function() {
                abort_fn();
            }, timeout);
       }
       return abortable_promise;
}

export default (...args)=>{
    return $fetch(fetch(...args),apiTimeout)
}