# Disk Utility

-	file > new image > blank image

-	**size** = largest it will ever be, set it high ie. 1tb
	-	if you use sparse files
-	**format**
	- 	apfs = good for ssds
	-	extended journaled = traditional hdds
	-	exfat = transferable to windows
-	**encryption** = pls set
-	**partitions** = single partition - guid partition map
-	**image format**
	-	sparse bundle disk image
		-	with time meachine or other backup methods, it will sync in bundles
		-	to clear deleted files or compress sparse bundle
			-	delete unwanted files
			-	empty thrash
			-	unmount
			-	hdiutil compact /Volumes/Winterfell/Theon.sparsebundle
	-	sparse disk image
		-	will treat it as a new file everytime anything is added
		-	not good for syncing or backup
	-	read/write disk image is old school dmg file
		-	will consume as much space as you initially set it
