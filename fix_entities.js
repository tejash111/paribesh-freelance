const fs = require('fs');

const fixFile = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  // Simple escapes
  content = content.replace(/Odisha's/g, "Odisha&apos;s");
  content = content.replace(/We'd/g, "We&apos;d");
  content = content.replace(/"This is not simply about moving an animal from Point A to Point B. It is an ecological rescue mission to ensure the survival of the species in Eastern India."/g, "&quot;This is not simply about moving an animal from Point A to Point B. It is an ecological rescue mission to ensure the survival of the species in Eastern India.&quot;");
  fs.writeFileSync(filePath, content, 'utf8');
};

fixFile('app/about/page.tsx');
fixFile('app/contact/page.tsx');
fixFile('app/editorial/[slug]/page.tsx');
fixFile('app/page.tsx');
