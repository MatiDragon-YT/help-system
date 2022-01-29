// GLOBAL VERSION OF THE CHM
const VERSION = "1.12";

function log(value){
	console.log(value)
}

// GLOBAL VARS
var t="";
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

/** Smart selector for elements of the DOM
 * @param {DOMString}
*/
function $(element) {
	if (element.charAt(0) === '#' && !/\s/.test(element) || D.querySelectorAll(element).length === 1) { 
		return D.querySelector(element);
	}
	else {
		if(D.querySelectorAll(element).length === 0){return undefined}
		return D.querySelectorAll(element);
	}
}
const LANG = ($('html').getAttribute('lang') || 'en').toUpperCase()

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

SP.toLinkCase = function(){
	return this.toLowerCase()
	.r(/<(\/)?[\!\w\d\s\.,-="]+>/g, '')
	.rA('\s', '-')
}
/*
SP.toCapitalCase = function(){
	return this
	.r(/((^|\s)\w)/g, function(input){
		return input.toUpperCase()
	})
}
*/
SP.parseHTML = function(){
	return this
	.rA('<br>', '\n')
	.rA('<', '&lt;')
	.rA('=""', '')
}

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
	return this

	/******** LIST ********/

	// SCAPE CHAR
	.rA("\\(", "&lpar;")
	.rA("\\)", "&rpar;")

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
	.r(/==([^=\n]+)==/g, '<mark>$1</mark>')
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
	.r(/^>\x20(.+)/gim, '<blockquote>$1</blockquote>')
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

	// IMG
	.r(/\!\[([^\[\]]+)?\]\(([^\(\)]+)(\x20"[^"]+")?\)/g, '<img src="$2" alt="$1" title="$3">')

	// A
	.r(
		/\[([^\[\]]+)\]\(([^\(\)]+)(\x20"[^"]+")?\)/g, function(input){
			
		var display = input.match(/\[(.+)\]/)[1]
		var href   =   ' href="' + input.match(/\((.+)\)/)[1].r(/\x20"(.+)"/, '') + '"'
		var title  =  ' title="' + getTitle() + '"'
		var target = ' target="'

		if(/http/.test(href)){
			target += '_blank"'
		}else{
			target += '_self"'
			href = href.r(/\.md/, '.html')
		}
		
		function getTitle(){
			if(/"(.+)"/.test(input)){
				return input.match(/"(.+)"/)[1]
			}
			return ''
		}

		return '<a'+ href + title + target + '>' + display + '</a>'
	})

	// HR
	.r(/(\n|^)--+-\n/g, '$1<hr>\n')

	// BR
	.r(/([^`])`\n\n`([^`])/, "$1`<br><br>`$2")
	.r(/(\n^\.\n|(\.|:|\!|\)|b>|a>)\n\n([0-9\u0041-\u005A\u0061-\u007A\u00C0-\uFFFF]|¿|<b|<(ul|ol)?!|\*|`([^`])))/g, '$2<br><br>$3$5')
	.r(/(\x20\x20\n|\\\n|\\n\w|(\.|:|\!|\)|b>|a>)\n([0-9\u0041-\u005A\u0061-\u007A\u00C0-\uFFFF]|¿|<b|<(ul|ol)?!|\*|`([^`])))/g, '$2<br>$3$5')

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
}

$('body').innerHTML = '\
<div id="navbar">\
	<h1>'+ D.title +'</h1>\
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
	<span id="alinks"></span>\
</div></div>'

var htmlGenerated = $('#inputText').value.toMarkdown()

$('.markdown .cont').innerHTML = htmlGenerated
$('body').style.display = 'block'

apply($('a'), function(e){
	e.onmouseover = function(){
		$('#alinks').style.display = 'block'
		alinks.innerText = e.getAttribute('href')
	}

	e.onmouseleave = function(){
		$('#alinks').style.display = 'none'
	}
})

