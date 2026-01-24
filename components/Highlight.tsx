"use client";

import hljs from "highlight.js/lib/core";
import csharp from "highlight.js/lib/languages/csharp";
import diff from "highlight.js/lib/languages/diff";
import text from "highlight.js/lib/languages/plaintext";
import shell from "highlight.js/lib/languages/shell";
import sql from "highlight.js/lib/languages/sql";
import ts from "highlight.js/lib/languages/typescript";
import { useEffect } from "react";

hljs.registerLanguage("csharp", csharp);
hljs.registerLanguage("diff", diff);
hljs.registerLanguage("typescript", ts);
hljs.registerLanguage("sql", sql);
hljs.registerLanguage("text", text);
hljs.registerLanguage("sh", shell);

export default function Highlight() {
	useEffect(() => {
		hljs.highlightAll();
	}, []);

	return <></>;
}
