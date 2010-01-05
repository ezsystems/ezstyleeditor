{if is_set( $display_styleeditor_visualtoolbar )}
    {include uri="design:styleeditor/visual.tpl"}
{/if}

{def $site_style = fetch('styleeditor', 'current_style')}

<style id="ezste-main-css" type="text/css">

{$site_style.style.css}

</style>