!(function(factory) {
    if (typeof exports === 'object' && typeof module !== 'undefined') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        window.q = factory();
    }
})(function() {
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    }

    var qoo = function(s) {
        if (typeof s === "string") {
            this.el = Array.prototype.slice.call(document.querySelectorAll(s));
        }
        if (typeof s === "object") {
            this.el = [s];
        }
        if (typeof s === "function") {
            if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
                s();
            } else {
                document.addEventListener('DOMContentLoaded', s);
            }
        }
    };

    qoo.prototype = {
        n: function(n) {
            if (n < 0) {
                n = this.el.length + n;
            }
            this.el = [this.el[n]];
            return this;
        },

        first: function(){
            return this.n(0);
        },

        last: function(){
            return this.n(-1);
        },

        each: function(fn) {
            [].forEach.call(this.el, fn);
            return this;
        },

        css: function(v) {
            return this.each(function(i) {
                i.style.cssText = i.style.cssText + v;
            });
        },

        cssdom: function(v) {
            return this.each(function(i) {
                for (var key in v) {
                    i.style[key] = v[key];
                }
            });
        },

        attr: function(attr, val) {
            if (val == null) {
                return this.el[0].getAttribute(attr);
            } else return this.each(function(i) {
                i.setAttribute(attr, val);
            });
        },

        removeAttr: function(attr) {
            return this.each(function(i) {
                i.removeAttribute(attr);
            });
        },

        on: function(type, fn) {
            return this.each(function(i) {
                i.addEventListener(type, fn, false);
            });
        },

        trigger: function(eventType, data) {
            var event;
            if (window.CustomEvent && typeof window.CustomEvent === 'function') {
                 event = new CustomEvent(eventType, {detail: data});
            } else {
                event = document.createEvent('CustomEvent');
                event.initCustomEvent(eventType, true, true, data);
            }
            return this.each(function(el) {
                el.dispatchEvent(event);
            });
        },

        addClass: function(v) {
            var a = v.split(' ');
            return this.each(function(i) {
                for (var x = 0; x < a.length; x++) {
                    if (i.classList) {
                        i.classList.add(a[x]);
                    } else {
                        i.className += ' ' + a[x];
                    }
                }
            });
        },

        toggleClass: function(v) {
            var a = v.split(' ');
            return this.each(function(i) {
                for (var x = 0; x < a.length; x++) {
                    if (i.classList) {
                        i.classList.toggle(a[x]);
                    } else {
                        if (new RegExp('\\b' + a[x] + '\\b').test(i.className)) {
                            i.className = i.className.replace(new RegExp('\\b' + a[x] + '\\b', 'g'), '');
                        } else {
                            i.className += ' ' + a[x];
                        }
                    }
                }
            });
        },

        removeClass: function(v) {
            var a = v.split(' ');
            return this.each(function(i) {
                for (var x = 0; x < a.length; x++) {
                    if (i.classList) {
                        i.classList.remove(a[x]);
                    } else {
                        i.className = i.className.replace(new RegExp('\\b' + a[x] + '\\b', 'g'), '');
                    }
                }
            });
        },

        html: function(v) {
            return (typeof v == 'undefined') ? this.el[0].innerHTML : this.each(function(i) {
                i.innerHTML = v;
            });
        },

        text: function(v) {
            return (typeof v == 'undefined') ? this.el[0].innerText || this.el[0].textContent : this.each(function(i) {
                i.innerText = v;
                i.textContent = v;
            });
        },

        insertBefore: function(v) {
            return this.each(function(i) {
                i.insertAdjacentHTML("beforeBegin", v);
            });
        },

        insertAfter: function(v) {
            return this.each(function(i) {
                i.insertAdjacentHTML("afterEnd", v);
            });
        },

        insertFirst: function(v) {
            return this.each(function(i) {
                i.insertAdjacentHTML("afterBegin", v);
            });
        },

        insertLast: function(v) {
            return this.each(function(i) {
                i.insertAdjacentHTML("beforeEnd", v);
            });
        },

        empty: function() {
            return this.each(function(i) {
                i.innerHTML = "";
            });
        },

        parent: function() {
            return q(this.el[0].parentNode);
        },

        siblings: function() {
            var thisElem = this.el[0];
            this.el = Array.prototype.filter.call(this.el[0].parentNode.children, function(child) {
                return child !== thisElem;
            });
            return this;
        },

        children: function(selector) {
            var children = [];
            this.each(function(i) {
                var thisChildren = Array.prototype.slice.call(i.children);

                for (var j = 0; j < thisChildren.length; j++) {
                    var child = thisChildren[j];
                    if (children.indexOf(child) === -1 && (!selector || child.matches(selector))) {
                        children.push(child);
                    }
                }
            });
            this.el = children;
            return this;
        },

        find: function(selector) {
            var found = [];
            this.each(function(i) {
                var foundInThis = Array.prototype.slice.call(i.querySelectorAll(selector));
                for (var j = 0; j < foundInThis.length; j++) {
                    if (found.indexOf(foundInThis[j]) === -1) {
                        found.push(foundInThis[j]);
                    }
                }
            });
            this.el = found;
            return this;
        },

        closest: function(selector) {
            var el = this.el[0];
            this.el = [];
            do {
                if (el.matches(selector)) {
                    this.el = [el];
                    break;
                }
                el = el.parentElement || el.parentNode;
            } while (el !== null && el.nodeType === 1);
            return this;
        },

        remove: function() {
            this.each(function(i) {
                i.parentNode.removeChild(i);
            });
        },

        is: function(selector){
            return this.el[0].matches(selector);
        },

        offset: function() {
            return this.each(function(i) {
                offset = i.getBoundingClientRect();
            });
        },

        data: function(attr, val) {
            if (val) {
                return this.each(function(i) {
                    i.dataset[attr] = val;
                });

            } else {
                var elem = this.el[0];
                var data = elem.dataset[attr];

                if (data === "true") {
                    return true;
                }

                if (data === "false") {
                    return false;
                }

                if (data === "null") {
                    return null;
                }

                // Only convert to a number if it doesn't change the string
                if (data === +data + "") {
                    return +data;
                }

                if (/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/.test(data)) {
                    return JSON.parse(data);
                }

                return data;
            }
        }
    };

    var utils = function(selector) {
        return new qoo(selector);
    };

    utils.isMobile = function() {
        return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };

    utils.extend = function() {
        // Variables
        var extended = {};
        var deep = false;
        var i = 0;
        var length = arguments.length;

        // Check if a deep merge
        if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
            deep = arguments[0];
            i++;
        }

        // Merge the object into the extended object
        var merge = function(obj) {
            for (var prop in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                    // If deep merge and property is an object, merge properties
                    if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
                        extended[prop] = utils.extend(true, extended[prop], obj[prop]);
                    } else {
                        extended[prop] = obj[prop];
                    }
                }
            }
        };

        // Loop through each object and conduct a merge
        for (; i < length; i++) {
            var obj = arguments[i];
            merge(obj);
        }

        return extended;
    };

    utils.throttle = function(event, func, delay) {
        delay = delay || 500;
        var scrollTimer;
        document.addEventListener(event, function() {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(function() {
                func.call(this);
            }, delay);
        });
    };

    utils.debounce = function(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    return utils;
});