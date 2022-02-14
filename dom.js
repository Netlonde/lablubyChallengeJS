((window, document) => {

    function DOM(elements){
        this.elements = document.querySelectorAll(elements);
    }

    DOM.prototype.on = function(event, callback){
        (this.elements).forEach((element) => {
            element.addEventListener(event, callback);
        })
    }

    DOM.prototype.off = function(event, callback){
        this.elements.forEach((element) => {
            element.removeEventListener(event, callback);
        })
    }

    DOM.prototype.get = function(index){
        if(!index) return this.elements[0];
        return this.elements[index];
    }

    DOM.prototype.forEach = function(){
        return Array.prototype.forEach.apply(this.elements, arguments)
    };

    DOM.prototype.map = function(){
        return Array.prototype.map.apply(this.elements, arguments);
    };

    DOM.prototype.filter = function(){
        return Array.prototype.filter.apply(this.elements, arguments);
    };

    DOM.prototype.reduce = function(){
        return Array.prototype.reduce.apply(this.elements, arguments);
    };

    DOM.prototype.reduceRight = function(){
        return Array.prototype.reduceRight.apply(this.elements, arguments);
    };

    DOM.prototype.every = function(){
        return Array.prototype.every.apply(this.elements, arguments);
    };

    DOM.prototype.some = function(){
        return Array.prototype.some.apply(this.elements, arguments);
    };

    DOM.isArray = function (arg){
        return (Object.prototype.toString.call(arg)) === '[object Array]' ;
    }

    DOM.isObject = function (arg){
        return (Object.prototype.toString.call(arg)) === '[object Object]' ;
    }

    DOM.isFunction = function (arg){
        return (Object.prototype.toString.call(arg)) === '[object Function]' ;
    }

    DOM.isNumber = function (arg){
        return (Object.prototype.toString.call(arg)) === '[object Number]' ;
    }

    DOM.isString = function (arg){
        return (Object.prototype.toString.call(arg)) === '[object String]' ;
    }

    DOM.isBoolean = function (arg){
        return (Object.prototype.toString.call(arg)) === '[object Boolean]' ;
    }

    DOM.isNull = function (arg){
        const type = (Object.prototype.toString.call(arg));
        return ((type) === '[object Undefined]' || type === '[object Null]') ;
    }

    window.DOM = DOM;

})(window, document);