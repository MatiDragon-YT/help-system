/** Selector of the DOM
 * str : DOMString
*/
function $(str){
  return document.querySelectorAll(str);
}
function navBar(str){
  const sb = 'Sanny Builder';
  switch (str) {
    case 'es' : return 'Ayuda del '  +sb   ;break;
    case 'pt' : return 'Ajuda do '   +sb   ;break;
    case 'ru' : return 'Справка по ' +sb   ;break;
    case 'en' :
    default   : return sb + ' Help'        ;break;
  }
}

var $title = document.title || "Topic";
var $id = ($('html')[0].id || 'Documentation_SCM').replace(/(_)/, ' ');
var $lang = $('html')[0].lang || 'en';
var $rsc = $('html')[0].getAttribute('path') || '../../'

document.write('\
<table height=121 cellspacing=0 cellpadding=0 width="100%">\
  <tbody>\
    <tr>\
      <td valign=top width="100%" background="'+ $rsc +'img/logo1.jpg">\
        <div style="background: url(\''+ $rsc +'img/logo2.jpg\') no-repeat;height: 121px;"></div>\
      </td>\
    </tr>\
  </tbody>\
</table>\
<table cellspacing=0 cellpadding=0 width="100%" border=0>\
  <tbody>\
  <td width="100%" height="100%" valign=top>\
    <div style="background-image: url(\''+ $rsc +'img/var.png\');background-size: contain;color: white;font-weight: bold;font-style: italic;font-family: sans-serif;text-shadow: 6px 4px 8px black;box-shadow: inset 0px 0px 12px 7px #8483f77a, 2px 3px 3px 0px #d2d2d2;border-radius: 11px;margin-bottom: 10px;">\
        <p style="padding: 8px 33px;margin: 0">'
        +(
          $id
        )+
        '</p>\
    </div>\
    <table cellspacing=0 cellpadding=0 width="100%">\
      <tbody>\
        <tr>\
          <td width=5><img height="36" src="'+ $rsc +'img/mtdl.png" width="5" style="\
    position: relative;\
    top: -1px;\
"></td>\
          <td class=ntitle valign=top background="'+ $rsc +'img/mtdbg.png" height=36>'
          +(
            navBar($lang) + ': ' + $title
          )+
          '</td>\
          <td width=5><img height=36\
            src="'+ $rsc +'img/mtdr.png"\
      width=20 style="\
    position: relative;\
    top: -1px;\
"></td></tr></tbody>\
</table>\
<table cellspacing=0 cellpadding=0 width="100%">\
  <tbody>\
  <tr>\
    <td width=5 background="'+ $rsc +'img/ltd.gif"></td>\
    <td class=news valign=top>\
')