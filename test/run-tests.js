const { spawn } = require('child_process');

const tests = [
  'responsive-design-validation.js'
];

async function runTests() {
  for (const test of tests) {
    console.log(`Running test: ${test}`);
    const child = spawn('node', [test], { cwd: __dirname });

    child.stdout.on('data', (data) => {
      console.log(data.toString());
    });

    child.stderr.on('data', (data) => {
      console.error(data.toString());
    });

    await new Promise((resolve) => {
      child.on('close', (code) => {
        console.log(`Test ${test} finished with code ${code}`);
        resolve();
      });
    });
  }
}

runTests();
