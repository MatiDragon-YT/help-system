/** Selector of the DOM
 * str : DOMString
*/
function $(str){
  return document.querySelectorAll(str);
}

function DIRECTION(){
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

const ID = ($('html')[0].id || 'Documentation_SCM').replace(/(_)/, ' ');
const TITLE = document.title || "Topic";
document.write('\
<div style="background: #263238 url(\''+ DIRECTION() +'img/logo1.png\')">\
  <div style="background: #263238 url(\''+ DIRECTION() +'img/logo2.png\') no-repeat;height: 121px;width: 640px"></div>\
</div>\
<div style="background: #5a97f3;color: black;font-weight: bold;">\
  <h2 style="padding: 9px 33px">'+ ID +'</h2>\
</div>\
<div style="padding: 0.67pc 2pc">\
  <h2 style="font-weight: lighter;">'+ TITLE +'</h2>\
')