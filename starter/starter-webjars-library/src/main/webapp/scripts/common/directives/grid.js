define("common/directives/grid",
    [
        "angular",
        "$directives",
        "./pager",
        "./search.bar",
        "./table.search",
        "./table.fixed",
        "./loading",
        "./nodata",
        "./truncate.text"
    ], function (angular, $directives) {

        function search(config) {
            return config.searchSupport ? '<div ' + (config.preSelectionSearch ? ' pre-selection="{{searchParams}}" ' : "") + ' search-bar conditions="searchItems" action="searchAction(data)"' +
            ' toolbars="searchToolbars"></div>' : "";
        }

        function table(columns, config) {
            return '<table class="table table-hover">' + head(columns, config) + body(columns, config) + pager(columns, config) + "</table>"
        }

        function checkbox(isHeader) {
            var namespace = isHeader ? "th" : "td";
            return "<" + namespace + ' width="10"><input type="checkbox" data-ng-model="tableState.selectAll" ng-change="changeSelectionAll()"/></' + namespace + ">"
        }

        function pager(columns, config) {// e, t
            var n = "";
            if (config.checkboxSupport) {
                n = checkbox(false)
            }
            var r = columns.length;


            var u = '<div data-ng-if="config.paginationSupport && showNoDataMessage != true && !loadingState"><div class="pull-right" pager2 config="paginationInfo" ' +
                    'on-select-page="pageChanged(page)"></div></div>',
                a = config.batchOperationBarDirective || "",
                f = '<div class="pull-left">' + a + "</div>",
                l = '<td colspan=" ' + r + '" >' + f + u + "</td>",
                c = "";
            if (config.tfootPositionFixed) {
                c = " table-fixed "
            }
            if (a != "" || config.paginationSupport) {
                return "<tfoot " + c + ' ng-if="!showNoDataMessage&&!loadingState"><tr>' + n + l + "</tr></tfoot>"
            } else {
                return "";
            }
        }

        function head(columns, config) {// e, n
            var r = "";
            if (config.checkboxSupport) {
                r = checkbox(true)
            }
            angular.forEach(columns, function (column) {// e
                var t = column.cssProperty ? ' class="' + column.cssProperty + '" ' : "",
                    i = column.filterOptionKey,
                    s = "",
                    o = "",
                    u = "";
                if (config.preSelectionFilter) {
                    o = ' pre-selected-id="filterParams.' + i + '"';
                }
                if (i) {
                    s = " console-table-search " + o + ' select-item="filterItemMap.' + i + '"   filter-field="' + i + '" items="filterItems.' + i + '" click-action="changeThreadFilter(data)" '
                } else {
                    if (config.clientSort && column.field && column.disableSort != false) {
                        u = '<span class="icon-updown btn-link" data-ng-click="clientSortHandler(\'' + column.field + "', sortReverse)\"></span>";
                    }
                    if (config.serverSort && column.field && column.serverSortEnabled == true) {
                        u = '<span class="icon-updown btn-link" data-ng-click="serverSortHandler(\'' + column.field + "', sortReverse)\"></span>"
                    }
                }
                r += "<th" + t + s + ">" + column.name + u + "</th>"
            })
            return "<thead><tr>" + r + "</tr></thead>"
        }

        function body(columns, config) {
            var $html = "", useBindOnce = config.useBindOnce ? "bindonce" : "", rowItemName = config.rowItemName ? config.rowItemName : "item", itemList = config.itemList || "store";
            if (config.checkboxSupport) {
                config.selectedScopeProperty = config.selectedScopeProperty || "selectedItems";
                var model = rowItemName + "." + config.selectedProperty, checkboxDisabledProperty = config.checkboxDisabledProperty, disabledTag = "";
                if (checkboxDisabledProperty) {
                    disabledTag = ' data-ng-disabled="' + rowItemName + "." + checkboxDisabledProperty + '" ';
                }
                $html = '<td width="10"><input type="checkbox" ' + disabledTag + ' data-ng-model="' + model + '" ng-change="changeSelection({data: ' + config.result + '})"/></td>';
            }
            angular.forEach(columns, function (column) {
                $html += "<td" + (column.cssProperty ? ' class="' + column.cssProperty + '" ' : "") + ">" + text(column, rowItemName, useBindOnce) + "</td>";
            })
            return '<tbody><tr data-ng-if="!loadingState" ' + useBindOnce + " data-ng-repeat='" + rowItemName + " in " + itemList + "'>" + $html + "</tr></tbody>";
        }

        function text(column, itemTag, useBindOnce) {
            var $html = "",
                filter = column.filter,
                field = column.field,
                o = itemTag + "." + field,
                filedDirective = column.filedDirective || column.fieldDirective;
            if (filedDirective) {
                return filedDirective;
            }
            if (field) {
                if (filter) {
                    o += "|" + filter;
                }
                if (column.truncateText) {
                    var a = column.truncateTextLegnth || column.truncateTextLength,
                        f = a ? " text-length=" + a : "",
                        l = column.copyText ? " copy-text=" + column.copyText : "",
                        c = column.tooltipPlacement ? " tooltip-placement=" + column.tooltipPlacement : "";
                    $html = '<span truncate-text source-text="{{' + o + '}}" ' + f + l + c + "></span>"
                } else if (column.bindable == 1 || useBindOnce == 0) {
                    if (column.htmlField) {
                        $html = "<span ng-bind-html=" + o + " ></span>"
                    } else {
                        $html = "{{" + o + "}}";
                    }
                } else {
                    var h = column.htmlField ? "bo-html" : "bo-text";
                    $html = "<span " + h + '="' + o + '"></span>'
                }
            }
            return $html
        }

        function ajaxParams($params) {
            var params = {};
            angular.extend(params, $params.pageInfo);
            angular.extend(params, $params.filterParams);
            angular.extend(params, $params.searchItems.values);
            return params
        }


        /**
         * Grid 默认配置
         */
        var $config = {
            filterItems: {classId: []},
            useBindOnce: true,
            paginationSupport: true,
            checkboxSupport: true,
            searchSupport: true,
            tfootPositionFixed: true,
            noDataDirective: "nodata",
            selectedScopeProperty: "selectedItems",
            batchOperationBarDirective: '',
            pager: {tipHide: false, size: 20, page: 1, total: 1000, maxSize: 5},
            searchConditions: [],
            noDataMessageDirective: false,
            columns: [],
            store: [],
            selectionChange: angular.noop,
            noDataMessage: "没有查询到符合条件的记录",
            loadingState: true,
            init: false
        };
        $directives.directive("grid", ["$rootScope", "$compile", "$filter", "$timeout", "$url", function ($rootScope, $compile, $fileter, $timeout, $url) {
            return {
                restrict: "A",
                scope: {
                    columns: "=",
                    store: "=",
                    config: "=",
                    paginationInfo: "=",
                    loadingState: "=",
                    renderTable: "&",
                    searchPreHandler: "&",
                    selectionChange: "&"
                },
                templateUrl: $url.getTemplateUrl("scripts/common/views/grid.html"),
                controller: ["$scope", function ($scope) {
                    $scope.initTableRequestSend = false;
                    $scope._searchPreHandler = function (data, isTableFilter) {
                        if (angular.isFunction($scope.searchPreHandler)) {
                            $scope.searchPreHandler({
                                data: {
                                    data: data,
                                    scope: $scope,
                                    isTableFilter: isTableFilter
                                }
                            })
                        }
                    };
                    $scope.changeSelectionAll = function () {
                        var config = $scope.config, selectedProperty = config.selectedProperty,
                            checkboxDisabledProperty = config.checkboxDisabledProperty,
                            selectAll = $scope.tableState.selectAll,
                            results = [];
                        angular.forEach($scope.store, function (item) {
                            if (!checkboxDisabledProperty || !item[selectedProperty]) {
                                item[selectedProperty] = selectAll;
                            }
                            if (selectAll) {
                                results.push(item);
                            }
                        });
                        $scope.selectionChangeHandler(results)
                    };
                    $scope.clientSortHandler = function (field) {
                        $scope.reserves = !$scope.reserves;
                        var $column;
                        angular.forEach(e.columns, function (column) {
                            if (column && column.field && column.field == field) {
                                $column = column
                            }
                        });
                        if ($column && angular.isFunction($column.sortFunction)) {
                            $column.sortFunction.call(null, $scope.store, field, $scope.reserves);
                        } else {
                            var s = $fileter("orderBy");
                            $scope.store = s($scope.store, field, $scope.reserves)
                        }
                    }
                    $scope.serverSortHandler = function (field) {
                        var $column;
                        angular.forEach($scope.columns, function (column) {
                            if (column && column.field && column.field == field) {
                                $column = column
                            }
                        });
                        if ($column) {
                            $column.asc = !$column.asc
                        }
                        $scope.updateList(false, {sortField: field, isAsc: $column.asc})
                    }
                    $scope.changeSelection = function (item) {
                        var selectedProperty = $scope.config.selectedProperty;
                        item[selectedProperty] = !item[selectedProperty];
                        var isFirstChecked, isCheckAll = true, results = [];
                        angular.forEach($scope.store, function (item, index) {
                            var selected = item[selectedProperty];
                            if (index == 0) {
                                isFirstChecked = selected;
                            }
                            if (isFirstChecked != selected) {
                                isCheckAll = false;
                            }
                            if (selected) {
                                results.push(item)
                            }
                        });
                        if (isCheckAll == true) {
                            $scope.tableState.selectAll = isFirstChecked
                        } else {
                            $scope.tableState.selectAll = false;
                        }
                        $scope.selectionChangeHandler(results);
                    }
                    $scope.selectionChangeHandler = function (results) {
                        $scope[$scope.config.selectedScopeProperty] = results;
                        // $scope.config.selectedItems = results;
                        $scope.selectionChange({data: results});
                    }
                    $scope.refresh = function () {
                        $scope[$scope.config.selectedScopeProperty] = [];
                        $scope.initSearchAndFilterCondition();
                        $scope.updateList()
                    }
                    $scope.initSearchAndFilterCondition = function () {
                        $scope.clearFilterCondition();
                        $scope.searchParams = {}
                    }
                    $scope.clearFilterCondition = function () {
                        $scope.filterItemMap = {};
                        $scope.filterParams = {}
                    }
                }],
                link: function ($scope, $element, $attr) {
                    $scope.tableState = {selectAll: false};
                    $scope.initSearchAndFilterCondition();
                    $scope.changeThreadFilter = function (e) {
                        $scope._searchPreHandler(e, true);
                        var t = e.filterField;
                        r = e.item;
                        $scope.filterItemMap[t] = r;
                        var i = $scope.filterParams || {};
                        t && (r.id == "all" ? delete i[t] : i[t] = r.id);
                        $scope.filterParams = i;
                        $scope.paginationInfo.page = 1;
                        $scope.searchParams = {};
                        $scope.updateList();
                    };
                    $scope.pageChanged = function (page) {
                        $scope.paginationInfo.page = page, $scope.selectionChangeHandler([]);
                        if ($scope.config.serverSort && $scope.config.sortSetting) {
                            $scope.updateList(false, $scope.config.sortSetting, "pageChanged")
                        } else {
                            $scope.updateList(undefined, undefined, "pageChanged")
                        }
                    };
                    $scope.searchAction = function (params) {
                        $scope._searchPreHandler(params, false);
                        if ($scope.config.paginationSupport && $scope.paginationInfo) {
                            $scope.paginationInfo.page = 1;
                        }
                        $scope.clearFilterCondition();
                        $scope.searchParams = params;
                        $scope.updateList(undefined, undefined, "search");
                    };
                    $scope.updateList = function (init, sortSetting, actionType) {
                        var config = $scope.config, paginationInfo = $scope.paginationInfo, params = {};
                        if (init) {
                            $scope.initTableRequestSend = true
                        }
                        if ($scope.paginationSupport) {
                            if (undefined == paginationInfo) {
                                $scope.paginationInfo = config.paginationInfo;
                            }
                            params.pageInfo = {
                                size: $scope.paginationInfo.size,
                                page: $scope.paginationInfo.page - 1
                            };
                        }
                        if (config.filterParams) {
                            params.filterParams = config.filterParams;
                        }
                        if (config.searchItems) {
                            params.searchItems = config.searchItems;
                        }
                        if (sortSetting) {
                            config.sortSetting = sortSetting;
                        }
                        $scope.ajaxOptions = ajaxParams(params);
                        $scope.renderTable({
                            data: {
                                params: ajaxParams(params),
                                isInitTableRequest: init,
                                sortSetting: sortSetting,
                                actionType: actionType,
                                orginalParams: params
                            }
                        })
                    };
                    $scope.updateSelectionExternal = function (e) {
                        $scope.selectionChangeHandler(e)
                    };
                    $scope.$watchCollection("[config, columns]", function (values) {
                        if (values && values[0]) {
                            var config = values[0];
                            if (config.filterItems) {
                                $scope.filterItems = config.filterItems
                            }
                            if (config.searchItems) {
                                $scope.searchItems = config.searchItems;
                            }
                            if (config.searchToolbars) {
                                $scope.searchToolbars = config.searchToolbars;
                            }
                            if (config.preSelectionFilter) {
                                $scope.filterParams = config.preSelectionFilter
                            }
                            if (config.preSelectionSearch) {
                                $scope.searchParams = config.preSelectionSearch
                            }
                            if (config.checkboxSupport && config.selectedProperty == undefined) {
                                config.selectedProperty = "selected"
                            }
                            if (config.clientSort == 1 && config.serverSort == 1) {
                                config.serverSort = false;
                            }
                            config.refresh = $scope.refresh;
                            if (angular.isFunction(config.updateSelectionExternal)) {
                                config.updateSelectionExternal = $scope.updateSelectionExternal;
                            }
                            var columns = values[1], $html;
                            if (config.noDataMessageDirective) {
                                $html = '<div class="simple-grid-none-data text-center" ' + config.noneDataInfoDirective + ' ajax-options="ajaxOptions"  data-ng-if="showNoDataMessage &&' +
                                    ' !loadingState" ></div>';
                            } else {
                                $html = '<div class="simple-grid-none-data"  nodata data-ng-if="showNoDataMessage && !loadingState"><span class="margin-left"' +
                                    ' ng-bind-html="noDataMessage"></span></div>';
                            }
                            $html = angular.element($html);
                            $element.find(".simple-grid-none-data-wrap").html($html);
                            $scope.noDataMessage = "没有查询到符合条件的记录";
                            $scope.paginationSupport = config.paginationSupport;
                            search(config, $element);
                            $element.addClass("common-grid")
                            $element.find(".searchSection").html(search(config));
                            $element.find(".gridSection").html(table(columns, config));
                            $compile($element.contents())($scope);
                            if (!$scope.config.initTableRequestSend) {
                                $scope.updateList(true);
                            }
                        }
                    });
                    //$scope.$watchCollection("config", compileLink);
                    /* $scope.$watchCollection("config.columns", compileLink);
                     $scope.$watchCollection("config.results", function (results) {
                     if (!results || results.length == 0) {
                     $scope.showNoDataMessage = true;
                     } else {
                     $scope.showNoDataMessage = false;
                     }
                     $scope.tableState.selectAll = false;
                     });*/
                    $scope.$watchCollection("[store,paginationInfo]", function (values) {
                        if (values) {
                            var store = values[0] || [];
                            $scope.showNoDataMessage = store.length == 0 ? true : false;
                            $scope.tableState.selectAll = false;
                            $scope[$scope.config.selectedScopeProperty] = [];
                            var paginationInfo = values[1];
                            //alert(store)
                            //if (store.length == 0 && paginationInfo && paginationInfo.page > 1) {
                            // $scope.updateList();
                            //}
                        }
                    });
                }
            }
        }])
    })
