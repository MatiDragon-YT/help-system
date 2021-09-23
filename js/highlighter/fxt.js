for (var i = 0;i < document.getElementsByName("fxt").length;i++) { 
	var element = document.getElementsByName("fxt")[i];
	element.innerHTML = element.innerHTML
		/*** KEY OF TEXT ***/
		.replace(/^([0-9@-Za-z_]+)/gm, "<b class=\"green-text text-accent-3\">$1<\/b>")
	;
}