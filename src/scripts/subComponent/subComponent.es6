import BaseCtrl from '../base/BaseCtrl.es6';
import BaseView from '../base/BaseView.es6';

const SELECTOR = {
  componentName: '.subComponent'
};

class SubComponent extends BaseCtrl {
  constructor($parentView) {
    // console.log('%c constructor SUB CCComponent', 'color: green');
    super();
    this.title = 'SuB Title';
    this.$parentView = $parentView;
    this.name = 'subComponent';
    this.templateName = 'subComponent';
    this.data = {
      title: this.title
    };

    this.init();
  }

  init() {
    this.setView();
  }

  setView() {
    this.view = new BaseView(this.$parentView, this.name, this.templateName, this.data);
    this.view.render();
  }

  getTitle() {
    return this.title;
  }

  setTitle(title) {
    this.title = title;
  }
}

module.exports = SubComponent;
