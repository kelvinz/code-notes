


<https://www.udemy.com/shell-scripting-linux/learn/v4/overview/>



# overview



## shell scripts

contain a series of commands
interpreter executes commands in script
anything you can type in command line, can be in script

`chmod 755 myscript.sh` gives full permission to all users

`#!/bin/bash` states the interpreter to use for script
`#!` is known as a shebang & followed by path to interpreter



## variables

name-value pairs
`MY_VARIABLE="Value"`
no spacings before or after =
case sensitive
by convention uppercase

use it via `echo "Some $MY_VARIABLE goes here."`

if you need to add things to variables
do this - `echo "Some ${MY_VARIABLE}s goes here."`

can't start with numbers or use - or @

can contain commands with $() or ``
tho `` is outdated & seen in only old scripts
`MY_VARIABLE=$(ls *jpg)`

variables are global by default
needs to be declared first before it can be used



## comments

pound sign + space
`# my comments`



## tests

[ condition-to-test-for ]
eg. [ -e /etc/passwd ]

+	-d FILE
	True if file is a directory
+	-e FILE
	True if file exists
+	-f FILE
	True if file exists & is a regular file
+	-r FILE
	True if file is readable by you
+	-s FILE
	True if file exists & is not empty
+	-w FILE
	True if file is writeable by you
+	-x FILE
	True if file is executable by you
+	-z STRING
	True if string is empty
+	-n STRING
	True if string is not empty
+	STRING1 = STRING2
	True if the strings are equal
+	STRING1 != STRING2
	True if the strings are not equal
+	arg1 -eq arg2
	True if arg1 is equal to arg2
+	arg1 -ne arg2
	True if arg1 is not equal to arg2
+	arg1 -lt arg2
	True if arg1 is less than to arg2
+	arg1 -le arg2
	True if arg1 is less than or equal to arg2
+	arg1 -gt arg2
	True if arg1 is greater than to arg2
+	arg1 -ge arg2
	True if arg1 is greater than or equal to arg2



## if

```shell

	#!/bin/bash
	MY_SHELL="bash"

	if [ "$MY_SHELL" = "bash" ]
	then
		echo "You seem to like the bash shell."
	elif [ "$MY_SHELL" = "csh" ]
		echo "You seem to like the csh shell."
	else
		echo "You don't seem to like the bash shell."
	fi

```



## loops

```shell

	#!/bin/bash
	for COLOR in red green blue
	do
		echo "COLOR: $COLOR"
	done

	#!/bin/bash
	COLORS="red green blue"
	for COLOR in $COLORS
	do
		echo "COLOR: $COLOR"
	done

```

eg. renames all jpg by adding today's date

```shell

	#!/bin/bash
	PICTURES=$(ls *jpg)
	DATE=$(date +%F)

	for PICTURE in $PICTURES
	do
		echo "Renaming ${PICTURE} to ${DATE}-${PICTURE}"
		mv ${PICTURE} ${DATE}-${PICTURE}
	done

```



## passing variables into script

`script.sh para1 para2 para3`
$0:"script.sh"
$1:"para1"
$2:"para2"
$3:"para3"

$@ to group all variables passed in so you can loop



## accepting inputs

`read -p "PROMPT" VARIABLE`

```shell

	#!/bin/bash

	read -p "Enter a user name: " USER
	echo "Username entered is $USER"

```



---



# exit statuses & return codes



## overview

+	every command returns an exit status
+	range from 0 to 255
+	0 = success

+	`$?` contains return code of previously executed command

```shell

	HOST="google.com"
	ping -c 1 $HOST

	if [ "$?" -ne "0" ]
	then
		echo "$HOST unreachable."
	fi

```

+	`man` or `info` to read more about command's exit statuses



## and / or

and: &&
run next command if previous one returns a 0 status
eg. `mkdir /tmp/bak && cp test.txt /tmp/bak/`

or: ||
run next command if previous one doesn't return a 0 status
eg. `cp test.txt /tmp/bak/ || cp test.txt /tmp`



## semicolon

seperate commands using ;
same as a new line



## exit command

exit your script with a return code 0-255
eg. `exit 0`
if there isn't a exit command in your script
the value of the last executed command's return status is sent



---



# functions



## basic

+	needs to be declared before it is called
+	declared with the keyword function or not, it's the same
+	called just using the function name

