// Process 10+ items concurrently
'use strict';
const async = require('async');
function callTask(task, callback) {
        console.log(`processing ${task.id}`);
        return callback();
}
var objs = [];
for ( let i = 0 ; i < 100 ; ++i ) {
        objs.push({id:i});
}
let q = async.queue(callTask, 10);
q.push(objs, function(err) {
        if ( err ) console.log(err);
});
function done() {
        q.drain = null;
        console.log("..done!");
}
q.drain = done;
