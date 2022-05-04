## GIT

```bash
git config --global alias.graph 'log --format="%h - %s - %an" --graph'
git config --global alias.pull-origin "! git rev-parse --abbrev-ref HEAD | xargs git pull origin "
git config --global alias.push-origin "! git rev-parse --abbrev-ref HEAD | xargs git push --set-upstream origin "
git config --global alias.find-branch "! git branch -a | grep ${1} "
git config --global alias.current-branch 'rev-parse --abbrev-ref HEAD'
```