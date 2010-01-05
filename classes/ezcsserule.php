<?php

/**
 * ezcsseRule class definition
 * 
 */
class ezcsseRule
{
    /**
     * Stores object attributes
     * 
     * @private
     * @var array Contains object attributes
     */
    private $attributes = array();

    /**
     * Constructor. Initializes properties, selector and alias attributes
     *  
     */
    public function __construct()
    {
        $this->attributes['properties'] = array();
        $this->attributes['selector'] = false;
        $this->attributes['alias'] = false;
    }

    /**
     * Sets object attribute value for given name
     * 
     * @param string $name
     * @param mixed $value
     */
    public function setAttribute( $name, $value )
    {
        $this->attributes[$name] = $value;
    }

    /**
     * Returns a list of available attributes
     * 
     * @return array Available attribute list 
     */
    public function attributes()
    {
        return array_keys( $this->attributes );
    }

    /**
     * Returns an attribute value for given name
     * 
     * @param string $name
     * @return mixed|false An attribute value 
     */
    public function attribute( $name )
    {
        if ( $this->hasAttribute( $name ) )
            return $this->attributes[$name];
        else
            return false;
    }

    /**
     * Checkes if attribute for given name exists
     * 
     * @param string $name
     * @return bool 
     */
    public function hasAttribute( $name )
    {
        return in_array( $name, array_keys( $this->attributes ) );
    }

    /**
     * Adds new ezcsseProperty object to current rule
     * 
     * @param ezcsseProperty $property
     * @return ezcsseProperty A ezcsseProperty object
     */
    public function addProperty( ezcsseProperty $property )
    {
        $this->attributes['properties'][]  = $property;
        return $property;
    }

    /**
     * Returns ezcsseProperty object for given index
     * 
     * @param integer $index
     * @return ezcsseProperty|false A ezcsseProperty object or false
     */
    public function getProperty( $index )
    {
        if ( $this->attributes['properties'][$index] )
            return $this->attributes['properties'][$index];
        else
            return false;
    }

    /**
     * Removes ezcsseProperty object for given index
     * 
     * @param integer $index
     * @return bool
     */
    public function removeProperty( $index )
    {
        if ( isset( $this->attributes['properties'][$index] ) )
        {
            unset( $this->attributes['properties'][$index] );
            
            if ( !isset( $this->attributes['properties'][$index] ) )
                return true;
        }
        else
        {
            return false;
        }
    }

    /**
     * Create a DOM element for current rule object and its attributes
     * 
     * @param DOMDocument $dom
     * @return DOMElement 
     */
    public function toXML( DOMDocument $dom )
    {
        $ruleNode = $dom->createElement( 'rule' );

        foreach( $this->attributes as $attrName => $attrValue )
        {
            switch ( $attrName )
            {
                case 'properties':
                    foreach ( $attrValue as $property )
                    {
                        $propertyNode = $property->toXML( $dom );
                        $ruleNode->appendChild( $propertyNode );
                    }
                    break;
                default:
                    $ruleNode->setAttribute( $attrName, $attrValue );
                    break;
            }
        }

        return $ruleNode;
    }

    /**
     * Returns a JSON string for current rule object
     * 
     * @return string A JSON string
     */
    public function toJSON()
    {
        $count = count( $this->attributes );
        $index = 0;
        $json = ezcsseStyle::lDelim();
        $json .= ' ';
        foreach ( $this->attributes as $attrName => $attrValue )
        {
            switch ( $attrName )
            {
                case 'properties':
                    $propCount = count( $attrValue );
                    $propIndex = 0;
                    
                    $json .= '"' . $attrName . '" : [ ';
                    foreach ( $attrValue as $property )
                    {
                        $json .= $property->toJSON();
                        
                        if ( $propIndex == ( $propCount - 1 ) )
                            $json .= ' ';
                        else
                            $json .= ', ';
                        
                        $propIndex++;
                    }
                    $json .= ' ]';
                    break;

                default:
                    $json .= '"' . $attrName . '" : "' . $attrValue . '"';
                    break;
            }
            
            if ( $index == ( $count - 1 ) )
                $json .= ' ';
            else
                $json .= ', ';
            
            $index++;
        }

        $json .= ezcsseStyle::rDelim();
        return $json;
    }
    
    /**
     * Returns a current rule object as CSS string
     * 
     * @return string A CSS string 
     */
    public function toCSS()
    {

        $rule = $this->attribute( 'selector' );
        $rule .= ezcsseStyle::newLine();
        $rule .= ezcsseStyle::lDelim();
        $rule .= ezcsseStyle::newLine();

        foreach ( $this->attribute( 'properties' ) as $property )
        {
            $rule .= $property->toCSS();
            $rule .= ezcsseStyle::newLine();
        }

        $rule .= ezcsseStyle::rDelim();
        $rule .= ezcsseStyle::newLine();

        return $rule;
    }

    /**
     * Creates a new ezcsseRule object from given XML node
     * 
     * @param DOMElement $node
     * @return ezcsseRule
     */
    static function createFromXML( DOMElement $node )
    {
        $newObj = new ezcsseRule();

        if ( $node->hasAttributes() )
        {
            foreach ( $node->attributes as $attr )
            {
                $newObj->setAttribute( $attr->name, $attr->value );
            }
        }

        foreach ( $node->childNodes as $node )
        {
            if ( $node->nodeType == XML_ELEMENT_NODE && $node->nodeName == 'property' )
            {
                $newObj->addProperty( ezcsseProperty::createFromXML( $node ) );
            }
            elseif ( $node->nodeType == XML_ELEMENT_NODE )
            {
                $newObj->setAttribute( $node->nodeName, $node->nodeValue );
            }
        }

        return $newObj;
    }
}

?>