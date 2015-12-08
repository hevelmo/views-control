/**
 * jPList - jQuery Data Grid Controls 0.0.6 - http://jplist.com
 * Copyright 2015 jPList Software
 */
(function() {
    var d = function(a, c) {
            var b, h = [],
                d, e, f;
            b = a.$control.data("storage-status");
            c && b || a.params.$buttons.each(function(a, k) {
                d = jQuery(k);
                (f = c ? "true" === d.attr("data-selected") : d.data("selected") || !1) && (e = d.attr("data-path")) && h.push(e)
            });
            return b = new jQuery.fn.jplist.app.dto.StatusDTO(a.name, a.action, a.type, {
                pathGroup: h,
                filterType: "pathGroup"
            }, a.inStorage, a.inAnimation, a.isAnimateToTop, a.inDeepLinking)
        },
        f = function(a, c) {
            var b, d;
            a.params.$buttons.each(function(a, k) {
                if (b = jQuery(k).attr("data-path")) d =
                    new jQuery.fn.jplist.domain.dom.models.DataItemMemberPathModel(b, "text"), c.push(d)
            })
        },
        e = function(a, c, b) {
            var d;
            a.params.$buttons.each(function(a, c) {
                d = jQuery(c);
                d.removeClass("jplist-selected");
                d.data("selected", !1)
            });
            if (c.data && c.data.pathGroup && jQuery.isArray(c.data.pathGroup) && 0 < c.data.pathGroup.length)
                for (var e = 0; e < c.data.pathGroup.length; e++) b = c.data.pathGroup[e], d = a.params.$buttons.filter('[data-path="' + b + '"]'), 0 < d.length && (d.addClass("jplist-selected"), d.data("selected", !0))
        },
        a = function(a) {
            a.params.$buttons.on("click",
                function() {
                    var c, b;
                    c = jQuery(this);
                    "multiple" === a.params.mode ? (b = c.data("selected") || !1, c.data("selected", !b)) : (a.params.$buttons.data("selected", !1), c.data("selected", !0));
                    a.history.addStatus(d(a, !1));
                    a.observer.trigger(a.observer.events.unknownStatusesChanged, [!1])
                })
        },
        b = function(a) {
            var c;
            "multiple" === a.params.mode ? a.params.$buttons.each(function() {
                var c = jQuery(this),
                    b;
                b = "true" === c.attr("data-selected");
                a.options.deepLinking && (b = !1);
                c.data("selected", b)
            }) : (a.params.$buttons.data("selected", !1), c =
                a.params.$buttons.filter('[data-selected="true"]'), c = 0 < c.length ? c.eq(0) : a.params.$buttons.eq(0), c.data("selected", !0), c.attr("data-selected", !0), c.trigger("click"))
        },
        c = function(c) {
            c.params = {
                $buttons: c.$control.find("[data-button]"),
                mode: c.$control.attr("data-mode") || "multiple"
            };
            a(c);
            b(c);
            return jQuery.extend(this, c)
        };
    c.prototype.getStatus = function(a) {
        return d(this, a)
    };
    c.prototype.getDeepLink = function() {
        var a = "",
            c = "",
            b;
        if (this.inDeepLinking && (b = d(this, !1), b.data && b.data.pathGroup && 0 < b.data.pathGroup.length)) {
            for (var e =
                    0; e < b.data.pathGroup.length; e++) a = b.data.pathGroup[e], 0 < e && (c += this.options.delimiter2), c += a;
            a = this.name + this.options.delimiter0 + "selected=" + c
        }
        return a
    };
    c.prototype.getStatusByDeepLink = function(a, c) {
        var b = null;
        this.inDeepLinking && (b = d(this, !1), b.data && "selected" === a && (b.data.pathGroup = c.split(this.options.delimiter2)));
        return b
    };
    c.prototype.getPaths = function(a) {
        f(this, a)
    };
    c.prototype.setStatus = function(a, c) {
        e(this, a, c)
    };
    jQuery.fn.jplist.ui.controls.ButtonFilterGroup = function(a) {
        return new c(a)
    };
    jQuery.fn.jplist.controlTypes["button-filter-group"] = {
        className: "ButtonFilterGroup",
        options: {}
    }
})();
(function() {
    var d = function(a, b) {
            var c, k = "";
            (c = b ? "true" === a.$control.attr("data-selected") : a.params.selected) && (k = "path");
            c = {
                path: a.$control.attr("data-path"),
                filterType: k,
                selected: c
            };
            return new jQuery.fn.jplist.app.dto.StatusDTO(a.name, a.action, a.type, c, a.inStorage, a.inAnimation, a.isAnimateToTop, a.inDeepLinking)
        },
        f = function(a) {
            a.$control.on("click", function() {
                a.params.selected = !a.params.selected;
                a.history.addStatus(d(a, !1));
                a.observer.trigger(a.observer.events.unknownStatusesChanged, [!1])
            })
        },
        e = function(a) {
            a.params = {
                selected: "true" === a.$control.attr("data-selected")
            };
            a.options.deepLinking && (a.params.selected = !1);
            f(a);
            return jQuery.extend(this, a)
        };
    e.prototype.getStatus = function(a) {
        return d(this, a)
    };
    e.prototype.getDeepLink = function() {
        var a = "",
            b = null;
        this.inDeepLinking && (b = d(this, !1), b.data && b.data.selected && (a = this.name + this.options.delimiter0 + "selected=true"));
        return a
    };
    e.prototype.getStatusByDeepLink = function(a, b) {
        var c = null,
            k;
        this.inDeepLinking && (c = d(this, !1), c.data && (k = "selected" === a && "true" === b)) && (c.data.selected =
            k, c.data.filterType = "path");
        return c
    };
    e.prototype.getPaths = function(a) {
        var b;
        if (b = this.$control.attr("data-path")) b = new jQuery.fn.jplist.domain.dom.models.DataItemMemberPathModel(b, "text"), a.push(b)
    };
    e.prototype.setStatus = function(a, b) {
        (this.params.selected = a.data.selected) ? this.$control.addClass("jplist-selected"): this.$control.removeClass("jplist-selected")
    };
    jQuery.fn.jplist.ui.controls.ButtonFilter = function(a) {
        return new e(a)
    };
    jQuery.fn.jplist.controlTypes["button-filter"] = {
        className: "ButtonFilter",
        options: {}
    }
})();
(function() {
    jQuery.fn.jplist.ui.controls.ButtonTextFilterDTO = function(d, f, e, a, b) {
        return {
            path: d,
            ignore: e,
            value: f,
            selected: a,
            mode: b,
            filterType: "TextFilter"
        }
    }
})();
(function() {
    jQuery.fn.jplist.ui.controls.ButtonTextFilterGroupDTO = function(d, f) {
        return {
            textAndPathsGroup: d,
            ignore: f,
            filterType: "textFilterPathGroup"
        }
    }
})();
(function() {
    var d = function(a, b) {
            var g, d = [];
            g = null;
            g = "";
            a.controlOptions && a.controlOptions.ignore && (g = a.controlOptions.ignore);
            a.params.$buttons.each(function(a, c) {
                var g = jQuery(c),
                    e;
                e = b ? "true" === g.attr("data-selected") : g.data("selected") || !1;
                d.push({
                    selected: e,
                    text: g.data("dataText"),
                    path: g.data("dataPath"),
                    mode: g.data("dataMode") || "contains"
                })
            });
            g = new jQuery.fn.jplist.ui.controls.ButtonTextFilterGroupDTO(d, g);
            return g = new jQuery.fn.jplist.app.dto.StatusDTO(a.name, a.action, a.type, g, a.inStorage, a.inAnimation,
                a.isAnimateToTop, a.inDeepLinking)
        },
        f = function(a, b) {
            var g, d, e;
            a.params.$buttons.each(function(a, c) {
                g = jQuery(this);
                if (d = g.attr("data-path")) e = new jQuery.fn.jplist.domain.dom.models.DataItemMemberPathModel(d, "text"), b.push(e)
            })
        },
        e = function(a, b, g) {
            var d;
            a.params.$buttons.each(function(a, c) {
                d = jQuery(c);
                d.removeClass("jplist-selected");
                d.data("selected", !1)
            });
            if (b.data && b.data.textAndPathsGroup && jQuery.isArray(b.data.textAndPathsGroup) && 0 < b.data.textAndPathsGroup.length)
                for (var e = 0; e < b.data.textAndPathsGroup.length; e++) g =
                    b.data.textAndPathsGroup[e], d = a.params.$buttons.filter('[data-path="' + g.path + '"][data-text="' + g.text + '"]'), 0 < d.length && g.selected && (d.addClass("jplist-selected"), d.data("selected", !0))
        },
        a = function(a) {
            var b;
            a.params.$buttons.on("click", function() {
                var g = jQuery(this);
                b = g.data("selected") || !1;
                g.data("selected", !b);
                a.history.addStatus(d(a, !1));
                a.observer.trigger(a.observer.events.unknownStatusesChanged, [!1])
            })
        },
        b = function(c) {
            c.params = {
                $buttons: c.$control.find("[data-button]")
            };
            c.params.$buttons.each(function() {
                var a =
                    jQuery(this),
                    b;
                b = "true" === a.attr("data-selected");
                c.options.deepLinking && (b = !1);
                a.data("selected", b);
                a.data("dataPath", a.attr("data-path"));
                a.data("dataText", a.attr("data-text"));
                a.data("dataMode", a.attr("data-mode") || "contains")
            });
            a(c);
            return jQuery.extend(this, c)
        };
    b.prototype.getStatus = function(a) {
        return d(this, a)
    };
    b.prototype.getDeepLink = function() {
        var a = "",
            b, g, e = [];
        if (this.inDeepLinking && (b = d(this, !1), b.data && b.data.textAndPathsGroup && 0 < b.data.textAndPathsGroup.length)) {
            for (var h = 0; h < b.data.textAndPathsGroup.length; h++) g =
                b.data.textAndPathsGroup[h], g.selected && e.push(g.text + this.options.delimiter3 + g.path);
            0 < e.length && (a = this.name + this.options.delimiter0 + "selected=" + e.join(this.options.delimiter2))
        }
        return a
    };
    b.prototype.getStatusByDeepLink = function(a, b) {
        var g = null,
            e, h;
        if (this.inDeepLinking && (g = d(this, !1), g.data && "selected" === a)) {
            g.data.textAndPathsGroup = [];
            e = b.split(this.options.delimiter2);
            for (var f = 0; f < e.length; f++) h = e[f].split(this.options.delimiter3), 2 === h.length && g.data.textAndPathsGroup.push({
                selected: !0,
                text: h[0],
                path: h[1]
            })
        }
        return g
    };
    b.prototype.getPaths = function(a) {
        f(this, a)
    };
    b.prototype.setStatus = function(a, b) {
        e(this, a, b)
    };
    jQuery.fn.jplist.ui.controls.ButtonTextFilterGroup = function(a) {
        return new b(a)
    };
    jQuery.fn.jplist.controlTypes["button-text-filter-group"] = {
        className: "ButtonTextFilterGroup",
        options: {
            ignore: "[~!@#$%^&*()+=`'\"/\\_]+"
        }
    }
})();
(function() {
    var d = function(a, b) {
            var c;
            c = null;
            var d = "",
                g = "";
            a.controlOptions && a.controlOptions.ignore && (d = a.controlOptions.ignore);
            g = (c = b ? "true" === a.$control.attr("data-selected") : a.params.selected) ? a.params.dataText : "";
            c = new jQuery.fn.jplist.ui.controls.ButtonTextFilterDTO(a.params.dataPath, g, d, c, a.params.dataMode || "contains");
            return c = new jQuery.fn.jplist.app.dto.StatusDTO(a.name, a.action, a.type, c, a.inStorage, a.inAnimation, a.isAnimateToTop, a.inDeepLinking)
        },
        f = function(a) {
            a.$control.on("click", function() {
                a.params.selected = !a.params.selected;
                a.history.addStatus(d(a, !1));
                a.observer.trigger(a.observer.events.unknownStatusesChanged, [!1])
            })
        },
        e = function(a) {
            a.params = {
                selected: "true" === a.$control.attr("data-selected"),
                dataPath: a.$control.attr("data-path"),
                dataText: a.$control.attr("data-text"),
                dataMode: a.$control.attr("data-mode")
            };
            a.options.deepLinking && (a.params.selected = !1);
            f(a);
            return jQuery.extend(this, a)
        };
    e.prototype.getStatus = function(a) {
        return d(this, a)
    };
    e.prototype.getDeepLink = function() {
        var a = "",
            b;
        this.inDeepLinking &&
            (b = d(this, !1), b.data && b.data.selected && (a = this.name + this.options.delimiter0 + "selected=true"));
        return a
    };
    e.prototype.getStatusByDeepLink = function(a, b) {
        var c = null,
            e;
        this.inDeepLinking && (c = d(this, !1), c.data && (e = "selected" === a && "true" === b)) && (c.data.selected = e, c.data.value = this.params.dataText);
        return c
    };
    e.prototype.getPaths = function(a) {
        var b;
        this.params.dataPath && (b = new jQuery.fn.jplist.domain.dom.models.DataItemMemberPathModel(this.params.dataPath, "text"), a.push(b))
    };
    e.prototype.setStatus = function(a,
        b) {
        (this.params.selected = a.data.selected) ? this.$control.addClass("jplist-selected"): this.$control.removeClass("jplist-selected")
    };
    jQuery.fn.jplist.ui.controls.ButtonTextFilter = function(a) {
        return new e(a)
    };
    jQuery.fn.jplist.controlTypes["button-text-filter"] = {
        className: "ButtonTextFilter",
        options: {
            ignore: "[~!@#$%^&*()+=`'\"/\\_]+"
        }
    }
})();
(function() {
    jQuery.fn.jplist.ui.controls.CheckboxGroupFilterDTO = function(d) {
        return {
            pathGroup: d,
            filterType: "pathGroup"
        }
    }
})();
(function() {
    var d = function(a, b) {
            var d, e = [];
            d = null;
            var f;
            a.params.$checkboxes.each(function(a, c) {
                var d = jQuery(c);
                f = b ? d.data("selected-on-start") || !1 : d.get(0).checked;
                d = d.attr("data-path");
                f && d && e.push(d)
            });
            d = new jQuery.fn.jplist.ui.controls.CheckboxGroupFilterDTO(e);
            return d = new jQuery.fn.jplist.app.dto.StatusDTO(a.name, a.action, a.type, d, a.inStorage, a.inAnimation, a.isAnimateToTop, a.inDeepLinking)
        },
        f = function(a, b) {
            a.params.$checkboxes.each(function(a, c) {
                var d;
                if (d = jQuery(this).attr("data-path")) d = new jQuery.fn.jplist.domain.dom.models.DataItemMemberPathModel(d,
                    "text"), b.push(d)
            })
        },
        e = function(a, b, d) {
            var e;
            a.params.$checkboxes.each(function(a, b) {
                e = jQuery(b);
                e.removeClass("jplist-selected");
                e.get(0).checked = !1
            });
            if (b.data && b.data.pathGroup && jQuery.isArray(b.data.pathGroup) && 0 < b.data.pathGroup.length)
                for (var f = 0; f < b.data.pathGroup.length; f++) d = b.data.pathGroup[f], e = a.params.$checkboxes.filter('[data-path="' + d + '"]'), 0 < e.length && (e.addClass("jplist-selected"), e.get(0).checked = !0)
        },
        a = function(a) {
            a.params.$checkboxes.on("change", function() {
                a.history.addStatus(d(a, !1));
                a.observer.trigger(a.observer.events.unknownStatusesChanged, [!1])
            })
        },
        b = function(b) {
            b.params = {
                $checkboxes: b.$control.find("[data-path]")
            };
            b.params.$checkboxes.each(function() {
                var a = jQuery(this),
                    d;
                d = a.get(0).checked;
                b.options.deepLinking && (d = !1);
                a.data("selected-on-start", d);
                a.data("mode", a.attr("data-mode") || "contains")
            });
            a(b);
            return jQuery.extend(this, b)
        };
    b.prototype.getStatus = function(a) {
        return d(this, a)
    };
    b.prototype.getDeepLink = function() {
        var a = "",
            b, e = "";
        if (this.inDeepLinking && (b = d(this, !1),
                b.data && jQuery.isArray(b.data.pathGroup) && 0 < b.data.pathGroup.length)) {
            for (a = 0; a < b.data.pathGroup.length; a++) "" !== e && (e += this.options.delimiter2), e += b.data.pathGroup[a];
            a = this.name + this.options.delimiter0 + "pathGroup=" + e
        }
        return a
    };
    b.prototype.getStatusByDeepLink = function(a, b) {
        var e = null,
            f;
        this.inDeepLinking && (e = d(this, !0), e.data && "pathGroup" === a && (f = b.split(this.options.delimiter2), 0 < f.length && (e.data.pathGroup = f)));
        return e
    };
    b.prototype.getPaths = function(a) {
        f(this, a)
    };
    b.prototype.setStatus = function(a,
        b) {
        e(this, a, b)
    };
    jQuery.fn.jplist.ui.controls.CheckboxGroupFilter = function(a) {
        return new b(a)
    };
    jQuery.fn.jplist.controlTypes["checkbox-group-filter"] = {
        className: "CheckboxGroupFilter",
        options: {}
    }
})();
(function() {
    jQuery.fn.jplist.ui.controls.CheckboxTextFilterDTO = function(d, f, e, a, b) {
        return {
            textGroup: d,
            logic: f,
            path: e,
            ignoreRegex: a,
            mode: b,
            filterType: "textGroup"
        }
    }
})();
(function() {
    var d = function(a, c) {
            var d, e = [];
            d = null;
            var f;
            a.params.$checkboxes.each(function(a, b) {
                var d = jQuery(b);
                f = c ? d.data("selected-on-start") || !1 : d.get(0).checked;
                (d = d.val()) && f && e.push(d)
            });
            d = new jQuery.fn.jplist.ui.controls.CheckboxTextFilterDTO(e, a.params.dataLogic, a.params.dataPath, a.params.ignore);
            return d = new jQuery.fn.jplist.app.dto.StatusDTO(a.name, a.action, a.type, d, a.inStorage, a.inAnimation, a.isAnimateToTop, a.inDeepLinking)
        },
        f = function(a, c, d) {
            var e;
            a.params.$checkboxes.each(function(a,
                b) {
                e = jQuery(b);
                e.removeClass("jplist-selected");
                e.get(0).checked = !1
            });
            if (c.data && c.data.textGroup && jQuery.isArray(c.data.textGroup) && 0 < c.data.textGroup.length)
                for (var f = 0; f < c.data.textGroup.length; f++) d = c.data.textGroup[f], e = a.params.$checkboxes.filter('[value="' + d + '"]'), 0 < e.length && (e.addClass("jplist-selected"), e.get(0).checked = !0)
        },
        e = function(a) {
            a.params.$checkboxes.on("change", function() {
                a.history.addStatus(d(a, !1));
                a.observer.trigger(a.observer.events.unknownStatusesChanged, [!1])
            })
        },
        a = function(a) {
            a.params = {
                $checkboxes: a.$control.find('input[type="checkbox"]'),
                dataPath: a.$control.attr("data-path"),
                dataLogic: a.$control.attr("data-logic") || "or",
                ignore: ""
            };
            a.controlOptions && a.controlOptions.ignore && (a.params.ignore = a.controlOptions.ignore);
            a.params.$checkboxes.each(function() {
                var c = jQuery(this),
                    d;
                d = c.get(0).checked;
                a.options.deepLinking && (d = !1);
                c.data("selected-on-start", d)
            });
            e(a);
            return jQuery.extend(this, a)
        };
    a.prototype.getStatus = function(a) {
        return d(this, a)
    };
    a.prototype.getDeepLink = function() {
        var a =
            "",
            c, e = "";
        if (this.inDeepLinking && (c = d(this, !1), c.data && jQuery.isArray(c.data.textGroup) && 0 < c.data.textGroup.length)) {
            for (a = 0; a < c.data.textGroup.length; a++) "" !== e && (e += this.options.delimiter2), e += c.data.textGroup[a];
            a = this.name + this.options.delimiter0 + "textGroup=" + e
        }
        return a
    };
    a.prototype.getStatusByDeepLink = function(a, c) {
        var e = null,
            f;
        this.inDeepLinking && (e = d(this, !0), e.data && "textGroup" === a && (f = c.split(this.options.delimiter2), 0 < f.length && (e.data.textGroup = f)));
        return e
    };
    a.prototype.getPaths = function(a) {
        var c;
        this.params.dataPath && (c = new jQuery.fn.jplist.domain.dom.models.DataItemMemberPathModel(this.params.dataPath, "text"), a.push(c))
    };
    a.prototype.setStatus = function(a, c) {
        f(this, a, c)
    };
    jQuery.fn.jplist.ui.controls.CheckboxTextFilter = function(b) {
        return new a(b)
    };
    jQuery.fn.jplist.controlTypes["checkbox-text-filter"] = {
        className: "CheckboxTextFilter",
        options: {
            ignore: ""
        }
    }
})();
(function() {
    var d = function(a, b) {
            var c = null,
                d;
            d = b ? a.params.initialSelected || !1 : a.$control.get(0).checked;
            c = {
                path: a.$control.attr("data-path"),
                type: "TextFilter",
                filterType: "path",
                selected: d
            };
            d || (c.filterType = "");
            return c = new jQuery.fn.jplist.app.dto.StatusDTO(a.name, a.action, a.type, c, a.inStorage, a.inAnimation, a.isAnimateToTop, a.inDeepLinking)
        },
        f = function(a) {
            a.$control.on("change", function() {
                a.history.addStatus(d(a, !1));
                a.observer.trigger(a.observer.events.unknownStatusesChanged, [!1])
            })
        },
        e = function(a) {
            a.params = {
                initialSelected: a.$control.get(0).checked || !1
            };
            f(a);
            return jQuery.extend(this, a)
        };
    e.prototype.getStatus = function(a) {
        return d(this, a)
    };
    e.prototype.getDeepLink = function() {
        var a = "",
            b;
        this.inDeepLinking && (b = d(this, !1), b.data && b.data.selected && (a = this.name + this.options.delimiter0 + "selected=true"));
        return a
    };
    e.prototype.getStatusByDeepLink = function(a, b) {
        var c = null;
        this.inDeepLinking && (c = d(this, !0), c.data && "selected" === a && (c.data.selected = !0));
        return c
    };
    e.prototype.getPaths = function(a) {
        var b;
        if (b = this.$control.attr("data-path")) b =
            new jQuery.fn.jplist.domain.dom.models.DataItemMemberPathModel(b, "text"), a.push(b)
    };
    e.prototype.setStatus = function(a, b) {
        this.$control.get(0).checked = a.data.selected || !1
    };
    e.prototype.setByDeepLink = function(a) {
        this.observer.trigger(this.observer.events.statusChanged, [d(this, !1)])
    };
    jQuery.fn.jplist.ui.controls.RadioButtonsFilter = function(a) {
        return new e(a)
    };
    jQuery.fn.jplist.controlTypes["radio-buttons-filters"] = {
        className: "RadioButtonsFilter",
        options: {}
    }
})();
(function() {
    var d = function(a, b) {
            var c, d = null;
            c = b ? "true" === a.$control.attr("data-selected") : a.params.selected;
            a.params.path && (c = c ? {
                path: a.params.path,
                type: "number",
                filterType: "range",
                min: 0,
                max: 0,
                prev: a.params.prev,
                next: a.params.next,
                selected: c
            } : {
                path: a.params.path,
                filterType: "",
                selected: c
            }, d = new jQuery.fn.jplist.app.dto.StatusDTO(a.name, a.action, a.type, c, a.inStorage, a.inAnimation, a.isAnimateToTop, a.inDeepLinking));
            return d
        },
        f = function(a) {
            a.$control.on("click", function() {
                a.params.selected = !a.params.selected;
                a.history.addStatus(d(a, !1));
                a.observer.trigger(a.observer.events.unknownStatusesChanged, [!1])
            })
        },
        e = function(a) {
            a.params = {
                path: a.$control.attr("data-path"),
                prev: Number(a.$control.attr("data-min")),
                next: Number(a.$control.attr("data-max")),
                selected: "true" === a.$control.attr("data-selected")
            };
            f(a);
            return jQuery.extend(this, a)
        };
    e.prototype.getStatus = function(a) {
        return d(this, a)
    };
    e.prototype.getDeepLink = function() {
        var a = "",
            b;
        this.inDeepLinking && (b = d(this, !1), b.data && b.data.selected && (a = this.name + this.options.delimiter0 +
            "selected=true"));
        return a
    };
    e.prototype.getStatusByDeepLink = function(a, b) {
        var c = null;
        this.inDeepLinking && (c = d(this, !1), c.data && "selected" === a && "true" === b && (c.data = {
            path: this.params.path,
            type: "number",
            filterType: "range",
            min: 0,
            max: 0,
            prev: this.params.prev,
            next: this.params.next,
            selected: !0
        }));
        return c
    };
    e.prototype.getPaths = function(a) {
        var b;
        this.params.path && (b = new jQuery.fn.jplist.domain.dom.models.DataItemMemberPathModel(this.params.path, "number"), a.push(b))
    };
    e.prototype.setStatus = function(a, b) {
        this.inStorage &&
            b && this.$control.data("storage-status", a);
        (this.params.selected = a.data.selected) ? this.$control.addClass("jplist-selected"): this.$control.removeClass("jplist-selected")
    };
    jQuery.fn.jplist.ui.controls.RangeSliderToggleFilter = function(a) {
        return new e(a)
    };
    jQuery.fn.jplist.controlTypes["range-filter"] = {
        className: "RangeSliderToggleFilter",
        options: {}
    }
})();
