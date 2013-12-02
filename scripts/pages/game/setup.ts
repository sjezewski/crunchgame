$("//body") {
  add_class("game setup") 

  remove("./*")
  
  log("gonna read this thing in")
  inject(read("setup.html"))

}
