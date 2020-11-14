import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import { parseISO } from 'date-fns'
import { id } from 'date-fns/locale'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    const year = parseISO(matterResult.data.date).getFullYear();

    // Combine the data with the id
    return {
      id,
      year: year,
      ...matterResult.data
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllTags() {
  return getSortedPostsData()
    .flatMap(p => p.tags)
    .filter(t => t != null)
    .sort()
    .reduce((a, t)=>{
      if(a[t] === undefined) {
        a[t] = 0;
      }
      a[t] += 1;
      return a;
    }, {});
}

export function getAllTagIds(){
  const allTags =  getSortedPostsData()
    .flatMap(p => p.tags)
    .filter(t => t != null)
    .map(t => t.toLowerCase());

  const uniqueTags = new Set(allTags);

  return [...uniqueTags].map(t => ({ params: { id: t }}))
}

export function getTagData(tag){
  const postsByTag =  getSortedPostsData()
    .filter(p => (p.tags || []).includes(tag));

  return {
    id: tag,
    posts: postsByTag,
  }
}

export function getAllPostIds() {
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
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)
  const wordCount = wordyCount(matterResult.content);
  const readingTime = Math.round(wordCount / 200);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    wordCount,
    readingTime,
    ...matterResult.data
  }
}

function wordyCount(content) {
  return content.trim().split(/\s+/).length;
}
