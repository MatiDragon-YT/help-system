/** Selector of the DOM
 * str : DOMString
*/
function $(str){
  return document.querySelectorAll(str);
}

/** 
*/
function Title(){
  const sb = 'Sanny Builder';
  var msm = '';
  switch ($('html')[0].lang || 'en') {
    case 'es' : msm = 'Ayuda del '  +sb   ;break;
    case 'pt' : msm = 'Ajuda do '   +sb   ;break;
    case 'ru' : msm = 'Справка по ' +sb   ;break;
    case 'en' :
    default   : msm = sb + ' Help'        ;break;
  }
  return msm + ': ' + (document.title || "Topic")
}

function Direction(){
  var defDirection = parseInt($('html')[0].getAttribute('cd')) || '../../';

  if (isNaN(defDirection)){
    return defDirection
  }
  var newDirection = '../';
  for (var i = 1; i < defDirection; i++) {
    newDirection += '../';
  }
  return newDirection
}

var $id = ($('html')[0].id || 'Documentation_SCM').replace(/(_)/, ' ');

document.write('\
<table height=121 cellspacing=0 cellpadding=0 width="100%">\
  <tbody>\
    <tr>\
      <td valign=top width="100%" background="'+ Direction() +'img/logo1.jpg">\
        <div style="background: url(\''+ Direction() +'img/logo2.jpg\') no-repeat;height: 121px;"></div>\
      </td>\
    </tr>\
  </tbody>\
</table>\
<table cellspacing=0 cellpadding=0 width="100%" border=0>\
  <tbody>\
  <td width="100%" height="100%" valign=top>\
    <div style="background-image: url(\''+ Direction() +'img/var.png\');background-size: contain;color: white;font-weight: bold;font-style: italic;font-family: sans-serif;text-shadow: 6px 4px 8px black;box-shadow: inset 0px 0px 12px 7px #8483f77a, 2px 3px 3px 0px #d2d2d2;border-radius: 11px;margin-bottom: 10px;">\
      <p style="padding: 8px 33px;margin: 0">'+ $id +'</p>\
    </div>\
    <table cellspacing=0 cellpadding=0 width="100%">\
      <tbody>\
        <tr>\
          <td width=5><img height="36" src="'+ Direction() +'img/mtdl.png" width="5" style="position: relative;top: -1px;"></td>\
          <td class=ntitle valign=top background="'+ Direction() +'img/mtdbg.png" height=36>'+ Title() +'</td>\
          <td width=5><img height=36 src="'+ Direction() +'img/mtdr.png" width=20 style="position: relative;top: -1px;"></td>\
        </tr>\
      </tbody>\
    </table>\
    <table cellspacing=0 cellpadding=0 width="100%">\
    <tbody>\
    <tr>\
      <td width=5 background="'+ Direction() +'img/ltd.gif"></td>\
      <td class=news valign=top>\
')