var templates = require('../../dist/templates.js');
import Router from './utils/router';

import DemoComponent from './demoComponent/demoCtrl.es6';

(function() {
  let router = new Router();
  let options = {
    mode: 'hash',
    root: '/'
  };
  router.config(options);
  router.listen();

  let $parent = $('#app');
  let demoComponent = new DemoComponent($parent, 'demo', 'demoComponent');

})();
