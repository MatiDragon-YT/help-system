for (let i = 0;i < document.getElementsByName("scm").length;i++) { 
	var element = document.getElementsByName("scm")[i];
	element.innerHTML = element.innerHTML
		/*** HEADER ***/
		.replace(/(\B\;|\s\/\/)(.*)(\n)/gm, "<i class=grey-text>$1$2$3<\/i>")
		.replace(/(PUBLISHER\=|DATE\=)/gmi, "<b>$1<\/b>")
		.replace(/(http\:\/\/|https\:\/\/)(.*)/gmi, "(<a href='$1$2''>$1$2<\/a>)")
		.replace(/(0[A-Ga-g0-9]{3})/gmi, "<a href='https://library.sannybuilder.com/#/sa/default/$1/'>$1<\/a>")
		/*** VALUES ***/
		.replace(/(\=\d+|\=\-\d+|\=n)(\,|\s)/gmi, "<span class='pink-text'>$1<\/span><span class='grey-text text-darken-2'>$2<\/span>")
		.replace(/(\%)(\d+|\~)(d\%)/gmi, "<b class='blue-text'>$1$2$3<\/b>")
		.replace(/(\%)(\d+|\~)(p\%)/gmi, "<b class='cyan-text'>$1$2$3<\/b>")
		.replace(/(\%)(\d+|\~)(o\%)/gmi, "<b class='teal-text'>$1$2$3<\/b>")
		.replace(/(\%)(\d+|\~)(m\%)/gmi, "<b class=''green-text'>$1$2$3<\/b>")
		.replace(/(\%)(\d+|\~)(g\%)/gmi, "<b class='yellow-text'>$1$2$3<\/b>")
		.replace(/(\%)(\d+|\~)(x\%)/gmi, "<b class='amber-text'>$1$2$3<\/b>")
		.replace(/(\%)(\d+|\~)(s\%)/gmi, "<b class='orange-text'>$1$2$3<\/b>")
		.replace(/(\%)(\d+|\~)(h\%)/gmi, "<b class='red-text'>$1$2$3<\/b>")
	;
}