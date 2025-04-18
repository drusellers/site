import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { parseISO } from 'date-fns'

const postsDirectory = path.join(process.cwd(), 'content', 'appearances')

export interface Appearance {
  title: string
  id: string
  date: string
  year: number
  url: string
  mentionOnly?: boolean
}

export function getSortedAppearancesData(): Appearance[] {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    const year = parseISO(matterResult.data.date).getFullYear()

    // Combine the data with the id
    return {
      id,
      year: year,
      ...matterResult.data,
    } as Appearance
  })

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    const aa = parseISO(a.date)
    const bb = parseISO(b.date)

    if (aa < bb) {
      return 1
    } else {
      return -1
    }
  })
}
