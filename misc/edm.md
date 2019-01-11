


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
		-	issue for outlook 2013 tho as it needs w/h to render correctly
	-	use `style="display: block;"` to fix space issues in gmail/hotmail
	-	enter alt tags in case images blocked
	-	use full path rather than relative

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

-	**use full 6 digit hex code colors**
	certain versions of outlook, lotus doesn't support shorthand hex codes

-	**gif & videos**
	-	gifs has good support but outlook only shows first frame
	-	videos not supported except in apple mail & outlook 2011

-	**font sizes**
	-	not smaller than 11px
	-	apple suggest 17px for mobile while google recommends 21px

-	*buttons*
	-	apple suggests min 44*44px
	-	windows recommends touch target of 34px with min of 26px



---



## snippets


```html



<!-- add under <head> to stop auto linking phone numbers in ios -->
<meta name="format-detection" content="telephone=no">



<!-- add vertical spacing -->
<tr><td height="32" style="font-size: 16px; line-height: 16px;">&nbsp;</td></tr>



```



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
	<center>
	<table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#ffffff">
		<tr>
			<td align="center" valign="top">
				<table width="600" border="0" cellpadding="0" cellspacing="0" bgcolor="#cdcdcd" style="border: 1px solid #cdcdcd;" class="100w-on-sm">

					<!-- insert components -->

				</table>
			</td>
		</tr>
	</table>
	</center>
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

/* ios blue links */
a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important;
 font-weight: inherit !important; line-height: inherit !important; }

/* Android center fix */
div[style*="margin: 16px 0;"] { margin: 0 !important; }

/* Client-specific styles */
body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
img { -ms-interpolation-mode: bicubic; }

/* Reset styles */
img { border: 0; outline: none; text-decoration: none; }
table { border-collapse: collapse !important; }
body { margin: 0 !important; padding: 0 !important; width: 100% !important; }

```



---



## common styles



```css

@media screen and ( max-width: 480px ) {
	*[ class="show-on-sm" ] {
		display: block !important;
	}

	*[ class="hide-on-sm" ] {
		display: none !important;
	}

	*[ class="100w-on-sm" ] {
		width: 100% !important;
		height: auto !important;
	}

	*[ class="center-on-sm" ] {
		width: 100% !important;
		height: auto !important;
		text-align: center !important;
	}

	*[ class="no-padding-on-sm" ] {
		padding: 0 !important;
	}

	*[ class="2-1-on-sm" ] {
		width: 100%;
		text-align: center;
		display: inline-block;
		padding-bottom: 32px !important;
	}

	*[ class="4-2-on-sm" ] {
		width: 50%;
		text-align: center;
		display: inline-block;
		padding-bottom: 32px !important;
	}

	*[ class="6-3-on-sm" ] {
		width: 33.33%;
		text-align: center;
		display: inline-block;
		padding-bottom: 32px !important;
	}
}

```



---



## addon styles



---



## components



```html



<!--**********************************************************************************
	desktop to mobile image swap
**********************************************************************************!-->
<tr>
	<td align="center" valign="top">
		<span class="hide-on-sm" style="display: block;">
			<img src="" style="margin: 0; padding: 0; border: none; display: block;" border="0" alt="" />
		</span>
		<span class="show-on-sm" style="display: none;">
			<img src="" style="margin: 0; padding: 0; border: none; display: block;" border="0" alt="" class="100w-on-sm" />
		</span>
	</td>
</tr>



<!--**********************************************************************************
	2 to 1 stack
**********************************************************************************!-->
<tr>
	<td align="center" valign="top">
		<table width="100%" border="0" cellpadding="0" cellspacing="0">
			<tr>
				<td align="center" valign="top" class="2-1-on-sm">
					<table width="100%" border="0" cellpadding="0" cellspacing="0">
						<tr>
							<td align="center" valign="top">
								<img src="" width="300" style="margin: 0; padding: 0; border: none; display: block;" border="0" alt="" />
							</td>
						</tr>
					</table>
				</td>
				<td align="center" valign="top" class="2-1-on-sm">
					<table width="100%" border="0" cellpadding="0" cellspacing="0">
						<tr>
							<td align="center" valign="top">
								<img src="" width="300" style="margin: 0; padding: 0; border: none; display: block;" border="0" alt="" />
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</td>
</tr>


<!--**********************************************************************************
	4 to 2 stack
