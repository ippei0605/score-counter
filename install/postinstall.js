/**
 * @file Score Counter アプリのインストール後処理
 *
 * <pre>
 * ・データベース「score」が無い場合、
 *   - データベースを作成する。
 *   - サンプルデータを登録する。
 * ・「score」に設計文書「_design/scores」が無い場合は作成する。
 * </pre>
 *
 * @author Ippei SUZUKI
 */

// モジュールを読込む。
var context = require('../utils/context');

// 設計文書
var DESIGN_DOCUMENT = {
	"_id" : "_design/scores",
	"views" : {
		"list" : {
			"map" : "function(doc) {\n\tvar row = {\n\t\t\"_id\" : doc._id,\n\t\t\"_rev\" : doc._rev,\n\t\t\"date\" : doc.date,\n\t\t\"hole\" : doc.hole,\n\t\t\"count\" : doc.count,\n\t\t\"club\" : doc.club,\n\t\t\"result\" : doc.result,\n\t\t\"latitude\" : doc.latitude,\n\t\t\"longitude\" : doc.longitude\n\t};\n\temit(doc.date, row);\n}"
		},
		"total" : {
			"map" : "function(doc) {\r\n  if(doc.count !== '0') {\r\n    var putt = 0;\r\n    if(doc.result === 'Green') {\r\n      putt = 1;\r\n    }\r\n  \temit([doc.date, doc.hole], {\r\n      \"count\": 1,\r\n      \"putt\": putt\r\n    });\r\n  }\r\n}",
			"reduce" : "_sum"
		}
	}
};

