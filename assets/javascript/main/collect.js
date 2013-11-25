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
    people[data["name"]] = data;


    for(var i = 0; i < companies.length; i++) { 
	var company = companies[i];
	console.log("compan info:");
	console.log(company);

	console.log("already seen?");
	console.log(companies[company]);

	if(companies[company] === undefined) {
	    console.log("adding company:" + company);
	    companies[company] = {};	    

	    var callback = function() {
		display(person_name, company, this.responseText);
	    }
 
  	    ajax(company +  "?fragment=true", callback);
	}
    }
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
	     function() {
		 gather_companies(person, this.responseText);
	     }
	);
    }
}

function display(person, company, raw_data) {

    var d = document.createElement("div");
    d.innerHTML = raw_data;
    container.appendChild(d);
    console.log("added " + company + " via " + person);


    //console.log("connector/connection/data");
    //    console.log(person);
    //console.log(company);
    //console.log(raw_data);

}

function initialize() {
    container = x$("#related")[0];
    people = {};
    companies = {};
    ajax(window.location.href + "?json=true",gather_people); 
}

window.addEventListener('load',initialize);
