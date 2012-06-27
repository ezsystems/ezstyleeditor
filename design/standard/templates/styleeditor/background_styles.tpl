<form action="{concat( '/styleeditor/setbackground/', $node.node_id )|ezurl( 'no' )}" method="post" enctype="multipart/form-data" id="ezste-upload-form">
    <h3>{'Please select a photo from your computer.'|i18n( 'design/standard/syleeditor/embed' )}</h3>
    <div class="row">
        <div class="span2">
            <ul class="thumbnails">
                <li class="span2">
                    <a href="#" class="thumbnail">
                        <img src="http://placehold.it/160x120" alt="" id="ezste-image-preview">
                    </a>
                    <input type="hidden" name="BackgroundImage" value="" id="ezste-background-image" />
                </li>
            </ul>
        </div>
        <div class="span10">
            <input type="file" name="File" class="input-file" id="ezste-file-input" />
            <input type="submit" name="UploadButton" value="{'Upload'|i18n( 'design/standard/syleeditor/embed' )}" class="btn btn-warning" id="ezste-upload-btn" />
            <div class="row">
                <div class="alert alert-error span3" id="ezste-error-desc" style="display: none">
                </div>
            </div>
        </div>
    </div>
    <label class="radio inline">
        <input type="radio" name="BackgroundPosition" value="top right" checked="checked" />{'Align right'|i18n( 'design/standard/syleeditor/embed' )}
    </label>
    <label class="radio inline">
        <input type="radio" name="BackgroundPosition" value="top center" />{'Align center'|i18n( 'design/standard/syleeditor/embed' )}
    </label>
    <label class="radio inline">
        <input type="radio" name="BackgroundPosition" value="top left" />{'Align left'|i18n( 'design/standard/syleeditor/embed' )}
    </label>
    <br />
    <label class="radio inline">
        <input type="radio" name="BackgroundRepeat" value="repeat-y" checked="checked" />{'Repeat image vertically'|i18n( 'design/standard/syleeditor/embed' )}
    </label>
    <label class="radio inline">
        <input type="radio" name="BackgroundRepeat" value="repeat-x" />{'Repeat image horizontally'|i18n( 'design/standard/syleeditor/embed' )}
    </label>
    <label class="radio inline">
        <input type="radio" name="BackgroundRepeat" value="no-repeat" />{'Do not repeat image'|i18n( 'design/standard/syleeditor/embed' )}
    </label>
    <div class="background-color">
        <label class="form-inline">{'Choose background color'|i18n( 'design/standard/syleeditor/embed' )}
            <input type="text" class="input-mini" name="BackgroundColor" value="" />
            <img src="{'color-picker-icon.gif'|ezimage( 'no' )}" alt="" class="colorpicker-icon" />
            <em class="colorpicker-color" style="background-color: rgb(141, 210, 171); "></em>
        </label>
    </div>
    <div class="site-style-buttons">
        <input type="submit" value="{'Cancel'|i18n( 'design/standard/syleeditor/embed' )}" name="CancelButton" class="btn" />
        <input type="submit" value="{'Store'|i18n( 'design/standard/syleeditor/embed' )}" name="StoreButton" class="btn btn-warning" />
        <input type="hidden" name="ContentObjectID" value="{$object.id}" />
        <input type="hidden" name="ezxform_token" value="{$form_token}" />
    </div>
</form>
