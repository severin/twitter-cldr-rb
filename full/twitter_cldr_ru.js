/*
// Copyright 2012 Twitter, Inc
// http://www.apache.org/licenses/LICENSE-2.0

// TwitterCLDR (JavaScript) v1.6.2
// Authors: 		Cameron Dutro [@camertron]
								Kirill Lashuk [@KL_7]
								portions by Sven Fuchs [@svenfuchs]
// Homepage: 		https://twitter.com
// Description:	Provides date, time, number, and list formatting functionality for various Twitter-supported locales in Javascript.
*/

var DateTimeFormatter, PluralRules, TimespanFormatter, TwitterCldr;

TwitterCldr = {};

TwitterCldr.PluralRules = PluralRules = (function() {

  function PluralRules() {}

  PluralRules.rules = {"keys": ["one","few","many","other"], "rule": function(n) { return (function() { if (n % 10 == 1 && !(n % 100 == 11)) { return "one" } else { return (function() { if ([2, 3, 4].indexOf(n % 10) >= 0 && !([12, 13, 14].indexOf(n % 100) >= 0)) { return "few" } else { return (function() { if (n % 10 == 0 || [5, 6, 7, 8, 9].indexOf(n % 10) >= 0 || [11, 12, 13, 14].indexOf(n % 100) >= 0) { return "many" } else { return "other" } })(); } })(); } })(); }};

  PluralRules.all = function() {
    return this.rules.keys;
  };

  PluralRules.rule_for = function(number) {
    try {
      return this.rules.rule(number);
    } catch (error) {
      return "other";
    }
  };

  return PluralRules;

})();

