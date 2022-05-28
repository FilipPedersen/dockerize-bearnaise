import { expect } from 'chai';
import { shallowMount, mount } from '@vue/test-utils';
import Button from '@/components/Button.vue';

describe('Button.vue', () => {
  it('renders props.label when passed', () => {
    const label = 'Save';

    const button = shallowMount(Button, {
      props: {
        label: 'Save',
      },
    });

    expect(button.text()).to.include(label);
  });

  it('button class based on prop.kind', () => {
    const buttonKinds = ['primary', 'secondary', 'nonexistent', undefined, null];

    buttonKinds.forEach((kind) => {
      const expectedClass = typeof kind === 'string' ? kind : 'primary';

      const button = shallowMount(Button, {
        props: {
          label: 'Click',
          kind,
        },
      });

      expect(button.text()).to.include('Click');

      expect(button.classes()).contain(`button--${expectedClass}`);
    });
  });

  it('change type based on prop.type', async () => {
    const buttonTypes = ['button', 'submit', 'reset'];

    buttonTypes.forEach((type) => {
      const button = mount(Button, {
        props: {
          label: 'Save',
          type,
        },
      });

      expect(button.attributes().type).to.equal(type);
    });
  });

  it('emits @clicked on click', async () => {
    const button = mount(Button, {
      props: {
        label: 'Save',
      },
    });

    await button.find('button').trigger('click');

    expect(button.emitted()).haveOwnProperty('clicked');
  });
});
