<?php

/**
 * ezcsseSiteStyleGroupLink persistent object class implementation
 * 
 */
class ezcsseSiteStyleGroupLink extends eZPersistentObject
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
                                         'sitestyle_id' => array( 'name' => 'SiteStyleID',
                                                                  'datatype' => 'integer',
                                                                  'default' => 0,
                                                                  'required' => true ),
                                         'group_id' => array( 'name' => 'GroupID',
                                                              'datatype' => 'integer',
                                                              'default' => 0,
                                                              'required' => true ) ),
                      'keys' => array( 'id' ),
                      'function_attributes' => array( 'style' => 'fetchStyle' ),
                      'increment_key' => 'id',
                      'class_name' => __CLASS__,
                      'sort' => array( 'id' => 'asc' ),
                      'name' => 'ezcssesitestyle_group_link' );
    }

    /**
     * Helper function to fetch ezcsseSiteStyle object
     *
     * @return ezcsseSiteStyle
     */
    public function fetchStyle()
    {
        return ezcsseSiteStyle::fetch( $this->attribute ('sitestyle_id' ) );
    }

    /**
     * Fetches list of styles for given group ID
     *
     * @static
     * @param $groupId
     * @param bool $asObject
     * @return mixed
     */
    public static function fetchStylesByGroupID( $groupId, $asObject = true )
    {
        $siteStyleList = parent::fetchObjectList( self::definition(),
                                                  null,
                                                  array( 'group_id' => $groupId ),
                                                  null,
                                                  null,
                                                  $asObject );

        return $siteStyleList;
    }
}
