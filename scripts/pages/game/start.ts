$("//body") {
  add_class("game start") 
  remove("./*")

  inject(read("start.html"))
  
  url($path) {
    $start = param("start")
    $finish = param("finish")
    $degrees = param("degrees")
  }

  $("//form") {

    attribute("action", "/company/" + $finish)

    $("//input[@name='start']") {
      attribute("value", $start)
    }

    $("//input[@name='finish']") {
      attribute("value", $finish)
    }

    $("//input[@name='degrees']") {
      attribute("value", $degrees)
    }

  }  

  

}
