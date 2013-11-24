# Company



$("//body") {
  insert_before("div", id: "full_content") {
    move_here("//body/*")
    move_to("//body", "bottom")
    attribute("style", "display: none")
  }

  inject(read("company.html"))

  $$("#full_content") {
    $("//div[@id='breadcrumbs']/span[last()]") {
      move_to("//div[@class='info name']")
    }
    
    $employees = fetch("//*[@id='num_employees']/text()")
    $("//div[@class='people']/span") {
      text($employees)
    }

    $funding = fetch("//strong[contains(text(),'FUNDING TOTAL')]/../../td[last()]/strong/text()")
    $("//div[@class='funding']/span") {
      text($funding)
    }


  }

}
