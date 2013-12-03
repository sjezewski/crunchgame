$('./body') {
  inject_top(read('header.html'))  

  log("COOOOKKKKKKIIIEEEE");
  log($cookie)

  match(fetch_cookie("game_in_progress"),"true") {
    $("//header") {
      add_class("game_in_progress")
    }
  }

  $("//span[@id='banner']") {
    text("Find: " + fetch_cookie("endpoint"))
  }


}
