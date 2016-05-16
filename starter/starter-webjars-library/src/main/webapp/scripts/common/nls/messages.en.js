define("common/nls/messages.en", [], function () {
  return {
    common: {confirm: "Confirm", cancel: "Cancel"},
    $locale: {
      id: "en-us",
      NUMBER_FORMATS: {
        DECIMAL_SEP: ".",
        GROUP_SEP: ",",
        PATTERNS: [{minInt: 1, minFrac: 0, maxFrac: 3, posPre: "", posSuf: "", negPre: "-", negSuf: "", gSize: 3, lgSize: 3}, {
          minInt: 1,
          minFrac: 2,
          maxFrac: 2,
          posPre: "¤",
          posSuf: "",
          negPre: "(¤",
          negSuf: ")",
          gSize: 3,
          lgSize: 3
        }],
        CURRENCY_SYM: "$"
      },
      DATETIME_FORMATS: {
        MONTH: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        SHORTMONTH: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        DAY: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        SHORTDAY: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        AMPMS: ["AM", "PM"],
        medium: "MMM d, y h:mm:ss a",
        "short": "M/d/yy h:mm a",
        fullDate: "EEEE, MMMM d, y",
        longDate: "MMMM d, y",
        mediumDate: "MMM d, y",
        shortDate: "M/d/yy",
        mediumTime: "h:mm:ss a",
        shortTime: "h:mm a"
      }
    }
  };
})
