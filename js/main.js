// GLOBAL VERSION OF THE CHM
const VERSION = "1.3";

// GLOBAL VARS
const d = document;

String.prototype.toLinkCase = function(){
	return this.toLowerCase().replace(/<(\/)?[\!\w\d\s\.,-="]+>/g, '').replace(/\s/g, '-')
}

/** Smart selector for elements of the DOM
 * @param str : DOMString
*/
function $(str) {
	if (str.charAt(0) === '#' && !/\s/.test(str) || d.querySelectorAll(str).length === 1) { 
		return d.querySelector(str);
	}
	else {
		if(d.querySelectorAll(str).length === 0){return undefined}
		return d.querySelectorAll(str);
	}
}

/** Apply a function to all elements of the DOM
 * @param ele : DocumentElement 
 * @param func : function
*/
function apply(ele, func){
	if(ele){ 
		if('' + ele == '[object NodeList]'){ 
			for (var i = 0; i < ele.length; i++) {
				func(ele[i])
			}
		}else{  
			func(ele)
		}
	}
}

$('body').innerHTML = '\
<div id="navbar" style="background: #5a97f3;color: black;font-weight: bold;overflow: hidden;">\
	<h1 style="padding: 9px 33px;border-bottom: none;margin-bottom: 0;">'+ d.title +'</h1>\
</div>\
<textarea id="inputText" style="display:none;">'
+ $('body').innerHTML +
'</textarea>\
<div class="markdown"></div>'

$('#inputText').value = $('#inputText').value

/******** LIST ********/

/*** FORMAT ***/
.replace(/(\s|\(|>)\*\*\*([\x20-\x29\x2B-\xFF]+)\*\*\*/g, '$1<b><i>$2</i></b>')
.replace(/(\s|\(|>)\*\*([\x20-\x29\x2B-\xFF]+)\*\*/g, '$1<b>$2</b>')
.replace(/(\s|\(|>)\*([\x20-\x29\x2B-\xFF]+)\*/g, '$1<i>$2</i>')
.replace(/(\s|\(|>)\+\+([\x20-\x2A\x2C-\xFF]+)\+\+/g, '$1<ins>$2</ins>')
.replace(/(\s|\(|>)==([\x20-\x3C\x3E-\xFF]+)==/g, '$1<mark>$2</mark>')
.replace(/(\s|\(|>)~~([\x20-\x7D\xA0-\xFF]+)~~/g, '$1<s>$2</s>')

// UL LI
.replace(/^\*\s(.+)/gim, '<ul><li>$1</li></ul>')
.replace(/<\/ul>(\s+)<ul>/g, '')

// OL LI
.replace(/^\d\.\s(.+)/gim, '<ol><li>$1</li></ol>')
.replace(/<\/ol>(\s+)<ol>/g, '')

// DL DD
.replace(/^\-\s(.+)/gim, '<dl><dd>$1</dd></dl>')
.replace(/<\/dl>(\s+)<dl>/g, '')

// HR
.replace(/(\n|^)--+-\n/g, '<hr>\n')

/*** DIVS ***/
.replace(/{% hint (\w+) %}([\w\W]*){% endhint %}/g, "<div class='$1'>$2</div>")
.replace(/{% hint style="(\w+)" %}/g, '<div class=$1>')
.replace(/{% endhint %}/g, '</div>')

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
/*** BR ***/
.replace(/(\n^\.\n|(\.|:|\))\n\n(\w|\d|`(``)?!))/g, '$2<br><br>$3')
.replace(/(\\\n|\\n\w|(\.|:|\))\n(\w|\d|`(``)?!))/g, '$2<br>$3')

// IMG
.replace(/\!\[([\x20-\x5A\x5C\x5E-\xFF]+)?\]\(([\x20-\x27\x2A-\xFF]+)(\s"[\w\d\s].+")?\)/g, '<center><img src="$2" alt="$1" title="$3"></center>')

// A
.replace(
	/\[([\x20-\x5A\x5C\x5E-\xFF]+)\]\(([\x21-\x27\x2A-\xFF]+)(\x20"[\w\d\s]+")?\)/g, function(input){
		
		var display = input.match(/\[(.+)\]/)[1]
		var href = input.match(/\((.+)\)/)[1].replace(/\x20"(.+)"/, '')
		var title = getTitle()

		function getTitle(){
			if(/"(.+)"/.test(input)){
				return input.match(/"(.+)"/)[1]
			}
			return ''
		}

		return '<a href="'+href+'" title="'+title+'">'+display+'</a>'
	})

// PRE
.replace(/```([\x09-\x5F\x61-\xFF]*)```/g, function(input){

	var display = input
		.replace(/```(\w+)?\n([\x09-\x5F\x61-\xFF]*)```/, '$2')
		.replace(/</g, '&lt;')

	function getLang(){
		if(/```(\w+)\n/.test(input)){
			return input.match(/```(\w+)\n/)[1]
		}
		return ''
	}

	return '<pre class="' + getLang() + '">' + display + '</pre>'
})

// CODE
.replace(/`([\x20-\x5F\x61-\xFF]+)`/g, function(input){
	input = input
		.replace(/`([\x20-\x5F\x61-\xFF]+)`/, '$1')
		.replace(/</g, '&lt;')
		.replace(/=""/g, '')

	return '<code>' + input + '</code>'
})

// OTHERS
.replace(/\t/g, '    ')    // tab -> 4 Spaces
.replace(/\.md/g, '.html') // .md -> .html
+ '<hr><p style="line-height: 22px;font-weight: 500;font-size: 14px; color:#8899a8;">CHM EN v' + VERSION + ' - by MatiDragon & Seemann with <3 for you</p>'

$('.markdown').innerHTML = $('#inputText').value 
$('body').style['display'] = 'block'








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
	.replace(/(^|\s)(Actor|Animation|Attractor|Audio|AudioStream|Blip|Boat|Button|Camera|Car|CarGenerator|CardDecks|Checkpoint|Clock|Component|Credits|Cutscene|Debugger|DecisionMaker|DecisionMakerActor|DecisionMakerGroup|DynamicLibrary|File|Fs|Fx|Game|Gang|Garage|Group|Heli|Hid|ImGui|IniFile|Input|Interior|Key|Marker|Math|Memory|Menu|Model|Mouse|Multiplayer|List|Object|ObjectGroup|Particle|Path|Pickup|Plane|Player|Rampage|Rc|Render|Restart|Screen|ScriptEvent|ScriptFire|Searchlight|Sequence|Shopping|Skip|Sound|Soundtrack|SpecialActor|Sphere|Sprite|Stat|StreamedScript|Streaming|String|StuckCarCheck|Task|Text|Texture|Trailer|Train|Txd|WeaponInfo|Weather|Widget|World|Zone)(\.)(\w+)/gmi, "$1<span class=classes>$2<\/span>$3<span class=commands>$4</span>")
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
/* Search at TABLE
function myFunction() {
	var filter = $('#myInput').value.toUpperCase(),
		tr = $('#myTable tr'),
		td, i;

	$('#myInput').onkeydown = function (EVENT) {
		if(EVENT.keyCode === 13){//ENTER
			for (i = 0; i < tr.length; i++) {
				td = tr[i].getElementsByTagName("td")[0];
				if (td) {
					if ((td.textContent || td.innerText).toUpperCase().indexOf(filter) > -1) {
						tr[i].style.display = "";
					} else {
						tr[i].style.display = "none";
					}
				}       
			}
		}
	}
}
*/