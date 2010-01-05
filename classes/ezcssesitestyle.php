<?php

/**
 * ezcsseSiteStyle persistent object class implementation
 * 
 */
class ezcsseSiteStyle extends eZPersistentObject
{
    /**
     * Constructor
     * 
     * @param array $row
     */
    public function __construct( $row = array() )
    {
        parent::__construct( $row );
    }

    /**
     * Field list definition for persistent object
     * 
     * @return array
     */
    public static function definition()
    {
        return array( 'fields' => array( 'id' => array( 'name' => 'ID',
                                                        'datatype' => 'integer',
                                                        'default' => 0,
                                                        'required' => true ),
                                         'name' => array( 'name' => 'Name',
                                                          'datatype' => 'string',
                                                          'default' => '',
                                                          'required' => true ),
                                         'current_version' => array( 'name' => 'CurrentVersion',
                                                                     'datatype' => 'integer',
                                                                     'default' => 0,
                                                                     'required' => true ),
                                         'selected' => array( 'name' => "Selected",
                                                              'datatype' => 'integer',
                                                              'default' => 0,
                                                              'required' => false ) ),
                      'keys' => array( 'id' ),
                      'function_attributes' => array( 'version' => 'fetchCurrentVersion',
                                                      'style' => 'fetchCurrentStyleDef' ),
                      'increment_key' => 'id',
                      'class_name' => __CLASS__,
                      'sort' => array( 'id' => 'asc' ),
                      'name' => 'ezcssesitestyle' );
    }

    /**
     * Fetches ezcsseSiteStyle object by given ID
     * 
     * @param integer $id
     * @return ezcsseSiteStyle
     */
    public static function fetch( $id )
    {
    	$siteStyle = ezcsseSiteStyle::fetchObject( ezcsseSiteStyle::definition(), 
                                                   null, 
                                                   array( 'id' => $id ) );
        return $siteStyle;
    }
    
    /**
     * Fetches current version object
     * 
     * @return ezcsseSiteStyleVersion|null
     */
    public function fetchCurrentVersion()
    {        
        $version = ezcsseSiteStyleVersion::fetchObject( ezcsseSiteStyleVersion::definition(), 
                                                        null, 
                                                        array( 'version' => $this->attribute( 'current_version' ),
                                                               'sitestyle_id' => $this->attribute( 'id' ) ) );
        return $version;
    }

    /**
     * Fetches current CSS style definition
     * 
     * @return ezcsseSiteStyleDefinition|null
     */
    public function fetchCurrentStyleDef()
    {
        $styleDefinition = ezcsseSiteStyleDefinition::fetchObject( ezcsseSiteStyleDefinition::definition(), 
                                                                   null, 
                                                                   array( 'version' => $this->attribute( 'current_version' ),
                                                                          'sitestyle_id' => $this->attribute( 'id' ) ) );
        return $styleDefinition;
    }
}

?>