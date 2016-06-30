import PubSub from 'pubsub-js';
import { EVENTS } from '../config/config.es6';

import BaseCtrl from '../base/BaseCtrl.es6';
import DemoView from './demoView.es6';
import DemoStore from './demoStore.es6';
import SubComponent from '../subComponent/subComponent.es6';

class DemoComponent extends BaseCtrl {
  constructor($parentView, name, templateName) {
    super();
    // console.log('%c setup demo component', 'color: gold; font-size: 15px;');
    this.$parentView = $parentView;
    this.name = name;
    this.templateName = templateName;

    this.init();
  }

  init() {
    DemoStore.getDemoData().then((res) => {
      this.data = res;
      this.setView();
    }).fail(function(fail) {
      console.warn('%c request failed ---> ', 'color: orange;', fail);
    });

    this.listeners.push(PubSub.subscribe(EVENTS.ROUTE_CHANGE, this.onChangeRoute.bind(this)));
  }

  setView() {
    this.view = new DemoView(this.$parentView, this.name, this.templateName, this.data);
    this.view.render();
  }

  initComponents() {
    let subComponent = new SubComponent(this.view.$view);
    this.components.subComponent = subComponent;
  }

  onChangeRoute(name, data) {
    console.log('onChangeRoute --->', data);
    if (data.name === 'ABOUT') {
      this.initComponents();
    } else {
      this.removeComponents();
    }
  }

  getTitle() {
    return this.title;
  }

  setTitle(title) {
    this.title = title;
  }
}

module.exports = DemoComponent;
