// const fs = require('fs');
// const path = require('path');

// const srcDir = path.join(__dirname, 'src');

// const replacements = [
//   { regex: /\[#e94560\]/g, replacement: "primary" },
//   { regex: /\[#d63d54\]/g, replacement: "primary-hover" },
//   { regex: /\[#fff0f3\]/g, replacement: "primary-light" },
//   { regex: /\[#ee445e\]/g, replacement: "primary-alt" },

//   { regex: /\[#1a1a2e\]/g, replacement: "app-text" },
//   { regex: /\[#f4f6fb\]/g, replacement: "app-bg" },

//   { regex: /\[#4361ee\]/g, replacement: "secondary" },
//   { regex: /\[#f0f4ff\]/g, replacement: "secondary-light" },
//   { regex: /\[#4f7cff\]/g, replacement: "secondary-alt" },

//   { regex: /\[#2ec4b6\]/g, replacement: "success" },
//   { regex: /\[#e6faf8\]/g, replacement: "success-light" },

//   { regex: /\[#f77f00\]/g, replacement: "warning" },
//   { regex: /\[#fff5e6\]/g, replacement: "warning-light" },

//   { regex: /\[#d4a000\]/g, replacement: "alert" },
//   { regex: /\[#fff8e6\]/g, replacement: "alert-light" },

//   // also find inline styles like color: "#e94560" -> color: "var(--color-primary)" - wait, it's React so they are just strings. 
//   // Maybe it's better to just stick to Tailwind classes. For inline like color: "#e94560" we should change to something else? 
//   // Let's replace inline colors too if they exist.
//   { regex: /"#e94560"/g, replacement: '"var(--tw-color-primary, #e94560)"' }, // but wait, we can just replace text-[#e94560] etc.
// ];

// const walkSync = (dir, filelist = []) => {
//   fs.readdirSync(dir).forEach(file => {
//     const dirFile = path.join(dir, file);
//     if (fs.statSync(dirFile).isDirectory()) {
//       filelist = walkSync(dirFile, filelist);
//     } else {
//       if (
//         dirFile.endsWith('.tsx') || 
//         dirFile.endsWith('.ts') || 
//         dirFile.endsWith('.jsx') || 
//         dirFile.endsWith('.js')
//       ) {
//         filelist.push(dirFile);
//       }
//     }
//   });
//   return filelist;
// };

// const files = walkSync(srcDir);

// let changedFilesCount = 0;

// files.forEach(file => {
//   let content = fs.readFileSync(file, 'utf8');
//   let newContent = content;

//   replacements.forEach(({ regex, replacement }) => {
//     newContent = newContent.replace(regex, replacement);
//   });

//   // Custom fix for inline styles in TenantDetailsPage
//   newContent = newContent.replace(/color:\s*"#e94560"/g, 'color: "#e94560" /* Please use tailwind classes if possible or map to tailwind config */');
//   newContent = newContent.replace(/color:\s*"#4361ee"/g, 'color: "#4361ee"');

//   if (content !== newContent) {
//     fs.writeFileSync(file, newContent, 'utf8');
//     changedFilesCount++;
//     console.log(`Updated ${file.replace(srcDir, '')}`);
//   }
// });

// console.log(`Updated ${changedFilesCount} files.`);


const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

// 🔥 All color replacements in ONE place
const replacements = [
  // Primary
  { regex: /\[#e94560\]/g, replacement: "primary" },
  { regex: /\[#d63d54\]/g, replacement: "primary-hover" },
  { regex: /\[#c73652\]/g, replacement: "primary-dark" },
  { regex: /\[#fff0f3\]/g, replacement: "primary-light" },
  { regex: /\[#fff5f6\]/g, replacement: "primary-light" },
  { regex: /\[#ee445e\]/g, replacement: "primary-alt" },
  { regex: /\[#ffccd5\]/g, replacement: "primary-border" },

  // App
  { regex: /\[#1a1a2e\]/g, replacement: "app-text" },
  { regex: /\[#f4f6fb\]/g, replacement: "app-bg" },

  // Brand
  { regex: /\[#0f3460\]/g, replacement: "brand-light" },

  // Secondary
  { regex: /\[#4361ee\]/g, replacement: "secondary" },
  { regex: /\[#4f7cff\]/g, replacement: "secondary-alt" },
  { regex: /\[#f0f4ff\]/g, replacement: "secondary-light" },

  // Success
  { regex: /\[#2ec4b6\]/g, replacement: "success" },
  { regex: /\[#e6faf8\]/g, replacement: "success-light" },

  // Warning
  { regex: /\[#f77f00\]/g, replacement: "warning" },
  { regex: /\[#fff5e6\]/g, replacement: "warning-light" },

  // Alert
  { regex: /\[#d4a000\]/g, replacement: "alert" },
  { regex: /\[#fff8e6\]/g, replacement: "alert-light" },

  // Gradient
  {
    regex: /linear-gradient\(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%\)/g,
    replacement:
      "linear-gradient(135deg, var(--tw-color-brand-dark) 0%, var(--tw-color-brand-medium) 50%, var(--tw-color-brand-light) 100%)",
  },

  // Inline styles (React)
  { regex: /"#e94560"/g, replacement: '"var(--tw-color-primary, #e94560)"' },
  { regex: /"#4361ee"/g, replacement: '"var(--tw-color-secondary, #4361ee)"' },
];

// 📁 Read all files recursively
const walkSync = (dir, files = []) => {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);

    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'assets') {
        walkSync(fullPath, files);
      }
    } else if (/\.(js|ts|jsx|tsx)$/.test(fullPath)) {
      files.push(fullPath);
    }
  });

  return files;
};

const files = walkSync(srcDir);

let changedFilesCount = 0;

// 🔁 Replace content
files.forEach(file => {
  const original = fs.readFileSync(file, 'utf8');
  let updated = original;

  replacements.forEach(({ regex, replacement }) => {
    updated = updated.replace(regex, replacement);
  });

  if (original !== updated) {
    fs.writeFileSync(file, updated, 'utf8');
    changedFilesCount++;
    console.log(`Updated: ${file.replace(srcDir, '')}`);
  }
});

console.log(`✅ Done! Updated ${changedFilesCount} files.`);