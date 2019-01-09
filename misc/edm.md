


# edm

plug & play pieces to form an edm



---



## tips



-	**double check css support**
	check email client's css support
	eg. background image not supported by outlook 2007/10, windows live, hotmail, gmail
	http://www.campaignmonitor.com/css/

-	**inline css**
	not all email clients read classes/ids
	inline your styles as much as possible

-	**table not div**
	div support is poor
	-	remember to set table's cellpadding/cellspacing to 0
	-	set width or height of td
	-	align or valign
	-	wrap email inside 100% width table

-	**img tag**
	-	don't set width or height to images so it gracefully degrade when images not loaded
	-	use `style="display: block;"` to fix space issues in gmail/hotmail
	-	enter alt tags in case images blocked

-	**spacer gif**
	1x1 transparent gif to fill empty td or create blank space for spacing between blocks

-	**use br instead of p**
	p margin on different email clients are different
	using p to link break will have different spacings

-	**keep everything within 600px**
	most email clients visible width is around 600px

-	**don't use javascript**
	will get flagged as spam email

-	**use html fonts, ie. arial**
	font support is bad~

-	**no more than 3 columns**
	due to small visible screen

-	**don't use css shorthand**
	support is bad
	ie. don't use padding: 0 0 20px 20px;



---



## snippets



### don't auto turn phone numbers to links in ios

add under <head> tag
`<meta name="format-detection" content="telephone=no">`



---



## base skeleton

```html

<!doctype html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<title>%%EDM-TITLE%%</title>
	<style type="text/css">

		/* insert styles */

	</style>
</head>

<body style="margin: 0; padding: 0; background-color: #ffffff;">
	<table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#ffffff">
		<tr>
			<td align="center" valign="top">
				<table width="600" cellpadding="0" cellspacing="0">

					<!-- insert components -->

				</table>
			</td>
		</tr>
	</table>
</body>

</html>

```



---



## css fixes



```css

	/* Force Outlook to provide a "view in browser" button. */
	#outlook a { padding: 0; }

	/* Force Hotmail to display emails at full width */
	body { width: 100% !important; } .ReadMsgBody { width: 100%; } .ExternalClass { width: 100%; }

	/* Prevent Webkit and Windows Mobile platforms from changing default font sizes. */
	body { -webkit-text-size-adjust: none; -ms-text-size-adjust: none; }

	/* Yahoo paragraph fix: removes the proper spacing or the paragraph (p) tag. */
	p { margin: 1em 0; }

	/* Hotmail header color reset: Hotmail replaces your header color styles with a green color on H2, H3, H4, H5, and H6 tags. */
	h1, h2, h3, h4, h5, h6 { color: black !important; line-height: 100% !important; }
	h1 a, h2 a, h3 a, h4 a, h5 a, h6 a { color: blue !important; }
	h1 a:active, h2 a:active,  h3 a:active, h4 a:active, h5 a:active, h6 a:active { color: red !important; }
	h1 a:visited, h2 a:visited,  h3 a:visited, h4 a:visited, h5 a:visited, h6 a:visited { color: purple !important;	}

	/* Outlook 07, 10 Padding issue fix */
	table td { border-collapse: collapse; }

	/* Fix to render the Yahoo Short Cuts invisible. */
	.yshortcuts, .yshortcuts a, .yshortcuts a:link, .yshortcuts a:visited, .yshortcuts a:hover, .yshortcuts a span { color: black; text-decoration: none !important; border-bottom: none !important; background: none !important; }

```



---



## common styles



```css

@media screen and ( max-width: 480px ) {
	*[class="responsive-table"] {
		display: block;
		width: 100% !important;
	}

	*[class="responsive-image"] {
		height: auto;
		max-width: 100% !important;
	}

	*[class="show-on-mobile"] {
		display: block !important;
	}

	*[class="hide-on-mobile"] {
		display: none !important;
	}
}

```



---



## addon styles



---



## components



---
