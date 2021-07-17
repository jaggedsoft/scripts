> **Object.entries**
```js
for ( let [ key, value ] of Object.entries(obj) ) {
  console.log( `${ key }: ${ value }` );
}
```

> **Format decimal precision & USD values**
```js
// Automatically determine precision for USD, BTC, ETH
function autoFormat(value, isUSD = false, compact = false) {
    let func = isUSD ? usd : precision;
    if ( value <= 0.0000001 ) return func( value, 9, 9 );
    else if ( value <= 0.000001 ) return func( value, 8, 8 );
    else if ( value <= 0.00001 ) return func( value, 7, 7 );
    else if ( value <= 0.0001 ) return func( value, 6, 6 );
    else if ( value <= 0.001 ) return func( value, 5, 5 );
    else if ( value <= 0.01 ) return func( value, 4, 4 );
    else if ( value <= 0.1 ) return func( value, 3, 3 );
    else if ( value >= 1000 ) return compact ? ( isUSD ? '$' : '' ) + shortNumber(value) : func( value, 0, 0 );
    return func( value, 2, 2 );
}

// Compact notation: 123M
function shortNumber( number ) {
    return number.toLocaleString( "en-US", { notation: "compact", compactDisplay: "short" } );
}

// Format USD precision: $1,234.56
function usd( number, maxdigits = 2, mindigits = 0 ) {
    return new Intl.NumberFormat( 'en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: mindigits, maximumFractionDigits: maxdigits } ).format( number );
}

// Format decimal precision: 0.001
function precision( number ) {
    return new Intl.NumberFormat( 'en-US', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 8 } ).format( number );
}

// Get number of decimal places 
function getPrecision( num ) {
    if ( num <= 0.00000001 ) return 10;
    if ( num <= 0.0000001 ) return 9;
    if ( num <= 0.000001 ) return 8;
    if ( num <= 0.00001 ) return 7;
    if ( num <= 0.0001 ) return 6;
    if ( num <= 0.001 ) return 6;
    if ( num <= 0.01 ) return 6;
    return 2;
}
// toLocaleString("en-US", { style: "currency", currency: "USD" }); ... $12,345.67
```
> **Human Readable List: Intl.ListFormat**
```js
const books = [
    'Harry Potter',
    'Bhagavad Gita',
    'The Alchemist',
    'Birthday Girl'
]
console.info( new Intl.ListFormat('en', { style: 'long', type: 'conjunction' }).format(books) );
// Harry Potter, Bhagavad Gita, The Alchemist, and Birthday Girl
```
> **PHP formatting numbers**
```php
function shortNumber($num, $precision = 2) {
    $abs = abs($num);
    if ( $abs < 1000 ) return round($num, $precision);
    $groups = ['k','m','B','T','Q'];
    foreach ( $groups as $i => $group ) {
        $div = 1000 ** ($i + 1);
        if ( $abs < $div * 1000 ) return round($num / $div, $precision) . $group;
    }
    return number_format($num);
}
function sign($value) {
    $up = $value > 0 ? true : false;
    return "<span class='sign " . ($up ? 'green' : 'red') . "'>".($up ? '+' : '') . round($value, 2).'%';
}
function btc($value, $precision = 2) {
    return number_format($value, $precision);
}
function usd($value, $precision = 0) {
    return '$'.number_format($value, $precision);
}
function format($value, $precision = 0) {
    return number_format($value, $precision);
}
function k($num, $precision = 0) {
    if ( $num > 1000 ) return number_format($num / 1000, $precision).'k';
    return number_format($num, $precision);
}
function getPrecision($num) {
    if ( $num <= 0.00000001 ) return 8;
    if ( $num <= 0.0000001 ) return 7;
    if ( $num <= 0.000001 ) return 6;
    if ( $num <= 0.00001 ) return 5;
    if ( $num <= 0.0001 ) return 4;
    if ( $num <= 0.01 ) return 3;
    return 2;
}
function autoround($num, $add = 0) {
    $precision = getPrecision($num) + $add;
    if ( $precision > 8 ) $precision = 8;
    return round($num, $precision);
}
```