**********************************************************************************!-->
<tr>
	<td align="center" valign="top">
		<table width="100%" border="0" cellpadding="0" cellspacing="0">
			<tr>
				<td align="center" valign="top" class="4-2-on-sm">
					<table width="100%" border="0" cellpadding="0" cellspacing="0">
						<tr>
							<td align="center" valign="top">
								<img src="" width="150" style="margin: 0; padding: 0; border: none; display: block;" border="0" alt="" />
							</td>
						</tr>
					</table>
				</td>
				<td align="center" valign="top" class="4-2-on-sm">
					<table width="100%" border="0" cellpadding="0" cellspacing="0">
						<tr>
							<td align="center" valign="top">
								<img src="" width="150" style="margin: 0; padding: 0; border: none; display: block;" border="0" alt="" />
							</td>
						</tr>
					</table>
				</td>
				<td align="center" valign="top" class="4-2-on-sm">
					<table width="100%" border="0" cellpadding="0" cellspacing="0">
						<tr>
							<td align="center" valign="top">
								<img src="" width="150" style="margin: 0; padding: 0; border: none; display: block;" border="0" alt="" />
							</td>
						</tr>
					</table>
				</td>
				<td align="center" valign="top" class="4-2-on-sm">
					<table width="100%" border="0" cellpadding="0" cellspacing="0">
						<tr>
							<td align="center" valign="top">
								<img src="" width="150" style="margin: 0; padding: 0; border: none; display: block;" border="0" alt="" />
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</td>
</tr>


<!--**********************************************************************************
	6 to 3 stack
**********************************************************************************!-->
<tr>
	<td align="center" valign="top">
		<table width="100%" border="0" cellpadding="0" cellspacing="0">
			<tr>
				<td align="center" valign="top" class="6-3-on-sm">
					<table width="100%" border="0" cellpadding="0" cellspacing="0">
						<tr>
							<td align="center" valign="top">
								<img src="" width="100" style="margin: 0; padding: 0; border: none; display: block;" border="0" alt="" />
							</td>
						</tr>
					</table>
				</td>
				<td align="center" valign="top" class="6-3-on-sm">
					<table width="100%" border="0" cellpadding="0" cellspacing="0">
						<tr>
							<td align="center" valign="top">
								<img src="" width="100" style="margin: 0; padding: 0; border: none; display: block;" border="0" alt="" />
							</td>
						</tr>
					</table>
				</td>
				<td align="center" valign="top" class="6-3-on-sm">
					<table width="100%" border="0" cellpadding="0" cellspacing="0">
						<tr>
							<td align="center" valign="top">
								<img src="" width="100" style="margin: 0; padding: 0; border: none; display: block;" border="0" alt="" />
							</td>
						</tr>
					</table>
				</td>
				<td align="center" valign="top" class="6-3-on-sm">
					<table width="100%" border="0" cellpadding="0" cellspacing="0">
						<tr>
							<td align="center" valign="top">
								<img src="" width="100" style="margin: 0; padding: 0; border: none; display: block;" border="0" alt="" />
							</td>
						</tr>
					</table>
				</td>
				<td align="center" valign="top" class="6-3-on-sm">
					<table width="100%" border="0" cellpadding="0" cellspacing="0">
						<tr>
							<td align="center" valign="top">
								<img src="" width="100" style="margin: 0; padding: 0; border: none; display: block;" border="0" alt="" />
							</td>
						</tr>
					</table>
				</td>
				<td align="center" valign="top" class="6-3-on-sm">
					<table width="100%" border="0" cellpadding="0" cellspacing="0">
						<tr>
							<td align="center" valign="top">
								<img src="" width="100" style="margin: 0; padding: 0; border: none; display: block;" border="0" alt="" />
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</td>
</tr>


<!--**********************************************************************************
	button
**********************************************************************************!-->
<tr>
	<td align="center" valign="top">
		<table width="200" height="48" border="0" cellpadding="0" cellspacing="0" bgcolor="#4d4d4d" style="border-radius: 4px;">
			<tr>
				<td align="center" valign="middle" height="48" style="font-family: Arial, sans-serif; font-size: 16px; font-weight: bold;">
					<a href="" target="_blank" style="font-family: Arial, sans-serif; color: #ffffff; display: inline-block; text-decoration: none; line-height: 48px; width: 192px; font-weight: bold;">button</a>
				</td>
			</tr>
		</table>
	</td>
</tr>


<!--**********************************************************************************
	side to center align
**********************************************************************************!-->



<!--**********************************************************************************
	--
**********************************************************************************!-->



<!--**********************************************************************************
	--
**********************************************************************************!-->



<!--**********************************************************************************
	--
**********************************************************************************!-->



<!--**********************************************************************************
	--
**********************************************************************************!-->



```


---
