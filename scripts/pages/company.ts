# Company

$("//body") {
  insert_before("div", id: "full_content") {
    move_here("//body/*")
    move_to("//body", "bottom")
    attribute("style", "display: none")
  }

  inject(read("company.html"))

  $$("#full_content") {
    $("//div[@class='info']/a") {
      $normalized_path = $path
      $normalized_path {
        replace(/(.*?)\?.*/, "$1")
      }
      attribute("href", $normalized_path)
    }

    $name = fetch("//div[@id='breadcrumbs']/span[last()]/text()")
    $("//div[@class='name']") {
      text($name)
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
      match($funding) {
        with("") {
	  remove("..")
	} else() {
	  text($funding)  
	}
      }
    }

    $("//div[@id='company_logo']//img") {
      $logo = attribute("src")
      move_to("//div[@class='logo']")
      $("//div[@class='name']") {
        attribute("class", "name redundant")
      }
    }

    $("//h2[contains(text(), 'Tags')]/following-sibling::div//a[contains(@href,'tag')]") {
      wrap("span") {
        move_to("//div[@class='tags']")
      }
    }

  }

}

match($fragment, "true") {
  $("//div[@class='company current']") {
    $fragment = inner()
  }  
}

$companies = ""

$("//a[contains(@href, '/person/') and not(contains(@href, 'edit'))]") {
  $people = $people + "\"" + fetch("./@href") + "\","
}




