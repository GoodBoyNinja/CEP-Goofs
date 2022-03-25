//JSON stringify and parse but wrapped in try catch. logs errors to the console and returns undefined if needed.

safeJSON = new function () {

    this.parse = function (text, reviver) {
        try {
            return JSON.parse(text, reviver);
        } catch (e) {
            console.error("could not JSON.parse: " + String(e));
            return undefined;
        }
        return undefined;
    };

  
    this.stringify = function (value, replacer, space) {
        try {
            return JSON.stringify(value, replacer, space);
        } catch (e) {
            console.error("could not JSON.stringify: " + String(e));
            return undefined;
        }
        return undefined;
    };


};
