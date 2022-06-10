(async function (branchDeploy = 'master', buildFolder = 'build', temporaryFolder = 'temp') {
  const remoteHost = (await $`git config --get remote.origin.url`).stdout.trim();
  require('fs').existsSync(temporaryFolder) && await $`rm ${temporaryFolder} -rf`;
  await $`git clone --branch ${branchDeploy}  ${remoteHost} ${temporaryFolder}`;
  await $`rm -rf ./${temporaryFolder}/*`;
  await $`cp -a ./${buildFolder}/. ./${temporaryFolder}/`;
  cd(`./${temporaryFolder}`);
  if ((await $`git ls-files --others -d -m`).stdout.trim()) {
    await $`git add .`;
    await $`git commit -m "deploy"`;
    await $`git push origin ${branchDeploy}`;
  } else { console.log('No changes'); }
  cd('..');
  await $`rm -rf ${temporaryFolder}`;
})();