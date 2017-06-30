<?php
// download a url while pretending to be a web browser
function get_data() {
	$ch = curl_init("https://poloniex.com/public?command=returnTicker");
	curl_setopt($ch,CURLOPT_HTTPHEADER, [
		'Referer: https://poloniex.com/exchange#btc_eth',
		'User-agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3095.5 Safari/537.36'
	]);
	curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
	$result = curl_exec($ch);
	curl_close($ch);
	return $result;
}
