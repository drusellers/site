import fs from 'fs'
import path from 'path'

const contentDirectory = path.join(process.cwd(), 'content')

export type VideoProps = {
  youtube?: string
  loom?: string
}

export function getFiles(dir: string): string[] {
  const fileNames = fs.readdirSync(path.join(contentDirectory, dir))
  return fileNames.filter(n => !n.startsWith('_'));
}

export function getFile(file: string): string {
  let fullPath = path.join(contentDirectory, file)
  return fs.readFileSync(fullPath, 'utf8')
}
