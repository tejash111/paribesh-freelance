const fs = require('fs');

const fixFile = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/Don't Miss/g, "Don&apos;t Miss");
  content = content.replace(/Editor's Desk/g, "Editor&apos;s Desk");
  fs.writeFileSync(filePath, content, 'utf8');
};

fixFile('app/editorial/page.tsx');
fixFile('app/contact/page.tsx');