// サンプルデータ (113件)
var SAMPLE_DATA = [ {
	"date" : "2016-04-02",
	"hole" : 8,
	"count" : "3",
	"club" : "7I",
	"result" : "Fairway",
	"latitude" : "35.611172",
	"longitude" : "138.921484"
}, {
	"date" : "2016-04-02",
	"hole" : 8,
	"count" : "4",
	"club" : "PW",
	"result" : "Bunker",
	"latitude" : "35.610387",
	"longitude" : "138.921409"
}, {
	"date" : "2016-04-02",
	"hole" : 9,
	"count" : "0",
	"club" : "",
	"result" : "",
	"latitude" : "35.607566",
	"longitude" : "138.921829"
}, {
	"date" : "2016-04-02",
	"hole" : 4,
	"count" : "1",
	"club" : "3W",
	"result" : "Fairway",
	"latitude" : "35.611301",
	"longitude" : "138.924036"
}, {
	"date" : "2016-04-02",
	"hole" : 9,
	"count" : "5",
	"club" : "Putter",
	"result" : "Green",
	"latitude" : "35.608839",
	"longitude" : "138.925232"
}, {
	"date" : "2016-04-02",
	"hole" : 6,
	"count" : "3",
	"club" : "8I",
	"result" : "Green",
	"latitude" : "35.613150",
	"longitude" : "138.926313"
}, {
	"date" : "2016-04-02",
	"hole" : 6,
	"count" : "5",
	"club" : "Putter",
	"result" : "Cup in",
	"latitude" : "35.613282",
	"longitude" : "138.926388"
}, {
	"date" : "2016-04-02",
	"hole" : 7,
	"count" : "0",
	"club" : "",
	"result" : "",
	"latitude" : "35.613944",
	"longitude" : "138.926231"
}, {
	"date" : "2016-04-02",
	"hole" : 7,
	"count" : "1",
	"club" : "3W",
	"result" : "Rough",
	"latitude" : "35.613005",
	"longitude" : "138.924269"
}, {
	"date" : "2016-04-02",
	"hole" : 7,
	"count" : "2",
	"club" : "9I",
	"result" : "Rough",
	"latitude" : "35.613191",
	"longitude" : "138.922931"
}, {
	"date" : "2016-04-02",
	"hole" : 7,
	"count" : "4",
	"club" : "Putter",
	"result" : "Green",
	"latitude" : "35.612998",
	"longitude" : "138.922921"
}, {
	"date" : "2016-04-02",
	"hole" : 3,
	"count" : "1",
	"club" : "Driver",
	"result" : "Rough",
	"latitude" : "35.609981",
	"longitude" : "138.925230"
}, {
	"date" : "2016-04-02",
	"hole" : 1,
	"count" : "3",
	"club" : "AW",
	"result" : "Green",
	"latitude" : "35.608218",
	"longitude" : "138.921352"
}, {
	"date" : "2016-04-02",
	"hole" : 2,
	"count" : "1",
	"club" : "9I",
	"result" : "Fairway",
	"latitude" : "35.608991",
	"longitude" : "138.921710"
}, {
	"date" : "2016-04-02",
	"hole" : 1,
	"count" : "4",
	"club" : "Putter",
	"result" : "Cup in",
	"latitude" : "35.608107",
	"longitude" : "138.921229"
}, {
	"date" : "2016-04-02",
	"hole" : 18,
	"count" : "2",
	"club" : "6I",
	"result" : "Rough",
	"latitude" : "35.609100",
	"longitude" : "138.926132"
}, {
	"date" : "2016-04-02",
	"hole" : 16,
	"count" : "0",
	"club" : "",
	"result" : "",
	"latitude" : "35.611150",
	"longitude" : "138.930285"
}, {
	"date" : "2016-04-02",
	"hole" : 16,
	"count" : "2",
	"club" : "PW",
	"result" : "Fairway",
	"latitude" : "35.613146",
	"longitude" : "138.931432"
}, {
	"date" : "2016-04-02",
	"hole" : 16,
	"count" : "5",
	"club" : "Putter",
	"result" : "Cup in",
	"latitude" : "35.613514",
	"longitude" : "138.931370"
}, {
	"date" : "2016-04-02",
	"hole" : 17,
	"count" : "0",
	"club" : "",
	"result" : "",
	"latitude" : "35.613703",
	"longitude" : "138.930626"
}, {
	"date" : "2016-04-02",
	"hole" : 10,
	"count" : "6",
	"club" : "Putter",
	"result" : "Cup in",
	"latitude" : "35.611547",
	"longitude" : "138.927304"
}, {
	"date" : "2016-04-02",
	"hole" : 2,
	"count" : "3",
	"club" : "Putter",
	"result" : "Green",
	"latitude" : "35.609108",
	"longitude" : "138.921941"
}, {
	"date" : "2016-04-02",
	"hole" : 17,
	"count" : "4",
	"club" : "AW",
	"result" : "Fairway",
	"latitude" : "35.612360",
	"longitude" : "138.926503"
}, {
	"date" : "2016-04-02",
	"hole" : 2,
	"count" : "2",
	"club" : "9I",
	"result" : "Green",
	"latitude" : "35.609112",
	"longitude" : "138.921894"
}, {
	"date" : "2016-04-02",
	"hole" : 7,
	"count" : "3",
	"club" : "AW",
	"result" : "Green",
	"latitude" : "35.613128",
	"longitude" : "138.922944"
}, {
	"date" : "2016-04-02",
	"hole" : 7,
	"count" : "5",
	"club" : "Putter",
	"result" : "Green",
	"latitude" : "35.612948",
	"longitude" : "138.922924"
}, {
	"date" : "2016-04-02",
	"hole" : 12,
	"count" : "4",
	"club" : "Putter",
	"result" : "Cup in",
	"latitude" : "35.608737",
	"longitude" : "138.928974"
}, {
	"date" : "2016-04-02",
	"hole" : 1,
	"count" : "0",
	"club" : "",
	"result" : "",
	"latitude" : "35.609357",
	"longitude" : "138.925547"
}, {
	"date" : "2016-04-02",
	"hole" : 1,
	"count" : "1",
	"club" : "3W",
	"result" : "Fairway",
	"latitude" : "35.608907",
	"longitude" : "138.923589"
}, {
	"date" : "2016-04-02",
	"hole" : 13,
	"count" : "2",
	"club" : "8I",
	"result" : "Rough",
	"latitude" : "35.612107",
	"longitude" : "138.929279"
}, {
	"date" : "2016-04-02",
	"hole" : 13,
	"count" : "4",
	"club" : "Putter",
	"result" : "Green",
	"latitude" : "35.612343",
	"longitude" : "138.929460"
}, {
	"date" : "2016-04-02",
	"hole" : 18,
	"count" : "1",
	"club" : "Driver",
	"result" : "Rough",
	"latitude" : "35.609889",
	"longitude" : "138.925918"
}, {
	"date" : "2016-04-02",
	"hole" : 10,
	"count" : "4",
	"club" : "Putter",
	"result" : "Green",
	"latitude" : "35.611538",
	"longitude" : "138.927281"
}, {
	"date" : "2016-04-02",
	"hole" : 18,
	"count" : "3",
	"club" : "SW",
	"result" : "Green",
	"latitude" : "35.608848",
	"longitude" : "138.926491"
}, {
	"date" : "2016-04-02",
	"hole" : 16,
	"count" : "4",
	"club" : "Putter",
	"result" : "Green",
	"latitude" : "35.613514",
	"longitude" : "138.931370"
}, {
	"date" : "2016-04-02",
	"hole" : 17,
	"count" : "1",
	"club" : "Driver",
	"result" : "Rough",
	"latitude" : "35.613341",
	"longitude" : "138.928207"
}, {
	"date" : "2016-04-02",
	"hole" : 17,
	"count" : "2",
	"club" : "7I",
	"result" : "Rough",
	"latitude" : "35.613113",
	"longitude" : "138.928097"
}, {
	"date" : "2016-04-02",
	"hole" : 17,
	"count" : "5",
	"club" : "9I",
	"result" : "Green",
	"latitude" : "35.612350",
	"longitude" : "138.926438"
}, {
	"date" : "2016-04-02",
	"hole" : 17,
	"count" : "7",
	"club" : "Putter",
	"result" : "Green",
	"latitude" : "35.612194",
	"longitude" : "138.926355"
}, {
	"date" : "2016-04-02",
	"hole" : 9,
	"count" : "6",
	"club" : "Putter",
	"result" : "Cup in",
	"latitude" : "35.608832",
	"longitude" : "138.925234"
}, {
	"date" : "2016-04-02",
	"hole" : 18,
	"count" : "5",
	"club" : "Putter",
	"result" : "Cup in",
	"latitude" : "35.608880",
	"longitude" : "138.926498"
}, {
	"date" : "2016-04-02",
	"hole" : 8,
	"count" : "6",
	"club" : "9I",
	"result" : "Green",
	"latitude" : "35.610464",
	"longitude" : "138.921087"
}, {
	"date" : "2016-04-02",
	"hole" : 8,
	"count" : "7",
	"club" : "Putter",
	"result" : "Green",
	"latitude" : "35.610391",
	"longitude" : "138.921192"
}, {
	"date" : "2016-04-02",
	"hole" : 18,
	"count" : "0",
	"club" : "",
	"result" : "",
	"latitude" : "35.611680",
	"longitude" : "138.926733"
}, {
	"date" : "2016-04-02",
	"hole" : 8,
	"count" : "1",
	"club" : "Driver",
	"result" : "Rough",
	"latitude" : "35.612114",
	"longitude" : "138.921945"
}, {
	"date" : "2016-04-02",
	"hole" : 8,
	"count" : "5",
	"club" : "SW",
	"result" : "Rough",
	"latitude" : "35.610610",
	"longitude" : "138.920901"
}, {
	"date" : "2016-04-02",
	"hole" : 15,
	"count" : "1",
	"club" : "8I",
	"result" : "Green",
	"latitude" : "35.610784",
	"longitude" : "138.930072"
}, {
	"date" : "2016-04-02",
	"hole" : 2,
	"count" : "0",
	"club" : "",
	"result" : "",
	"latitude" : "35.608442",
	"longitude" : "138.921039"
}, {
	"date" : "2016-04-02",
	"hole" : 4,
	"count" : "3",
	"club" : "AW",
	"result" : "Fairway",
	"latitude" : "35.610503",
	"longitude" : "138.922575"
}, {
	"date" : "2016-04-02",
	"hole" : 5,
	"count" : "1",
	"club" : "6I",
	"result" : "Rough",
	"latitude" : "35.612211",
	"longitude" : "138.923080"
}, {
	"date" : "2016-04-02",
	"hole" : 15,
	"count" : "0",
	"club" : "",
	"result" : "",
	"latitude" : "35.609848",
	"longitude" : "138.930029"
}, {
	"date" : "2016-04-02",
	"hole" : 11,
	"count" : "4",
	"club" : "Putter",
	"result" : "Green",
	"latitude" : "35.608791",
	"longitude" : "138.927432"
}, {
	"date" : "2016-04-02",
	"hole" : 11,
	"count" : "5",
	"club" : "Putter",
	"result" : "Cup in",
	"latitude" : "35.608791",
	"longitude" : "138.927432"
}, {
	"date" : "2016-04-02",
	"hole" : 15,
	"count" : "2",
	"club" : "Putter",
	"result" : "Green",
	"latitude" : "35.610724",
	"longitude" : "138.930061"
}, {
	"date" : "2016-04-02",
	"hole" : 15,
	"count" : "3",
	"club" : "Putter",
	"result" : "Cup in",
	"latitude" : "35.610724",
	"longitude" : "138.930061"
}, {
	"date" : "2016-04-02",
	"hole" : 5,
	"count" : "3",
	"club" : "Putter",
	"result" : "Green",
	"latitude" : "35.612133",
	"longitude" : "138.923221"
}, {
	"date" : "2016-04-02",
	"hole" : 6,
	"count" : "0",
	"club" : "",
	"result" : "",
	"latitude" : "35.611706",
	"longitude" : "138.923715"
}, {
	"date" : "2016-04-02",
	"hole" : 16,
	"count" : "1",
	"club" : "Driver",
	"result" : "Rough",
	"latitude" : "35.612847",
	"longitude" : "138.930907"
}, {
	"date" : "2016-04-02",
	"hole" : 14,
	"count" : "4",
	"club" : "9I",
	"result" : "Green",
	"latitude" : "35.609129",
	"longitude" : "138.929716"
}, {
	"date" : "2016-04-02",
	"hole" : 18,
	"count" : "4",
	"club" : "Putter",
	"result" : "Green",
	"latitude" : "35.608880",
	"longitude" : "138.926498"
}, {
	"date" : "2016-04-02",
	"hole" : 4,
	"count" : "0",
	"club" : "",
	"result" : "",
	"latitude" : "35.611505",
	"longitude" : "138.926045"
}, {
	"date" : "2016-04-02",
	"hole" : 4,
	"count" : "2",
	"club" : "4I",
	"result" : "Rough",
	"latitude" : "35.610795",
	"longitude" : "138.922402"
}, {
	"date" : "2016-04-02",
	"hole" : 17,
	"count" : "6",
	"club" : "Putter",
	"result" : "Green",
	"latitude" : "35.612270",
	"longitude" : "138.926369"
}, {
	"date" : "2016-04-02",
	"hole" : 5,
	"count" : "0",
	"club" : "",
	"result" : "",
	"latitude" : "35.611098",
	"longitude" : "138.922442"
}, {
	"date" : "2016-04-02",
	"hole" : 14,
	"count" : "1",
	"club" : "3W",
	"result" : "Fairway",
	"latitude" : "35.611259",
	"longitude" : "138.929612"
}, {
	"date" : "2016-04-02",
	"hole" : 14,
	"count" : "6",
	"club" : "Putter",
	"result" : "Cup in",
	"latitude" : "35.609111",
	"longitude" : "138.929754"
}, {
	"date" : "2016-04-02",
	"hole" : 12,
	"count" : "0",
	"club" : "",
	"result" : "",
	"latitude" : "35.608260",
	"longitude" : "138.927590"
}, {
	"date" : "2016-04-02",
	"hole" : 12,
	"count" : "1",
	"club" : "7I",
	"result" : "Green",
	"latitude" : "35.608799",
	"longitude" : "138.928818"
}, {
	"date" : "2016-04-02",
	"hole" : 12,
	"count" : "3",
	"club" : "Putter",
	"result" : "Green",
	"latitude" : "35.608737",
	"longitude" : "138.928974"
}, {
	"date" : "2016-04-02",
	"hole" : 13,
	"count" : "0",
	"club" : "",
	"result" : "",
	"latitude" : "35.609599",
	"longitude" : "138.928585"
}, {
	"date" : "2016-04-02",
	"hole" : 13,
	"count" : "1",
	"club" : "Driver",
	"result" : "Fairway",
	"latitude" : "35.611334",
	"longitude" : "138.928892"
}, {
	"date" : "2016-04-02",
	"hole" : 2,
	"count" : "4",
	"club" : "Putter",
	"result" : "Cup in",
	"latitude" : "35.609108",
	"longitude" : "138.921941"
}, {
	"date" : "2016-04-02",
	"hole" : 12,
	"count" : "2",
	"club" : "Putter",
	"result" : "Green",
	"latitude" : "35.608749",
	"longitude" : "138.928951"
}, {
	"date" : "2016-04-02",
	"hole" : 13,
	"count" : "6",
	"club" : "Putter",
	"result" : "Cup in",
	"latitude" : "35.612387",
	"longitude" : "138.929515"
}, {
	"date" : "2016-04-02",
	"hole" : 5,
	"count" : "4",
	"club" : "Putter",
	"result" : "Cup in",
	"latitude" : "35.612135",
	"longitude" : "138.923226"
}, {
	"date" : "2016-04-02",
	"hole" : 17,
	"count" : "3",
	"club" : "7I",
	"result" : "Rough",
	"latitude" : "35.612575",
	"longitude" : "138.927325"
}, {
	"date" : "2016-04-02",
	"hole" : 17,
	"count" : "8",
	"club" : "Putter",
	"result" : "Cup in",
	"latitude" : "35.612188",
	"longitude" : "138.926347"
}, {
	"date" : "2016-04-02",
	"hole" : 8,
	"count" : "2",
	"club" : "7I",
	"result" : "Rough",
	"latitude" : "35.611807",
	"longitude" : "138.921223"
}, {
	"date" : "2016-04-02",
	"hole" : 8,
	"count" : "8",
	"club" : "Putter",
	"result" : "Cup in",
	"latitude" : "35.610404",
	"longitude" : "138.921209"
}, {
	"date" : "2016-04-02",
	"hole" : 11,
	"count" : "1",
	"club" : "Driver",
	"result" : "Rough",
	"latitude" : "35.609944",
	"longitude" : "138.927802"
}, {
	"date" : "2016-04-02",
	"hole" : 11,
	"count" : "2",
	"club" : "8I",
	"result" : "Green",
	"latitude" : "35.608992",
	"longitude" : "138.927482"
}, {
	"date" : "2016-04-02",
	"hole" : 11,
	"count" : "3",
	"club" : "Putter",
	"result" : "Green",
	"latitude" : "35.608820",
	"longitude" : "138.927443"
}, {
	"date" : "2016-04-02",
	"hole" : 9,
	"count" : "3",
	"club" : "PW",
	"result" : "Fairway",
	"latitude" : "35.608877",
	"longitude" : "138.925465"
}, {
	"date" : "2016-04-02",
	"hole" : 13,
	"count" : "3",
	"club" : "AW",
	"result" : "Green",
	"latitude" : "35.612283",
	"longitude" : "138.929414"
}, {
	"date" : "2016-04-02",
	"hole" : 13,
	"count" : "5",
	"club" : "Putter",
	"result" : "Green",
	"latitude" : "35.612387",
	"longitude" : "138.929515"
}, {
	"date" : "2016-04-02",
	"hole" : 5,
	"count" : "2",
	"club" : "AW",
	"result" : "Green",
	"latitude" : "35.612154",
	"longitude" : "138.923208"
}, {
	"date" : "2016-04-02",
	"hole" : 6,
	"count" : "1",
	"club" : "3W",
	"result" : "Rough",
	"latitude" : "35.612329",
	"longitude" : "138.925379"
}, {
	"date" : "2016-04-02",
	"hole" : 14,
	"count" : "2",
	"club" : "7I",
	"result" : "Fairway",
	"latitude" : "35.610264",
	"longitude" : "138.929178"
}, {
	"date" : "2016-04-02",
	"hole" : 6,
	"count" : "2",
	"club" : "5I",
	"result" : "Fairway",
	"latitude" : "35.613078",
	"longitude" : "138.926028"
}, {
	"date" : "2016-04-02",
	"hole" : 3,
	"count" : "2",
	"club" : "7I",
	"result" : "Fairway",
	"latitude" : "35.610468",
	"longitude" : "138.925400"
}, {
	"date" : "2016-04-02",
	"hole" : 3,
	"count" : "3",
	"club" : "PW",
	"result" : "Fairway",
	"latitude" : "35.610761",
	"longitude" : "138.925801"
}, {
	"date" : "2016-04-02",
	"hole" : 3,
	"count" : "4",
	"club" : "PW",
	"result" : "Green",
	"latitude" : "35.610923",
	"longitude" : "138.925951"
}, {
	"date" : "2016-04-02",
	"hole" : 3,
	"count" : "5",
	"club" : "Putter",
	"result" : "Cup in",
	"latitude" : "35.610893",
	"longitude" : "138.925972"
}, {
	"date" : "2016-04-02",
	"hole" : 4,
	"count" : "5",
	"club" : "Putter",
	"result" : "Cup in",
	"latitude" : "35.610574",
	"longitude" : "138.922464"
}, {
	"date" : "2016-04-02",
	"hole" : 9,
	"count" : "2",
	"club" : "5I",
	"result" : "Fairway",
	"latitude" : "35.608614",
	"longitude" : "138.924645"
}, {
	"date" : "2016-04-02",
	"hole" : 4,
	"count" : "4",
	"club" : "Putter",
	"result" : "Green",
	"latitude" : "35.610583",
	"longitude" : "138.922440"
}, {
	"date" : "2016-04-02",
	"hole" : 8,
	"count" : "0",
	"club" : "",
	"result" : "",
	"latitude" : "35.613446",
	"longitude" : "138.922880"
}, {
	"date" : "2016-04-02",
	"hole" : 9,
	"count" : "1",
	"club" : "3W",
	"result" : "Rough",
	"latitude" : "35.608000",
	"longitude" : "138.923541"
}, {
	"date" : "2016-04-02",
	"hole" : 9,
	"count" : "4",
	"club" : "9I",
	"result" : "Green",
	"latitude" : "35.608836",
	"longitude" : "138.925140"
}, {
	"date" : "2016-04-02",
	"hole" : 10,
	"count" : "2",
	"club" : "5I",
	"result" : "Rough",
	"latitude" : "35.611296",
	"longitude" : "138.927085"
}, {
	"date" : "2016-04-02",
	"hole" : 11,
	"count" : "0",
	"club" : "",
	"result" : "",
	"latitude" : "35.612005",
	"longitude" : "138.928452"
}, {
	"date" : "2016-04-02",
	"hole" : 16,
	"count" : "3",
	"club" : "SW",
	"result" : "Green",
	"latitude" : "35.613532",
	"longitude" : "138.931329"
}, {
	"date" : "2016-04-02",
	"hole" : 3,
	"count" : "0",
	"club" : "",
	"result" : "",
	"latitude" : "35.609649",
	"longitude" : "138.923671"
}, {
	"date" : "2016-04-02",
	"hole" : 7,
	"count" : "6",
	"club" : "Putter",
	"result" : "Cup in",
	"latitude" : "35.612953",
	"longitude" : "138.922943"
}, {
	"date" : "2016-04-02",
	"hole" : 1,
	"count" : "2",
	"club" : "UT",
	"result" : "Green",
	"latitude" : "35.60844",
	"longitude" : "138.921939"
}, {
	"date" : "2016-04-02",
	"hole" : 10,
	"count" : "0",
	"club" : "",
	"result" : "",
	"latitude" : "35.608842",
	"longitude" : "138.926960"
}, {
	"date" : "2016-04-02",
	"hole" : 10,
	"count" : "1",
	"club" : "Driver",
	"result" : "Fairway",
	"latitude" : "35.610439",
	"longitude" : "138.927438"
}, {
	"date" : "2016-04-02",
	"hole" : 10,
	"count" : "3",
	"club" : "AW",
	"result" : "Green",
	"latitude" : "35.611379",
	"longitude" : "138.927255"
}, {
	"date" : "2016-04-02",
	"hole" : 10,
	"count" : "5",
	"club" : "Putter",
	"result" : "Green",
	"latitude" : "35.611547",
	"longitude" : "138.927304"
}, {
	"date" : "2016-04-02",
	"hole" : 14,
	"count" : "0",
	"club" : "",
	"result" : "",
	"latitude" : "35.612731",
	"longitude" : "138.930360"
}, {
	"date" : "2016-04-02",
	"hole" : 14,
	"count" : "3",
	"club" : "7I",
	"result" : "Fairway",
	"latitude" : "35.609220",
	"longitude" : "138.929513"
}, {
	"date" : "2016-04-02",
	"hole" : 14,
	"count" : "5",
	"club" : "Putter",
	"result" : "Green",
	"latitude" : "35.609111",
	"longitude" : "138.929754"
}, {
	"date" : "2016-04-02",
	"hole" : 6,
	"count" : "4",
	"club" : "Putter",
	"result" : "Green",
	"latitude" : "35.613295",
	"longitude" : "138.926393"
} ];