apply($('.sb3'), function(e){
	e.innerHTML = e.innerHTML

	//Comentarios 
	.r(/(\/\/.+)/gm, "<span class=comments>$1<\/span>")
	.r(/(\/\*[\x09-.0-¦]*\*\/)/gmi, "<span class=comments>$1<\/span>")
	.r(/(\{[\x09-z\|~-¦]*\})/gmi, "<span class=comments>$1<\/span>")
	//Cadenas de texto
	.r(/\"([\x09-\!#-¦]*)\"/gmi, "<span class=strings>\"$1\"<\/span>")
	.r(/\'([!-&(-¦]+)\'/gmi, "<span class=strings>\'$1\'<\/span>")
	//Palabras Reservadas
	.r(/(^|\s+)(longstring|shortstring|integer|jump_if_false|thread|create_thread|create_custom_thread|end_thread|name_thread|end_thread_named|if|then|else|hex|end|else_jump|jump|jf|print|const|while|not|wait|repeat|until|break|continue|for|gosub|goto|var|array|of|and|or|to|downto|step|call|return_true|return_false|return|ret|rf|tr|Inc|Dec|Mul|Div|Alloc|Sqr|Random|int|string|float|bool|fade|DEFINE|select_interior|set_weather|set_wb_check_to|nop)\b/gmi, "$1<span class=keywords>$2<\/span>")
	//Etiquetas
	.r(/(^|\s+)(\@+\w+|\:+\w+)/gm, "$1<span class=labels>$2<\/span>")
	.r(/(^|\s+)([A-Za-z0-9_]+\(\))/gm, "$1<span class=commands>$2<\/span>")
	//Arreglos
	.r(/(\[)([\d+]*)(\])/gmi, "$1<span class=numbers>$2<\/span>$3")
	//Opcodes
	.r(/([a-fA-F0-9]{4}\:)/gmi, "<span class='uppercase'>$1<\/span>")
	//Numeros
	.r(/\b(\d+)(x|\.)(\w+)\b/gmi, "<span class=numbers>$1$2$3<\/span>")
	.r(/\b(true|false)\b/gmi, "<span class=numbers>$1<\/span>")
	.r(/(\s|\-|\,)(?!\$)(\d+)(?!\:|\@)(i)?\b/gmi, "$1<span class=numbers>$2$3<\/span>")
	//Modelos
	.r(/(\#+\w+)/gm, "<span class='models uppercase'>$1<\/span>")
	//Clases
	.r(/\b([a-z0-9]+)\.([a-z0-9]+)/gmi, "<span class=classes>$1</span>.<span class=commands>$2</span>")
	.r(/(\w+)(\(.+\)\.)(\w+)/gmi, "<span class=classes>$1</span>$2<span class=commands>$3</span>")
	.r(/(\$\w+|\d+\@)\.([0-9A-Z_a-z]+)/gm, "$1.<span class=commands>$2</span>")
	.r(/: (\w+)\n/gm, ": <span class=classes>$1</span>\n")
	.r(/\.([0-9A-Z_a-z]+)\n/gm, ".<span class=commands>$1</span>\n")
	//Directivas
	.r(/(\{\$)(CLEO|OPCODE|NOSOURCE|INCLUDE|USE)(\s[^\}]+\}|\})/gmi, "<span class=directives>$1$2$3<\/span>")
	//Variables  
	.r(/\b(timera|timerb)\b/gmi, "<span class=variables>$1<\/span>")
	.r(/(\d+)(\@s|\@v|\@)(\:|\s|\n|\]|\.|\,||\))/gm, "<span class=variables>$1$2<\/span>$3")
	.r(/(\&amp;\d+)/gim, "<span class=variables>$1<\/span>")
	.r(/(\x{00}|s|v)(\$[0-9A-Z_a-z]+)/gm, "<span class=variables>$1$2<\/span>")
	//.r(/\s(\.|\=|\+|\-|\*|\/|\%|\=\=|\+\=|\-\=|\*\=|\/\=|\%\=|\+\+|\-\-|\<|\>|\<\=|\>\=)\s/gmi," <font class=operador>$1<\/font> ")
})