TwitterCldr.TimespanFormatter = TimespanFormatter = (function() {

  function TimespanFormatter() {
    this.default_type = "default";
    this.tokens = {"ago":{"second":{"default":{"one":[{"value":"1 секунду назад","type":"plaintext"}],"few":[{"value":"{0}","type":"placeholder"},{"value":" секунды назад","type":"plaintext"}],"many":[{"value":"{0}","type":"placeholder"},{"value":" секунд назад","type":"plaintext"}],"other":[{"value":"{0}","type":"placeholder"},{"value":" секунды назад","type":"plaintext"}]}},"minute":{"default":{"one":[{"value":"1 минуту назад","type":"plaintext"}],"few":[{"value":"{0}","type":"placeholder"},{"value":" минуты назад","type":"plaintext"}],"many":[{"value":"{0}","type":"placeholder"},{"value":" минут назад","type":"plaintext"}],"other":[{"value":"{0}","type":"placeholder"},{"value":" минуты назад","type":"plaintext"}]}},"hour":{"default":{"one":[{"value":"1 час назад","type":"plaintext"}],"few":[{"value":"{0}","type":"placeholder"},{"value":" часа назад","type":"plaintext"}],"many":[{"value":"{0}","type":"placeholder"},{"value":" часов назад","type":"plaintext"}],"other":[{"value":"{0}","type":"placeholder"},{"value":" часа назад","type":"plaintext"}]}},"day":{"default":{"one":[{"value":"1 день назад","type":"plaintext"}],"few":[{"value":"{0}","type":"placeholder"},{"value":" дня назад","type":"plaintext"}],"many":[{"value":"{0}","type":"placeholder"},{"value":" дней назад","type":"plaintext"}],"other":[{"value":"{0}","type":"placeholder"},{"value":" дня назад","type":"plaintext"}]}},"week":{"default":{"one":[{"value":"1 неделю назад","type":"plaintext"}],"few":[{"value":"{0}","type":"placeholder"},{"value":" недели назад","type":"plaintext"}],"many":[{"value":"{0}","type":"placeholder"},{"value":" недель назад","type":"plaintext"}],"other":[{"value":"{0}","type":"placeholder"},{"value":" недели назад","type":"plaintext"}]}},"month":{"default":{"one":[{"value":"1 месяц назад","type":"plaintext"}],"few":[{"value":"{0}","type":"placeholder"},{"value":" месяца назад","type":"plaintext"}],"many":[{"value":"{0}","type":"placeholder"},{"value":" месяцев назад","type":"plaintext"}],"other":[{"value":"{0}","type":"placeholder"},{"value":" месяца назад","type":"plaintext"}]}},"year":{"default":{"one":[{"value":"1 год назад","type":"plaintext"}],"few":[{"value":"{0}","type":"placeholder"},{"value":" года назад","type":"plaintext"}],"many":[{"value":"{0}","type":"placeholder"},{"value":" лет назад","type":"plaintext"}],"other":[{"value":"{0}","type":"placeholder"},{"value":" года назад","type":"plaintext"}]}}},"until":{"second":{"default":{"one":[{"value":"Через 1 секунду","type":"plaintext"}],"few":[{"value":"Через ","type":"plaintext"},{"value":"{0}","type":"placeholder"},{"value":" секунды","type":"plaintext"}],"many":[{"value":"Через ","type":"plaintext"},{"value":"{0}","type":"placeholder"},{"value":" секунд","type":"plaintext"}],"other":[{"value":"Через ","type":"plaintext"},{"value":"{0}","type":"placeholder"},{"value":" секунды","type":"plaintext"}]}},"minute":{"default":{"one":[{"value":"Через 1 минуту","type":"plaintext"}],"few":[{"value":"Через ","type":"plaintext"},{"value":"{0}","type":"placeholder"},{"value":" минуты","type":"plaintext"}],"many":[{"value":"Через ","type":"plaintext"},{"value":"{0}","type":"placeholder"},{"value":" минут","type":"plaintext"}],"other":[{"value":"Через ","type":"plaintext"},{"value":"{0}","type":"placeholder"},{"value":" минуты","type":"plaintext"}]}},"hour":{"default":{"one":[{"value":"Через 1 час","type":"plaintext"}],"few":[{"value":"Через ","type":"plaintext"},{"value":"{0}","type":"placeholder"},{"value":" часа","type":"plaintext"}],"many":[{"value":"Через ","type":"plaintext"},{"value":"{0}","type":"placeholder"},{"value":" часов","type":"plaintext"}],"other":[{"value":"Через ","type":"plaintext"},{"value":"{0}","type":"placeholder"},{"value":" часа","type":"plaintext"}]}},"day":{"default":{"one":[{"value":"Через 1 день","type":"plaintext"}],"few":[{"value":"Через ","type":"plaintext"},{"value":"{0}","type":"placeholder"},{"value":" дня","type":"plaintext"}],"many":[{"value":"Через ","type":"plaintext"},{"value":"{0}","type":"placeholder"},{"value":" дней","type":"plaintext"}],"other":[{"value":"Через ","type":"plaintext"},{"value":"{0}","type":"placeholder"},{"value":" дня","type":"plaintext"}]}},"week":{"default":{"one":[{"value":"Через 1 неделю","type":"plaintext"}],"few":[{"value":"Через ","type":"plaintext"},{"value":"{0}","type":"placeholder"},{"value":" недели","type":"plaintext"}],"many":[{"value":"Через ","type":"plaintext"},{"value":"{0}","type":"placeholder"},{"value":" недель","type":"plaintext"}],"other":[{"value":"Через ","type":"plaintext"},{"value":"{0}","type":"placeholder"},{"value":" недели","type":"plaintext"}]}},"month":{"default":{"one":[{"value":"Через 1 месяц","type":"plaintext"}],"few":[{"value":"Через ","type":"plaintext"},{"value":"{0}","type":"placeholder"},{"value":" месяца","type":"plaintext"}],"many":[{"value":"Через ","type":"plaintext"},{"value":"{0}","type":"placeholder"},{"value":" месяцев","type":"plaintext"}],"other":[{"value":"Через ","type":"plaintext"},{"value":"{0}","type":"placeholder"},{"value":" месяца","type":"plaintext"}]}},"year":{"default":{"one":[{"value":"Через 1 год","type":"plaintext"}],"few":[{"value":"Через ","type":"plaintext"},{"value":"{0}","type":"placeholder"},{"value":" года","type":"plaintext"}],"many":[{"value":"Через ","type":"plaintext"},{"value":"{0}","type":"placeholder"},{"value":" лет","type":"plaintext"}],"other":[{"value":"Через ","type":"plaintext"},{"value":"{0}","type":"placeholder"},{"value":" года","type":"plaintext"}]}}},"none":{"second":{"default":{"one":[{"value":"{0}","type":"placeholder"},{"value":" секунда","type":"plaintext"}],"few":[{"value":"{0}","type":"placeholder"},{"value":" секунды","type":"plaintext"}],"many":[{"value":"{0}","type":"placeholder"},{"value":" секунд","type":"plaintext"}],"other":[{"value":"{0}","type":"placeholder"},{"value":" секунды","type":"plaintext"}]},"short":{"one":[{"value":"{0}","type":"placeholder"},{"value":" сек.","type":"plaintext"}],"few":[{"value":"{0}","type":"placeholder"},{"value":" сек.","type":"plaintext"}],"many":[{"value":"{0}","type":"placeholder"},{"value":" сек.","type":"plaintext"}],"other":[{"value":"{0}","type":"placeholder"},{"value":" сек.","type":"plaintext"}]},"abbreviated":{"one":[{"value":"{0}","type":"placeholder"},{"value":" сек","type":"plaintext"}],"few":[{"value":"{0}","type":"placeholder"},{"value":" сек","type":"plaintext"}],"many":[{"value":"{0}","type":"placeholder"},{"value":" сек","type":"plaintext"}],"other":[{"value":"{0}","type":"placeholder"},{"value":" сек","type":"plaintext"}]}},"minute":{"default":{"one":[{"value":"{0}","type":"placeholder"},{"value":" минута","type":"plaintext"}],"few":[{"value":"{0}","type":"placeholder"},{"value":" минуты","type":"plaintext"}],"many":[{"value":"{0}","type":"placeholder"},{"value":" минут","type":"plaintext"}],"other":[{"value":"{0}","type":"placeholder"},{"value":" минуты","type":"plaintext"}]},"short":{"one":[{"value":"{0}","type":"placeholder"},{"value":" мин.","type":"plaintext"}],"few":[{"value":"{0}","type":"placeholder"},{"value":" мин.","type":"plaintext"}],"many":[{"value":"{0}","type":"placeholder"},{"value":" мин.","type":"plaintext"}],"other":[{"value":"{0}","type":"placeholder"},{"value":" мин.","type":"plaintext"}]},"abbreviated":{"one":[{"value":"{0}","type":"placeholder"},{"value":" мин","type":"plaintext"}],"few":[{"value":"{0}","type":"placeholder"},{"value":" мин","type":"plaintext"}],"many":[{"value":"{0}","type":"placeholder"},{"value":" мин","type":"plaintext"}],"other":[{"value":"{0}","type":"placeholder"},{"value":" мин","type":"plaintext"}]}},"hour":{"default":{"one":[{"value":"{0}","type":"placeholder"},{"value":" час","type":"plaintext"}],"few":[{"value":"{0}","type":"placeholder"},{"value":" часа","type":"plaintext"}],"many":[{"value":"{0}","type":"placeholder"},{"value":" часов","type":"plaintext"}],"other":[{"value":"{0}","type":"placeholder"},{"value":" часа","type":"plaintext"}]},"short":{"one":[{"value":"{0}","type":"placeholder"},{"value":" ч.","type":"plaintext"}],"few":[{"value":"{0}","type":"placeholder"},{"value":" ч.","type":"plaintext"}],"many":[{"value":"{0}","type":"placeholder"},{"value":" ч.","type":"plaintext"}],"other":[{"value":"{0}","type":"placeholder"},{"value":" ч.","type":"plaintext"}]},"abbreviated":{"one":[{"value":"{0}","type":"placeholder"},{"value":" ч","type":"plaintext"}],"few":[{"value":"{0}","type":"placeholder"},{"value":" ч","type":"plaintext"}],"many":[{"value":"{0}","type":"placeholder"},{"value":" ч","type":"plaintext"}],"other":[{"value":"{0}","type":"placeholder"},{"value":" ч","type":"plaintext"}]}},"day":{"default":{"one":[{"value":"{0}","type":"placeholder"},{"value":" день","type":"plaintext"}],"few":[{"value":"{0}","type":"placeholder"},{"value":" дня","type":"plaintext"}],"many":[{"value":"{0}","type":"placeholder"},{"value":" дней","type":"plaintext"}],"other":[{"value":"{0}","type":"placeholder"},{"value":" дня","type":"plaintext"}]},"short":{"one":[{"value":"{0}","type":"placeholder"},{"value":" дн.","type":"plaintext"}],"few":[{"value":"{0}","type":"placeholder"},{"value":" дн.","type":"plaintext"}],"many":[{"value":"{0}","type":"placeholder"},{"value":" дн.","type":"plaintext"}],"other":[{"value":"{0}","type":"placeholder"},{"value":" дн.","type":"plaintext"}]},"abbreviated":{"one":[{"value":"{0}","type":"placeholder"},{"value":" д","type":"plaintext"}],"few":[{"value":"{0}","type":"placeholder"},{"value":" д","type":"plaintext"}],"many":[{"value":"{0}","type":"placeholder"},{"value":" д","type":"plaintext"}],"other":[{"value":"{0}","type":"placeholder"},{"value":" д","type":"plaintext"}]}},"week":{"default":{"one":[{"value":"{0}","type":"placeholder"},{"value":" неделя","type":"plaintext"}],"few":[{"value":"{0}","type":"placeholder"},{"value":" недели","type":"plaintext"}],"many":[{"value":"{0}","type":"placeholder"},{"value":" недель","type":"plaintext"}],"other":[{"value":"{0}","type":"placeholder"},{"value":" недели","type":"plaintext"}]},"short":{"one":[{"value":"{0}","type":"placeholder"},{"value":" нед.","type":"plaintext"}],"few":[{"value":"{0}","type":"placeholder"},{"value":" нед.","type":"plaintext"}],"many":[{"value":"{0}","type":"placeholder"},{"value":" нед.","type":"plaintext"}],"other":[{"value":"{0}","type":"placeholder"},{"value":" нед.","type":"plaintext"}]}},"month":{"default":{"one":[{"value":"{0}","type":"placeholder"},{"value":" месяц","type":"plaintext"}],"few":[{"value":"{0}","type":"placeholder"},{"value":" месяца","type":"plaintext"}],"many":[{"value":"{0}","type":"placeholder"},{"value":" месяцев","type":"plaintext"}],"other":[{"value":"{0}","type":"placeholder"},{"value":" месяца","type":"plaintext"}]},"short":{"one":[{"value":"{0}","type":"placeholder"},{"value":" мес.","type":"plaintext"}],"few":[{"value":"{0}","type":"placeholder"},{"value":" мес.","type":"plaintext"}],"many":[{"value":"{0}","type":"placeholder"},{"value":" мес.","type":"plaintext"}],"other":[{"value":"{0}","type":"placeholder"},{"value":" мес.","type":"plaintext"}]}},"year":{"default":{"one":[{"value":"{0}","type":"placeholder"},{"value":" год","type":"plaintext"}],"few":[{"value":"{0}","type":"placeholder"},{"value":" года","type":"plaintext"}],"many":[{"value":"{0}","type":"placeholder"},{"value":" лет","type":"plaintext"}],"other":[{"value":"{0}","type":"placeholder"},{"value":" года","type":"plaintext"}]},"short":{"one":[{"value":"{0}","type":"placeholder"},{"value":" г.","type":"plaintext"}],"few":[{"value":"{0}","type":"placeholder"},{"value":" г.","type":"plaintext"}],"many":[{"value":"{0}","type":"placeholder"},{"value":" лет","type":"plaintext"}],"other":[{"value":"{0}","type":"placeholder"},{"value":" г.","type":"plaintext"}]}}}};
    this.time_in_seconds = {
      "second": 1,
      "minute": 60,
      "hour": 3600,
      "day": 86400,
      "week": 604800,
      "month": 2629743.83,
      "year": 31556926
    };
  }

  TimespanFormatter.prototype.format = function(seconds, options) {
    var number, strings, token;
    if (options == null) {
      options = {};
    }
    options["direction"] || (options["direction"] = (seconds < 0 ? "ago" : "until"));
    if (options["unit"] === null || options["unit"] === void 0) {
      options["unit"] = this.calculate_unit(Math.abs(seconds));
    }
    options["type"] || (options["type"] = this.default_type);
    options["number"] = this.calculate_time(Math.abs(seconds), options["unit"]);
    number = this.calculate_time(Math.abs(seconds), options["unit"]);
    options["rule"] = TwitterCldr.PluralRules.rule_for(number);
    strings = (function() {
      var _i, _len, _ref, _results;
      _ref = this.tokens[options["direction"]][options["unit"]][options["type"]][options["rule"]];
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        token = _ref[_i];
        _results.push(token.value);
      }
      return _results;
    }).call(this);
    return strings.join("").replace(/\{[0-9]\}/, number.toString());
  };

  TimespanFormatter.prototype.calculate_unit = function(seconds) {
    if (seconds < 30) {
      return "second";
    } else if (seconds < 2670) {
      return "minute";
    } else if (seconds < 86369) {
      return "hour";
    } else if (seconds < 604800) {
      return "day";
    } else if (seconds < 2591969) {
      return "week";
    } else if (seconds < 31556926) {
      return "month";
    } else {
      return "year";
    }
  };

  TimespanFormatter.prototype.calculate_time = function(seconds, unit) {
    return Math.round(seconds / this.time_in_seconds[unit]);
  };

  return TimespanFormatter;

})();

