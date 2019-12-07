function washSelector(selector) {
    if (selector.indexOf('#') === 0) {
        return selector.substring(1, selector.length)
    }
    if (selector.indexOf('.') === 0) {
        return selector.substring(1, selector.length)
    }
    return selector;
}

var $ = function(selector, parentSelector) {
    if (selector.indexOf('#') === 0) {
        return document.getElementById(selector.substring(1, selector.length))
    }
    if (selector.indexOf('.') === 0) {
        return document.getElementsByClassName(selector.substring(1, selector.length))
    }

    if (selector.indexOf(' ') > 0) {
        debugger
        var tmp = selector.split(' ');
        if (tmp.length > 2) {
            return $(tmp[0])
        }
        if (tmp[1].indexOf('#') == 0) {
            return $(tmp[0]).getElementById(washSelector(tmp[1]));
        }
        if (tmp[1].indexOf('.') == 0) {
            return $(tmp[0]).getElementsByClassName(washSelector(tmp[1]));
        }
        return $(tmp[0]).getElementsByTagName(washSelector(tmp[1]));
    }
    return document.getElementsByTagName(selector);
}
