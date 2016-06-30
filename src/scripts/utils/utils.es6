import PubSub from 'pubsub-js';

let unsubArray = function(arr) {
  while (arr.length) {
    PubSub.unsubscribe(arr.pop());
  }
};

export { unsubArray };
