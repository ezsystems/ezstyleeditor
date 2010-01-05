{if is_set( $display_styleeditor_visualtoolbar )}
    {include uri="design:styleeditor/visual.tpl"}
{/if}

{def $site_style = fetch('styleeditor', 'current_style')}

<style type="text/css" title="ezste-main-css">
{$site_style.style.css}
</style>