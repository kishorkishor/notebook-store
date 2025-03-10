/**
 * Setup script for the Modern Notebook Store
 * This helps initialize the project by setting up environment variables and database
 */
const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// Function to log steps
function log(message) {
  console.log(`\x1b[36m${message}\x1b[0m`);
}

// Function to create .env file if it doesn't exist
function setupEnv() {
  const envPath = path.join(__dirname, '.env');
  const exampleEnvPath = path.join(__dirname, '.env.example');
  
  if (!fs.existsSync(envPath)) {
    log('Creating .env file...');
    // Create .env file from example or with default values
    const envContent = fs.existsSync(exampleEnvPath) 
      ? fs.readFileSync(exampleEnvPath, 'utf-8')
      : `NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
DATABASE_URL="postgresql://postgres:password@localhost:5432/notebooks_ecommerce"`;
    
    fs.writeFileSync(envPath, envContent, 'utf-8');
    log('✅ .env file created successfully');
  } else {
    log('✅ .env file already exists');
  }
}

// Function to install dependencies
function installDeps() {
  log('Installing dependencies...');
  try {
    execSync('npm install', { stdio: 'inherit' });
    log('✅ Dependencies installed successfully');
  } catch (error) {
    console.error('❌ Failed to install dependencies:', error.message);
  }
}

// Main setup function
async function setup() {
  console.log('\n🚀 Setting up Modern Notebook Store...\n');
  
  setupEnv();
  installDeps();
  
  log('\n🎉 Setup completed! You can now run:');
  log('   npm run dev    - to start the development server');
  log('   npx prisma db push - to initialize the database schema\n');
}

setup();
