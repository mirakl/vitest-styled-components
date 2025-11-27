#!/usr/bin/env node
/**
 * Verification script to check both CJS and ESM builds
 */

const fs = require('fs');
const path = require('path');

const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const RESET = '\x1b[0m';
const BLUE = '\x1b[36m';

function log(message, color = RESET) {
  console.log(`${color}${message}${RESET}`);
}

function checkFile(filePath) {
  return fs.existsSync(filePath);
}

function readFirstLines(filePath, lines = 5) {
  const content = fs.readFileSync(filePath, 'utf-8');
  return content.split('\n').slice(0, lines).join('\n');
}

console.log('\n' + '='.repeat(60));
log('Build Verification for vitest-styled-components', BLUE);
console.log('='.repeat(60) + '\n');

// Check if dist directory exists
if (!checkFile('./dist')) {
  log('❌ dist directory not found. Run: yarn build', RED);
  process.exit(1);
}

// Files to check
const filesToCheck = [
  { path: 'dist/cjs/index.js', type: 'CJS' },
  { path: 'dist/esm/index.js', type: 'ESM' },
  { path: 'dist/cjs/serializer/index.js', type: 'CJS' },
  { path: 'dist/esm/serializer/index.js', type: 'ESM' },
];

log('Checking built files:', BLUE);
let allPassed = true;

filesToCheck.forEach(({ path: filePath, type }) => {
  if (checkFile(filePath)) {
    const content = readFirstLines(filePath, 10);
    const isESM = content.includes('import ') && !content.includes('"use strict"');
    const isCJS = content.includes('"use strict"') || content.includes('exports.') || content.includes('require(');

    const expectedFormat = type === 'ESM' ? isESM : isCJS;

    if (expectedFormat) {
      log(`  ✅ ${filePath} (${type})`, GREEN);
    } else {
      log(`  ❌ ${filePath} (Expected ${type}, got wrong format)`, RED);
      allPassed = false;
    }
  } else {
    log(`  ❌ ${filePath} (NOT FOUND)`, RED);
    allPassed = false;
  }
});

console.log('\n' + '='.repeat(60));

if (allPassed) {
  log('\n✅ All checks passed! Both CJS and ESM builds are correct.\n', GREEN);

  console.log('Sample ESM output (dist/esm/index.js):');
  console.log('-'.repeat(60));
  console.log(readFirstLines('dist/esm/index.js', 5));
  console.log('-'.repeat(60));

  console.log('\nSample CJS output (dist/cjs/index.js):');
  console.log('-'.repeat(60));
  console.log(readFirstLines('dist/cjs/index.js', 8));
  console.log('-'.repeat(60));

  process.exit(0);
} else {
  log('\n❌ Some checks failed. Please rebuild: yarn build\n', RED);
  process.exit(1);
}

