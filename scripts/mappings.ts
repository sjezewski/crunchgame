/*
  Mappings

  Mappings are matchers that we use to determine if we should execute a
  bit of Tritium during an execution. Aka, run something when we are
  are on a certain page.

  Example starting code:
*/

match($status) {

  with(/302/) {
    log("--> STATUS: 302") # redirect: just let it go through
  }

  with(/200/) {
    log("--> STATUS: 200")

    match($path) {
      with(/\?.*?info=true/) {
        $info = "true"
      }
    }

    match($path) {
      with(/^\/$|^\/\?/) {
        log("--> Importing pages/home.ts in mappings.ts")
        @import pages/home.ts
      }
      with(/game=setup/) {
        log("--> Importing pages/game/setup.ts in mappings.ts")
        @import pages/game/setup.ts
      }
      with(/game=start/) {
        log("--> Importing pages/game/start.ts in mappings.ts")
        @import pages/game/start.ts
      }
      with(/^\/company/) {
        log("--> Importing pages/company.ts in mappings.ts")
        @import pages/company.ts
      }
      with(/^\/person/) {
        log("--> Importing pages/person.ts in mappings.ts")
        @import pages/person.ts
      }
      else() {
        log("--> No page match in mappings.ts")
      }
    }
  }

  else() {
    # not 200 or 302 response status
    log("--> STATUS: " + $status + " assuming its an error code pages/error.ts")
    @import pages/error.ts
  }

}
