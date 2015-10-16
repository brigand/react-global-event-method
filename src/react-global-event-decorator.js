export default
function onGlobalEvent(eventName, targetElement=window, useCapture=false){
  var cleanupSymbol = 'onGlobalEvent-cleanup-' + Math.random().toString();
  return (target, key, descriptor) => {
    // cache these so they can be called later
    var originalDidMount = target.componentDidMount;
    var originalWillUnmount = target.componentWillUnmount;

    target.componentDidMount = function(){
      var handler = (...args) => this[key](...args);
      targetElement.addEventListener(eventName, handler, useCapture);
      this[cleanupSymbol] = () => targetElement.removeEventListener(eventName, handler, useCapture);
      originalDidMount && originalDidMount.apply(this, arguments);
    };

    target.componentWillUnmount = function(){
      this[cleanupSymbol]();
      originalWillUnmount && originalWillUnmount.apply(this, arguments);
    };
    return descriptor;
  };
}

