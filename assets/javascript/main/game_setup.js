window.addEventListener(
  'load',
  function() {
      x$(".game.setup").each(
        function() {
	    x$("form")[0].addEventListener('submit', function() {
		    setup_game();
		}
	    );

	}
      );
  }
);