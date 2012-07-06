{def $units = hash( 'px', 'pixels',
                    'pt', 'points',
                    'in', 'in',
                    'cm', 'cm',
                    'mm', 'mm',
                    'pc', 'picas',
                    'em', 'ems',
                    'ex', 'exs',
                    '%', '%' )}

<form action="{concat( '/styleeditor/setfont/', $node.node_id )|ezurl( 'no' )}" method="post" class="form-horizontal">
    {foreach $rules as $id => $rule}
    <div class="rule-container" id="rule-{$id}">
        <div class="rule-header">
            <em class="trigger expand"></em>
            {$rule.alias}
        </div>
        <div class="rule-properties collapsed">
            <fieldset>
            {foreach $rule.properties as $index => $property}
                  <div class="control-group">
                      <label class="control-label">{$property.name}</label>
                      <div class="controls">
                      {switch match=$property.type}
                        {case match='color'}
                            <label class="form-inline">
                                <input name="Rules[{$rule.selector}][properties][{$index}][value]" class="input-small" value="{$property.value}" />
                                <img class="colorpicker-icon" src="{'color-picker-icon.gif'|ezimage( 'no' )}" />
                            </label>
                        {/case}
                        {case match='font'}
                            <select name="Rules[{$rule.selector}][properties][{$index}][value]">
                            {foreach $property.options as $option}
                                <option value="{$option}"{if eq( $property.value, $option )} selected="selected"{/if}>{$option}</option>
                            {/foreach}
                            </select>
                        {/case}
                        {case match='keyword-length'}
                            <input name="Rules[{$rule.selector}][properties][{$index}][value]" class="input-mini" />
                            <select name="Rules[{$rule.selector}][properties][{$index}][keyword]" class="input-mini">
                            {foreach $property.options as $option}
                                <option value="{$option}"{if eq( $property.keyword, $option )} selected="selected"{/if}>{$option}</option>
                            {/foreach}
                            </select>
                            <select name="Rules[{$rule.selector}][properties][{$index}][length]" class="input-mini">
                            {foreach $units as $unit => $length}
                                <option value="{$unit}"{if eq( $property.length, $unit )} selected="selected"{/if}>{$length}</option>
                            {/foreach}
                            </select>
                        {/case}
                        {case match='length'}

                        {/case}
                        {case match='enumerated'}
                            <select name="Rules[{$rule.selector}][properties][{$index}][value]" class="input-medium">
                            {foreach $property.options as $option}
                                <option value="{$option}"{if eq( $property.value, $option )} selected="selected"{/if}>{$option}</option>
                            {/foreach}
                            </select>
                        {/case}
                        {case match='string'}

                        {/case}
                        {case match='relativepath'}

                        {/case}
                      {/switch}
                      </div>
                </div>
            {/foreach}
            </fieldset>
        </div>
    </div>
    {/foreach}
    <div class="site-style-buttons">
        <input type="submit" value="{'Reset'|i18n( 'design/standard/syleeditor/embed' )}" name="ResetButton" class="btn" />
        <input type="submit" value="{'Cancel'|i18n( 'design/standard/syleeditor/embed' )}" name="CancelButton" class="btn" />
        <input type="submit" value="{'Store'|i18n( 'design/standard/syleeditor/embed' )}" name="StoreButton" class="btn btn-warning" />
        <input type="hidden" name="ContentObjectID" value="{$object.id}" />
        <input type="hidden" name="ezxform_token" value="{$form_token}" />
    </div>
</form>
