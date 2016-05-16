define("$tools", ["$helpers"], function ($helpers) {
    var develop = null;
    $helpers.run(["$rootScope", "$injector", function ($rootScope, $injector) {
        $rootScope.develop = develop = function () {
            $injector.invoke(["$dialog", function ($dialog) {
                $dialog.showMessage({title: "消息提示", message: "待开发中、敬请期待～～～"})
            }]);
        }
    }]);

    /**
     * Select2 Default Options
     * @param option
     * @returns {{overwritePlaceholder: boolean, placeholder: *, ajax: {transport: select2Options.ajax.transport, processResults: select2Options.ajax.processResults}, templateResult: select2Options.templateResult, templateSelection: select2Options.templateSelection}}
     */
    function getSelect2Options(option) {
        var select2Options = {
            overwritePlaceholder: false,
            minimumInputLength: 0,
            maximumInputLength: 100,
            overwritePlaceholder: false,
            placeholder: "请选择",
            idField: "id",
            textField: "text",
            language: {
                errorLoading: function () {
                    return '服务器异常、请稍后再次尝试！';
                },
                inputTooShort: function (args) {
                    return '请输再输入' + (args.minimum - args.input.length ) + '个或更多的字符。';
                },
                noResults: function () {
                    return '没有查询到任何内容！';
                }, searching: function () {
                    return '努力加载中...';
                }
            },
            ajax: {
                transport: function (params, success, failure) {
                    alert("select2Options.transport is undefined");
                },
                delay: 250,
                cache: true
            }, /*
             templateResult: function (result) {
             // select2 -> dropdown - options
             return result.text;
             },
             templateSelection: function (data) {
             // select -> option
             if (!data.text && data.name) {
             data.text = data.name;
             }
             return data.text;
             },*/
            onSelectedItem: angular.noop,
            /* selectOnClose: false,
             closeOnSelect: true,*/
            // allowClear: true,
            data: []
        };
        if (option && angular.isFunction(option.transport)) {
            select2Options.ajax.transport = option.transport
            select2Options.ajax.processResults = function (response) {
                var options = angular.isArray(response.data) ? response.data : response.data.content;
                return {
                    results: $.map(options, angular.isFunction(select2Options.format) ? select2Options.format : function (option) {
                        return angular.extend(option, {
                            id: option[select2Options.idField],
                            text: option[select2Options.textField]
                        });
                    }),
                    pagination: {
                        more: response.data.content && response.data.content.last === false
                    }
                };
            }
        } else {
            delete select2Options.ajax;
        }
        return angular.extend(select2Options, option);
    }


    function getCookie(name) {
        if (!name)return;
        var values = document.cookie.split(";"), value;
        for (var index = 0; index < values.length; index++) {
            var i = values[index].split("=");
            i[0].trim() == name && (value = unescape(i[1]))
        }
        return value
    }

    function setCookie(name, value, domain, day) {
        if (!name)return;
        var exp = new Date();
        exp.setTime(exp.getTime() + (day ? day : 30) * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + (domain ? ";domain=" + domain : "") + "; path=/;expires=" + exp.toGMTString();
    }

    function getHashCode(str) {
        var h = 0;
        var len = str.length;
        var t = 2147483648;
        for (var i = 0; i < len; i++) {
            h = 31 * h + str.charCodeAt(i);
            if (h > 2147483647) h %= t; // java int溢出则取模
        }
        return h;
    }

    return {
        getSelect2Options: getSelect2Options,
        setCookie: setCookie,
        getCookie: getCookie,
        getHashCode: getHashCode,
        develop: develop
    };
});
define("common/support/tools", ["$tools"], function ($tools) {
    return $tools;
})
