define("common/model/lazy.module", ["angular", "./base", "./model.system.base.controller"], function (angular, commonModel, baseController) {
  function i(e) {
    return Object.prototype.toString.call(e) === "[object Boolean]"
  }

  function s(e, t, n) {
    return function (r) {
      var r = arguments[0], s = null;
      return i(r) && r === !0 ? (s = Array.prototype.slice.call(arguments, 1), t.apply(e, s), e) : (s = Array.prototype.slice.call(arguments, 0), n.apply(e, s), e)
    }
  }

  var r = null;
  var lazyModule = {
    init: function (e) {
      r = e;
      lazyModule.isInLazyMod = true;
    }, makeLazy: function (module) {

      var t = r;
      module.directive = s(module, module.directive, t.$compileProvider.directive);
      module.filter = s(module, module.filter, t.$filterProvider.register);
      module.controller = s(module, module.controller, t.$controllerProvider.register);
      module.provider = s(module, module.provider, t.$provide.provider);
      module.service = s(module, module.service, t.$provide.service);
      module.factory = s(module, module.factory, t.$provide.factory);
      module.value = s(module, module.value, t.$provide.value);
      module.constant = s(module, module.constant, t.$provide.constant);
      module.$$isInLazyMod = true;
      module.controller = baseController.wrapController(module);
      return module;
    }
  };
  commonModel.config(["$compileProvider", "$filterProvider", "$controllerProvider", "$provide", function ($compileProvider, $filterProvider, $controllerProvider, $provide) {
    lazyModule.init({$compileProvider: $compileProvider, $filterProvider: $filterProvider, $controllerProvider: $controllerProvider, $provide: $provide}, true)
  }]);
  return lazyModule
})
