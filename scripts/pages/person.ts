$name = fetch("//div[@id='breadcrumbs']/span[last()]/text()")
$companies = ""


$("//a[contains(@href, '/company/')]") {
  $companies = $companies + "\"" + fetch("./@href") + "\","
}




