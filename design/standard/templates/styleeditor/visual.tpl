{def $can_administrate = fetch( 'user', 'has_access_to', hash( 'module', 'styleeditor',
                                                               'function', 'administrate',
                                                               'user_id',  $current_user.contentobject.id ) )
     $locale = ezini( 'RegionalSettings', 'Locale', 'site.ini' )
     $locale_map = ezini( 'StyleEditor', 'HelpURLLocaleMap', 'ezstyleeditor.ini' )
     $help_url = $locale_map[$locale]}

{ezscript_require( 'ezjsc::yui2' )}

<script type="text/javascript">
{literal}
(function() {
  YUILoader.onSuccess = function() {
      YAHOO.ez.StyleEditor.elements = [
          {
              selector: "",
              alias: "",
              element: {
                  name: "body",
                  id: "",
                  classname: ""
              },
              overlay: true
          },
          {
              selector: "",
              alias: "",
              element: {
                  name: "div",
                  id: "page",
                  classname: ""
              },
              overlay: true
          },
          {
              selector: "",
              alias: "",
              element: {
                  name: "div",
                  id: "header",
                  classname: ""
              },
              overlay: true
          },
          {
              selector: "",
              alias: "",
              element: {
                  name: "div",
                  id: "usermenu",
                  classname: ""
              },
              overlay: true
          },
          {
              selector: "",
              alias: "",
              element: {
                  name: "div",
                  id: "languages",
                  classname: ""
              },
              overlay: true
          },
          {
              selector: "",
              alias: "",
              element: {
                  name: "div",
                  id: "links",
                  classname: ""
              },
              overlay: true
          },
          {
              selector: "",
              alias: "",
              element: {
                  name: "div",
                  id: "topmenu",
                  classname: ""
              },
              overlay: true
          },
          {
              selector: "",
              alias: "",
              element: {
                  name: "div",
                  id: "path",
                  classname: ""
              },
              overlay: true
          },
          {
              selector: "",
              alias: "",
              element: {
                  name: "div",
                  id: "footer",
                  classname: ""
              },
              overlay: true
          },
          {
              selector: "",
              alias: "Link",
              element: {
                  name: "a",
                  id: "",
                  classname: ""
              },
              overlay: false
          },
          {
              selector: "a:visited",
              alias: "Link: visited",
              element: {
                  name: "",
                  id: "",
                  classname: ""
              },
              overlay: false
          },
          {
              selector: "a:active",
              alias: "Link: active",
              element: {
                  name: "",
                  id: "",
                  classname: ""
              },
              overlay: false
          },
          {
              selector: "a:hover",
              alias: "Link: hover",
              element: {
                  name: "",
                  id: "",
                  classname: ""
              },
              overlay: false
          },
          {
              selector: "h1, div.attribute-header h1, div.attribute-header h1.long",
              alias: "Header 1",
              element: {
                  name: "",
                  id: "",
                  classname: ""
              },
              overlay: false
          },
          {
              selector: "",
              alias: "Header 2",
              element: {
                  name: "h2",
                  id: "",
                  classname: ""
              },
              overlay: false
          },
          {
              selector: "",
              alias: "Header 3",
              element: {
                  name: "h3",
                  id: "",
                  classname: ""
              },
              overlay: false
          },
          {
              selector: "",
              alias: "Header 4",
              element: {
                  name: "h4",
                  id: "",
                  classname: ""
              },
              overlay: false
          },
          {
              selector: "",
              alias: "Header 5",
              element: {
                  name: "h5",
                  id: "",
                  classname: ""
              },
              overlay: false
          },
          {
              selector: "",
              alias: "Header 6",
              element: {
                  name: "h5",
                  id: "",
                  classname: ""
              },
              overlay: false
          },
          {
              group: "headergroup",
              groupname: "Header",
              alias: "User menu",
              elements: [
                            {
                                selector: "div#usermenu",
                                alias: "User menu",
                                element: {
                                            name: "",
                                            id: "",
                                            classname: ""
                                         },
                                overlay: false
                            },
                            {
                                selector: "div#links ul li",
                                alias: "Menu item",
                                element: {
                                            name: "",
                                            id: "",
                                            classname: ""
                                         },
                                overlay: false
                            },
                            {
                                selector: "div#links a",
                                alias: "Menu link text",
                                element: {
                                            name: "",
                                            id: "",
                                            classname: ""
                                         },
                                overlay: false
                            }
                        ],
              overlay: false
          },
          {
              group: "headergroup",
              groupname: "Header",
              alias: "Languages menu",
              elements: [
                            {
                                selector: "div#languages",
                                alias: "User menu",
                                element: {
                                            name: "",
                                            id: "",
                                            classname: ""
                                         },
                                overlay: false
                            },
                            {
                                selector: "div#languages ul li",
                                alias: "Menu languages item",
                                element: {
                                            name: "",
                                            id: "",
                                            classname: ""
                                         },
                                overlay: false
                            },
                            {
                                selector: "div#languages a",
                                alias: "Menu languages link",
                                element: {
                                            name: "",
                                            id: "",
                                            classname: ""
                                         },
                                overlay: false
                            }
                        ],
              overlay: false
          },
          {
              group: "frontpages",
              groupname: "Frontpages",
              alias: "Frontpage",
              elements: [
                            {
                                selector: "div.content-view-full div.class-frontpage",
                                alias: "Background",
                                element: {
                                            name: "",
                                            id: "",
                                            classname: ""
                                         },
                                overlay: false
                            }
                        ],
              overlay: false
          },
          {
              group: "backgrounds",
              groupname: "Backgrounds",
              alias: "Page",
              elements: [
                            {
                                selector: "",
                                alias: "Page background 1",
                                element: {
                                            name: "div",
                                            id: "page-content-position",
                                            classname: ""
                                },
                                overlay: false
                            },
                            {
                                selector: "",
                                alias: "Page background 2",
                                element: {
                                            name: "div",
                                            id: "page-content",
                                            classname: ""
                                },
                                overlay: false
                            }
                        ],
              overlay: false
          },
          {
              group: "menu",
              groupname: "Menus",
              alias: "Top menu",
              elements: [
                            {
                                selector: "div#topmenu ul",
                                alias: "Menu",
                                element: {
                                            name: "",
                                            id: "",
                                            classname: ""
                                         },
                                overlay: false
                            },
                            {
                                selector: "div#topmenu ul li",
                                alias: "Menu item",
                                element: {
                                            name: "",
                                            id: "",
                                            classname: ""
                                         },
                                overlay: false
                            },
                            {
                                selector: "div#topmenu ul li.selected",
                                alias: "Selected menu item",
                                element: {
                                            name: "",
                                            id: "",
                                            classname: ""
                                         },
                                overlay: false
                            },
                            {
                                selector: "div#topmenu ul li a",
                                alias: "Link",
                                    element: {
                                                name: "",
                                                id: "",
                                                classname: ""
                                             },
                                overlay: false
                            },
                            {
                                selector: "div#topmenu ul li.selected a",
                                alias: "Selected link",
                                    element: {
                                                name: "",
                                                id: "",
                                                classname: ""
                                             },
                                overlay: false
                            }
                        ],
              overlay: false
          },
          {
              group: "menu",
              groupname: "Menus",
              alias: "Double top menu",
              elements: [
                            {
                                selector: "div#topmenu ul",
                                alias: "Menu",
                                element: {
                                            name: "",
                                            id: "",
                                            classname: ""
                                         },
                                overlay: false
                            },
                            {
                                selector: "div#topmenu ul li",
                                alias: "Menu item",
                                element: {
                                            name: "",
                                            id: "",
                                            classname: ""
                                         },
                                overlay: false
                            },
                            {
                                selector: "div#topmenu ul li.selected",
                                alias: "Selected menu item",
                                element: {
                                            name: "",
                                            id: "",
                                            classname: ""
                                         },
                                overlay: false
                            },
                            {
                                selector: "div#topmenu ul li a",
                                alias: "Link",
                                    element: {
                                                name: "",
                                                id: "",
                                                classname: ""
                                             },
                                overlay: false
                            },
                            {
                                selector: "div#topmenu ul li.selected a",
                                alias: "Selected link",
                                    element: {
                                                name: "",
                                                id: "",
                                                classname: ""
                                             },
                                overlay: false
                            },
                            {
                                selector: "div#topmenu ul#topmenu-secondlevel",
                                alias: "Second level menu",
                                    element: {
                                                name: "",
                                                id: "",
                                                classname: ""
                                             },
                                overlay: false
                            },
                            {
                                selector: "div#topmenu ul#topmenu-secondlevel li",
                                alias: "Second level menu item",
                                    element: {
                                                name: "",
                                                id: "",
                                                classname: ""
                                             },
                                overlay: false
                            },
                            {
                                selector: "div#topmenu ul#topmenu-secondlevel li a",
                                alias: "Second level link",
                                    element: {
                                                name: "",
                                                id: "",
                                                classname: ""
                                             },
                                overlay: false
                            },
                            {
                                selector: "div#topmenu ul#topmenu-secondlevel li.selected",
                                alias: "Second level selected menu item",
                                element: {
                                            name: "",
                                            id: "",
                                            classname: ""
                                         },
                                overlay: false
                            },
                            {
                                selector: "div#topmenu ul#topmenu-secondlevel li.selected a",
                                alias: "Second level selected link",
                                element: {
                                            name: "",
                                            id: "",
                                            classname: ""
                                         },
                                overlay: false
                            }
                        ],
              overlay: false
          },
          {
              group: "menu",
              groupname: "Menus",
              alias: "Left menu",
              elements: [
                            {
                                selector: "div#sidemenu ul",
                                alias: "Menu",
                                element: {
                                            name: "",
                                            id: "",
                                            classname: ""
                                         },
                                overlay: false
                            },
                            {
                                selector: "div#sidemenu h4, div#sidemenu h4 a",
                                alias: "Menu header",
                                element: {
                                            name: "",
                                            id: "",
                                            classname: ""
                                         },
                                overlay: false
                            },
                            {
                                selector: "div#sidemenu ul li",
                                alias: "Menu item",
                                element: {
                                            name: "",
                                            id: "",
                                            classname: ""
                                         },
                                overlay: false
                            },
                            {
                                selector: "div#sidemenu ul.menu-list li a",
                                alias: "Link",
                                    element: {
                                                name: "",
                                                id: "",
                                                classname: ""
                                             },
                                overlay: false
                            },
                            {
                                selector: "div#sidemenu ul.menu-list a.selected",
                                alias: "Selected link",
                                    element: {
                                                name: "",
                                                id: "",
                                                classname: ""
                                             },
                                overlay: false
                            }
                        ],
              overlay: false
          },
          {
              group: "box",
              groupname: "Boxes",
              alias: "Border box 1",
              elements: [
                            {
                                selector: "div.border-box div.border-tl",
                                alias: "Top left",
                                element: {
                                            name: "",
                                            id: "",
                                            classname: ""
                                         },
                                overlay: false
                            },
                            {
                                selector: "div.border-box div.border-tr",
                                alias: "Top right",
                                    element: {
                                                name: "",
                                                id: "",
                                                classname: ""
                                             },
                                overlay: false
                            },
                            {
                                selector: "div.border-box div.border-tc",
                                alias: "Top center",
                                element: {
                                            name: "",
                                            id: "",
                                            classname: ""
                                         },
                                overlay: false
                            },
                            {
                                selector: "div.border-box div.border-ml",
                                alias: "Middle left",
                                element: {
                                            name: "",
                                            id: "",
                                            classname: ""
                                         },
                                overlay: false
                            },
                            {
                                selector: "div.border-box div.border-mr",
                                alias: "Middle right",
                                element: {
                                            name: "",
                                            id: "",
                                            classname: ""
                                         },
                                overlay: false
                            },
                            {
                                selector: "div.border-box div.border-mc",
                                alias: "Middle center",
                                element: {
                                            name: "",
                                            id: "",
                                            classname: ""
                                         },
                                overlay: false
                            },
                            {
                                selector: "div.border-box div.border-bl",
                                alias: "Bottom left",
                                element: {
                                            name: "",
                                            id: "",
                                            classname: ""
                                         },
                                overlay: false
                            },
                            {
                                selector: "div.border-box div.border-br",
                                alias: "Bottom left",
                                element: {
                                            name: "",
                                            id: "",
                                            classname: ""
                                         },
                                overlay: false
                            },
                            {
                                selector: "div.border-box div.border-bc",
                                alias: "Bottom center",
                                element: {
                                            name: "",
                                            id: "",
                                            classname: ""
                                         },
                                overlay: false
                            }
                        ],
              overlay: false
          },
          {
              group: "customtags",
              groupname: "Custom tags",
              alias: "Quote",
              elements: [
                            {
                                selector: "div.quote",
                                alias: "Open quote",
                                element: {
                                            name: "",
                                            id: "",
                                            classname: ""
                                         },
                                overlay: false
                            },
                            {
                                selector: "div.quote-design",
                                alias: "Close quote",
                                    element: {
                                                name: "",
                                                id: "",
                                                classname: ""
                                             },
                                overlay: false
                            },
                            {
                                selector: "div.quote-design p",
                                alias: "Quote text",
                                    element: {
                                                name: "",
                                                id: "",
                                                classname: ""
                                             },
                                overlay: false
                            }
                        ],
              overlay: false
          },
          {
              group: "customtags",
              groupname: "Custom tags",
              alias: "Factbox",
              elements: [
                            {
                                selector: "div.factbox-header div.border-tl",
                                alias: "header-top-left",
                                element: {
                                            name: "",
                                            id: "",
                                            classname: ""
                                         },
                                overlay: false
                            },
                            {
                                selector: "div.factbox-header div.border-tr",
                                alias: "header-top-right",
                                    element: {
                                                name: "",
                                                id: "",
                                                classname: ""
                                             },
                                overlay: false
                            },
                            {
                                selector: "div.factbox-header div.border-tr",
                                alias: "header-top-right",
                                    element: {
                                                name: "",
                                                id: "",
                                                classname: ""
                                             },
                                overlay: false
                            },
                            {
                                selector: "div.factbox-header div.border-ml",
                                alias: "header-middle-left",
                                    element: {
                                                name: "",
                                                id: "",
                                                classname: ""
                                             },
                                overlay: false
                            },
                            {
                                selector: "div.factbox-header div.border-mr",
                                alias: "header-middle-right",
                                    element: {
                                                name: "",
                                                id: "",
                                                classname: ""
                                             },
                                overlay: false
                            },
                            {
                                selector: "div.factbox-header div.border-mc",
                                alias: "header-middle-center",
                                    element: {
                                                name: "",
                                                id: "",
                                                classname: ""
                                             },
                                overlay: false
                            },
                            {
                                selector: "div.factbox-content div.border-ml",
                                alias: "header-middle-center",
                                    element: {
                                                name: "",
                                                id: "",
                                                classname: ""
                                             },
                                overlay: false
                            }
                        ],
              overlay: false
          },
          {
              group: "tables",
              groupname: "Tables",
              alias: "List table",
              elements: [
                            {
                                selector: "table.list",
                                alias: "Table",
                                element: {
                                            name: "",
                                            id: "",
                                            classname: ""
                                         },
                                overlay: false
                            },
                            {
                                selector: "table.list th",
                                alias: "Table header",
                                    element: {
                                                name: "",
                                                id: "",
                                                classname: ""
                                             },
                                overlay: false
                            },
                            {
                                selector: "table.list th:first-child",
                                alias: "Table header (first in a row)",
                                    element: {
                                                name: "",
                                                id: "",
                                                classname: ""
                                             },
                                overlay: false
                            },
                            {
                                selector: "table.list tr.bglight",
                                alias: "Table row (light)",
                                    element: {
                                                name: "",
                                                id: "",
                                                classname: ""
                                             },
                                overlay: false
                            },
                            {
                                selector: "table.list tr.bgdark",
                                alias: "Table row (dark)",
                                    element: {
                                                name: "",
                                                id: "",
                                                classname: ""
                                             },
                                overlay: false
                            },
                            {
                                selector: "table.list td",
                                alias: "Table cell",
                                    element: {
                                                name: "",
                                                id: "",
                                                classname: ""
                                             },
                                overlay: false
                            },
                            {
                                selector: "table.list td:first-child",
                                alias: "Table cell (first in a row)",
                                    element: {
                                                name: "",
                                                id: "",
                                                classname: ""
                                             },
                                overlay: false
                            }
                        ],
              overlay: false
          },
          {
              group: "tables",
              groupname: "Tables",
              alias: "Default table",
              elements: [
                            {
                                selector: "table.default",
                                alias: "Table",
                                element: {
                                            name: "",
                                            id: "",
                                            classname: ""
                                         },
                                overlay: false
                            },
                            {
                                selector: "table.default th",
                                alias: "Table header",
                                    element: {
                                                name: "",
                                                id: "",
                                                classname: ""
                                             },
                                overlay: false
                            },
                            {
                                selector: "table.default th:first-child",
                                alias: "Table header (first in a row)",
                                    element: {
                                                name: "",
                                                id: "",
                                                classname: ""
                                             },
                                overlay: false
                            },
                            {
                                selector: "table.default tr.bglight",
                                alias: "Table row (light)",
                                    element: {
                                                name: "",
                                                id: "",
                                                classname: ""
                                             },
                                overlay: false
                            },
                            {
                                selector: "table.default tr.bgdark",
                                alias: "Table row (dark)",
                                    element: {
                                                name: "",
                                                id: "",
                                                classname: ""
                                             },
                                overlay: false
                            },
                            {
                                selector: "table.default td",
                                alias: "Table cell",
                                    element: {
                                                name: "",
                                                id: "",
                                                classname: ""
                                             },
                                overlay: false
                            },
                            {
                                selector: "table.default td:first-child",
                                alias: "Table cell (first in a row)",
                                    element: {
                                                name: "",
                                                id: "",
                                                classname: ""
                                             },
                                overlay: false
                            }
                        ],
              overlay: false
          },
          {
              group: "tables",
              groupname: "Tables",
              alias: "Timetable",
              elements: [
                            {
                                selector: "table.cols",
                                alias: "Table",
                                element: {
                                            name: "",
                                            id: "",
                                            classname: ""
                                         },
                                overlay: false
                            },
                            {
                                selector: "table.cols th",
                                alias: "Table header",
                                    element: {
                                                name: "",
                                                id: "",
                                                classname: ""
                                             },
                                overlay: false
                            },
                            {
                                selector: "table.cols col.bglight",
                                alias: "Column (ligt)",
                                    element: {
                                                name: "",
                                                id: "",
                                                classname: ""
                                             },
                                overlay: false
                            },
                            {
                                selector: "table.cols col.bgdark",
                                alias: "Column (dark)",
                                    element: {
                                                name: "",
                                                id: "",
                                                classname: ""
                                             },
                                overlay: false
                            },
                            {
                                selector: "table.cols th:first-child",
                                alias: "Table header (first in a row)",
                                    element: {
                                                name: "",
                                                id: "",
                                                classname: ""
                                             },
                                overlay: false
                            },
                            {
                                selector: "table.cols tr.bglight",
                                alias: "Table row (light)",
                                    element: {
                                                name: "",
                                                id: "",
                                                classname: ""
                                             },
                                overlay: false
                            },
                            {
                                selector: "table.cols tr.bgdark",
                                alias: "Table row (dark)",
                                    element: {
                                                name: "",
                                                id: "",
                                                classname: ""
                                             },
                                overlay: false
                            },
                            {
                                selector: "table.cols td",
                                alias: "Table cell",
                                    element: {
                                                name: "",
                                                id: "",
                                                classname: ""
                                             },
                                overlay: false
                            },
                            {
                                selector: "table.cols td:first-child",
                                alias: "Table cell (first in a row)",
                                    element: {
                                                name: "",
                                                id: "",
                                                classname: ""
                                             },
                                overlay: false
                            }
                        ],
              overlay: false
          },
          {
              group: "tables",
              groupname: "Tables",
              alias: "Comparison table",
              elements: [
                            {
                                selector: "table.comparison",
                                alias: "Table",
                                element: {
                                            name: "",
                                            id: "",
                                            classname: ""
                                         },
                                overlay: false
                            },
                            {
                                selector: "table.comparison th",
                                alias: "Table header",
                                    element: {
                                                name: "",
                                                id: "",
                                                classname: ""
                                             },
                                overlay: false
                            },
                            {
                                selector: "table.cols col.bglight",
                                alias: "Column (ligt)",
                                    element: {
                                                name: "",
                                                id: "",
                                                classname: ""
                                             },
                                overlay: false
                            },
                            {
                                selector: "table.cols col.bgdark",
                                alias: "Column (dark)",
                                    element: {
                                                name: "",
                                                id: "",
                                                classname: ""
                                             },
                                overlay: false
                            },
                            {
                                selector: "table.comparison th:first-child",
                                alias: "Table header (first in a row)",
                                    element: {
                                                name: "",
                                                id: "",
                                                classname: ""
                                             },
                                overlay: false
                            },
                            {
                                selector: "table.comparison tr.bglight",
                                alias: "Table row (light)",
                                    element: {
                                                name: "",
                                                id: "",
                                                classname: ""
                                             },
                                overlay: false
                            },
                            {
                                selector: "table.comparison tr.bgdark",
                                alias: "Table row (dark)",
                                    element: {
                                                name: "",
                                                id: "",
                                                classname: ""
                                             },
                                overlay: false
                            },
                            {
                                selector: "table.comparison td",
                                alias: "Table cell",
                                    element: {
                                                name: "",
                                                id: "",
                                                classname: ""
                                             },
                                overlay: false
                            },
                            {
                                selector: "table.comparison td:first-child",
                                alias: "Table cell (first in a row)",
                                    element: {
                                                name: "",
                                                id: "",
                                                classname: ""
                                             },
                                overlay: false
                            }
                        ],
              overlay: false
          },
          {
              group: "lists",
              groupname: "Lists",
              alias: "Ordered list",
              elements: [
                            {
                                selector: "ol, div#main ol",
                                alias: "List",
                                element: {
                                            name: "",
                                            id: "",
                                            classname: ""
                                         },
                                overlay: false
                            },
                            {
                                selector: "ol li, div#main ol li",
                                alias: "List item",
                                    element: {
                                                name: "",
                                                id: "",
                                                classname: ""
                                             },
                                overlay: false
                            }
                        ],
              overlay: false
          },
          {
              group: "lists",
              groupname: "Lists",
              alias: "Unordered list",
              elements: [
                            {
                                selector: "ul, div#main ul",
                                alias: "List",
                                element: {
                                            name: "",
                                            id: "",
                                            classname: ""
                                         },
                                overlay: false
                            },
                            {
                                selector: "ul li, div#main ul li",
                                alias: "List item",
                                    element: {
                                                name: "",
                                                id: "",
                                                classname: ""
                                             },
                                overlay: false
                            }
                        ],
              overlay: false
          }
      ];
{/literal}
    YAHOO.ez.StyleEditor.cfg = {ldelim} requestpath: {"/ezjscore/call"|ezurl}, 
                                  colorpickericon: {"color-picker-icon.gif"|ezimage},
                                  browseimageicon: {"browse-img.gif"|ezimage},
                                  previewimageicon: {"preview-img.gif"|ezimage},
                                  pickerthumb: {"picker_thumb.png"|ezimage},
                                  huethumb: {"hue_thumb.png"|ezimage},
                                  siteurl: "{$last_access_uri|ezurl( 'no' )}",
                                  helpurl: "{$help_url}",
                                  object: "{$module_result.content_info.object_id}",
                                  mode: {if $can_administrate}"administrator"{else}"user"{/if}, // "user" | "administrator"
                                  BUTTON_LABELS: [ "{'Add'|i18n( 'design/standard/ezcssstyle' )|wash('javascript')}", 
                                                   "{'Remove'|i18n( 'design/standard/ezcssstyle' )|wash('javascript')}", 
                                                   "{'Save'|i18n( 'design/standard/ezcssstyle' )|wash('javascript')}", 
                                                   "{'Apply'|i18n( 'design/standard/ezcssstyle' )|wash('javascript')}", 
                                                   "{'Cancel'|i18n( 'design/standard/ezcssstyle' )|wash('javascript')}", 
                                                   "{'Upload'|i18n( 'design/standard/ezcssstyle' )|wash('javascript')}", 
                                                   "{'Choose'|i18n( 'design/standard/ezcssstyle' )|wash('javascript')}",
                                                   "{'Restore'|i18n( 'design/standard/ezcssstyle' )|wash('javascript')}",
                                                   "{'Create'|i18n( 'design/standard/ezcssstyle' )|wash('javascript')}",
                                                   "{'Version list'|i18n( 'design/standard/ezcssstyle' )|wash('javascript')}" ],
                                  MENU_LABELS: [ "{'Elements'|i18n( 'design/standard/ezcssstyle' )|wash('javascript')}", 
                                                 "{'Help'|i18n( 'design/standard/ezcssstyle' )|wash('javascript')}",
                                                 "{'Exit'|i18n( 'design/standard/ezcssstyle' )|wash('javascript')}" ],
                                  DIALOG_LABELS: [ "{'Properties for'|i18n( 'design/standard/ezcssstyle' )|wash('javascript')}", 
                                                   "{'Property list is empty.'|i18n( 'design/standard/ezcssstyle' )|wash('javascript')}", 
                                                   "{'Insert image'|i18n( 'design/standard/ezcssstyle' )|wash('javascript')}",
                                                   "{'Image list is empty.'|i18n( 'design/standard/ezcssstyle' )|wash('javascript')}",
                                                   "{'Do you really want to remove selected properties?'|i18n( 'design/standard/ezcssstyle' )|wash('javascript')}",
                                                   "{'Do you really want to remove selected image?'|i18n( 'design/standard/ezcssstyle' )|wash('javascript')}",
                                                   "{'Rules for'|i18n( 'design/standard/ezcssstyle' )|wash('javascript')}",
                                                   "{'Version'|i18n( 'design/standard/ezcssstyle' )|wash('javascript')}",
                                                   "{'Created'|i18n( 'design/standard/ezcssstyle' )|wash('javascript')}",
                                                   "{'Modified'|i18n( 'design/standard/ezcssstyle' )|wash('javascript')}",
                                                   "{'Site style list'|i18n( 'design/standard/ezcssstyle' )|wash('javascript')}",
                                                   "{'Version list'|i18n( 'design/standard/ezcssstyle' )|wash('javascript')}" ]
                         {rdelim};
    YAHOO.ez.StyleEditor.init();
{literal}
  }

  YUILoader.addModule({
      name: "styleeditor",
      type: "js",
{/literal}
      fullpath: "{'javascript/ezstyleeditor.js'|ezdesign( 'no' )}"
{literal}
  });

  YUILoader.addModule({
      name: "styleeditorcolorpicker",
      type: "js",
{/literal}
      fullpath: "{'javascript/ezstyleeditorcolorpicker.js'|ezdesign( 'no' )}"
{literal}
  });

  YUILoader.addModule({
      name: "styleeditorstylesheet",
      type: "css",
{/literal}
      fullpath: "{'stylesheets/ezstyleeditor.css'|ezdesign( 'no' )}"
{literal}
  });

  YUILoader.ignore = ["reset","fonts"];
  YUILoader.require(["button","colorpicker","container","json","menu","grids","slider","treeview","utilities","styleeditor","styleeditorcolorpicker","styleeditorstylesheet"]);
  YUILoader.insert();
})();
{/literal}
</script>