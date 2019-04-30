const IncrementalDomRenderer = require('metal-incremental-dom').default;
const Component = require('metal-component').default;

const serializer = require('../index');

describe('snapshot serializer', () => {
  it('should not pass if the value is not a metal component', () => {
    const val = {};

    expect(serializer.test(val)).toBe(false);
  });

  it('should pass if the value is a metal component', () => {
    const val = {
      __metal_component__: true
    };

    expect(serializer.test(val)).toBe(true);
  });

  it('should serialize to a string', () => {
    const element = document.createElement('div');
    element.innerHTML = 'foo';

    const val = {
      element,
      __metal_component__: true
    };

    expect(serializer.print(val)).toBe('<div>foo</div>');
  });

  it('should append child portals to parent value', () => {
    const comp = new Component();
    comp.element.innerHTML = 'foo';

    const data = IncrementalDomRenderer.getData(comp);

    const child = new Component();
    child.element.innerHTML = 'portal';
    child.portalElement = true;

    data.childComponents = [child];

    expect(serializer.print(comp)).toBe('<div>foo</div>\n<div>portal</div>');
  });
});
