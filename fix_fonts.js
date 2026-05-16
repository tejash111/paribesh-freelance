const fs = require('fs');

// 1. Layout.tsx
let layoutPath = 'app/layout.tsx';
let layout = fs.readFileSync(layoutPath, 'utf8');

// Replace Geist with Inter
layout = layout.replace(/import \{ Geist, Geist_Mono \} from "next\/font\/google";/g, 'import { Inter } from "next/font/google";');
layout = layout.replace(/const geistSans = Geist\(\{\n  variable: "--font-geist-sans",\n  subsets: \["latin"\],\n\}\);/g, 'const inter = Inter({\n  variable: "--font-inter",\n  subsets: ["latin"],\n});');
// Remove geistMono 
layout = layout.replace(/const geistMono = Geist_Mono\(\{\n  variable: "--font-geist-mono",\n  subsets: \["latin"\],\n\}\);/g, '');
layout = layout.replace(/className=\{`\$\{geistSans\.variable\} \$\{geistMono\.variable\} antialiased`\}/g, 'className={`font-inter antialiased`}');

fs.writeFileSync(layoutPath, layout, 'utf8');

// 2. globals.css
let globalsPath = 'app/globals.css';
let globals = fs.readFileSync(globalsPath, 'utf8');

let fontReplace = `--font-sans: var(--font-sans);
  --font-mono: var(--font-geist-mono);
  --font-heading: var(--font-sans);
  --font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;`;

let newFontReplace = `--font-sans: "Inter", sans-serif;
  --font-mono: ui-monospace, sans-serif;
  --font-heading: "Inter", sans-serif;
  --font-serif: "Inter", sans-serif;`;

globals = globals.replace(fontReplace, newFontReplace);
if (!globals.includes('@import url("https://fonts.googleapis.com/css2?family=')) {
    globals = `@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');\n` + globals;
}

fs.writeFileSync(globalsPath, globals, 'utf8');

console.log("Fonts updated to Inter");
