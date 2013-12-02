window.addEventListener(
  'load',
  function() {
      x$(".game.setup").each(
        function() {
	    x$("form")[0].addEventListener('submit', function(e) {
		    if(typeof(g) == "undefined") {
			g = new_game();
		    }

		    if(g.setup) {
			return true;
		    }

		    e.preventDefault();
		    return false;
		}
	    );

	}
      );
  }
);