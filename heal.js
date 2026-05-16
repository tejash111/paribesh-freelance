const fs = require('fs');
let lines = fs.readFileSync('app/page.tsx', 'utf-8').split('\n');
let fixed = [];
for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  // if line is length 80 exactly, it might be wrapped.
  // Actually, let's just use string parsing or manually fix the known strings from the terminal output.
  if (line.length === 80) {
     fixed.push(line + lines[i+1]);
     i++;
  } else {
     fixed.push(line);
  }
}
fs.writeFileSync('app/page.tsx.fixed', fixed.join('\n'));
