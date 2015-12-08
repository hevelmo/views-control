/**
 * jPList - jQuery Data Grid Controls 0.0.4 - http://jplist.com
 * Copyright 2015 jPList Software
 */
(function() {
    var d = function(a) {
            !a.history.statusesQueue || 0 >= a.history.statusesQueue.length ? a.$control.addClass("jplist-disabled") : a.$control.removeClass("jplist-disabled")
        },
        e = function(a) {
            a.observer.on(a.observer.events.unknownStatusesChanged, function() {
                d(a)
            });
            a.observer.on(a.observer.events.knownStatusesChanged, function() {
                d(a)
            });
            a.$control.on("click", function() {
                var b, c, f;
                a.history.popStatus();
                a.history.popList();
                b = a.history.getLastStatus();
                if (f = a.history.getLastList() || [], b) {
                    for (var g = 0; g < f.length; g++)
                        if (c =
                            f[g], c.name === b.name && c.action === b.action) {
                            if (c.data)
                                for (var e in c.data) jQuery.isArray(c.data[e]) && (c.data[e] = []);
                            jQuery.extend(!0, c, b);
                            f[g] = c
                        }
                    a.observer.trigger(a.observer.events.knownStatusesChanged, [f])
                } else a.observer.trigger(a.observer.events.unknownStatusesChanged, [!0]);
                d(a)
            })
        },
        b = function(a) {
            d(a);
            e(a);
            return jQuery.extend(this, a)
        };
    jQuery.fn.jplist.ui.controls.BackButton = function(a) {
        return new b(a)
    };
    jQuery.fn.jplist.controlTypes["back-button"] = {
        className: "BackButton",
        options: {}
    }
})();
(function() {
    var d = function(b) {
            b.$control.on("click", function() {
                b.observer.trigger(b.observer.events.unknownStatusesChanged, [!0])
            })
        },
        e = function(b) {
            d(b);
            return jQuery.extend(this, b)
        };
    jQuery.fn.jplist.ui.controls.Reset = function(b) {
        return new e(b)
    };
    jQuery.fn.jplist.controlTypes.reset = {
        className: "Reset",
        options: {}
    }
})();
