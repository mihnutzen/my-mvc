import BaseView from '../base/BaseView.es6';
import Router from '../utils/router';
import PubSub from 'pubsub-js';

let router = new Router();

const SELECTOR = {
  subComponent: '.subComponent',
  clickDemo: '.js-click',
  productDemo: '.js-product',
  homeDemo: '.js-home'
};

class DemoView extends BaseView {

  render() {
    super.render();
    this.setupInternals();
    this.setupEvents();
  }

  setupInternals() {
    this.$subComponent = this.$view.find(SELECTOR.subComponent);
    this.$clickDemo = this.$view.find(SELECTOR.clickDemo);
    this.$productDemo = this.$view.find(SELECTOR.productDemo);
    this.$homeDemo = this.$view.find(SELECTOR.homeDemo);
  }

  setupEvents() {
    this.$clickDemo.click(() => {
      router.navigate('/about/');
    });

    this.$productDemo.click(() => {
      router.navigate('/products/5');
    });

    this.$homeDemo.click(() => {
      router.navigate('/');
    });
  }

  destroy() {
    super.destroy();

    this.$clickDemo.off('click');
    this.$productDemo.off('click');
    this.$homeDemo.off('click');
  }
}

module.exports = DemoView;
