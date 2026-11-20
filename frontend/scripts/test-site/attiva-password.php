<?php
// Slabsy - attiva la protezione con password di questa cartella. Si apre una volta, poi si cancella da solo.
header('X-Robots-Tag: noindex');

const HTPASSWD_LINE = 'slabsy:$2y$10$/MeN.xPegrDeYyHv3s2fi.xqz1rzaMKtmAYeginuHLFt/RncjJOlW';

$dir = __DIR__;
$htaccess = $dir . '/.htaccess';
$current = is_file($htaccess) ? (string) file_get_contents($htaccess) : '';
$current = preg_replace('/# BEGIN password.*?# END password\n?/s', '', $current);
$block = "# BEGIN password\nAuthType Basic\nAuthName \"Slabsy test\"\n"
    . "AuthUserFile \"$dir/.htpasswd\"\nRequire valid-user\n# END password\n";
$done = file_put_contents($dir . '/.htpasswd', HTPASSWD_LINE . "\n") !== false
    && file_put_contents($htaccess, $block . $current) !== false;
if ($done) {
    @unlink(__FILE__);
}
?>
<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Slabsy - Password della cartella di test</title>
<style>
body{margin:0;background:#0B1320;color:#EFE9DD;font-family:Arial,sans-serif;line-height:1.5}
main{max-width:440px;margin:0 auto;padding:64px 20px}
.err{color:#ff9d8a}
a{color:#E2C27F}
</style>
</head>
<body>
<main>
<?php if ($done) : ?>
<h1>Password attivata.</h1>
<p>Da ora la cartella chiede nome utente e password. Questo file si è cancellato da solo.</p>
<p><a href="./">Apri il sito di test</a></p>
<?php else : ?>
<h1 class="err">Password non attivata.</h1>
<p>Non riesco a scrivere i file in questa cartella: controlla i permessi di scrittura.</p>
<?php endif; ?>
</main>
</body>
</html>
