const fs = require('fs');
const path = require('path');

function log(message) {
  console.log(`\x1b[36m${message}\x1b[0m`);
}

// Source images
const sourceImages = [
  'aaron-burden-AXqMy8MSSdk-unsplash.jpg',
  'aaron-burden-xG8IQMqMITM-unsplash.jpg',
  'alireza-zarafshani-yhwzIx1YxqU-unsplash.jpg',
  'annie-spratt-XkSrMoHhJ30-unsplash.jpg',
  'eugene-chystiakov-wcMysLw5ROM-unsplash.jpg',
  'glenn-carstens-peters-ZWD3Dx6aUJg-unsplash.jpg',
  'ian-schneider-8COAUK8ckv8-unsplash.jpg',
  'jeff-james-wgm_RD92nhE-unsplash.jpg',
  'kelly-sikkema-iiaUVel-cJE-unsplash.jpg',
  'pavel-polivka-7lS8ChNKsFs-unsplash.jpg'
];

// Product image mappings
const productImages = {
  'ruled-notebook': ['aaron-burden-AXqMy8MSSdk-unsplash.jpg', 'aaron-burden-xG8IQMqMITM-unsplash.jpg'],
  'dot-grid': ['kelly-sikkema-iiaUVel-cJE-unsplash.jpg', 'glenn-carstens-peters-ZWD3Dx6aUJg-unsplash.jpg'],
  'sketchbook': ['annie-spratt-XkSrMoHhJ30-unsplash.jpg', 'eugene-chystiakov-wcMysLw5ROM-unsplash.jpg'],
  'planner': ['jeff-james-wgm_RD92nhE-unsplash.jpg', 'ian-schneider-8COAUK8ckv8-unsplash.jpg'],
  'leather': ['alireza-zarafshani-yhwzIx1YxqU-unsplash.jpg', 'pavel-polivka-7lS8ChNKsFs-unsplash.jpg']
};

// Root directory
const rootDir = __dirname;
const sourceDir = path.join(rootDir, 'public', 'images');
const productsDir = path.join(sourceDir, 'products');

// Ensure products directory exists
if (!fs.existsSync(productsDir)) {
  fs.mkdirSync(productsDir, { recursive: true });
}

// Copy images to products directory with new names
Object.entries(productImages).forEach(([prefix, images], index) => {
  images.forEach((image, i) => {
    const sourcePath = path.join(sourceDir, image);
    const targetPath = path.join(productsDir, `${prefix}-${i + 1}.jpg`);
    
    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, targetPath);
      log(`✅ Copied ${image} to ${path.relative(rootDir, targetPath)}`);
    } else {
      log(`⚠️ Source image not found: ${image}`);
    }
  });
});

log('\n🎉 Product images setup complete!');