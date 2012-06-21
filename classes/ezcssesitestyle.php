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
                                                              'required' => false ),
                                         'thumbnail' => array( 'name' => 'Thumbnail',
                                                               'datatype' => 'string',
                                                               'default' => '',
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
        $siteStyle = ezcsseSiteStyle::fetchObject( self::definition(),
                                                   null, 
                                                   array( 'id' => $id ) );
        return $siteStyle;
    }

    /**
     * Fetches ezcsseSiteStyle object list
     *
     * @static
     * @param bool $asObject
     * @return mixed
     */
    public static function fetchList( $asObject = true )
    {
        $siteStyleList = parent::fetchObjectList( self::definition(),
                                                  null,
                                                  array(),
                                                  null,
                                                  null,
                                                  $asObject );

        return $siteStyleList;
    }

    /**
     * Fetches currently selected site style
     *
     * @static
     * @return mixed
     */
    public static function fetchCurrentSiteStyle()
    {
        $siteStyle = parent::fetchObject( self::definition(), null, array( 'selected' => 1 ) );

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
