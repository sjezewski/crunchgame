# The main file executed by Tritium. The start of all other files.

@import modifiers.ts

match(inferred_content_type()) {
  with(/html/) {
    html("UTF-8") {
      
      @import html.ts
    }

  }
  else() {
    log("Passing through " + $content_type + " unmodified.")
  }
}

@import post_modifiers.ts
