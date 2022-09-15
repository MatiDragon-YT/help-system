// GLOBAL VERSION OF THE CHM
const VERSION = "1.17";

function log(value){
	console.log(value)
}

const D = document

const SP = String.prototype
const EP = Element.prototype

NodeList.prototype.forEach = Array.prototype.forEach

/** Smart selector for elements of the DOM
 * @param {DOMString}
 * @param {Element} optional
 * @return {Element}
*/
function $(element, _parent) {
	_parent = _parent || D
	const xElements = _parent.querySelectorAll(element)
	const length = xElements.length

	if (element.charAt(0) === '#' && !/\s/.test(element) || length === 1) { 
		return _parent.querySelector(element);
	}
	else {
		if(length === 0){return undefined}
		return xElements;
	}
}

/** Get the language specified in the html
 * @return {String}
*/
const LANG = ($('html').getAttribute('lang') || 'en').toUpperCase()

/** Get the root folder of the resources internal to the language
 * @return {String}
*/
const ROOT = $('head').innerHTML.match(/"([\/\.]+)\/style\/style\.css"/)[1] + "/"

/** Get the root folder of the resources external to the language
 * @return {String}
*/
const exROOT = function(){
	// In order to have a visible resource load from the browsers
	if (navigator.userAgent.match("MSIE") != null){
		// it is checked only if IE is being used
		
		const HREF = location.href

		const X = HREF.search(/:/) == 2 ? 14 : 7
		const Y = HREF.lastIndexOf("\\") + 1

		return 'file:///' + location.href.substring(X, Y) + "/files/"
	}

	return ROOT + "/files/"
}()

const CSSComputarized = function(){
	let tempCSS = ``

	const prefixes = ['-','-sm-','-md-','-lg-','-xl-','-xxl-']
	const size = [0,576,768,992,1200,1400]

	prefixes.forEach(function(prefix, resolucion){
		if (resolucion != 0) {tempCSS += '@media(min-width:' + size[resolucion] + 'px){'}
	
		var vIndex = 0
		while(vIndex < 13){
			tempCSS += '.cols'+prefix+vIndex+'{columns:'+vIndex+' auto}'

			vIndex++
		}
		
		[
			['m', 'margin'],
			['mt', 'margin-top'],
			['mb', 'margin-bottom'],
			['ml', 'margin-left'],
			['mr', 'margin-right'],
			['mx', 'margin-block'],
			['my', 'margin-inline'],
			['p', 'padding'],
			['pt', 'padding-top'],
			['pb', 'padding-bottom'],
			['pl', 'padding-left'],
			['pr', 'padding-right'],
			['px', 'padding-block'],
			['py', 'padding-inline'],
			['g', 'gap'],
			['r', 'border-radius']
		].forEach(function(attribute){
			[
				'0',
				'.25rem',
				'.5rem',
				'1rem',
				'1.5rem',
				'3rem'
			].forEach(function(value, index){
				tempCSS += '.' + attribute[0] + prefix + index + '{' + attribute[1]+ ':' + value + '!important}'
			})
		});

		[
			'auto',
			'8.33333333%',
			'16.66666667%',
			'25%',
			'33.33333333%',
			'41.66666667%',
			'50%',
			'58.33333333%',
			'66.66666667%',
			'75%',
			'83.33333333%',
			'91.66666667%',
			'100%'
		].forEach(function(value, index){
			tempCSS += '.col' + prefix + (index == 0 ? 'auto' : ++index) + '{width:' + value + '!important}'
			tempCSS += '.offset' + prefix + (index == 0 ? 'auto' : ++index) + '{margin-left:' + value + '!important}'
		});

		if (resolucion != 0) {tempCSS += '}\n\n'}
	})
	return tempCSS
}()

var CSS = {
	Add: function(styles){STYLES.innerHTML += styles},
	Remove: function(styles){STYLES.innerHTML = STYLES.innerHTML.r(styles, "")}
}

