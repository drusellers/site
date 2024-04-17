import fs from 'fs'
import path from 'path'
import { parseISO } from 'date-fns'
import Markdoc from '@markdoc/markdoc'
import { parse } from 'yaml'
import { chip, sidenote, fence } from '@/lib/markdocTags'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export type VideoProps = {
  youtube?: string
  loom?: string
}

export type PostHeader = {
  id: string
  year: number
  draft: boolean
  date: string
  tags: string[]
  video?: VideoProps
  title: string
  description: string
}

export function getSortedPostsData(): PostHeader[] {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const ast = Markdoc.parse(fileContents)

    const config = {}
    const errors = Markdoc.validate(ast, config)

    if (errors.length > 0) {
      console.log('a', fileName, errors)
    }

    const content = Markdoc.transform(ast, config)

    const frontMatter = ast.attributes.frontmatter
      ? parse(ast.attributes.frontmatter)
      : {}

    const year = parseISO(frontMatter.date).getFullYear()

    // Combine the data with the id
    return {
      id,
      year: year,
      ...frontMatter,
    } as PostHeader
  })

  const nonDrafts = allPostsData.filter((d) => !d.draft)

  // Sort posts by date
  return nonDrafts.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllTags(): { [tag: string]: number } {
  return getSortedPostsData()
    .flatMap((p) => p.tags)
    .filter((t) => t != null)
    .sort()
    .reduce((a, t) => {
      if (a[t] === undefined) {
        a[t] = 0
      }
      a[t] += 1
      return a
    }, {})
}

export function getAllTagIds() {
  const allTags = getSortedPostsData()
    .flatMap((p) => p.tags)
    .filter((t) => t != null)
    .map((t) => t.toLowerCase())

  const uniqueTags = new Set(allTags)

  return [...uniqueTags].map((t) => ({ params: { id: t } }))
}

export function getTagData(tag) {
  const postsByTag = getSortedPostsData().filter((p) =>
    (p.tags || []).includes(tag)
  )

  return {
    id: tag,
    posts: postsByTag,
  }
}

export function getAllPostIds(): { params: { id: string } }[] {
  const fileNames = fs.readdirSync(postsDirectory)

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    }
  })
}

export type PostData = {
  id: string
  _id: string
  contentHtml: string
  contentPlain: string
  wordCount: number
  readingTime: number
  video?: VideoProps
  date: string
  title: string
  subtitle: string
  tags: string[]
}

export async function getPostData(id): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const ast = Markdoc.parse(fileContents)

  const config = {
    tags: {
      chip,
      sidenote,
    },
    nodes: {
      fence
    }
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

  const wordCount = wordyCount(fileContents)
  const readingTime = Math.round(wordCount / 200)

  const contentHtml = html
  const contentPlain = fileContents

  // Combine the data with the id and contentHtml
  return {
    id,
    _id: id,
    contentHtml,
    contentPlain,
    wordCount,
    readingTime,
    title: frontMatter.title,
    date: frontMatter.date,
    video: frontMatter.video || null,
    subtitle: frontMatter.subtitle,
    tags: frontMatter.tags,
  }
}

function wordyCount(content: string): number {
  return content.trim().split(/\s+/).length
}
