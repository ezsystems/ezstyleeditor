<?php

/**
 * ezcsseSiteStyleGroup persistent object class implementation
 * 
 */
class ezcsseSiteStyleGroup extends eZPersistentObject
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
                                                          'required' => true ) ),
                      'keys' => array( 'id' ),
                      'function_attributes' => array( 'style_list' => 'fetchStyleList' ),
                      'increment_key' => 'id',
                      'class_name' => __CLASS__,
                      'sort' => array( 'id' => 'asc' ),
                      'name' => 'ezcssesitestyle_group' );
    }

    /**
     * Fetches ezcsseSiteStyleGroup object by given ID
     *
     * @param integer $id
     * @return ezcsseSiteStyleGroup
     */
    public static function fetch( $id )
    {
        $siteStyle = parent::fetchObject( self::definition(),
                                          null,
                                          array( 'id' => $id ) );
        return $siteStyle;
    }

    /**
     * Helper function to fetch list of site styles associated with current group
     *
     * @return mixed
     */
    public function fetchStyleList()
    {
        $siteStyleList = array();

        foreach ( ezcsseSiteStyleGroupLink::fetchStylesByGroupID( $this->attribute( 'id' ) ) as $siteStyleLink )
        {
            $siteStyleList[] = $siteStyleLink->attribute( 'style' );
        }

        return $siteStyleList;
    }
}
