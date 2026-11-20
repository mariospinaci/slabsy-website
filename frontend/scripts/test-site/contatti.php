<?php
// Slabsy - invio del modulo contatti dall'hosting (versione statica)
header('Content-Type: application/json; charset=utf-8');
header('X-Robots-Tag: noindex');

const OWNER = '__EMAIL__';
const TOPICS = [
    'product' => 'Informazioni prodotto',
    'labels' => 'Label',
    'shims' => 'Spessori su misura',
    'other' => 'Altro',
];

function out(int $code, array $data): void
{
    http_response_code($code);
    echo json_encode($data);
    exit;
}

function len(string $s): int
{
    return function_exists('mb_strlen') ? mb_strlen($s, 'UTF-8') : strlen($s);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    out(405, ['ok' => false]);
}
$in = json_decode(file_get_contents('php://input'), true);
if (!is_array($in)) {
    out(400, ['ok' => false]);
}
if (!empty($in['website'])) {
    out(200, ['ok' => true]);
}

$name = trim(preg_replace('/[\r\n]+/', ' ', (string) ($in['name'] ?? '')));
$email = trim((string) ($in['email'] ?? ''));
$message = trim((string) ($in['message'] ?? ''));
$topic = (string) ($in['topic'] ?? 'product');
$lang = ($in['lang'] ?? 'it') === 'en' ? 'EN' : 'IT';

if (len($name) < 2 || len($name) > 80 || !filter_var($email, FILTER_VALIDATE_EMAIL)
    || len($message) < 10 || len($message) > 2000 || !isset(TOPICS[$topic])) {
    out(422, ['ok' => false]);
}

$subject = '=?UTF-8?B?' . base64_encode('Slabsy - Nuova richiesta da ' . $name) . '?=';
$body = "Nuova richiesta dal sito Slabsy\r\n\r\n"
    . "Nome: $name\r\nEmail: $email\r\nArgomento: " . TOPICS[$topic] . "\r\nLingua: $lang\r\n\r\n"
    . str_replace(["\r\n", "\r", "\n"], "\r\n", $message) . "\r\n";
$headers = 'From: Slabsy <' . OWNER . ">\r\n"
    . "Reply-To: $email\r\n"
    . "MIME-Version: 1.0\r\n"
    . "Content-Type: text/plain; charset=UTF-8\r\n"
    . 'Content-Transfer-Encoding: 8bit';

if (!mail(OWNER, $subject, $body, $headers)) {
    out(500, ['ok' => false]);
}
out(200, ['ok' => true]);
