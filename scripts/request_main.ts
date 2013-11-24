log("in request_main")
parse_headers() {

  match(name(), /^if\-none\-match/i) {
    log("removing cache header")
    remove()
  }

}