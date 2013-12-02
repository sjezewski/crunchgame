
// Setup functions for generating a new game

// TODO: Mark progress in degrees in special banner

function random_person_to_company(game, remaining_degrees, from_company) {

}


function company_to_people(game, remaining_degress, from_company) {
    // Later I'll add an option to hop btw people

    var callback = (function(this_game, degrees, company){
	    return function() {
		random_crawl(this_game,degrees,company);
	    }
	})(game, remaining_degrees-1, from_company);

    ajax(from_company + "?json=true", callback);


}

function merge(a,b) {
    for(var thing in b) {
	a[thing] = b[thing];
    }
    return a;
}

function setup_game() {
    
    g = new Game(gather_options());
}

function gather_options() {
    var options = {'degrees','any','start'};
    for(var option in options) {
	options[option] = x$("input[name='" + name + "']").value;
    }
    return options;
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
	random_crawl(this, this.options.degrees, this.options.start);
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





