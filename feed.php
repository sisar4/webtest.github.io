<?php
    session_start();

    $file = __DIR__ ."/dati.json";
    $result = file_get_contents($file);
    echo $result; /*e' gia' in formato json*/   

    session_destroy();
    session_abort();
?>