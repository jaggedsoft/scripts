<?
// This file generates a server sided SVG that looks exactly like google image charts
//https://chart.apis.google.com/chart?cht=ls&chs=600x150&chls=3&chf=bg,s,00000000&chco=1976D2&chd=t:1.08586062,1.08453834,1.08155858,1.08525567,1.08567289,1.08778566,1.08594512,1.08839736,1.08659421,1.08050210,1.07525403,1.07751145,1.08025687,1.08151536,1.08129955,1.07641966,1.07170056,1.06917486,1.06761050,1.07030120,1.07150951,1.06908558&chds=1.06761050,1.08839736
$points = explode(",","1.08586062,1.08453834,1.08155858,1.08525567,1.08567289,1.08778566,1.08594512,1.08839736,1.08659421,1.08050210,1.07525403,1.07751145,1.08025687,1.08151536,1.08129955,1.07641966,1.07170056,1.06917486,1.06761050,1.07030120,1.07150951,1.06908558");
echo svg($points);
function svg($points, $width = 600, $height = 150) {
	$stroke = "#1976D2";
	$size = 4;
	if ( $min === false ) $min = min($points);
	if ( $max === false ) $max = max($points);
	$max = $max * 1.0005;
	$min = $min * 0.9995;
	$minmax = $max - $min;
	$out = '';
	$total = count($points) - 1;
	foreach ( $points as $index => $value ) {
		$scaled = $max - $value;
		$x = round(($index*0.01)/($total*0.01)*$width,1);
		$y = round(($scaled*0.01)/($minmax*0.01)*$height,1);
		$out.= "{$x} {$y} ";
	}
	$polyline = "<polyline fill='none' stroke-linejoin='round' stroke='{$stroke}' stroke-width='{$size}' points='{$out}'/>";
	return "<svg viewBox='0 0 {$width} {$height}' style='width:{$width};height:{$height}'>".$polyline."</svg>";
}
function percent($min,$max,$width=100) { // 50,100,100 = 50.  1,2,100 = 50.  1,2,10 = 5.
        return ($min*0.01)/($max*0.01)*intval($width);
}
