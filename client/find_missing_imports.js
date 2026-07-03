const fs = require('fs');
const path = require('path');

function walk(dir) {
  const results = [];
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) results.push(...walk(full));
    else if (item.endsWith('.js') || item.endsWith('.jsx')) results.push(full);
  }
  return results;
}

// Extract all JSX component names used in a file (<ComponentName) 
// that aren't imported and aren't HTML tags or next/react built-ins
const KNOWN_BUILTINS = new Set([
  'Fragment', 'Suspense', 'React', 'StrictMode',
  // HTML
  'div', 'span', 'p', 'a', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'header', 'footer', 'main', 'nav', 'section', 'article', 'aside', 'figure',
  'form', 'input', 'button', 'select', 'option', 'textarea', 'label',
  'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'img', 'picture', 'source', 'video', 'audio',
  'script', 'link', 'meta', 'head', 'body', 'html',
  'pre', 'code', 'blockquote', 'strong', 'em', 'br', 'hr',
  'svg', 'path', 'circle', 'rect', 'line', 'g', 'defs', 'use',
]);

const files = walk('src');
let hasErrors = false;

for (const f of files) {
  const c = fs.readFileSync(f, 'utf8');
  
  // Find all JSX usages: <ComponentName (uppercase first letter)
  const usedComponents = new Set();
  const jsxRe = /<([A-Z][A-Za-z0-9.]*)/g;
  let m;
  while ((m = jsxRe.exec(c)) !== null) {
    // Get just the component name (before any .)
    usedComponents.add(m[1].split('.')[0]);
  }
  
  for (const comp of usedComponents) {
    if (KNOWN_BUILTINS.has(comp)) continue;
    // Check if it's imported or defined in this file
    const importedOrDefined = 
      c.includes(`import ${comp}`) ||
      c.includes(`import { ${comp}`) ||
      c.includes(`, ${comp}`) ||
      c.includes(`${comp},`) ||
      c.includes(`const ${comp}`) ||
      c.includes(`function ${comp}`) ||
      c.includes(`class ${comp}`);
    
    if (!importedOrDefined) {
      console.log(`MISSING: ${comp} in ${f}`);
      hasErrors = true;
    }
  }
}

if (!hasErrors) console.log('All component imports OK!');
