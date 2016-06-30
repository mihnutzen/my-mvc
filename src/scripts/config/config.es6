let ROUTES = {
  HOME: /^\//,
  ABOUT: /about/,
  PRODUCTS: /products\/(.*)/
};

let EVENTS = {
  ROUTE_CHANGE: 'route::change'
};

export { ROUTES, EVENTS };
