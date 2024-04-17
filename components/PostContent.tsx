'use client'

import { useEffect } from "react";
import { PostData } from '@/lib/posts'
import 'highlight.js/styles/github.css';
import hljs from 'highlight.js/lib/core';
import csharp from 'highlight.js/lib/languages/csharp';
import diff from 'highlight.js/lib/languages/diff';
hljs.registerLanguage('csharp', csharp);
hljs.registerLanguage('diff', diff);

type Props = {
    postData: PostData
}

export default function PostContent({postData}: Props) {
    useEffect(() => {
        hljs.highlightAll();
    }, []);

    return <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
    />
}
