const fs = require('fs');
let code = fs.readFileSync('app/in-the-news/page.tsx', 'utf-8');

code = code.replace(
  /<Link href=\{\`\/in-the-news\/\$\{item\.slug\}\`\} className="block max-w-2xl">/,
  `<a href={item._id ? item.sourceUrl : '#'} target="_blank" rel="noreferrer" className="block max-w-2xl">`
);
code = code.replace(
  /<\/Link>/,
  `</a>`
);
fs.writeFileSync('app/in-the-news/page.tsx', code);
