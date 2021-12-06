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
.replace(/\\\n/gm, '<br>')
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
.replace(/\[([<\w\d\s="/\-\(\)\.%>@]+)\]\(([\w\d\?\=\/\\\.\-:#?&@]+)(\s"[\w\d\s].+")?\)/g, '<a href="$2" title="$3">$1</a>')
/*** CODE ***/
.replace(/```(\w+|\n)?\s([\x09-\x5F\x61-\xFF]*)```/g, '<pre class="$1">$2</pre>')
.replace(/`([\x09-\x5F\x61-\xFF]+)`/g, '<code>$1</code>')
+ '<hr><p style="line-height: 22px;font-weight: 500;font-size: 14px; color:#8899a8;">Last modified ' + document.lastModified + '</p>'

var $firstElementChild = $('.markdown').firstElementChild.style

$firstElementChild['padding-top'] = 0
$firstElementChild['margin-top'] = 0
$firstElementChild['border-top'] = 0

var $resaltar;

function codeSb3(e){
  
  e.innerHTML = e.innerHTML

  //Comentarios 
  .replace(/(\/\/.+)/gm, "<span class=comments>$1<\/span>")
  .replace(/(\/\*[\x09-.0-¦]*\*\/)/gmi, "<span class=comments>$1<\/span>")
  .replace(/(\{[\x09-z\|~-¦]*\})/gmi, "<span class=comments>$1<\/span>")
  //Cadenas de texto
  .replace(/\"([\x09-\!#-¦]*)\"/gmi, "<span class=strings>\"$1\"<\/span>")
  .replace(/\'([!-&(-¦]+)\'/gmi, "<span class=strings>\'$1\'<\/span>")
  //Palabras Reservadas
  .replace(/\b(longstring|shortstring|integer|jump_if_false|thread|create_thread|create_custom_thread|end_thread|name_thread|end_thread_named|if|then|else|hex|end|else_jump|jump|jf|print|const|while|not|wait|repeat|until|break|continue|for|gosub|goto|var|array|of|and|or|to|downto|step|call|return_true|return_false|return|ret|rf|tr|Inc|Dec|Mul|Div|Alloc|Sqr|Random|int|string|float|bool|fade|DEFINE|select_interior|set_weather|set_wb_check_to|nop)\b/gmi, "<span class=keywords>$1<\/span>")
  //Etiquetas
  .replace(/(\s+\@+\w+|\:+\w+)/gm, "<span class=labels>$1<\/span>")
  .replace(/(\s[A-Za-z]+\(\))/gm, "<span class=commands>$1<\/span>")
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
  .replace(/(Actor|Animation|Attractor|Audio|AudioStream|Blip|Boat|Button|Camera|Car|CarGenerator|CardDecks|Checkpoint|Clock|Component|Credits|Cutscene|Debugger|DecisionMaker|DecisionMakerActor|DecisionMakerGroup|DynamicLibrary|File|Fs|Fx|Game|Gang|Garage|Group|Heli|Hid|ImGui|IniFile|Input|Interior|Key|Marker|Math|Memory|Menu|Model|Mouse|Multiplayer|List|Object|ObjectGroup|Particle|Path|Pickup|Plane|Player|Rampage|Rc|Render|Restart|Screen|ScriptEvent|ScriptFire|Searchlight|Sequence|Shopping|Skip|Sound|Soundtrack|SpecialActor|Sphere|Sprite|Stat|StreamedScript|Streaming|String|StuckCarCheck|Task|Text|Texture|Trailer|Train|Txd|WeaponInfo|Weather|Widget|World|Zone)(\.)(\w+)/gmi, "<span class=classes>$1<\/span>$2<span class=commands>$3</span>")
  .replace(/(\w+)(\(.+\)\.)(\w+)/gmi, "<span class=classes>$1</span>$2<span class=commands>$3</span>")
  .replace(/(\$\w+|\d+\@)\.([0-9A-Z_a-z]+)/gm, "$1.<span class=commands>$2</span>")
  //Directivas
  .replace(/(\{\$)(CLEO|OPCODE|NOSOURCE)(\s\w+\}|\})/gmi, "<span class=directives>$1$2$3<\/span>")
  //Variables  
  .replace(/\b(timera|timerb)\b/gmi, "<span class=variables>$1<\/span>")
  .replace(/(\d+)(\@s|\@v|\@)(\:|\s|\n|\]|\.|\,||\))/gm, "<span class=variables>$1$2<\/span>$3")
  .replace(/(\&amp;\d+)/gim, "<span class=variables>$1<\/span>")
  .replace(/(\x{00}|s|v)(\$[0-9A-Z_a-z]+)/gm, "<span class=variables>$1$2<\/span>")
  //Simbolos
  .replace(/(\t)/gmi, "    ")
  //symbol3 = symbol2.replace(/\s(\=|\+|\-|\*|\/|\%|\=\=|\+\=|\-\=|\*\=|\/\=|\%\=|\+\+|\-\-|\<|\>|\<\=|\>\=)\s/gmi," <font class=operador>$1<\/font> ")
}
function codeScm(e){
  e.innerHTML = e.innerHTML

  //Comentarios 
  .replace(/(\B\;|\s\/\/)(.*)(\n)/gm, "<i class=grey-text>$1$2$3<\/i>")
  //Palabras CLaves
  .replace(/(PUBLISHER\=|DATE\=)/gmi, "<b>$1<\/b>")
  //Licks
  .replace(/(http\:\/\/|https\:\/\/)(.*)/gmi, "(<a href='$1$2''>$1$2<\/a>)")
  //Opcodes
  .replace(/(0[A-Ga-g0-9]{3})/gmi, "<a href='https://library.sannybuilder.com/#/sa/default/$1/' title='Ver en Sanny Builder Library'>$1<\/a>")
  //Parametros
  .replace(/(\=\d+|\=\-\d+|\=n)(\,|\s)/gmi, "<span class='pink-text' title='Numero de parametros'>$1<\/span><span class='grey-text text-darken-2'>$2<\/span>")
  //;%~d% = Cualquier Valor
  .replace(/(\%)(\d+|\~)(d\%)/gmi, "<b class='blue-text' title='Cualquier tipo de valor'>$1$2$3<\/b>")
  //;%~p% = Salto a una Etiqueta
  .replace(/(\%)(\d+|\~)(p\%)/gmi, "<b class='cyan-text' title='Salto a una etiqueta (Label)'>$1$2$3<\/b>")
  //;%~o% = Cualquier tipo de modelo
  .replace(/(\%)(\d+|\~)(o\%)/gmi, "<b class='teal-text' title='Cualquier tipo de modelo'>$1$2$3<\/b>")
  //;%~m% = Modelo registrado en .ide 
  .replace(/(\%)(\d+|\~)(m\%)/gmi, "<b class=''green-text'' title='Modelo registrado en .ide'>$1$2$3<\/b>")
  //;%~g% = Entrada de textos (GXT)
  .replace(/(\%)(\d+|\~)(g\%)/gmi, "<b class='yellow-text' title='Entrada de textos (GXT)'>$1$2$3<\/b>")
  //;%~x% = Guion externo (Script)
  .replace(/(\%)(\d+|\~)(x\%)/gmi, "<b class='amber-text' title='Guion externo (Script)'>$1$2$3<\/b>")
  //;%~s% = Cadena literaria (String)
  .replace(/(\%)(\d+|\~)(s\%)/gmi, "<b class='orange-text' title='Cadena literaria (String)'>$1$2$3<\/b>")
  //;%~h% = Indefinido/Desconocido
  .replace(/(\%)(\d+|\~)(h\%)/gmi, "<b class='red-text' title='Indefinido/Desconocido'>$1$2$3<\/b>")
}
function codeFxt(e){

  e.innerHTML = e.innerHTML
  //Comentarios 
  .replace(/^([0-9@-Za-z_]+)/gm, "<b class=\"green-text text-accent-3\">$1<\/b>");
}


function test(e, f){
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

test($('.sb3'), codeSb3)
test($('.scm'), codeScm)
test($('.fxt'), codeFxt)

function myFunction() {
  var input, filter, table, tr, td, i, txtValue;
  input = d.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = d.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}