// cache the action
let cacheLog = []

class TileType {
    // 筒子
    static P = new TileType(0, "p");
    // 万字
    static M = new TileType(1, "m");
    // 索子
    static S = new TileType(2, "s");
    // 字牌
    static Z = new TileType(3, "");

    constructor(type, suffix) {
        this.type = type;
        this.suffix = suffix;
    }
}

// type 0: 筒子, 1: 万字, 2: 索子, 3: 字牌
const tileTypeArray = [TileType.P, TileType.M, TileType.S, TileType.Z];
// 1东，2南，3西，4北， 5 白， 6发， 7中
const zipai = ["", "E", "S", "W", "N", "P", "F", "C"];

// map mahjong soul tile type to mjai tile type
function soulTile2MjaiTile(tile) {
    const type = tileTypeArray[tile.type];
    switch (type) {
        case TileType.Z:
            return zipai[tile.index];
        default:
            return tile.index + type.suffix + (tile.dora && tile.index == 5 ? "r" : "");
    }
}

// convert tenhou tile to mjai format
const tenhouTile2MjaiTile = (tile) => {
    const tileMap = {
        '0s': '5sr',
        '0m': '5mr',
        '0p': '5pr',
        '1z': 'E',
        '2z': 'S',
        '3z': 'W',
        '4z': 'N',
        '5z': 'P',
        '6z': 'F',
        '7z': 'C',
    }
    return tileMap[tile] ? tileMap[tile] : tile;
}

// convert mjai to tenhou format
const mjaiTile2TenhouTile = (tile) => {
    const tileMap = {
        '5sr': '0s',
        '5mr': '0m',
        '5pr': '0p',
        'E': '1z',
        'S': '2z',
        'W': '3z',
        'N': '4z',
        'P': '5z',
        'F': '6z',
        'C': '7z',
    }
    return tileMap[tile] ? tileMap[tile] : tile;
}


function tsumo(actor, tile) {
    return {
        actor: actor, pai: tile, type: "tsumo",
    }
}

function dapai(actor, tile, tsumogiri) {
    return {
        actor: actor, pai: tile, tsumogiri: tsumogiri, type: "dahai",
    }
}


function pon(actor, target, tile, consumed) {
    return {
        actor: actor, target: target, pai: tile, consumed: consumed, type: "pon",
    }
}

function chi(actor, target, tile, consumed) {
    return {
        actor: actor, target: target, pai: tile, consumed: consumed, type: "chi",
    }
}

function kakan(actor, tile, consumed) {
    return {
        actor: actor, pai: tile, consumed: consumed, type: "kakan",
    }
}

function daiminkan(actor, target, tile, consumed) {
    return {
        actor: actor, target: target, pai: tile, consumed: consumed, type: "daiminkan",
    }
}

function ankan(actor, consumed) {
    return {
        actor: actor, consumed: consumed, type: "ankan",
    }
}

function reach(actor) {
    return {
        actor: actor, type: "reach",
    }
}

function reachAccepted(actor) {
    return {
        actor: actor, type: "reach_accepted",
    }
}

function doraMarker(tile) {
    return {
        type: "dora", dora_marker: tile,
    }
}

function gameStart() {
    return {"kyoku_first": 4, "aka_flag": true, "names": [], "type": "start_game"}
}

function start_kyoku(bakaze, kyoku, honba, kyotaku, oya, dora_marker, scores, tehais) {
    return {
        type: "start_kyoku", // 场风
        bakaze: bakaze, // 局
        kyoku: kyoku, // 本场
        honba: honba, // 供脱
        kyotaku: kyotaku, // 庄家
        oya: oya, dora_marker: dora_marker, scores: scores, tehais: tehais,
    }
}

// convert mahjong soul actions to mjai actions
function action2Mjai(action) {
    const name = action.name;
    const data = action.data;
    const mySeat = typeof view == 'undefined' ? 0 : view.DesktopMgr.Inst.seat;
    const res = []
    const bakazeList = ["E", "S", "W", "N"];
    switch (name) {
        case 'ActionNewRound':
            const tehais = []
            for (let i = 0; i < data.opens.length; i++) {
                if (mySeat == i) {
                    tehais.push(data.tiles.slice(0, 13).map(tenhouTile2MjaiTile));
                } else {
                    // get a 13 length array with all 0
                    if (data.ju != i) {
                        tehais.push(new Array(13).fill('?'));
                    } else {
                        tehais.push(new Array(14).fill('?'));
                    }
                    // tehais.push(Array.fill(13, "?"));
                }
            }
            res.push(start_kyoku(bakazeList[data.chang], data.ju + 1, data.ben, data.liqibang, data.ju, tenhouTile2MjaiTile(data.doras[0]), data.scores, tehais))
            if (data.tiles.length == 14) {
                res.push(tsumo(data.ju, tenhouTile2MjaiTile(data.tiles[13])))
            }
            break;

        case 'ActionDiscardTile':

            if (data.is_liqi) {
                res.push(reach(data.seat), dapai(data.seat, tenhouTile2MjaiTile(data.tile), data.moqie), reachAccepted(data.seat))
            }
            res.push(dapai(data.seat, tenhouTile2MjaiTile(data.tile), data.moqie));
            if (data.doras && data.doras.length > 0) {
                res.push(doraMarker(tenhouTile2MjaiTile(data.doras[data.doras.length - 1])));
            }
            break;

        case 'ActionDealTile':
            if (data.doras && data.doras.length > 0) {
                res.push(doraMarker(tenhouTile2MjaiTile(data.doras[data.doras.length - 1])));
            }
            if (data.tile) {
                res.push(tsumo(data.seat, tenhouTile2MjaiTile(data.tile)));
            }
            break;
        case 'ActionChiPengGang':
            const diffSeatIndex = data.froms.map((_, index) => index).filter((index) => data.froms[index] != data.seat)[0];
            const from = data.froms[diffSeatIndex];
            const pai = data.tiles[diffSeatIndex];
            const tiles = [...data.tiles];
            // delete the pai from tiles
            tiles.splice(diffSeatIndex, 1);
            if (data.type == 0) {
                res.push(chi(data.seat, from, tenhouTile2MjaiTile(pai), tiles.map(tenhouTile2MjaiTile)));
            } else if (data.type == 1) {
                res.push(pon(data.seat, from, tenhouTile2MjaiTile(pai), tiles.map(tenhouTile2MjaiTile)));
            } else if (data.type == 2) {
                res.push(daiminkan(data.seat, from, tenhouTile2MjaiTile(pai), tiles.map(tenhouTile2MjaiTile)));
            }

            break;

        case 'ActionAnGangAddGang':
            let consumed = [];
            let tile = data.tiles;
            if (tile == '0m' || tile == '5m') {
                consumed = ['0m', '5m', '5m', '5m']
            } else if (tile == '0p' || tile == '5p') {
                consumed = ['0p', '5p', '5p', '5p']
            } else if (tile == '0s' || tile == '5s') {
                consumed = ['0s', '5s', '5s', '5s']
            } else {
                consumed = [tile, tile, tile, tile];
            }
            if (data.type == 3) {
                res.push(ankan(data.seat, consumed.map(tenhouTile2MjaiTile)));
            } else if (data.type == 2) {
                // 加杠
                // remove the tile from consumed
                consumed.splice(consumed.indexOf(tile), 1);
                res.push(kakan(data.seat, tenhouTile2MjaiTile(tile), consumed.map(tenhouTile2MjaiTile)));
            }
            break;
    }
    return res;
}

function convertActions2Log(actions) {
    const log = [];
    log.push(gameStart());
    for (let i = 0; i < actions.length; i++) {
        const action = actions[i];
        const mjaiAction = action2Mjai(action);
        log.push(...mjaiAction);
    }

    return log;
}

function doDaHai(pai) {
    const player = view.DesktopMgr.Inst.players[0];
    const hand = player.hand;
    const indexList = hand.map((_, index) => index).filter(index => soulTile2MjaiTile(hand[index].val) == pai)
    if (indexList.length == 0) {
        return false;
    }
    callDiscard(indexList[0]);
}


// do action according to the log
async function handleAkochanResult(log) {
    if (log.length == 0 || log[0].length == 0) {
        return false;
    }
    const bestChoice = log[0];
    const bestMove = bestChoice.moves[0];
    console.log('bestMove', bestMove)
    const type = bestMove.type;
    switch (type) {
        case 'dahai':
            // const tile = mjaiTile2TenhouTile(bestMove.pai);
            doDaHai(bestMove.pai);
            break;
        case 'pon':
            makeCallWithOption(mjcore.E_PlayOperation.peng, bestMove.consumed.map(mjaiTile2TenhouTile).concat('|'));
            setTimeout(doDaHai, 1500, bestChoice.moves[1].pai);
            // doDaHai(bestChoice.moves[1].pai);
            break;
        case 'chi':
            makeCallWithOption(mjcore.E_PlayOperation.eat, bestMove.consumed.map(mjaiTile2TenhouTile).concat('|'));
            setTimeout(doDaHai, 1500, bestChoice.moves[1].pai);
            break;
        case 'kakan':
            makeCall(mjcore.E_PlayOperation.add_gang);
            break;
        case 'daiminkan':
            makeCall(mjcore.E_PlayOperation.ming_gang);
            break;
        case 'ankan':
            makeCall(mjcore.E_PlayOperation.an_gang);
            break;
        case 'reach':
            sendRiichiCall(mjaiTile2TenhouTile(bestChoice.moves[1].pai), bestChoice.moves[1].tsumogiri);
            break;
        case 'ryukyoku':
            // 流局
            sendAbortiveDrawCall();
            break;
        case 'hora':
            if (bestMove.target == bestMove.actor) {
                // 自摸
                callTsumo();
            } else {
                // 放铳
                callRon();
            }
            break;
        case 'none':
            // do nothing
            try {
                app.NetAgent.sendReq2MJ('FastTest', 'inputChiPengGang', {cancel_operation: true, timeuse: 2});
                view.DesktopMgr.Inst.WhenDoOperation();
            } catch {
                log("Failed to decline the Call. Maybe someone else was faster?");
            }
            break;
        default:
            return false;
    }
    return true;

}

async function requestServer(log, seat) {
    const controller = new AbortController();
    const signal = controller.signal;
    setTimeout(() => {
        controller.abort();
    }, 5000);
    return fetch('http://localhost:8787/akochan', {
        signal: signal, method: 'POST', headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify({
            actions: log, seat: seat
        }), mode: 'cors',
    })
}

