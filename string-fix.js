const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf-8');

// A crude way to fix broken strings:
// Find any line ending with a letter, comma, or space but inside a string construct or simple wrapped line.
// Actually, it's easier to just strip the \n if the next line does not look like standard code (i.e. starts with lower case letter and has no indentation usually, or just remove all \n between quotes).

let inString = false;
let res = "";
for (let i = 0; i < code.length; i++) {
  let char = code[i];
  if (char === '"' && code[i-1] !== '\\') {
    inString = !inString;
  }
  
  if (inString && char === '\n') {
    // skip the newline
  } else {
    res += char;
  }
}

// But it's also wrapping javascript code:
// e.g., setActiveHeroIndex((currentIndex) => (currentIndex + 1) % localizedHeroStori
// es.length);
// This is not inside a string!

fs.writeFileSync('app/page.tsx.strings_fixed', res);
