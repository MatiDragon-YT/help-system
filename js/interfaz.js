function $(element) {
	const D = document
	const xElements = D.querySelectorAll(element)
	const length = xElements.length

	if (element.charAt(0) === '#' && !/\s/.test(element) || length === 1) { 
		return D.querySelector(element);
	}
	else {
		if(length === 0){return undefined}
		return xElements;
	}
}
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

$("#menu").innerHTML = $("textarea").value
.replace(/\|\|\|(.+)\n/g, "<div class='w-100'><div class='folder'>$1</div>")
.replace(/\|\|(.+)\|(.+)\n/g, "<div class='w-100'><div class='topic' link='$2'>$1</div>")
.replace(/\|([^\|]+)\|([^\|]+)\n/g, "<span link='$2'>$1</span><br>")
.replace(/\|\|\|/g, "</div>")

apply($("[link]"), function(e){
	e.onclick = function(){
		$("iframe").setAttribute("src", e.getAttribute("link") + ".html" )
		$("#title").innerText = e.innerText
	}
})