const fs = require('fs');

let layoutPath = 'app/layout.tsx';
let layout = fs.readFileSync(layoutPath, 'utf8');

if (!layout.includes('import Image from "next/image"')) {
    layout = layout.replace('import Link from "next/link";', 'import Link from "next/link";\nimport Image from "next/image";');
}



const newHeader = `{/* Top Brand Bar */}
        <header className="bg-[#F5F7F2] text-black">
          <div className="max-w-[1280px] mx-auto px-4 lg:px-8 flex justify-between items-center py-4">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/logo.png" alt="Paribesh Prahari Logo" width={40} height={40} className="w-10 h-10 object-contain" />
              <strong className="text-2xl font-sans tracking-tight">Paribesh Prahari</strong>
            </Link>
            <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider">
              <span className="hidden md:inline-block">EN | ଓଡ଼ିଆ</span>
              <button className="bg-black text-white px-4 py-1.5 rounded-sm hover:bg-gray-800 transition-colors">Subscribe</button>
            </div>
          </div>
        </header>`;

layout = layout.replace(oldHeader.replace(/\n\s+/g, (match) => match.replace(/\r/g, '')), newHeader);
// Using a simpler replace if whitespace doesn't match perfectly
const regex = /\{\/\* Top Black Bar \*\/\}(.*?)(?=\{\/\* Secondary Navigation Bar \*\/\})/gs;
layout = layout.replace(regex, newHeader + '\n\n        ');

fs.writeFileSync(layoutPath, layout, 'utf8');
console.log('Header updated');
