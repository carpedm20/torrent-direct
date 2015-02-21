'use strict';

var torrentApp = angular.module('torrentApp', []);

var get_url = function(query, start) {
    return "https://www.google.co.kr/search?hl=ko&q="+query+"&start="+start+"&num=20&ie=UTF-8&oe=UTF-8";
}

var glob, http;
var linkSel = 'h3.r a',
    descSel = 'div.s',
    itemSel = 'li.g',
    nextSel = 'td.b a span';

var Item = function(title, href) {
	this.title = title;
	this.href = href;
	this.torrent = "";

	this.get_torrent = function() {
		if (this.href.indexOf("http://www.torrent82.com/") != -1) {
			var cid = this.href.split("/")[3],
			    tid = this.href.split("/")[4].split("?")[0];

			this.torrent = "http://www.torrent82.com/bbs/download.php?no=1&bo_table=" + cid + "&wr_id=" + tid
		} else {
			http.get(href).success(function(data) {
			});
		}
		console.log(this);
	}
	this.get_torrent();
}

var get_result = function(data) {
	var items = [];
    $(data).find(itemSel).each(function(i) {
        var linkElem = $(this).find(linkSel),
        	item = new Item($(linkElem).first().text(), (linkElem).first().attr('href'));
        items.push(item);
    });

    return items;
}

torrentApp.controller('torrentController', function($scope, $http) {
	http = $http;
    $http.get(get_url("왕좌의 게임 torrent", 0)).success(function(data) {
        console.log(data);
        glob=data;
    });
});