import BaseStore from '../base/baseStore.es6';

class DemoStore extends BaseStore {
  constructor() {
    super();

    this.demoUrl = '../../data.json';
  }

  getDemoData() {
    return this.loadJson(this.demoUrl);
  }
}

export default new DemoStore();
