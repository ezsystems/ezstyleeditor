<?php

class ezcsseSiteStyleDefinition extends eZPersistentObject
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
     * @static
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
                                                                  'required' => true,
                                                                  'foreign_class' => 'ezcsseSiteStyle',
                                                                  'foreign_attribute' => 'id',
                                                                  'multiplicity' => '1..*' ),
                                         'style' => array( 'name' => 'Style',
                                                           'datatype' => 'string',
                                                           'default' => '',
                                                           'required' => false ),
                                         'version' => array( 'name' => 'Version',
                                                             'datatype' => 'integer',
                                                             'default' => 0,
                                                             'required' => true ) ),
                      'keys' => array( 'id' ),
                      'function_attributes' => array( 'style_object' => 'fetchStyleObject',
                                                      'css' => 'fetchStyleObjectAsCSS' ),
                      'increment_key' => 'id',
                      'class_name' => __CLASS__,
                      'sort' => array( 'id' => 'asc' ),
                      'name' => 'ezcssesitestyle_definition' );
    }

    /**
     * Returns a ezcsseStyle object for current style definition
     * 
     * @return ezcsseStyle 
     */
    public function fetchStyleObject()
    {
        $style = ezcsseStyle::createFromXML( $this->attribute( 'style' ) );
        
        return $style;
    }
    
    /**
     * Returns a CSS string for current style definition
     * 
     * @return string A CSS string
     */
    public function fetchStyleObjectAsCSS()
    {
        return $this->attribute('style_object')->toCSS();
    }
}

?>