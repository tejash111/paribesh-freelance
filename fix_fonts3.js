const fs = require('fs');

let layoutPath = 'app/layout.tsx';
let layout = fs.readFileSync(layoutPath, 'utf8');

// Use inter.className
layout = layout.replace(/className=\{`font-inter antialiased`\}/g, "className={`${inter.className} antialiased`}");
layout = layout.replace(/<body className="min-h-screen flex flex-col bg-\[#fcfcfc\] text-zinc-900 font-sans">/g, '<body className={`${inter.className} min-h-screen flex flex-col bg-[#fcfcfc] text-zinc-900`}>');

fs.writeFileSync(layoutPath, layout, 'utf8');

// I will also recursively replace font-serif with font-sans everywhere
const glob = require('glob');

glob('app/**/*.tsx', (err, files) => {
    files.forEach(file => {
        let content = fs.readFileSync(file, 'utf8');
        content = content.replace(/font-serif/g, 'font-sans');
        fs.writeFileSync(file, content, 'utf8');
    });
    console.log("Fixed layout and replaced font-serif with font-sans everywhere.");
});