> **Destructuring Arrays/Objects Within Function Declaration**
```js
function greet( { name = 'Steve', greeting } ) {
    console.info( `${greeting}, ${name}!` )
}
greet( { name: 'Larry', greeting: 'Ahoy' } )
```

> **Automatic Exception Rejection**
```js
process.on( 'unhandledRejection', up => { throw up } )
```

> **Catastrophic Failure on Unhandled Exception**
```js
process.on( 'unhandledRejection', async ( reason, p ) => {
    console.log( 'Unhandled Rejection at:', p, 'reason:', reason );
    process.exit(1);
} );
```

> **Diminishing Returns**
```js
function diminishing_returns( val, scale ) {
    if ( val < 0 ) return -diminishing_returns( -val, scale );
    let mult = val / scale;
    let trinum = ( Math.sqrt( 8.0 * mult + 1.0 ) - 1.0 ) / 2.0;
    return trinum * scale;
}
```

> **Computed Property Names**
```js
let event = 'click'
let handlers = {
  [`on${event}`]: true
}
// Same as: handlers = { 'onclick': true }
```

> **CSS Stylesheet Injection**
```js
window.document.styleSheets[0].insertRule("#tv-toasts{display:none !important}",0);
```
> **Tampermonkey Stylesheet Override**
```js
const customInjection = (styles = '') => eval(`var css='${styles}';var style = document.createElement('style');style.type = 'text/css'; if (style.styleSheet) { style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } var headElement = document.head;headElement.appendChild(style);`);
```

> **ES6 Generators** allows us to pause the execution of the function and continue it later
```js
function *fibonacci(n, current = 0, next = 1) {
  if (n === 0) {
    return current;
  }
  yield current;
  yield *fibonacci(n-1, next, current + next);
}

let fibs = [...fibonacci(20)]
console.info(fibs);
//[0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181]
```

> **PHP MySQL examples:**
```php
    $db = new mysqli('localhost','user','password','database');
    $resource = $db->query('SELECT field FROM table WHERE 1');
    $row = $resource->fetch_assoc();
    echo "{$row['field']}";
    $resource->free();
    $db->close();
```
> **If you're grabbing more than one row:**
```php
    $db = new mysqli('localhost','user','password','database');
    $resource = $db->query('SELECT field FROM table WHERE 1');
    while ( $row = $resource->fetch_assoc() ) {
        echo "{$row['field']}";
    }
    $resource->free();
    $db->close();
```
> **With Error Handling:** If there is a fatal error the script will terminate with an error message.
```php
    // ini_set('display_errors',1); // Uncomment to show errors to the end user.
    if ( $db->connect_errno ) die("Database Connection Failed: ".$db->connect_error);
    $db = new mysqli('localhost','user','password','database');
    $resource = $db->query('SELECT field FROM table WHERE 1');
    if ( !$resource ) die('Database Error: '.$db->error);
    while ( $row = $resource->fetch_assoc() ) {
        echo "{$row['field']}";
    }
    $resource->free();
    $db->close();
```
> **Fetch a single record:** This code does not require a loop.
```php
    $db = new mysqli('localhost','user','password','database');
    $resource = $db->query('SELECT field FROM table');
    $row = $resource->fetch_assoc();
    echo "{$row['field']}";
    $resource->free();
    $db->close();
```
> **Using iterators:** Support was added with PHP 5.4
```php
    $db = new mysqli('localhost','user','password','database');
    foreach ( $db->query('SELECT * FROM table') as $row ) {
        print_r($row);//echo "{$row['field']}";
    }
    $db->close();
```

> ****
```php
// $timeframe = get('tf', '4h');
function get($key, $default = false) {
    return array_key_exists($key, $_GET) ? $_GET[$key] : $default;
}
```


