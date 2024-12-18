// ==UserScript==
// @name         Epic Info Enhanced
// @author       sffxzzp
// @namespace    https://github.com/sffxzzp
// @description  快速匹配 Epic 游戏信息
// @match        *://steamdb.keylol.com/sync
// @match        *://steamdb.sinaapp.com/sync
// @match        *://keylol.com/*
// @match        *://www.steamgifts.com/discussion/*
// @grant        GM_xmlhttpRequest
// @grant        GM_openInTab
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_getResourceText
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        unsafeWindow
// @version      1.01
// @connect      account-public-service-prod03.ol.epicgames.com
// @connect      library-service.live.use1a.on.epicgames.com
// @connect      store.epicgames.com
// @connect      launcher.store.epicgames.com
// @resource     namespace https://raw.githubusercontent.com/sffxzzp/EpicInfo/main/namespace.json
// @resource     namespaceold https://store-content.ak.epicgames.com/api/content/productmapping
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAB0CAMAAABE6mf9AAABZVBMVEUAAAD////////////Kysr////////////////7+/v9/f3////f399WVlYYGBi2trb5+fn+/v7Q0ND////+/v7+/v77+/v5+fn////8/Pz////8/Pz///+qqqrS0tL8/PzZ2dnPz8/////////////Ly8v+/v6SkpL///+tra2lpaX////Z2dn39/fGxsb+/v75+fn9/f3U1NT9/f38/Pz////8/Pz9/f39/f3f39/39/f5+fn7+/u2trb8/PyTk5P9/f3n5+f+/v74+Pjc3Nz9/f36+vr29vb7+/v///+5ubn8/Pze3t79/f2hoaH7+/v6+vr09PT29vbi4uK2trbBwcH6+vr7+/v////7+/vZ2dnr6+v19fX6+vr5+fnm5uaenp7ExMTe3t7+/v7b29v19fX////T09POzs7Ly8u3t7f5+fnHx8fn5+fS0tLNzc3AwMC9vb309PTIyMjh4eHc3Nz///9NXM+cAAAAdnRSTlMA+/D2BPT55VIRCe0mCAQJ44oZ3KWEwiXozYEcqzAc6x8U067gVJpS4jgWw40ZEtm7lg2hIbtwYw1lB9fIPxUOaS91VyN/Ku/SspmUj45US0U1MCxoSObczXxIQjqtqk9EPoZaOre2hGQsHvJ6d1mAUHBdp6J24GlrDAAACARJREFUaN7tmvlb2jAYx5s0LZTqKhRsOTaxdKzKwAMExxgiCJMxpsKct85jl7sv/v4lQQYIgld3PI/fn5I8aT59efO+Sd8HhkHp5SmNrZkjVgtaw4hBMY8GzWFQCtRcChN2GaBmpoARZJY1MxmUApkgrJkuRuNrposxm0EhXcZuIDeQ/xcCoNgqDpAU1+xDtpGDeFjvN7qi5UQi2w8C9ClPq3ZUwIbszX6pqKk8XVQrkX45xNKePpM/tFIdegI63xvCp/YdQlPhBxqA5WpzIO2tZIYhyeC+CulXS6TDDT9QBNuJhNghJveEDN++xTQlfVoE0OVgWoSEzV2I13UOkN4dO8TAyb1I6xTBGuKvAqGDq6/YVgh4+AAz2iiH+lUhzPjXoVYIt4ubbbr1boc9B0Rq+uQEggSv1ysg0hxcHeZbICNvIvUJMUWJpemMY4/YHyJtZhu7qwEJZ30BX3YAkeXe7XJNCFh7O0cX3liX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
// @downloadURL  https://github.com/sffxzzp/EpicInfo/raw/main/epicinfoenhanced.user.js
// @updateURL    https://github.com/sffxzzp/EpicInfo/raw/main/epicinfoenhanced.user.js
// ==/UserScript==

