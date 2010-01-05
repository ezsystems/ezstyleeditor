<?php

$FunctionList = array();

$FunctionList['property'] = array( 'name' => 'property',
                                   'operation_types' => array( 'read' ),
                                   'call_method' => array( 'class' => 'ezcssePropertyFunctions',
                                                           'method' => 'fetchPropertyByName' ),
                                   'parameter_type' => 'standard',
                                   'parameters' => array( array( 'name' => 'name',
                                                                 'type' => 'string',
                                                                 'required' => true ) ) );

$FunctionList['list'] = array( 'name' => 'list',
                               'operation_types' => array( 'read' ),
                               'call_method' => array( 'class' => 'ezcssePropertyFunctions',
                                                       'method' => 'fetchList' ),
                               'parameter_type' => 'standard',
                               'parameters' => array() );

$FunctionList['current_style'] = array( 'name' => 'current_style',
                                        'operation_types' => array( 'read' ),
                                        'call_method' => array( 'class' => 'ezcsseSiteStyleFunctions',
                                                                'method' => 'fetchCurrentSiteStyle' ),
                                        'parameter_type' => 'standard',
                                        'parameters' => array() );
?>