/**
 * jPList - jQuery Data Grid Controls 0.0.6 - http://jplist.com
 * Copyright 2015 jPList Software
 */
(function() {
    jQuery.fn.jplist.ui.controls.TextboxDTO = function(d, f, b, a) {
        return {
            path: d,
            ignore: b,
            value: f,
            mode: a,
            filterType: "TextFilter"
        }
    }
})();
(function() {
    var d = function(a, c) {
            var e, b;
            e = a.$control.attr("data-path");
            b = c ? a.$control.attr("value") || "" : a.$control.val();
            e = new jQuery.fn.jplist.ui.controls.TextboxDTO(e, b, a.params.ignore, a.params.mode);
            return new jQuery.fn.jplist.app.dto.StatusDTO(a.name, a.action, a.type, e, a.inStorage, a.inAnimation, a.isAnimateToTop, a.inDeepLinking)
        },
        f = function(a) {
            if (a.params.$button && 0 < a.params.$button.length) a.params.$button.on("click", function(c) {
                c.preventDefault();
                a.history.addStatus(d(a, !1));
                a.observer.trigger(a.observer.events.unknownStatusesChanged, [!1]);
                return !1
            });
            else a.$control.on(a.params.eventName, function() {
                a.history.addStatus(d(a, !1));
                a.observer.trigger(a.observer.events.unknownStatusesChanged, [!1])
            })
        },
        b = function(a) {
            a.params = {
                path: a.$control.attr("data-path"),
                dataButton: a.$control.attr("data-button"),
                mode: a.$control.attr("data-mode") || "contains",
                ignore: a.$control.attr("data-ignore") || "[~!@#$%^&*()+=`'\"/\\_]+",
                eventName: a.$control.attr("data-event-name") || "keyup",
                $button: null
            };
            a.$control.val(a.$control.attr("value") || "");
            a.params.dataButton &&
                (a.params.$button = jQuery(a.params.dataButton));
            f(a);
            return jQuery.extend(this, a)
        };
    b.prototype.getStatus = function(a) {
        return d(this, a)
    };
    b.prototype.getDeepLink = function() {
        var a = "",
            c;
        this.inDeepLinking && (c = d(this, !1), c.data && "" !== jQuery.trim(c.data.value) && (a = this.name + this.options.delimiter0 + "value=" + c.data.value));
        return a
    };
    b.prototype.getStatusByDeepLink = function(a, c) {
        var b = null;
        this.inDeepLinking && (b = d(this, !0), b.data && "value" === a && (b.data.value = c));
        return b
    };
    b.prototype.getPaths = function(a) {
        var b;
        b = new jQuery.fn.jplist.domain.dom.models.DataItemMemberPathModel(this.params.path, null);
        a.push(b)
    };
    b.prototype.setStatus = function(a, b) {
        a.data && (a.data.value || (a.data.value = ""), this.$control.val(a.data.value))
    };
    jQuery.fn.jplist.ui.controls.Textbox = function(a) {
        return new b(a)
    };
    jQuery.fn.jplist.controlTypes.textbox = {
        className: "Textbox",
        options: {}
    }
})();
