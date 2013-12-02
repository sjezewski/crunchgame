
// Setup functions for generating a new game

// TODO: Mark progress in degrees in special banner

function person_to_company(game, remaining_degrees, person) {

    var callback = (function(this_game, degrees){
	    return function() {
		var companies = JSON.parse(this.responseText).companies;
		console.log("got companies:");
		console.log(companies);		

		var r = parseInt(Math.random()*companies.length);
		company = companies[r];
		console.log("RANDOMLY CHOSE COMPANY (" + r + "):" + company);
		game.solution[game.current] = company;
		game.current = company;

		//		company_to_people(this_game, degrees);
	    }
	})(game, remaining_degrees);

    ajax(person + "?json=true", callback);
}


function company_to_people(game, remaining_degrees) {
    // Later I'll add an option to hop btw people

    var callback = (function(this_game, degrees){
	return function() {
	    console.log("raw:");
	    console.log(this);
	    var people = JSON.parse(this.responseText).people;
	    console.log("got people");
	    console.log(people);

	    var r = parseInt(Math.random()*people.length);

	    console.log("RANDOMLY CHOSE PERSON(" + r + "):" + people[r]);

	    person_to_company(this_game,degrees,people[r]);
	}
    })(game, remaining_degrees-1);

    ajax(game.current + "?json=true", callback);


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
    var options = {};
    for(var option in defaults) {
	options[option] = x$("input[name='" + name + "']").value;
    }
    return options;
}

function Game(options) {

    this.options = merge(options, defaults);
    this.solution = {};
    this.current = this.options.start;
}

var defaults ={
	'degrees':6,
	'any':false,
	'start':'moovweb'
};

Game.prototype = {

    generate: function() {
	company_to_people(this, this.options.degrees);
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





