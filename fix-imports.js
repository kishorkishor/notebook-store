/**
 * This script fixes import paths in the project
 */
const fs = require('fs');
const path = require('path');

function log(message) {
  console.log(`\x1b[36m${message}\x1b[0m`);
}

// Files to fix
const filesToFix = [
  'app/checkout/page.tsx',
  'app/cart/page.tsx',
  'components/products/product-card.tsx',
  'app/product/[id]/page.tsx',
  'components/layout/Header.tsx',
];

// Root directory
const rootDir = __dirname;

// Fix imports in files
for (const file of filesToFix) {
  const filePath = path.join(rootDir, file);
  
  if (fs.existsSync(filePath)) {
    log(`Fixing imports in ${file}...`);
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Replace incorrect import paths
    content = content.replace(
      /from ['"]@\/store\/cart-store['"]/g, 
      'from "@/lib/store/cart-store"'
    );
    
    fs.writeFileSync(filePath, content);
    log(`✅ Fixed ${file}`);
  } else {
    log(`⚠️ File not found: ${file}`);
  }
}

// Check if duplicate store exists and delete it
const duplicateStorePath = path.join(rootDir, 'store/cart-store.ts');
if (fs.existsSync(duplicateStorePath)) {
  try {
    fs.unlinkSync(duplicateStorePath);
    log('✅ Removed duplicate cart store');
  } catch (error) {
    log(`⚠️ Error removing duplicate file: ${error.message}`);
  }
}

log('\n🎉 All imports fixed! You can now run:');
log('   npm run dev');
