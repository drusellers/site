import fs from 'fs'
import path from 'path'
import YAML from 'yaml'

const dataDirectory = path.join(process.cwd(), 'src', 'data')

export function getResumeData() {
  let fullPath = path.join(dataDirectory, 'resume.yml')
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  let data = YAML.parse(fileContents)

  return data
}

export function getAllegoryData() {
  let fullPath = path.join(dataDirectory, 'allegory.yml')
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  let data = YAML.parse(fileContents)

  return data
}
