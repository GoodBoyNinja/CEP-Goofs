/* If you are making custom html elements that emulate sliders, checkboxes or other types of controllers,
you might end up with creating custom event listeners, much like existing "click" and "mouseIn" ones.
creating a custom listeners collection helps clarity when dealing with multiple ones
this syntax is much cleaner and ommits the need to loop through a collection of functions for each event.
examples at the end of the file */

this.Listeners = class {
        constructor(self) {
            this.array = [];
            this.self = self || null;
        }

        add(func) {
            if (typeof func === 'function') {
                this.array.push(func);
            } else {
                console.warn("Tried to add a non-function to a listeners array");
            }
        }

        execute() {
            this.array.forEach(f => f.apply(this.self));
        }

        fire() {
            this.execute.apply(this, arguments);
         }
        run() {
            this.execute.apply(this, arguments);
         }

        remove(func) {
            var index = this.array.indexOf(func);
            if (index > -1) {
                this.array.splice(index, 1);
            }
        }
};



//usage

// declate
var clickListeners = new Listeners() // pass in 'this' to give the context of the current object

// add however many listeners you want
clickListeners.add( function(){ console.log('you clicked' });
clickListeners.add( function(){ console.log('therefore you are beautiful' });
                               
// in the context you want all events to fire, use .fire(), .execute() or .run()
clickListeners.fire(); 
                               
                               
