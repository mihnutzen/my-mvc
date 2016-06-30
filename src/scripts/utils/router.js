import PubSub from 'pubsub-js';
import { ROUTES, EVENTS } from '../config/config.es6';
import { keys } from 'lodash';

let instance = null;

class Router {
  constructor() {
    if (!instance) {
      console.log('%c ROUTER INIT', 'color: green;');
      instance = this;
    }

    this.routes = [];
    this.mode = 'hash',
    this.root = '/';
    this.current = '';

    this.setupRoutes();

    return instance;
  }

  setupRoutes() {
    let routes = keys(ROUTES);
    routes.forEach((r) => {
      this.add(r, ROUTES[r]);
    });

  }

  config(options) {
    if (options) {
      if (options.mode === 'history' && !history.pushState) {
        options.mode = 'hash';
        console.warn('%c history.pushState not supported', 'color: orange;');
      }

      this.mode = options.mode;
      this.root = options.root ? '/' + this.clearSlashes(options.root) + '/' : '/';
    }
  }

  getPart() {
    let rPart = '';
    if (this.mode === 'history') {
      rPart = this.clearSlashes(decodeURI(location.pathname + location.search));
      rPart = rPart.replace(/\?(.*)$/, '');
      rPart = this.root != '/' ? rPart.replace(this.root, '') : rPart;
    } else {
      let match = window.location.href.match(/#(.*)$/);
      rPart = match ? match[1] : '';
    }
    return this.clearSlashes(rPart);
  }

  add(name, path) {
    let route = {
      name: name,
      path: path
    };
    this.routes.push(route);
  }

  remove(path) {
    for (let i = 0; i < this.routes.length; i++) {
      let r = this.routes[i];
      if (r.path.toString() === path.toString()) {
          this.routes.splice(i, 1);
      }
    }
  }

  reset() {
    this.routes = [];
    this.mode = 'hash';
    this.root = '/';
  }

  check(part) {
    let rPart = part || '/';
    for (let i = 0; i < this.routes.length; i++) {
      let match = rPart.match(this.routes[i].path);
      if (match) {
        match.route = this.routes[i].path;
        match.name = this.routes[i].name;
        PubSub.publish(EVENTS.ROUTE_CHANGE, match);
        return;
      }
    }
    console.warn('%c Route Not Found', 'color: orange;');
  }

  listen() {
    let self = this;
    let fn = function() {
      if (self.current !== self.getPart()) {
        self.current = self.getPart();
        self.check(self.current);
      }
    }
    clearInterval(this.interval);
    this.interval = setInterval(fn, 50);
  }

  navigate(path) {
    path = path ? this.clearSlashes(path) : this.root;
    if (this.mode === 'history') {
      history.pushState(null, null, '/' + path);
    } else {
      window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
    }
  }

  clearSlashes(path) {
    return path.toString().replace(/\/$/, '').replace(/^\//, '');
  }
}

export default Router;
