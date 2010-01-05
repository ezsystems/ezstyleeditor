<?php

/**
 * ezcsseStyle class definition
 * 
 */
class ezcsseStyle
{
    /**
     * Stores object attributes
     * 
     * @private
     * @var array Contains object attributes
     */
    private $attributes = array();

    /**
     * Constructor. Initializes rules attribute
     *  
     */
    public function __construct()
    {
        $this->attributes['rules'] = array();
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
     * Adds new CSS rule object
     * 
     * @param ezcsseRule $rule
     * @return ezcsseRule A ezcsseRule object
     */
    public function addRule( ezcsseRule $rule )
    {
        $this->attributes['rules'][]  = $rule;
        return $rule;
    }

    /**
     * Removes a ezcsseRule object for given index
     * 
     * @param integer $index
     * @return bool
     */
    public function removeRule( $index )
    {
        if ( isset( $this->attributes['rules'][$index] ) )
        {
            unset( $this->attributes['rules'][$index] );
            
            if ( !isset( $this->attributes['rules'][$index] ) )
                return true;
        }
        else
        {
            return false;
        }
    }

    /**
     * Returns a ezcsseRule object for given index
     * 
     * @param integer $index
     * @return ezcsseRule|null A ezcsseRule object or null
     */
    public function getRule( $index )
    {
        if ( isset( $this->attributes['rules'][$index] ) )
            return $this->attributes['rules'][$index];
        else
            return false;
    }

    /**
     * Returns a ezcsseRule object for given CSS selector
     * 
     * @param string $selector
     * @return ezcsseRule|false
     */
    public function getRuleBySelector( $selector )
    {
        foreach ( $this->attribute( 'rules' ) as $rule )
        {
            if ( $rule->attribute( 'selector' ) == $selector )
                return $rule;
        }
        
        return false;
    }

    /**
     * Returns a XML string object representation
     * 
     * @return string A XML string. 
     */
    public function toXML()
    {
        $dom = new DOMDocument( '1.0', 'utf-8' );
        $dom->formatOutput = true;
        $success = $dom->loadXML('<style />');

        $styleNode = $dom->documentElement;

        foreach ( $this->attributes as $attrName => $attrValue )
        {
            switch ( $attrName )
            {
                case 'rules':
                    foreach ( $attrValue as $rule )
                    {
                        $ruleNode = $rule->toXML( $dom );
                        $styleNode->appendChild( $ruleNode );
                    }
                    break;

                default:
                    $styleNode->setAttribute( $attrName, $attrValue );
                    break;
            }
        }

        return $dom->saveXML();
    }

    /**
     * Returns a JSON string for current object
     * 
     * @return string A JSON string
     */
    public function toJSON()
    {
        $count = count( $this->attributes );
        $index = 0;
        $json = self::lDelim();
        $json .= ' ';
        foreach ( $this->attributes as $attrName => $attrValue )
        {
            switch ( $attrName )
            {
                case 'rules':
                    $ruleCount = count( $attrValue );
                    $ruleIndex = 0;
                    
                    $json .= '"' . $attrName . '" : [ ';
                    foreach ( $attrValue as $rule )
                    {
                        $json .= $rule->toJSON();
                        
                        if ( $ruleIndex == ( $ruleCount - 1 ) )
                            $json .= ' ';
                        else
                            $json .= ', ';
                        
                        $ruleIndex++;
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

        $json .= self::rDelim();
        return $json;
    }

    /**
     * Returns a CSS string for current object
     * 
     * @return string A CSS string 
     */
    public function toCSS()
    {
        $style = '';
        foreach ( $this->attribute( 'rules' ) as $rule )
        {
            $style .= $rule->toCSS();
            $style .= self::newLine();
        }

        return $style;
    }
    
    /**
     * Returns a new line mark
     * 
     * @return string A new line mark 
     */
    static function newLine()
    {
        $newLine = "\n";
        return $newLine;
    }

    /**
     * Returns a 4 space long tab
     * 
     * @return string A 4 space long tab
     */
    static function tabIndent()
    {
        $tabIndent = '    ';
        return $tabIndent;
    }

    /**
     * Returns a right delimiter string
     * 
     * @return string
     */
    static function lDelim()
    {
        $lDelim = '{';
        return $lDelim;
    }

    /**
     * Returns a left delimiter string
     * 
     * @return string
     */
    static function rDelim()
    {
        $rDelim = '}';
        return $rDelim;
    }

    /**
     * Returns an ezcsseStyle object for given XML string
     * 
     * @param string $source
     * @return ezcsseStyle
     */
    static function createFromXML( $source )
    {
        $newObj = new ezcsseStyle();

        if ( $source )
        {
            $dom = new DOMDOcument();
            $success = $dom->loadXML( $source );
            $root = $dom->documentElement;

            if ( $root->hasAttributes() )
            {
                foreach ( $root->attributes as $attr )
                {
                    $newObj->setAttribute( $attr->name, $attr->value );
                }
            }

            foreach ( $root->childNodes as $node )
            {
                if ( $node->nodeType == XML_ELEMENT_NODE && $node->nodeName == 'rule' )
                {
                    $newObj->addRule( ezcsseRule::createFromXML( $node ) );
                }
                elseif ( $node->nodeType == XML_ELEMENT_NODE )
                {
                    $newObj->setAttribute( $node->nodeName, $node->nodeValue );
                }
            }
        }

        return $newObj;
    }
}

?>