/*!
 * AngularJS
 * Directives uibDaypickerDiy uibDatepickerDiyPopup
 * 重写  Bootstrap 日历控件 增加 “周” 控制按钮
 * zhanggj@powerlong.com - 于 2015-12-30 日翻译
 */
define("common/directives/uib.datepicker.diy", ["angular", "$directives","$url"], function (angular, $directives,$url) {

  $directives.directive('uibDaypickerDiy', function () {
    return {
      replace: true,
      templateUrl: function (element, attrs) {
        return attrs.templateUrl || $url.getTemplateUrl("scripts/common/views/datepicker.day.html");
      },
      require: ['^?uibDatepicker', 'uibDaypickerDiy', '^?datepicker'],
      controller: 'UibDaypickerDiyController',
      link: function (scope, element, attrs, ctrls) {
        var datepickerCtrl = ctrls[0] || ctrls[2],
          daypickerCtrl = ctrls[1];
        daypickerCtrl.init(datepickerCtrl);
        scope.$parent.$parent.$parent.$watch("_showWeeks", function (show) {
          scope.showWeeks = show;
        })
      }
    };
  });
  $directives.controller('UibDaypickerDiyController', ['$scope', '$element', 'dateFilter', function (scope, $element, dateFilter) {
    var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    this.step = {months: 1};
    this.element = $element;
    function getDaysInMonth(year, month) {
      return ((month === 1) && (year % 4 === 0) && ((year % 100 !== 0) || (year % 400 === 0))) ? 29 : DAYS_IN_MONTH[month];
    }

    this.init = function (ctrl) {
      angular.extend(ctrl, this);
      scope.showWeeks = ctrl.showWeeks;
      ctrl.refreshView();
    };

    this.getDates = function (startDate, n) {
      var dates = new Array(n), current = new Date(startDate), i = 0, date;
      while (i < n) {
        date = new Date(current);
        dates[i++] = date;
        current.setDate(current.getDate() + 1);
      }
      return dates;
    };

    this._refreshView = function () {
      var year = this.activeDate.getFullYear(),
        month = this.activeDate.getMonth(),
        firstDayOfMonth = new Date(this.activeDate);

      firstDayOfMonth.setFullYear(year, month, 1);

      var difference = this.startingDay - firstDayOfMonth.getDay(),
        numDisplayedFromPreviousMonth = (difference > 0) ? 7 - difference : -difference,
        firstDate = new Date(firstDayOfMonth);

      if (numDisplayedFromPreviousMonth > 0) {
        firstDate.setDate(-numDisplayedFromPreviousMonth + 1);
      }

      // 42 is the number of days on a six-month calendar
      var days = this.getDates(firstDate, 42);
      for (var i = 0; i < 42; i++) {
        days[i] = angular.extend(this.createDateObject(days[i], this.formatDay), {
          secondary: days[i].getMonth() !== month,
          uid: scope.uniqueId + '-' + i
        });
      }

      scope.labels = new Array(7);
      for (var j = 0; j < 7; j++) {
        scope.labels[j] = {
          abbr: dateFilter(days[j].date, this.formatDayHeader),
          full: dateFilter(days[j].date, 'EEEE')
        };
      }
      scope.title = dateFilter(this.activeDate, this.formatDayTitle);
      scope.rows = this.split(days, 7);
      scope.weekNumbers = [];
      var thursdayIndex = (4 + 7 - this.startingDay) % 7,
        numWeeks = scope.rows.length;
      for (var curWeek = 0; curWeek < numWeeks; curWeek++) {
        scope.weekNumbers.push(
          getISO8601WeekNumber(scope.rows[curWeek][thursdayIndex].date));
      }
    };

    this.compare = function (date1, date2) {
      return (new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()) - new Date(date2.getFullYear(), date2.getMonth(), date2.getDate()));
    };

    function getISO8601WeekNumber(date) {
      var checkDate = new Date(date);
      checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7)); // Thursday
      var time = checkDate.getTime();
      checkDate.setMonth(0); // Compare with Jan 1
      checkDate.setDate(1);
      return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
    }

    this.handleKeyDown = function (key, evt) {
      var date = this.activeDate.getDate();

      if (key === 'left') {
        date = date - 1;   // up
      } else if (key === 'up') {
        date = date - 7;   // down
      } else if (key === 'right') {
        date = date + 1;   // down
      } else if (key === 'down') {
        date = date + 7;
      } else if (key === 'pageup' || key === 'pagedown') {
        var month = this.activeDate.getMonth() + (key === 'pageup' ? -1 : 1);
        this.activeDate.setMonth(month, 1);
        date = Math.min(getDaysInMonth(this.activeDate.getFullYear(), this.activeDate.getMonth()), date);
      } else if (key === 'home') {
        date = 1;
      } else if (key === 'end') {
        date = getDaysInMonth(this.activeDate.getFullYear(), this.activeDate.getMonth());
      }
      this.activeDate.setDate(date);
    };
  }]);
  $directives.directive('uibDatepickerDiyPopup', function () {
    return {
      require: ['ngModel', 'uibDatepickerDiyPopup'],
      controller: 'UibDatepickerPopupController',
      scope: {
        isOpen: '=?',
        currentText: '@',
        clearText: '@',
        closeText: '@',
        dateDisabled: '&',
        customClass: '&'
      },
      link: function (scope, element, attrs, ctrls) {
        var ngModel = ctrls[0],
          ctrl = ctrls[1];
        ctrl.init(ngModel);
        scope.showWeeks = function () {
          scope._showWeeks = scope._showWeeks ? false : true;
        }
      }
    };
  })
})
