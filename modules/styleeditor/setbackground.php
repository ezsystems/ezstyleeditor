<?php

$module = $Params['Module'];
$nodeId = $Params['NodeID'];

$node = eZContentObjectTreeNode::fetch( $nodeId );

if ( $module->isCurrentAction( 'Cancel' ) )
{
    if ( $node instanceof eZContentObjectTreeNode )
        $module->redirectTo( $node->attribute( 'url_alias' ) );
}

if ( $module->isCurrentAction( 'Reset' ) )
{
    if ( $module->hasActionParameter( 'ContentObjectID' ) )
    {
        $http = eZHTTPTool::instance();

        $objectId = $module->actionParameter( 'ContentObjectID' );

        $siteStyleGroup = ezcsseSiteStyleGroup::fetch( eZINI::instance( 'ezstyleeditor.ini' )->variable( 'SiteStyleGroups', 'BackgroundSettings' ) );
        $siteStyleList = $siteStyleGroup->attribute( 'style_list' );

        $styleDefinition = $siteStyleList[0]->attribute( 'style' );

        $style = ezcsseStyle::createFromXML( $styleDefinition->attribute( 'style' ) );

        if ( $style instanceof ezcsseStyle )
        {
            $rules = $style->attribute( 'rules' );

            foreach ( $rules as $rule )
            {
                foreach( $rule->attribute( 'properties' ) as $property )
                {
                    $property->setAttribute( 'value', '' );
                }

            }

            $styleDefinition->setAttribute( 'style', $style->toXML() );
            $styleDefinition->store();
        }

        eZContentCacheManager::clearTemplateBlockCache( $objectId );

        if ( $node instanceof eZContentObjectTreeNode )
            $module->redirectTo( $node->attribute( 'url_alias' ) );

    }
}

if ( $module->isCurrentAction( 'Store' ) )
{
    if ( $module->hasActionParameter( 'ContentObjectID' ) )
    {
        $http = eZHTTPTool::instance();

        $objectId = $module->actionParameter( 'ContentObjectID' );

        $siteStyleGroup = ezcsseSiteStyleGroup::fetch( eZINI::instance( 'ezstyleeditor.ini' )->variable( 'SiteStyleGroups', 'BackgroundSettings' ) );
        $siteStyleList = $siteStyleGroup->attribute( 'style_list' );

        $styleDefinition = $siteStyleList[0]->attribute( 'style' );

        $style = ezcsseStyle::createFromXML( $styleDefinition->attribute( 'style' ) );

        if ( $style instanceof ezcsseStyle )
        {
            $rules = $http->variable( 'Rules' );

            foreach ( $rules as $selector => $params )
            {
                $rule = $style->getRuleBySelector( $selector );

                if ( $rule instanceof ezcsseRule )
                {
                    foreach( $params['properties'] as $propName => $propValue )
                    {
                        $property = $rule->getPropertyByName( $propName );

                        if ( !$property instanceof ezcsseProperty )
                        {
                            continue;
                        }

                        $property->setAttribute( 'value', strip_tags( $propValue['value'] ) );
                    }
                }
            }

            $styleDefinition->setAttribute( 'style', $style->toXML() );
            $styleDefinition->store();
        }

        eZContentCacheManager::clearTemplateBlockCache( $objectId );

        if ( $node instanceof eZContentObjectTreeNode )
            $module->redirectTo( $node->attribute( 'url_alias' ) );

    }
}
