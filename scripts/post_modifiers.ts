match_not($fragment, "") {
  set($fragment)
}

match_not($json, "") {

match($path) {
  with(/^\/company/) {
    set(read("pages/company.json"))
    replace("##NAME##", $name)

    $people {
      replace(/(.*?),$/, $people) {
        set($1)
      }
    }
    replace("##PEOPLE##", $people)

    
  }
  with(/^\/person/) {
    set(read("pages/person.json"))
    replace("##NAME##", $name)

    $companies {
      replace(/(.*?),$/, $companies) {
        set($1)
      }
    }
    replace("##COMPANIES##", $companies)
    
  }

}

}