```shell

	function hello() {
		echo "hello!"
		now
	}

	now() {
		echo "now!"
	}

	hello

```



## variables

similar to passing variables to scripts
using $1, $2, or $@ for all

local variables can be accessed only within function
declared using the `local` keyword
ie. `local MY_VAR="HEY YO"`



## exit status

same as scripts, functions has exit statuses
if none given, last command's exit status is passed
else use `return 1` to explictly give an exit status
0-255 where 0 = success



---



# shell script template



## order

1.	shebang
2.	comments/header
3.	global variables
4.	funtions
	+	use local variables
5.	main script body
6.	exit with exit status
	+	exit status at various exit points



---



# wildcards



## summary

character or string used for pattern matching
can be used with most commands



## *

matches zero or more characters

eg.
*.txt
a*
a*.txt



## ?

matches exactly one character

eg.
?.txt
a?
a?.txt



## []

character class
matches any of the characters included between the brackets
matches exactly one character

eg.
[aeiou]

or

ca[nt]* will match

+	can
+	cat
+	candy
+ 	catch



## [!]

matches any of the characters NOT included between the brackets
matches exactly one character

eg.
[!aeiou]*

+	baseball
+	cricket



## ranges

use two characters seperated by a hyphen to create a range

eg.
[a-g]*
[3-6]*



## named character classes

[[:alpha:]] - alphabetic characters
[[:alnum:]] - alphanumberic characters
[[:digit:]] - any digits
[[:lower:]] - any lower case letters
[[:space:]] - white space, tabs, new lines
[[:upper:]] - uppercase letters



## matching wildcards

\ before character to escape

match all files that end with a question mark
`*\?`



---



# case statements



end each case with a )
normal wildcards or character matching works

```shell

	case "$1" in
		start|START)
			/usr/sbin/sshd
			;;
		stop)
			kill $(cat /var/run/sshd.pid)
			;;
		*)
			echo "Usage: $0 start|stop" ; exit 1
			;;
	esac

```



---



# logging



## syslog standard

+	facilities: kern, user, mail, daemon, auth, local0, local7
+	severities: emerg, alert, crit, err, warning, notice, info, debug

locations are configurable, but usually found here;
`/var/log/messages`
`/var/log/syslog`



## logger

basic message
`logger "Message"`

local facility + info severity
`logger -p local0.info "Message"`

tag message with your program name to find it easier in logs
`logger -t myscript -p local0.info "Message"`

add process ID
`logger -i -t myscript "Message"`



## shift

shift is used to remove variables used & consider only the remaining
eg.

```shell

	logit() {
		local LOG_LEVEL=$1
		shift
		MSG=$@
		TIMESTAMP=$(date +"%Y-%m-%d %T")
		if [ $LOG_LEVEL = "error" ] || $VERBOSE
		then
			echo "${TIMESTAMP} ${HOST} ${PROGRAME_NAME} [${PID}]: ${LOG_LEVEL} ${MSG}"
		fi
	}

```



---



# while loops



## basic structure

```shell

	while [ CONDITION_IS_TRUE ]
	do
		command 1
		command 2
		command 3
	done

```

`((MY_VARIABLE++))` will increment variable by 1



## infinite loops

useful to run on-going scripts/service until manually quitting
use sleep to pause for x seconds before looping

```shell

	while true
	do
		command 1
		sleep 1
	done

```



## break & continue loops

use `break` to stop loop, exit loop but continue in script
use `continue` to jump up to top of loop to continue loop



---



# debugging



## basic commands

`-x`
prints commands as they execute

add in shebang of your script
`#!/bin/bash -x`

or in command line
`set -x`
to off it in command line
`set +x`
or wrap parts of your script with these two commands

will show in + xxx in logs/command line

`-e`
exit on error

similar to -x
can be used together too
`#!/bin/bash -ex`

`-v`
prints shell input lines as they are read
can be combined with others too



## manual debugging

create your own debugging code
use special variable like DEBUG
`DEBUG=true`
boolean is without quotes

go line by line in command line to test



## PS4

`PS4="+ $BASH_SOURCE : $LINENO : "`
adds additional stuff to the default + produced by -x
example above shows name of script & line number



## dos vs linux/unix

windows create carriage returns which are hidden
these can become unwanted characters in linux causing bugs
cat -v to view them & remove them manaually or using a script
dos2unix.sh



---
