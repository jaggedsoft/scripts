<?
function short_duration($timestamp) {
	$seconds = time() - strtotime($timestamp);
	$hour = 60 * 60;
	$day = $hour * 24;
	if ( $seconds >= $day ) return add_s(floor($seconds / $day)." day");
	if ( $seconds >= $hour ) return add_s(floor($seconds / $hour)." hour");
	if ( $seconds > 59 ) return add_s(floor($seconds / 60)." min");
	return add_s($seconds." second");
}
function add_s($string) {
	if ( $string > 1 ) return $string.'s';
	return $string;
}
function millitime() {
	$microtime = microtime();
	$comps = explode(' ', $microtime);
	return sprintf('%d%03d', $comps[1], $comps[0] * 1000);
}
function percent($min,$max,$width=100) { // 50,100,100 = 50.  1,2,100 = 50.  1,2,10 = 5.
        return ($min*0.01)/($max*0.01)*intval($width);
}
