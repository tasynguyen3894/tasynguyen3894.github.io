const fs = require('fs');

const branchDeploy = "master";
const buildFolder = 'build';
const temporalyFolder = 'temp';
const remoteHost = 'https://github.com/tasynguyen3894/tasynguyen3894.github.io.gitt';

if (fs.existsSync(temporalyFolder)) {
  await $`rm ${temporalyFolder} -rf`;
}

await $`git submodule add -f https://github.com/tasynguyen3894/tasynguyen3894.github.io.git ${temporalyFolder}`;

await $`rm -rf ${temporalyFolder}/*`;

await $`cp -a ./${buildFolder}/. ./${temporalyFolder}/`;

await $`git add .`;

await $`git commit -m "deploy"`;

await $`git push origin ${branchDeploy}`;
