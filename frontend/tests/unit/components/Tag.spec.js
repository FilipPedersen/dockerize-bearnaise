import Tag from '@/components/Tag.vue';
import { shallowMount } from '@vue/test-utils';
import { expect } from 'chai';

describe('Tag.vue', () => {
  it('renders props.label', () => {
    const tag = shallowMount(Tag, {
      props: {
        label: 'Fish',
      },
    });

    expect(tag.text()).to.include('Fish');
  });

  it('changes background-color based on prop.label', () => {
    const labels = ['meat', 'fish', 'poultry', 'vegetarian', 'pasta', 'soup', 'baking', 'dessert'];

    for (let i = 0; i < labels.length - 1; i += 1) {
      const currentElement = shallowMount(Tag, {
        props: {
          label: labels[i],
        },
      });

      const nextElement = shallowMount(Tag, {
        props: {
          label: labels[i + 1],
        },
      });

      expect(currentElement.text()).to.include(labels[i]);

      expect(nextElement.text()).to.include(labels[i + 1]);

      // validate that it change label background
      expect(currentElement.attributes().style).to.not.equal(nextElement.attributes().style);

      // validate that the background color is the same with same label
      expect(currentElement.attributes().style).to.equal(
        shallowMount(Tag, {
          props: {
            label: labels[i],
          },
        }).attributes().style,
      );
    }
  });
});
