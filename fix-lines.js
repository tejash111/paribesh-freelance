const fs = require('fs');
const content = fs.readFileSync('/Users/tejash/Library/Application Support/Code/User/workspaceStorage/85b803e2d642e6881f9ff759241f937a/GitHub.copilot-chat/chat-session-resources/9b3599b3-81cc-48f5-a67c-9eaaa1d69fa5/call_MHxKS0ZYa0FVZmZZZ2FxSTVtZ04__vscode-1778862646271/content.txt', 'utf8');

let lines = content.split('\n');
let fixed = [];
let buffer = "";

for (let line of lines) {
  // Determine actual rendered length excluding \r
  let cleanLine = line.replace(/\r/g, '');
  
  if (cleanLine.length === 80) {
    buffer += cleanLine;
  } else {
    fixed.push(buffer + cleanLine);
    buffer = "";
  }
}

let code = fixed.join('\n');

// Now re-apply the dynamic hooks
code = code.replace(
  /export default function Home\(\) {/,
  `import { useEffect, useState } from "react";\n\nexport default function Home() {`
);

code = code.replace(
  /const \[activeHeroIndex, setActiveHeroIndex\] = useState\(0\);/,
  `const [activeHeroIndex, setActiveHeroIndex] = useState(0);\n  const [posts, setPosts] = useState<any[]>([]);\n\n  useEffect(() => {\n    fetch("/api/posts?limit=10").then(r => r.json()).then(d => setPosts(d.posts || []));\n  }, []);\n\n  const editorialPosts = posts.filter(p => p.type === "EDITORIAL").slice(0, 4);\n  const newsPosts = posts.filter(p => p.type === "NEWS").slice(0, 4);`
);

code = code.replace(
  /\{copy\.editorialStories\.map\(\(story, index\) => \([\s\S]*?\}\)\)}/g,
  `{(editorialPosts.length > 0 ? editorialPosts : copy.editorialStories.map((title) => ({ _id: title, title }))).map((post, index) => (
              <Link href={\`/editorial/\${post.slug || '#'}\`} key={post._id} className="group cursor-pointer">
                <div className="aspect-[4/3] bg-zinc-100 w-full mb-3 flex items-center justify-center overflow-hidden relative">
                  {post.coverImage ? <img src={post.coverImage} className="w-full h-full object-cover" /> : <span className="text-[10px] text-zinc-400 font-semibold uppercase">{copy.editorialCardLabel} {index + 1}</span>}
                </div>
                <h3 className="font-bold text-[15px] leading-tight group-hover:text-[#124e27] transition-colors">
                  {post.title}
                </h3>
              </Link>
            ))}`
);

code = code.replace(
  /\{copy\.newsStories\.map\(\(story, index\) => \([\s\S]*?\}\)\)}/g,
  `{(newsPosts.length > 0 ? newsPosts : copy.newsStories.map((title) => ({ _id: title, title }))).map((post, index) => (
              <a href={post.sourceUrl || '#'} target="_blank" rel="noreferrer" key={post._id} className="group cursor-pointer">
                <div className="aspect-[4/3] bg-zinc-100 w-full mb-3 flex items-center justify-center overflow-hidden relative">
                   {post.coverImage ? <img src={post.coverImage} className="w-full h-full object-cover" /> : <span className="text-[10px] text-zinc-400 font-semibold uppercase">{copy.newsCardLabel} {index + 1}</span>}
                </div>
                <h3 className="font-bold text-[15px] leading-tight group-hover:text-[#124e27] transition-colors">
                  {post.title}
                </h3>
              </a>
            ))}`
);

fs.writeFileSync('app/page.tsx', code);
