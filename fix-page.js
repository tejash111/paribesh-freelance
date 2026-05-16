const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf-8');

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
