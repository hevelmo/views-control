/**
 * jPList - jQuery Data Grid Controls 0.0.7 - http://jplist.com
 * Copyright 2015 jPList Software
 */
(function() {
    var f = function(e) {
        return jQuery.extend(this, e)
    };
    f.prototype.getStatus = function(e) {
        e = new jQuery.fn.jplist.ui.controls.DefaultSortDTO(this.$control.attr("data-path"), this.$control.attr("data-type"), this.$control.attr("data-order"), this.$control.attr("data-datetime-format"), this.$control.attr("data-ignore"));
        return new jQuery.fn.jplist.app.dto.StatusDTO(this.name, this.action, this.type, e, this.inStorage, this.inAnimation, this.isAnimateToTop, this.inDeepLinking)
    };
    f.prototype.getPaths = function(e) {
        var f,
            h;
        f = this.$control.attr("data-path");
        h = this.$control.attr("data-type");
        f && (f = new jQuery.fn.jplist.domain.dom.models.DataItemMemberPathModel(f, h), e.push(f))
    };
    jQuery.fn.jplist.ui.controls.DefaultSort = function(e) {
        return new f(e)
    };
    jQuery.fn.jplist.controlTypes["default-sort"] = {
        className: "DefaultSort",
        options: {}
    }
})();
(function() {
    jQuery.fn.jplist.ui.controls.DefaultSortDTO = function(f, e, k, h, g) {
        return {
            path: f,
            type: e,
            order: k,
            dateTimeFormat: h,
            ignore: g
        }
    }
})();
(function() {
    var f = function(a) {
            var c = [];
            jQuery.each(a.get(0).attributes, function(a, d) {
                -1 !== d.name.indexOf("data-path-") && c.push(d.value)
            });
            return c
        },
        e = function(a, c) {
            var b;
            b = null;
            var d = "",
                e = "";
            c ? (b = a.$control.find('option[data-default="true"]').eq(0), 0 >= b.length && (b = a.$control.find("option").eq(0))) : b = a.$control.find("option:selected");
            d = a.$control.attr("data-datetime-format") || "";
            e = a.$control.attr("data-ignore") || "";
            d = new jQuery.fn.jplist.ui.controls.DropdownSortDTO(b.attr("data-path"), b.attr("data-type"),
                b.attr("data-order"), d, e);
            return b = new jQuery.fn.jplist.app.dto.StatusDTO(a.name, a.action, a.type, d, a.inStorage, a.inAnimation, a.isAnimateToTop, a.inDeepLinking, f(b))
        },
        k = function(a, c) {
            var b, d, e;
            a.$control.find("option").each(function() {
                b = jQuery(this).attr("data-path");
                d = jQuery(this).attr("data-type");
                b && (e = new jQuery.fn.jplist.domain.dom.models.DataItemMemberPathModel(b, d), c.push(e))
            })
        },
        h = function(a) {
            a.$control.on("change", function() {
                var c, b, d;
                c = e(a, !1);
                b = jQuery(this).find("option:selected");
                if (d = b.attr("data-path")) c.data.path =
                    d, c.data.type = b.attr("data-type"), c.data.order = b.attr("data-order"), c.data.additionalPaths = f(b);
                a.observer.trigger(a.observer.events.statusChanged, [c])
            })
        },
        g = function(a) {
            h(a);
            return jQuery.extend(this, a)
        };
    g.prototype.getStatus = function(a) {
        return e(this, a)
    };
    g.prototype.getDeepLink = function() {
        var a = "",
            c;
        this.inDeepLinking && (c = e(this, !1), c.data && c.data.path && c.data.type && c.data.order && (a = this.name + this.options.delimiter0 + "path" + this.options.delimiter2 + "type" + this.options.delimiter2 + "order=" + c.data.path +
            this.options.delimiter2 + c.data.type + this.options.delimiter2 + c.data.order));
        return a
    };
    g.prototype.getStatusByDeepLink = function(a, c) {
        var b = null,
            d;
        this.inDeepLinking && (b = e(this, !0), b.data && a === "path" + this.options.delimiter2 + "type" + this.options.delimiter2 + "order" && (d = c.split(this.options.delimiter2), 3 === d.length && (b.data.path = d[0], b.data.type = d[1], b.data.order = d[2])));
        return b
    };
    g.prototype.getPaths = function(a) {
        k(this, a)
    };
    g.prototype.setStatus = function(a, c) {
        var b;
        b = "default" == a.data.path ? this.$control.find('option[data-path="' +
            a.data.path + '"]') : this.$control.find('option[data-path="' + a.data.path + '"][data-type="' + a.data.type + '"][data-order="' + a.data.order + '"]');
        0 < b.length && (b.get(0).selected = !0)
    };
    jQuery.fn.jplist.ui.controls.SortSelect = function(a) {
        return new g(a)
    };
    jQuery.fn.jplist.controlTypes["sort-select"] = {
        className: "SortSelect",
        options: {}
    }
})();
(function() {
    var f = function(a) {
            var c = [];
            jQuery.each(a.get(0).attributes, function(a, d) {
                -1 !== d.name.indexOf("data-path-") && c.push(d.value)
            });
            return c
        },
        e = function(a, c) {
            var b = null,
                d, e;
            c ? (b = a.$control.find('li:has(span[data-default="true"])').eq(0), 0 >= b.length && (b = a.$control.find("li:eq(0)"))) : b = a.$control.find(".active");
            b = b.find("span");
            d = a.$control.attr("data-datetime-format") || "";
            e = a.$control.attr("data-ignore") || "";
            b = new jQuery.fn.jplist.ui.controls.DropdownSortDTO(b.attr("data-path"), b.attr("data-type"),
                b.attr("data-order"), d, e, f(b));
            return b = new jQuery.fn.jplist.app.dto.StatusDTO(a.name, a.action, a.type, b, a.inStorage, a.inAnimation, a.isAnimateToTop, a.inDeepLinking)
        },
        k = function(a, c) {
            a.$control.find("span").each(function() {
                var a, d;
                a = jQuery(this).attr("data-path");
                d = jQuery(this).attr("data-type");
                a && "" !== jQuery.trim(a) && (a = new jQuery.fn.jplist.domain.dom.models.DataItemMemberPathModel(a, d), c.push(a))
            })
        },
        h = function(a) {
            a.$control.find("li").off("click").on("click", function() {
                var c, b, d;
                c = e(a, !1);
                d = jQuery(this).find("span");
                if (b = d.attr("data-path")) c.data.path = b, c.data.type = d.attr("data-type"), c.data.order = d.attr("data-order"), c.data.additionalPaths = f(d);
                a.observer.trigger(a.observer.events.statusChanged, [c])
            })
        },
        g = function(a) {
            new jQuery.fn.jplist.ui.panel.DropdownControl(a.options, a.observer, a.history, a.$control);
            h(a);
            return jQuery.extend(this, a)
        };
    g.prototype.getStatus = function(a) {
        return e(this, a)
    };
    g.prototype.getDeepLink = function() {
        var a = "",
            c;
        this.inDeepLinking && (c = e(this, !1), c.data && c.data.path && c.data.type && c.data.order &&
            (a = this.name + this.options.delimiter0 + "path" + this.options.delimiter2 + "type" + this.options.delimiter2 + "order=" + c.data.path + this.options.delimiter2 + c.data.type + this.options.delimiter2 + c.data.order));
        return a
    };
    g.prototype.getStatusByDeepLink = function(a, c) {
        var b;
        a: {
            b = null;
            var d;
            if (this.inDeepLinking) {
                if ("number" !== a && a !== "path" + this.options.delimiter2 + "type" + this.options.delimiter2 + "order" && "path" !== a) {
                    b = null;
                    break a
                }
                b = e(this, !0);
                b.data && a === "path" + this.options.delimiter2 + "type" + this.options.delimiter2 +
                    "order" && (d = c.split(this.options.delimiter2), 3 === d.length && (b.data.path = d[0], b.data.type = d[1], b.data.order = d[2]))
            }
        }
        return b
    };
    g.prototype.getPaths = function(a) {
        k(this, a)
    };
    g.prototype.setStatus = function(a, c) {
        var b, d;
        d = this.$control.find("li");
        d.removeClass("active");
        b = "default" == a.data.path ? this.$control.find('li:has([data-path="default"])') : this.$control.find('li:has([data-path="' + a.data.path + '"][data-type="' + a.data.type + '"][data-order="' + a.data.order + '"])');
        0 >= b.length && (b = d.eq(0));
        b.addClass("active");
        this.$control.find(".jplist-dd-panel").text(b.eq(0).text())
    };
    jQuery.fn.jplist.ui.controls.SortDropdown = function(a) {
        return new g(a)
    };
    jQuery.fn.jplist.controlTypes["sort-drop-down"] = {
        className: "SortDropdown",
        options: {},
        dropdown: !0
    }
})();
(function() {
    jQuery.fn.jplist.ui.controls.DropdownSortDTO = function(f, e, k, h, g, a) {
        return {
            path: f,
            type: e,
            order: k,
            dateTimeFormat: h,
            ignore: g,
            additionalPaths: a
        }
    }
})();
