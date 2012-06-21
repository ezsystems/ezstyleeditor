<?php

$module = $Params['Module'];

$http = eZHttpTool::instance();

if ( $module->isCurrentAction( 'Cancel' ) )
{

}

if ( $module->isCurrentAction( 'Store' ) )
{
    if ( $module->hasActionParameter( 'SiteStyleID' ) )
    {
        $siteStyleId = $module->actionParameter( 'SiteStyleID' );

        $currSiteStyle = ezcsseSiteStyle::fetchCurrentSiteStyle();

        if ( $currSiteStyle instanceof ezcsseSiteStyle )
        {
            $currSiteStyle->setAttribute( 'selected', 0 );
            $currSiteStyle->store();
        }

        $siteStyle = ezcsseSiteStyle::fetch( $siteStyleId );

        if ( $siteStyle instanceof ezcsseSiteStyle )
        {
            $siteStyle->setAttribute( 'selected', 1 );
            $siteStyle->store();
        }
    }
}

$tpl = eZTemplate::factory();

$Result['content'] = $tpl->fetch( 'design:styleeditor/set_site_style.tpl' );
