// Returns file modified time in hours.
function relativeTime(filename) {
    return new Promise((resolve, reject) => {
        fs.stat(filename, (err, stats) => {
            if ( err ) return resolve(0);
            if ( !stats.isFile() ) return reject(new Error('Not a file'));
            const hour = 60 * 60 * 1e3;
            //return resolve(stats.mtime);
            return resolve( ( Date.now() - new Date(stats.mtime).getTime() ) / hour );
        });
    });
}

function getTimes(filenames) {
    return Promise.allSettled(filenames.map(filename => new Promise((resolve, reject) => {
        fs.stat(filename, (err, stats) => {
            if (err) return reject(err);
            if (!stats.isFile()) return reject(new Error('Not a file'));
            return resolve({ filename, mtime: stats.mtime });
        });
    })));
}

function getTime(filename) {
    return new Promise((resolve, reject) => {
        fs.stat(filename, (err, stats) => {
            if ( err ) return resolve(0);
            if ( !stats.isFile() ) return reject(new Error('Not a file'));
            return resolve( stats.mtime );
        });
    });
}
