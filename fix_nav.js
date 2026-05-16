const fs = require('fs');

let layoutPath = 'app/layout.tsx';
let layout = fs.readFileSync(layoutPath, 'utf8');

const oldNav = `{/* Secondary Navigation Bar */}
        <div className="bg-white border-b border-zinc-300 sticky top-0 z-20">
          <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-3 flex items-center justify-between overflow-x-auto">
            <nav className="flex items-center gap-6 text-sm font-semibold whitespace-nowrap">
              <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
              <Link href="/about" className="hover:text-red-600 transition-colors">About Us</Link>
              <Link href="/editorial" className="hover:text-red-600 transition-colors">Editorial</Link>
              <Link href="/in-the-news" className="hover:text-red-600 transition-colors">In the News</Link>
              <Link href="/contact" className="hover:text-red-600 transition-colors">Contact</Link>
            </nav>
            <div className="hidden md:block text-xs font-medium text-zinc-500">
              Odisha Edition
            </div>
          </div>
        </div>`;

const newNav = `{/* Secondary Navigation Bar */}
        <div className="bg-[#124e27] text-white sticky top-0 z-20 shadow-sm">
          <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-3 flex items-center justify-between overflow-x-auto">
            <nav className="flex items-center gap-6 text-sm font-semibold whitespace-nowrap">
              <Link href="/" className="hover:text-green-200 transition-colors">Home</Link>
              <Link href="/about" className="hover:text-green-200 transition-colors">About Us</Link>
              <Link href="/editorial" className="hover:text-green-200 transition-colors">Editorial</Link>
              <Link href="/in-the-news" className="hover:text-green-200 transition-colors">In the News</Link>
              <Link href="/contact" className="hover:text-green-200 transition-colors">Contact</Link>
            </nav>
            <div className="hidden md:block text-xs font-medium text-green-100 opacity-80">
              Odisha Edition
            </div>
          </div>
        </div>`;

layout = layout.replace(oldNav.replace(/\n\s+/g, (match) => match.replace(/\r/g, '')), newNav);

// Use a regex fallback just in case
const regex = /\{\/\* Secondary Navigation Bar \*\/\}(.*?)(?=\{\/\* Secondary Navigation Bar End \*\*\/|<main)/gs;
layout = layout.replace(/\{\/\* Secondary Navigation Bar \*\/\}[\s\S]*?(?=\s*<main)/g, newNav);

fs.writeFileSync(layoutPath, layout, 'utf8');
console.log('Navigation updated');
