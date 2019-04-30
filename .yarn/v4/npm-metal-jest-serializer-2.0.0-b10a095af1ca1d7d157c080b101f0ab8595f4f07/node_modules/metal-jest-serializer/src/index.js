const IncrementalDomRenderer = require('metal-incremental-dom').default;
const html = require('js-beautify').html;

module.exports = {
  print(component) {
    const componentHTML = appendPortalHTML(
      component,
      component.element.outerHTML
    );

    return html(
      componentHTML,
      {
        indent_size: 2,
        unformatted: 'none',
        wrap_line_length: 0
      }
    );
  },

  test(val) {
    return !!val && !!val.__metal_component__;
  }
};

function appendPortalHTML(component, componentHTML) {
  const data = IncrementalDomRenderer.getData(component);

  if (data.childComponents && data.childComponents.length) {
    for (const childName in data.childComponents) {
      const childComponent = data.childComponents[childName];

      if (childComponent.portalElement) {
        componentHTML += childComponent.element.outerHTML;
      }

      componentHTML = appendPortalHTML(childComponent, componentHTML);
    }
  }

  return componentHTML;
}
