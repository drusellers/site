import fs from 'fs'
import path from 'path'
import { getFile } from '@/lib/cms'
import { toMarkdown } from '@/lib/md'

const postsDirectory = path.join(process.cwd(), 'content', 'values')

type Value = {
  id: string
  title: string
  html: string
  preview: string
}

export function getValues(): Value[] {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fileContents = getFile(`values/${fileName}`)
    const md = toMarkdown(fileContents)

    // Combine the data with the id
    return {
      id,
      html: md.html,
      title: md.frontMatter.title,
      preview: md.frontMatter.preview,
    } as Value
  })
}

export function getAllValuesIds() {
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

export async function getValueData(id: string): Promise<Value> {
  const fileContents = getFile(`values/${id}.md`)
  const md = toMarkdown(fileContents)

  // Combine the data with the id and contentHtml
  return {
    id,
    title: md.frontMatter.title,
    html: md.html,
    preview: md.frontMatter.preview,
  } as Value
}
