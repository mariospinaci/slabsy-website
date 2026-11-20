<?php
// Slabsy - protegge questa cartella con nome utente e password. Si usa una volta, poi si cancella da solo.
header('X-Robots-Tag: noindex');

$dir = __DIR__;
$error = '';
$done = false;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user = trim((string) ($_POST['user'] ?? ''));
    $pass = (string) ($_POST['pass'] ?? '');
    if (!preg_match('/^[A-Za-z0-9._-]{3,32}$/', $user)) {
        $error = 'Nome utente: da 3 a 32 caratteri, solo lettere, numeri, punto e trattino.';
    } elseif (strlen($pass) < 8) {
        $error = 'La password deve avere almeno 8 caratteri.';
    } else {
        $htaccess = $dir . '/.htaccess';
        $current = is_file($htaccess) ? (string) file_get_contents($htaccess) : '';
        $current = preg_replace('/# BEGIN password.*?# END password\n?/s', '', $current);
        $block = "# BEGIN password\nAuthType Basic\nAuthName \"Slabsy test\"\n"
            . "AuthUserFile \"$dir/.htpasswd\"\nRequire valid-user\n# END password\n";
        $line = $user . ':' . password_hash($pass, PASSWORD_BCRYPT) . "\n";
        if (file_put_contents($dir . '/.htpasswd', $line) === false
            || file_put_contents($htaccess, $block . $current) === false) {
            $error = 'Non riesco a scrivere i file in questa cartella: controlla i permessi di scrittura.';
        } else {
            $done = true;
            @unlink(__FILE__);
        }
    }
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
label{display:block;margin-top:18px;font-size:14px}
input{width:100%;box-sizing:border-box;margin-top:6px;padding:14px;border-radius:12px;border:1px solid #33405a;background:#121c2e;color:#EFE9DD;font-size:16px}
button{margin-top:24px;padding:14px 26px;border:0;border-radius:999px;background:#C9A45C;color:#0B1320;font-weight:700;font-size:16px;cursor:pointer}
.err{color:#ff9d8a}
a{color:#E2C27F}
</style>
</head>
<body>
<main>
<?php if ($done) : ?>
<h1>Password impostata.</h1>
<p>Da ora la cartella chiede nome utente e password. Questo file si è cancellato da solo.</p>
<p><a href="./">Apri il sito di test</a></p>
<?php else : ?>
<h1>Proteggi la cartella di test</h1>
<p>Scegli il nome utente e la password che il browser chiederà per aprire il sito di test.</p>
<?php if ($error) : ?><p class="err"><?= htmlspecialchars($error) ?></p><?php endif; ?>
<form method="post">
<label>Nome utente<input name="user" required minlength="3" maxlength="32" autocomplete="username" value="<?= htmlspecialchars((string) ($_POST['user'] ?? '')) ?>"></label>
<label>Password (almeno 8 caratteri)<input name="pass" type="password" required minlength="8" autocomplete="new-password"></label>
<button type="submit">Imposta la password</button>
</form>
<?php endif; ?>
</main>
</body>
</html>
