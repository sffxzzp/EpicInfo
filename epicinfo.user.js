// ==UserScript==
// @name         Epic Info
// @author       sffxzzp
// @namespace    https://github.com/sffxzzp
// @description  快速匹配 Epic 游戏信息
// @match        *://steamdb.keylol.com/sync
// @match        *://steamdb.sinaapp.com/sync
// @match        *://keylol.com/*
// @match        *://www.steamgifts.com/discussion/*
// @match        *://www.epicgames.com/account/v2/payment/ajaxGetOrderHistory*
// @grant        GM_xmlhttpRequest
// @grant        GM_openInTab
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @version      1.04
// @connect      www.epicgames.com
// @connect      store-content.ak.epicgames.com
// @resource     offerid https://raw.githubusercontent.com/sffxzzp/EpicInfo/main/offerid.json
// @resource     namespace https://raw.githubusercontent.com/sffxzzp/EpicInfo/main/namespace.json
// @resource     patch https://raw.githubusercontent.com/sffxzzp/EpicInfo/main/patch.json
// @resource     namespaceold https://store-content.ak.epicgames.com/api/content/productmapping
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAB0CAMAAABE6mf9AAABZVBMVEUAAAD////////////Kysr////////////////7+/v9/f3////f399WVlYYGBi2trb5+fn+/v7Q0ND////+/v7+/v77+/v5+fn////8/Pz////8/Pz///+qqqrS0tL8/PzZ2dnPz8/////////////Ly8v+/v6SkpL///+tra2lpaX////Z2dn39/fGxsb+/v75+fn9/f3U1NT9/f38/Pz////8/Pz9/f39/f3f39/39/f5+fn7+/u2trb8/PyTk5P9/f3n5+f+/v74+Pjc3Nz9/f36+vr29vb7+/v///+5ubn8/Pze3t79/f2hoaH7+/v6+vr09PT29vbi4uK2trbBwcH6+vr7+/v////7+/vZ2dnr6+v19fX6+vr5+fnm5uaenp7ExMTe3t7+/v7b29v19fX////T09POzs7Ly8u3t7f5+fnHx8fn5+fS0tLNzc3AwMC9vb309PTIyMjh4eHc3Nz///9NXM+cAAAAdnRSTlMA+/D2BPT55VIRCe0mCAQJ44oZ3KWEwiXozYEcqzAc6x8U067gVJpS4jgWw40ZEtm7lg2hIbtwYw1lB9fIPxUOaS91VyN/Ku/SspmUj45US0U1MCxoSObczXxIQjqtqk9EPoZaOre2hGQsHvJ6d1mAUHBdp6J24GlrDAAACARJREFUaN7tmvlb2jAYx5s0LZTqKhRsOTaxdKzKwAMExxgiCJMxpsKct85jl7sv/v4lQQYIgld3PI/fn5I8aT59efO+Sd8HhkHp5SmNrZkjVgtaw4hBMY8GzWFQCtRcChN2GaBmpoARZJY1MxmUApkgrJkuRuNrposxm0EhXcZuIDeQ/xcCoNgqDpAU1+xDtpGDeFjvN7qi5UQi2w8C9ClPq3ZUwIbszX6pqKk8XVQrkX45xNKePpM/tFIdegI63xvCp/YdQlPhBxqA5WpzIO2tZIYhyeC+CulXS6TDDT9QBNuJhNghJveEDN++xTQlfVoE0OVgWoSEzV2I13UOkN4dO8TAyb1I6xTBGuKvAqGDq6/YVgh4+AAz2iiH+lUhzPjXoVYIt4ubbbr1boc9B0Rq+uQEggSv1ysg0hxcHeZbICNvIvUJMUWJpemMY4/YHyJtZhu7qwEJZ30BX3YAkeXe7XJNCFh7O0cX3liX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
// @downloadURL  https://github.com/sffxzzp/EpicInfo/raw/main/epicinfo.user.js
// @updateURL    https://github.com/sffxzzp/EpicInfo/raw/main/epicinfo.user.js
// ==/UserScript==

