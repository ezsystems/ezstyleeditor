<?php

$module = $Params['Module'];
$nodeId = $Params['NodeID'];

$node = eZContentObjectTreeNode::fetch( $nodeId );

if ( $module->isCurrentAction( 'Cancel' ) )
{
    if ( $node instanceof eZContentObjectTreeNode )
        $module->redirectTo( $node->attribute( 'url_alias' ) );
}

if ( $module->isCurrentAction( 'Store' ) )
{
    if ( $module->hasActionParameter( 'SiteStyleID' ) )
    {
        $siteStyleId = $module->actionParameter( 'SiteStyleID' );
        $objectId = $module->actionParameter( 'ContentObjectID' );

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

        eZContentCacheManager::clearTemplateBlockCache( $objectId );

        if ( $node instanceof eZContentObjectTreeNode )
            $module->redirectTo( $node->attribute( 'url_alias' ) );

    }
}

$tpl = eZTemplate::factory();
$Result['content'] = $tpl->fetch( 'design:styleeditor/set_site_style.tpl' );
