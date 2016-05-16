define("common/directives/unread.count", ["angular", "$directives"], function (angular, $directives) {
  function r(e) {
    var t = this;
    this.$parent.$constructor.call(this, e);
    t.unreadCount = 0
  }

  function i(e, t, n) {
    function r(e, t, n) {
      e.$watch("$root.totalUnreadCount", function (t) {
        e.vm.unreadCount = t
      })
    }

    return {
      scope: {item: "=", activeCondition: "@"},
      controller: "unreadNumberController as vm",
      template: '<span item="item" ng-if="vm.unreadCount>0" class="total-unread-count" >{{vm.unreadCount}}</span>',
      link: r
    }
  }

  $directives.directive("unreadCount", i);
  $directives.controller("unreadNumberController", r, "$$baseController");
  r.$inject = ["$scope"];
  i.$inject = ["$state", "$stateParams", "$rootScope"]
})
