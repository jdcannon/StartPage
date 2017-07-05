function parseControl(control){
		var sequence = "";
		if(control.charAt(0) == ":"){
				sequence = control.substr(1);
				return cSearch(sequence);
		} else if(control.charAt(0) == ";"){
				sequence = control.substr(1);
				return scSearch(sequence);
		} else {
				sequence = control;
				return "https://duckduckgo.com/?q=" + sequence + "+";
		}
}

function cSearch(sequence){
		var base = "https://duckduckgo.com/?q="
		switch(sequence){
				case "y":
						return base + "!yt+";
						break;
				case "st":
						return "http://stackoverflow.com/questions/tagged/";
						break;
				default:
						return base + "!" + sequence + "+";
						break;
		}
}

function scSearch(sequence){
		if(sequence == "r"){
				return "http://www.reddit.com/r/";
		} else if (sequence == "44"){
				return "http://boards.4chan.org/";
		} else if (sequence.startsWith("4")){
				return "http://boards.4chan.org/" + sequence.substr(1) + "/catalog#s=";
		} else if(sequence == ";"){
				return "http://";
		} else {
				return "sequence";
		}
}

function searchBar(search){
		if (search !== ''){
			var splitTerm = search.split(' ');
			var control = splitTerm.shift().toLocaleLowerCase();
			var term = splitTerm.join(' ').trim().replace(" ", "+");
			var parsedControl = parseControl(control);
			window.location = parsedControl + term;
		}
}
