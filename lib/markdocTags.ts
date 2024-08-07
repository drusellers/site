import { RenderableTreeNode, Schema, Tag } from '@markdoc/markdoc'

export const chip: Schema = {
  render: 'span',
  children: [],
  selfClosing: true,
  transform: (node, options) => {
    // console.log('n', node, 'o', options)
    // console.log('color', node.attributes.color)
    return {
      $$mdtype: 'Tag',
      name: 'span',
      attributes: {
        style: `background:${node.attributes.color};width:1rem;height:1rem;display:inline-block;margin-bottom:-3px`,
      },
      children: [],
    }
  },
  attributes: {
    color: {
      type: String,
    },
  },
}

// inspired by: https://jacko.io/safety_and_soundness.html
// https://github.com/markdoc/markdoc/discussions/319
// https://gist.github.com/rpaul-stripe/eb70085c04738fbccf11a40cbe30b2f0
export const sidenote: Schema = {
  render: 'div',
  children: ['paragraph'],
  selfClosing: false,
  transform: (
    node,
    options
  ): RenderableTreeNode | RenderableTreeNode[] | null => {
    // console.log('n', node.children)
    // console.log('n', node, 'o', options)
    // console.log('color', node.attributes.color)

    /*

<label for="sidenote-safe_meanings" class="margin-toggle sidenote-number">
  ::after
</label>
<input type="checkbox" id="sidenote-safe_meanings" class="margin-toggle">
<span class="sidenote">
    <p>
    What we mean by "safe" depends on context, which is partly
    what this post is about. Sometimes we even talk about safety and soundness
    interchangeably, but here I want to emphasize the differences between them.
    </p>
</span>
*/

    // how can I better control TOP/BOTTOM padding
    return [
      new Tag('label', {
        class: 'sidenote-number',
        style: '',
      }),
      new Tag(
        'span',
        {
          class:
            'sidenote pl-4 text-sm 2xl:w-1/2 2xl:bg-stone-200 2xl:relative 2xl:italic 2xl:float-right 2xl:clear-right',
          style: 'margin-right: -61%;',
        },
        node.transformChildren(options)
      ),
    ]
  },
  attributes: {},
}

// https://markdoc.dev/docs/nodes
// https://github.com/markdoc/markdoc/blob/main/src/schema.ts#L52
export const fence: Schema = {
  render: 'pre',
  attributes: {
    content: { type: String, render: false, required: true },
    language: { type: String, render: 'data-language' },
    process: { type: Boolean, render: false, default: true },
  },
  transform(node, config) {
    const attributes = node.transformAttributes(config)
    const children = node.children.length
      ? node.transformChildren(config)
      : [node.attributes.content]

    attributes.style = 'background: #2B4459;'

    // not-prose prevents tailwind from styling
    return new Tag(
      'pre',
      {
        class: 'not-prose px-4 py-4 rounded-lg text-md mb-4',
        ...attributes,
      },
      [
        new Tag(
          'code',
          { class: 'language-' + attributes['data-language'] },
          children
        ),
      ]
    )
  },
}
