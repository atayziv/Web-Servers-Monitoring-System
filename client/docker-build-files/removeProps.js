// Usage example: node removeProps.js <file-name> <prop-1-to-remove> <prop-2-to-remove> ...

function removeProps(obj, keys) {
    if (Array.isArray(obj)) {
        obj.forEach(function (item) {
            removeProps(item, keys);
        });
    } else if (typeof obj === "object" && obj != null) {
        Object.getOwnPropertyNames(obj).forEach(function (key) {
            if (keys.indexOf(key) !== -1) delete obj[key];
            else removeProps(obj[key], keys);
        });
    }
}

// Read data
var data = require(`./${process.argv[2]}`);

// Manipulate data
removeProps(data, process.argv.slice(3));

// Output data
console.log(JSON.stringify(data));
