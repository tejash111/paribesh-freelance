const fs = require('fs');

let layoutPath = 'app/layout.tsx';
let layout = fs.readFileSync(layoutPath, 'utf8');

// Find the subscribe button
const oldBtn = 'className="bg-black text-white px-4 py-1.5 rounded-sm hover:bg-gray-800 transition-colors">Subscribe</button>';
const newBtn = 'className="bg-[#c10008] text-white px-4 py-1.5 rounded-sm hover:bg-red-800 transition-colors">Subscribe</button>';

layout = layout.replace(oldBtn, newBtn);

fs.writeFileSync(layoutPath, layout, 'utf8');
console.log('Button updated');
