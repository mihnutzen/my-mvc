import { keys } from 'lodash';
import { unsubArray } from '../utils/utils.es6';

class BaseCtrl {
  constructor() {
    this.$parentView;
    this.name;
    this.templateName;
    this.data;
    this.model;
    this.view;
    this.listeners = [];
    this.components = {};
  }

  /**
   * Remove all the instance listeners.
   */
  removeAllListeners() {
    unsubArray(this.listeners);
  }

  /**
   * Remove all the instance components.
   */
  removeComponents() {
    let components = keys(this.components);
    components.forEach((name) => {
      let component = this.components[name];
      if (component.destroy && typeof component.destroy === 'function') {
        component.destroy();
      }
    });

    this.components = {};
  }

  /**
   * Destroy component.
   */
  destroy() {
      this.removeComponents();

      if (this.model &&
          this.model.destroy) {
          this.model.destroy();
          this.model = {};
      }

      if (this.view &&
          this.view.destroy) {
          this.view.destroy();
          this.view = {};
      }

      this.removeAllListeners();

      console.log('%c BaseCtrl Destroy', 'color: red;');
  }
}

module.exports = BaseCtrl;
