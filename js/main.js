// GLOBAL VERSION OF THE CHM
const VERSION = "1.15";

function log(value){
	console.log(value)
}

// GLOBAL VARS
const EMOJIS = {
	'clap': '👏',
	'wave' : '👋',
	'+1' : '👍',
	'-1' : '👎',
	'smile' : '😄',
	'eyes' : '👀'
}
const D = document

const SP = String.prototype
const EP = Element.prototype

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
const LANG = ($('html').getAttribute('lang') || 'en').toUpperCase()
const ROOT = $('head').innerHTML.match(/"([\/\.]+)\/style\/style\.css"/)[1] + "/"
function exROOT (){
	const HREF = location.href,
		X = HREF.search(/:/) == 2
			? 14
			: 7,
		Y = HREF.lastIndexOf("\\") + 1

	return 'file:///' + location.href.substring(X, Y) + "/files/"
}

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

EP.show = function(){
    this.style.display="block"
}

EP.hide = function(){
    this.style.display="none"
}

/** Shotcun of String.replace()
*/
SP.r = function(a, b){
	return this.replace(a, b)
}

/** Polifill and shotcun of String.replaceAll()
*/
SP.rA = function(xText, zText){
	var temp = this

	if(temp.indexOf(xText, 0) !== -1){
		temp = temp
		.r(xText, zText)
		.rA(xText, zText)
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
 * @param {DocumentElement} 
 * @param {function}
*/
function apply(element, callback){
	if(element){ 
		if('' + element == '[object NodeList]'){ 
			for (var i = 0; i < element.length; i++) {
				callback(element[i])
			}
		}else{  
			callback(element)
		}
	}
}

SP.toMarkdown = function(){
	SP.toLinkCase = function(){
		return this.toLowerCase()
		.r(/<(\/)?[\!\w\d\s\.,-="]+>/g, '')
		.rA('\x20', '-')
	}

	SP.parseHTML = function(){
		return this
		.rA('<br>', '\n')
		.rA('<', '&lt;')
		.rA('=""', '')
	}

	SP.rLinks = function(){
		const img   = exROOT() + "img/",
			
			sa   = img+"sa/",
			vc   = img+"vc/",
			gta3 = img+"gta3/",
			
			weapon = "weapon/",
			radar  = "radar/"
		
		return this
		.r(/^%sa-w\//m,   sa   + weapon)
		.r(/^%vc-w\//m,   vc   + weapon)
		.r(/^%sa-r\//m,   sa   + radar)
		.r(/^%vc-r\//m,   vc   + radar)
		.r(/^%gta3-r\//m, gta3 + radar)
		.r(/^%sa-t\//m,   sa   + "tatoo/")
		.r(/^%e\//m, exROOT())
		.r(/^%g\//m, ROOT)
	}

	return this

	/******** LIST ********/

	// SCAPE CHAR
	.rA("\\(", "&lpar;")
	.rA("\\)", "&rpar;")
	.rA("\\-", "&#45;")
	.rA("\\\\", "&#x5C;")
	.rA("\\|", "&vert;")
	.rA("\\s", "&nbsp;")
	.rA("\\n", "<br/>")
	.rA("\\*", "&#x2A;")

	// ID
	.r(/\[([^\[\]]+)\]\[\]/g, '<a id="$1"></a>')

	// UL LI
	.r(/^\*\s(.+)/gim, '<ul><li>$1</li></ul>')
	.r(/^\x20{2}\*\s(.+)/gim, '<ul><ul><li>$1</li></ul></ul>')
	.r(/^\x20{4}\*\s(.+)/gim, '<ul><ul><ul><li>$1</li></ul></ul></ul>')
	.r(/<\/ul>(\s+)<ul>/g, '')
	.rA('<\/ul><\/ul><ul><ul>', '')
	.rA('<\/ul><ul>', '')

	// OL LI
	.r(/^\d\.\s(.+)/gim, '<ol><li>$1</li></ol>')
	.r(/^\x20{2}\d\.\s(.+)/gim, '<ol><ol><li>$1</li></ol></ol>')

	.r(/<\/li><\/ol>\n<ul><ul><li>(.*)<\/ul><\/ul>/g, '<\/li><ul><li>$1</ul></ol>')

	.r(/<\/ol>(\s+)<ol>/g, '')
	.rA('<\/ol><ol>', '')

	// DL DD
	.r(/^\-\s(.+)/gim, '<dl><dd>$1</dd></dl>')
	.r(/^\x20{2}\-\s(.+)/gim, '<dl><dl><dd>$1</dd></dl></dl>')
	.r(/^\x20{4}\-\s(.+)/gim, '<dl><dl><dl><dd>$1</dd></dl></dl></dl>')
	.r(/<\/dl>(\s+)<dl>/g, '')
	.rA('<\/dl><\/dl><dl><dl>', '')
	.rA('<\/dl><dl>', '')

	/*** FORMAT ***/
	.r(/\*\*\*([^\*\n]+)\*\*\*/g, '<b><i>$1</i></b>')
	.r(/\*\*([^\*\n]+)\*\*/g, '<b>$1</b>')
	.r(/\*([^\*\n]+)\*/g, '<i>$1</i>')
	.r(/~~([^~\n]+)~~/g, '<s>$1</s>')
	.r(/__([^_\n]+)__/g, '<u>$1</u>')
	.r(/\b_([^_\n]+)_\b/g, '<i>$1</i>')
	.r(/==([^=\n\"\'\\\/]+)==/g, '<mark>$1</mark>')
	.r(/\+\+([^\+\n]+)\+\+/g, '<ins>$1</ins>')

	// EMOJIS
	.r(/(\B|\s+):([^:\s]+):(\B)/g, function(input){

		input = input.split(':')

		return input[0] + EMOJIS[input[1]] + input[2]
	})

	/*** DIVS ***/
	.r(/{% hint (\w+) %}([\w\W]*){% endhint %}/g, "<div class='$1'>$2</div>")
	.r(/{% hint style="(\w+)" %}|:::([\w\d\x20-]+)\n/g, '<div class="$1$2">')
	.r(/{% endhint %}|:::\n/g, '</div>\n')
	//.r(/:::([\w\d\x20-]+)\n([\x09-\x39\x3B-\uFFFF]+):::/gim, '<div class=$1>$2</div>')

	/*** BLOCKQUOTE ***/
	.r(/^>\x20(.+)/gm, '<blockquote>\n$1</blockquote>')
	.r(/<\/blockquote>(\s+)<blockquote>/g, '<br>')

	/*** TITLE ***/

	.r(/^(\w.+)\n==+=\n/gim, function(input){
		input = input.trim().r(/^(\w.+)\n==+=/gim, '$1')
		return '<h1 id="'+ input.toLinkCase() +'">' + input + '</h1>'
	})
	.r(/^(\w.+)\n--+-\n/gim, function(input){
		input = input.trim().r(/^(\w.+)\n--+-/gim, '$1')
		return '<h2 id="'+ input.toLinkCase() +'">' + input + '</h2>'
	})
	.r(/^#+\x20(.+)/gm, function(input) {
		var number = 0
		var output

		function index(text) {

			if(/^#+\x20/.test(text)){
				number++
				text = text.r(/^#/, '')
				index(text, number)
			}else{
				if (number == 0){
					output = text
					return;
				}
				var TITLE = text.r(/^\x20/, '')
				/* auto capitalize
				if (number < 4){ // is H1, H2 or H3
					TITLE = TITLE.toCapitalCase()
				}
				*/
				output = '<h'+number+' id="'+ TITLE.toLinkCase() +'">' + TITLE + '</h'+number+'>'
			}
		}
		index(input)

		return output
	})

	// CHECKBOX
	.r(/^\[\]\x20(.+)/gm, "<input type='checkbox' disabled> $1<br>")
	.r(/^\[x\]\x20(.+)/gim, "<input type='checkbox' disabled checked > $1<br>")

	// IMG
	.r(/\!\[([^\[\]]+)?\]\(([^\(\)]+)(\x20"[^"]+")?\)/g, function(input){
		input = input.match(/\!\[([^\[\]]+)?\]\(([^\(\)]+)(\x20"[^"]+")?\)/)

		const comilla = '"',

			alt   = input[1] ?  ' alt="' + input[1] + comilla : "",
			src   = input[2] ?  ' src="' + input[2]
				 	.rLinks() + comilla : "",
			title = input[3] ? ' title="' + input[3] + comilla : ""

		return '<img'+ src + alt + title +'>'
	})

	// A
	.r(/\[([^\[\]]+)\]\(([^\(\)]+)(\x20"[^"]+")?\)/g, function(input){
		input = input.match(/\[([^\[\]]+)\]\(([^\(\)]+)(\x20"[^"]+")?\)/)

		var display = input[1],
			comilla = '"',

			href = ' href="' + input[2]
				.rLinks()
				.r('.md', '.html') + comilla,

			title = input[3] ? ' title="' + input[3] + comilla : "",

			target = function(){
				var set = ' target="'
				return /http/.test(href)
					? set + '_blank"'
					: set + '_self"'
			}()

		return '<a'+ href + title + target + '>' + display + '</a>'
	})
	
	// HR
	.r(/(\n|^)--+-\n/g, '$1<hr>\n')

	// BR
	.r(/([^`])`\n\n`([^`])/, "$1`<br><br>`$2")
	.r(/(\n^\.\n|(\.|:|\!|\)|b>|a>)\n\n([0-9\u0041-\u005A\u0061-\u007A\u00C0-\uFFFF]|¿|<b|<(ul|ol)?!|\*|`[^`]))/g, '$2<br><br>$3')
	.r(/(\x20\x20\n|\\\n|\\n\w|(\.|:|\!|\)|b>|a>)\n([0-9\u0041-\u005A\u0061-\u007A\u00C0-\uFFFF]|¿|<b|<(ul|ol)?!|\*|`[^`]))/g, '$2<br>$3')

	// PRE
	.r(/```([^`]*)```/g, function(input){

		var display = input
			.r(/```(\w+)?\n([^`]*)```/, '$2').parseHTML()

		function getLang(){
			if(/```(\w+)\n/.test(input)){
				return input.match(/```(\w+)\n/)[1]
			}
			return ''
		}

		return '<pre class="' + getLang() + '">' + display + '</pre>'
	})

	// CODE
	.r(/`([^\n`]+)`/g, function(input){
		input = input
		.r(/`([^\n`]+)`/, '$1')
		.r(/<(\/?)i>/g, "*")
		.parseHTML()

		return '<code>' + input + '</code>'
	})
	
	// SPAN
	.r(/\[([\w\d\-\x20]+)\]\[([^\[\]]+)\]/gim, '<span class="$1">$2</span>')

	// TABLE
	.r(/\|[\|\-\x20:]+\|/g, "</thead><tbody>")
	.r(/\|[^\n]+\|/g, function (input) {
		input = input.split('|')

		let newTable = ""

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
	<h1>' + D.title +'<button id="CHANGE"><img src="'+ exROOT() +'img/dm-baseline.png"></button></h1>\
</div>\
<div id="c"><div id="d"><textarea id="inputText" style="display:none;" disabled>'
+ $('body').innerHTML +
'</textarea></div>\
<div class="markdown">\
	<div class="cont"></div>\
	<hr>\
	<p id="credits">\
		CHM ' + LANG + ' ' + VERSION + ' - Made with <3 by MatiDragon, Seemann & Yushae Raza.\
	</p>\
	<span id="ALINKS"></span>\
</div></div><style id="STYLES"></style>'

var htmlGenerated = $('#inputText').value.toMarkdown()

$('.markdown .cont').innerHTML = htmlGenerated
$('body').style.display = 'block'

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
		opcodes   : span.start + "uppercase"  + span.end,
		directives: span.start + "directives" + span.end,
		commands  : span.start + "commands"   + span.end,
		classes   : span.start + "classes"    + span.end
	}

	element.innerHTML = element.innerHTML
	.rA('\t', '    ')
	.rA('&lt;br/&gt;', "\\n")
	//Comentarios 
	.r(/(\/\/.+)/gm, enter.comments)
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
	.r(/(^|\s+)(longstring|shortstring|integer|jump_if_false|thread|create_thread|create_custom_thread|end_thread|name_thread|end_thread_named|if|then|else|hex|end|else_jump|jump|jf|print|const|while|not|wait|repeat|until|break|continue|for|gosub|goto|var|array|of|and|or|to|downto|step|call|return_true|return_false|return|ret|rf|tr|Inc|Dec|Mul|Div|Alloc|Sqr|Random|int|string|float|bool|fade|DEFINE|select_interior|set_weather|set_wb_check_to|nop)\b/gmi, "$1<span class=keywords>$2<\/span>")
	//Etiquetas
	.r(/(^|\s+)(\@+\w+|\:+\w+)/gm, "$1<span class=labels>$2<\/span>")
	.r(/(^|\s+)([A-Za-z0-9_]+\(\))/gm, "$1<span class=commands>$2<\/span>")
	//Arreglos
	.r(/(\[)([\d+]*)(\])/gmi, "$1<span class=numbers>$2<\/span>$3")
	//Opcodes
	.r(/([a-fA-F0-9]{4}\:)/gmi, enter.opcodes)
	//Numeros
	.r(/\b(\d+(x|\.)\w+)\b/gmi, enter.numbers)
	.r(/\b(true|false)\b/gmi, enter.numbers)
	.r(/((\s|\-|\,)(?!\$)(\d+)(?!\:|\@)(i|f|s|v)?)\b/gmi, enter.numbers)
	//Modelos
	.r(/(\#[^\"\'\#\s]+)/gm, "<span class='models uppercase'>$1<\/span>")
	//Clases
	.r(/\b([a-z0-9]+)\.([a-z0-9]+)/gmi, "<span class=classes>$1</span>.<span class=commands>$2</span>")
	.r(/(\w+)(\(.+\)\.)(\w+)/gmi, "<span class=classes>$1</span>$2<span class=commands>$3</span>")
	.r(/(\$\w+|\d+\@)\.([0-9A-Z_a-z]+)/gm, "$1.<span class=commands>$2</span>")
	.r(/: (\w+)\n/gm,          ": "+ enter.classes  +"\n")
	.r(/\.([0-9A-Z_a-z]+)\n/gm,"." + enter.commands +"\n")
	//Variables  
	.r(/\b(timer(a|b))\b/gmi, enter.variables)
	.r(/(\d+\@(s|v|\B)[^\w\d])/gm, enter.variables)
	.r(/(\&amp;\d+)/gim, enter.variables)
	.r(/((\x{00}|s|v)(\$[0-9A-Z_a-z]+))/gm, enter.variables)
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
		$("img", $THIS_ELEMENT).setAttribute("src", exROOT() +'img/dm-'+ X +'line.png')
	} 

	ModeLight()
		? IMAGE('out')
		: IMAGE('base')
}