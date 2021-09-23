for (var i = 0;i < document.getElementsByName("markdown").length;i++){ 
	var element = document.getElementsByName("markdown")[i];
	element.innerHTML = element.innerHTML
		/*** CITES ***/
		.replace(/^(>)!?(\s[\w\d].+)\n/gim, '<blockquote>$2</blockquote>')
		.replace('</blockquote><blockquote>', '<br>')
		/*** TITLES ***/
		.replace(/^(<blockquote>\s)?(######)!?(\s[\w\d].+)/gim, '$1<h6 id="$3">$3</h6>')
		.replace(/^(<blockquote>\s)?(#####)!?(\s[\w\d].+)/gim, '$1<h5 id="$3">$3</h5>')
		.replace(/^(<blockquote>\s)?(####)!?(\s[\w\d].+)/gim, '$1<h4 id="$3">$3</h4>')
		.replace(/^(<blockquote>\s)?(###)!?(\s[\w\d].+)/gim, '$1<h3 id="$3">$3</h3>')
		.replace(/^(<blockquote>\s)?(##)!?(\s[\w\d].+)/gim, '$1<h2 id="$3">$3</h2>')
		.replace(/^(<blockquote>\s)?(#)!?(\s[\w\d].+)/gim, '$1<h1 id="$3">$3</h1>')
		/*** FORMATS ***/
		.replace(/\*\*\*([\x20-\x29\x2B-\xFF]+)\*\*\*/gim, '<b><i>$1</i></b>')
		.replace(/\*\*([\x20-\x29\x2B-\xFF]+)\*\*/gim, '<b>$1</b>')
		.replace(/\*([\x20-\x29\x2B-\xFF]+)\*/gim, '<i>$1</i>')
		/*** CODES ***/
		.replace(/```(sb3|ini|fxt|csm)?([\x09-\x5F\x61-\xFF]*)```/, '<pre class="$1">$2</pre>')
		.replace(/`(sb3|ini|fxt|csm)?([\x09-\x5F\x61-\xFF]*)`/, '<code class="$1">$2</code>')
	;
}