(function () {
    function getNamespace() {
        var namespace = JSON.parse(GM_getResourceText('namespace'));
        var namespaceold = JSON.parse(GM_getResourceText('namespaceold'));
        var patch = JSON.parse(GM_getResourceText('patch'));
        Object.assign(namespace, namespaceold);
        for (let ns in namespace) {
            namespace[ns] = `p(roduct)?/${namespace[ns]}(/home)?$`;
        }
        // patch some old bundles.
        for (let p in patch) {
            namespace[p] = patch[p];
        }
        return namespace;
    }
    function getOfferID() {
        var offerid = JSON.parse(GM_getResourceText('offerid'));
        for (let of in offerid) {
            offerid[of] = `p(roduct)?/${offerid[of]}(/home)?$`;
        }
        return offerid;
    }
    function get(nextPageToken) {
        var nextLink = '';
        if (nextPageToken != "START" && nextPageToken != null) { nextLink = '&nextPageToken=' + nextPageToken; }
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: 'GET',
                // sortDir=DESC&sortBy=DATE is currently useless
                url: 'https://www.epicgames.com/account/v2/payment/ajaxGetOrderHistory?locale=zh-Hans'+nextLink,
                timeout: 3e4,
                onload: function (res) {
                    try {
                        resolve(JSON.parse(res.response));
                    }
                    catch (err) {
                        document.getElementById('epic_page').innerHTML = '错误';
                        GM_openInTab('https://www.epicgames.com/account/v2/payment/ajaxGetOrderHistory?locale=zh-Hans', false);
                    }
                },
                onerror: reject,
                ontimeout: reject
            });
        });
    }
    function parsePage(orders, namespace, offerid) {
        var data = [];
        orders.forEach(function (order) {
            if (order.orderType == 'PURCHASE') {
                order.items.forEach(function (game) {
                    if (offerid.hasOwnProperty(game.offerId)) {
                        if (data.indexOf(offerid[game.offerId]) < 0) {
                            data = data.concat(offerid[game.offerId]);
                        }
                    } else if (namespace.hasOwnProperty(game.namespace)) {
                        if (data.indexOf(namespace[game.namespace]) < 0) {
                            data = data.concat(namespace[game.namespace]);
                        }
                    }
                });
            }
        });
        return data;
    }
    async function loadEpic() {
        var page = 0;
        var exit = 0;
        var data = [];
        var nextPageToken = "START";
        var namespace = getNamespace();
        var offerid = getOfferID();
        while (nextPageToken != null) {
            document.getElementById('epic_page').innerHTML = `第 ${page+1} 页`;
            var pageData = await get(nextPageToken);
            nextPageToken = pageData.nextPageToken;
            data = data.concat(parsePage(pageData.orders, namespace, offerid));
            page += 1;
        }
        document.getElementById('epic_page').innerHTML = '完成';
        document.getElementById('epic_num').innerHTML = data.length;
        GM_setValue('epic', JSON.stringify(data));
        document.getElementById('epic_before').style.display = 'none';
        document.getElementById('epic_after').style.display = '';
    }
    function loadWebsite() {
        var data = GM_getValue('epic');
        if (data) {
            data = JSON.parse(data);
        }
        var selector = 'a';
        if (location.href.indexOf('keylol.com') > 0) {
            selector = '[id^=pid] a';
        }
        document.querySelectorAll(selector).forEach(function (a) {
            if (a.href.indexOf('epicgames.com')>-1) {
                for (var game of data) {
                    if ((new RegExp(game)).test(a.href)) {
                        a.style = 'background-color: darkorange; color: white;';
                    }
                }
            }
        });
    }
    if (document.URL == 'https://steamdb.keylol.com/sync' || document.URL == 'http://steamdb.sinaapp.com/sync') {
        GM_addStyle('.row-fluid {display: flex; flex-wrap: wrap; justify-content: space-between;} .row-fluid:before, .row-fluid:after {display: none !important;} .span6 {margin-left: 0px !important;}');
        var newspan = document.createElement('div');
        newspan.className = 'span6';
        newspan.innerHTML = '<h3>正在读取你的 Epic 游戏库 <span id="epic_page">第 1 页</span></h3><div id="epic_before" class="progress progress-success progress-striped active"><div style="width: 100%;" class="bar"></div></div><div id="epic_after" style="display: none;" class="alert alert-success"><strong>成功读取并记录了 <span id="epic_num">0</span> 个条目</strong></div>';
        document.getElementById('withScript').appendChild(newspan);
        var trash = document.querySelector('.icon-trash').onclick;
        document.querySelector('#reset').onclick = function () {
            GM_deleteValue('epic');
            trash();
        }
        loadEpic();
    }
    else if (document.URL.indexOf('https://www.epicgames.com/account/v2/payment/ajaxGetOrderHistory')>-1) {
        alert('该弹出页面用于解决同步错误。\n请在页面完整打开后，刷新同步页面。');
    }
    else {
        loadWebsite();
    }
})();
