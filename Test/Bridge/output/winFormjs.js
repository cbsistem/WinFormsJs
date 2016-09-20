﻿Bridge.assembly("WinFormjs", function ($asm, globals) {
    "use strict";

    Bridge.define("WinFormjs.App", {
        $main: function () {
            WinFormjs.Form.setup();

            //var butBing = new HTMLButtonElement
            //{
            //	InnerHTML = "Bing",
            //	OnClick = (ev) =>
            //	{
            //		var frm = new FormBrowser();
            //		frm.Left = "50px";
            //		frm.Top = "50px";
            //		frm.Text = "Bing";
            //		frm.Navigate("https://bing.com");
            //		frm.Show();
            //	}
            //};

            //         //var butLel = new HTMLButtonElement
            //         //{
            //         //    InnerHTML = "Lel",
            //         //    OnClick = (ev) =>
            //         //    {
            //         //        var frm = new FormBrowser();
            //         //        frm.Left = "50px";
            //         //        frm.Top = "50px";
            //         //        frm.Text = "Lel";
            //         //        frm.Navigate("file:///C:/Users/Samuel/Desktop/Test/Test/Bridge/www/demo.html");
            //         //        frm.Show();
            //         //    }
            //         //};

            //         var butNote = new HTMLButtonElement
            //{
            //	InnerHTML = "NotePad",
            //	OnClick = (ev) =>
            //	{
            //		var frm = new FormNotePad();
            //		frm.Left = "50px";
            //		frm.Top = "50px";
            //		frm.Text = "Note Pad";
            //		frm.Show();
            //	}
            //};

            //         var butCmd = new HTMLButtonElement
            //         {
            //             InnerHTML = "Command Prompt",
            //             OnClick = (ev) =>
            //             {
            //                 var frm = new FormConsole();
            //                 frm.Left = "50px";
            //                 frm.Top = "50px";
            //                 frm.Text = "Command Prompt";
            //                 frm.Show();
            //             }
            //         };

            //         Form.WindowHolder.AppendChild(butBing);
            //Form.WindowHolder.AppendChild(butNote);	//Form.WindowHolder.AppendChild(butLel);			
            //         Form.WindowHolder.AppendChild(butCmd);
        }
    });

    Bridge.define("WinFormjs.FileExplorerNode", {
        statics: {
            createNode: function (path, nvt, parent, IsFile) {
                if (IsFile === void 0) { IsFile = false; }
                var fen = Bridge.merge(new WinFormjs.FileExplorerNode(), {
                    setIsFile: IsFile,
                    setnodeViewType: nvt
                } );
                fen.parent = parent;
                fen.setName(WinFormjs.Path.getFileName(path));
                fen.setDirectory(WinFormjs.Path.getDirectoryName(path));
                fen.setFullPath(path);
                fen.setIcon(WinFormjs.IconRepository.getIconByFileName(fen.getName()));

                fen.createHtmlNode();

                return fen;
            }
        },
        nodeImage: null,
        nodeText: null,
        nodeState: 0,
        parent: null,
        config: {
            properties: {
                Name: null,
                Directory: null,
                FullPath: null,
                nodeViewType: 0,
                IsFile: false,
                Icon: "",
                NodeBase: null
            }
        },
        getNodeExplorerState: function () {
            return this.nodeState;
        },
        setNodeExplorerState: function (value) {
            if (this.nodeState !== value) {
                this.nodeState = value;
                if (this.getNodeBase() != null) {
                    this.createHtmlNode();
                }
            }
        },
        createHtmlNode: function () {
            if (this.getNodeBase() == null) {
                this.setNodeBase(document.createElement('div'));
                this.nodeImage = document.createElement('div');
                this.nodeText = document.createElement('span');

                this.getNodeBase().style.zIndex = "0";

                this.getNodeBase().style.position = "absolute";
                this.nodeImage.style.position = "absolute";
                this.nodeText.style.position = "absolute";

                this.getNodeBase().addEventListener("dblclick", Bridge.fn.bind(this, $_.WinFormjs.FileExplorerNode.f1));

                this.getNodeBase().addEventListener("mouseup", Bridge.fn.bind(this, $_.WinFormjs.FileExplorerNode.f2));

                this.getNodeBase().addEventListener("mousedown", Bridge.fn.bind(this, $_.WinFormjs.FileExplorerNode.f3));

                this.getNodeBase().addEventListener("mouseenter", Bridge.fn.bind(this, $_.WinFormjs.FileExplorerNode.f4));

                this.getNodeBase().addEventListener("mouseleave", Bridge.fn.bind(this, $_.WinFormjs.FileExplorerNode.f5));

                if (this.getnodeViewType() === WinFormjs.NodeViewType.Medium_Icons) {
                    $(this.nodeImage).css("width", 48).css("height", 48).css("left", 14).css("top", 2);

                    this.getNodeBase().style.borderStyle = "solid";
                    this.getNodeBase().style.borderWidth = "thin";

                    var img = new Image();

                    img.style.maxWidth = "100%";
                    img.style.maxHeight = "100%";

                    img.style.position = "absolute";
                    img.style.display = "block";

                    if (this.getIsFile()) {
                        if (Bridge.referenceEquals(this.getIcon(), "")) {
                            img.setAttribute("src", WinFormjs.IconRepository.IMAGE_File); // NodeImage.Style.Background = FileExplorer.IMAGE_File;
                        } else {
                            img.setAttribute("src", this.getIcon()); // NodeImage.Style.Background = FileExplorer.IMAGE_File;
                        }
                    } else {
                        img.setAttribute("src", WinFormjs.IconRepository.IMAGE_Folder);
                    } //NodeImage.Style.Background = FileExplorer.IMAGE_Folder;

                    WinFormjs.Form.disableStateDrag(img);

                    this.nodeImage.appendChild(img);

                    this.nodeText.innerHTML = this.getName();
                    this.nodeText.style.fontFamily = "Segoe UI";
                    this.nodeText.style.fontSize = "9.5pt";
                    this.nodeText.style.textAlign = "center";
                    this.nodeText.style.cursor = "default";
                    this.nodeText.style.textShadow = "0px 2px 7px rgba(0, 0, 0, 0.5)";

                    // think you are looking for  text-overflow: ellipsis in combination with white-space: nowrap
                    this.nodeText.style.textOverflow = "ellipsis";
                    this.nodeText.style.whiteSpace = "nowrap";
                    this.nodeText.style.overflow = "hidden";


                    WinFormjs.Form.setInternalLabel(this.nodeText);

                    WinFormjs.Form.changeStateTextSelection(this.nodeText, false);
                    WinFormjs.Form.changeStateTextSelection(this.nodeImage, false);
                    WinFormjs.Form.changeStateTextSelection(this.getNodeBase(), false);
                    WinFormjs.Form.changeStateTextSelection(img, false);

                    $(this.nodeText).css("width", 74).css("height", 20).css("left", 2).css("top", 48);

                    this.nodeText.style.color = "white";

                    this.getNodeBase().appendChild(this.nodeImage);
                    this.getNodeBase().appendChild(this.nodeText);
                }
            }

            if (this.getnodeViewType() === WinFormjs.NodeViewType.Medium_Icons) {
                if (this.nodeState === WinFormjs.FileExplorerNode.FileExplorerState.Focused || this.nodeState === WinFormjs.FileExplorerNode.FileExplorerState.HoverFocused) {
                    this.nodeText.style.overflow = "visible";

                    $(this.getNodeBase()).css("width", ((((76 - this.nodeText.clientWidth) | 0) + this.nodeText.scrollWidth) | 0)).css("height", ((50 + this.nodeText.scrollHeight) | 0));
                } else {
                    $(this.getNodeBase()).css("width", 76).css("height", 70);

                    this.nodeText.style.overflow = "hidden";
                }
            }

            // image 48x48

            switch (this.nodeState) {
                case WinFormjs.FileExplorerNode.FileExplorerState.None: 
                    this.getNodeBase().style.backgroundColor = "";
                    this.getNodeBase().style.borderColor = "rgba(255, 255, 255, 0)";
                    break;
                case WinFormjs.FileExplorerNode.FileExplorerState.HoverSelected: 
                case WinFormjs.FileExplorerNode.FileExplorerState.HoverFocused: 
                case WinFormjs.FileExplorerNode.FileExplorerState.Hover: 
                    this.getNodeBase().style.backgroundColor = "rgba(255, 255, 255, 0.2)";
                    this.getNodeBase().style.borderColor = "rgba(255, 255, 255, 0.5)";
                    break;
                case WinFormjs.FileExplorerNode.FileExplorerState.Selected: 
                case WinFormjs.FileExplorerNode.FileExplorerState.Focused: 
                    this.getNodeBase().style.backgroundColor = "rgba(255, 255, 255, 0.4)";
                    this.getNodeBase().style.borderColor = "rgba(255, 255, 255, 0.5)";
                    break;
                default: 
                    break;
            }
        },
        remove: function () {
            if (this.getNodeBase() != null) {
                this.getNodeBase().remove();
            }
        }
    });

    var $_ = {};

    Bridge.ns("WinFormjs.FileExplorerNode", $_);

    Bridge.apply($_.WinFormjs.FileExplorerNode, {
        f1: function (ev) {
            if (!WinFormjs.Form.midleOfAction()) {
                this.parent.clearSelection();

                WinFormjs.Process.start(this.getFullPath());
            }
        },
        f2: function (ev) {
            if (!WinFormjs.Form.midleOfAction()) {
                // did i drag...
                this.parent.clearSelection(this);
            }
        },
        f3: function (ev) {
            if (!WinFormjs.Form.midleOfAction()) {
                var selectionCount = this.parent.getSelectionCount(this);

                if (this.getNodeExplorerState() === WinFormjs.FileExplorerNode.FileExplorerState.Selected) {
                    if (selectionCount === 0) {
                        this.parent.clearSelection(this);
                    }
                    this.setNodeExplorerState(WinFormjs.FileExplorerNode.FileExplorerState.Focused);
                } else {
                    if (selectionCount === 0) {
                        this.parent.clearSelection(this);
                    }
                    this.setNodeExplorerState(WinFormjs.FileExplorerNode.FileExplorerState.Focused);
                }
                ev.stopPropagation();
            }
        },
        f4: function (ev) {
            if (!WinFormjs.Form.midleOfAction()) {
                if (this.getNodeExplorerState() === WinFormjs.FileExplorerNode.FileExplorerState.Focused || this.getNodeExplorerState() === WinFormjs.FileExplorerNode.FileExplorerState.HoverFocused) {
                    this.setNodeExplorerState(WinFormjs.FileExplorerNode.FileExplorerState.HoverFocused);
                } else if (this.getNodeExplorerState() === WinFormjs.FileExplorerNode.FileExplorerState.Selected || this.getNodeExplorerState() === WinFormjs.FileExplorerNode.FileExplorerState.HoverSelected) {
                    this.setNodeExplorerState(WinFormjs.FileExplorerNode.FileExplorerState.HoverSelected);
                } else {
                    this.setNodeExplorerState(WinFormjs.FileExplorerNode.FileExplorerState.Hover);
                }
                ev.stopPropagation();
            }
        },
        f5: function (ev) {
            if (!WinFormjs.Form.midleOfAction()) {
                if (this.getNodeExplorerState() === WinFormjs.FileExplorerNode.FileExplorerState.HoverFocused || this.getNodeExplorerState() === WinFormjs.FileExplorerNode.FileExplorerState.Focused) {
                    this.setNodeExplorerState(WinFormjs.FileExplorerNode.FileExplorerState.Focused);
                } else if (this.getNodeExplorerState() === WinFormjs.FileExplorerNode.FileExplorerState.HoverSelected || this.getNodeExplorerState() === WinFormjs.FileExplorerNode.FileExplorerState.Selected) {
                    this.setNodeExplorerState(WinFormjs.FileExplorerNode.FileExplorerState.Selected);
                } else {
                    this.setNodeExplorerState(WinFormjs.FileExplorerNode.FileExplorerState.None);
                }
                ev.stopPropagation();
            }
        }
    });

    Bridge.define("WinFormjs.FileExplorer", {
        statics: {
            DesktopPath: "$desktop",
            isDirectoryRequestValue: function (directory) {



                return true;
            }
        },
        path: null,
        element: null,
        loadedNodes: null,
        config: {
            properties: {
                NodeViewType: 0
            },
            init: function () {
                this.loadedNodes = new (System.Collections.Generic.List$1(WinFormjs.FileExplorerNode))();
            }
        },
        ctor: function (element) {
            this.$initialize();
            this.element = element;
        },
        getPath: function () {
            return this.path;
        },
        setPath: function (value) {
            if (!Bridge.referenceEquals(this.path, value)) {
                if (WinFormjs.FileExplorer.isDirectoryRequestValue(value)) {
                    this.path = value;
                    this.refresh();
                } else {
                    this.warnEnduserOfInvalidRequest();
                }
            }
        },
        warnEnduserOfInvalidRequest: function () {

        },
        clearItems: function () {
            for (var i = 0; i < this.loadedNodes.getCount(); i = (i + 1) | 0) {
                if (this.loadedNodes.getItem(i) != null) {
                    this.loadedNodes.getItem(i).remove();
                }
            }
            this.loadedNodes = new (System.Collections.Generic.List$1(WinFormjs.FileExplorerNode))();
        },
        getSelectionCount: function (DontInclude) {
            if (DontInclude === void 0) { DontInclude = null; }
            var x = 0;
            for (var i = 0; i < this.loadedNodes.getCount(); i = (i + 1) | 0) {
                if (this.loadedNodes.getItem(i) != null && !Bridge.referenceEquals(this.loadedNodes.getItem(i), DontInclude)) {
                    var htmlNode = this.loadedNodes.getItem(i).getNodeBase();
                    if (htmlNode != null) {
                        if (this.loadedNodes.getItem(i).getNodeExplorerState() === WinFormjs.FileExplorerNode.FileExplorerState.Selected || this.loadedNodes.getItem(i).getNodeExplorerState() === WinFormjs.FileExplorerNode.FileExplorerState.HoverSelected) {
                            x = (x + 1) | 0;
                        }
                    }
                }
            }
            return x;
        },
        clearSelection: function (DontInclude) {
            if (DontInclude === void 0) { DontInclude = null; }
            for (var i = 0; i < this.loadedNodes.getCount(); i = (i + 1) | 0) {
                if (this.loadedNodes.getItem(i) != null && !Bridge.referenceEquals(this.loadedNodes.getItem(i), DontInclude)) {
                    var htmlNode = this.loadedNodes.getItem(i).getNodeBase();
                    if (htmlNode != null) {
                        this.loadedNodes.getItem(i).setNodeExplorerState(WinFormjs.FileExplorerNode.FileExplorerState.None);
                    }
                }
            }
        },
        setFocus: function (index) {
            this.setFocus$1(this.loadedNodes.getItem(index));
        },
        setFocus$1: function (node) {
            for (var i = 0; i < this.loadedNodes.getCount(); i = (i + 1) | 0) {
                if (this.loadedNodes.getItem(i) != null) {
                    var htmlNode = this.loadedNodes.getItem(i).getNodeBase();
                    if (htmlNode != null) {
                        if (Bridge.referenceEquals(this.loadedNodes.getItem(i), node)) {
                            if (this.loadedNodes.getItem(i).getNodeExplorerState() === WinFormjs.FileExplorerNode.FileExplorerState.Hover) {
                                this.loadedNodes.getItem(i).setNodeExplorerState(WinFormjs.FileExplorerNode.FileExplorerState.HoverFocused);
                            } else {
                                this.loadedNodes.getItem(i).setNodeExplorerState(WinFormjs.FileExplorerNode.FileExplorerState.Focused);
                            }
                        } else {
                            this.loadedNodes.getItem(i).setNodeExplorerState(WinFormjs.FileExplorerNode.FileExplorerState.None);
                        }

                    }
                }
            }
        },
        refresh: function () {
            if (this.loadedNodes == null) {
                this.loadedNodes = new (System.Collections.Generic.List$1(WinFormjs.FileExplorerNode))();
            } else {
                if (this.loadedNodes.getCount() > 0) {
                    this.clearItems();
                }
            }

            var nvt = this.getNodeViewType();
            if (Bridge.referenceEquals(this.getPath(), WinFormjs.FileExplorer.DesktopPath)) {
                // load the locations of the desktop items.
                nvt = WinFormjs.NodeViewType.Medium_Icons;
            }

            var Files = WinFormjs.Directory.getFiles(this.getPath());
            var Folders = WinFormjs.Directory.getDirectories(this.getPath());

            for (var i = 0; i < Files.length; i = (i + 1) | 0) {
                this.loadedNodes.add(WinFormjs.FileExplorerNode.createNode(Files[i], this.getNodeViewType(), this, true));
            }

            for (var i1 = 0; i1 < Folders.length; i1 = (i1 + 1) | 0) {
                this.loadedNodes.add(WinFormjs.FileExplorerNode.createNode(Folders[i1], this.getNodeViewType(), this));
            }

            // get the order type!! #TODO# sort items
            var x = 0;
            var y = 19;

            var j = 0;

            for (var i2 = 0; i2 < this.loadedNodes.getCount(); i2 = (i2 + 1) | 0) {
                if (this.loadedNodes.getItem(i2) != null && this.loadedNodes.getItem(i2).getNodeBase() != null) {
                    $(this.loadedNodes.getItem(i2).getNodeBase()).css("left", x).css("top", y);
                    this.element.appendChild(this.loadedNodes.getItem(i2).getNodeBase());
                    j = (j + 1) | 0;

                    y = (y + 70) | 0;

                    if (j > 8) {
                        x = (x + 78) | 0;
                        y = 0;

                        j = 0;
                    }

                    y = (y + 19) | 0;
                }

            }
        }
    });

    Bridge.define("WinFormjs.FileExplorerNode.FileExplorerState", {
        $kind: "enum",
        statics: {
            None: 0,
            Hover: 1,
            Focused: 2,
            Selected: 3,
            HoverFocused: 4,
            HoverSelected: 5
        }
    });

    Bridge.define("WinFormjs.Form", {
        statics: {
            movingForm: null,
            parent: null,
            visibleForm: null,
            window_Desktop: null,
            _ActiveForm: null,
            _PrevActiveForm: null,
            moveAction: 0,
            windowHolderSelectionBoxX: 0,
            windowHolderSelectionBoxY: 0,
            IMAGE_WinIcon: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAoCAIAAAA35e4mAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACSSURBVFhH7dbRCYAgFIXhRnASN3ADJ3GSu4gbuIGD1SUlejCOBpLE+R4NOT/0UJtZDIMQBiEMQhiEMAj5b5C11nsfQhCRlFLOeT/Vx93eBDnndFuHY4w6rCdlu6lc6TccVHdumoeXcqsfgxAGIcNBs/GVIQxCGIQMB6m1Pq5Pvvz9mIpBCIMQBiEMQhiELBZkzAGoRY/1a8YOvQAAAABJRU5ErkJggg==')",
            IMAGE_WinIconHover: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAoCAIAAAA35e4mAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACmSURBVFhH7dYxCoQwEIVhb5NasNBGZCstBUFkL7Dg9ttq6QG8gJ2FB/I2DkS2EOUlghjkfUwVCfODhXrKMQxCGIQwCGEQwiDkuUF+GEdp8arq7NOU7fDupu84y6yPjZ0JCpJMdsvi/NfLYjnRu3dHXzFnHbTZJ7N7+B99yxyDEAYh1kFX4ytDGIQwCLEOEm59XI/c+ftxKQYhDEIYhDAIYRDiWJBSC3edj/DGIv8/AAAAAElFTkSuQmCC')",
            IMAGE_WinIconDown: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAoCAIAAAA35e4mAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACnSURBVFhHY5AZZGDUQYTAqIMIgVEHEQKjDiIERh1ECAxfBynrGGvbehv6JFnGVrmUznWvXRE27zoQQaWJBuQ4SN3UHmg30GLHvIlAi4EiELuxIogW4gHJDkKzD4iwCsIRRBfxYNRBhMCogwgBkh1EazAaZYTAqIMIgVEHEQIkOwgIBlfligsMZPODpmDUQYTAqIMIgVEHEQKjDiIERh1ECAwyB8nIAADHEJbDMY47rQAAAABJRU5ErkJggg==')",
            config: {
                properties: {
                    TaskBar: null,
                    WindowHolder: null,
                    ButtonStart: null,
                    InputStartSearch: null,
                    ResizeCorners: 2,
                    Mouse_Down: false,
                    FadeLength: 100,
                    Window_BorderColorFocused: "#FBFBFB",
                    Window_BorderColor: "#FBFBFB",
                    Window_HeadingBackgroundColor: "white",
                    Window_DefaultBackgroundColor: "#F0F0F0",
                    /**
                     * This is used for testing
                     *
                     * @static
                     * @public
                     * @this WinFormjs.Form
                     * @memberof WinFormjs.Form
                     * @function getShowBodyOverLay
                     * @return  {boolean}
                     */
                    /**
                     * This is used for testing
                     *
                     * @static
                     * @public
                     * @this WinFormjs.Form
                     * @memberof WinFormjs.Form
                     * @function setShowBodyOverLay
                     * @param   {boolean}    value
                     * @return  {void}
                     */
                    ShowBodyOverLay: false,
                    Window_DefaultHeight: 480,
                    Window_DefaultWidth: 640,
                    WindowHolderSelectionBox: null
                },
                init: function () {
                    this.visibleForm = new (System.Collections.Generic.List$1(WinFormjs.Form))();
                }
            },
            getActiveForm: function () {
                return WinFormjs.Form._ActiveForm;
            },
            setActiveForm: function (value) {
                if (!Bridge.referenceEquals(WinFormjs.Form._ActiveForm, value)) {
                    WinFormjs.Form._PrevActiveForm = WinFormjs.Form._ActiveForm;

                    if (WinFormjs.Form._ActiveForm != null) {
                        if (WinFormjs.Form._ActiveForm.getBase() != null) {
                            WinFormjs.Form._ActiveForm.getBodyOverLay().style.visibility = "visible";

                            WinFormjs.Form._ActiveForm.getBase().style.borderColor = WinFormjs.Form.getWindow_BorderColor();
                        }
                    }
                    WinFormjs.Form._ActiveForm = value;
                    if (WinFormjs.Form._ActiveForm != null) {
                        if (WinFormjs.Form._ActiveForm.getBase() != null) {
                            WinFormjs.Form._ActiveForm.getBodyOverLay().style.visibility = "collapse";
                            WinFormjs.Form._ActiveForm.getBase().style.borderColor = WinFormjs.Form.getWindow_BorderColorFocused();
                            WinFormjs.Form._ActiveForm.bringToFront();
                        }
                    }
                }

            },
            midleOfAction: function () {
                return WinFormjs.Form.getWindowHolderSelectionBox() != null || WinFormjs.Form.movingForm != null;
            },
            setBodyOverLay: function () {
                for (var i = 0; i < WinFormjs.Form.visibleForm.getCount(); i = (i + 1) | 0) {
                    var frm = WinFormjs.Form.visibleForm.getItem(i);
                    if (frm != null && frm.getBodyOverLay() != null && frm.getBodyOverLay().style.visibility === "collapse") {
                        frm.getBodyOverLay().style.visibility = "visible";
                    }
                }
            },
            createStartSearchInput: function () {
                var input = Bridge.merge(document.createElement('input'), {
                    type: "text"
                } );
                var InputFocused = false;

                input.id = "StartSearchInput";
                input.style.position = "absolute";
                input.style.width = "344px";
                input.style.height = "40px";
                input.style.left = "48px";
                input.style.top = "0";
                input.style.backgroundColor = "#3F3F3F";

                input.style.borderStyle = "none";
                input.style.padding = "0";
                input.style.margin = "0";

                input.style.fontFamily = "Segoe UI";
                input.style.fontSize = "11pt";
                input.style.textIndent = "13px";
                input.style.color = "black";

                input.placeholder = "Search the web and Windows";

                //	Heading.Style.FontFamily = "Segoe UI";		
                input.addEventListener("keyup", function (ev) {
                    var kev = ev;

                    if (kev.keyCode === 13) {
                        // create a new Form

                        var frm = new WinFormjs.FormBrowser();
                        frm.setLeft("100px");
                        frm.setTop("100px");
                        //https://www.bing.com/search?q=
                        //https://www.google.com/#q=
                        frm.navigate(System.String.format("https://www.bing.com/search?q={0}", input.value));
                        frm.show();

                        input.blur();
                    }
                });


                input.onmouseup = $_.WinFormjs.Form.f1;
                $(input).on("focus", function () {
                    input.style.backgroundColor = "#F3F3F3";
                    input.style.outline = "0";
                });
                $(input).on("focusout", function () {
                    input.style.backgroundColor = "#3F3F3F";
                    input.value = "";
                    InputFocused = false;
                });
                $(input).on("focusin", function () {
                    input.style.backgroundColor = "#F3F3F3";
                    InputFocused = true;
                });

                input.onmousedown = $_.WinFormjs.Form.f2;

                input.onmouseenter = function (ev) {
                    if (WinFormjs.Form.midleOfAction()) {
                        return;
                    }
                    if (InputFocused) {
                        input.style.backgroundColor = "#F3F3F3";
                    } else {
                        input.style.backgroundColor = "#575757";
                    }
                };

                input.onmouseleave = function (ev) {
                    if (WinFormjs.Form.midleOfAction()) {
                        return;
                    }

                    if (InputFocused) {
                        input.style.backgroundColor = "#F3F3F3";
                    } else {
                        input.style.backgroundColor = "#3F3F3F";
                    }
                };

                return input;
            },
            changeStateTextSelection: function (element, state) {
                if (state) {
                    $(element).css("user-select", "text");
                } else {
                    $(element).css("user-select", "none");
                }
            },
            disableStateDrag: function (element) {
                if (Bridge.is(element, HTMLImageElement)) {
                    element.ondragstart = $_.WinFormjs.Form.f3;
                } else {
                    $(element).css("user-drag:", "none");
                }
            },
            createStartButton: function () {
                var butt = document.createElement('div');

                butt.style.width = "48px";
                butt.style.height = "40px";
                butt.style.position = "absolute";
                butt.style.fontSize = "12pt";
                butt.style.background = WinFormjs.Form.IMAGE_WinIcon;

                butt.onmouseup = function (ev) {
                    if (WinFormjs.Form.midleOfAction()) {
                        return;
                    }

                    ev.stopPropagation();
                    ev.preventDefault();

                    butt.style.background = WinFormjs.Form.IMAGE_WinIcon;
                };

                butt.onmousedown = function (ev) {
                    if (WinFormjs.Form.midleOfAction()) {
                        return;
                    }

                    WinFormjs.Form.setMouse_Down(true);

                    ev.stopPropagation();
                    ev.preventDefault();

                    butt.style.background = WinFormjs.Form.IMAGE_WinIconDown;

                    WinFormjs.Form.setActiveForm(null);
                };

                butt.onmouseenter = function (ev) {
                    if (WinFormjs.Form.midleOfAction()) {
                        return;
                    }

                    if (WinFormjs.Form.getMouse_Down()) {
                        butt.style.background = WinFormjs.Form.IMAGE_WinIconDown;
                    } else {
                        butt.style.background = WinFormjs.Form.IMAGE_WinIconHover;
                    }
                };

                butt.onmouseleave = function (ev) {
                    if (WinFormjs.Form.midleOfAction()) {
                        return;
                    }

                    butt.style.background = WinFormjs.Form.IMAGE_WinIcon;
                };

                return butt;
            },
            setup: function (parent) {
                if (parent === void 0) { parent = null; }
                var keyCodes = new (System.Collections.Generic.List$1(System.Int32))([61, 107, 173, 109, 187, 189]);

                document.addEventListener("keydown", function (ev) {
                    var kev = ev;

                    if (kev.ctrlKey && (keyCodes.contains(kev.which))) {
                        ev.preventDefault();
                    }
                });

                $(window).bind('mousewheel DOMMouseScroll', function (event) { if (event.ctrlKey == true) { event.preventDefault(); } });

                if (parent == null) {
                    WinFormjs.Form.parent = document.body;
                } else {
                    WinFormjs.Form.parent = parent;
                }

                WinFormjs.Form.setWindowHolder(document.createElement('div'));
                WinFormjs.Form.getWindowHolder().style.position = "absolute";

                WinFormjs.Form.getWindowHolder().style.width = "100%";
                WinFormjs.Form.getWindowHolder().style.height = "-webkit-calc(100% - 40px)";
                WinFormjs.Form.getWindowHolder().style.top = "0";
                WinFormjs.Form.getWindowHolder().style.left = "0";
                WinFormjs.Form.getWindowHolder().style.backgroundColor = "cornflowerblue";
                WinFormjs.Form.getWindowHolder().style.zIndex = "0";
                WinFormjs.Form.getWindowHolder().style.overflow = "auto";

                WinFormjs.Form.getWindowHolder().addEventListener("mousedown", $_.WinFormjs.Form.f4);

                //SetBodyOverLay();

                WinFormjs.Form.changeStateTextSelection(WinFormjs.Form.getWindowHolder(), false);

                WinFormjs.Form.setTaskBar(document.createElement('div'));
                WinFormjs.Form.getTaskBar().style.position = "absolute";

                WinFormjs.Form.getTaskBar().style.width = "100%";
                WinFormjs.Form.getTaskBar().style.height = "40px";
                WinFormjs.Form.getTaskBar().style.top = "-webkit-calc(100% - 40px)";
                WinFormjs.Form.getTaskBar().style.left = "0";
                WinFormjs.Form.getTaskBar().style.zIndex = (2147483647).toString();

                WinFormjs.Form.changeStateTextSelection(WinFormjs.Form.getTaskBar(), false);

                WinFormjs.Form.getTaskBar().style.backgroundColor = "#101010";

                WinFormjs.Form.setButtonStart(WinFormjs.Form.createStartButton());

                WinFormjs.Form.setInputStartSearch(WinFormjs.Form.createStartSearchInput());

                var mouseMove = $_.WinFormjs.Form.f5;

                window.addEventListener("mouseup", $_.WinFormjs.Form.f7);

                window.addEventListener("mousemove", mouseMove);

                WinFormjs.Form.parent.appendChild(WinFormjs.Form.getWindowHolder());
                WinFormjs.Form.parent.appendChild(WinFormjs.Form.getTaskBar());

                WinFormjs.Form.getTaskBar().appendChild(WinFormjs.Form.getButtonStart());
                WinFormjs.Form.getTaskBar().appendChild(WinFormjs.Form.getInputStartSearch());

                WinFormjs.Form.window_Desktop = Bridge.merge(new WinFormjs.FileExplorer(WinFormjs.Form.getWindowHolder()), {
                    setNodeViewType: WinFormjs.NodeViewType.Medium_Icons,
                    setPath: WinFormjs.FileExplorer.DesktopPath
                } );
            },
            setInternalLabel: function (element) {
                element.setAttribute("IL", "1"); // Internal Label
            },
            calculateZOrder: function () {
                if (WinFormjs.Form.visibleForm == null) {
                    return;
                }
                for (var i = 0; i < WinFormjs.Form.visibleForm.getCount(); i = (i + 1) | 0) {
                    if (WinFormjs.Form.visibleForm.getItem(i) != null && WinFormjs.Form.visibleForm.getItem(i).getBase() != null) {
                        $(WinFormjs.Form.visibleForm.getItem(i).getBase()).css("zIndex", ((i + 1) | 0));
                    }
                }
            }
        },
        prev_px: 0,
        prev_py: 0,
        prev_width: 0,
        prev_height: 0,
        prev_top: 0,
        prev_left: 0,
        config: {
            properties: {
                Base: null,
                Heading: null,
                ButtonClose: null,
                ButtonExpand: null,
                ButtonMinimize: null,
                HeadingTitle: null,
                Body: null,
                BodyOverLay: null,
                Owner: null,
                MinWidth: 200,
                MinHeight: 50,
                windowState: 0
            }
        },
        ctor: function () {
            this.$initialize();
            this.setBase(document.createElement('div'));
            this.setHeading(document.createElement('div'));
            this.setHeadingTitle(document.createElement('span'));
            this.setBody(document.createElement('div'));
            this.setBodyOverLay(document.createElement('div'));

            this.getBase().id = "Base";
            this.getBase().style.borderStyle = "solid";
            this.getBase().style.borderWidth = "2px";
            this.getBase().style.backgroundColor = WinFormjs.Form.getWindow_HeadingBackgroundColor();

            this.getBase().style.borderColor = WinFormjs.Form.getWindow_BorderColorFocused();
            $(this.getBase()).css("box-shadow", "0px 0px 63px -17px rgba(0,0,0,0.75)");

            this.getBodyOverLay().style.visibility = "collapse";

            this.getBase().addEventListener("mousedown", Bridge.fn.bind(this, $_.WinFormjs.Form.f8));

            this.getHeading().addEventListener("dblclick", Bridge.fn.bind(this, $_.WinFormjs.Form.f9));

            this.getBase().addEventListener("mousemove", Bridge.fn.bind(this, $_.WinFormjs.Form.f10));

            this.getBase().style.position = "absolute";

            this.getHeading().id = "Heading";
            this.getHeading().style.height = "29px";
            this.getHeading().style.width = "100%";
            this.getHeading().style.verticalAlign = "top";
            this.getHeading().style.cursor = "default";
            this.getHeading().style.backgroundColor = WinFormjs.Form.getWindow_HeadingBackgroundColor();
            this.getHeading().style.marginTop = "0";
            this.getHeading().style.marginLeft = "0";
            this.getHeading().style.marginRight = "0";
            this.getHeading().style.marginBottom = "0";
            this.getHeading().style.paddingBottom = "1px";
            this.getHeading().style.fontFamily = "Segoe UI";
            this.getHeading().style.textAlign = 7;

            this.getHeading().addEventListener("mousedown", Bridge.fn.bind(this, $_.WinFormjs.Form.f11));

            this.getHeadingTitle().style.textIndent = "3px";
            WinFormjs.Form.setInternalLabel(this.getHeadingTitle()); // Internal Label

            this.setButtonClose(this.createFormButton(WinFormjs.Form.FormButtonType.Close));
            this.setButtonExpand(this.createFormButton(WinFormjs.Form.FormButtonType.Maximize));
            this.setButtonMinimize(this.createFormButton(WinFormjs.Form.FormButtonType.Minimize));

            $(this.getHeading()).css("user-select", "none").css("user-drag:", "none");

            $(this.getBase()).css("user-select", "none").css("user-drag:", "none");

            $(this.getHeadingTitle()).css("user-select", "none").css("user-drag:", "none");

            this.getBody().id = "Body";
            this.getBody().style.top = "30px";
            this.getBody().style.height = "-webkit-calc(100% - 30px)"; // -webkit-calc(100% - 60px)
            this.getBody().style.width = "-webkit-calc(100% - 1px)"; // "100%";
            this.getBody().style.position = "absolute";
            this.getBody().style.backgroundColor = WinFormjs.Form.getWindow_DefaultBackgroundColor();

            this.getBody().addEventListener("mousedown", Bridge.fn.bind(this, $_.WinFormjs.Form.f12));

            this.getBody().addEventListener("mousemove", $_.WinFormjs.Form.f13);

            this.getBodyOverLay().style.top = "31px";
            this.getBodyOverLay().style.height = "-webkit-calc(100% - 33px)"; // -webkit-calc(100% - 60px)
            this.getBodyOverLay().style.width = "-webkit-calc(100% - 4px)";
            this.getBodyOverLay().style.left = "2px";
            this.getBodyOverLay().style.position = "absolute";
            this.getBodyOverLay().style.zIndex = (2147483647).toString();
            this.getBodyOverLay().style.opacity = WinFormjs.Form.getShowBodyOverLay() ? "0.5" : "0";
            this.getBodyOverLay().style.backgroundColor = "black";

            this.getBodyOverLay().addEventListener("mousedown", Bridge.fn.bind(this, $_.WinFormjs.Form.f14));

            this.getBody().addEventListener("mouseleave", $_.WinFormjs.Form.f15);

            this.getBodyOverLay().addEventListener("mouseenter", Bridge.fn.bind(this, $_.WinFormjs.Form.f16));

            $(this.getBase()).css("width", WinFormjs.Form.getWindow_DefaultWidth()).css("height", WinFormjs.Form.getWindow_DefaultHeight());

            this.getBase().appendChild(this.getHeading());
            this.getBase().appendChild(this.getBody());
            this.getBase().appendChild(this.getBodyOverLay());

            this.getHeading().appendChild(this.getHeadingTitle());
            this.getHeading().appendChild(this.getButtonClose());
            this.getHeading().appendChild(this.getButtonExpand());
            this.getHeading().appendChild(this.getButtonMinimize());

            this.initialise();
        },
        getHeight: function () {
            return this.getBase().style.height;
        },
        setHeight: function (value) {
            this.getBase().style.height = value;
        },
        getWidth: function () {
            return this.getBase().style.width;
        },
        setWidth: function (value) {
            this.getBase().style.width = value;
        },
        getLeft: function () {
            return this.getBase().style.left;
        },
        setLeft: function (value) {
            this.getBase().style.left = value;
        },
        getTop: function () {
            return this.getBase().style.top;
        },
        setTop: function (value) {
            this.getBase().style.top = value;
        },
        getText: function () {
            return this.getHeadingTitle().innerHTML;
        },
        setText: function (value) {
            this.getHeadingTitle().innerHTML = value;
        },
        getBackColor: function () {
            return this.getBody().style.backgroundColor;
        },
        setBackColor: function (value) {
            this.getBody().style.backgroundColor = value;
        },
        getForeColor: function () {
            return this.getBody().style.color;
        },
        setForeColor: function (value) {
            this.getBody().style.color = value;
        },
        isVisible: function () {
            return this.getBase() != null && this.getBase().style.visibility === "visible";
        },
        initialise: function () {

        },
        onShowing: function () {

        },
        onShowed: function () {

        },
        onClosing: function () {

        },
        changeWindowState: function () {
            if (this.getwindowState() === WinFormjs.Form.WindowState.Maximized) {
                this.setWidth(System.String.concat(this.prev_width, "px"));
                this.setHeight(System.String.concat(this.prev_height, "px"));

                this.setTop(System.String.concat(this.prev_top, "px"));
                this.setLeft(System.String.concat(this.prev_left, "px"));

                this.setwindowState(WinFormjs.Form.WindowState.Normal);
            } else {
                this.prev_height = parseInt(this.getHeight());
                this.prev_width = parseInt(this.getWidth());

                this.prev_left = parseInt(this.getLeft());
                this.prev_top = parseInt(this.getTop());

                this.setwindowState(WinFormjs.Form.WindowState.Maximized);

                this.setWidth("-webkit-calc(100% - 5px)");
                this.setHeight("-webkit-calc(100% - 5px)");

                this.setTop("0");
                this.setLeft("0");
            }
        },
        createFormButton: function (Type) {
            var butt = document.createElement('div');

            butt.style.width = "45px";
            butt.style.height = "29px";
            butt.style.position = "absolute";
            butt.style.fontSize = "12pt";

            switch (Type) {
                case WinFormjs.Form.FormButtonType.Close: 
                    butt.style.backgroundColor = "white";
                    butt.style.color = "black";
                    butt.style.left = "-webkit-calc(100% - 45px)";
                    butt.id = "Close";
                    butt.innerHTML = "&#10006";
                    butt.onmousedown = Bridge.fn.bind(this, function (ev) {
                        if (WinFormjs.Form.movingForm != null || WinFormjs.Form.getWindowHolderSelectionBox() != null) {
                            return;
                        }
                        WinFormjs.Form.setMouse_Down(true);

                        ev.stopPropagation();
                        ev.preventDefault();

                        butt.style.backgroundColor = "#F1707A";
                        butt.style.color = "white";

                        WinFormjs.Form.setActiveForm(this);
                    });
                    butt.onmouseup = Bridge.fn.bind(this, $_.WinFormjs.Form.f17);
                    butt.onmouseenter = Bridge.fn.bind(this, function (ev) {
                        if (WinFormjs.Form.movingForm != null || WinFormjs.Form.getWindowHolderSelectionBox() != null) {
                            return;
                        }

                        this.setCursor("default");

                        if (WinFormjs.Form.getMouse_Down()) {
                            butt.style.backgroundColor = "#F1707A";
                        } else {
                            butt.style.backgroundColor = "#E81123";
                        }
                        butt.style.color = "white";
                    });
                    butt.onmouseleave = function (ev) {
                        if (WinFormjs.Form.movingForm != null || WinFormjs.Form.getWindowHolderSelectionBox() != null) {
                            return;
                        }

                        butt.style.backgroundColor = "white";
                        butt.style.color = "black";
                    };
                    break;
                case WinFormjs.Form.FormButtonType.Maximize: 
                    butt.style.backgroundColor = "white";
                    butt.style.left = "-webkit-calc(100% - 91px)";
                    butt.style.color = "black";
                    butt.id = "Maximize";
                    butt.innerHTML = "&#9633;";
                    butt.style.fontSize = "14pt";
                    butt.onmouseup = Bridge.fn.bind(this, function (ev) {
                        if (WinFormjs.Form.movingForm != null || WinFormjs.Form.getWindowHolderSelectionBox() != null) {
                            return;
                        }

                        ev.stopPropagation();
                        ev.preventDefault();

                        WinFormjs.Form.setMouse_Down(false);

                        butt.style.backgroundColor = "white";
                        butt.style.color = "black";

                        this.changeWindowState();
                    });
                    break;
                case WinFormjs.Form.FormButtonType.Minimize: 
                    butt.style.backgroundColor = "white";
                    butt.style.left = "-webkit-calc(100% - 137px)";
                    butt.style.color = "black";
                    butt.id = "Minimize";
                    butt.innerHTML = "&#8213;";
                    butt.onmouseup = Bridge.fn.bind(this, function (ev) {
                        if (WinFormjs.Form.movingForm != null || WinFormjs.Form.getWindowHolderSelectionBox() != null) {
                            return;
                        }

                        ev.stopPropagation();
                        ev.preventDefault();

                        WinFormjs.Form.setMouse_Down(false);

                        butt.style.backgroundColor = "white";
                        butt.style.color = "black";

                        this.setwindowState(WinFormjs.Form.WindowState.Minimized);
                    });
                    break;
                case WinFormjs.Form.FormButtonType.Restore: 
                    break;
                case WinFormjs.Form.FormButtonType.Help: 
                    break;
                default: 
                    butt.onmouseup = $_.WinFormjs.Form.f18;
                    break;
            }

            butt.onmousemove = $_.WinFormjs.Form.f19;

            if (Type !== WinFormjs.Form.FormButtonType.Close) {
                butt.onmousedown = Bridge.fn.bind(this, function (ev) {
                    if (WinFormjs.Form.movingForm != null || WinFormjs.Form.getWindowHolderSelectionBox() != null) {
                        return;
                    }

                    WinFormjs.Form.setMouse_Down(true);

                    ev.stopPropagation();
                    ev.preventDefault();

                    butt.style.backgroundColor = "#CACACA";
                    butt.style.color = "black";

                    WinFormjs.Form.setActiveForm(this);
                });

                butt.onmouseenter = Bridge.fn.bind(this, function (ev) {
                    if (WinFormjs.Form.movingForm != null || WinFormjs.Form.getWindowHolderSelectionBox() != null) {
                        return;
                    }
                    this.setCursor("default");

                    if (WinFormjs.Form.getMouse_Down()) {
                        butt.style.backgroundColor = "#CACACA";
                    } else {
                        butt.style.backgroundColor = "#E5E5E5";
                    }
                    butt.style.color = "black";
                });

                butt.onmouseleave = function (ev) {
                    if (WinFormjs.Form.movingForm != null || WinFormjs.Form.getWindowHolderSelectionBox() != null) {
                        return;
                    }

                    butt.style.backgroundColor = "white";
                    butt.style.color = "black";
                };
            }

            butt.style.top = "0";

            butt.style.padding = "0";
            butt.style.margin = "0";
            butt.style.borderWidth = "0";

            butt.style.fontFamily = "Lucida Sans Unicode";
            butt.style.textAlign = "center";

            return butt;

        },
        setCursor: function (cur) {
            this.getBase().style.cursor = cur;
            this.getHeading().style.cursor = cur;
        },
        changeSelectionState$1: function (TurnOff) {
            if (TurnOff === void 0) { TurnOff = true; }
            this.changeSelectionState(WinFormjs.Form.parent.children, TurnOff);
        },
        changeSelectionState: function (Children, TurnOff) {
            var $t;
            if (TurnOff === void 0) { TurnOff = true; }
            if (Children == null) {
                return;
            }

            $t = Bridge.getEnumerator(Children);
            while ($t.moveNext()) {
                var item = $t.getCurrent();
                if ((Bridge.referenceEquals(item.tagName.toLowerCase(), "input") || Bridge.referenceEquals(item.tagName.toLowerCase(), "span") || Bridge.referenceEquals(item.tagName.toLowerCase(), "textarea")) && !Bridge.referenceEquals(item.getAttribute("IL"), "1")) {
                    WinFormjs.Form.changeStateTextSelection(item, !TurnOff);
                }
                if (item.childElementCount > 0) {
                    this.changeSelectionState(item.children, TurnOff);
                }
            }
        },
        show: function (owner) {
            if (owner === void 0) { owner = null; }
            if (!WinFormjs.Form.visibleForm.contains(this)) {
                this.onShowing();

                if (owner == null) {
                    WinFormjs.Form.getWindowHolder().appendChild(this.getBase());
                    owner = WinFormjs.Form.getWindowHolder();
                } else {
                    owner.appendChild(this.getBase());
                }

                this.setOwner(owner);

                this.getBase().style.visibility = "visible";

                this.getBody().focus();

                WinFormjs.Form.visibleForm.add(this);

                WinFormjs.Form.calculateZOrder();

                this.onShowed();
            }

            WinFormjs.Form.setActiveForm(this);
        },
        bringToFront: function () {
            if (WinFormjs.Form.visibleForm.getCount() > 1 && !Bridge.referenceEquals(WinFormjs.Form.visibleForm.getItem(((WinFormjs.Form.visibleForm.getCount() - 1) | 0)), this)) {
                WinFormjs.Form.visibleForm.remove(this);
                WinFormjs.Form.visibleForm.add(this);
            }

            WinFormjs.Form.calculateZOrder();
        },
        close: function () {
            this.onClosing();

            WinFormjs.Form.setActiveForm(WinFormjs.Form._PrevActiveForm);

            WinFormjs.Form.visibleForm.remove(this);

            if (this.getBase() != null) {
                $(this.getBase()).fadeOut(WinFormjs.Form.getFadeLength(), Bridge.fn.bind(this, $_.WinFormjs.Form.f20));
            }

            WinFormjs.Form.calculateZOrder();
        },
        fillControlWithParent: function (element, widthOffset, heightOffset) {
            if (widthOffset === void 0) { widthOffset = 8; }
            if (heightOffset === void 0) { heightOffset = 9; }
            element.style.position = "absolute";
            element.style.width = System.String.concat(System.String.concat("-webkit-calc(100% - ", widthOffset.toString()), "px)");
            element.style.height = System.String.concat(System.String.concat("-webkit-calc(100% - ", heightOffset.toString()), "px)");

            element.style.top = "1px";
            element.style.left = "1px";
        },
        fillHorizontalControlWithParent: function (element, widthOffset) {
            if (widthOffset === void 0) { widthOffset = 8; }
            element.style.position = "absolute";
            element.style.width = System.String.concat(System.String.concat("-webkit-calc(100% - ", widthOffset.toString()), "px)");

            element.style.left = "1px";
        },
        fillVerticalControlWithParent: function (element, heightOffset) {
            if (heightOffset === void 0) { heightOffset = 9; }
            element.style.position = "absolute";
            element.style.height = System.String.concat(System.String.concat("-webkit-calc(100% - ", heightOffset.toString()), "px)");

            element.style.top = "1px";
        }
    });

    Bridge.ns("WinFormjs.Form", $_);

    Bridge.apply($_.WinFormjs.Form, {
        f1: function (ev) {
            if (WinFormjs.Form.midleOfAction()) {
                return;
            }

            ev.stopPropagation();
        },
        f2: function (ev) {
            if (WinFormjs.Form.midleOfAction()) {
                return;
            }

            WinFormjs.Form.setMouse_Down(true);

            ev.stopPropagation();

            WinFormjs.Form.setActiveForm(null);
        },
        f3: function (ev) {
            ev.preventDefault();
        },
        f4: function (ev) {
            if (WinFormjs.Form.movingForm == null) {
                if (WinFormjs.Form.getWindowHolderSelectionBox() != null) {
                    WinFormjs.Form.getWindowHolderSelectionBox().remove();
                    WinFormjs.Form.setWindowHolderSelectionBox(null);
                }
                WinFormjs.Form.setWindowHolderSelectionBox(document.createElement('div'));
                WinFormjs.Form.getWindowHolderSelectionBox().style.position = "absolute";
                WinFormjs.Form.getWindowHolderSelectionBox().style.visibility = "visible";
                WinFormjs.Form.getWindowHolderSelectionBox().style.borderWidth = "thin";
                WinFormjs.Form.getWindowHolderSelectionBox().style.borderStyle = "solid";
                WinFormjs.Form.getWindowHolderSelectionBox().style.borderColor = "black";
                WinFormjs.Form.getWindowHolderSelectionBox().style.backgroundColor = "grey";
                WinFormjs.Form.getWindowHolderSelectionBox().style.opacity = "0.35";

                WinFormjs.Form.getWindowHolder().appendChild(WinFormjs.Form.getWindowHolderSelectionBox());

                var mev = ev;
                WinFormjs.Form.windowHolderSelectionBoxX = mev.clientX;
                WinFormjs.Form.windowHolderSelectionBoxY = mev.clientY;

                WinFormjs.Form.getWindowHolderSelectionBox().style.zIndex = "0";

                WinFormjs.Form.window_Desktop.clearSelection();

                WinFormjs.Form.setMouse_Down(true);

                WinFormjs.Form.setActiveForm(null);
            }
        },
        f5: function (ev) {
            var mev = ev;

            if (WinFormjs.Form.movingForm != null) {
                if (WinFormjs.Form.movingForm.getBodyOverLay().style.visibility === "collapse") {
                    WinFormjs.Form.movingForm.getBodyOverLay().style.visibility = "visible";
                    WinFormjs.Form.movingForm.changeSelectionState$1(true);
                    WinFormjs.Form.movingForm.getHeading().focus();
                }

                var obj = $(WinFormjs.Form.movingForm.getBase());

                var Y = (((mev.clientY + WinFormjs.Form.movingForm.prev_py) | 0));
                var X = (((mev.clientX + WinFormjs.Form.movingForm.prev_px) | 0));

                if (WinFormjs.Form.movingForm.getwindowState() === WinFormjs.Form.WindowState.Maximized && WinFormjs.Form.moveAction === WinFormjs.Form.MouseMoveAction.Move) {
                    WinFormjs.Form.movingForm.changeWindowState();
                    X = (mev.clientX - (((Bridge.Int.div(WinFormjs.Form.movingForm.prev_width, 2)) | 0))) | 0;

                    WinFormjs.Form.movingForm.prev_px = (X - mev.clientX) | 0;
                }

                var X1;
                var Y1;

                var W;
                var H;

                if (Y < 0) {
                    Y = 1;
                }
                if (X < 0) {
                    X = 1;
                }

                ev.stopPropagation();

                switch (WinFormjs.Form.moveAction) {
                    case WinFormjs.Form.MouseMoveAction.Move: 
                        obj.css("top", Y);
                        obj.css("left", X);
                        break;
                    case WinFormjs.Form.MouseMoveAction.TopLeftResize: 
                        X1 = parseInt(obj.css("left"));
                        Y1 = parseInt(obj.css("top"));
                        W = parseInt(obj.css("width"));
                        H = parseInt(obj.css("height"));
                        W = (W - (((X - X1) | 0))) | 0;
                        H = (H - (((Y - Y1) | 0))) | 0;
                        if (W < WinFormjs.Form.movingForm.getMinWidth()) {
                            X = (X - (((WinFormjs.Form.movingForm.getMinWidth() - W) | 0))) | 0;
                            W = WinFormjs.Form.movingForm.getMinWidth();
                        }
                        if (H < WinFormjs.Form.movingForm.getMinHeight()) {
                            Y = (Y - (((WinFormjs.Form.movingForm.getMinHeight() - H) | 0))) | 0;
                            H = WinFormjs.Form.movingForm.getMinHeight();
                        }
                        obj.css("top", Y);
                        obj.css("left", X);
                        obj.css("width", W);
                        obj.css("height", H);
                        break;
                    case WinFormjs.Form.MouseMoveAction.TopResize: 
                        Y1 = parseInt(obj.css("top"));
                        H = parseInt(obj.css("height"));
                        H = (H - (((Y - Y1) | 0))) | 0;
                        if (H < WinFormjs.Form.movingForm.getMinHeight()) {
                            Y = (Y - (((WinFormjs.Form.movingForm.getMinHeight() - H) | 0))) | 0;
                            H = WinFormjs.Form.movingForm.getMinHeight();
                        }
                        obj.css("top", Y);
                        obj.css("height", H);
                        break;
                    case WinFormjs.Form.MouseMoveAction.TopRightResize: 
                        Y1 = parseInt(obj.css("top"));
                        X1 = parseInt(obj.css("left"));
                        W = parseInt(obj.css("width"));
                        H = parseInt(obj.css("height"));
                        H = (H - (((Y - Y1) | 0))) | 0;
                        W = (mev.clientX - X1) | 0;
                        if (H < WinFormjs.Form.movingForm.getMinHeight()) {
                            Y = (Y - (((WinFormjs.Form.movingForm.getMinHeight() - H) | 0))) | 0;
                            H = WinFormjs.Form.movingForm.getMinHeight();
                        }
                        if (W < WinFormjs.Form.movingForm.getMinWidth()) {
                            W = WinFormjs.Form.movingForm.getMinWidth();
                        }
                        obj.css("top", Y);
                        obj.css("height", H);
                        obj.css("width", W);
                        break;
                    case WinFormjs.Form.MouseMoveAction.LeftResize: 
                        X1 = parseInt(obj.css("left"));
                        W = parseInt(obj.css("width"));
                        W = (W - (((X - X1) | 0))) | 0;
                        if (W < WinFormjs.Form.movingForm.getMinWidth()) {
                            X = (X - (((WinFormjs.Form.movingForm.getMinWidth() - W) | 0))) | 0;
                            W = WinFormjs.Form.movingForm.getMinWidth();
                        }
                        obj.css("left", X);
                        obj.css("width", W);
                        break;
                    case WinFormjs.Form.MouseMoveAction.BottomLeftResize: 
                        X1 = parseInt(obj.css("left"));
                        Y1 = parseInt(obj.css("top"));
                        W = parseInt(obj.css("width"));
                        H = parseInt(obj.css("height"));
                        W = (W - (((X - X1) | 0))) | 0;
                        H = (mev.clientY - Y1) | 0;
                        if (W < WinFormjs.Form.movingForm.getMinWidth()) {
                            X = (X - (((WinFormjs.Form.movingForm.getMinWidth() - W) | 0))) | 0;
                            W = WinFormjs.Form.movingForm.getMinWidth();
                        }
                        if (H < WinFormjs.Form.movingForm.getMinHeight()) {
                            H = WinFormjs.Form.movingForm.getMinHeight();
                        }
                        obj.css("left", X);
                        obj.css("width", W);
                        obj.css("height", H);
                        break;
                    case WinFormjs.Form.MouseMoveAction.BottomResize: 
                        Y1 = parseInt(obj.css("top"));
                        H = parseInt(obj.css("height"));
                        H = (mev.clientY - Y1) | 0;
                        if (H < WinFormjs.Form.movingForm.getMinHeight()) {
                            H = WinFormjs.Form.movingForm.getMinHeight();
                        }
                        obj.css("height", H);
                        break;
                    case WinFormjs.Form.MouseMoveAction.RightResize: 
                        X1 = parseInt(obj.css("left"));
                        W = parseInt(obj.css("width"));
                        W = (mev.clientX - X1) | 0;
                        if (W < WinFormjs.Form.movingForm.getMinWidth()) {
                            W = WinFormjs.Form.movingForm.getMinWidth();
                        }
                        obj.css("width", W);
                        break;
                    case WinFormjs.Form.MouseMoveAction.BottomRightResize: 
                        Y1 = parseInt(obj.css("top"));
                        H = parseInt(obj.css("height"));
                        X1 = parseInt(obj.css("left"));
                        W = parseInt(obj.css("width"));
                        W = (mev.clientX - X1) | 0;
                        H = (mev.clientY - Y1) | 0;
                        if (H < WinFormjs.Form.movingForm.getMinHeight()) {
                            H = WinFormjs.Form.movingForm.getMinHeight();
                        }
                        if (W < WinFormjs.Form.movingForm.getMinWidth()) {
                            W = WinFormjs.Form.movingForm.getMinWidth();
                        }
                        obj.css("width", W);
                        obj.css("height", H);
                        break;
                    default: 
                        break;
                }
            } else if (WinFormjs.Form.getWindowHolderSelectionBox() != null && WinFormjs.Form.getWindowHolderSelectionBox().style.visibility === "visible") {
                if (WinFormjs.Form.getMouse_Down()) {
                    WinFormjs.Form.getWindowHolderSelectionBox().style.cursor = "default";
                    WinFormjs.Form.getWindowHolder().style.cursor = "default";

                    var left;
                    var top;
                    var width;
                    var height;

                    if (WinFormjs.Form.windowHolderSelectionBoxX > mev.clientX) {
                        left = mev.clientX;
                        width = (WinFormjs.Form.windowHolderSelectionBoxX - mev.clientX) | 0;
                    } else {
                        left = WinFormjs.Form.windowHolderSelectionBoxX;
                        width = (mev.clientX - WinFormjs.Form.windowHolderSelectionBoxX) | 0;
                    }

                    if (WinFormjs.Form.windowHolderSelectionBoxY > mev.clientY) {
                        top = mev.clientY;
                        height = (WinFormjs.Form.windowHolderSelectionBoxY - mev.clientY) | 0;
                    } else {
                        top = WinFormjs.Form.windowHolderSelectionBoxY;
                        height = (mev.clientY - WinFormjs.Form.windowHolderSelectionBoxY) | 0;
                    }

                    WinFormjs.Form.getWindowHolderSelectionBox().style.left = System.String.concat(left, "px");
                    WinFormjs.Form.getWindowHolderSelectionBox().style.top = System.String.concat(top, "px");

                    WinFormjs.Form.getWindowHolderSelectionBox().style.width = System.String.concat(width, "px");
                    WinFormjs.Form.getWindowHolderSelectionBox().style.height = System.String.concat(height, "px");

                    var SelectionRec = new WinFormjs.Rectange.$ctor1(left, top, width, height);

                    for (var i = 0; i < WinFormjs.Form.window_Desktop.loadedNodes.getCount(); i = (i + 1) | 0) {
                        if (WinFormjs.Form.window_Desktop.loadedNodes.getItem(i) != null) {
                            var htmlNode = WinFormjs.Form.window_Desktop.loadedNodes.getItem(i).getNodeBase();
                            if (htmlNode != null) {
                                if (WinFormjs.Rectange.rectOverlap(WinFormjs.Rectange.createFromHTMLElement(htmlNode).$clone(), SelectionRec.$clone())) {
                                    WinFormjs.Form.window_Desktop.loadedNodes.getItem(i).setNodeExplorerState(WinFormjs.FileExplorerNode.FileExplorerState.Selected);
                                } else {
                                    WinFormjs.Form.window_Desktop.loadedNodes.getItem(i).setNodeExplorerState(WinFormjs.FileExplorerNode.FileExplorerState.None);
                                }
                            }
                        }
                    }

                    mev.stopImmediatePropagation();
                    mev.preventDefault();
                }
            }
        },
        f6: function () {
            WinFormjs.Form.getWindowHolderSelectionBox().remove();
            WinFormjs.Form.setWindowHolderSelectionBox(null);
        },
        f7: function (ev) {
            if (WinFormjs.Form.movingForm != null) {
                WinFormjs.Form.movingForm.getBodyOverLay().style.visibility = "collapse";
                WinFormjs.Form.movingForm.changeSelectionState$1(false);
            }

            WinFormjs.Form.movingForm = null;
            WinFormjs.Form.setMouse_Down(false);
            WinFormjs.Form.moveAction = WinFormjs.Form.MouseMoveAction.Move;
            if (WinFormjs.Form.getWindowHolderSelectionBox() != null) {
                $(WinFormjs.Form.getWindowHolderSelectionBox()).fadeOut(WinFormjs.Form.getFadeLength(), $_.WinFormjs.Form.f6);
            }
        },
        f8: function (ev) {
            var mev = ev;

            WinFormjs.Form.setMouse_Down(true);
            WinFormjs.Form.movingForm = this;

            WinFormjs.Form.setActiveForm(this);

            WinFormjs.Form.setBodyOverLay();

            var obj = $(this.getBase());

            this.prev_px = (parseInt(obj.css("left")) - mev.clientX) | 0;
            this.prev_py = (parseInt(obj.css("top")) - mev.clientY) | 0;

            if (this.getwindowState() === WinFormjs.Form.WindowState.Maximized) {
                this.setCursor("default");

                WinFormjs.Form.moveAction = WinFormjs.Form.MouseMoveAction.Move;
                return;
            }

            if (mev.layerX <= WinFormjs.Form.getResizeCorners() && mev.layerY <= WinFormjs.Form.getResizeCorners()) {
                this.setCursor("nwse-resize");

                WinFormjs.Form.moveAction = WinFormjs.Form.MouseMoveAction.TopLeftResize;
            } else if (mev.layerY <= WinFormjs.Form.getResizeCorners() && mev.layerX >= ((parseInt(this.getWidth()) - WinFormjs.Form.getResizeCorners()) | 0)) {
                this.setCursor("nesw-resize");

                WinFormjs.Form.moveAction = WinFormjs.Form.MouseMoveAction.TopRightResize;
            } else if (mev.layerY <= WinFormjs.Form.getResizeCorners()) {
                this.setCursor("n-resize");

                WinFormjs.Form.moveAction = WinFormjs.Form.MouseMoveAction.TopResize;
            } else if (mev.layerX <= WinFormjs.Form.getResizeCorners() && mev.layerY >= ((parseInt(this.getHeight()) - WinFormjs.Form.getResizeCorners()) | 0)) {
                this.setCursor("nesw-resize");

                WinFormjs.Form.moveAction = WinFormjs.Form.MouseMoveAction.BottomLeftResize;
            } else if (mev.layerY >= ((parseInt(this.getHeight()) - WinFormjs.Form.getResizeCorners()) | 0) && mev.layerX >= ((parseInt(this.getWidth()) - WinFormjs.Form.getResizeCorners()) | 0)) {
                this.setCursor("nwse-resize");

                WinFormjs.Form.moveAction = WinFormjs.Form.MouseMoveAction.BottomRightResize;
            } else if (mev.layerY >= ((parseInt(this.getHeight()) - WinFormjs.Form.getResizeCorners()) | 0)) {
                this.setCursor("s-resize");

                WinFormjs.Form.moveAction = WinFormjs.Form.MouseMoveAction.BottomResize;
            } else if (mev.layerX <= WinFormjs.Form.getResizeCorners()) {
                this.setCursor("w-resize");

                WinFormjs.Form.moveAction = WinFormjs.Form.MouseMoveAction.LeftResize;

            } else if (mev.layerX >= ((parseInt(this.getWidth()) - WinFormjs.Form.getResizeCorners()) | 0)) {
                this.setCursor("e-resize");

                WinFormjs.Form.moveAction = WinFormjs.Form.MouseMoveAction.RightResize;
            } else {
                this.setCursor("default");

                WinFormjs.Form.moveAction = WinFormjs.Form.MouseMoveAction.Move;
                return;
            }

            this.changeSelectionState$1();

            mev.stopPropagation();
        },
        f9: function (ev) {
            this.changeWindowState();
            ev.preventDefault();
            ev.stopPropagation();
        },
        f10: function (ev) {
            var mev = ev;
            if (WinFormjs.Form.movingForm != null && WinFormjs.Form.moveAction === WinFormjs.Form.MouseMoveAction.Move) {
                this.setCursor("default");
                return;
            } else if (this.getwindowState() === WinFormjs.Form.WindowState.Maximized) {
                this.setCursor("default");
                return;
            } else if (WinFormjs.Form.getWindowHolderSelectionBox() != null) {
                this.setCursor("default");
                return;
            }

            if (WinFormjs.Form.moveAction === WinFormjs.Form.MouseMoveAction.TopLeftResize || mev.layerX <= WinFormjs.Form.getResizeCorners() && mev.layerY <= WinFormjs.Form.getResizeCorners()) {
                this.setCursor("nwse-resize");
            } else if (WinFormjs.Form.moveAction === WinFormjs.Form.MouseMoveAction.TopRightResize || mev.layerY <= WinFormjs.Form.getResizeCorners() && mev.layerX >= ((parseInt(this.getWidth()) - WinFormjs.Form.getResizeCorners()) | 0)) {
                this.setCursor("nesw-resize");
            } else if (mev.layerY <= WinFormjs.Form.getResizeCorners() || WinFormjs.Form.moveAction === WinFormjs.Form.MouseMoveAction.TopResize) {
                this.setCursor("n-resize");
            } else if (WinFormjs.Form.moveAction === WinFormjs.Form.MouseMoveAction.BottomLeftResize || mev.layerX <= WinFormjs.Form.getResizeCorners() && mev.layerY >= ((parseInt(this.getHeight()) - WinFormjs.Form.getResizeCorners()) | 0)) {
                this.setCursor("nesw-resize");
            } else if (WinFormjs.Form.moveAction === WinFormjs.Form.MouseMoveAction.BottomRightResize || mev.layerY >= ((parseInt(this.getHeight()) - WinFormjs.Form.getResizeCorners()) | 0) && mev.layerX >= ((parseInt(this.getWidth()) - WinFormjs.Form.getResizeCorners()) | 0)) {
                this.setCursor("nwse-resize");
            } else if (WinFormjs.Form.moveAction === WinFormjs.Form.MouseMoveAction.BottomResize || mev.layerY >= ((parseInt(this.getHeight()) - WinFormjs.Form.getResizeCorners()) | 0)) {
                this.setCursor("s-resize");
            } else if (WinFormjs.Form.moveAction === WinFormjs.Form.MouseMoveAction.LeftResize || mev.layerX <= WinFormjs.Form.getResizeCorners()) {
                this.setCursor("w-resize");
            } else if (WinFormjs.Form.moveAction === WinFormjs.Form.MouseMoveAction.RightResize || mev.layerX >= ((parseInt(this.getWidth()) - WinFormjs.Form.getResizeCorners()) | 0)) {
                this.setCursor("e-resize");
            } else {
                this.setCursor("default");
            }
        },
        f11: function (ev) {
            WinFormjs.Form.setBodyOverLay();

            if (this.getwindowState() === WinFormjs.Form.WindowState.Maximized) {
                WinFormjs.Form.movingForm = this;
                this.setCursor("default");

                WinFormjs.Form.moveAction = WinFormjs.Form.MouseMoveAction.Move;
            } else {
                WinFormjs.Form.movingForm = this;
            }

            WinFormjs.Form.setActiveForm(this);
        },
        f12: function (ev) {
            WinFormjs.Form.setActiveForm(this);
            ev.stopPropagation();
        },
        f13: function (ev) {
            if (WinFormjs.Form.movingForm == null) {
                ev.stopPropagation();
            }
        },
        f14: function (ev) {
            this.getBodyOverLay().style.visibility = "collapse";
            WinFormjs.Form.setActiveForm(this);
        },
        f15: function (ev) {
            if (WinFormjs.Form.movingForm == null) {
                WinFormjs.Form.setBodyOverLay();
            }
        },
        f16: function (ev) {
            if (WinFormjs.Form.getWindowHolderSelectionBox() == null && WinFormjs.Form.movingForm == null) {
                this.getBodyOverLay().style.visibility = "collapse";
            } else {
                this.getBodyOverLay().style.visibility = "visible";
            }
        },
        f17: function (ev) {
            if (WinFormjs.Form.movingForm != null || WinFormjs.Form.getWindowHolderSelectionBox() != null) {
                return;
            }

            ev.stopPropagation();
            ev.preventDefault();

            this.close();
        },
        f18: function (ev) {
            if (WinFormjs.Form.movingForm != null || WinFormjs.Form.getWindowHolderSelectionBox() != null) {
                return;
            }

            ev.stopPropagation();
            ev.preventDefault();

            WinFormjs.Form.setMouse_Down(false);
        },
        f19: function (ev) {
            if (WinFormjs.Form.movingForm != null || WinFormjs.Form.getWindowHolderSelectionBox() != null) {
                return;
            }

            ev.stopImmediatePropagation();
            ev.preventDefault();
        },
        f20: function () {
            $(this.getBase()).empty();
            this.getBase().remove();
            this.setBase(null);
        }
    });

    Bridge.define("WinFormjs.Form.FormButtonType", {
        $kind: "enum",
        statics: {
            Close: 0,
            Maximize: 1,
            Minimize: 2,
            Restore: 3,
            Help: 4
        }
    });

    Bridge.define("WinFormjs.Form.MouseMoveAction", {
        $kind: "enum",
        statics: {
            Move: 0,
            TopLeftResize: 1,
            LeftResize: 2,
            BottomLeftResize: 3,
            BottomResize: 4,
            BottomRightResize: 5,
            RightResize: 6,
            TopResize: 7,
            TopRightResize: 8
        }
    });

    Bridge.define("WinFormjs.Form.WindowState", {
        $kind: "enum",
        statics: {
            Normal: 0,
            Minimized: 1,
            Maximized: 2
        }
    });

    Bridge.define("WinFormjs.IconRepository", {
        statics: {
            IMAGE_CMD: "data:image/png;base64,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",
            IMAGE_File: "data:image/png;base64,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",
            IMAGE_Folder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAdZElEQVR42u2dTZNcR1aG36ySSkjdLWnhJoxaLXs/MGHjiRiYAWyPIRj+xXgHDB6PYOwtM0Cw8Ep7gkB/gV8wjmDFCoJgbzscMcDYHvfI1ld31T0sulq6detm5jmZeW/dW/WeCFlWfd2vPM95z8kvJyKg0Wi7aRPeAhqNAKDRaAQAjUYjAGg0GgFAo9EIABqNRgDQaDQCgEajEQA0Go0AoNFoBACNRiMAaDQaAUCj0QgAGo1GANBotKHapTGe9OIX/yJf/e9/oVo8efaau/ivW/2sc+2vAw7OOe8xnr/V/EHAwTVel+V3JhDI8n3fjzq45um4+nFc4/jLlxovuJZTW34Qa5+cyNrvtx/LtZxP/eXmb7jza6+dm6v9oGs7pmu/3toTPL+brn4drnlOJwDuA+5nk+P3T4bQJse6rsYoFcB0doAbt7+NS7MDxZOp/V3/s/6C9ZHX/rh6041/T3xHrb0qjXN/9o/YcaTxrgDi+460/1tguCcOkNT7F/p38L2bAH4M4OfVpx/cZBzfwRTATaa4fvRtXNm/lYjskkCQRjSTeIOW538pGnzjPF3kGLL+jjjbdYnGScVz5oHPidLpRQMIeWUJAtrO1QBkAWCBvcNvYO/wG9nxPO/LbU4fj9R1FqgggCYEoISABCAggcjuc2Zp/HtVBdggEDgXlbKQd+nGuwiACwjIGa4c3MKN278PN5muND/fHxsMcsgQj9TxlKDFNwwQqPw/oJTf2htmUBgrH6sy0oZn6QBtJwFw0YCqU0xne7h5548wnR1E3d8EhDUYaB2mrT4QAIGIRw3kQ0DW6gHanHypAhJy/PRUIEUF0HYMAC0NqzqDcxPcOPoOruwfGZJ/scPAFDXb6gOq8kDccaocCGgh5pSqYV0FSLK6kMT3aDuoAOoN+xSQM+wd/jb2Dn8nqQCggsFaepCiBsIEkEjdwA8BjeuIoR5QUwJa1eCpFuhVAJ2eANC67tkXgKtdhswBOcWV/Vu4cfRduMms5niFYWCuE4ihNhBxoNZ0ANHfhAoCvl4IbY5vKAhqnF4IBAIgBIDpjcaLC6B6iulsDzeOX1/WBVADgVNCYR0G+amBqGW7v6tQAv4SVhjr7zjlOTtD12Bbr4DmhCzdgjQCIGgVUD2Fcw7Xj76D2f4ttJf/LDCINNO1YqEmvw6pgdAxfRCIVeQFOteUDAhof48qgADoMh2AAPJkWRf4JvZe+GaDAU0gaGCgVATmlCBcE4A5HTBAwDRIyCnhoRkbQBVAAKS5uj4dAIDqFKieYHZwhOu3/wBucrmp8Fty+RgMIiBQFwqbY34lLR0Qn8LI6R4U5bF0qYAtwqeoFBpTAG9bmQPVI0wv7+PGnTcxnV0PpfyeNCERBOrGGoquoZGDDccULQTalIYYIGBzQH23IFUAAdAJBCqgegTngOu3/xCzgyOEq97w1AzCkVxSGnZrXcDv6FXsENIGlnYVUM6lqAIIgDGkD9VjQJ7i2uEruHb4Slv4b1foa05qjHPqlAAqCOiUQBw6q5enHR+QVhDUdwtSBRAAXVr1FKgeYbZ/hIPbrz+vC/g9v0UV+EAQSAtUPQUatYHAgCEfBHKKgpZegbAK0HcLMtITAJ2KgTOgeojp5T1cv/MWprMbQWmfBoKYGkA0pQjm7BIYNrx2rJRqf8FUQFNb0H6GKoAAKAOBBbD4Gs4BB7dfx+zgWO+Q0nzPeRt6GgQUDlIMAk0VoHFS49iApG5BGgHQR11g8RConuDa4au4dvhqpJAXG8/u9O1a3UugXdVH83taCBhGCaoAZigIshZAAPRfF3gMLL7G7OA2Do7eACaX9SCAJi0QtK/WA30uHYiaZYqCsVQgtlCJPpSnqQA6PQHQdV1g8QDT2T6uH/8JprMb68vzhRrkmjO7SKS11gVcMB3QQ8CQCkh3BUGqAAIgTbJ3XReY//q8LnD0JmYHd9Z9KHZe0S6/QC9BcQggDwKwLCWmfFZCFUAADL4u8ACoHuPa4e/i2uFryiYogSxBWSCMTr3NgEBSPQDQTZZy+alMigqgEQDd1QUentcF9o9xcPvNlfEC/vjuKxSKvi6AuIKw1wRS6wESkP5t56RwXkmpBQiBQABs4NlXT4D5CaaX93Fw/Kdr4wXCINBAIFAXSIrgoQlCDX8WayqgfT5d1AJoBMDGoDMH5l/COcH+0fcw239pnRPqlMDfS2CrCURW+lX7VySlMNHYt4SYb0UihQogJAiAwUiP+QlQPcbVw9dwtVEX8KuBtpRAgnUBGwQCQ4aryCAh02wgMXb3ifLaIg4udHoCYEi2+ApYPMBs/w72j95qmUegTQlKQ0BbFMzpGkRgafE2FaCRIZKhAmgEwCasegzMf4Xp5QMcHH8f09lNgxpoOp4USgcs6wH6BjE56PYqKtgtKMalz1gMJACGUxf4Ag6C/aO3WusCgGITUK+ULwUBKeAn1mHCWhWwqoA4R4AAGJsUAOa/AhYPcfXwW7h6+C1D2+0fAmVVQKqHyjoAOKKPALBEo+HVBR4A8xNc3j/GXqAuEByqK6UgELhvWfUAqZ1JSRXQdkYxmU9gUAEMDUrVI+Dsc0wv72P/+M9a1xfQ1wUUEAg6h+vMScJjA1J6CDTjAuj3BMAoOHAGnH0Ghwp7R3+My6a6QB8QyO8VELMScemKhSqAABh+KGgMlZUKOPscWHyNqy+8hqsvvFYUArbz0kKg/VLioxZF3y2YrQKEfk8AjIVLy0FD8y9xee8Ye7e+pxwvoKkJlKgHJIDNJPW1YxnS11AmDQiAYSmRtrZYPQLOfnleF7j9fW9dwAYBy0ChiAqQEqmAoSCoUQqi6Oen3xMAw01JGv8vZ8Dp/8E5wdXf/D3ohrvEZtpZegbCc/ol2bPE3i2YrVbo+QTAEHP/aLs8rwtMLl0zFAbb3nAZ7uCSLu35jMHIF8QVcN7VY3F4MAGwRUpgDiwe49LVW8ZdhMORU1eVD8zpj/UKFFUByh4BdgkSAMN+8pboX//aU0wu6gCevLmKQiDSPZhaD1BLgpAKKPF8YiqAnk8FMEgASfz/q1NMLl1ryGZDTUDbM4AYBCzKA4ZuQc190awXQBVAAIwBBCUaoBoCoQgvxmnzKamAVgU4/f1TvkcVQAAMLPqLPfrLuQJYf1+rBIwbfUZVgHFKb1B9JKgAVb2Ajk4AbFUpovJ81wgB70o+YtASTiFqIusLZtcC6OAEwK5E/7VegUwIhBw551pEk37kLmxa/w1RKQWmAQTAiKK/6KS66GsC8EbmyCAhc69A6FiWlMHFHVaK3GwaATC06B93wHYI1NcJjFUAwhCACgJ+Cd+vCtA5vxAOBMAwo79WmooBAhoHKHExXamAth4BzfDgWDGQTk8ADC76x6Kl/3fEu/y10yOkSCrQlQrgBiAEwM5Gf13e64WAtKcCyRAwXVyz7GZRAZKgAkL31IHLhxMAm43+1g0qJOSk0goB8cpoKXg5hhGCEuiKlwSlYqcrxQIBMGQZYIz+0V+WFj74lUDZVEBzDYm1gOjKRrnFQBoB0Fv0twYzq9P4ehPyIKA76dRhyZGRfaoZgDGgshhIAIw1+otNJYgPIqXKF0nbg9uBJurz56hBAmCbo38QDhJOB7pKBSwqILlHoM6+2MAgzSxBRxwQAAOO/mKJ/nEItAIlCwKNj0nXKkAy73PsXhEDBMCQon9O45f2noF2c8nOlaMC4vm7C38o2CWoXauARgD04fwdRn8xMEOUXZDpBUHJu1cKFWCq4UvsfjMNIAD6Vvwl04WE/S3a6wExsCjX3Peu1+8Qn8FovV9S5qZznQACoD+Pz43+fnXhj+XK9fA1g4SyRwgacnzRLDaSUgwsRmYaAaBo5JnTfW1QMaQCqRjTFARVKgDepQzKC6oIJGgEwOZyfyRGf0s9QJSpgEPaSDkpfO/a8/T2zzv7fWYaQAAMI/fPjf5QpgJahaJxuFwVsH58P+P8MNVfp8u8tzQCoLPcPyf6GyEggeNK+DzEfI2F7qFqlKFkPhumAQRAb7m/dsivdONw3vEBEk0FytUClPdqbRszMYAiYUwA0wACoPvcX+PLKXPl21WAqCEAYy0xdytuw/cExY/FNIAA6CkTyJ3umxL9pUCzVhYEk1SAthZhqU1oZTzTAAKg6+jf63TfcvUAf6+Avd6R2nMg5heaqyJnpgE0AqADGdBt9BcpBoEk8Z+sApzyelFoo1AqfQJgm6K/SC0CSqEr6UsFeOolEls30IXBKNY0gHUAAmBT0T9pum97JBVF1T49FVAoith0YLHAwxq9QxOEmAYQAEON/jlpwIWziTSCqdhTAc25Sdq5x3sOjJOE1JuBxk6X0Z4A6Cyh7DP6P39dCkY3UQDN/7Yrf2ctayCKK/QcaQRAkQjZUfRvec2fChQoCErCuapWBnb67zANIAB2I/r7ls0KOUcmBEqogJYeAf2OQlqmKucrMOgTAMOI/h1P91Xl1ppL0TiOQ/m5AJL4sRAMc3oDaASAquH0Md1X66DSUAHxRq9JBcqoAM3AoFgxUDdBSJ8G0AiALjOBXqJ/ffvvljShUCqwlqLkqgDJuL1rYwJSjXUAAqCX3L/r6B/rJgynAloVIEmOKk0tEfkFV+B5hDYSbUvdqAYIgKK5v1Zqlor+63JbV6KwqoD4dGEpEmn7SgNK1jBoOwKA3Om+je8nR/+2Ji4JqUDofEUJvFA9InB9or+PTAMIgAFnApuY7rv6OScKCERGz6m7BaGtBbRLezE7Zc4+f+wOJAC6iP69T/jJl7SSku+2DjhSHzHD+SR+/7Soktw1AmgEgDmP7yv61+JmqwpYdeT2AUI58wQUw27Fem8MaYBqCzHLc6IRACOM/hKEQOZW2apxARKsTtjz7T7TANYBCAC7J6P/CT8GmR74nKR0CxpVgGkiT24aoPm+SqXQCIBoQyoJkLK5v0oFKAuCuSrAf50uAa7p99a2lDkpQACUzP37iP6ryXAEAk1/LqwCiodXRRqgXikIkUIi0wACoHTu30v0t6wAJC2pgEUFIKwCYmlACWUlqd9ndCcAcpy/k+hfWvbaVEDsmJJzy1rrBOvnIglpgO2MRa8oyAgCoJsAYhzya+73l7UavHhFcaYKCBw5bYnv0s/GJT5I1gEIgF6iv1X6R44t4WbvVlSHMysP0Zyfxcsldt8SAFqMMqwDEABJ0b+vCT/as4ipgIYzZ6oA840UGNKAQDZhBgiXAiMAsjx+AIt9tER/tDq6eJyrvApoLwZKQZQ4wyOTlLdZByAALA1iE9N901q0rEXNRhQsVAsoVheRnHuZIuXp8QSAOffX5LddTfgJV7p9I/1dpjOoVIAZanlpQBggqcBlikAFkBK5khqd5J+CIf65rlVAZ2mAZzBT6k1j0CcAuon+6Dn6a7qulLsGSiHvMA3okbIOKiWBQdttBTCYxT4U52WY57+qAtp+2JVLA1Tz8C1pQKFpvEI0EAAlJeJGor8dNqpfyFwkU4quNRC5tuQ6QAkJQ9uBGkBi9O9kwg+CPRKWX3SSvjWYdHV7dWderg5AIwBsubQh+msbXnbu//x3RHkOOhVgWUA0Un8Qp7jnzqDCtOuRReY/cDlwAiA7+vc23Tdek3CV7YjrKkDUKiB6murVgmLnWn7UDl2eAIhEhdJ6tofc32ndzKoClFckUv62JX1YMg5ANFABWJy5l+gvquh/8f++3N4FVED4/KSAM0n650VRB9DszUIjAPqL/pr5ApLpMH4oWct40uZYIkVu6fP/16xFkNodmKoISAgCoJPoH4meYmy8YoOEVgVIrBaAcDHQngZIf88rsj6Abb8A2vYDYDDTfVOjv08FWM5HlA6t3UXQcF1S0uEtikGoBAiAmDO2Rfq+p/sGzqulDYdUQPgsXYe3U9MdmFgHQKk6wPkXFh/99A268s6mACVy/5Ton9uidSqg7fViaYDhfsV2ES43JCkpwhMAuwcAjSwuGf1z5hhItG1rVcD672qKgTKAZ9N4X2x1gMh77y4++ulNujMVQKLTZjqKKfp7BgYF8mJpydRdcE+QtAU2eq0DGG9wpMf2JoCfLz76GSGwGwAY+nTf2LHF+1FLL3zZJboL1gH0kVuv5uLvvXIOASqBHVIAA53uaxpwFFcB8Z0BM9IAAxHUdQCxP730xyBrEKg+IQR2LAVQbEo5uOm+rvVtJ/oBtE66uJPSzTMpVouIKoMlBJgObDkAJNHxes79i4RF7bg7XW+ATdW4DPVQQk1Z0wl3AYH/qD75u1fo4luvAEIj/gaQ+wcjrYuchigTHs+agZ5zKlu/y+jek0Qn1x3y5XMlQAhsIQBSFr4cSu4f/0w8DfDVDVJvZ/pmJqvOah8QZHkOCZd68xwCf08IbHcNoIDc7yz396uDoAowuI9XJySOnZeMTTilxFNSpQLqQVmEwPYCYJiLfajrA4GXfYuBqtOAyDGLrTos1jc7322USoAKYMjRv8kt21LbTpsGbGxUoBT6rBQ6xhoEXqbbbwUArAt99jjdV7M9mYt/x7I+b7g3oEQdoMRcfesArtB0KJdyjJuA+1u6/TYpAEmJ2F1NF7ZF/9hkPsuYgH6ie+go2nqDKyNIoj0I3mfxA7r96AFgzUu72d03OfoH1X7ujjttowLtdQDJ2msg9fz7WOac6wlsWQ2gZOEvp4ZtjP7PUgGPkFGlAandgSmDklL75ROdWrp4XrTtAoBkfKjIYh9WhSCB+Oq8ji3qX+2wDrDZHUYY6AmA1GhcIPpLgWNEvNg7JkCsrVo25FWy4d+kx+8WAKQl9m1ywo/E3gsAw+U07bZ1gvV1ACTWAdQjAlMcVUo4vCMUtlsBSMefz43+8YUttROY2/J713sQLDlhStkTIG1Xmt0VSBs9AMTrUwOK/lBE/9X3JbDvXm4dIHkBUfVSXRtwwV5XJSIARhD9BzrhR3MeLvyx3F11pUTXqJR8XvHFT+nKBEBZEPSy2Ich+hvSAG1XmwtGa7oObasAAP2Q30FFf8UKRi2OLV5njwXbTGWk3shDNtkAaLsFAOODH2D0X/uCC7h2Wu9i9p3U9QTkPp+OVhwiG7ZcAUhHLaDP6I9yu+VKNCq7gXiUJD4DejwBkBK9NzLd19gX3skYH6fLBDJ+s5hfSkcgoW2pAige/UtO9zUCo/G+tzvQUxuApjZgir7iTwOkA0CYT9eiagiJ7U0BVmSub2ENyXDI3Ojv/0zvzVKke38w1T241TcB0En0F6Xmte7uq41IBcciKDOFvhbeyvv1eO+MpPx+6srCtLErAOnpO9bor/hMh6t1pcz834xQdh0//f6xSAAMCQRFo791uq89+rXXAdIbs/NGWdfR3bf2NljHINB5CYCuon9yUS8h+jsxRF3deAAXPK4rfLeH2C1HOOyoAtjU7r6p0V9ZgHQdtm1J/NHESUF0YgKgXxhYO7t7jf4bjoGWeyN0SAJgNNE/ZZXfQtFftMCQ1rJC+Aol3dm7jKkld2br+gLIsV1RADmNo+PpvmvRP9bhlTd8Vzbp89LVQRw9ngCwOuAmJ/xolxX3fMtpXMFyHXGoyKiet9DhqQBKM6SDCT8X0f/iJTdRwCN+7mKCQonhsiWmWXflrBzws9sAEOmm8p8c/UOfcfZGK+Vv12YU2qZgQZWwpQAYwXRf1/gtN4VUc332MIJ2L9vWPgiAbdL3m5juG4j+kyt4/PUv1c1UDP2H/e0IoDlSj0U7zgfYRQBYlwArub9fYvSfzCDVAg9PPs12jPT1OaUjR2N8JwBGJQHF5szW6O+a24FPgMkMjx/8D6Sa61qwC5yf5hRynSQIi010y9HlCYCVaG4cEtP3Yh/1lyZXsJif1qJ/XmOmsCVEqACKPuhyi32sR/8p4C7j0ZefIpAjJJ65bJEf0TkJgCLydNPTfRsvuRnmpw/x5OvPVqK3qTypWBzEmeslNAJga6L9kKb7Nj7npnj061/Ygp7k3o8Bxuch7l1IAOxA9A82kg6m+7Z8dDF/upH27tRVg+5WBhLlGdK3CYDyTW1j031XP1dVi1FXSBiMCYCRw6Dn6b6N1+enjzKuZIc9ikuCEQBlG0+/032j8lpc4Je7HiXXxY/TUQmAjUT5IU73LbB0h0s45TFr++RhvRwZQQWwyei/gb3sGGtpOwyAUjv8ZER/q0IoMr5fyt++7SI+SblbCiB3h5/C032VDdDtrBMP4qRd7Q8BsFu073K6bwl1ov+W27gzuvG1j+ftfrK8gMkuw+DS9l5aDxN+zLl/921MdQQRwO108JtgtXrT/HtnEodLW+vkXUd/p+mBWN9m2zVctPR2AR1vP2A4mowBAMD6FtM7BYPtUgBSf44dR//Wl2SQztAvFEZRV5gEHB/K9wiAcT30Dqf7ji8C7rq1AUDj+G3rrAgBsGnpLyi01FfidN/clIKRf1MAiEV+zWsO0emoBMCA6gMdTPfNrU3QU/s2Z5T8vteoAIafBnS82IcaKrSBKYBUx68aT1jG/KTHrwA0hb8hR38w+g8IAG2v1f9UABY1CIwe8VtYBNTuyVdqsQ9G/5EDwBf5q9rfZzWnr7bpRoxbAUjqhyUh+ifCZ4M0oLAIAqDp+BfRXZZ/n9YgMGqZv4UAeP4s3OQ3EnL/Zvqw3dF/+0Gg3wGhEnmA1V6AutM/rf272gUdN14FcLHe5uxF4Ozzds/rZbGPNkiIp5m6zp3TDQYtbpD+89kXD/+plscvADxpQGCnkrct7Qbse7EPyyKlA4jHOzoP4Gy++O/feu2DfwTwGMB8V52+rRgyUv9eda6VdKDEdF/rYh8+qCQ0L2e5DcmHcqUexABTghU7OT1b/MO//fsnbwH4ahn1z2oQ2FkbqwK4D+AHa4999iJw9llm9E9UCME8RfDid/+ZNTkaFUARvh/9+duA3PU6YZ+LfXiBsTXDxWkEwBAh8Bf3ALwJ4MTkdH0v9iF0fhoB0BUEPgTkVQD/GfbJUtFfCxU6PY0A6AkCf/nxuRKQ+8Wif6npvoz+NAKgFwicuKMfvg3BXX2UL7TYB6M/jQAYCAhu//AeII26QJtf9rDYB6M/jQDYBAT+6kMAy7pA34t9CGFAIwAGAIGPl0rgfrfRnw5PIwAGCoF3Ttztd5Z1gT4m/HBtQBoBMDwQHL9zD8/GC3Q13TcW/QkBGgGwQQj8qFYXYPSn0XYKAEsIfLxUAvezor9ooz+dn0YADAwC756443fb5xEUme5LIUAjAEYAgh+f1wUEJ0Wm+zL60wiA0UHgQ7jGPIIuov/2LidHIwDGDoG7H0Mu6gIdRn/6P40AGCgE7tw9cXfuvg1czCMwRn/RKAQBdngPehoBMAIQ/PV5XcA7jyB7WPFkCYAJYUAjAIYJgQ/ROo8ACukfrSO4FggQBjQCYFgQ+JuPUR8vUCb6X9zr5h/CgEYADBACJ+7OT2p1gezo7wNADAqEAY0A2BwIfnJvdX2BrP0I25w89tqkAQMCgUYA9AqBl96r1QWcIvp7c4CYk08UUKA6oBEAG4BArS7Q9D3tbsRqJ4+95qgKaARA/xA4cS+9d76+gHOK7bXWwJDq+EwJaATAYEDw8nv3ALwJ505WIRCdVDRJ/NN09ouda+tbV9NoBECvdQFZ1gXc9LlvhicVpUj++g/Ol38WdH4aATCkuoCbeG6lhFIAX5HvIsIvAJzifM/6s4bj02gEwOYh8P55XQC4C0xwrga8/ukCELjYpnqxdPgny78XNblPoxEAA1UD53UBuBO4S1jdV8y1KQDUovwZzverf7T8m9GeRgCMDgIv18YLuCnO0wLUewvc0rHnSyd/CODrpeOf1vJ7Oj2NABgpBJZ1AXcf7tIzCFQiD5aS/isAD5Z/X+T2czo9jQDYGgi8f+Jefu983UE3BdwUVSX/unT8J7VoT6enbb69ygh3sXFuHONf5JMP3gDwBoB77qX3T9jcttdkpLtBOeE2VjQaUwAajUYA0Gg0AoBGoxEANBqNAKDRaAQAjUYjAGg0GgFAo9EIABqNRgDQaDQCgEajEQA0Go0AoNFoBACNRiMAaDQaAUCj0QgAGo1GANBoNAKARqMRADQajQCg0WgEAI1G69j+H+EKrExrniVfAAAAAElFTkSuQmCC",
            IMAGE_Notepad: "data:image/png;base64,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/SaARAixrVP9ESYn9ababT0dNv5uANi9fljxA9eYxZQLLShRlOue82MveM7d73zLa48fv2Fvs9llpsMwjbJsyob/9Wef6fVHY/7Vz37qC1+4589/D8CGUBN7W06N70p2u3X+U6qttxsAdq+nW0AwHASDHxhS0j7G+Y0//rKXvfCtd7/hVddcc7TTaHRI6HsIfB/dtlIkidNI/szPvudPTj744KeEEH+lAT6T5ovahp+28fF03fy7AWD3eqrgB9NajqG+tQEsAbix3enc+Nq7XveSV/zEnbfs238k8LyAPPS9/3bv3//7//bvSykfklKOUAXxRC0I/Mhs/N0AsHs9lQMCnRIM2oSQLoCWlHIJwP7u3Nx40O99VUqsoIrWSycQuBv/aVnn7waA3evpVi5MKxVyVDkIHkriDpmywcWP8sbfDQC719MlIJhAIJxSwS0dRG1Ty92NvxsAdq+n19qdVioQTBde3d34uwFg93oar+V6MKif/tM2u/xRf9F2r93r6baWp63t3Y2/GwB2r931vLvxdwPA7vWjuKZ3N/7utXvtXrvX7rV77V671+61e+1eP8rX/w9/CQD/OfGT/QAAAABJRU5ErkJggg==",
            getIconByFileName: function (Name) {
                if (Bridge.referenceEquals(Name, "cmd.exe")) {
                    return WinFormjs.IconRepository.IMAGE_CMD;
                } else if (Bridge.referenceEquals(Name, "Notepad.exe")) {
                    return WinFormjs.IconRepository.IMAGE_Notepad;
                }
                return "";
            }
        }
    });

    Bridge.define("WinFormjs.NodeViewType", {
        $kind: "enum",
        statics: {
            Content: 0,
            Tiles: 1,
            Details: 2,
            List: 3,
            Small_Icons: 4,
            Medium_Icons: 5,
            Large_Icons: 6,
            Extra_Large_Icons: 7
        }
    });

    Bridge.define("WinFormjs.Path", {
        statics: {
            getDirectoryName: function (path) {
                var FileName = WinFormjs.Path.getFileName(path);
                return path.substr(0, ((((path.length - FileName.length) | 0) - 1) | 0));
            },
            getFileName: function (path) {
                if (path != null) {
                    //                CheckInvalidPathChars(path, false);
                    var length = path.length;
                    var num2 = length;
                    while (((num2 = (num2 - 1) | 0)) >= 0) {
                        var ch = path.charCodeAt(num2);
                        if (((ch === 92) || (ch === 47)) || (ch === 58)) {
                            return path.substr(((num2 + 1) | 0), (((((length - num2) | 0)) - 1) | 0));
                        }
                    }
                }
                return path;
            }
        }
    });

    Bridge.define("WinFormjs.Process", {
        statics: {
            start: function (fileName) {
                var DirectoryName = WinFormjs.Path.getDirectoryName(fileName);
                var FileName = WinFormjs.Path.getFileName(fileName);

                if (Bridge.referenceEquals(DirectoryName, WinFormjs.FileExplorer.DesktopPath)) {
                    switch (FileName) {
                        case "iexplore.exe": 
                            var iexplore = new WinFormjs.FormBrowser();
                            iexplore.setLeft("50px");
                            iexplore.setTop("50px");
                            iexplore.setText("Bing");
                            iexplore.navigate("https://bing.com");
                            iexplore.show();
                            break;
                        case "Notepad.exe": 
                            var Notepad = new WinFormjs.FormNotePad();
                            Notepad.setLeft("50px");
                            Notepad.setTop("50px");
                            Notepad.setText("Note Pad");
                            Notepad.show();
                            break;
                        case "cmd.exe": 
                            var cmd = new WinFormjs.FormConsole();
                            cmd.setLeft("50px");
                            cmd.setTop("50px");
                            cmd.setText("Command Prompt");
                            cmd.show();
                            break;
                    }
                } else {

                }

                return null;
            }
        }
    });

    Bridge.define("WinFormjs.Rectange", {
        $kind: "struct",
        statics: {
            valueInRange: function (value, min, max) {
                return (value >= min) && (value <= max);
            },
            rectOverlap: function (A, B) {
                var xOverlap = WinFormjs.Rectange.valueInRange(A.x, B.x, ((B.x + B.width) | 0)) || WinFormjs.Rectange.valueInRange(B.x, A.x, ((A.x + A.width) | 0));

                var yOverlap = WinFormjs.Rectange.valueInRange(A.y, B.y, ((B.y + B.height) | 0)) || WinFormjs.Rectange.valueInRange(B.y, A.y, ((A.y + A.height) | 0));

                return xOverlap && yOverlap;
            },
            createFromHTMLElement: function (element) {
                if (element == null) {
                    return new WinFormjs.Rectange.ctor();
                }

                var obj = $(element);
                return Bridge.merge(new WinFormjs.Rectange.ctor(), {
                    x: parseInt(obj.css("left")),
                    y: parseInt(obj.css("top")),
                    width: parseInt(obj.css("width")),
                    height: parseInt(obj.css("height"))
                } );
            },
            getDefaultValue: function () { return new WinFormjs.Rectange(); }
        },
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        $ctor1: function (x, y, width, height) {
            this.$initialize();
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        },
        ctor: function () {
            this.$initialize();
        },
        getHashCode: function () {
            var hash = 17;
            hash = hash * 23 + 3653948339;
            hash = hash * 23 + (this.x == null ? 0 : Bridge.getHashCode(this.x));
            hash = hash * 23 + (this.y == null ? 0 : Bridge.getHashCode(this.y));
            hash = hash * 23 + (this.width == null ? 0 : Bridge.getHashCode(this.width));
            hash = hash * 23 + (this.height == null ? 0 : Bridge.getHashCode(this.height));
            return hash;
        },
        equals: function (o) {
            if (!Bridge.is(o, WinFormjs.Rectange)) {
                return false;
            }
            return Bridge.equals(this.x, o.x) && Bridge.equals(this.y, o.y) && Bridge.equals(this.width, o.width) && Bridge.equals(this.height, o.height);
        },
        $clone: function (to) {
            var s = to || new WinFormjs.Rectange();
            s.x = this.x;
            s.y = this.y;
            s.width = this.width;
            s.height = this.height;
            return s;
        }
    });

    Bridge.define("WinFormjs.Directory", {
        inherits: [WinFormjs.FileExplorerNode],
        statics: {
            getDirectories: function (path) {
                if (Bridge.referenceEquals(path, WinFormjs.FileExplorer.DesktopPath)) {
                    if (true) {
                        var pathList = new (System.Collections.Generic.List$1(String))();
                        for (var i = 0; i < 100; i = (i + 1) | 0) {
                            pathList.add(System.String.format("{0}/New Folder {1}", path, i));
                        }
                        return pathList.toArray();
                    } else {
                        //return new string[] {
                        //string.Format("{0}/New Folder 1", path),
                        //string.Format("{0}/New Folder 2", path),
                        //string.Format("{0}/New Folder 3", path),
                        //string.Format("{0}/New Folder 4", path)};
                    }
                }

                return null;
            },
            getFiles: function (path) {
                if (Bridge.referenceEquals(path, WinFormjs.FileExplorer.DesktopPath)) {
                    return [System.String.format("{0}/iexplore.exe", path), System.String.format("{0}/Notepad.exe", path), System.String.format("{0}/cmd.exe", path)];
                }

                return null;
            }
        }
    });

    Bridge.define("WinFormjs.File", {
        inherits: [WinFormjs.FileExplorerNode],
        statics: {
            readAllText: function (path) {
                return null;
            },
            readAllLines: function (path) {
                return null;
            },
            readAllBytes: function (path) {
                return null;
            },
            writeAllBytes: function (path, bytes) {

            },
            writeAllLines: function (path, contents) {

            },
            writeAllText: function (path, contents) {

            }
        }
    });

    Bridge.define("WinFormjs.FormBrowser", {
        inherits: [WinFormjs.Form],
        config: {
            properties: {
                Content: null,
                URL: null
            }
        },
        navigate: function (url) {
            if (!System.String.startsWith(url.toLowerCase(), "http") && !System.String.startsWith(url.toLowerCase(), "file:///")) {
                url = System.String.concat("http://", url);
            }
            this.setURL(url);
            if (this.isVisible()) {
                this.getContent().src = this.getURL();
            }
        },
        initialise: function () {
            this.setContent(document.createElement('iframe'));

            this.fillControlWithParent(this.getContent(), 6, 6);

            this.setText("Quick Search");

            this.getBody().appendChild(this.getContent());
        },
        onShowed: function () {
            if (!Bridge.referenceEquals(this.getURL(), this.getContent().src)) {
                this.getContent().src = this.getURL();
            }
        }
    });

    Bridge.define("WinFormjs.FormConsole", {
        inherits: [WinFormjs.Form],
        commandPanel: null,
        commandInput: null,
        commandLines: null,
        line: -1,
        setCommandLineElement: function (element) {
            if (Bridge.referenceEquals(element.tagName.toLowerCase(), "span")) {
                WinFormjs.Form.setInternalLabel(element);
                $(element).css("user-select", "text");

                element.addEventListener("mousemove", function (ev) {
                    element.style.cursor = "text";
                    ev.stopPropagation();
                });
                element.addEventListener("click", $_.WinFormjs.FormConsole.f1);
            }

            element.style.backgroundColor = "black";
            element.style.height = "24px";
            element.style.padding = "0";
            element.style.color = "white";
            element.style.margin = "0";
            element.style.borderStyle = "none";
            element.style.fontFamily = "monospace";
            element.style.fontSize = "12pt";

            $(element).on("focus", function () {
                element.style.outline = "0";
            });
        },
        initialise: function () {
            this.commandPanel = document.createElement('div');
            this.commandPanel.style.backgroundColor = "black";
            this.commandPanel.style.overflow = "auto";

            this.commandPanel.addEventListener("mousemove", Bridge.fn.bind(this, $_.WinFormjs.FormConsole.f2));

            this.commandLines = new (System.Collections.Generic.List$1(HTMLSpanElement))();

            this.fillControlWithParent(this.commandPanel, 2, 2);

            this.commandInput = Bridge.merge(document.createElement('input'), {
                type: "text"
            } );

            this.fillHorizontalControlWithParent(this.commandInput, 2);

            this.setCommandLineElement(this.commandInput);

            this.commandInput.addEventListener("keydown", Bridge.fn.bind(this, $_.WinFormjs.FormConsole.f3));

            this.incrementLine();

            this.commandPanel.appendChild(this.commandInput);

            this.commandPanel.addEventListener("click", Bridge.fn.bind(this, $_.WinFormjs.FormConsole.f4));

            this.getBody().appendChild(this.commandPanel);

            this.setWidth("677px");
            this.setHeight("392px");
        },
        onShowed: function () {
            this.commandInput.focus();
        },
        incrementLine: function () {
            var cmd = this.commandInput.value;
            if (cmd.length > 0) {
                this.commandInput.value = "";

                var SpanText = document.createElement('span');
                this.fillHorizontalControlWithParent(SpanText, 2);

                this.setCommandLineElement(SpanText);
                SpanText.innerHTML = cmd;
                SpanText.style.top = System.String.concat((((((parseInt(this.commandInput.style.height) * this.line) | 0)) + 3) | 0), "px");
                this.commandPanel.appendChild(SpanText);
                this.commandLines.add(SpanText);
            }
            this.line = (this.line + 1) | 0;
            this.commandInput.style.top = System.String.concat((((parseInt(this.commandInput.style.height) * this.line) | 0)), "px");
            this.commandPanel.scrollTop = this.commandPanel.scrollHeight;

            if (Bridge.referenceEquals(cmd.toLowerCase(), "clear")) {
                this.clear();
            }
        },
        clear: function () {
            this.line = -1;
            this.commandInput.value = "";

            for (var i = 0; i < this.commandLines.getCount(); i = (i + 1) | 0) {
                if (this.commandLines.getItem(i) != null) {
                    this.commandLines.getItem(i).remove();
                }
            }
            this.commandLines = new (System.Collections.Generic.List$1(HTMLSpanElement))();

            this.incrementLine();
        }
    });

    Bridge.ns("WinFormjs.FormConsole", $_);

    Bridge.apply($_.WinFormjs.FormConsole, {
        f1: function (ev) {
            ev.stopPropagation();
        },
        f2: function (ev) {
            this.commandPanel.style.cursor = "text";
            ev.stopPropagation();
        },
        f3: function (ev) {
            var kev = ev;

            if (kev.keyCode === 13) {
                this.incrementLine();
            }
        },
        f4: function (ev) {
            this.commandInput.focus();
        }
    });

    Bridge.define("WinFormjs.FormNotePad", {
        inherits: [WinFormjs.Form],
        config: {
            properties: {
                NotePadContent: null
            }
        },
        initialise: function () {
            this.setNotePadContent(document.createElement('textarea'));

            this.fillControlWithParent(this.getNotePadContent());

            this.getNotePadContent().style.resize = "none";

            this.getBody().appendChild(this.getNotePadContent());
        }
    });
});
