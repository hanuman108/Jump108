// TODO: Put this in common util file.
var util = util || {};

util.getUrlParam = function(name) {
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec( window.location.href );
	if( results == null ){
		return "";
	}else{
		return results[1];
	}
}