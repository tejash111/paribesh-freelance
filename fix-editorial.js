const fs = require('fs');
let code = fs.readFileSync('app/editorial/page.tsx', 'utf-8');

code = code.replace(
  /export default function EditorialListingPage\(\) {/,
  `import { useEffect, useState } from "react";\n\nexport default function EditorialListingPage() {\n  const [posts, setPosts] = useState<any[]>([]);\n  useEffect(() => {\n    fetch('/api/posts?type=EDITORIAL&limit=20').then(res => res.json()).then(data => setPosts(data.posts || []));\n  }, []);`
);

code = code.replace(
  /{\[1, 2, 3, 4, 5, 6\]\.map\(\(item\) => \([\s\S]*?\}\)\)}/g,
  `{(posts.length > 0 ? posts : [1, 2, 3, 4, 5, 6]).map((item: any, idx: number) => {
            const isDynamic = !!item._id;
            return (
            <div key={isDynamic ? item._id : item} className="flex flex-col group cursor-pointer">
              <Link href={\`/editorial/\${isDynamic ? item.slug : 'post-' + item}\`} className="flex flex-col h-full">
                <div className="aspect-[4/3] w-full bg-zinc-100 flex items-center justify-center mb-4 overflow-hidden relative">
                  {isDynamic && item.coverImage ? <img src={item.coverImage} className="w-full h-full object-cover" /> : <span className="font-semibold text-zinc-400 uppercase text-xs">Cover Image {isDynamic ? '' : item}</span>}
                </div>
                <div className="flex flex-col flex-1">
                  <span className="text-zinc-500 font-semibold text-xs tracking-wider uppercase mb-1 block">{copy.cardLabel}</span>
                  <h4 className="font-bold text-lg leading-tight mb-2 group-hover:text-[#124e27] transition-colors">{isDynamic ? item.title : copy.cardTitle}</h4>
                  <p className="font-sans text-sm text-zinc-600 line-clamp-3 mb-4">{isDynamic ? item.body : copy.cardSummary}</p>
                  <div className="mt-auto pt-4 border-t border-zinc-100 font-semibold text-xs text-zinc-500 flex justify-between uppercase">
                    <span>{isDynamic && item.author ? item.author : 'Admin'}</span>
                    <span>{isDynamic ? new Date(item.publishedAt).toLocaleDateString() : '14 Sep 2026'}</span>
                  </div>
                </div>
              </Link>
            </div>
            )
          })}`
);

fs.writeFileSync('app/editorial/page.tsx', code);
