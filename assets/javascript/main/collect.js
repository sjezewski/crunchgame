function ajax(path, callback) {
    x$().xhr(path, {async: true,callback: callback});
}
function gather_companies(person_name, raw_data) {
    console.log("raw data:");
    console.log(raw_data);
    var data = JSON.parse(raw_data);
    console.log("connection data:");
    console.log(data);
    var companies = data["companies"];
    visited.people[data["name"]] = data;


    for(var i = 0; i < companies.length; i++) { 
	var company = companies[i];
	console.log("company info:");
	console.log(company);

	console.log("already seen? " + company);
	console.log(visited.companies[company] === undefined);

	if(visited.companies[company] === undefined) {
	    console.log("adding company:" + company);
	    visited.companies[company] = {displayed: false};	    

	    var callback = (function(this_person, this_company) {
		    return function() {
			console.log("got ajax data for " + this_company);
			display(this_person, this_company, this.responseText);
		    }
		})(person_name, company);
 
  	    ajax(company +  "?fragment=true", callback);
	} else {
	    console.log("new connection: " + person_name + " >> " + company);
	    if(visited.companies[company].displayed) {
		console.log("(Adding to already displayed company)");
		display_person(person_name, company);
	    } else {
		console.log("adding person connection to company display");
		if(visited.companies[company].display_callbacks === undefined) {
		    visited.companies[company].display_callbacks = [];
		}
		visited.companies[company].display_callbacks.push(
								  (function(this_person,this_company){
								      return function(){
									  display_person(this_person, this_company)
								      }
								  }
								      )(person_name, company));

	    }
	}
    }
}

function link_to_name(link) {
    var raw = link.split("/").last();
    return raw.split("-").join(" ");    
}

function gather_people() {
    var data = JSON.parse(this.responseText);
    console.log("intermediate data:");
    console.log(data);
    var people = data["people"];
    for(var i=0; i< people.length; i++) {
	var person = people[i];
	ajax(
	     person + "?json=true",
	     (function(this_person) {
		 return function(){
		     gather_companies(this_person, this.responseText);
		 }
	     })(person)
	);
    }
}

function display_person(person, company) {
    console.log("adding " + person + " to " + company);

    if(visited.companies[company].people === undefined) {
	visited.companies[company].people = {};
    }

    if(visited.companies[company].people[person] !== undefined) {
	return
    }

    visited.companies[company].people[person] = {};

    var d = document.createElement("div");
    d.setAttribute("class", "person connection");
    d.innerHTML = "<a href='" + person + "'>" + link_to_name(person) + "</a>";

    x$(visited.companies[company].element).find('.connections')[0].appendChild(d);
    var count = x$(visited.companies[company].element).find('.count')[0];
    count.innerHTML = parseInt(count.innerText) + 1; 
}

function display(person, company, raw_data) {

    var d = document.createElement("div");
    d.setAttribute("class", "company related");
    d.setAttribute("tabindex", connections++);
    d.innerHTML = raw_data;
    visited.companies[company].element = d;
    container.appendChild(d);
    console.log("added " + company + " via " + person);
    d.addEventListener('keypress', navigate);

    console.log("displayed: " + company);
    console.log(visited.companies[company]);

    display_person(person,company);

    if(visited.companies[company].display_callbacks !== undefined) {

	for(var i=0; i<visited.companies[company].display_callbacks.length; i++) {
	    console.log("calling callback");
	    visited.companies[company].display_callbacks[i]();
	}

    }
    visited.companies[company].displayed = true;
}

function navigate(event) {
    
    if (event.keyCode != 13) {
	return;
    }
    
    var company = event.target;
    var a = x$(company).find(".info a")[0];
    a.click();
}



function initialize() {
    container = x$("#related")[0];

    var company = x$(".company.current")[0];
    company.addEventListener('keypress',navigate,false);

    visited = {
	people:{},
        companies:{}
    };
    connections = 0;
    visited.companies[window.location.pathname] = {
	displayed: true,
	people: {},
	element: company,
	display_callbacks: []
    };

    ajax(window.location.href + "?json=true",gather_people); 
}



window.addEventListener(
    'load',
    function() {
	if(x$(".company.current")[0] !== undefined) {
	    initialize();
	}
    }
);
