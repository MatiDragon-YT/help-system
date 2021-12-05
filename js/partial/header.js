/** Selector of the DOM
 * @param str : DOMString
*/
function $(str) {
    var d = document;
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

document.write('\
<div style="background: #fff url(\''+ DIRECTION() +'img/logo1.png\')">\
  <div style="background: #fff url(\''+ DIRECTION() +'img/logo2.png\') no-repeat;height: 121px;max-width: 640px"></div>\
</div>\
<div style="background: #5a97f3;color: black;font-weight: bold;">\
  <h1 style="padding: 9px 33px">'+ document.title +'</h1>\
</div>\
<main class="markdown">\
')