> **Node MySQL examples:**
```js
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
      host     : 'example.org',
      user     : 'bob',
      password : 'secret',
    });
    connection.connect(function(err) {
      // connected! (unless `err` is set)
    });
    var post  = {id: 1, title: 'Hello MySQL'};
    var query = connection.query('INSERT INTO posts SET ?', post, function(err, result) {
      // Neat!
    });
    console.log(query.sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'
    pool.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
      if (err) throw err;
      console.log('The solution is: ', rows[0].solution);
    });
```
> **JS Stylesheet**
```js
    window.document.styleSheets[0].insertRule(line,0);
```

> **JS Percent**
```js
    function percent(min,max,width=100) {
        return (min*0.01)/(max*0.01)*parseInt(width);
    }
```

> **JS Average**
```js
    function average(array) {
        let sum = array.reduce(function(a, b) { return a + b; });
        return sum / array.length;
    }
```

> **PHP Percent**
```php
    function percent($min,$max,$width=100) { // 50,100,100 = 50.  1,2,100 = 50.  1,2,10 = 5.
            return ($min*0.01)/($max*0.01)*intval($width);
    }
```

> **PHP Sort**
```php
    uasort($markets, function($a, $b) { return $a['score'] < $b['score']; });
```

> **PHP Human Duration**
```php
function time_ago( $timestamp = 0, $now = false ) { // Accepts timestamp or date string
    if ( !is_numeric( $timestamp ) ) $timestamp = strtotime($timestamp);
    $intervals = array(
        60 * 60 * 24 * 365 => 'year',
        60 * 60 * 24 * 30  => 'month',
        60 * 60 * 24 * 7   => 'week',
        60 * 60 * 24       => 'day',
        60 * 60            => 'hour',
        60                 => 'minute',
        1                  => 'second',
    );
    if ( !$now ) $now = time();
    if ( $timestamp > $now ) return 'in the future';
    $delta = abs( $now - $timestamp );
    foreach ( $intervals as $interval => $label ) {
        if ( $delta < $interval ) continue;
        $d = round( $delta / $interval );
        if ( $d <= 1 )  $time_ago = sprintf( 'one %s ago', $label );
        else $time_ago = sprintf( '%s %ss ago', $d, $label );
        return $time_ago;
    }
}
```

> **PHP Output Buffering**
```php
if(!ob_start("ob_gzhandler")) ob_start();
//...
ob_end_flush();
```

> **Request.js POST**
```js
const options = {
    uri: 'https://discordapp.com/api/webhooks/../../',
    method: 'POST',
    json: {...}
};
request(options, function (error, response, body) {
    if ( !error && response.statusCode == 200 ) {
        //console.log(body)
    }
});
```

> **XMLHttpRequest**
```js
    function get_json(url, callback) {
        var http = new XMLHttpRequest();
        http.onreadystatechange = function() {
            if ( http.readyState == 4 && http.status == 200 ) {
                callback(http.responseText);
            }
        }
        http.open("GET", url, true);
        http.send();
    }
    
    function post_json(url, json, callback) {
        var http = new XMLHttpRequest();
        http.onreadystatechange = function() {
            if ( http.readyState == 4 && http.status == 200 ) {
                callback(http.responseText);
            }
        }
        http.open("POST", url, true);
        http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        http.send(JSON.stringify(json));
    }
```

> **Debounce**
```js
const debounce = ( funcToExecute, executeAfter ) => {
    let timer;
    return () => {
        clearTimeout( timer );
        timer = setTimeout( () => { funcToExecute.apply( this, arguments ) }, executeAfter );
    }
}
```

> **Recursive generator**
```js
function *fibonacci(n, current = 0, next = 1) {
    if ( n === 0 ) return current;
    yield current;
    yield *fibonacci( n - 1, next, current + next );
}
console.info([...fibonacci(20)]);
```

> **sleep**
```js
const sleep = ms => new Promise( res => setTimeout( res, ms ) );
```

> **get_random**
```js
function get_random( min, max ) {
    return Math.random() * ( max - min ) + min;
}
````

> **Object.assign**
```js
    Object.assign(document.querySelector(".chart-title").style,{lineHeight:"35px",fontSize:"28px",fontWeight:"bold",backgroundColor:"#444",padding:"0 4px 0 4px"});
```

Fastest Websocket Server https://github.com/uNetworking/uWebSockets
