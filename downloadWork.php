<?
header('Content-Type: application/json');
$apiKey = 'gemoroy';
$api = $_GET['api'];
if($api == $apiKey) {
    $dir = __DIR__; // или укажите путь к нужной области
    $folders = [];

    foreach (scandir($dir) as $item) {
        if ($item === '.' || $item === '..') continue;
        if (is_dir($dir . DIRECTORY_SEPARATOR . $item)) {
            
            if(!preg_match("/task/",$item)) continue;
            else{

                $folders[] = $item;
            }
        }
    }
    echo json_encode($folders, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
}
