<?php
// download the contents of a url
// check if the contents match something
ini_set("user_agent","Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.20 Safari/537.36");
if ( check_match("http://topvideo3.com/","Deadpool") ) {
	echo "match!";
} else {
	echo "no match";
}
////////////////////////////////////
function check_match($url,$phrase) {
	$data = file_get_contents($url);
	if ( stripos($data,$phrase) !== false ) return true;
	return false;
}
