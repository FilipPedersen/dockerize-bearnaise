import { shallowMount } from '@vue/test-utils';
import Title from '@/components/Title.vue';
import { expect } from 'chai';

describe('Title.vue', () => {
  it('renders prop.label', () => {
    const title = shallowMount(Title, {
      props: {
        text: 'Title',
      },
    });

    expect(title.text()).to.include('Title');
  });

  it('changes heading type based on prop.size', () => {
    const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

    headings.forEach((h) => {
      const title = shallowMount(Title, {
        props: {
          text: h,
          size: h,
        },
      });

      expect(title.element.nodeName.toLowerCase()).to.equal(h);

      expect(title.text()).to.include(h);
    });
  });
});