(function() {
    var util = (function () {
        function util() {}
        util.xhr = function (xhrData) {
            return new Promise(function(resolve, reject) {
                GM_xmlhttpRequest({
                    method: xhrData.method || "get",
                    url: xhrData.url,
                    data: xhrData.data,
                    headers: xhrData.headers || {},
                    responseType: xhrData.type || "",
                    timeout: 3e5,
                    onload: function onload(res) {
                        return resolve({ response: res, body: res.response });
                    },
                    onerror: reject,
                    ontimeout: reject
                });
            });
        };
        util.createElement = function (data) {
            var node;
            if (data.node) {
                node = document.createElement(data.node);
                if (data.content) {this.setElement({node: node, content: data.content});}
                if (data.html) {node.innerHTML = data.html;}
            }
            return node;
        };
        util.setElement = function (data) {
            if (data.node) {
                for (let name in data.content) {data.node.setAttribute(name, data.content[name]);}
                if (data.html!=undefined) {data.node.innerHTML = data.html;}
            }
        };
        return util;
    })();
    var eie = (function () {
        var eie = function () {};
        eie.prototype.ua = 'UELauncher/11.0.1-14907503+++Portal+Release-Live Windows/10.0.19041.1.256.64bit';
        eie.prototype.authCode = GM_getValue('eie_authCode') || null;
        eie.prototype.user = GM_getValue('eie_user') || null;
        eie.prototype.library = GM_getValue('eie_library') || [];
        eie.prototype.menu = [];
        eie.prototype.setData = function (name, data) {
            GM_setValue('eie_'+name, data);
            this[name] = data;
        };
        eie.prototype.removeData = function (name) {
            GM_deleteValue('eie_'+name);
            this[name] = null;
        };
        eie.prototype.clearData = function () {
            this.removeData('authCode');
            this.removeData('user');
        };
        eie.prototype.clearMenu = function () {
            this.menu.forEach(function (menuid) {
                GM_unregisterMenuCommand(menuid);
            });
            this.menu = [];
            this.registerMenu();
        };
        eie.prototype.registerMenu = function () {
            let _this = this;
            if (_this.authCode == null && _this.user == null) {
                let loginMenuId = GM_registerMenuCommand('登录', function () {
                    alert('请在弹出的窗口中复制 authorizationCode，并使用另一个菜单按钮填写，以保存帐号登录信息');
                    GM_openInTab('https://www.epicgames.com/id/login?redirectUrl=https%3A//www.epicgames.com/id/api/redirect%3FclientId%3D34a02cf8f4414e29b15921876da36f9a%26responseType%3Dcode', false);
                });
                _this.menu.push(loginMenuId);
                let authMenuId = GM_registerMenuCommand('填写 authorizationCode', function () {
                    let auth = prompt('在此处填写 authorizationCode');
                    _this.setData('authCode', auth);
                    alert('保存完成');
                    _this.clearMenu();
                    location.reload();
                });
                _this.menu.push(authMenuId);
            } else {
                let logoutMenuId = GM_registerMenuCommand('清除信息', function () {
                    _this.clearData();
                    alert('清除成功');
                    _this.clearMenu();
                    location.reload();
                });
                _this.menu.push(logoutMenuId);
            }
        };
        eie.prototype.getLoginReq = function (type) {
            let data = {
                url: 'https://account-public-service-prod03.ol.epicgames.com/account/api/oauth/token',
                method: 'POST',
                headers: {
                    Authorization: `Basic MzRhMDJjZjhmNDQxNGUyOWIxNTkyMTg3NmRhMzZmOWE6ZGFhZmJjY2M3Mzc3NDUwMzlkZmZlNTNkOTRmYzc2Y2Y=`,
                    'User-Agent': this.ua,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            };
            if (type == 'authcode') {
                data.data = `grant_type=authorization_code&code=${this.authCode}&token_type=eg1`;
            }
            if (type == 'refreshtoken') {
                data.data = `grant_type=refresh_token&refresh_token=${encodeURIComponent(this.user.refresh_token)}&token_type=eg1`;
            }
            return data;
        };
        eie.prototype.loginByAuthCode = async function () {
            let _this = this;
            if (_this.authCode == null) { return; }
            let data = await util.xhr(this.getLoginReq('authcode')).then(res => res.body).then(res => JSON.parse(res));
            if (data.hasOwnProperty('errorCode')) {
                alert('错误，请尝试重新输入 authorizationCode 并重试');
            } else {
                _this.setData('user', data);
            }
        };
        eie.prototype.loginByRefreshToken = async function () {
            let _this = this;
            if (_this.user.refresh_token == null) { return; }
            let data = await util.xhr(this.getLoginReq('refreshtoken')).then(res => res.body).then(res => JSON.parse(res));
            if (data.hasOwnProperty('errorCode')) {
                alert('刷新 access_token 失败，请重试');
            } else {
                _this.setData('user', data);
            }
        };
        eie.prototype.login = async function () {
            let accessToken = '';
            if (this.user == null) {
                await this.loginByAuthCode();
            }
            if ((new Date(this.user.expires_at).getTime() - new Date().getTime()) < 600) {
                // if access token is about to be expired then get a new one.
                if ((new Date(this.user.refresh_expires_at).getTime() - new Date().getTime()) > 600) {
                    // if access token is expired but refresh token is not, then get a new access token by using refresh token
                    await this.loginByRefreshToken();
                } else {
                    // if all tokens are expired require for another auth code login
                    await this.loginByAuthCode();
                }
            }
            // must have a valid access token in this.user
        };
        eie.prototype.getLibraryReq = function (cursor) {
            if (!cursor) {
                cursor = '';
            }
            cursor = '&cursor='+cursor;
            return {
                url: 'https://library-service.live.use1a.on.epicgames.com/library/api/public/items?includeMetadata=true'+cursor,
                headers: {
                    Authorization: `${this.user.token_type} ${this.user.access_token}`,
                    'User-Agent': this.ua,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        };
        eie.prototype.getPageSlug = async function (ns) {
            let data = await util.xhr({
                url: 'https://launcher.store.epicgames.com/graphql',
                method: 'POST',
                data: JSON.stringify({"query": `{Catalog {catalogNs(namespace: "${ns}") {mappings (pageType: "productHome") {pageSlug pageType}}}}`}),
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) EpicGamesLauncher',
                    'Content-Type': 'application/json',
                },
            }).then(res => res.body).then(res => JSON.parse(res));
            if (!data.hasOwnProperty('errors')) {
                document.getElementById('epic_num_success').innerHTML = parseInt(document.getElementById('epic_num_success').innerHTML) + 1;
                if (data.data.Catalog.catalogNs.mappings.length > 0) {
                    return `p(roduct)?/${data.data.Catalog.catalogNs.mappings[0].pageSlug}(/home)?$`;
                } else {
                    return '';
                }
            }
        };
        eie.prototype.getLibrary = async function () {
            let page = 0;
            let _this = this;
            await _this.login();
            let tData = new Set();
            let data = await util.xhr(_this.getLibraryReq()).then(res => res.body).then(res => JSON.parse(res));
            let nextCursor = data.responseMetadata.nextCursor || null;
            data.records.forEach(function (app) {
                tData.add(app.namespace);
            });
            while (nextCursor) {
                document.getElementById('epic_page').innerHTML = `第 ${page+1} 页`;
                let data = await util.xhr(_this.getLibraryReq(nextCursor)).then(res => res.body).then(res => JSON.parse(res));
                nextCursor = data.responseMetadata.nextCursor || null;
                data.records.forEach(function (app) {
                    tData.add(app.namespace);
                });
                page += 1;
            }
            let namespace = _this.getNamespace();
            let library = [];
            let nstodo = [];
            tData.forEach(function (ns) {
                if (namespace[ns]) {
                    library.push(namespace[ns]);
                } else {
                    nstodo.push(ns);
                }
            });
            this.setData('library', library);
            document.getElementById('epic_before').style.display = 'none';
            document.getElementById('epic_after').style.display = '';
            document.getElementById('epic_page').innerHTML = '详细查询中';
            document.getElementById('epic_num').innerHTML = tData.size;
            document.getElementById('epic_num_success').innerHTML = library.length;
            for (let ns of nstodo) {
                let pageSlug = await _this.getPageSlug(ns);
                if (pageSlug != '') {
                    library.push(pageSlug);
                }
            };
            this.setData('library', library);
            document.getElementById('epic_page').innerHTML = '完成';
        };
        eie.prototype.getNamespace = function () {
            var namespace = JSON.parse(GM_getResourceText('namespace'));
            var namespaceold = JSON.parse(GM_getResourceText('namespaceold'));
            Object.assign(namespace, namespaceold);
            for (let ns in namespace) {
                namespace[ns] = `p(roduct)?/${namespace[ns]}(/home)?$`;
            }
            return namespace;
        };
        eie.prototype.loadSyncUI = function () {
            let _this = this;
            var newspan = document.createElement('div');
            newspan.className = 'span6';
            newspan.innerHTML = '<h3>正在读取你的 Epic 游戏库 <span id="epic_page">第 1 页</span></h3><div id="epic_before" class="progress progress-success progress-striped active"><div style="width: 100%;" class="bar"></div></div><div id="epic_after" style="display: none;" class="alert alert-success"><strong>成功读取并记录了 <span id="epic_num">0</span> 个条目，匹配成功 <span id="epic_num_success">0</span> 个条目</strong></div>';
            document.getElementById('withScript').appendChild(newspan);
            var trash = document.querySelector('.icon-trash').onclick;
            document.querySelector('#reset').onclick = function () {
                _this.removeData('library');
                trash();
            }
        };
        eie.prototype.load = function () {
            let _this = this;
            let selector = 'a';
            if (location.href.indexOf('keylol.com') > 0) {
                selector = '[id^=pid] a';
            }
            document.querySelectorAll(selector).forEach(function (a) {
                if (a.href.indexOf('epicgames.com')>-1) {
                    for (var game of _this.library) {
                        if ((new RegExp(game)).test(a.href)) {
                            a.style = 'background-color: darkorange; color: white;';
                        }
                    }
                }
            });
        };
        eie.prototype.run = function () {
            this.registerMenu();
            if (document.URL == 'https://steamdb.keylol.com/sync' || document.URL == 'http://steamdb.sinaapp.com/sync') {
                this.loadSyncUI();
                this.getLibrary();
            } else {
                this.load();
            }
        };
        return eie;
    })();
    let scr = new eie();
    scr.run();
})();