// 文書を作成する。
var insertDocument = function(db, list) {
	list.forEach(function(doc) {
		db.insert(doc, function(err) {
			console.log('文書を作成します。');
			if (!err) {
				console.log(doc);
			} else {
				console.log(err);
			}
		});
	});
};

// 関数を読込み設計文書を作成する。
var insertDesignDocument = function(db, doc) {
	db.insert(doc, function(err) {
		if (!err) {
			console.log('設計文書[%s]を作成しました。', doc._id);
			console.log(doc);
		} else {
			console.log(err);
		}
	});
};

// データベースを作成する。
var createDatabese = function(database, doc) {
	// データベースの存在をチェックする。
	context.cloudant.db.get(database, function(err, body) {
		if (err && err.error === 'not_found') {
			console.log('アプリに必要なデータベースがありません。');
			context.cloudant.db.create(database, function(err) {
				if (!err) {
					console.log('データベース[%s]を作成しました。', database);
					// ビューを作成する。
					var db = context.cloudant.db.use(database);
					insertDesignDocument(db, doc);
					// サンプルデータをロードする。
					insertDocument(db, SAMPLE_DATA);
				} else {
					console.log(err);
				}
			});
		} else {
			// ビューの存在をチェックする。
			var db = context.cloudant.db.use(database);
			db.get(doc._id, function(err, body) {
				if (!body) {
					// ビューが無いため作成する。
					console.log('アプリに必要な設計文書がありません。');
					insertDesignDocument(db, doc);
				}
			});
		}
	});
};

createDatabese(context.DB_NAME, DESIGN_DOCUMENT);