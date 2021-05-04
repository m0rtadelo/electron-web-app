import { View, Component, Service, get } from '..';
import { expect } from 'chai';
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const html = `<html><form id="form" click="this.test()"><input id="user" click="this.test()" value="user">
<input id="pass" value="pass"></form><app id="root"></app></html>`;
const { document } = (new JSDOM(html)).window;

class MockView extends View {
  public touched = false;
  constructor(view: string, components?: Array<Component>, data?: any, service?: Service, isModal?: boolean) {
    super(view, components, data, service, isModal);
  }

  test() {
    this.touched = true;
  };

  public emmit(data: any) {
    this.model = data;
  };

};

class MockComponent extends Component {
  selector = 'component';

  render(view: View, parent: any) {
    super.render(view, parent);
    super.return('<div>component</div>');
  };
}

class MockComponent2 extends Component {
  selector = 'component2';

  render(view: View, parent: any) {
    super.render(view, parent);
    super.return('<div>component2</div>');
  }
}

beforeEach(() => {
  global.document = document;
});

describe('View', () => {
  it('should render', () => {
    new MockView('rendered');
    const inner = get('root').innerHTML;
    expect(inner).equals('\n<div id="client.library.content.tag"></div>\nrendered');
  });

  it('should emmit data', () => {
    const v = new MockView('rendered');
    v.emmit('data');
    expect(v.model).equals('data');
  });

  it('should add commponents', () => {
    new MockView('<component id="component"></component>', [new MockComponent()]);
    const inner = get('component').innerHTML;
    expect(inner).equals('<div>component</div>');
  });

  it('should return correct component', () => {
    const m1 = new MockComponent();
    const m2 = new MockComponent2();
    const v = new MockView('<component id="component"></component><component2></component2>', [m1, m2]);
    const elem = v.getComponentById('component');
    expect(elem.idComponent).equals('component');
  });

  it('should cancel confirm modal as expected', async () => {
    const m = new MockView('modal', [], {}, undefined, true);
    setTimeout(() => {
      get('buttonModalCancel').click();
    }, 10);
    const res = await m.confirm('confirm');
    expect(!!res).equals(false);
  });

  it('should confirm confirm modal as expected', async () => {
    const m = new MockView('modal', [], undefined, undefined, true);
    setTimeout(() => {
      get('buttonModalConfirm').click();
    }, 10);
    const res = await m.confirm('confirm');
    expect(!!res).true;
  });

});
