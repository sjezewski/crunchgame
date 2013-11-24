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
      match($employees, "") {
        remove("..")
      } else() {
        text($employees)
      }
    }

    $founded = fetch("//td[text()='Founded']/following-sibling::td/text()")
    log("founded?" + $founded)
    $("//div[@class='founded']/span") {
      match($founded) { #, "") {
        with("") {
          remove("..")
        } else() {
          text($founded)
        }
      }
    }

    $funding = fetch("//strong[contains(text(),'FUNDING TOTAL')]/../../td[last()]/strong/text()")
    $("//div[@class='funding']/span") {
      text($funding)
    }

    $("//div[@id='company_logo']//img") {
      move_to("//div[@class='info logo']")
    }

    $("//h2[contains(text(), 'Tags')]/following-sibling::div//a[contains(@href,'tag')]") {
      wrap("span") {
        move_to("//div[@class='info tags']")
      }
    }


  }

}
