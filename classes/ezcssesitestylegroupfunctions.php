<?php

/**
 * Collection of fetch functions
 * 
 */
class ezcsseSiteStyleGroupFunctions
{
    /**
     * Fetches currently selected site style object
     *
     * @param integer $groupId
     * @return array
     */
    public static function fetchGroup( $groupId )
    {
        $siteStyleGroup = ezcsseSiteStyleGroup::fetch( $groupId );
        
        return array( 'result' => $siteStyleGroup );
    }
}
?>
