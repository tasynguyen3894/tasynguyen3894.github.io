## GIT

```
git config --global alias.graph 'log --format="%h - %s - %an" --graph'
git config --global alias.pull-origin "! git rev-parse --abbrev-ref HEAD | xargs | git pull origin "
git config --global alias.push-origin "! git rev-parse --abbrev-ref HEAD | xargs | git push origin "
```