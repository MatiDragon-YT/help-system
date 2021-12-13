var d = document;
/** Selector of the DOM
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

function DIRECTION(){
  var defDirection = parseInt($('html').getAttribute('cd')) || '../../';

  if (isNaN(defDirection)){
    return defDirection
  }
  var newDirection = '../';
  for (var i = 1; i < defDirection; i++) {
    newDirection += '../';
  }
  return newDirection
}

$('body').innerHTML = '\
<div style="background: #fff url(\''+ DIRECTION() +'img/logo1.png\')">\
  <div style="background: #fff url(\''+ DIRECTION() +'img/logo2.png\') no-repeat;height: 121px;max-width: 640px"></div>\
</div>\
<div id="navbar" style="background: #5a97f3;color: black;font-weight: bold;overflow: hidden;">\
  <h1 style="padding: 9px 33px;border-top: none;margin-top: 0;">'+ d.title +'</h1>\
</div><div class="markdown">' + $('body').innerHTML

$('.markdown').innerHTML = 
$('.markdown').innerHTML
/*** DIVS ***/
.replace(/{% hint (\w+) %}([\w\W]*){% endhint %}/g, "<div class='$1'>$2</div>")
.replace(/{% hint style="(\w+)" %}/g, '<div class=$1>')
.replace(/{% endhint %}/g, '</div>')
/*** CITE ***/
.replace(/^\|([A-Za-z]+(-(\d|\w)+)?)\s(.+)/gim, '<blockquote class="$1">$4</blockquote>')
.replace(/^\|\s(.+)/gim, '<blockquote>$1</blockquote>')
.replace(/<\/blockquote>(\s+)<blockquote>/g, '<br>')
/*** FORMAT ***/
.replace(/(\s|\(|>)\*\*\*([\x20-\x29\x2B-\xFF]+)\*\*\*/g, '$1<b><i>$2</i></b>')
.replace(/(\s|\(|>)\*\*([\x20-\x29\x2B-\xFF]+)\*\*/g, '$1<b>$2</b>')
.replace(/(\s|\(|>)\*([\x20-\x29\x2B-\xFF]+)\*/g, '$1<i>$2</i>')
/*** TITLE ***/
.replace(/^######\s([\x20-\x22\x24-\xFF].+)/gm, '<h6 id="$1">$1</h6>')
.replace(/^#####\s([\x20-\x22\x24-\xFF].+)/gm, '<h5 id="$1">$1</h5>')
.replace(/^####\s([\x20-\x22\x24-\xFF].+)/gm, '<h4 id="$1">$1</h4>')
.replace(/^###\s([\x20-\x22\x24-\xFF].+)/gm, '<h3 id="$1">$1</h3>')
.replace(/^##\s([\x20-\x22\x24-\xFF].+)/gm, '<h2 id="$1">$1</h2>')
.replace(/^#\s([\x20-\x22\x24-\xFF].+)/gm, '<h1 id="$1">$1</h1>')
.replace(/^---\n/gm, '<hr>\n')
.replace(/(\n^\.\n|\.\n\n(\w))/gm, '<br><br>$2')
.replace(/<p>(\s+)?<\/p>/gim, '')
.replace(/(\\\n|\\n\w|\.\n(\w))/gm, '<br>$2')
/*** LIST ***/
.replace(/^\*\s(.+)/gim, '<ul><li>$1</li></ul>')
.replace(/^_\s(.+)/gim, '<ol><li>$1</li></ol>')
.replace(/^\-\s(.+)/gim, '<dl><dd>$1</dd></dl>')
.replace(/<\/ul>(\s+)<ul>/g, '')
.replace(/<\/ol>(\s+)<ol>/g, '')
.replace(/<\/dl>(\s+)<dl>/g, '')
/*** ATTACH ***/
.replace(/\!\[([\x20-\x5A\x5C\x5E-\xFF]+)?\]\(([\x20-\x27\x2A-\xFF]+)(\s"[\w\d\s].+")?\)/g, '<center><img src="$2" alt="$1" title="$3"></center>')
.replace(/\[([\x20-\x5A\x5C\x5E-\xFF]+)\]\(([\x20-\x27\x2A-\xFF]+)(\s"[\w\d\s].+")?\)/g, '<a href="$2" title="$3">$1</a>')
/*** CODE ***/
.replace(/```(\w+|\n)?\s([\x09-\x5F\x61-\xFF]*)```/g, '<pre class="$1">$2</pre>')
.replace(/`([\x20-\x5F\x61-\xFF]+)`/g, '<code>$1</code>')
+ '<hr><p style="line-height: 22px;font-weight: 500;font-size: 14px; color:#8899a8;">CHM EN v0.3.1 - by MatiDragon & Seemann with <3 for you</p>'

var $firstElementChild = $('.markdown').firstElementChild.style

$firstElementChild['padding-top'] = 0
$firstElementChild['margin-top'] = 0
$firstElementChild['border-top'] = 0

const code = {
  sb3 : function (e){
    
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
    .replace(/(\s+)(\@+\w+|\:+\w+)/gm, "$1<span class=labels>$2<\/span>")
    .replace(/(\s)([A-Za-z]+\(\))/gm, "$1<span class=commands>$2<\/span>")
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
    .replace(/(^|\s)(Actor|Animation|Attractor|Audio|AudioStream|Blip|Boat|Button|Camera|Car|CarGenerator|CardDecks|Checkpoint|Clock|Component|Credits|Cutscene|Debugger|DecisionMaker|DecisionMakerActor|DecisionMakerGroup|DynamicLibrary|File|Fs|Fx|Game|Gang|Garage|Group|Heli|Hid|ImGui|IniFile|Input|Interior|Key|Marker|Math|Memory|Menu|Model|Mouse|Multiplayer|List|Object|ObjectGroup|Particle|Path|Pickup|Plane|Player|Rampage|Rc|Render|Restart|Screen|ScriptEvent|ScriptFire|Searchlight|Sequence|Shopping|Skip|Sound|Soundtrack|SpecialActor|Sphere|Sprite|Stat|StreamedScript|Streaming|String|StuckCarCheck|Task|Text|Texture|Trailer|Train|Txd|WeaponInfo|Weather|Widget|World|Zone)(\.)(\w+)/gmi, "<span class=classes>$2<\/span>$3<span class=commands>$4</span>")
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
    //Simbolos
    .replace(/(\t)/gmi, "    ")
    //.replace(/\s(\.|\=|\+|\-|\*|\/|\%|\=\=|\+\=|\-\=|\*\=|\/\=|\%\=|\+\+|\-\-|\<|\>|\<\=|\>\=)\s/gmi," <font class=operador>$1<\/font> ")
  }
}
/**
 * @param e : DocumentElement 
 * @param f : function */
function apply(e, f){
  if(e){ 
    if(""+e == '[object NodeList]'){ 
      for (var i = 0; i < e.length; i++) {
        f(e[i])
      }
    }else{  
      f(e)
    }
  }
}

apply($('.sb3'), code.sb3)