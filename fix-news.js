const fs = require('fs');
let code = fs.readFileSync('app/in-the-news/page.tsx', 'utf-8');

code = code.replace(
  /import { newsArticles, newsPageCopy } from "@\/lib\/news-data";/,
  `import { newsArticles, newsPageCopy } from "@/lib/news-data";\nimport { useEffect, useState } from "react";`
);

code = code.replace(
  /const items = newsArticles\[language\];\n/,
  `const items = newsArticles[language];\n  const [posts, setPosts] = useState<any[]>([]);\n  useEffect(() => {\n    fetch('/api/posts?type=NEWS&limit=20').then(res => res.json()).then(data => setPosts(data.posts || []));\n  }, []);\n\n  const displayItems = posts.length > 0 ? posts : items;`
);

code = code.replace(
  /\{items\.map\(\(item, idx\) => \(/,
  `{displayItems.map((item: any, idx) => (\n            <div key={item._id || idx} className="flex flex-col md:flex-row gap-6 md:gap-12 py-8 border-b border-zinc-200 group">`
);

code = code.replace(
  /<div key=\{idx\} className="flex flex-col md:flex-row gap-6 md:gap-12 py-8 border-b border-zinc-200 group">/,
  ``
);

code = code.replace(
  /\{item\.readTime\} \{copy\.readSuffix\}/,
  `{item._id ? '5' : item.readTime} {copy.readSuffix}`
);
code = code.replace(
  /\{copy\.via\} \{item\.source\}/,
  `{copy.via} {item._id ? item.sourceName : item.source}`
);
code = code.replace(
  /\{item\.date\}/,
  `{item._id ? new Date(item.publishedAt).toLocaleDateString() : item.date}`
);
code = code.replace(
  /\{item\.summary\}/,
  `{item._id ? item.body : item.summary}`
);

fs.writeFileSync('app/in-the-news/page.tsx', code);
