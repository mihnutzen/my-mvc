import { unsubArray } from '../utils/utils.es6';

class BaseView {
  constructor($parentView, name, templateName, data) {
    this.name = name;
    this.$parentView = $parentView;
    this.template = Handlebars.templates['templates/' + (templateName || name)];
    this.data = data;
    this.listeners = [];
  }

  /**
   * Render the view.
   */
  render() {
    this.setupView();

    let html = this.template(this.data);
    this.$view.html(html);
  }

  /**
   * Find DOM el in parent and create & insert one if none is found
   */
  setupView() {
    this.$view = this.$parentView.find('[data-component="' + this.name + '"]');

    if (!this.$view.get(0)) {
      this.$view = $('<div>');
      this.$view.attr('data-component', this.name);
      this.$parentView.append(this.$view);
    }
  }

  /**
   * Remove all the view listeners.
   */
  removeAllListeners() {
    unsubArray(this.listeners);
  }

  /**
   * Destroy the view.
   */
  destroy() {
    // console.log('BaseView ' + this.template + ' destroy');
    this.removeAllListeners();
    this.destroyView();
  }

  destroyView() {
    this.$view.empty();
  }
}

module.exports = BaseView;
