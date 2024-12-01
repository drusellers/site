import { evaluate } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'
import matter from 'gray-matter'
import { MDXModule } from "mdx/types";

export interface MdxContent {
  Content: MDXModule
  raw: string
  frontMatter: any
}

export async function toMarkdown(
    input: string,
    variables: any | undefined = {}
  ): Promise<MdxContent>
  {

    const post = matter(input)
    const html = await evaluate(post.content, runtime)


    return {
        Content: html,
        raw: input,
        frontMatter: post.data
    }
  }

