define("common/services/i18n", ["angular", "$services", "$url", "../nls/messages.zh", "../nls/messages.en"], function (angular, $services, $url, zh, en) {
  var html = angular.element("html");
  var language = $url.get("lang") || (html ? html.attr("lang") : "") || window.LANG || "zh";
  var messages = zh;
  switch (language) {
    case"en":
      messages = en;
      break;
  }
  function formatter() {
    var args = arguments;
    if (args[0]) {
      return args[0].replace(/\{\{|\}\}|\{(\d+)\}/g, function (word, index) {
        if (word == "{{") {
          return "{";
        }
        if (word == "}}") {
          return "}";
        }
        index = parseInt(index, 10) + 1;
        return args[index] ? args[index] : word;
      })
    }
  }

  function Message(key) {
    if (!key) {
      throw new Error('param "messageId" is needed to get i18n messages');
    }
    var message = {common: messages.common, local: messages[key] || null}
    if (!message.common || !message.local) {
      console.error("get I18nService which resources type is [" + language + ']  failed ! Can not get messages file "' + key + '", please check if you had add the file in folder' +
        ' "common/nls/messages.' + language + '"');
    }
    this.local = message.local;
    this.common = message.common
  }

  Message.prototype = {
    constructor: Message,
    formatter: formatter,
    f: formatter,
    text: function (isCommon, key) {
      var n = arguments,
        r = Array.prototype.slice.call(n, 1);
      if (typeof isCommon == "string") {
        key = isCommon;
      } else {
        r = Array.prototype.slice.call(n, 2);
      }
      if (key) {
        var message = this.local[key];
        if (isCommon === true) {
          message = this.common[key];
        }
        if (message) {
          r.unshift(message);
          return this.formatter.apply(this, r);
        } else {
          return key;
        }
      }
    }
  };
  $services.value("$locale", messages.$locale);
  $services.factory("$i18nService", function () {
    return {
      get: function (e) {
        return new Message(e)
      }, lang: function () {
        return language
      }
    }
  });
  return {
    get: function (e) {
      return new Message(e)
    }, getLang: function () {
      return language
    }
  }
})
