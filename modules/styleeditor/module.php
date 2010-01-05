<?php
$Module = array( 'name' => 'eZ Style Editor',
                 'functions' => array( 'administrate', 'use' ),
                 'function' => array( 'script' => 'styleeditor.php' ) );

$ViewList = array();

$ViewList['visual'] = array( 'script' => 'visual.php',
                             'functions' => array( 'use' ),
                             'params' => array( 'NodeID', 'LanguageCode' ) );

$FunctionList = array();
$FunctionList['administrate'] = array();
$FunctionList['use'] = array();

?>
