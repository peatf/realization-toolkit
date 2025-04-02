const fs = require('fs');
const path = require('path');

// Directory to scan and fix
const componentsDir = path.join(__dirname, '../components');

// Font replacements
const replacements = [
  // Replace explicit serif fonts with sans
  {
    pattern: /font-serif/g,
    replacement: 'font-sans'
  },
  // Replace explicit font family references
  {
    pattern: /fontFamily:[\s]*['"]Georgia['"],?/g,
    replacement: 'fontFamily: "var(--font-sans)",'
  },
  {
    pattern: /fontFamily:[\s]*['"]Times New Roman['"],?/g,
    replacement: 'fontFamily: "var(--font-sans)",'
  },
  // Replace inline styles
  {
    pattern: /style=\{[\s\S]*?font-family:[\s]*['"]serif['"][\s\S]*?\}/g,
    replacement: (match) => match.replace(/font-family:[\s]*['"]serif['"]/, 'font-family: "var(--font-sans)"')
  }
];

function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    replacements.forEach(({ pattern, replacement }) => {
      const newContent = content.replace(pattern, replacement);
      if (newContent !== content) {
        content = newContent;
        modified = true;
      }
    });
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated fonts in: ${filePath}`);
    }
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err);
  }
}

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isDirectory()) {
      scanDir(filePath);
    } else if (stats.isFile() && (file.endsWith('.tsx') || file.endsWith('.jsx'))) {
      processFile(filePath);
    }
  });
}

console.log('🔍 Starting font replacement...');
scanDir(componentsDir);
console.log('✅ Font replacement complete!');