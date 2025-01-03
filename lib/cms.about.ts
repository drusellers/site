import { getFile, VideoProps } from '@/lib/cms'
import { toMarkdown } from '@/lib/md'

type AboutProps = {
  title?: string
  preview?: string
  html: string
  video?: VideoProps
  img: string
  sideBar: string
}

export function getAbout(): AboutProps {
  const fileContents = getFile('about.md')

  // CUSTOM to this content
  const now = new Date()
  const start = new Date('1997-08-01')

  const md = toMarkdown(fileContents, {
    // variables need to be strings?
    years: now.getFullYear() - start.getFullYear(),
  })

  const sidebar = toMarkdown(md.frontMatter.sideBar)

  return {
    title: md.frontMatter.title || null,
    preview: md.frontMatter.preview || null,
    img: md.frontMatter.img || null,
    html: md.html,
    video: {},
    sideBar: sidebar.html,
  }
}
