<form action="{'/styleeditor/upload'|ezurl( 'no' )}" method="post" enctype="multipart/form-data">
    <h3>{'Please select photo from your computer.'|i18n( 'design/standard/syleeditor/embed' )}</h3>
    <div class="row">
        <div class="span2">
            <ul class="thumbnails">
                <li class="span2">
                  <a href="#" class="thumbnail">
                    <img src="http://placehold.it/160x120" alt="">
                  </a>
                </li>
            </ul>
        </div>
        <div class="span10">
            <input type="file" name="ImageFile" class="input-file" />
            <input type="submit" name="UploadButton" value="{'Upload'|i18n( 'design/standard/syleeditor/embed' )}" class="btn btn-warning" />
        </div>
    </div>
    <label class="radio inline">
        <input type="radio" name="BackgroundPosition" checked="checked" />{'Align right'|i18n( 'design/standard/syleeditor/embed' )}
    </label>
    <label class="radio inline">
        <input type="radio" name="BackgroundPosition" />{'Align center'|i18n( 'design/standard/syleeditor/embed' )}
    </label>
    <label class="radio inline">
        <input type="radio" name="BackgroundPosition" />{'Align left'|i18n( 'design/standard/syleeditor/embed' )}
    </label>
    <div class="background-color">
        <label class="form-inline">{'Choose background color'|i18n( 'design/standard/syleeditor/embed' )}
            <input type="text" class="input-mini" name="BackgroundColor" value="" />
            <img src="{'color-picker-icon.gif'|ezimage( 'no' )}" alt="" class="colorpicker-icon" />
            <em class="colorpicker-color" style="background-color: rgb(141, 210, 171); "></em>
        </label>
    </div>
</form>
