$('.markdown').innerHTML = 
'<p>' + $('.markdown').innerHTML
/*** CITE ***/
.replace(/^\|([A-Za-z]+(-(\d|\w)+)?)\s(.+)/gim, '<blockquote class="$1">$4</blockquote>')
.replace(/^\|\s(.+)/gim, '<blockquote>$1</blockquote>')
.replace(/<\/blockquote>(\s+)<blockquote>/g, '<br>')
/*** TITLE ***/
.replace(/^######\s([\x20-\x22\x24-\xFF].+)/gm, '<h6 id="$1">$1</h6>')
.replace(/^#####\s([\x20-\x22\x24-\xFF].+)/gm, '<h5 id="$1">$1</h5>')
.replace(/^####\s([\x20-\x22\x24-\xFF].+)/gm, '<h4 id="$1">$1</h4>')
.replace(/^###\s([\x20-\x22\x24-\xFF].+)/gm, '<h3 id="$1">$1</h3>')
.replace(/^##\s([\x20-\x22\x24-\xFF].+)/gm, '<h2 id="$1">$1</h2>')
.replace(/^#\s([\x20-\x22\x24-\xFF].+)/gm, '<h1 id="$1">$1</h1>')
.replace(/^(---|=)\n/gm, '<hr>\n')
.replace(/^\.([A-Za-z]+(-(\d|\w)+)?)\s(.+)/gim, '<p class="$1">$4</p>')
.replace(/^\.\n/gm, '</p><p>')
/*** LIST ***/
.replace(/^\*\s(.+)/gim, '<ul><li>$1</li></ul>')
.replace(/^_\s(.+)/gim, '<ol><li>$1</li></ol>')
.replace(/^\-\s(.+)/gim, '<dl><dd>$1</dd></dl>')
.replace(/<\/ul>(\s+)<ul>/g, '')
.replace(/<\/ol>(\s+)<ol>/g, '')
.replace(/<\/dl>(\s+)<dl>/g, '')
/*** FORMAT ***/
.replace(/\*\*\*([\x20-\x29\x2B-\xFF]+)\*\*\*/g, '<b><i>$1</i></b>')
.replace(/\*\*([\x20-\x29\x2B-\xFF]+)\*\*/g, '<b>$1</b>')
.replace(/\*([\x20-\x29\x2B-\xFF]+)\*/g, '<i>$1</i>')
/*** ATTACH ***/
.replace(/\!\[([\w\s\d]+)\]\(([\w\d\?\=\/\\\.\-:]+)(\s"[\w\d\s].+")?\)/g, '<img src="$2" alt="$1" title="$3" loading="lazy">')
.replace(/\[([<\w\d\s="/\-\.%>@]+)\]\(([\w\d\?\=\/\\\.\-:@]+)(\s"[\w\d\s].+")?\)/g, '<a href="$2" title="$3">$1</a>')
/*** CODE ***/
.replace(/```(sb3|ini|fxt|csm|txt|\s)!?\s([\x09-\x5F\x61-\xFF]*)```/g, '<pre class="$1">$2</pre>')
.replace(/`([\x09-\x5F\x61-\xFF]+)`/g, '<code>$1</code>')
+ '</p><hr><p style="line-height: 22px;font-weight: 500;font-size: 14px; color:#8899a8;">Last modified ' + document.lastModified + '</p>'