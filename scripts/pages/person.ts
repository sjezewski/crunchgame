$name = fetch("//div[@id='breadcrumbs']/span[last()]/text()")
$companies = ""


$("//a[contains(@href, '/company/') and not(contains(@href, 'edit'))]") {
  $companies = $companies + "\"" + fetch("./@href") + "\","
}




