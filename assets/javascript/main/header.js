
function show_hint() {
    var next = g.solution[window.location.pathname];
    x$("#hint span")[0].innerText = link_to_name(next);
}


function update_progress() {
    var g = load_game();

    if (g === null) {
	return
    }

    g.check_progress();

    var element = x$("progress");
    var progress = Math.floor(g.progress / g.options.degrees * 100);
    element.attr("value",progress);
    element[0].innerText = progress + "%";

}


window.addEventListener(
  'load',
  function() {
      x$("header").each(
        function() {
	    update_progress();	  
	    x$("#hint > button").on('click',show_hint);
	}
      )
  }
);