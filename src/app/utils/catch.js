import store from '../store';
import {setPageError} from '~actions/page'
import sentry from '~service/index';
import ReactUpdates from "react-dom/lib/ReactUpdates";
import ReactDefaultBatchingStrategy from "react-dom/lib/ReactDefaultBatchingStrategy";
let isHandlingError = false;
const ReactTryCatchBatchingStrategy = {
  // this is part of the BatchingStrategy API. simply pass along
  // what the default batching strategy would do.
  get isBatchingUpdates () { return ReactDefaultBatchingStrategy.isBatchingUpdates; },

  batchedUpdates (...args) {
    try {
      ReactDefaultBatchingStrategy.batchedUpdates(...args);
    } catch (e) {
      if (isHandlingError) {
        // our error handling code threw an error. just throw now
        throw e;
      }

      isHandlingError = true;
      try {
        // dispatch redux action notifying the app that an error occurred.
        // replace this with whatever error handling logic you like.
        store.dispatch(setPageError(e));
        // console.log(e)
        console.error(e)
        if(process.env.NODE_ENV != 'development'){
          sentry().then((Raven)=>{
            Raven.captureException(e);
          })
        }
      } finally {
        isHandlingError = false;
      }
    }
  },
};

ReactUpdates.injection.injectBatchingStrategy(ReactTryCatchBatchingStrategy);