for (var i = 0;i < document.getElementsByName("sb3").length;i++){ 
	var element = document.getElementsByName("sb3")[i];
	element.innerHTML = element.innerHTML
		/*** COMMENTS ***/
		.replace(/(\/\/.+)/gm, `<hlC>$1</hlC>`)
		.replace(/(\/\*[\x09-.0-■]*\*\/)/gmi, `<hlC>$1</hlC>`)
		.replace(/(\{[\x09-z\|~-■]*\})/gmi, `<hlC>$1</hlC>`)
		/*** STRINGS ***/
		.replace(/\"([\x09-\!#-■]*)\"/gmi, `<hlS>\"$1\"<\/hlS>`)
		.replace(/\'([!-&(-■]+)\'/gmi, `<hlS>\'$1\'<\/hlS>`)
		/*** KEYWORDS ***/
		.replace(/\b(longstring|shortstring|integer|jump_if_false|thread|create_thread|create_custom_thread|end_thread|name_thread|end_thread_named|if|then|else|hex|end|else_jump|jump|jf|print|const|while|not|wait|repeat|until|break|continue|for|gosub|goto|var|array|of|and|or|to|downto|step|call|return_true|return_false|return|ret|rf|tr|Inc|Dec|Mul|Div|Alloc|Sqr|Random|int|string|float|bool|fade|DEFINE|select_interior|set_weather|set_wb_check_to|nop)\b/gmi, `<b>$1<\/b>`)
		/*** LABELS ***/
		.replace(/(\s+\@+\w+|\:+\w+)/gm, `<hlL>$1<\/hlL>`)
		/*** GOSUBS ***/
		.replace(/(\s[A-Za-z0-9_]+\(\))/gm, `<hlM>$1<\/hlM>`)
		/*** ARRAYS ***/
		.replace(/(\[)([\d+]*)(\])/gmi, `$1<hlN>$2<\/hlN>$3`)
		/*** OPCODES ***/
		.replace(/^(\s*)([a-fA-F0-9]{4}\:)/gmi, `$1<spa'uppercase'>$2<\/span>`)
		/*** HEXALES ***/
		.replace(/\b(\d+)(x|\.)(\w+)\b/gmi, `<hlN>$1$2$3<\/hlN>`)
		/*** BOOLEANS ***/
		.replace(/\b(true|false)\b/gmi, `<hlN>$1<\/hlN>`)
		/*** NUMBERS ***/
		.replace(/(\s|\-|\,|\()(?!\$)(\d+)(?!\:|\@)(i)?\b/gmi, `$1<hlN>$2$3<\/hlN>`)
		/*** MODELS ***/
		.replace(/(\#+\w+)/gm, `<hlN>$1<\/hlN>`)
		/*** CLASSES ***/
		.replace(/(Actor|Animation|Attractor|Audio|AudioStream|Blip|Boat|Button|Camera|Car|CarGenerator|CardDecks|Checkpoint|Clock|Component|Credits|Cutscene|Debugger|DecisionMaker|DecisionMakerActor|DecisionMakerGroup|DynamicLibrary|File|Fs|Fx|Game|Gang|Garage|Group|Heli|Hid|ImGui|IniFile|Input|Interior|Key|Marker|Math|Memory|Menu|Model|Mouse|Multiplayer|List|Object|ObjectGroup|Particle|Path|Pickup|Plane|Player|Rampage|Rc|Render|Restart|Screen|ScriptEvent|ScriptFire|Searchlight|Sequence|Shopping|Skip|Sound|Soundtrack|SpecialActor|Sphere|Sprite|Stat|StreamedScript|Streaming|String|StuckCarCheck|Task|Text|Texture|Trailer|Train|Txd|WeaponInfo|Weather|Widget|World|Zone)(\.)(\w+)/gmi, `<hlX>$1<\/hlX>$2<hlM>$3</hlM>`)
		/*** METHODS ***/
		.replace(/(\$\w+|\d+\@)\.([0-9A-Z_a-z]+)/gm, `$1.<hlM>$2</hlM>`)
		/*** DIRECTIVES ***/
		.replace(/(\{\$)(CLEO|OPCODE|NOSOURCE)(\s\w+\}|\})/gmi, `<hlV>$1$2$3<\/hlV>`)
		.replace(/\b(timera|timerb)\b/gmi, `<hlV>$1<\/hlV>`)
		/*** VARIABLES ***/
		.replace(/(\d+)(\@s|\@v|\@)(\:|\s|\n|\]|\.|\,||\))/gm, `<hlV>$1$2<\/hlV>$3`)
		.replace(/(\&amp\d+)/gim, `<hlV>$1<\/hlV>`)
		.replace(/(\x{00}|s|v)(\$[0-9A-Z_a-z]+)/gm, `<hlV>$1$2<\/hlV>`)
		/*** OTHERS ***/
		.replace(/(\t)/gmi, `    `)
		.replace(/^(\w|\W)/gmi, `<c></c>$1`)
		/*
			.replace(/\s(\=|\+|\-|\*|\/|\%|\=\=|\+\=|\-\=|\*\=|\/\=|\%\=|\+\+|\-\-|\<|\>|\<\=|\>\=)\s/gmi," <font class=operador>$1<\/font> ")
		*/
	;
}