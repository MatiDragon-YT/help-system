# Sanny Builder Help
[![Release](https://img.shields.io/github/v/release/MatiDragon-YT/help-system?style=for-the-badge)](https://github.com/MatiDragon-YT/help-system/releases)
[![Discord](https://img.shields.io/discord/911487285990674473?style=for-the-badge)](https://discord.gg/d5dZSfgBZr)

Based on the original that brings the [`help.chm`](https://github.com/sannybuilder/help-system), GitBook and my own [`doc-chm`](https://github.com/MatiDragon-YT/doc-chm).
This is the first offline version of [docs.sannybuilder.com](https://docs.sannybuilder.com/), worked together, to understand much of the GitBook site Markdown and highlight SB3 code easy and quickly.

![image](https://user-images.githubusercontent.com/43966706/150444302-3e9b7bc4-f803-4d02-a83f-3464fc5ad259.png)
 
##### Table of content
* [Install](#install)
* [Collaborations](#collaborations)
  * [Creating pages](#creating-pages)
  * [Reporting issues](#creating-pages)
* [Compiling CHM files](#compiling-chm-files)
* [Thanks](#thanks)

## Install
Just download the chm corresponding to your language:

| language | file | state |
| --- | --- | --- |
| English | [help](https://github.com/MatiDragon-YT/help-system/releases/download/1.12/help.chm) | `[##########]` ⭐ complete |
| Español | [help3082](https://github.com/MatiDragon-YT/help-system/releases/download/1.12/help3082.chm) | `[########..]` ⌛ in process |
| Pусский | [help1049](https://github.com/MatiDragon-YT/help-system/releases/download/1.12/help1049.chm) | `[#######...]` ⌛ in process |

And optionally, move the file to directory.
```
<sanny builder foldes>\help\<here>
```
to be able to open it from sanny builder, or directly, opening it as if it were a common windows executable.
> ### BUG: Blank views?
> If when you open the file, it does not load the content. Only by unchecking the Windows security box when opening the file, you could have solved the problem.


## Collaborations
The world is very welcome to collaborate in what you want with the documentation.\
Providing information, bug reports or optimizing the main script, which brings Markdown to life.

### Creating pages
After create a fork (cloning or downloading) of the repository. Just go to the folder that contains the section you want to collaborate on.\
For example to `help-system\<lang>\scm-documentation\sa\` and create any file with the extension `.HTML` with the following inside.

```html
<!DOCTYPE html>
<html>
<head>
  <title>Example Page</title>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" type="text/css" href="../../../style/style.css">
</head>
<body>

This is a template

<script src="../../../js/main.min.js"></script>
```
From here, just define the title that the page will display, at the `<title>` tags and replace `This is a template` with whatever content you want. You can use HTML or Markdown, which the engine we use here already has the ability to work with tables, lists, stylized text (bold, italic, strikethrough, highlighted, underlined, inserts), links, images, citations, spans and divs.

> You can see an example of how to generate certain things quickly, by going into a test file `test/markdown/html.html`.

After, create your pull request and ready.

### Reporting issues
Just create a [ticket](https://github.com/MatiDragon-YT/help-system/issues/new) and describe in detail.

## Thanks
| Contributor | by |
| --- | --- |
| [Seemann](https://github.com/x87)<br>(x87) | v0.1 - v1.3 : Critics and error reports from early stages<br>v1.8 : Fix Version History at 0.7 |
| [Yushae Raza](https://github.com/yushaer)<br>(darksavage) | v1.4 : Aggrege to SA the Vehicle ID List<br>v1.6 : fix weapons GXT |

## Compiling CHM files
Use [HTML Help Workshop v4](https://cdn.discordapp.com/attachments/805823828571586624/937861627309592686/htmlhelp.zip).