// do syncGame when cache is empty
function syncActions() {
    return new Promise((resolve, reject) => {
        app.NetAgent.sendReq2MJ("FastTest", "syncGame", {
            round_id: view.DesktopMgr.Inst.round_id, step: view.DesktopMgr.Inst.current_step
        }, async function (H, S) {
            console.log("H", H);
            view.DesktopMgr.Inst.fetchLinks();
            view.DesktopMgr.Inst.Reset();
            view.DesktopMgr.Inst.duringReconnect = !0;
            view.DesktopMgr.Inst.syncGameByStep(S.game_restore);

            console.log(S.game_restore);
            // if (!S.game_restore) {
            //     resolve(false);
            //     return;
            // }
            let restore = S.game_restore;
            let actions = [];
            for (var idx = 0; idx < restore.actions.length; idx++) {
                var rawAction = restore.actions[idx];
                var action = net.ProtobufManager.lookupType("lq." + rawAction.name).decode(rawAction.data);
                actions.push({name: rawAction.name, data: action});
            }
            // view.DesktopMgr.Inst.setAutoMoQie(false);
            console.log(actions);
            const log = convertActions2Log(actions);
            cacheLog.push(...log);
            resolve();

        })

    });

}

async function doAkochan() {
    //  if cache is empty, request the game server and sync the game
    if (cacheLog.length == 0) {
        await syncActions();
    }

    const log = cacheLog;
    if (log.length > 0 && (log[log.length - 1].type == 'tsumo') || (log[log.length - 1].type == 'dahai') || (log[log.length - 1].type == 'kakan')) {
        const result = await requestServer(log, view.DesktopMgr.Inst.seat).then(res => res.json()).then(res => {
            console.log(res);
            if (Array.isArray(res)) {
                console.log(res[0].moves);
                return res;
            } else {
                return [];
            }
        }).catch(err => {
            console.log("超时了", err);
            return [];
        });
        console.log('result', result)

        return (handleAkochanResult(result));
    } else {
        return (false);
    }

}

/**
 * overload code.js
 */