var modeLight = 0
function ModeLight(){
	const TEMPLADE = '\
		#navbar {\
		    background: #ddd;\
		    color: #000;\
		    font-weight: 700;\
		    overflow: hidden;\
		}\
		html{\
			background: #fff;\
			color: #0d1117;\
		}\
		body {\
			scrollbar-face-color: #aaa;\
			scrollbar-track-color: #ddd;\
			scrollbar-arrow-color: #999;\
			scrollbar-shadow-color: #ddd;\
		}\
		::-webkit-scrollbar { width: 1rem;}\
		::-webkit-scrollbar-track { background: #ddd }\
		::-webkit-scrollbar-thumb { background: #aaa; border: 1px #ddd solid; }\
		::-webkit-scrollbar-corner {background: #ddd}\
		code, .code, kbd, pre, samp {\
			background: #eceff1;\
			color: #212121;\
		}\
		h1, h2, h3, hr {border-bottom: #c9cfd5 1px solid}\
		table {border: 1px solid #c9cfd5}\
		td {\
			border-left: #c9cfd5 1px solid;\
			border-top: #c9cfd5 1px solid;\
		}\
		.labels { color: #009688 }\
		.keywords { color: #ff5722 }\
		.models { color: #607d8b }\
		.classes { color: #d32f2f }\
		.commands { color: #0288d1 }\
		.numbers,\
		.numbers * { color: #7e57c2 }\
		.variables { color: #607d8b }\
		.strings,\
		.strings * { color: #009688 }\
		.comments,\
		.comments * { color: #0288d1 }\
		.directives,\
		.directives * { color: #607d8b }\
		.cont::after { box-shadow: 0px -14px 17px #fff }\
		'
	if (!modeLight) {
		modeLight++
		CSS.Add(TEMPLADE)
		return true
	}
	else{
		modeLight--
		CSS.Remove(TEMPLADE)
		return false
	}
}

EP.next = function(){
	return this.nextElementSibling
}

EP.previous = function(){
	return this.previousElementSibling
}

EP.show = function(){
    this.style.display = "block"
}

EP.hide = function(){
    this.style.display = "none"
}

EP.toggle = function(){
	getComputedStyle(this).display == "block"
		? this.hide()
		: this.show()
}

const CopyTextContent = function(id) {
	var $temp = D.createElement("textarea")
	$temp.value = (typeof id == 'object' ? id.textContent : id)
	$('body').appendChild($temp)
	$temp.select();
	D.execCommand("copy")
	$('body').removeChild($temp)
}

/** Shotcun of String.replace()
*/
SP.r = function(text, _text, _flags){
	_text = _text || ''
	_flags = _flags || ''
	return this.replace(text, _text, _flags)
}

/** Polifill and shotcun of String.replaceAll()
*/
SP.rA = function(text, _text){
	var temp = this
	_text = _text || ''

	if(temp.indexOf(text, 0) !== -1){
		temp = temp
		.r(text, _text)
		.rA(text, _text)
	}
	
	return temp
}

/*
SP.toCapitalCase = function(){
	return this
	.r(/((^|\s)\w)/g, function(input){
		return input.toUpperCase()
	})
}
*/

/** Apply a function to all elements of the DOM
 * @param {NodeList} 
 * @param {function}
*/
function apply(element, callback){
	if(element){
		if('' + element == '[object NodeList]'){ 
			element.forEach(function(e){
				callback(e)
			})
		}else{  
			callback(element)
		}
	}
}

var aTables = [] // contenedor de tablas

