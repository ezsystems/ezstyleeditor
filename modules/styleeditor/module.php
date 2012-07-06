<?php
$Module = array( 'name' => 'eZ Style Editor',
                 'functions' => array( 'administrate', 'use' ),
                 'function' => array( 'script' => 'styleeditor.php' ) );

$ViewList = array();

$ViewList['visual'] = array( 'script' => 'visual.php',
                             'functions' => array( 'use' ),
                             'params' => array( 'NodeID', 'LanguageCode' ) );

$ViewList['setsitestyle'] = array( 'script' => 'setsitestyle.php',
                                   'functions' => array( 'use' ),
                                   'single_post_actions' => array( 'StoreButton' => 'Store',
                                                                   'CancelButton' => 'Cancel' ),
                                   'post_action_parameters' => array( 'Store' => array( 'SiteStyleID' => 'SiteStyleID',
                                                                                        'ContentObjectID' => 'ContentObjectID' ) ),
                                   'params' => array( 'NodeID' ) );

$ViewList['setbackground'] = array( 'script' => 'setbackground.php',
                                    'functions' => array( 'use' ),
                                    'single_post_actions' => array( 'StoreButton' => 'Store',
                                                                    'CancelButton' => 'Cancel',
                                                                    'ResetButton' => 'Reset' ),
                                    'post_action_parameters' => array( 'Store' => array( 'ContentObjectID' => 'ContentObjectID' ),
                                                                       'Reset' => array( 'ContentObjectID' => 'ContentObjectID' )),
                                    'params' => array( 'NodeID' ) );

$ViewList['setfont'] = array( 'script' => 'setfont.php',
                              'functions' => array( 'use' ),
                              'single_post_actions' => array( 'StoreButton' => 'Store',
                                                              'CancelButton' => 'Cancel',
                                                              'ResetButton' => 'Reset' ),
                              'post_action_parameters' => array( 'Store' => array( 'ContentObjectID' => 'ContentObjectID' ),
                                                                 'Reset' => array( 'ContentObjectID' => 'ContentObjectID' ) ),
                              'params' => array( 'NodeID' ) );

$FunctionList = array();
$FunctionList['administrate'] = array();
$FunctionList['use'] = array();

?>
