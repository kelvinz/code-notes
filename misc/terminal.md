# delete node modules

```

//	find & show
find . -name "node_modules" -type d -prune | xargs du -chs

//	delete
find . -name 'node_modules' -type d -prune -print -exec rm -rf '{}' \;

```
