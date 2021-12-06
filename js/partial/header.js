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