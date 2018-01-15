# Node & PHP Scripts
Useful scripts https://nextlocal.net

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

> **Request.js POST**
```js
	const options = {
		uri: 'https://discordapp.com/api/webhooks/<>/<>/,
		method: 'POST',
		json: {<>}
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

> **Object.assign**
```js
    Object.assign(document.querySelector(".chart-title").style,{lineHeight:"35px",fontSize:"28px",fontWeight:"bold",backgroundColor:"#444",padding:"0 4px 0 4px"});
```

Micro Websockets https://github.com/uNetworking/uWebSockets
