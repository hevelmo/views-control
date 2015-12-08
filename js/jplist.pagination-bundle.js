/**
 * jPList - jQuery Data Grid Controls 0.0.71 - http://jplist.com
 * Copyright 2015 jPList Software
 */
(function() {
    var f = function(f) {
        return jQuery.extend(this, f)
    };
    f.prototype.setStatus = function(f, d) {
        var b, a;
        b = f.data.paging;
        !b || 0 >= b.pagesNumber ? (this.$control.html(""), this.$control.addClass("jplist-empty")) : (this.$control.removeClass("jplist-empty"), a = this.$control.attr("data-type"), a = a.replace("{current}", b.currentPage + 1), a = a.replace("{pages}", b.pagesNumber), a = a.replace("{start}", b.start + 1), a = a.replace("{end}", b.end), a = a.replace("{all}", b.itemsNumber), this.$control.html(a))
    };
    jQuery.fn.jplist.ui.controls.PaginationInfo =
        function(g) {
            return new f(g)
        };
    jQuery.fn.jplist.controlTypes["pagination-info"] = {
        className: "PaginationInfo",
        options: {}
    }
})();
(function() {
    var f = function(b, a) {
            var e;
            e = null;
            var c;
            c = !1;
            e = b.$control.find("button[data-active]").eq(0);
            0 >= e.length && (e = b.$control.find("button").eq(0));
            e = a ? 0 : Number(e.attr("data-number")) || 0;
            (c = "true" === b.$control.attr("data-jump-to-start") || b.controlOptions.jumpToStart) && (c = b.history.getLastStatus()) && "pagination" !== c.type && "views" !== c.type && (e = 0);
            c = Number(b.$control.attr("data-items-per-page")) || 0;
            e = new jQuery.fn.jplist.ui.controls.PaginationDTO(e, c);
            return e = new jQuery.fn.jplist.app.dto.StatusDTO(b.name,
                b.action, b.type, e, b.inStorage, b.inAnimation, b.isAnimateToTop, b.inDeepLinking)
        },
        g = function(b) {
            b.$control.on("click", "button", function() {
                var a, e = null;
                a = jQuery(this);
                var c;
                a = Number(a.attr("data-number")) || 0;
                e = f(b, !1);
                e.data.currentPage = a;
                c = b.$root.find('[data-control-type="pagination"]');
                c.find("button").removeAttr("data-active");
                c.find('button[data-number="' + a + '"]').each(function() {
                    jQuery(this).attr("data-active", !0)
                });
                b.observer.trigger(b.observer.events.statusChanged, [e])
            })
        },
        d = function(b) {
            b.params = {
                view: new jQuery.fn.jplist.ui.controls.PaginationView(b.$control, b.controlOptions)
            };
            g(b);
            return jQuery.extend(this, b)
        };
    d.prototype.getStatus = function(b) {
        return f(this, b)
    };
    d.prototype.getDeepLink = function() {
        var b = "",
            a;
        this.inDeepLinking && (a = f(this, !1), a.data && (jQuery.isNumeric(a.data.currentPage) && (b = this.name + this.options.delimiter0 + "currentPage=" + a.data.currentPage), jQuery.isNumeric(a.data.number) && (b && (b += this.options.delimiter1), b += this.name + this.options.delimiter0 + "number=" + a.data.number)));
        return b
    };
    d.prototype.getStatusByDeepLink = function(b, a) {
        var e;
        a: if (e = null, this.inDeepLinking) {
            if ("currentPage" !== b) {
                e = null;
                break a
            }
            e = f(this, !0);
            e.data && "currentPage" === b && (e.data.currentPage = a)
        }
        return e
    };
    d.prototype.setStatus = function(b, a) {
        b.data && b.data.paging && this.params.view.build(b.data.paging)
    };
    jQuery.fn.jplist.ui.controls.Pagination = function(b) {
        return new d(b)
    };
    jQuery.fn.jplist.controlTypes.pagination = {
        className: "Pagination",
        options: {}
    }
})();
(function() {
    var f = function(d, b, a) {
            var e;
            e = '<div class="jplist-pagesbox" data-type="pagesbox">';
            for (var c = d; c < b; c++) e += '<button type="button" data-type="page" ', c === a && (e += ' class="jplist-current" data-active="true" '), d = c + 1, e += ' data-number="' + c + '" ', e += ">" + d + "</button> ";
            return e + "</div>"
        },
        g = function(d, b) {
            var a = {
                    $control: d,
                    options: b,
                    $pagingprev: null,
                    $pagingmid: null,
                    $pagingnext: null,
                    $jplistFirst: null,
                    $jplistPrev: null,
                    $jplistNext: null,
                    $jplistLast: null,
                    mode: d.attr("data-mode")
                },
                e, c, f, h;
            e = a.$control.attr("data-prev") ||
                a.options.prevArrow;
            c = a.$control.attr("data-next") || a.options.nextArrow;
            f = a.$control.attr("data-first") || a.options.firstArrow;
            h = a.$control.attr("data-last") || a.options.lastArrow;
            a.$control.html('<div class="jplist-pagingprev" data-type="pagingprev"></div><div class="jplist-pagingmid" data-type="pagingmid"></div><div class="jplist-pagingnext" data-type="pagingnext"></div>');
            a.$pagingprev = a.$control.find('[data-type="pagingprev"]');
            a.$pagingmid = a.$control.find('[data-type="pagingmid"]');
            a.$pagingnext =
                a.$control.find('[data-type="pagingnext"]');
            a.$pagingprev.html('<button type="button" class="jplist-first" data-number="0" data-type="first">' + f + '</button><button type="button" class="jplist-prev" data-type="prev">' + e + "</button>");
            a.$pagingnext.html('<button type="button" class="jplist-next" data-type="next">' + c + '</button><button type="button" class="jplist-last" data-type="last">' + h + "</button>");
            a.$jplistFirst = a.$pagingprev.find('[data-type="first"]');
            a.$jplistPrev = a.$pagingprev.find('[data-type="prev"]');
            a.$jplistNext = a.$pagingnext.find('[data-type="next"]');
            a.$jplistLast = a.$pagingnext.find('[data-type="last"]');
            return jQuery.extend(this, a)
        };
    g.prototype.build = function(d) {
        if (0 <= d.currentPage && d.currentPage < d.pagesNumber) {
            this.$control.removeClass("jplist-hidden");
            switch (this.mode) {
                case "google-like":
                    var b = "",
                        a;
                    a = Number(this.$control.attr("data-range")) || this.options.range;
                    b = d.currentPage - Math.floor((a - 1) / 2);
                    0 > b && (b = 0);
                    a = b + a;
                    a > d.pagesNumber && (a = d.pagesNumber);
                    b = f(b, a, d.currentPage);
                    this.$pagingmid.html(b);
                    break;
                default:
                    var e;
                    e = Number(this.$control.attr("data-range")) || this.options.range;
                    a = Math.floor(d.currentPage / e);
                    b = e * (a + 1);
                    b > d.pagesNumber && (b = d.pagesNumber);
                    b = f(e * a, b, d.currentPage);
                    this.$pagingmid.html(b)
            }
            this.$jplistPrev.attr("data-number", d.prevPage).removeClass("jplist-current");
            this.$jplistNext.attr("data-number", d.nextPage).removeClass("jplist-current");
            this.$jplistLast.attr("data-number", d.pagesNumber - 1).removeClass("jplist-current");
            1 >= d.pagesNumber ? this.$control.addClass("jplist-one-page") :
                this.$control.removeClass("jplist-one-page")
        } else this.$control.addClass("jplist-hidden");
        0 === d.currentPage ? this.$pagingprev.addClass("jplist-hidden") : this.$pagingprev.removeClass("jplist-hidden");
        d.currentPage == d.pagesNumber - 1 ? this.$pagingnext.addClass("jplist-hidden") : this.$pagingnext.removeClass("jplist-hidden")
    };
    jQuery.fn.jplist.ui.controls.PaginationView = function(d, b) {
        return new g(d, b)
    };
    jQuery.fn.jplist.controlTypes.pagination = {
        className: "Pagination",
        options: {
            range: 7,
            jumpToStart: !1,
            prevArrow: "&lsaquo;",
            nextArrow: "&rsaquo;",
            firstArrow: "&laquo;",
            lastArrow: "&raquo;"
        }
    }
})();
(function() {
    jQuery.fn.jplist.ui.controls.PaginationDTO = function(f, g) {
        var d = {
            currentPage: f,
            paging: null
        };
        g && (d.number = g);
        return d
    }
})();
(function() {
    var f = function(a, b) {
            var c = null;
            b ? (c = a.$control.find('li:has(span[data-default="true"])').eq(0), 0 >= c.length && (c = a.$control.find("li:eq(0)"))) : c = a.$control.find(".active");
            c = c.find("span");
            c = new jQuery.fn.jplist.ui.controls.DropdownPaginationDTO(c.attr("data-number"));
            return c = new jQuery.fn.jplist.app.dto.StatusDTO(a.name, a.action, a.type, c, a.inStorage, a.inAnimation, a.isAnimateToTop, a.inDeepLinking)
        },
        g = function(a, b) {
            var c, d, f;
            a.$control.find("span").each(function() {
                c = jQuery(this).attr("data-path");
                d = jQuery(this).attr("data-type");
                c && "" !== jQuery.trim(c) && (f = new jQuery.fn.jplist.domain.dom.models.DataItemMemberPathModel(c, d), b.push(f))
            })
        },
        d = function(a) {
            a.$control.find("li").off().on("click", function() {
                var b, c, d, g;
                b = f(a, !1);
                g = jQuery(this).find("span");
                c = g.attr("data-path");
                d = g.attr("data-number");
                c ? (b.data.path = c, b.data.type = g.attr("data-type"), b.data.order = g.attr("data-order")) : d && (b.data.number = d);
                a.observer.trigger(a.observer.events.statusChanged, [b])
            })
        },
        b = function(a) {
            new jQuery.fn.jplist.ui.panel.DropdownControl(a.options,
                a.observer, a.history, a.$control);
            d(a);
            return jQuery.extend(this, a)
        };
    b.prototype.getStatus = function(a) {
        return f(this, a)
    };
    b.prototype.getDeepLink = function() {
        var a = "",
            b;
        this.inDeepLinking && (b = f(this, !1), b.data && (jQuery.isNumeric(b.data.number) || "all" === b.data.number) && (a = this.name + this.options.delimiter0 + "number=" + b.data.number));
        return a
    };
    b.prototype.getStatusByDeepLink = function(a, b) {
        var c;
        a: if (c = null, this.inDeepLinking) {
            if ("number" !== a && a !== "path" + this.options.delimiter2 + "type" + this.options.delimiter2 +
                "order" && "path" !== a) {
                c = null;
                break a
            }
            c = f(this, !0);
            c.data && "number" === a && jQuery.isNumeric(c.data.number) && (c.data.number = b)
        }
        return c
    };
    b.prototype.getPaths = function(a) {
        g(this, a)
    };
    b.prototype.setStatus = function(a, b) {
        var c, d;
        d = this.$control.find("li");
        d.removeClass("active");
        c = this.$control.find('li:has([data-number="' + a.data.number + '"])');
        0 === c.length && (c = this.$control.find('li:has([data-number="all"])'));
        0 >= c.length && (c = d.eq(0));
        c.addClass("active");
        this.$control.find(".jplist-dd-panel").text(c.eq(0).text())
    };
    jQuery.fn.jplist.ui.controls.ItemsPerPageDropdown = function(a) {
        return new b(a)
    };
    jQuery.fn.jplist.controlTypes["items-per-page-drop-down"] = {
        className: "ItemsPerPageDropdown",
        options: {},
        dropdown: !0
    }
})();
(function() {
    var f = function(a, b) {
            var c;
            c = null;
            b ? (c = a.$control.find('option[data-default="true"]').eq(0), 0 >= c.length && (c = a.$control.find("option").eq(0))) : c = a.$control.find("option:selected");
            c = new jQuery.fn.jplist.ui.controls.DropdownPaginationDTO(c.attr("data-number"));
            return c = new jQuery.fn.jplist.app.dto.StatusDTO(a.name, a.action, a.type, c, a.inStorage, a.inAnimation, a.isAnimateToTop, a.inDeepLinking)
        },
        g = function(a, b) {
            var c, d, f;
            a.$control.find("option").each(function() {
                c = jQuery(this).attr("data-path");
                d = jQuery(this).attr("data-type");
                c && (f = new jQuery.fn.jplist.domain.dom.models.DataItemMemberPathModel(c, d), b.push(f))
            })
        },
        d = function(a) {
            a.$control.change(function() {
                var b, c, d;
                b = f(a, !1);
                c = jQuery(this).find("option:selected");
                d = c.attr("data-path");
                c = c.attr("data-number");
                d ? (b.data.path = d, b.data.type = jQuery(this).attr("data-type"), b.data.order = jQuery(this).attr("data-order")) : c && (b.data.number = c);
                a.observer.trigger(a.observer.events.statusChanged, [b])
            })
        },
        b = function(a) {
            d(a);
            return jQuery.extend(this, a)
        };
    b.prototype.getStatus = function(a) {
        return f(this, a)
    };
    b.prototype.getDeepLink = function() {
        var a = "",
            b;
        this.inDeepLinking && (b = f(this, !1), b.data && jQuery.isNumeric(b.data.number) && (a = this.name + this.options.delimiter0 + "number=" + b.data.number));
        return a
    };
    b.prototype.getStatusByDeepLink = function(a, b) {
        var c = null;
        this.inDeepLinking && (c = f(this, !0), c.data && "number" === a && jQuery.isNumeric(c.data.number) && (c.data.number = b));
        return c
    };
    b.prototype.getPaths = function(a) {
        g(this, a)
    };
    b.prototype.setStatus = function(a, b) {
        var c;
        c = this.$control.find('option[data-number="' + a.data.number + '"]');
        0 === c.length && (c = this.$control.find('option[data-number="all"]'));
        c.get(0).selected = !0
    };
    jQuery.fn.jplist.ui.controls.ItemsPerPageSelect = function(a) {
        return new b(a)
    };
    jQuery.fn.jplist.controlTypes["items-per-page-select"] = {
        className: "ItemsPerPageSelect",
        options: {}
    }
})();
(function() {
    jQuery.fn.jplist.ui.controls.DropdownPaginationDTO = function(f) {
        return {
            number: f
        }
    }
})();
