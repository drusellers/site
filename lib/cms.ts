import fs from 'fs'
import path from 'path'
import Markdoc from '@markdoc/markdoc'
import { parse } from 'yaml'

const contentDirectory = path.join(process.cwd(), 'content')

type VideoProps = {
  youtube?: string
  loom?: string
}

type AboutProps = {
  title?: string
  preview?: string
  html: string
  video?: VideoProps
  img?: string
}

export function getAbout(): AboutProps {
  let fullPath = path.join(contentDirectory, 'about.md')
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const ast = Markdoc.parse(fileContents)

  // CUSTOM to this content
  let now = new Date()
  let start = new Date('1997-08-01')

  const chip = {
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

  const config = {
    tags: {
      chip,
    },
    variables: {
      // variables need to be strings?
      years: now.getFullYear() - start.getFullYear(),
    },
  }

  const errors = Markdoc.validate(ast, config)

  if (errors.length > 0) {
    console.log(errors)
  }

  const content = Markdoc.transform(ast, config)

  const frontMatter = ast.attributes.frontmatter
    ? parse(ast.attributes.frontmatter)
    : {}

  const html = Markdoc.renderers.html(content)

  return {
    title: frontMatter.title || null,
    preview: frontMatter.preview || null,
    img: frontMatter.img || null,
    html,
    video: {},
  }
}

export function getStack(): AboutProps {
  let fullPath = path.join(contentDirectory, 'stack.md')
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const ast = Markdoc.parse(fileContents)

  // CUSTOM to this content
  let now = new Date()
  let start = new Date('1997-08-01')

  const config = {
    variables: {
      // variables need to be strings?
      years: (now.getFullYear() - start.getFullYear()).toString(),
    },
  }

  const errors = Markdoc.validate(ast, config)

  if (errors.length > 0) {
    console.log(errors)
  }

  const content = Markdoc.transform(ast, config)

  const frontMatter = ast.attributes.frontmatter
    ? parse(ast.attributes.frontmatter)
    : {}

  const html = Markdoc.renderers.html(content)

  return {
    title: frontMatter.title || null,
    preview: frontMatter.preview || null,
    html,
    video: frontMatter.video ?? {},
  }
}
