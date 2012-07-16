YAHOO.ez.Accordion = function(){
    var Dom = YAHOO.util.Dom,
        Event = YAHOO.util.Event;

    var getTriggers = function() {
        var triggers = Dom.getElementsByClassName( "trigger", "em" );

        return triggers;
    };

    var exec = function() {
        var triggers = getTriggers();

        for( var i = 0; i < triggers.length; i++ ) {
            var triggerEl = triggers[i];

            setTriggerEvent(triggerEl);
        }
    };

    var setTriggerEvent = function(o) {
        Event.purgeElement(o);
        Event.on(o, "click", triggerAction, o, true);
    };

    var getBlockContainer = function(o) {
        var currentEl = o;
        var isContainer = false;

        while(!isContainer) {
            if( Dom.hasClass(currentEl, "rule-container") ) {
                isContainer = true;
            }
            else {
                currentEl = currentEl.parentNode;
            }
        }

        return currentEl;
    }

    var getCollapsedEl = function(o) {
        var blockContainer = getBlockContainer(o);
        var collapsedEl = Dom.getElementsByClassName("collapsed", "div", blockContainer)[0];

        return collapsedEl;
    };

    var getExpandedEl = function(o) {
        var blockContainer = getBlockContainer(o);
        var expandedEl = Dom.getElementsByClassName("expanded", "div", blockContainer)[0];

        return expandedEl;
    };

    var getBlockID = function(o) {
        var blockContainer = getBlockContainer(o);
        var id = blockContainer.id;

        return id;
    };

    var expandBlock = function(o) {
        Dom.replaceClass(o,"expand", "collapse" );

        var collapsedEl = getCollapsedEl(o);

        if(collapsedEl) {
            Dom.replaceClass( collapsedEl, "collapsed", "expanded" );
        }
    };

    var collapseBlock = function(o) {
        Dom.replaceClass( o, "collapse", "expand" );

        var expandedEl = getExpandedEl(o);

        if(expandedEl) {
            Dom.replaceClass( expandedEl, "expanded", "collapsed" );
        }
    }

    var expandAll = function() {
        var triggers = getTriggers();

        for( var i = 0; i < triggers.length; i++ ) {
            var triggerEl = triggers[i];

            if(triggerEl.nodeName.toLowerCase() == "em") {
                expandBlock(triggerEl);
            }
        }
    };

    var collapseAll = function() {
        var triggers = getTriggers();

        for( var i = 0; i < triggers.length; i++ ) {
            var triggerEl = triggers[i];

            if(triggerEl.nodeName.toLowerCase() == "em") {
                collapseBlock(triggerEl);
            }
        }
    };

    var collapseOthers = function(expandedEl) {
        var triggers = getTriggers();

        for( var i = 0; i < triggers.length; i++ ) {
            var triggerEl = triggers[i];

            if(triggerEl.nodeName.toLowerCase() == "em"
                && triggerEl != expandedEl) {
                collapseBlock(triggerEl);
            }
        }
    };

    var triggerAction = function(e, triggerEl) {
        if( Dom.hasClass( triggerEl, "expand" ) ) {
            expandBlock(triggerEl);

            collapseOthers(triggerEl);
        }
        else if( Dom.hasClass( triggerEl, "collapse" ) ) {
            collapseBlock(triggerEl);
        }
        else if( Dom.hasClass( triggerEl, "expand-all" ) ) {
            expandAll();
        }
        else if( Dom.hasClass( triggerEl, "collapse-all" ) ) {
            collapseAll();
        }
        Event.preventDefault(e);
    };

    return {
        init: function() {
            exec();
        }
    };
}();
