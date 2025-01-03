import fs from 'fs'
import path from 'path'
import YAML from 'yaml'

const dataDirectory = path.join(process.cwd(), 'data')

export function getResumeData() {
  const fullPath = path.join(dataDirectory, 'resume.yml')
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const data = YAML.parse(fileContents)

  return data
}

export function getAllegoryData() {
  const fullPath = path.join(dataDirectory, 'allegory.yml')
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const data = YAML.parse(fileContents)

  return data
}
