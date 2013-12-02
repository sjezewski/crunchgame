
// Setup functions for generating a new game

// TODO: Mark progress in degrees in special banner

function person_to_company(game, remaining_degrees, person) {

    var callback = (function(this_game, degrees, this_person){
	    return function() {
		var data = JSON.parse(this.responseText);
		var companies = data.companies;
		var scrubbed = this_game.scrub(companies);
		console.log(this_person + ">>>>>>>>>>");
		console.log("got companies:");
		console.log(companies);		
		console.log("scrubeed companies:");
		console.log(scrubbed);



		if(scrubbed.length == 0) {
		    if (this_game.current.length != 1) {
			// If this company has only deadend people ... will have to detect in the other callback
			//			var last = this_game.current.pop();
			// I should only pop companies when I know all the people are deadends

		    }
		    console.log("going back a step ... undoing (" + this_game.current.last() + ") and retrying " + this_game.current.last());
		    this_game.deadends[this_person] = true;
		    company_to_people(this_game, degrees+1);		    
		    return
		}
		companies = scrubbed;

		var r = parseInt(Math.random()*companies.length);
		company = companies[r];
		this_game.visited[this_person] = true;
		this_game.data[this_person] = data;
		console.log("RANDOMLY CHOSE COMPANY (" + r + "):" + company);
		
		this_game.solution[game.current.last()] = company;
		this_game.current.push(company);

		console.log(degrees + " left to go");
		company_to_people(this_game, degrees);
	    }
	})(game, remaining_degrees, person);

    ajax(person + "?json=true", callback);
}


function company_to_people(game, remaining_degrees) {
    // Later I'll add an option to hop btw people

    if(remaining_degrees == 0) {
	game.setup_complete();
	return
    }

    var callback = (function(this_game, degrees, this_company){
	return function() {
	    console.log("raw:");
	    console.log(this);
	    var data = JSON.parse(this.responseText);
	    var people = data.people;
	    console.log("got people");
	    console.log(people);

	    var scrubbed = this_game.scrub(people);

	    if(scrubbed.length == 0) {
		console.log("this company is a deadend!");
		var last = this_game.current.pop();
		this_game.deadends[last] = true;
		console.log("reverting company :" + last);
		if(this_game.current.length == 0){ 
		    console.log("ERROR! Starting company is a dead end! It doesn't have sufficient degree");
		    return
		}
		company_to_people(this_game, degrees+1);
		return
		//		person_to_company(this_game,degrees+1,person);

	    }

	    people = scrubbed;

	    var r = parseInt(Math.random()*people.length);
	    var person = people[r];

	    console.log("RANDOMLY CHOSE PERSON(" + r + "):" + person);
	    this_game.visited[this_company] = true;
	    this_game.data[this_company] = data;

	    person_to_company(this_game,degrees,person);
	}
	})(game, remaining_degrees-1, game.current.last());

    ajax(game.current.last() + "?json=true", callback);


}

function merge(a,b) {
    for(var thing in b) {
	a[thing] = b[thing];
    }
    return a;
}

function new_game() {
   return new Game(gather_options());
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
    this.current = [this.options.start];
    this.generate();
}

var defaults ={
	'degrees':6,
	'any':false,
	'start':'/company/moovweb'
};

Game.prototype = {

    generate: function() {
	this.visited = {};
	this.deadends = {}; // people w no net new edges (should add companies as well)
	this.data = {};
	company_to_people(this, this.options.degrees-1);
    },
    scrub: function(vertices) {
	// Given the options for the next jump, remove steps we've already used
	var i=-1;
	var done = false;
	var lastIndex = vertices.length;
	while(!done) {
	    i++;
	    console.log("checking [" + i + "]: " + vertices[i]);
	    if(this.reject(vertices[i])) {
		console.log("removing " + i + "th entry : " + vertices[i]);
		console.log("before:");
		console.log(vertices); 
		vertices = vertices.slice(0,i).concat(vertices.slice(i+1,vertices.length));
		console.log("after:");
		console.log(vertices); 
		i--;
		lastIndex--;
	    }

	    if(i == lastIndex) {
		done = true;
	    }

	}
	return vertices;
    },

    reject: function(new_value) {
	var reject = false;
	console.log("last:" + this.current.last());
	console.log("seen before:" + this.solution[new_value]);
	if(new_value == this.current.last() || this.solution[new_value] !== undefined) {
	    console.log("rejected ... same as current");
	    console.log("rejected ... already seen this company");
	    reject = true;
	}	
	if(this.deadends[new_value] !== undefined) {
	    console.log("rejected ... " + new_value + " is a deadend");
	    reject = true;
	}

	return reject;
    },
    start: function() {
	window.location.href = this.options.start;
    },
    setup_complete: function() {
	this.setup = true;
	x$("input[name='finish']")[0].value = link_to_name(this.current.last());
	localStorage.solution = JSON.stringify(this.solution);
	x$("form")[0].submit();
    },
    setup_failed: function() {

    },
    check_progress: function() {
	
    },
    finish: function() {
	
    },
    solution: function() {
	
    },
    display: function() {
	var current = this.options.start;
	var count = this.options.degrees;
	while(count--) {
	    console.log(current + " >> " + this.solution[current]);
	    current = this.solution[current];
	}
    }
    
};