SP.toMarkdown = function(){
	SP.toLinkCase = function(){
		return this.toLowerCase()
		.r(/<(\/)?[\!\w\d\s\.,-="]+>/g)
		.rA('\x20', '-')
	}

	SP.parseHTML = function(){
		return this
		.rA('<br>', '\n')
		.rA('<', '&lt;')
		.rA('=""')
	}

	SP.rLinks = function(){
		const img   = exROOT + "img/",
			
			sa   = img+"sa/",
			sam  = img+"sa_mobile/",
			vc   = img+"vc/",
			gta3 = img+"gta3/",
			
			weapon = "weapon/",
			widget = "widget/",
			radar  = "radar/"
		
		return this
		.r(/^%sa-w\//m,   sa   + weapon)
		.r(/^%sam-w\//m,  sam  + widget)
		.r(/^%vc-w\//m,   vc   + weapon)
		.r(/^%sa-r\//m,   sa   + radar)
		.r(/^%vc-r\//m,   vc   + radar)
		.r(/^%gta3-r\//m, gta3 + radar)
		.r(/^%sa-t\//m,   sa   + "tatoo/")
		.r(/^%e\//m, exROOT)
		.r(/^%g\//m, ROOT)
	}

	return this

	/******** LIST ********/

	// SCAPE CHAR
	.rA("\\n", "<br/>")
	.rA("\\s", "&nbsp;")
	.rA("\\\\", "&#x5C;")
	.r(/\\./g, function(input){
		return '&#' + input.r('\\').charCodeAt(0) + ';'
	})
	.r(/<\!--(.+)-->/g)

	// ID
	.r(/\[([^\[\]]+)\]\[\]/g, '<a id="$1"></a>')

	// DIVS
	  // SINTAX OF GITBOOK
		.r(/{% hint (\w+) %}([\w\W]*){% endhint %}/g, "<div class='$1'>$2</div>")
		.r(/{% hint style="(\w+)" %}\n/g, '<div class="$1">')
		.r(/{% endhint %}\n/g, '</div>\n')
	  // SYNTAX OF MATIDRAGON
		.r(/:::([\w\d\x20\-_]+)(#([\w\d\-_]+))?(\x20([^\n]+))?\n/g, '<div id="$3" class="$1" style="$5">\n')
		.r(/:::\n/g, '</div>\n')

	// BLOCKQUOTES
	.r(/^>\x20(.+)/gm, '<blockquote>\n$1</blockquote>')
	.r(/<\/blockquote>(\s+)<blockquote>/g, '<br>')

	// UL LI
	.r(/^(\x20)?\*\s(.+)/gim, '<ul><li>$1$2</li></ul>')
	.r(/^(\x20)?\x20{2}\*\s(.+)/gim, '<ul><ul><li>$1$2</li></ul></ul>')
	.r(/^(\x20)?\x20{4}\*\s(.+)/gim, '<ul><ul><ul><li>$1$2</li></ul></ul></ul>')
	.r(/<\/ul>(\s+)<ul>/g, '')
	.rA('<\/ul><\/ul><ul><ul>', '')
	.rA('<\/ul><ul>', '')

	// OL LI
	.r(/^(\x20)?\d\.\s(.+)/gim, '<ol><li>$1$2</li></ol>')
	.r(/^(\x20)?\x20{2}\d\.\s(.+)/gim, '<ol><ol><li>$1$2</li></ol></ol>')
	.r(/^(\x20)?\x20{4}\d\.\s(.+)/gim, '<ol><ol><ol><li>$1$2</li></ol></ol></ol>')

	.r(/<\/li><\/ol>\n<ul><ul><li>(.*)<\/ul><\/ul>/g, '<\/li><ul><li>$1</ul></ol>')

	.r(/<\/ol>(\s+)<ol>/g, '')
	.rA('<\/ol><\/ol><ol><ol>', '')
	.rA('<\/ol><ol>', '')

	// DL DD
	.r(/^(\x20)?\-\x20\[\]\s(.+)/gim, "<dl><dd><input type='checkbox' disabled> $1$2</dd></dl>")
	.r(/^(\x20)?\-\x20\[x\]\s(.+)/gim, "<dl><dd><input type='checkbox' disabled checked> $1$2</dd></dl>")
	.r(/^(\x20)?\-\s(.+)/gim, '<dl><dd>$1$2</dd></dl>')
	.r(/^(\x20)?\x20{2}\-\s(.+)/gim, '<dl><dl><dd>$1$2</dd></dl></dl>')
	.r(/^(\x20)?\x20{4}\-\s(.+)/gim, '<dl><dl><dl><dd>$1$2</dd></dl></dl></dl>')
	.r(/<\/dl>(\s+)<dl>/g, '')
	.rA('<\/dl><\/dl><dl><dl>', '')
	.rA('<\/dl><dl>', '')

	// CHECKBOX
	.r(/^\[\]\x20(.+)/gm, "<input type='checkbox' disabled> $1<br>")
	.r(/^\[x\]\x20(.+)/gim, "<input type='checkbox' disabled checked> $1<br>")

	/*** FORMAT ***/
	.r(/\*\*\*([^\*\n]+)\*\*\*/g, '<b><i>$1</i></b>')
	.r(/\*\*([^\*\n]+)\*\*/g, '<b>$1</b>')
	.r(/\*([^\*\n]+)\*/g, '<i>$1</i>')
	.r(/~~([^~\n]+)~~/g, '<s>$1</s>')
	.r(/~([^~\s]+)~/g, '<sub>$1</sub>')
	.r(/\^([^\^\s]+)\^/g, '<sup>$1</sup>')
	.r(/__([^_\n]+)__/g, '<u>$1</u>')
	.r(/\b_([^_\n]+)_\b/g, '<address>― $1</address>')
	.r(/==([^=\n\"\'\\\/]+)==/g, '<mark>$1</mark>')
	.r(/\+\+([^\+\n]+)\+\+/g, '<ins>$1</ins>')

	// EMOJIS
	.r(/([^\d\w\|]):([^:\s\|]+):([^\d\w\|])/g, function(input){
		const EMOJIS = {
			'clap': '👏',
			'wave' : '👋',
			'+1' : '👍',
			'thumbsup' : '👍',
			'-1' : '👎',
			'thumbsdown' : '👎',
			'smile' : '😄',
			'emoji' : '😄',
			'eyes' : '👀',
			'sunglasses' : '😎',
			'note' : '📝',
			'memo' : '📝',
			'warning' : '⚠',
			'bulb' : '💡',
		}
		
		input = input.split(':')

		return input[0] + EMOJIS[input[1].toLowerCase()] + input[2]
	})


	/*** TITLE ***/

	.r(/^(\w.+)\n==+=\n/gim, function(input){
		input = input.trim().r(/^(\w.+)\n==+=/gim, '$1')
		return '<h1 id="'+ input.toLinkCase() +'">' + input + '</h1>'
	})
	.r(/^(\w.+)\n--+-\n/gim, function(input){
		input = input.trim().r(/^(\w.+)\n--+-/gim, '$1')
		return '<h2 id="'+ input.toLinkCase() +'">' + input + '</h2>'
	})
	.r(/^#+\x20(.+)/gm, function(input){
		input = input.match(/(#+)\x20([^\{\}\n]+)(\{([^#\{\}\n]+)?(#[^#\{\}\n]+)?\})?/)

		var header = input[1]
		var text = input[2]
		var classes = input[4]
		var id = input[5]

		return '<h' + header.length + 
			' id="' + (id||text.trim().toLinkCase()).r('#') + 
			'" class="' + (classes||'') +
			'">' + text.trim() +
			'</h' + header.length + '>'
	})

	// IMG
	.r(/\!\[([^\[\]]+)?\]\([^\(\)]+\)/g, function(input){
		input = input.match(
			/\!\[([^\[\]]+)?\]\(([^\(\)\s]+)(\x20"(([\w\d\x20\-_]+)(#[\w\d\-_]+)?)")?\)/
		)
		
		var comilla = '"',

			title   = input[1] ? ' title="' + input[1]          + comilla : "",
			src     = input[2] ? ' src="'   + input[2].rLinks() + comilla : "",
			classes = input[5] ? ' class="' + input[5]          + comilla : "",
			id      = input[6] ? ' id="'    + input[6]          + comilla : ""

		return '<img'+ id + src + title + classes +'>'

	})

	// A
	.r(/\[([^\[\]]+)\]\(([^\(\)\s]+)(\x20"[^"]+")?(\x20'[^']+')?(\x20`[^`]+`)?\)/g, function(input){
		input = input.match(/\[([^\[\]]+)\]\(([^\(\)\s]+)(\x20"[^"]+")?(\x20'[^']+')?(\x20`[^`]+`)?\)/)

		if(/^[.\/\w\d-]+(\\|\/)$/.test(input[2])){
			input[2] = input[2] + 'README.html'
		}

		var display = input[1],
			comilla = '"',

			href = ' href="' + input[2]
				.rLinks()
				.r('.md', '.html') + comilla,

			title   = ' title="'   + (input[3] ? input[3].r(/"/g) + comilla : comilla),
			classes = ' class="'   + (input[4] ? input[4].r(/#.+/).r(/'/g) + comilla : comilla),
			id      = ' id="'      + (input[4] ? input[4].r(/.+#/).r(/'/g) + comilla : comilla),
			func    = ' onclick="' + (input[5] ? input[5].r(/`/g).r(/"/g, '\'').r(/\(([^\(\)]+)?\)(\s+)?=>(\s+)?\{/g, 'function($1){') + comilla : comilla),

			target = function(){
				var set = ' target="'
				return /http/.test(href)
					? set + '_blank"'
					: set + '_self"'
			}()

		return "<a"+ id + title  + href + target + classes + func +">" + display + "</a>"
	})
	
	// HR
	.r(/^--+-$/gm, '<hr>')

	// BR
	.r(/(\n\[)/g, '<br>$1')
	.r(/([^`])`\n\n`([^`])/, "$1`<br><br>`$2")
	.r(/(\n^\.\n|(\.|:|\!|\)|b>|a>)\n\n([0-9\u0041-\u005A\u0061-\u007A\u00C0-\uFFFF]|¿|<b|<(ul|ol)?!|\*|`[^`]))/g, '$2<br><br>$3')
	.r(/(\x20\x20\n|\\\n|\\n\w|(\.|:|\!|\)|b>|a>)\n([0-9\u0041-\u005A\u0061-\u007A\u00C0-\uFFFF]|¿|<b|<(ul|ol)?!|\*|`[^`]))/g, '$2<br>$3')
	
	// PRE
	.r(/```([^`]*)```/g, function(input){
		input = input.match(/```([\w\d\x20\-_]+)?(#[\w\d\-_]+)?\n([^`]*)```/)

		var eClass = input[1] || '',
			eId = (input[2] || '').r('#'),
			eText = (input[3] || '').rA('<br>', '\n').rA('<,', '&#x3C;')

		return "<pre id='" + eId + "' class='" + eClass + "'>" + eText + "</pre>"
	})

	// CODE
	.r(/`([^\n`]+)`/g, function(input){
		input = input
		.rA('<,', '&#x3C;')
		.r(/`([^\n`]+)`/, '$1')
		.r(/<(\/?)i>/g, "*")
		.parseHTML()

		return '<code>' + input + '</code>'
	})
	
	// SPAN
	.r(/\[([\w\d\-\x20]+)\]\[([^\[\]]+)\]/gim, '<span class="$1">$2</span>')

	// TABLE
	.r(/^\|[\|\-\x20:]+\|/gm, function(input){
		var aCol = [] // contenedor columnas

		if (input.r(/-+/, '-') != '|-|'){ // es la tabla no minificada

			input = input.split('|')
			input = input.splice(1, --input.length)

			input.forEach(function(a){
				if (/^(:-+:|-+)$/.test(a)) aCol.push('center')
				if (/^-+:$/.test(a)) aCol.push('right')
				if (/^:-+$/.test(a)) aCol.push('left')
			})
		}
		
		aTables.push(aCol)

		return "</thead><tbody>"

	})
	.r(/^\|[^\n]+\|/gm, function (input) {
		input = input.split('|')

		var newTable = ""

		input.forEach( function (element, count) {
			if (count == 0) newTable += "<tr>";
			if (count == input.length - 1) newTable += "</tr>";

			if (element !== "") newTable += "<td>" + element.trim() + "</td>";
		})

		return newTable
	})
	.r(/<(\/tr|tbody)>\n<(tr|\/thead)>/g, "<$1><$2>")
	.r(/^(<tr>(.+)<\/tr>)/gm, "<table><thead>$1</tbody></table>")
}

$('body').innerHTML = '\
<div id="navbar">\
	<h1>' + D.title +'<button id="CHANGE"><img src="'+ exROOT +'img/dm-baseline.png"></button></h1>\
</div>\
<div id="c"><div id="d"><textarea id="inputText" style="display:none;" disabled>'
+ $('body').innerHTML +
'</textarea></div>\
<div class="markdown">\
	<div class="cont"></div>\
	<hr>\
	<p id="credits">\
		CHM ' + LANG + ' ' + VERSION + ' - Made with <3 by MatiDragon, Seemann, Yushae Raza & VitalRus95.\
	</p>\
	<span id="ALINKS"></span>\
</div></div><style id="STYLES"></style>'

var htmlGenerated = $('#inputText').value.toMarkdown()

$('.markdown .cont').innerHTML = htmlGenerated

apply($('thead'), function(element){
	element.innerHTML = element.innerHTML
	.r(/<td(\/)?>/g, '<th$1>')
})

CSS.Add(CSSComputarized)

$('body').style.display = 'block'
setTimeout(function(){$('#c').style.opacity = 1}, 12)

aTables.forEach(function(tabla, numTabla){
	if (tabla.length != 0){ 
		var $tablas = $("table")
		tabla.forEach(function(alineaminto, columna){
			if("" + $tablas == '[object NodeList]'){
				$("tr" ,$tablas[numTabla]).forEach(function(fila){
					fila.childNodes[columna].className = alineaminto
				})
			}
			else{
				$("tr").forEach(function(fila){
					fila.childNodes[columna].className = alineaminto
				})
			}
		})
	}
})

apply($('a'), function(element){
	element.onmouseover = function(){
		CSS.Add("#ALINKS{display:block}")
		ALINKS.innerText = element.getAttribute('href')
	}

	element.onmouseleave = function(){
		CSS.Remove("#ALINKS{display:block}")
	}
})

apply($('.sb3'), function(element){
	const span = {
		start : "<span class=",
		end : ">$1<\/span>"
	}

	const enter = {
		comments  : span.start + "comments"   + span.end,
		numbers   : span.start + "numbers"    + span.end,
		variables : span.start + "variables"  + span.end,
		opcodes   : span.start + "opcodes"  + span.end,
		directives: span.start + "directives" + span.end,
		commands  : span.start + "commands"   + span.end,
		classes   : span.start + "classes"    + span.end
	}

	element.innerHTML = element.innerHTML
	.rA('\t', '    ')
	.rA('&lt;br/&gt;', "\\n")
	//Comentarios 
	.r(/(\/\/[^\n]+)/gm, enter.comments)
	.r(/(\/\*[^\/]*\*\/)/gmi, enter.comments)
	.r(/(\{[^\$][^\{\}]*\})/gmi, enter.comments)
	//Directivas
	.r(/(\{\$[^{}\n]+\})/gmi, enter.directives)
	//Cadenas de texto
	.r(/\"([^\n"]+)\"/gmi, '<span class=strings>"$1"<\/span>')
	.rA('\\"</span>', '\\"')
	.rA('\\"<span>', '\\"')
	.r(/\'([^\n']+)\'/gmi, "<span class=strings>'$1'<\/span>")
	.rA("\\'</span>", "\\'")
	.rA("\\'<span>", "\\'")
	//Palabras Reservadas
	.r(/([-,\s()]|^)(longstring|shortstring|integer|thread|create_thread|create_custom_thread|end_thread|name_thread|end_thread_named|if and|if or|if|then|else|hex|end|else_jump|jump|jf|print|const|while|not|wait|repeat|until|break|continue|for|gosub|goto|var|array|to|downto|step|return|ret|rf|tr|Inc|Dec|Mul|Div|Alloc|Sqr|Random|int|string|float|bool|fade|DEFINE|nop|wasted_or_busted)($|[^\w\d])/gmi, "$1<span class=keywords>$2<\/span>$3")
	//Etiquetas
	.r(/(^|\s+)(\@+\w+|\:+\w+)/gm, "$1<span class=labels>$2<\/span>")
	.r(/(^|\s+)([A-Za-z0-9_]+\(\))/gm, "$1<span class=commands>$2<\/span>")
	//Arreglos
	.r(/(\[)([\d+]*)(\])/gmi, "$1<span class=numbers>$2<\/span>$3")
	//Opcodes
	.r(/([a-fA-F0-9]{4}\:)/gmi, enter.opcodes)
	//Variables ADMA
	.r(/((\&amp;)[\d\-abcdefx]+)/gim, enter.variables)
	//Variables globales
	.r(/((\x{00}|s|v)(\$[0-9A-Z_a-z]+))/gm, enter.variables)
	//Numeros
	.r(/\b(\d+(x|\.)\w+)\b/gmi, enter.numbers)
	.r(/\b(true|false)\b/gmi, enter.numbers)
	.r(/(?!\#)(\W)(?!\$)(\d+)(?!\:|\@)([ifsv]?)\b/gmi, '$1<span class=numbers>$2$3<\/span>')
	//Modelos
	.r(/(\#[^\"\'\#\s]+)\b/gm, "<span class='models uppercase'>$1<\/span>")
	//Clases
	.r(/\b([a-z0-9]+)\.([a-z0-9]+)/gmi, "<span class=classes>$1</span>.<span class=commands>$2</span>")
	.r(/(\w+)(\(.+\)\.)(\w+)/gmi, "<span class=classes>$1</span>$2<span class=commands>$3</span>")
	.r(/(\$\w+|\d+\@)\.([0-9A-Z_a-z]+)/gm, "$1.<span class=commands>$2</span>")
	.r(/(:|of) (\w+)\n/gm,          "$1 <span class=classes>$2</span>\n")
	.r(/\.([0-9A-Z_a-z]+)\n/gm,"." + enter.commands +"\n")
	//Variables  
	.r(/\b(timer(a|b))\b/gmi, enter.variables)
	.r(/(\d+\@(s|v|\B)[^\w\d])/gm, enter.variables)
	// Operadores
	//.r(/\s(\.|\=|\+|\-|\*|\/|\%|\=\=|\+\=|\-\=|\*\=|\/\=|\%\=|\+\+|\-\-|\<|\>|\<\=|\>\=)\s/gmi," <font class=operador>$1<\/font> ")
})

apply($('.ini'), function(element){
	element.innerHTML = element.innerHTML
	// variable
	.r(/(^[^=]+)=/g, "<span class=strings>$1<\/span>=")
	// Number
	.r(/=(\d+(\.\d+)?)/g, "=<span class=strings>$1<\/span>")
	// Type parameter
	.r(/%(\d\w)%/g, "<span class=strings>%$1%<\/span>")
})

$("#CHANGE").onclick = function(){
	const $THIS_ELEMENT = this
	function IMAGE(X){
		$("img", $THIS_ELEMENT).setAttribute("src", exROOT +'img/dm-'+ X +'line.png')
	} 

	ModeLight()
		? IMAGE('out')
		: IMAGE('base')
}