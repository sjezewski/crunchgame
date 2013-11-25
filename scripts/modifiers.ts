match($path) {
  with(/\?.*?fragment=true/) {
    $fragment = "true"
  }
  with(/\?.*?json=true/) {
    $json = "true"
  }
}