function changeDefinition() {
    !function (Q) {
        var B = function (B) {
            function V() {
                return null !== B && B["apply"](this, arguments) || this;
            }

            return __extends(V, B), V.play = function (B) {
                console.log("ActionDiscardTile play data:" + JSON["stringify"](B));
                cacheLog.push(...action2Mjai({name: 'ActionDiscardTile', data: B}));
                app.Log.log("ActionDiscardTile play data:" + JSON["stringify"](B)), B["doras"] && Q["DesktopMgr"].Inst["WhenDoras"](B["doras"], !1);
                var V = B.seat, W = mjcore["MJPai"]["Create"](B.tile),
                    Z = !(null == B["is_liqi"] || void 0 == B["is_liqi"] || !B["is_liqi"]);
                if (B.muyu && Q["DesktopMgr"].Inst["onMuyuChange"](B.muyu, !0), Q["DesktopMgr"].Inst["players"][Q["DesktopMgr"].Inst["seat2LocalPosition"](V)]["AddQiPai"](W, Z, B["moqie"]), Q["DesktopMgr"].Inst["is_field_spell_mode"]() && uiscript["UI_FieldSpell"].Inst["onDiscard"](V, Z), Q["DesktopMgr"].Inst["is_zhanxing_mode"]() && uiscript["UI_Astrology"].Inst["alignTile"](), Z) {
                    B["is_wliqi"] ? Q["DesktopMgr"].Inst["players"][Q["DesktopMgr"].Inst["seat2LocalPosition"](V)]["PlaySound"]("act_drich") : Q["DesktopMgr"].Inst["players"][Q["DesktopMgr"].Inst["seat2LocalPosition"](V)]["PlaySound"]("act_rich");
                    var S = Q["DesktopMgr"].Inst["player_effects"][V][game["EView"]["lizhi_bgm"]];
                    if (S && 0 != S) {
                        var v = cfg["item_definition"].item.get(S)["sargs"][0];
                        Q["AudioMgr"]["lizhiMuted"] ? Q["AudioMgr"]["PlayLiqiBgm"](v, 300, !0) : (Q["BgmListMgr"]["stopBgm"](), Laya["timer"].once(1000, this, function () {
                            Q["DesktopMgr"].Inst["gameing"] && (Q["BgmListMgr"]["PlayMJBgm"]('', !0), Q["AudioMgr"]["PlayLiqiBgm"](v, 300, !0));
                        }));
                    }
                }
                var i = !1;
                !W["touming"] && B["tile_state"] && B["tile_state"] > 0 && (i = !0), V == Q["DesktopMgr"].Inst.seat ? Q["DesktopMgr"].Inst["mainrole"]["OnDiscardTile"](W, i, !1, B["moqie"]) : Q["DesktopMgr"].Inst["players"][Q["DesktopMgr"].Inst["seat2LocalPosition"](V)]["onDiscardTile"](B["moqie"], B.tile, i, !1), B["operation"] && Laya["timer"].once(500, this, function () {
                    Q["ActionOperation"].play(B["operation"]);
                }), void 0 != B["zhenting"] && void 0 == B["operation"] && (uiscript["UI_DesktopInfo"].Inst["setZhenting"](B["zhenting"]), uiscript["UI_TingPai"].Inst["setZhengting"](B["zhenting"])), V == Q["DesktopMgr"].Inst.seat && uiscript["UI_TingPai"].Inst["setData1"](B, !1), Laya["timer"].once(500, this, function () {
                    Z ? Q["DesktopMgr"].Inst["clearMindVoice"]() : Q["DesktopMgr"].Inst["playMindVoice"]();
                });
            }, V["fastplay"] = function (B, V) {
                app.Log.log("ActionDiscardTile fastplay data:" + JSON["stringify"](B) + " usetime:" + V), B["doras"] && Q["DesktopMgr"].Inst["WhenDoras"](B["doras"], !0);
                var W = B.seat, Z = mjcore["MJPai"]["Create"](B.tile),
                    S = !(null == B["is_liqi"] || void 0 == B["is_liqi"] || !B["is_liqi"]), v = !1;
                !Z["touming"] && B["tile_state"] && B["tile_state"] > 0 && (v = !0), Q["DesktopMgr"].Inst["players"][Q["DesktopMgr"].Inst["seat2LocalPosition"](W)]["AddQiPai"](Z, S, B["moqie"], !1), B.muyu && Q["DesktopMgr"].Inst["onMuyuChange"](B.muyu, !1), W == Q["DesktopMgr"].Inst.seat ? Q["DesktopMgr"].Inst["mainrole"]["OnDiscardTile"](Z, v, !0, B["moqie"]) : Q["DesktopMgr"].Inst["players"][Q["DesktopMgr"].Inst["seat2LocalPosition"](W)]["onDiscardTile"](B["moqie"], B.tile, v, !0), B["operation"] && -1 != V && Laya["timer"].once(500, this, function () {
                    Q["ActionOperation"].play(B["operation"], V);
                }), void 0 != B["zhenting"] && void 0 == B["operation"] && (uiscript["UI_DesktopInfo"].Inst["setZhenting"](B["zhenting"]), uiscript["UI_TingPai"].Inst["setZhengting"](B["zhenting"])), W == Q["DesktopMgr"].Inst.seat && uiscript["UI_TingPai"].Inst["setData1"](B, !0), Q["DesktopMgr"].Inst["is_field_spell_mode"]() && uiscript["UI_FieldSpell"].Inst["onDiscard"](W, S), Q["DesktopMgr"].Inst["is_zhanxing_mode"]() && uiscript["UI_Astrology"].Inst["alignTile"]();
            }, V["record"] = function (B, V) {
                void 0 === V && (V = 0), app.Log.log("ActionDiscardTile record data:" + JSON["stringify"](B)), B["doras"] && Q["DesktopMgr"].Inst["WhenDoras"](B["doras"], !0);
                var W = B.seat, Z = mjcore["MJPai"]["Create"](B.tile),
                    S = !(null == B["is_liqi"] || void 0 == B["is_liqi"] || !B["is_liqi"]), v = !1;
                if (!Z["touming"] && B["tile_state"] && B["tile_state"] > 0 && (v = !0), B.muyu && Q["DesktopMgr"].Inst["onMuyuChange"](B.muyu, !0), Q["DesktopMgr"].Inst["players"][Q["DesktopMgr"].Inst["seat2LocalPosition"](W)]["AddQiPai"](Z, S, B["moqie"]), S && (B["is_wliqi"] ? Q["DesktopMgr"].Inst["players"][Q["DesktopMgr"].Inst["seat2LocalPosition"](W)]["PlaySound"]("act_drich") : Q["DesktopMgr"].Inst["players"][Q["DesktopMgr"].Inst["seat2LocalPosition"](W)]["PlaySound"]("act_rich"), uiscript["UI_DesktopInfo"].Inst["changeHeadEmo"](W, "emoji_9", 2000)), W == Q["DesktopMgr"].Inst.seat ? Q["DesktopMgr"].Inst["mainrole"]["OnDiscardTile"](Z, v, !1, B["moqie"]) : Q["DesktopMgr"].Inst["players"][Q["DesktopMgr"].Inst["seat2LocalPosition"](W)]["recordDiscardTile"](Z, B["moqie"], v, !1), B["tingpais"] && Q["DesktopMgr"].Inst["setTingpai"](B.seat, B["tingpais"]), Q["DesktopMgr"].Inst.mode == Q["EMJMode"]["live_broadcast"] && uiscript["UI_Live_Broadcast"].Inst["during_play"] && B["operations"]) for (var i = 0; i < B["operations"]["length"]; i++) Q["ActionOperation"].ob(B["operations"][i], V, 450);
                return Q["DesktopMgr"].Inst["is_field_spell_mode"]() && uiscript["UI_FieldSpell"].Inst["onDiscard"](W, S), Q["DesktopMgr"].Inst["is_zhanxing_mode"]() && uiscript["UI_Astrology"].Inst["alignTile"](), 500;
            }, V["fastrecord"] = function (B, V) {
                void 0 === V && (V = -1), app.Log.log("ActionDiscardTile fastrecord data:" + JSON["stringify"](B)), B["doras"] && Q["DesktopMgr"].Inst["WhenDoras"](B["doras"], !0);
                var W = B.seat, Z = mjcore["MJPai"]["Create"](B.tile),
                    S = !(null == B["is_liqi"] || void 0 == B["is_liqi"] || !B["is_liqi"]), v = !1;
                if (!Z["touming"] && B["tile_state"] && B["tile_state"] > 0 && (v = !0), B.muyu && Q["DesktopMgr"].Inst["onMuyuChange"](B.muyu, !1), Q["DesktopMgr"].Inst["players"][Q["DesktopMgr"].Inst["seat2LocalPosition"](W)]["AddQiPai"](Z, S, B["moqie"], !1), W == Q["DesktopMgr"].Inst.seat ? Q["DesktopMgr"].Inst["mainrole"]["OnDiscardTile"](Z, v, !0, B["moqie"]) : Q["DesktopMgr"].Inst["players"][Q["DesktopMgr"].Inst["seat2LocalPosition"](W)]["recordDiscardTile"](Z, B["moqie"], v, !0), B["tingpais"] && Q["DesktopMgr"].Inst["setTingpai"](B.seat, B["tingpais"]), Q["DesktopMgr"].Inst.mode == Q["EMJMode"]["live_broadcast"] && uiscript["UI_Live_Broadcast"].Inst["during_play"] && V >= 0 && B["operations"]) for (var i = 0; i < B["operations"]["length"]; i++) Q["ActionOperation"].ob(B["operations"][i], V, 450);
                Q["DesktopMgr"].Inst["is_field_spell_mode"]() && uiscript["UI_FieldSpell"].Inst["onDiscard"](W, S), Q["DesktopMgr"].Inst["is_zhanxing_mode"]() && uiscript["UI_Astrology"].Inst["alignTile"]();
            }, V;
        }(Q["ActionBase"]);
        Q["ActionDiscardTile"] = B;
    }(view || (view = {}));


    !function (Q) {
        var B = function (B) {
            function V() {
                return null !== B && B["apply"](this, arguments) || this;
            }

            return __extends(V, B), V.play = function (B) {
                console.log("ActionNewRound play data:" + JSON["stringify"](B));
                cacheLog = [];
                cacheLog.push(gameStart());
                cacheLog.push(...action2Mjai({name: 'ActionNewRound', data: B}));
                var V = this;
                app.Log.log("ActionNewRound play data:" + JSON["stringify"](B)), Q["BgmListMgr"]["PlayMJBgm"](), Q["DesktopMgr"].Inst["index_change"] = B["chang"], Q["DesktopMgr"].Inst["index_chuanma_ju"] = B["ju_count"], Q["DesktopMgr"].Inst["index_ju"] = B.ju, Q["DesktopMgr"].Inst["index_ben"] = B.ben, Q["DesktopMgr"].Inst["index_player"] = B.ju, Q["DesktopMgr"].Inst["gameing"] = !0, Q["DesktopMgr"].Inst["left_tile_count"] = 69, Q["DesktopMgr"].Inst["rule_mode"] == Q["ERuleMode"]["Liqi4"] ? Q["DesktopMgr"].Inst["left_tile_count"] = 69 : Q["DesktopMgr"].Inst["rule_mode"] == Q["ERuleMode"]["Liqi3"] && (Q["DesktopMgr"].Inst["left_tile_count"] = 50), B["left_tile_count"] && (Q["DesktopMgr"].Inst["left_tile_count"] = B["left_tile_count"]), Q["DesktopMgr"].Inst["is_field_spell_mode"]() && (uiscript["UI_DesktopInfo"].Inst["OnNewCard"](null, !1), uiscript["UI_FieldSpell"].Inst["closeCardDetail"](), uiscript["UI_FieldSpell"].Inst["setZhuangState"](Q["DesktopMgr"].Inst["index_ju"] == Q["DesktopMgr"].Inst.seat), uiscript["UI_FieldSpell"].Inst["resetCounter"]()), Q["DesktopMgr"].Inst["is_zhanxing_mode"]() && uiscript["UI_Astrology"].Inst["Reset"](), uiscript["UI_DesktopInfo"].Inst["logUpEmoInfo"](), Q["DesktopMgr"].Inst["waiting_lingshang_deal_tile"] = !1, Q["DesktopMgr"].Inst["setAutoHule"](!1), Q["DesktopMgr"].Inst["setAutoMoQie"](!1), Q["DesktopMgr"].Inst["setAutoNoFulu"](!1), uiscript["UI_DesktopInfo"].Inst["resetFunc"](), uiscript["UI_TingPai"].Inst["reset"](), Q["DesktopMgr"].Inst["SetChangJuShow"](Q["DesktopMgr"].Inst["index_change"], Q["DesktopMgr"].Inst["index_ju"], Q["DesktopMgr"].Inst["index_chuanma_ju"]), uiscript["UI_DesktopInfo"].Inst["setBen"](Q["DesktopMgr"].Inst["index_ben"]), uiscript["UI_DesktopInfo"].Inst["setZhenting"](!1), uiscript["UI_DesktopInfo"].Inst["reset_rounds"](), uiscript["UI_DesktopInfo"].Inst["setLiqibang"](B["liqibang"]);
                for (var W = 0; 4 > W; W++) Q["DesktopMgr"].Inst["players"][W]["Reset"](), Q["DesktopMgr"].Inst["players"][W]["setSeat"](Q["DesktopMgr"].Inst["localPosition2Seat"](W));
                Q["DesktopMgr"].Inst["RefreshPlayerIndicator"](), Q["DesktopMgr"].Inst["RefreshPaiLeft"](), Q["DesktopMgr"].Inst["setScores"](B["scores"]), Q["DesktopMgr"].Inst.md5 = B.md5, Q["DesktopMgr"].Inst["choosed_pai"] = null, Q["DesktopMgr"].Inst.dora = [];
                var Z = 0;
                0 == Q["DesktopMgr"].Inst["index_change"] && 0 == Q["DesktopMgr"].Inst["index_ju"] && 0 == Q["DesktopMgr"].Inst["index_ben"] && (Q["DesktopMgr"].Inst["is_dora3_mode"]() && !Q["DesktopMgr"].Inst["is_muyu_mode"]() && (uiscript["UI_DesktopInfo"].Inst["openDora3BeginEffect"](), Z = 1300), Q["DesktopMgr"].Inst["is_peipai_open_mode"]() && (uiscript["UI_DesktopInfo"].Inst["openPeipaiOpenBeginEffect"](), Z = 1300), Q["DesktopMgr"].Inst["is_muyu_mode"]() && (uiscript["UI_DesktopInfo"].Inst["openMuyuOpenBeginEffect"](), Z = 1300), Q["DesktopMgr"].Inst["is_shilian_mode"]() && (uiscript["UI_DesktopInfo"].Inst["openShilianOpenBeginEffect"](), Z = 1300), Q["DesktopMgr"].Inst["is_xiuluo_mode"]() && (uiscript["UI_DesktopInfo"].Inst["openXiuluoOpenBeginEffect"](), Z = 1300), Q["DesktopMgr"].Inst["is_top_match"]() && (uiscript["UI_DesktopInfo"].Inst["openTopMatchOpenBeginEffect"](), Z = 1300), Q["DesktopMgr"].Inst["is_jiuchao_mode"]() && (uiscript["UI_DesktopInfo"].Inst["openJiuChaoBeginEffect"](), Z = 1300), Q["DesktopMgr"].Inst["is_reveal_mode"]() && (uiscript["UI_DesktopInfo"].Inst["openAnPaiBeginEffect"](), Z = 1300), Q["DesktopMgr"].Inst["is_zhanxing_mode"]() && (uiscript["UI_DesktopInfo"].Inst["openZhanxingBeginEffect"](), Z = 1300)), Q["DesktopMgr"].Inst["is_chuanma_mode"]() && 0 == Q["DesktopMgr"].Inst["index_chuanma_ju"] && (uiscript["UI_DesktopInfo"].Inst["openChuanmaBeginEffect"](), Z = 1300);
                var S = !1;
                void 0 != B.al && null != B.al && (S = B.al), S && (uiscript["UI_AL"].Show(), Z = 1300), Laya["timer"].once(Z, this, function () {
                    for (var W = [], Z = 0; Z < B["tiles"]["length"]; Z++) W.push(mjcore["MJPai"]["Create"](B["tiles"][Z]));
                    var S = [], v = [];
                    if (B["opens"]) for (var Z = 0; Z < B["opens"]["length"]; Z++) if (B["opens"][Z].seat == Q["DesktopMgr"].Inst.seat) {
                        S = B["opens"][Z]["tiles"], v = B["opens"][Z]["count"];
                        break;
                    }
                    Q["DesktopMgr"].Inst["mainrole"]["NewGame"](W, S, v, !1), B.muyu && Q["DesktopMgr"].Inst["onMuyuChange"](B.muyu, !0);
                    for (var Z = 1; 4 > Z; Z++) {
                        var i = Q["DesktopMgr"].Inst["localPosition2Seat"](Z);
                        if (-1 != i) {
                            var x = [], l = [];
                            if (B["opens"]) for (var m = 0; m < B["opens"]["length"]; m++) if (B["opens"][m].seat == i) {
                                x = B["opens"][m]["tiles"], l = B["opens"][m]["count"];
                                break;
                            }
                            Q["DesktopMgr"].Inst["players"][Z]["NewGame"](13 + (i == Q["DesktopMgr"].Inst["index_ju"] ? 1 : 0), x, l, !1, '');
                        }
                    }
                    Q["DesktopMgr"].Inst["is_huansanzhang_mode"]() ? Laya["timer"].once(1500, V, function () {
                        Q["DesktopMgr"].Inst["ActionRunComplete"](), Q["ActionOperation"].play(B["operation"]);
                    }) : (Q["DesktopMgr"].Inst["is_dora3_mode"]() && Laya["timer"].once(1000, V, function () {
                        uiscript["UI_DesktopInfo"].Inst["openDora3BeginShine"]();
                    }), Laya["timer"].once(1200, V, function () {
                        if (B["doras"] && B["doras"]["length"] > 0) for (var V = 0; V < B["doras"]["length"]; V++) Q["DesktopMgr"].Inst.dora.push(mjcore["MJPai"]["Create"](B["doras"][V])), uiscript["UI_DesktopInfo"].Inst["setDora"](V, Q["DesktopMgr"].Inst.dora[V]);
                        for (var V = 0; 4 > V; V++) Q["DesktopMgr"].Inst["players"][V]["OnDoraRefresh"]();
                        if (Q["DesktopMgr"].Inst["index_ju"] == Q["DesktopMgr"].Inst.seat) {
                            var W = {
                                tingpais: B["tingpais0"], operation: B["operation"]
                            };
                            uiscript["UI_TingPai"].Inst["setData0"](W);
                        } else {
                            var W = {
                                tingpais: B["tingpais1"]
                            };
                            uiscript["UI_TingPai"].Inst["setData1"](W, !1);
                        }
                        Q["DesktopMgr"].Inst["ActionRunComplete"]();
                    }), void 0 != B["operation"] && Laya["timer"].once(1000, V, function () {
                        Q["ActionOperation"].play(B["operation"]);
                    }));
                }), Q["DesktopMgr"].Inst["fetchLinks"]();
            }, V["fastplay"] = function (B, V) {
                app.Log.log("ActionNewRound fastplay data:" + JSON["stringify"](B) + " usetime:" + V), Q["DesktopMgr"].Inst["index_change"] = B["chang"], Q["DesktopMgr"].Inst["index_ju"] = B.ju, Q["DesktopMgr"].Inst["index_ben"] = B.ben, Q["DesktopMgr"].Inst["index_player"] = B.ju, Q["DesktopMgr"].Inst["index_chuanma_ju"] = B["ju_count"], Q["DesktopMgr"].Inst["gameing"] = !0, Q["DesktopMgr"].Inst["left_tile_count"] = 69, Q["DesktopMgr"].Inst["rule_mode"] == Q["ERuleMode"]["Liqi4"] ? Q["DesktopMgr"].Inst["left_tile_count"] = 69 : Q["DesktopMgr"].Inst["rule_mode"] == Q["ERuleMode"]["Liqi3"] && (Q["DesktopMgr"].Inst["left_tile_count"] = 50), B["left_tile_count"] && (Q["DesktopMgr"].Inst["left_tile_count"] = B["left_tile_count"]), Q["DesktopMgr"].Inst["waiting_lingshang_deal_tile"] = !1, Q["DesktopMgr"].Inst["setAutoHule"](!1), Q["DesktopMgr"].Inst["setAutoMoQie"](!1), Q["DesktopMgr"].Inst["setAutoNoFulu"](!1), uiscript["UI_DesktopInfo"].Inst["resetFunc"](), uiscript["UI_TingPai"].Inst["reset"](), Q["DesktopMgr"].Inst["is_field_spell_mode"]() && (uiscript["UI_DesktopInfo"].Inst["OnNewCard"](null, !1), uiscript["UI_FieldSpell"].Inst["setZhuangState"](Q["DesktopMgr"].Inst["index_ju"] == Q["DesktopMgr"].Inst.seat), uiscript["UI_FieldSpell"].Inst["resetCounter"]()), Q["DesktopMgr"].Inst["is_zhanxing_mode"]() && uiscript["UI_Astrology"].Inst["Reset"](), uiscript["UI_DesktopInfo"].Inst["logUpEmoInfo"](), Q["DesktopMgr"].Inst["SetChangJuShow"](Q["DesktopMgr"].Inst["index_change"], Q["DesktopMgr"].Inst["index_ju"], Q["DesktopMgr"].Inst["index_chuanma_ju"]), uiscript["UI_DesktopInfo"].Inst["setBen"](Q["DesktopMgr"].Inst["index_ben"]), uiscript["UI_DesktopInfo"].Inst["setZhenting"](!1), uiscript["UI_DesktopInfo"].Inst["reset_rounds"](), uiscript["UI_DesktopInfo"].Inst["setLiqibang"](B["liqibang"]), B.muyu && Q["DesktopMgr"].Inst["onMuyuChange"](B.muyu, !1);
                for (var W = 0; 4 > W; W++) Q["DesktopMgr"].Inst["players"][W]["Reset"](), Q["DesktopMgr"].Inst["players"][W]["setSeat"](Q["DesktopMgr"].Inst["localPosition2Seat"](W));
                Q["DesktopMgr"].Inst["RefreshPlayerIndicator"](), Q["DesktopMgr"].Inst["RefreshPaiLeft"](), Q["DesktopMgr"].Inst["setScores"](B["scores"]), Q["DesktopMgr"].Inst.md5 = B.md5, Q["DesktopMgr"].Inst["choosed_pai"] = null, Q["DesktopMgr"].Inst.dora = [];
                for (var Z = [], W = 0; W < B["tiles"]["length"]; W++) Z.push(mjcore["MJPai"]["Create"](B["tiles"][W]));
                var S = [], v = [];
                if (B["opens"]) for (var W = 0; W < B["opens"]["length"]; W++) if (B["opens"][W].seat == Q["DesktopMgr"].Inst.seat) {
                    S = B["opens"][W]["tiles"], v = B["opens"][W]["count"];
                    break;
                }
                Q["DesktopMgr"].Inst["mainrole"]["NewGame"](Z, S, v, !0);
                for (var W = 1; 4 > W; W++) {
                    var i = Q["DesktopMgr"].Inst["localPosition2Seat"](W);
                    if (-1 != i) {
                        var x = [], l = [];
                        if (B["opens"]) for (var m = 0; m < B["opens"]["length"]; m++) if (B["opens"][m].seat == i) {
                            x = B["opens"][m]["tiles"], l = B["opens"][m]["count"];
                            break;
                        }
                        Q["DesktopMgr"].Inst["players"][W]["NewGame"](13 + (i == Q["DesktopMgr"].Inst["index_ju"] ? 1 : 0), x, l, !0, '');
                    }
                }
                if (Q["DesktopMgr"].Inst["is_chuanma_mode"]()) B["operation"] && -1 != V && Laya["timer"].once(100, this, function () {
                    Q["ActionOperation"].play(B["operation"], V + 100);
                }); else if (Q["DesktopMgr"].Inst["is_huansanzhang_mode"]()) B["operation"] && -1 != V && Laya["timer"].once(100, this, function () {
                    Q["ActionOperation"].play(B["operation"], V + 100);
                }); else {
                    if (B["doras"] && B["doras"]["length"] > 0) for (var W = 0; W < B["doras"]["length"]; W++) Q["DesktopMgr"].Inst.dora.push(mjcore["MJPai"]["Create"](B["doras"][W])), uiscript["UI_DesktopInfo"].Inst["setDora"](W, Q["DesktopMgr"].Inst.dora[W]);
                    for (var W = 0; 4 > W; W++) Q["DesktopMgr"].Inst["players"][W]["OnDoraRefresh"]();
                    if (Q["DesktopMgr"].Inst["index_ju"] == Q["DesktopMgr"].Inst.seat) {
                        var s = {
                            tingpais: B["tingpais0"], operation: B["operation"]
                        };
                        uiscript["UI_TingPai"].Inst["setData0"](s);
                    } else {
                        var s = {
                            tingpais: B["tingpais1"]
                        };
                        uiscript["UI_TingPai"].Inst["setData1"](s, !0);
                    }
                    B["operation"] && -1 != V && Laya["timer"].once(100, this, function () {
                        Q["ActionOperation"].play(B["operation"], V + 100);
                    });
                }
            }, V["record"] = function (B, V) {
                void 0 === V && (V = 0), app.Log.log("ActionNewRound record data:" + JSON["stringify"](B)), Q["DesktopMgr"].Inst["ClearOperationShow"](), Q["BgmListMgr"]["PlayMJBgm"](), Q["DesktopMgr"].Inst["index_change"] = B["chang"], Q["DesktopMgr"].Inst["index_ju"] = B.ju, Q["DesktopMgr"].Inst["index_ben"] = B.ben, Q["DesktopMgr"].Inst["index_player"] = B.ju, Q["DesktopMgr"].Inst["index_chuanma_ju"] = B["ju_count"], Q["DesktopMgr"].Inst["gameing"] = !0, Q["DesktopMgr"].Inst["left_tile_count"] = 69, Q["DesktopMgr"].Inst["rule_mode"] == Q["ERuleMode"]["Liqi4"] ? Q["DesktopMgr"].Inst["left_tile_count"] = 69 : Q["DesktopMgr"].Inst["rule_mode"] == Q["ERuleMode"]["Liqi3"] && (Q["DesktopMgr"].Inst["left_tile_count"] = 50), B["left_tile_count"] && (Q["DesktopMgr"].Inst["left_tile_count"] = B["left_tile_count"]), Q["DesktopMgr"].Inst["waiting_lingshang_deal_tile"] = !1, Q["DesktopMgr"].Inst["tingpais"] = [[], [], [], []], uiscript["UI_TingPai"].Inst["reset"](), uiscript["UI_Replay"].Inst["reset"](), Q["DesktopMgr"].Inst["SetChangJuShow"](Q["DesktopMgr"].Inst["index_change"], Q["DesktopMgr"].Inst["index_ju"], Q["DesktopMgr"].Inst["index_chuanma_ju"]), uiscript["UI_DesktopInfo"].Inst["setBen"](Q["DesktopMgr"].Inst["index_ben"]), uiscript["UI_DesktopInfo"].Inst["setZhenting"](!1), uiscript["UI_DesktopInfo"].Inst["setLiqibang"](B["liqibang"]);
                for (var W = 0; 4 > W; W++) Q["DesktopMgr"].Inst["players"][W]["setSeat"](Q["DesktopMgr"].Inst["localPosition2Seat"](W));
                Q["DesktopMgr"].Inst["RefreshPlayerIndicator"](), Q["DesktopMgr"].Inst["RefreshPaiLeft"](), Q["DesktopMgr"].Inst["is_field_spell_mode"]() && (uiscript["UI_DesktopInfo"].Inst["OnNewCard"](null, !1), uiscript["UI_FieldSpell"].Inst["closeCardDetail"](), uiscript["UI_FieldSpell"].Inst["setZhuangState"](Q["DesktopMgr"].Inst["index_ju"] == Q["DesktopMgr"].Inst.seat), uiscript["UI_FieldSpell"].Inst["resetCounter"]()), Q["DesktopMgr"].Inst["is_zhanxing_mode"]() && uiscript["UI_Astrology"].Inst["Reset"](), Q["DesktopMgr"].Inst["choosed_pai"] = null, Q["DesktopMgr"].Inst.dora = [], Q["AudioMgr"]["PlayAudio"](216);
                for (var W = 0; 4 > W; W++) {
                    var Z = [], S = "tiles" + W["toString"]();
                    if (B[S] && B[S]["length"] > 0) {
                        for (var v = 0; v < B[S]["length"]; v++) Z.push(mjcore["MJPai"]["Create"](B[S][v]));
                        var i = [], x = [];
                        if (B["opens"]) for (var v = 0; v < B["opens"]["length"]; v++) if (B["opens"][v].seat == W) {
                            i = B["opens"][v]["tiles"], x = B["opens"][v]["count"];
                            break;
                        }
                        W == Q["DesktopMgr"].Inst.seat ? Q["DesktopMgr"].Inst["mainrole"]["RecordNewGame"](Z, i, x) : Q["DesktopMgr"].Inst["players"][Q["DesktopMgr"].Inst["seat2LocalPosition"](W)]["RecordNewGame"](Z, i, x);
                    }
                }
                if (Q["DesktopMgr"].Inst["setScores"](B["scores"]), Q["DesktopMgr"].Inst.md5 = B.md5, uiscript["UI_DesktopInfo"].Inst["reset_rounds"](), Q["DesktopMgr"].Inst["is_huansanzhang_mode"]()) {
                    var l = B["operations"][Q["DesktopMgr"].Inst["localPosition2Seat"](Q["DesktopMgr"].Inst.seat)];
                    Q["DesktopMgr"].Inst.mode == Q["EMJMode"]["live_broadcast"] && uiscript["UI_Live_Broadcast"].Inst["during_play"] && l && Q["ActionOperation"].ob(l, V, 1000);
                } else {
                    if (B["doras"] && B["doras"]["length"] > 0) for (var W = 0; W < B["doras"]["length"]; W++) Q["DesktopMgr"].Inst.dora.push(mjcore["MJPai"]["Create"](B["doras"][W])), uiscript["UI_DesktopInfo"].Inst["setDora"](W, Q["DesktopMgr"].Inst.dora[W]); else B.dora && '' != B.dora && (Q["DesktopMgr"].Inst.dora.push(mjcore["MJPai"]["Create"](B.dora)), uiscript["UI_DesktopInfo"].Inst["setDora"](0, Q["DesktopMgr"].Inst.dora[0]));
                    for (var W = 0; 4 > W; W++) Q["DesktopMgr"].Inst["players"][W]["OnDoraRefresh"]();
                    if (B["tingpai"]) for (var W = 0; W < B["tingpai"]["length"]; W++) B["tingpai"][W].seat != Q["DesktopMgr"].Inst["index_ju"] && Q["DesktopMgr"].Inst["setTingpai"](B["tingpai"][W].seat, B["tingpai"][W]["tingpais1"]);
                    Q["DesktopMgr"].Inst.mode == Q["EMJMode"]["live_broadcast"] && uiscript["UI_Live_Broadcast"].Inst["during_play"] && B["operation"] && Q["ActionOperation"].ob(B["operation"], V, 1000);
                }
                return B.muyu && Q["DesktopMgr"].Inst["onMuyuChange"](B.muyu, !0), Q["DesktopMgr"].Inst.mode == Q["EMJMode"]["paipu"] && (B["paishan"] ? (uiscript["UI_Replay"].Inst["page_paishan"]["setTiles"](B["paishan"]), uiscript["UI_Replay"].Inst["page_paishan"]["refresh"]()) : uiscript["UI_Replay"].Inst["page_paishan"]["setNoInfo"]()), 300;
            }, V["fastrecord"] = function (B, V) {
                void 0 === V && (V = -1), app.Log.log("ActionNewRound fastrecord data:" + JSON["stringify"](B)), Q["BgmListMgr"]["PlayMJBgm"](), Q["DesktopMgr"].Inst["ClearOperationShow"](), Q["DesktopMgr"].Inst["index_change"] = B["chang"], Q["DesktopMgr"].Inst["index_ju"] = B.ju, Q["DesktopMgr"].Inst["index_ben"] = B.ben, Q["DesktopMgr"].Inst["index_player"] = B.ju, Q["DesktopMgr"].Inst["index_chuanma_ju"] = B["ju_count"], Q["DesktopMgr"].Inst["gameing"] = !0, Q["DesktopMgr"].Inst["left_tile_count"] = 69, Q["DesktopMgr"].Inst["rule_mode"] == Q["ERuleMode"]["Liqi4"] ? Q["DesktopMgr"].Inst["left_tile_count"] = 69 : Q["DesktopMgr"].Inst["rule_mode"] == Q["ERuleMode"]["Liqi3"] && (Q["DesktopMgr"].Inst["left_tile_count"] = 50), B["left_tile_count"] && (Q["DesktopMgr"].Inst["left_tile_count"] = B["left_tile_count"]), Q["DesktopMgr"].Inst["waiting_lingshang_deal_tile"] = !1, Q["DesktopMgr"].Inst["tingpais"] = [[], [], [], []], uiscript["UI_TingPai"].Inst["reset"](), uiscript["UI_Replay"].Inst["reset"](), Q["DesktopMgr"].Inst["SetChangJuShow"](Q["DesktopMgr"].Inst["index_change"], Q["DesktopMgr"].Inst["index_ju"], Q["DesktopMgr"].Inst["index_chuanma_ju"]), uiscript["UI_DesktopInfo"].Inst["setBen"](Q["DesktopMgr"].Inst["index_ben"]), uiscript["UI_DesktopInfo"].Inst["setZhenting"](!1), uiscript["UI_DesktopInfo"].Inst["setLiqibang"](B["liqibang"]);
                for (var W = 0; 4 > W; W++) Q["DesktopMgr"].Inst["players"][W]["setSeat"](Q["DesktopMgr"].Inst["localPosition2Seat"](W));
                Q["DesktopMgr"].Inst["is_field_spell_mode"]() && (uiscript["UI_DesktopInfo"].Inst["OnNewCard"](null, !1), uiscript["UI_FieldSpell"].Inst["setZhuangState"](Q["DesktopMgr"].Inst["index_ju"] == Q["DesktopMgr"].Inst.seat), uiscript["UI_FieldSpell"].Inst["resetCounter"]()), Q["DesktopMgr"].Inst["is_zhanxing_mode"]() && uiscript["UI_Astrology"].Inst["Reset"](), Q["DesktopMgr"].Inst["RefreshPlayerIndicator"](), Q["DesktopMgr"].Inst["RefreshPaiLeft"](), Q["DesktopMgr"].Inst["choosed_pai"] = null, Q["DesktopMgr"].Inst.dora = [];
                for (var W = 0; 4 > W; W++) {
                    var Z = [], S = "tiles" + W["toString"]();
                    if (B[S] && B[S]["length"] > 0) {
                        for (var v = 0; v < B[S]["length"]; v++) Z.push(mjcore["MJPai"]["Create"](B[S][v]));
                        var i = [], x = [];
                        if (B["opens"]) for (var v = 0; v < B["opens"]["length"]; v++) if (B["opens"][v].seat == W) {
                            i = B["opens"][v]["tiles"], x = B["opens"][v]["count"];
                            break;
                        }
                        W == Q["DesktopMgr"].Inst.seat ? Q["DesktopMgr"].Inst["mainrole"]["RecordNewGame"](Z, i, x) : Q["DesktopMgr"].Inst["players"][Q["DesktopMgr"].Inst["seat2LocalPosition"](W)]["RecordNewGame"](Z, i, x);
                    }
                }
                if (Q["DesktopMgr"].Inst["setScores"](B["scores"]), Q["DesktopMgr"].Inst.md5 = B.md5, uiscript["UI_DesktopInfo"].Inst["reset_rounds"](), Q["DesktopMgr"].Inst["is_huansanzhang_mode"]()) {
                    var l = B["operations"][Q["DesktopMgr"].Inst["localPosition2Seat"](Q["DesktopMgr"].Inst.seat)];
                    Q["DesktopMgr"].Inst.mode == Q["EMJMode"]["live_broadcast"] && uiscript["UI_Live_Broadcast"].Inst["during_play"] && V >= 0 && l && Q["ActionOperation"].ob(l, V, 1000);
                } else {
                    if (B["doras"] && B["doras"]["length"] > 0) for (var W = 0; W < B["doras"]["length"]; W++) Q["DesktopMgr"].Inst.dora.push(mjcore["MJPai"]["Create"](B["doras"][W])), uiscript["UI_DesktopInfo"].Inst["setDora"](W, Q["DesktopMgr"].Inst.dora[W]); else B.dora && '' != B.dora && (Q["DesktopMgr"].Inst.dora.push(mjcore["MJPai"]["Create"](B.dora)), uiscript["UI_DesktopInfo"].Inst["setDora"](0, Q["DesktopMgr"].Inst.dora[0]));
                    for (var W = 0; 4 > W; W++) Q["DesktopMgr"].Inst["players"][W]["OnDoraRefresh"]();
                    if (B["tingpai"]) for (var W = 0; W < B["tingpai"]["length"]; W++) B["tingpai"][W].seat != Q["DesktopMgr"].Inst["index_ju"] && Q["DesktopMgr"].Inst["setTingpai"](B["tingpai"][W].seat, B["tingpai"][W]["tingpais1"]);
                    Q["DesktopMgr"].Inst.mode == Q["EMJMode"]["live_broadcast"] && uiscript["UI_Live_Broadcast"].Inst["during_play"] && V >= 0 && B["operation"] && Q["ActionOperation"].ob(B["operation"], V, 1000);
                }
                Q["DesktopMgr"].Inst.mode == Q["EMJMode"]["paipu"] && (B["paishan"] ? (uiscript["UI_Replay"].Inst["page_paishan"]["setTiles"](B["paishan"]), uiscript["UI_Replay"].Inst["page_paishan"]["refresh"]()) : uiscript["UI_Replay"].Inst["page_paishan"]["setNoInfo"]()), B.muyu && Q["DesktopMgr"].Inst["onMuyuChange"](B.muyu, !1);
            }, V;
        }(Q["ActionBase"]);
        Q["ActionNewRound"] = B;
    }(view || (view = {}));


    !function (Q) {
        var B = function (B) {
            function V() {
                return null !== B && B["apply"](this, arguments) || this;
            }

            return __extends(V, B), V.play = function (B) {
                console.log("ActionDealTile play data:" + JSON["stringify"](B));
                cacheLog.push(...action2Mjai({name: 'ActionDealTile', data: B}));
                app.Log.log("ActionDealTile play data:" + JSON["stringify"](B));
                var V = B.seat, W = B.tile;
                Q["DesktopMgr"].Inst["is_zhanxing_mode"]() && (uiscript["UI_Astrology"].Inst["removeTile"](B["tile_index"], !0), uiscript["UI_Astrology"].Inst["onSelectionEnd"](B["tile_index"])), Q["DesktopMgr"].Inst["left_tile_count"] = B["left_tile_count"], 10 == Q["DesktopMgr"].Inst["left_tile_count"] && (Q["DesktopMgr"].Inst["players"][Q["DesktopMgr"].Inst["seat2LocalPosition"](Q["DesktopMgr"].Inst.seat)]["already_xuezhan_hule_state"] || Q["DesktopMgr"].Inst["addMindVoice"](Q["DesktopMgr"].Inst.seat, "ingame_remain10"), Laya["timer"].once(1000, this, function () {
                    Q["DesktopMgr"].Inst["playMindVoice"]();
                }));
                var Z = !1;
                if (B["tile_state"] && B["tile_state"] > 0 && (Z = !0), V == Q["DesktopMgr"].Inst.seat) {
                    var S = Laya["timer"]["currTimer"] - Q["DesktopMgr"].Inst["last_gang"], v = 0;
                    650 > S && (v = 650 - S), Laya["timer"].once(v, this, function () {
                        B.muyu && Q["DesktopMgr"].Inst["onMuyuChange"](B.muyu, !0), Q["DesktopMgr"].Inst["mainrole"]["TakePai"](mjcore["MJPai"]["Create"](W), Z), Q["DesktopMgr"].Inst["ActionRunComplete"]();
                    });
                } else B.muyu && Q["DesktopMgr"].Inst["onMuyuChange"](B.muyu, !0), Z || W && -1 != W["indexOf"]('t') ? Q["DesktopMgr"].Inst["players"][Q["DesktopMgr"].Inst["seat2LocalPosition"](V)]["TakePai"](mjcore["MJPai"]["Create"](W), Z) : Q["DesktopMgr"].Inst["players"][Q["DesktopMgr"].Inst["seat2LocalPosition"](V)]["TakePai"](mjcore["MJPai"]["Create"]('5z'), Z), Q["DesktopMgr"].Inst["ActionRunComplete"]();
                Q["DesktopMgr"].Inst["index_player"] = V, Q["DesktopMgr"].Inst["RefreshPaiLeft"](), Q["DesktopMgr"].Inst["RefreshPlayerIndicator"](), B.liqi && Q["ActionLiqi"].play(B.liqi), B["operation"] && Q["ActionOperation"].play(B["operation"]), B["doras"] && B["doras"]["length"] > 0 && Q["DesktopMgr"].Inst["WhenDoras"](B["doras"], !1), void 0 != B["zhenting"] && void 0 == B["operation"] && (uiscript["UI_DesktopInfo"].Inst["setZhenting"](B["zhenting"]), uiscript["UI_TingPai"].Inst["setZhengting"](B["zhenting"])), V == Q["DesktopMgr"].Inst.seat && uiscript["UI_TingPai"].Inst["setData0"](B), Q["DesktopMgr"].Inst["waiting_lingshang_deal_tile"] = !1;
            }, V["fastplay"] = function (B, V) {
                app.Log.log("ActionDealTile fastplay data:" + JSON["stringify"](B) + " usetime:" + V);
                var W = B.seat, Z = B.tile;
                Q["DesktopMgr"].Inst["left_tile_count"] = B["left_tile_count"];
                var S = !1;
                B["tile_state"] && B["tile_state"] > 0 && (S = !0), B.muyu && Q["DesktopMgr"].Inst["onMuyuChange"](B.muyu, !1), W == Q["DesktopMgr"].Inst.seat ? Q["DesktopMgr"].Inst["mainrole"]["TakePai"](mjcore["MJPai"]["Create"](Z), S, !1) : S || Z && -1 != Z["indexOf"]('t') ? Q["DesktopMgr"].Inst["players"][Q["DesktopMgr"].Inst["seat2LocalPosition"](W)]["TakePai"](mjcore["MJPai"]["Create"](Z), S) : Q["DesktopMgr"].Inst["players"][Q["DesktopMgr"].Inst["seat2LocalPosition"](W)]["TakePai"](mjcore["MJPai"]["Create"]('5z'), S), Q["DesktopMgr"].Inst["is_zhanxing_mode"]() && (uiscript["UI_Astrology"].Inst["removeTile"](B["tile_index"], !1), uiscript["UI_Astrology"].Inst["onSelectionEnd"](B["tile_index"])), Q["DesktopMgr"].Inst["index_player"] = W, Q["DesktopMgr"].Inst["RefreshPaiLeft"](), Q["DesktopMgr"].Inst["RefreshPlayerIndicator"](), B.liqi && Q["ActionLiqi"]["fastplay"](B.liqi, 0), B["operation"] && -1 != V && Q["ActionOperation"].play(B["operation"], V), B["doras"] && B["doras"]["length"] > 0 && Q["DesktopMgr"].Inst["WhenDoras"](B["doras"], !0), void 0 != B["zhenting"] && void 0 == B["operation"] && (uiscript["UI_DesktopInfo"].Inst["setZhenting"](B["zhenting"]), uiscript["UI_TingPai"].Inst["setZhengting"](B["zhenting"])), W == Q["DesktopMgr"].Inst.seat && uiscript["UI_TingPai"].Inst["setData0"](B), Q["DesktopMgr"].Inst["waiting_lingshang_deal_tile"] = !1;
            }, V["record"] = function (B, V) {
                void 0 === V && (V = 0), app.Log.log("ActionDealTile record data:" + JSON["stringify"](B));
                var W = B.seat, Z = B.tile;
                Q["DesktopMgr"].Inst["left_tile_count"] = B["left_tile_count"];
                var S = !1;
                return B["tile_state"] && B["tile_state"] > 0 && (S = !0), B.muyu && Q["DesktopMgr"].Inst["onMuyuChange"](B.muyu, !0), W == Q["DesktopMgr"].Inst.seat ? Q["DesktopMgr"].Inst["mainrole"]["TakePai"](mjcore["MJPai"]["Create"](Z), S) : Q["DesktopMgr"].Inst["players"][Q["DesktopMgr"].Inst["seat2LocalPosition"](W)]["recordTakePai"](mjcore["MJPai"]["Create"](Z), S, Q["DesktopMgr"].Inst["record_show_anim"]), Q["DesktopMgr"].Inst["is_zhanxing_mode"]() && (uiscript["UI_Astrology"].Inst["removeTile"](B["tile_index"], !0), uiscript["UI_Astrology"].Inst["onSelectionEnd"](B["tile_index"])), Q["DesktopMgr"].Inst["index_player"] = W, Q["DesktopMgr"].Inst["RefreshPaiLeft"](), Q["DesktopMgr"].Inst["RefreshPlayerIndicator"](), B.liqi && Q["ActionLiqi"]["record"](B.liqi), B["doras"] && B["doras"]["length"] > 0 && Q["DesktopMgr"].Inst["WhenDoras"](B["doras"], !0), Q["DesktopMgr"].Inst.mode == Q["EMJMode"]["live_broadcast"] && uiscript["UI_Live_Broadcast"].Inst["during_play"] && B["operation"] && Q["ActionOperation"].ob(B["operation"], V), Q["DesktopMgr"].Inst["waiting_lingshang_deal_tile"] = !1, 300;
            }, V["fastrecord"] = function (B, V) {
                void 0 === V && (V = -1), app.Log.log("ActionDealTile fastrecord data:" + JSON["stringify"](B));
                var W = B.seat, Z = B.tile;
                Q["DesktopMgr"].Inst["left_tile_count"] = B["left_tile_count"];
                var S = !1;
                B["tile_state"] && B["tile_state"] > 0 && (S = !0), B.muyu && Q["DesktopMgr"].Inst["onMuyuChange"](B.muyu, !1), W == Q["DesktopMgr"].Inst.seat ? Q["DesktopMgr"].Inst["mainrole"]["TakePai"](mjcore["MJPai"]["Create"](Z), S, !1) : Q["DesktopMgr"].Inst["players"][Q["DesktopMgr"].Inst["seat2LocalPosition"](W)]["recordTakePai"](mjcore["MJPai"]["Create"](Z), S), Q["DesktopMgr"].Inst["is_zhanxing_mode"]() && (uiscript["UI_Astrology"].Inst["removeTile"](B["tile_index"], !1), uiscript["UI_Astrology"].Inst["onSelectionEnd"](B["tile_index"])), Q["DesktopMgr"].Inst["index_player"] = W, Q["DesktopMgr"].Inst["RefreshPaiLeft"](), Q["DesktopMgr"].Inst["RefreshPlayerIndicator"](), B.liqi && Q["ActionLiqi"]["fastrecord"](B.liqi), B["doras"] && B["doras"]["length"] > 0 && Q["DesktopMgr"].Inst["WhenDoras"](B["doras"], !0), Q["DesktopMgr"].Inst.mode == Q["EMJMode"]["live_broadcast"] && uiscript["UI_Live_Broadcast"].Inst["during_play"] && V >= 0 && B["operation"] && Q["ActionOperation"].ob(B["operation"], V), Q["DesktopMgr"].Inst["waiting_lingshang_deal_tile"] = !1;
            }, V;
        }(Q["ActionBase"]);
        Q["ActionDealTile"] = B;
    }(view || (view = {}));


    !function (Q) {
        var B = function (B) {
            function V() {
                return null !== B && B["apply"](this, arguments) || this;
            }

            return __extends(V, B), V.play = function (B) {
                console.log("ActionChiPengGang play data:" + JSON["stringify"](B));
                cacheLog.push(...action2Mjai({name: 'ActionChiPengGang', data: B}));
                app.Log.log("ActionChiPengGang play data:" + JSON["stringify"](B));
                var V = B.seat, W = new mjcore["MJMing"]();
                W.type = B.type, W.from = B["froms"], W.pais = [];
                for (var Z = Q["DesktopMgr"].Inst["players"][Q["DesktopMgr"].Inst["seat2LocalPosition"](V)], S = 0; S < B["tiles"]["length"]; S++) W.pais.push(mjcore["MJPai"]["Create"](B["tiles"][S]));
                for (var v = [], S = 0; S < W.pais["length"]; S++) !B["tile_states"] || B["tile_states"]["length"] <= S ? v.push(0) : v.push(B["tile_states"][S]);
                Laya["timer"].once(600, this, function () {
                    try {
                        B.muyu && Q["DesktopMgr"].Inst["onMuyuChange"](B.muyu, !0), Q["DesktopMgr"].Inst["players"][Q["DesktopMgr"].Inst["seat2LocalPosition"](Q["DesktopMgr"].Inst["lastpai_seat"])]["QiPaiNoPass"](), Z["AddMing"](W, v), W.type == mjcore["E_Ming"]["gang_ming"] && (Q["DesktopMgr"].Inst["waiting_lingshang_deal_tile"] = !0);
                    } catch (V) {
                        var S = {};
                        S["error"] = V["message"], S["stack"] = V["stack"], S["method"] = "addming600", S.name = "ActionChiPengGang", GameMgr.Inst["onFatalError"](S);
                    }
                }), V != Q["DesktopMgr"].Inst.seat || W.type != mjcore["E_Ming"]["gang_an"] && W.type != mjcore["E_Ming"]["gang_ming"] || (Q["DesktopMgr"].Inst["last_gang"] = Laya["timer"]["currTimer"]);
                var i = '', x = '';
                switch (W.type) {
                    case mjcore["E_Ming"].kezi:
                        i = "emoji_4", x = "emoji_3";
                        break;
                    case mjcore["E_Ming"]["shunzi"]:
                        i = "emoji_2", x = "emoji_1";
                        break;
                    case mjcore["E_Ming"]["gang_ming"]:
                        i = "emoji_6", x = "emoji_5";
                }
                uiscript["UI_DesktopInfo"].Inst["changeHeadEmo"](Q["DesktopMgr"].Inst["index_player"], i, 2000), Q["DesktopMgr"].Inst["index_player"] = V, uiscript["UI_DesktopInfo"].Inst["changeHeadEmo"](Q["DesktopMgr"].Inst["index_player"], x, 2000), Q["DesktopMgr"].Inst["RefreshPlayerIndicator"](), B.liqi && Q["ActionLiqi"].play(B.liqi), B["operation"] && Laya["timer"].once(600, this, function () {
                    Q["ActionOperation"].play(B["operation"]);
                }), void 0 != B["zhenting"] && void 0 == B["operation"] && (uiscript["UI_DesktopInfo"].Inst["setZhenting"](B["zhenting"]), uiscript["UI_TingPai"].Inst["setZhengting"](B["zhenting"])), B["liqibang"] && uiscript["UI_DesktopInfo"].Inst["setLiqibang"](B["liqibang"]);
                var l = '';
                switch (W.type) {
                    case mjcore["E_Ming"]["shunzi"]:
                        l = "act_chi";
                        break;
                    case mjcore["E_Ming"]["gang_ming"]:
                    case mjcore["E_Ming"]["gang_an"]:
                        l = "act_kan";
                        break;
                    case mjcore["E_Ming"].kezi:
                        l = "act_pon";
                }
                var m = Z["score"];
                B["scores"] && B["scores"]["length"] > 0 && Q["DesktopMgr"].Inst["setScores"](B["scores"]), Z["PlaySound"](l, Z["score"] - m), V == Q["DesktopMgr"].Inst.seat && uiscript["UI_TingPai"].Inst["setData0"](B);
            }, V["fastplay"] = function (B, V) {
                app.Log.log("ActionChiPengGang fastplay data:" + JSON["stringify"](B) + " usetime:" + V);
                var W = B.seat, Z = new mjcore["MJMing"]();
                Z.type = B.type, Z.from = B["froms"], Z.pais = [];
                for (var S = 0; S < B["tiles"]["length"]; S++) Z.pais.push(mjcore["MJPai"]["Create"](B["tiles"][S]));
                for (var v = [], S = 0; S < Z.pais["length"]; S++) !B["tile_states"] || B["tile_states"]["length"] <= S ? v.push(0) : v.push(B["tile_states"][S]);
                B.muyu && Q["DesktopMgr"].Inst["onMuyuChange"](B.muyu, !1), Q["DesktopMgr"].Inst["players"][Q["DesktopMgr"].Inst["seat2LocalPosition"](Q["DesktopMgr"].Inst["lastpai_seat"])]["QiPaiNoPass"](), Q["DesktopMgr"].Inst["players"][Q["DesktopMgr"].Inst["seat2LocalPosition"](W)]["AddMing"](Z, v, !1), Z.type == mjcore["E_Ming"]["gang_ming"] && (Q["DesktopMgr"].Inst["waiting_lingshang_deal_tile"] = !0), W != Q["DesktopMgr"].Inst.seat || Z.type != mjcore["E_Ming"]["gang_an"] && Z.type != mjcore["E_Ming"]["gang_ming"] || (Q["DesktopMgr"].Inst["last_gang"] = Laya["timer"]["currTimer"]), Q["DesktopMgr"].Inst["index_player"] = W, Q["DesktopMgr"].Inst["RefreshPlayerIndicator"](), B.liqi && Q["ActionLiqi"]["fastplay"](B.liqi, 0), B["operation"] && -1 != V && Laya["timer"].once(600, this, function () {
                    Q["ActionOperation"].play(B["operation"], V);
                }), B["scores"] && B["scores"]["length"] > 0 && Q["DesktopMgr"].Inst["setScores"](B["scores"]), void 0 != B["zhenting"] && void 0 == B["operation"] && (uiscript["UI_DesktopInfo"].Inst["setZhenting"](B["zhenting"]), uiscript["UI_TingPai"].Inst["setZhengting"](B["zhenting"])), B["liqibang"] && uiscript["UI_DesktopInfo"].Inst["setLiqibang"](B["liqibang"]), W == Q["DesktopMgr"].Inst.seat && uiscript["UI_TingPai"].Inst["setData0"](B);
            }, V["record"] = function (B, V) {
                void 0 === V && (V = 0), app.Log.log("ActionChiPengGang record data:" + JSON["stringify"](B));
                var W = B.seat, Z = new mjcore["MJMing"]();
                Z.type = B.type, Z.from = B["froms"], Z.pais = [];
                for (var S = 0; S < B["tiles"]["length"]; S++) Z.pais.push(mjcore["MJPai"]["Create"](B["tiles"][S]));
                for (var v = [], S = 0; S < Z.pais["length"]; S++) !B["tile_states"] || B["tile_states"]["length"] <= S ? v.push(0) : v.push(B["tile_states"][S]);
                Laya["timer"].once(600, this, function () {
                    B.muyu && Q["DesktopMgr"].Inst["onMuyuChange"](B.muyu, !0), Q["DesktopMgr"].Inst["players"][Q["DesktopMgr"].Inst["seat2LocalPosition"](Q["DesktopMgr"].Inst["lastpai_seat"])]["QiPaiNoPass"](), Q["DesktopMgr"].Inst["players"][Q["DesktopMgr"].Inst["seat2LocalPosition"](W)]["AddMing"](Z, v), Z.type == mjcore["E_Ming"]["gang_ming"] && (Q["DesktopMgr"].Inst["waiting_lingshang_deal_tile"] = !0);
                }), W != Q["DesktopMgr"].Inst.seat || Z.type != mjcore["E_Ming"]["gang_an"] && Z.type != mjcore["E_Ming"]["gang_ming"] || (Q["DesktopMgr"].Inst["last_gang"] = Laya["timer"]["currTimer"]);
                var i = '', x = '';
                switch (Z.type) {
                    case mjcore["E_Ming"].kezi:
                        i = "emoji_4", x = "emoji_3";
                        break;
                    case mjcore["E_Ming"]["shunzi"]:
                        i = "emoji_2", x = "emoji_1";
                        break;
                    case mjcore["E_Ming"]["gang_ming"]:
                        i = "emoji_6", x = "emoji_5";
                }
                uiscript["UI_DesktopInfo"].Inst["changeHeadEmo"](Q["DesktopMgr"].Inst["index_player"], i, 2000), Q["DesktopMgr"].Inst["index_player"] = W, uiscript["UI_DesktopInfo"].Inst["changeHeadEmo"](Q["DesktopMgr"].Inst["index_player"], x, 2000), Q["DesktopMgr"].Inst["RefreshPlayerIndicator"](), B.liqi && Q["ActionLiqi"]["record"](B.liqi), B["liqibang"] && uiscript["UI_DesktopInfo"].Inst["setLiqibang"](B["liqibang"]);
                var l = '';
                switch (Z.type) {
                    case mjcore["E_Ming"]["shunzi"]:
                        l = "act_chi";
                        break;
                    case mjcore["E_Ming"]["gang_ming"]:
                    case mjcore["E_Ming"]["gang_an"]:
                        l = "act_kan";
                        break;
                    case mjcore["E_Ming"].kezi:
                        l = "act_pon";
                }
                var m = Q["DesktopMgr"].Inst["players"][Q["DesktopMgr"].Inst["seat2LocalPosition"](W)], s = m["score"];
                return B["scores"] && B["scores"]["length"] > 0 && Q["DesktopMgr"].Inst["setScores"](B["scores"]), m["PlaySound"](l, m["score"] - s), Q["DesktopMgr"].Inst.mode == Q["EMJMode"]["live_broadcast"] && uiscript["UI_Live_Broadcast"].Inst["during_play"] && B["operation"] && Q["ActionOperation"].ob(B["operation"], V, 500), 1200;
            }, V["fastrecord"] = function (B, V) {
                void 0 === V && (V = -1), app.Log.log("ActionChiPengGang fastrecord data:" + JSON["stringify"](B));
                var W = B.seat, Z = new mjcore["MJMing"]();
                Z.type = B.type, Z.from = B["froms"], Z.pais = [];
                for (var S = 0; S < B["tiles"]["length"]; S++) Z.pais.push(mjcore["MJPai"]["Create"](B["tiles"][S]));
                for (var v = [], S = 0; S < Z.pais["length"]; S++) !B["tile_states"] || B["tile_states"]["length"] <= S ? v.push(0) : v.push(B["tile_states"][S]);
                B.muyu && Q["DesktopMgr"].Inst["onMuyuChange"](B.muyu, !1), Q["DesktopMgr"].Inst["players"][Q["DesktopMgr"].Inst["seat2LocalPosition"](Q["DesktopMgr"].Inst["lastpai_seat"])]["QiPaiNoPass"](), Q["DesktopMgr"].Inst["players"][Q["DesktopMgr"].Inst["seat2LocalPosition"](W)]["AddMing"](Z, v, !1), Z.type == mjcore["E_Ming"]["gang_ming"] && (Q["DesktopMgr"].Inst["waiting_lingshang_deal_tile"] = !0), B["scores"] && B["scores"]["length"] > 0 && Q["DesktopMgr"].Inst["setScores"](B["scores"]), B["liqibang"] && uiscript["UI_DesktopInfo"].Inst["setLiqibang"](B["liqibang"]), Q["DesktopMgr"].Inst["index_player"] = W, Q["DesktopMgr"].Inst["RefreshPlayerIndicator"](), B.liqi && Q["ActionLiqi"]["fastrecord"](B.liqi), Q["DesktopMgr"].Inst.mode == Q["EMJMode"]["live_broadcast"] && uiscript["UI_Live_Broadcast"].Inst["during_play"] && V >= 0 && B["operation"] && Q["ActionOperation"].ob(B["operation"], V, 500);
            }, V;
        }(Q["ActionBase"]);
        Q["ActionChiPengGang"] = B;
    }(view || (view = {}));


    !function (Q) {
        var B = function (B) {
            function V() {
                return null !== B && B["apply"](this, arguments) || this;
            }

            return __extends(V, B), V.play = function (B) {
                console.log("ActionAnGangAddGang play data:" + JSON["stringify"](B));
                cacheLog.push(...action2Mjai({name: 'ActionAnGangAddGang', data: B}));
                app.Log.log("ActionAnGangAddGang play data:" + JSON["stringify"](B));
                var V = B.seat, W = Q["DesktopMgr"].Inst["seat2LocalPosition"](V);
                if (B["doras"] && Q["DesktopMgr"].Inst["WhenDoras"](B["doras"], !1), B.type == mjcore["E_Ming"]["gang_ming"]) Q["DesktopMgr"].Inst["players"][W]["PlaySound"]("act_kan"), Laya["timer"].once(500, this, function () {
                    B.muyu && Q["DesktopMgr"].Inst["onMuyuChange"](B.muyu, !0), Q["DesktopMgr"].Inst["players"][W]["AddGang"](mjcore["MJPai"]["Create"](B["tiles"])), Q["DesktopMgr"].Inst["waiting_lingshang_deal_tile"] = !0;
                }); else {
                    var Z = new mjcore["MJMing"]();
                    Z.type = mjcore["E_Ming"]["gang_an"], Z.from = [V, V, V, V], Z.pais = this["getAngangTile"](B["tiles"]);
                    for (var S = [], v = 0; v < Z.pais["length"]; v++) S.push(-1);
                    Laya["timer"].once(500, this, function () {
                        B.muyu && Q["DesktopMgr"].Inst["onMuyuChange"](B.muyu, !0), Q["DesktopMgr"].Inst["players"][W]["AddMing"](Z, S), Q["DesktopMgr"].Inst["waiting_lingshang_deal_tile"] = !0;
                    }), Q["DesktopMgr"].Inst["players"][W]["PlaySound"]("act_kan");
                }
                B["operation"] && Laya["timer"].once(600, this, function () {
                    Q["ActionOperation"].play(B["operation"]);
                }), void 0 != B["zhenting"] && uiscript["UI_TingPai"].Inst["setZhengting"](B["zhenting"]), V == Q["DesktopMgr"].Inst.seat && uiscript["UI_TingPai"].Inst["setData1"](B, !1), uiscript["UI_DesktopInfo"].Inst["changeHeadEmo"](V, "emoji_5", 2000), Q["DesktopMgr"].Inst["mainrole"]["revertAllPais"]();
            }, V["fastplay"] = function (B, V) {
                app.Log.log("ActionAnGangAddGang fastplay data:" + JSON["stringify"](B) + " usetime:" + V);
                var W = B.seat, Z = Q["DesktopMgr"].Inst["seat2LocalPosition"](W);
                if (B["doras"] && Q["DesktopMgr"].Inst["WhenDoras"](B["doras"], !0), B.type == mjcore["E_Ming"]["gang_ming"]) Q["DesktopMgr"].Inst["players"][Z]["AddGang"](mjcore["MJPai"]["Create"](B["tiles"]), !1); else {
                    var S = new mjcore["MJMing"]();
                    S.type = mjcore["E_Ming"]["gang_an"], S.from = [W, W, W, W], S.pais = this["getAngangTile"](B["tiles"]);
                    for (var v = [], i = 0; i < S.pais["length"]; i++) v.push(-1);
                    Q["DesktopMgr"].Inst["players"][Z]["AddMing"](S, v, !1);
                }
                B["operation"] && -1 != V && Laya["timer"].once(500, this, function () {
                    Q["ActionOperation"].play(B["operation"], V);
                }), void 0 != B["zhenting"] && uiscript["UI_TingPai"].Inst["setZhengting"](B["zhenting"]), W == Q["DesktopMgr"].Inst.seat && uiscript["UI_TingPai"].Inst["setData1"](B, !0), B.muyu && Q["DesktopMgr"].Inst["onMuyuChange"](B.muyu, !1), Q["DesktopMgr"].Inst["waiting_lingshang_deal_tile"] = !0;
            }, V["record"] = function (B, V) {
                void 0 === V && (V = 0), app.Log.log("ActionAnGangAddGang record data:" + JSON["stringify"](B)), B["doras"] && Q["DesktopMgr"].Inst["WhenDoras"](B["doras"], !0);
                var W = B.seat, Z = Q["DesktopMgr"].Inst["seat2LocalPosition"](W);
                if (B.type == mjcore["E_Ming"]["gang_ming"]) Q["DesktopMgr"].Inst["players"][Z]["PlaySound"]("act_kan"), Laya["timer"].once(500, this, function () {
                    B.muyu && Q["DesktopMgr"].Inst["onMuyuChange"](B.muyu, !0), Q["DesktopMgr"].Inst["players"][Z]["AddGang"](mjcore["MJPai"]["Create"](B["tiles"])), Q["DesktopMgr"].Inst["waiting_lingshang_deal_tile"] = !0;
                }); else {
                    var S = new mjcore["MJMing"]();
                    S.type = mjcore["E_Ming"]["gang_an"], S.from = [W, W, W, W], S.pais = this["getAngangTile"](B["tiles"]);
                    for (var v = [], i = 0; i < S.pais["length"]; i++) v.push(-1);
                    Laya["timer"].once(500, this, function () {
                        B.muyu && Q["DesktopMgr"].Inst["onMuyuChange"](B.muyu, !0), Q["DesktopMgr"].Inst["players"][Z]["AddMing"](S, v), Q["DesktopMgr"].Inst["waiting_lingshang_deal_tile"] = !0;
                    }), Q["DesktopMgr"].Inst["players"][Z]["PlaySound"]("act_kan");
                }
                if (uiscript["UI_DesktopInfo"].Inst["changeHeadEmo"](W, "emoji_5", 2000), Q["DesktopMgr"].Inst.mode == Q["EMJMode"]["live_broadcast"] && uiscript["UI_Live_Broadcast"].Inst["during_play"] && B["operations"]) for (var i = 0; i < B["operations"]["length"]; i++) Q["ActionOperation"].ob(B["operations"][i], V, 450);
                return 1700;
            }, V["fastrecord"] = function (B, V) {
                void 0 === V && (V = -1), app.Log.log("ActionAnGangAddGang fastrecord data:" + JSON["stringify"](B)), B["doras"] && Q["DesktopMgr"].Inst["WhenDoras"](B["doras"], !0);
                var W = B.seat, Z = Q["DesktopMgr"].Inst["seat2LocalPosition"](W);
                if (B.type == mjcore["E_Ming"]["gang_ming"]) Q["DesktopMgr"].Inst["players"][Z]["AddGang"](mjcore["MJPai"]["Create"](B["tiles"]), !1); else {
                    var S = new mjcore["MJMing"]();
                    S.type = mjcore["E_Ming"]["gang_an"], S.from = [W, W, W, W], S.pais = this["getAngangTile"](B["tiles"]);
                    for (var v = [], i = 0; i < S.pais["length"]; i++) v.push(-1);
                    Q["DesktopMgr"].Inst["players"][Z]["AddMing"](S, v, !1);
                }
                if (Q["DesktopMgr"].Inst.mode == Q["EMJMode"]["live_broadcast"] && uiscript["UI_Live_Broadcast"].Inst["during_play"] && V >= 0 && B["operations"]) for (var i = 0; i < B["operations"]["length"]; i++) Q["ActionOperation"].ob(B["operations"][i], V, 450);
                Q["DesktopMgr"].Inst["waiting_lingshang_deal_tile"] = !0, B.muyu && Q["DesktopMgr"].Inst["onMuyuChange"](B.muyu, !1);
            }, V["getAngangTile"] = function (B) {
                var V = [];
                if (Q["DesktopMgr"].Inst["is_chuanma_mode"]() || '0' != B["charAt"](0) && '5' != B["charAt"](0) || 'z' == B["charAt"](1)) for (var W = 0; 4 > W; W++) {
                    var Z = mjcore["MJPai"]["Create"](B);
                    Q["DesktopMgr"].Inst["is_jiuchao_mode"]() && (Z["touming"] = 3 != W), V.push(Z);
                } else {
                    var S = 1;
                    if (Q["DesktopMgr"].Inst["game_config"]) {
                        var v = Q["DesktopMgr"].Inst["game_config"].mode;
                        if (v && v["extendinfo"]) {
                            var i = JSON["parse"](v["extendinfo"]);
                            if (i && null != i["dora_count"]) switch (i["dora_count"]) {
                                case 0:
                                    S = 0;
                                    break;
                                case 2:
                                    S = 1;
                                    break;
                                case 3:
                                    S = 1;
                                    break;
                                case 4:
                                    S = 'p' == B["charAt"](1) ? 2 : 1;
                            }
                        }
                        if (v && v["detail_rule"] && v["detail_rule"] && null != v["detail_rule"]["dora_count"]) switch (v["detail_rule"]["dora_count"]) {
                            case 0:
                                S = 0;
                                break;
                            case 2:
                                S = 1;
                                break;
                            case 3:
                                S = 1;
                                break;
                            case 4:
                                S = 'p' == B["charAt"](1) ? 2 : 1;
                        }
                    }
                    for (var W = 0; 4 > W; W++) {
                        var Z = mjcore["MJPai"]["Create"](B);
                        Q["DesktopMgr"].Inst["is_jiuchao_mode"]() && (Z["touming"] = 3 != W), Z.dora = 0 == W ? !1 : S >= W, V.push(Z);
                    }
                }
                return Q["DesktopMgr"].Inst["waiting_lingshang_deal_tile"] = !0, V;
            }, V;
        }(Q["ActionBase"]);
        Q["ActionAnGangAddGang"] = B;
    }(view || (view = {}));


}

// console.log(testData2.map(tile => soulTile2MjaiTile(tile)));
// console.log(JSON.stringify(convertActions2Log(testLog2)));

// requestServer(convertActions2Log(testLog2)).then(res => res.json()).then(res => {
//     console.log(res);
//     console.log(res[0].moves, res[0].moves[0].actor)
//
//     return res;
// })

