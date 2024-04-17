import Markdoc from '@markdoc/markdoc'

export function toMarkdown(input: string): string {
  const ast = Markdoc.parse(input)
  const config = {}
  const errors = Markdoc.validate(ast, config)
  if (errors.length > 0) {
    throw new Error('Error Parsing Markdoc')
  }

  const content = Markdoc.transform(ast, config)

  const html = Markdoc.renderers.html(content)

  return html
}

export function toNakedMarkdown(input: string): string {
  const ast = Markdoc.parse(input)
  const config = {}
  const errors = Markdoc.validate(ast, config)
  if (errors.length > 0) {
    throw new Error('Error Parsing Markdoc')
  }

  const content = Markdoc.transform(ast, config)

  const html = Markdoc.renderers.html(content)

  return html
}
