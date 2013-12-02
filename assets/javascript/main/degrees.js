
// Setup functions for generating a new game


function random_crawl(from_company) {
    // Later I'll add an option to hop btw people
    
}

function merge(a,b) {
    for(var thing in b) {
	a[thing] = b[thing];
    }
    return a;
}

function start_game(options) {
    g = new Game(options);
}


function Game(options) {
    var defaults = {
	'degrees':6,
	'any':false,
	'start':'moovweb'
    };

    this.options = merge(defaults,options);
    this.solution = {};
}

Game.prototype = {
    generate: function() {

	var current = this.start;
	var remaining = this.options.degrees;

	while(remaining--) {
	    var next = random_crawl(current);
	    this.solution[current] = next;
	    next = current;
	}

    },
    start: function() {
	window.location.href = this.start;
    },
    finish: function() {
	
    },
    solution: function() {
	
    },
    display: function() {

    }
    
};





