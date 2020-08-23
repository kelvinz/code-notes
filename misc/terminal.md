# delete node modules

```

//	find & show
find . -name "node_modules" -type d -prune | xargs du -chs

//	delete
find . -name 'node_modules' -type d -prune -print -exec rm -rf '{}' \;

```



# delete empty folders

```

//	show empty
find . -type d -empty

//	delete empty
find . -type d -empty -delete

```
