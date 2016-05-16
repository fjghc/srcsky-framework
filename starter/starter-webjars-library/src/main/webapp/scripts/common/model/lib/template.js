define("common/model/lib/template", [], function () {
  var e = {}, t = {
    tmpl: function (n, r) {
      var i = /\W/.test(n) ? new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + n.replace(/[\r\t\n]/g, " ").split("<%").join("	").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("	").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');") : e[n] = e[n] || t.tmpl(document.getElementById(n).innerHTML);
      return r ? i(r) : i
    }
  };
  return t
})
