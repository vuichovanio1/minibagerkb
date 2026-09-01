<?php
declare(strict_types=1);

/**
 * XML sitemap с lastmod за Google Search Console.
 * Статичен sitemap.xml на BinHost не се взима от Googlebot → PHP обход.
 * Източник: sitemap.xml (синхронизирайте lastmod и в двата файла).
 */
const SITEMAP_LASTMOD = '2026-09-01';

header('Content-Type: application/xml; charset=UTF-8');
header('Cache-Control: public, max-age=3600');
header('Last-Modified: ' . gmdate('D, d M Y H:i:s', strtotime(SITEMAP_LASTMOD . ' 00:00:00 UTC')) . ' GMT');

$file = __DIR__ . '/sitemap.xml';
if (!is_readable($file)) {
    http_response_code(500);
    exit('Sitemap unavailable');
}

readfile($file);
