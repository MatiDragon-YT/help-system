// GLOBAL VERSION OF THE CHM
const VERSION = "1.9";

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

String.prototype.toLinkCase = function(){
	return this.toLowerCase().replace(/<(\/)?[\!\w\d\s\.,-="]+>/g, '').replace(/\s/g, '-')
}

String.prototype.parseHTML = function(){
	return this.replace(/<br>/g, '\n').replace(/</g, '&lt;').replace(/=""/g, '')
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

String.prototype.toMarkdown = function(){
	return this

	/******** LIST ********/

	// ID
	.replace(/\[([\w\d\-\x20]+)\]\[\]/gim, '<a id="$1"></a>')

	// UL LI
	.replace(/^\*\s(.+)/gim, '<ul><li>$1</li></ul>')
	.replace(/^\x20{2}\*\s(.+)/gim, '<ul><ul><li>$1</li></ul></ul>')
	.replace(/^\x20{4}\*\s(.+)/gim, '<ul><ul><ul><li>$1</li></ul></ul></ul>')
	.replace(/<\/ul>(\s+)<ul>/g, '')
	.replace(/<\/ul><\/ul><ul><ul>/g, '')
	.replace(/<\/ul><ul>/g, '')

	// OL LI
	.replace(/^\d\.\s(.+)/gim, '<ol><li>$1</li></ol>')
	.replace(/^\x20{2}\d\.\s(.+)/gim, '<ol><ol><li>$1</li></ol></ol>')

	.replace(/<\/li><\/ol>\n<ul><ul><li>(.*)<\/ul><\/ul>/g, '<\/li><ul><li>$1</ul></ol>')

	.replace(/<\/ol>(\s+)<ol>/g, '')
	.replace(/<\/ol><ol>/g, '')

	// DL DD
	.replace(/^\-\s(.+)/gim, '<dl><dd>$1</dd></dl>')
	.replace(/^\x20{2}\-\s(.+)/gim, '<dl><dl><dd>$1</dd></dl></dl>')
	.replace(/<\/dl>(\s+)<dl>/g, '')
	.replace(/<\/dl><dl>/g, '')

	/*** FORMAT ***/
	.replace(/(\s|\(|>)\*\*\*([\x20-\x29\x2B-\uFFFF]+)\*\*\*/g, '$1<b><i>$2</i></b>')
	.replace(/(\s|\(|>)\*\*([\x20-\x29\x2B-\uFFFF]+)\*\*/g, '$1<b>$2</b>')
	.replace(/(\s|\(|>)\*([\x20-\x29\x2B-\uFFFF]+)\*/g, '$1<i>$2</i>')
	.replace(/(\s|\(|>)~~([\x20-\x7D\xA0-\uFFFF]+)~~/g, '$1<s>$2</s>')
	.replace(/(\s|\(|>)__([\x20-\x5E\x60-\uFFFF]+)__/g, '$1<u>$2</u>')
	.replace(/(\s|\(|>)==([\x20-\x3C\x3E-\uFFFF]+)==/g, '$1<mark>$2</mark>')
	.replace(/(\s|\(|>)\+\+([\x20-\x2A\x2C-\uFFFF]+)\+\+/g, '$1<ins>$2</ins>')

	// EMOJIS
	.replace(/(\B|\s+):([\x21-\x39\x3B-\uFFFF]+):(\B)/g, function(input){

		input = input.split(':')

		return input[0] + EMOJIS[input[1]] + input[2]
	})

	/*** DIVS ***/
	.replace(/{% hint (\w+) %}([\w\W]*){% endhint %}/g, "<div class='$1'>$2</div>")
	.replace(/{% hint style="(\w+)" %}|:::([\w\d\x20-]+)\n/g, '<div class="$1$2">')
	.replace(/{% endhint %}|:::\n/g, '</div>\n')
	//.replace(/:::([\w\d\x20-]+)\n([\x09-\x39\x3B-\uFFFF]+):::/gim, '<div class=$1>$2</div>')

	/*** BLOCKQUOTE ***/
	.replace(/^>\x20(.+)/gim, '<blockquote>$1</blockquote>')
	.replace(/<\/blockquote>(\s+)<blockquote>/g, '<br>')

	/*** TITLE ***/

	.replace(/^(\w.+)\n==+=\n/gim, function(input){
		input = input.trim().replace(/^(\w.+)\n==+=/gim, '$1')
		return '<h1 id="'+ input.toLinkCase() +'">' + input + '</h1>'
	})
	.replace(/^(\w.+)\n--+-\n/gim, function(input){
		input = input.trim().replace(/^(\w.+)\n--+-/gim, '$1')
		return '<h2 id="'+ input.toLinkCase() +'">' + input + '</h2>'
	})
	.replace(/^#+\x20(.+)/gm, function(input) {
		var number = 0
		var output

		function index(text) {

			if(/^#+\x20/.test(text)){
				number++
				text = text.replace(/^#/, '')
				index(text, number)
			}else{
				if (number == 0){
					output = text
					return;
				}
				const TITLE = text.replace(/^\x20/, '')
				output = '<h'+number+' id="'+ TITLE.toLinkCase() +'">' + TITLE + '</h'+number+'>'
			}
		}
		index(input)

		return output
	})

	// IMG
	.replace(/\!\[([\x20-\x5A\x5C\x5E-\uFFFF]+)?\]\(([\x20-\x27\x2A-\uFFFF]+)(\s"[\w\d\s].+")?\)/g, '<img src="$2" alt="$1" title="$3">')

	// A
	.replace(
		/\[([\x20-\x5A\x5C\x5E-\uFFFF]+)\]\(([\x21-\x27\x2A-\uFFFF]+)(\x20"[\w\d\s]+")?\)/g, function(input){
			
		var display = input.match(/\[(.+)\]/)[1]
		var href   =   ' href="' + input.match(/\((.+)\)/)[1].replace(/\x20"(.+)"/, '') + '"'
		var title  =  ' title="' + getTitle() + '"'
		var target = ' target="'

		if(/http/.test(href)){
			target += '_blank"'
		}else{
			target += '_self"'
			href = href.replace(/\.md/, '.html')
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
	.replace(/(\n|^)--+-\n/g, '$1<hr>\n')

	// BR
	.replace(/(\n^\.\n|(\.|:|\!|\)|b>)\n\n(\w|\d|<b|<(ul|ol)?!|\*|`(``)?!))/g, '$2<br><br>$3')
	.replace(/(\\\n|\\n\w|(\.|:|\!|\)|b>)\n(\w|\d|<b|<(ul|ol)?!|\*|`(``)?!))/g, '$2<br>$3')

	// PRE
	.replace(/```([\x09-\x5F\x61-\uFFFF]*)```/g, function(input){

		var display = input
			.replace(/```(\w+)?\n([\x09-\x5F\x61-\uFFFF]*)```/, '$2').parseHTML()

		function getLang(){
			if(/```(\w+)\n/.test(input)){
				return input.match(/```(\w+)\n/)[1]
			}
			return ''
		}

		return '<pre class="' + getLang() + '">' + display + '</pre>'
	})

	// CODE
	.replace(/`([\x20-\x5F\x61-\uFFFF]+)`/g, function(input){
		input = input.replace(/`([\x20-\x5F\x61-\uFFFF]+)`/, '$1').parseHTML()

		return '<code>' + input + '</code>'
	})
	// SPAN
	.replace(/\[([\w\d\-\x20]+)\]\[([\x20-\x57\x59\x6B-\uFFFF]+)\]/gim, '<span class="$1">$2</span>')
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
		CHM ' + LANG + ' ' + VERSION + ' - Mada with <3 by MatiDragon, Seemann & Yushae Raza.\
	</p>\
	<span id="alinks"></span>\
</div></div>'

var htmlGenerated = $('#inputText').value.toMarkdown()

$('.markdown .cont').innerHTML = htmlGenerated
$('body').style['display'] = 'block'

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
	.replace(/(\/\/.+)/gm, "<span class=comments>$1<\/span>")
	.replace(/(\/\*[\x09-.0-¦]*\*\/)/gmi, "<span class=comments>$1<\/span>")
	.replace(/(\{[\x09-z\|~-¦]*\})/gmi, "<span class=comments>$1<\/span>")
	//Cadenas de texto
	.replace(/\"([\x09-\!#-¦]*)\"/gmi, "<span class=strings>\"$1\"<\/span>")
	.replace(/\'([!-&(-¦]+)\'/gmi, "<span class=strings>\'$1\'<\/span>")
	//Palabras Reservadas
	.replace(/(^|\s+)(longstring|shortstring|integer|jump_if_false|thread|create_thread|create_custom_thread|end_thread|name_thread|end_thread_named|if|then|else|hex|end|else_jump|jump|jf|print|const|while|not|wait|repeat|until|break|continue|for|gosub|goto|var|array|of|and|or|to|downto|step|call|return_true|return_false|return|ret|rf|tr|Inc|Dec|Mul|Div|Alloc|Sqr|Random|int|string|float|bool|fade|DEFINE|select_interior|set_weather|set_wb_check_to|nop)\b/gmi, "$1<span class=keywords>$2<\/span>")
	//Etiquetas
	.replace(/(^|\s+)(\@+\w+|\:+\w+)/gm, "$1<span class=labels>$2<\/span>")
	.replace(/(^|\s+)([A-Za-z0-9_]+\(\))/gm, "$1<span class=commands>$2<\/span>")
	//Arreglos
	.replace(/(\[)([\d+]*)(\])/gmi, "$1<span class=numbers>$2<\/span>$3")
	//Opcodes
	.replace(/([a-fA-F0-9]{4}\:)/gmi, "<span class='uppercase'>$1<\/span>")
	//Numeros
	.replace(/\b(\d+)(x|\.)(\w+)\b/gmi, "<span class=numbers>$1$2$3<\/span>")
	.replace(/\b(true|false)\b/gmi, "<span class=numbers>$1<\/span>")
	.replace(/(\s|\-|\,)(?!\$)(\d+)(?!\:|\@)(i)?\b/gmi, "$1<span class=numbers>$2$3<\/span>")
	//Modelos
	.replace(/(\#+\w+)/gm, "<span class='models uppercase'>$1<\/span>")
	//Clases
	.replace(/\b([a-z0-9]+)\.([a-z0-9]+)/gmi, "<span class=classes>$1</span>.<span class=commands>$2</span>")
	.replace(/(\w+)(\(.+\)\.)(\w+)/gmi, "<span class=classes>$1</span>$2<span class=commands>$3</span>")
	.replace(/(\$\w+|\d+\@)\.([0-9A-Z_a-z]+)/gm, "$1.<span class=commands>$2</span>")
	.replace(/: (\w+)\n/gm, ": <span class=classes>$1</span>\n")
	.replace(/\.([0-9A-Z_a-z]+)\n/gm, ".<span class=commands>$1</span>\n")
	//Directivas
	.replace(/(\{\$)(CLEO|OPCODE|NOSOURCE)(\s\w+\}|\})/gmi, "<span class=directives>$1$2$3<\/span>")
	//Variables  
	.replace(/\b(timera|timerb)\b/gmi, "<span class=variables>$1<\/span>")
	.replace(/(\d+)(\@s|\@v|\@)(\:|\s|\n|\]|\.|\,||\))/gm, "<span class=variables>$1$2<\/span>$3")
	.replace(/(\&amp;\d+)/gim, "<span class=variables>$1<\/span>")
	.replace(/(\x{00}|s|v)(\$[0-9A-Z_a-z]+)/gm, "<span class=variables>$1$2<\/span>")
	//.replace(/\s(\.|\=|\+|\-|\*|\/|\%|\=\=|\+\=|\-\=|\*\=|\/\=|\%\=|\+\+|\-\-|\<|\>|\<\=|\>\=)\s/gmi," <font class=operador>$1<\/font> ")
})
