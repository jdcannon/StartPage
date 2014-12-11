function parseString(){
	var myform = document.getElementById("scontent");
	var value = myform.value;
	var searchE = "https://duckduckgo.com/?q="
	if (value.charAt(0) == ":") {
		var sposit = value.search(" ");
		var bang = value.slice(1, sposit).toLocaleLowerCase();
		var selectorp = bang.search(":");
		var selector = "";
		if (selectorp >=1){selector = bang.slice(selectorp + 1); bang = bang.slice(0,selectorp);};
		var sterm = value.slice(sposit + 1).replace(/\s/g, "+");
		value = sterm;
		switch (bang) {
			default:
				searchE += "!"+bang+" ";
				break;
			//Open URL
			case ":":
				searchE = "http://";
				break;
			
			//Google
			case "g":
				searchE += "!g ";
				break;
			
			//Grooveshark
			case "gs":
				searchE += "!grooveshark ";
				break;
			
			//Wikipedia
			case "w":
				searchE += "!w ";
				break;
			
			//YouTube
			case "y":
				searchE += "!yt ";
				break;
			
			//StackOverflow
			case "so":
				searchE += "!so ";
				break;
			
			//StackOverflow Tags
			case "st":
				searchE = "http://stackoverflow.com/questions/tagged/";
				break;
			
			//News
			case "news":
				searchE += "!n ";
				break;
			
			//Bing
			case "b":
				searchE += "!b ";
				break;
			//ArcGIS Resources	
			case "gis":
				searchE += "!arcgisres ";
				break;
				
			case "4chan":
				if (selector != "") {
					searchE = "http://boards.4chan.org/" + selector + "/catalog#s=";
					break;
				};
				
			case "4ca":
				if (selector != "") {
					searchE = "http://archive.moe/"+selector+"/search/text/";
					break;
				};
				searchE = "http://archive.moe/_/search/text/";
				break;
		}
	}
	window.location = searchE +value;
}