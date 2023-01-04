
# Linkage:
# https://learn.microsoft.com/en-us/powershell/scripting/learn/deep-dives/everything-about-string-substitutions?view=powershell-7.3#replace-multiple-tokens
$token_list = @{
  w3css = Get-Content -Path css\w3.css -RAW
  basic = Get-Content -Path css\basic.css -RAW
  hash  = Get-Content -Path js\hash.js -RAW
  rng   = Get-Content -Path js\rng.js -RAW
  main  = Get-Content -Path js\main.js -RAW
  vis   = Get-Content -Path js\vis.js -RAW

  leeloo = [convert]::ToBase64String((Get-Content -path leeloo.jpg -Encoding byte))
}

$html = Get-Content -Path template.html -RAW

foreach( $token in $token_list.GetEnumerator() ) {
  $pattern = '#{0}#' -f $token.key
  $html = $html -replace $pattern, $token.value
}

Set-Content  -Path index.html -Encoding Ascii -Value $html

