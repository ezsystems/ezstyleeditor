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

        $siteStyleGroup = ezcsseSiteStyleGroup::fetch( eZINI::instance( 'ezstyleeditor.ini' )->variable( 'SiteStyleGroups', 'FontSettings' ) );
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
                    foreach( $params['properties'] as $propIndex => $propValue )
                    {
                        $property = $rule->getProperty( $propIndex );

                        if ( !$property instanceof ezcsseProperty )
                        {
                            continue;
                        }

                        $property->setAttribute( 'value', '' );
                        $property->setAttribute( 'keyword', '' );
                        $property->setAttribute( 'length', '' );
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

if ( $module->isCurrentAction( 'Store' ) )
{
    if ( $module->hasActionParameter( 'ContentObjectID' ) )
    {
        $http = eZHTTPTool::instance();

        $objectId = $module->actionParameter( 'ContentObjectID' );

        $siteStyleGroup = ezcsseSiteStyleGroup::fetch( eZINI::instance( 'ezstyleeditor.ini' )->variable( 'SiteStyleGroups', 'FontSettings' ) );
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
                    foreach( $params['properties'] as $propIndex => $propValue )
                    {
                        $property = $rule->getProperty( $propIndex );

                        if ( !$property instanceof ezcsseProperty )
                        {
                            continue;
                        }

                        $value = isset( $propValue['value'] ) ? strip_tags( $propValue['value'] ) : '';
                        $keyword = isset( $propValue['keyword'] ) ? strip_tags( $propValue['keyword'] ) : '';
                        $length = isset( $propValue['length'] ) ? strip_tags( $propValue['length'] ) : '';

                        $property->setAttribute( 'keyword', $keyword );
                        $property->setAttribute( 'length', $length );

                        if ( $keyword != '' && $length != '' )
                        {
                            $property->setAttribute( 'value', $keyword . $length );
                        }
                        else if ( $value != '' && $length != '' )
                        {
                            $property->setAttribute( 'value', $value . $length );
                        }
                        else if ( $keyword != '' && $value == '' )
                        {
                            $property->setAttribute( 'value', $keyword );
                        }
                        else
                        {
                            $property->setAttribute( 'value', $value );
                        }
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