TwitterCldr.DateTimeFormatter = DateTimeFormatter = (function() {

  function DateTimeFormatter() {
    this.tokens = {"date_time":{"default":[{"value":"dd","type":"pattern"},{"value":".","type":"plaintext"},{"value":"MM","type":"pattern"},{"value":".","type":"plaintext"},{"value":"yyyy","type":"pattern"},{"value":",","type":"plaintext"},{"value":" ","type":"plaintext"},{"value":"H","type":"pattern"},{"value":":","type":"plaintext"},{"value":"mm","type":"pattern"},{"value":":","type":"plaintext"},{"value":"ss","type":"pattern"}],"full":[{"value":"EEEE","type":"pattern"},{"value":", ","type":"plaintext"},{"value":"d","type":"pattern"},{"value":" ","type":"plaintext"},{"value":"MMMM","type":"pattern"},{"value":" ","type":"plaintext"},{"value":"y","type":"pattern"},{"value":" 'г'.","type":"plaintext"},{"value":",","type":"plaintext"},{"value":" ","type":"plaintext"},{"value":"H","type":"pattern"},{"value":":","type":"plaintext"},{"value":"mm","type":"pattern"},{"value":":","type":"plaintext"},{"value":"ss","type":"pattern"},{"value":" ","type":"plaintext"},{"value":"zzzz","type":"pattern"}],"long":[{"value":"d","type":"pattern"},{"value":" ","type":"plaintext"},{"value":"MMMM","type":"pattern"},{"value":" ","type":"plaintext"},{"value":"y","type":"pattern"},{"value":" 'г'.","type":"plaintext"},{"value":",","type":"plaintext"},{"value":" ","type":"plaintext"},{"value":"H","type":"pattern"},{"value":":","type":"plaintext"},{"value":"mm","type":"pattern"},{"value":":","type":"plaintext"},{"value":"ss","type":"pattern"},{"value":" ","type":"plaintext"},{"value":"z","type":"pattern"}],"medium":[{"value":"dd","type":"pattern"},{"value":".","type":"plaintext"},{"value":"MM","type":"pattern"},{"value":".","type":"plaintext"},{"value":"yyyy","type":"pattern"},{"value":",","type":"plaintext"},{"value":" ","type":"plaintext"},{"value":"H","type":"pattern"},{"value":":","type":"plaintext"},{"value":"mm","type":"pattern"},{"value":":","type":"plaintext"},{"value":"ss","type":"pattern"}],"short":[{"value":"dd","type":"pattern"},{"value":".","type":"plaintext"},{"value":"MM","type":"pattern"},{"value":".","type":"plaintext"},{"value":"yy","type":"pattern"},{"value":",","type":"plaintext"},{"value":" ","type":"plaintext"},{"value":"H","type":"pattern"},{"value":":","type":"plaintext"},{"value":"mm","type":"pattern"}]},"time":{"default":[{"value":"H","type":"pattern"},{"value":":","type":"plaintext"},{"value":"mm","type":"pattern"},{"value":":","type":"plaintext"},{"value":"ss","type":"pattern"}],"full":[{"value":"H","type":"pattern"},{"value":":","type":"plaintext"},{"value":"mm","type":"pattern"},{"value":":","type":"plaintext"},{"value":"ss","type":"pattern"},{"value":" ","type":"plaintext"},{"value":"zzzz","type":"pattern"}],"long":[{"value":"H","type":"pattern"},{"value":":","type":"plaintext"},{"value":"mm","type":"pattern"},{"value":":","type":"plaintext"},{"value":"ss","type":"pattern"},{"value":" ","type":"plaintext"},{"value":"z","type":"pattern"}],"medium":[{"value":"H","type":"pattern"},{"value":":","type":"plaintext"},{"value":"mm","type":"pattern"},{"value":":","type":"plaintext"},{"value":"ss","type":"pattern"}],"short":[{"value":"H","type":"pattern"},{"value":":","type":"plaintext"},{"value":"mm","type":"pattern"}]},"date":{"default":[{"value":"dd","type":"pattern"},{"value":".","type":"plaintext"},{"value":"MM","type":"pattern"},{"value":".","type":"plaintext"},{"value":"yyyy","type":"pattern"}],"full":[{"value":"EEEE","type":"pattern"},{"value":", ","type":"plaintext"},{"value":"d","type":"pattern"},{"value":" ","type":"plaintext"},{"value":"MMMM","type":"pattern"},{"value":" ","type":"plaintext"},{"value":"y","type":"pattern"},{"value":" 'г'.","type":"plaintext"}],"long":[{"value":"d","type":"pattern"},{"value":" ","type":"plaintext"},{"value":"MMMM","type":"pattern"},{"value":" ","type":"plaintext"},{"value":"y","type":"pattern"},{"value":" 'г'.","type":"plaintext"}],"medium":[{"value":"dd","type":"pattern"},{"value":".","type":"plaintext"},{"value":"MM","type":"pattern"},{"value":".","type":"plaintext"},{"value":"yyyy","type":"pattern"}],"short":[{"value":"dd","type":"pattern"},{"value":".","type":"plaintext"},{"value":"MM","type":"pattern"},{"value":".","type":"plaintext"},{"value":"yy","type":"pattern"}]}};
    this.calendar = {"days":{"format":{"abbreviated":{"fri":"пт","mon":"пн","sat":"сб","sun":"вс","thu":"чт","tue":"вт","wed":"ср"},"narrow":{"fri":"П","mon":"Пн","sat":"С","sun":"В","thu":"Ч","tue":"Вт","wed":"С"},"wide":{"fri":"пятница","mon":"понедельник","sat":"суббота","sun":"воскресенье","thu":"четверг","tue":"вторник","wed":"среда"}},"stand-alone":{"abbreviated":{"fri":"Пт","mon":"Пн","sat":"Сб","sun":"Вс","thu":"Чт","tue":"Вт","wed":"Ср"},"narrow":{"fri":"П","mon":"П","sat":"С","sun":"В","thu":"Ч","tue":"В","wed":"С"},"wide":{"fri":"Пятница","mon":"Понедельник","sat":"Суббота","sun":"Воскресенье","thu":"Четверг","tue":"Вторник","wed":"Среда"}}},"eras":{"abbr":{"0":"до н.э.","1":"н.э."},"name":{"0":"до н.э.","1":"н.э."},"narrow":{"0":"до н.э.","1":"н.э."}},"fields":{"day":"День","dayperiod":"ДП/ПП","era":"Эра","hour":"Час","minute":"Минута","month":"Месяц","second":"Секунда","week":"Неделя","weekday":"День недели","year":"Год","zone":"Часовой пояс"},"formats":{"date":{"default":{"pattern":"dd.MM.yyyy"},"full":{"pattern":"EEEE, d MMMM y 'г'."},"long":{"pattern":"d MMMM y 'г'."},"medium":{"pattern":"dd.MM.yyyy"},"short":{"pattern":"dd.MM.yy"}},"datetime":{"default":{"pattern":"{{date}}, {{time}}"},"full":{"pattern":"{{date}}, {{time}}"},"long":{"pattern":"{{date}}, {{time}}"},"medium":{"pattern":"{{date}}, {{time}}"},"short":{"pattern":"{{date}}, {{time}}"}},"time":{"default":{"pattern":"H:mm:ss"},"full":{"pattern":"H:mm:ss zzzz"},"long":{"pattern":"H:mm:ss z"},"medium":{"pattern":"H:mm:ss"},"short":{"pattern":"H:mm"}}},"months":{"format":{"abbreviated":{"1":"янв.","10":"окт.","11":"нояб.","12":"дек.","2":"февр.","3":"марта","4":"апр.","5":"мая","6":"июня","7":"июля","8":"авг.","9":"сент."},"narrow":{"1":"Я","10":"О","11":"Н","12":"Д","2":"Ф","3":"М","4":"А","5":"М","6":"И","7":"И","8":"А","9":"С"},"wide":{"1":"января","10":"октября","11":"ноября","12":"декабря","2":"февраля","3":"марта","4":"апреля","5":"мая","6":"июня","7":"июля","8":"августа","9":"сентября"}},"stand-alone":{"abbreviated":{"1":"Янв.","10":"Окт.","11":"Нояб.","12":"Дек.","2":"Февр.","3":"Март","4":"Апр.","5":"Май","6":"Июнь","7":"Июль","8":"Авг.","9":"Сент."},"narrow":{"1":"Я","10":"О","11":"Н","12":"Д","2":"Ф","3":"М","4":"А","5":"М","6":"И","7":"И","8":"А","9":"С"},"wide":{"1":"Январь","10":"Октябрь","11":"Ноябрь","12":"Декабрь","2":"Февраль","3":"Март","4":"Апрель","5":"Май","6":"Июнь","7":"Июль","8":"Август","9":"Сентябрь"}}},"periods":{"format":{"abbreviated":{"am":"до полудня","pm":"после полудня"},"narrow":{"am":"дп","pm":"пп"},"wide":{"am":"до полудня","pm":"после полудня"}},"stand-alone":{}},"quarters":{"format":{"abbreviated":{"1":"1-й кв.","2":"2-й кв.","3":"3-й кв.","4":"4-й кв."},"narrow":{"1":1,"2":2,"3":3,"4":4},"wide":{"1":"1-й квартал","2":"2-й квартал","3":"3-й квартал","4":"4-й квартал"}},"stand-alone":{"abbreviated":{"1":"1-й кв.","2":"2-й кв.","3":"3-й кв.","4":"4-й кв."},"narrow":{"1":1,"2":2,"3":3,"4":4},"wide":{"1":"1-й квартал","2":"2-й квартал","3":"3-й квартал","4":"4-й квартал"}}}};
    this.weekday_keys = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    this.methods = {
      'G': 'era',
      'y': 'year',
      'Y': 'year_of_week_of_year',
      'Q': 'quarter',
      'q': 'quarter_stand_alone',
      'M': 'month',
      'L': 'month_stand_alone',
      'w': 'week_of_year',
      'W': 'week_of_month',
      'd': 'day',
      'D': 'day_of_month',
      'F': 'day_of_week_in_month',
      'E': 'weekday',
      'e': 'weekday_local',
      'c': 'weekday_local_stand_alone',
      'a': 'period',
      'h': 'hour',
      'H': 'hour',
      'K': 'hour',
      'k': 'hour',
      'm': 'minute',
      's': 'second',
      'S': 'second_fraction',
      'z': 'timezone',
      'Z': 'timezone',
      'v': 'timezone_generic_non_location',
      'V': 'timezone_metazone'
    };
  }

  DateTimeFormatter.prototype.format = function(obj, options) {
    var format_token, token, tokens,
      _this = this;
    format_token = function(token) {
      var result;
      result = "";
      switch (token.type) {
        case "pattern":
          return _this.result_for_token(token, obj);
        default:
          if (token.value.length > 0 && token.value[0] === "'" && token.value[token.value.length - 1] === "'") {
            return token.value.substring(1, token.value.length - 1);
          } else {
            return token.value;
          }
      }
    };
    tokens = this.get_tokens(obj, options);
    return ((function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = tokens.length; _i < _len; _i++) {
        token = tokens[_i];
        _results.push(format_token(token));
      }
      return _results;
    })()).join("");
  };

  DateTimeFormatter.prototype.get_tokens = function(obj, options) {
    return this.tokens[options.format || "date_time"][options.type || "default"];
  };

  DateTimeFormatter.prototype.result_for_token = function(token, date) {
    return this[this.methods[token.value[0]]](date, token.value, token.value.length);
  };

  DateTimeFormatter.prototype.era = function(date, pattern, length) {
    var choices, index;
    switch (length) {
      case 1:
      case 2:
      case 3:
        choices = this.calendar["eras"]["abbr"];
        break;
      default:
        choices = this.calendar["eras"]["name"];
    }
    index = date.getFullYear() < 0 ? 0 : 1;
    return choices[index];
  };

  DateTimeFormatter.prototype.year = function(date, pattern, length) {
    var year;
    year = date.getFullYear().toString();
    if (length === 2) {
      if (year.length !== 1) {
        year = year.slice(-2);
      }
    }
    if (length > 1) {
      year = ("0000" + year).slice(-length);
    }
    return year;
  };

  DateTimeFormatter.prototype.year_of_week_of_year = function(date, pattern, length) {
    throw 'not implemented';
  };

  DateTimeFormatter.prototype.day_of_week_in_month = function(date, pattern, length) {
    throw 'not implemented';
  };

  DateTimeFormatter.prototype.quarter = function(date, pattern, length) {
    var quarter;
    quarter = ((date.getMonth() / 3) | 0) + 1;
    switch (length) {
      case 1:
        return quarter.toString();
      case 2:
        return ("0000" + quarter.toString()).slice(-length);
      case 3:
        return this.calendar.quarters.format.abbreviated[quarter];
      case 4:
        return this.calendar.quarters.format.wide[quarter];
    }
  };

  DateTimeFormatter.prototype.quarter_stand_alone = function(date, pattern, length) {
    var quarter;
    quarter = (date.getMonth() - 1) / 3 + 1;
    switch (length) {
      case 1:
        return quarter.toString();
      case 2:
        return ("0000" + quarter.toString()).slice(-length);
      case 3:
        throw 'not yet implemented (requires cldr\'s "multiple inheritance")';
        break;
      case 4:
        throw 'not yet implemented (requires cldr\'s "multiple inheritance")';
        break;
      case 5:
        return this.calendar.quarters['stand-alone'].narrow[quarter];
    }
  };

  DateTimeFormatter.prototype.month = function(date, pattern, length) {
    var month_str;
    month_str = (date.getMonth() + 1).toString();
    switch (length) {
      case 1:
        return month_str;
      case 2:
        return ("0000" + month_str).slice(-length);
      case 3:
        return this.calendar.months.format.abbreviated[month_str];
      case 4:
        return this.calendar.months.format.wide[month_str];
      case 5:
        throw 'not yet implemented (requires cldr\'s "multiple inheritance")';
        break;
      default:
        throw "Unknown date format";
    }
  };

  DateTimeFormatter.prototype.month_stand_alone = function(date, pattern, length) {
    switch (length) {
      case 1:
        return date.getMonth().toString();
      case 2:
        return ("0000" + date.getMonth().toString()).slice(-length);
      case 3:
        throw 'not yet implemented (requires cldr\'s "multiple inheritance")';
        break;
      case 4:
        throw 'not yet implemented (requires cldr\'s "multiple inheritance")';
        break;
      case 5:
        return this.calendar.months['stand-alone'].narrow[date.month];
      default:
        throw "Unknown date format";
    }
  };

  DateTimeFormatter.prototype.day = function(date, pattern, length) {
    switch (length) {
      case 1:
        return date.getDate().toString();
      case 2:
        return ("0000" + date.getDate().toString()).slice(-length);
    }
  };

  DateTimeFormatter.prototype.weekday = function(date, pattern, length) {
    var key;
    key = this.weekday_keys[date.getDay()];
    switch (length) {
      case 1:
      case 2:
      case 3:
        return this.calendar.days.format.abbreviated[key];
      case 4:
        return this.calendar.days.format.wide[key];
      case 5:
        return this.calendar.days['stand-alone'].narrow[key];
    }
  };

  DateTimeFormatter.prototype.weekday_local = function(date, pattern, length) {
    var day;
    switch (length) {
      case 1:
      case 2:
        day = date.getDay();
        return (day === 0 ? "7" : day.toString());
      default:
        return this.weekday(date, pattern, length);
    }
  };

  DateTimeFormatter.prototype.weekday_local_stand_alone = function(date, pattern, length) {
    switch (length) {
      case 1:
        return this.weekday_local(date, pattern, length);
      default:
        return this.weekday(date, pattern, length);
    }
  };

  DateTimeFormatter.prototype.period = function(time, pattern, length) {
    if (time.getHours() > 11) {
      return this.calendar.periods.format.wide["pm"];
    } else {
      return this.calendar.periods.format.wide["am"];
    }
  };

  DateTimeFormatter.prototype.hour = function(time, pattern, length) {
    var hour;
    hour = time.getHours();
    switch (pattern[0]) {
      case 'h':
        if (hour > 12) {
          hour = hour - 12;
        } else if (hour === 0) {
          hour = 12;
        }
        break;
      case 'K':
        if (hour > 11) {
          hour = hour - 12;
        }
        break;
      case 'k':
        if (hour === 0) {
          hour = 24;
        }
    }
    if (length === 1) {
      return hour.toString();
    } else {
      return ("000000" + hour.toString()).slice(-length);
    }
  };

  DateTimeFormatter.prototype.minute = function(time, pattern, length) {
    if (length === 1) {
      return time.getMinutes().toString();
    } else {
      return ("000000" + time.getMinutes().toString()).slice(-length);
    }
  };

  DateTimeFormatter.prototype.second = function(time, pattern, length) {
    if (length === 1) {
      return time.getSeconds().toString();
    } else {
      return ("000000" + time.getSeconds().toString()).slice(-length);
    }
  };

  DateTimeFormatter.prototype.second_fraction = function(time, pattern, length) {
    if (length > 6) {
      throw 'can not use the S format with more than 6 digits';
    }
    return ("000000" + Math.round(Math.pow(time.getMilliseconds() * 100.0, 6 - length)).toString()).slice(-length);
  };

  DateTimeFormatter.prototype.timezone = function(time, pattern, length) {
    var hours, minutes;
    hours = ("00" + (time.getTimezoneOffset() / 60).toString()).slice(-2);
    minutes = ("00" + (time.getTimezoneOffset() % 60).toString()).slice(-2);
    switch (length) {
      case 1:
      case 2:
      case 3:
        return "-" + hours + ":" + minutes;
      default:
        return "UTC -" + hours + ":" + minutes;
    }
  };

  DateTimeFormatter.prototype.timezone_generic_non_location = function(time, pattern, length) {
    throw 'not yet implemented (requires timezone translation data")';
  };

  return DateTimeFormatter;

})();
