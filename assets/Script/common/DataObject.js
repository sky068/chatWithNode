/**
 * Created by skyxu on 2018/3/23.
 */

"use strict";

/**
 * 基础数据对象
 */
let DataObject = cc.Class({
    properties: {},

    /**
     * 解析数据
     * @param data {Object} JSON Object
     * @returns {DataObject}
     */
    parse(data){
        var key;
        for (key in data) {
            if (!this.hasOwnProperty(key)) {
                continue;
            }

            if (data[key] !== undefined && data[key] !== null) {
                this[key] = data[key];
            }
        }
        return this;
    },

    // 只保留属性字段，不保留function
    toString(){
        return JSON.stringify(this);
    }
});

/**
 * 玩家基础数据
 */
let PlayerObject = cc.Class({
    extends: DataObject,

    properties: {
        alias: "player",
        sid: 0,
        fbid: 0,
        fbtoken: 0,
        fbicon: "",
        fbname: "",
        fb_cache_key: "",           // facebook icon cache key
        hadShowFb: false,

        coins: 0,                   // 初始金币
        bestScore: 0,               // 最高得分
        gun1Opened: true,           // 枪支是否解锁
        gun2Opened: false,
        gun3Opened: false,
        gun4Opened: false,
        gun5Opened: false,
        gun1Level: 1,               // 枪支等级
        gun2Level: 1,
        gun3Level: 1,
        gun4Level: 1,
        gun5Level: 1,
        curGun: 1,                  // 当前选择的枪
        rmAds: false,               // 移除广告
        _lastOnlineTime: 0,         // 上一次上线时间(单位秒)
        lastOnlineTime: {
            get () {
                return this._lastOnlineTime;
            },
            set (value) {
                this._lastOnlineTime = value;
            }
        },
        lastOfflineTime: 0,         // 上一次离线时间(单位秒)
        hasGetOfflineReward: false, // 是否已经领取了离线奖励
        lastOfflineReward: 0,       // 上一次尚未领取的离线奖励

        lastDailyRewardTime: 0,     // 上一次领取每日奖励的时间(单位秒)

        normalGameTimes: 0,         // 普通游戏次数(不包括挑战关卡)
        challengeGameTimes: 0,      // 挑战关卡游戏次数

        _completeChallengeId: 0,    // 完成的挑战关卡的最大等级
        completeChallengeId: {
            get () {
                return this._completeChallengeId;
            },
            set (value) {
                if (value > this._completeChallengeId) {
                    this._completeChallengeId = value;

                    this.isPlayChallengeComplete = true;
                }
            }
        },

        isPlayChallengeComplete: false, // 是否需要播放挑战完成动画

        // 观看广告相关
        shopAdsTimes: 0,
        shopAdsLastTime: 0,

        gun1_showAds: 0,
        gun2_showAds: 0,
        gun3_showAds: 0,
        gun4_showAds: 0,
        gun5_showAds: 0,

        gun1_dayShowAds: 0,
        gun2_dayShowAds: 0,
        gun3_dayShowAds: 0,
        gun4_dayShowAds: 0,
        gun5_dayShowAds: 0,

        gun1_lastShowAds: 0,
        gun2_lastShowAds: 0,
        gun3_lastShowAds: 0,
        gun4_lastShowAds: 0,
        gun5_lastShowAds: 0,

        subsRewardLastTime: 0,
        subsTipHadShow: false,
        
        afterPlayAdsInfo: null
    },

    ctor(){
        this.props = cc.js.createMap();

        if (this.lastDailyRewardTime === undefined) {
            this.lastDailyRewardTime = 0;
        }
        if (this.normalGameTimes === undefined) {
            this.normalGameTimes = 0;
        }
        if (this.challengeGameTimes === undefined) {
            this.challengeGameTimes = 0;
        }

        // 初始化是否开启时间验证
        if (this.isControlTime === undefined) {
            this.isControlTime = true;
        }
    },

    /**
     * 获得所有枪支中最高的等级
     * @returns {number}
     */
    getMaxGunLevel(){
        let maxLevel = 0;
        for (let i = 1; i <= Global.config.GUN_COUNTS; i++) {
            maxLevel = Math.max(maxLevel, this[cc.js.formatStr("gun%dLevel", i)]);
        }

        return maxLevel;
    }
});

/**
 * 道具数据
 */
let PropObject = cc.Class({
    extends: DataObject,

    properties: {
        type: 0, // 道具类型
        num: 0   // 道具数量
    },

    ctor(){
    },

    init(type, num) {
        this.type = type;
        this.num = num;
    }
});

/**
 * 玩家付费数据
 */
let IAPObject = cc.Class({
    extends: DataObject,

    properties: {
        hadPay: 0,              // 消费总数
        propRefreshTime: 0,     // 道具下次刷新时间
        prop1hadBuy: false,
        prop2hadBuy: false,
        prop3hadBuy: false,
        shopProps: [],          // 商店道具信息
        showPropTips: false,    // 显示道具刷新提示
        vipValid: false,       // vip是否有效
    }
});

/**
 * 游戏设置信息
 */
let SettingObject = cc.Class({
    extends: DataObject,

    properties: {
        musicOn: true,
        effectOn: true,
        musicVol: 1,
        effectVol: 1,
        notify: true
    }
});

let AchieveObject = cc.Class({
    extends: DataObject,

    properties:{
        accCoins: 0,        // 累计获得的金币
        killMonsters: 0,    // 杀死敌人数量
        gotFrozens: 0,      // 获得冰冻道具数量
        gotShields: 0,      // 获得护盾道具数量
        hadDone: null,      // 标记已经达成的成就 hadDone['id'] = true
    },
    ctor(){
        this.hadDone = cc.js.createMap();
    }
});

/**
 * 宝箱奖励信息
 */
let ChestObject = cc.Class({
    extends: DataObject,

    properties:{
        oneOnlyNum: 0,          // 只开启一个宝箱的计数,
        starNumCollect: 0,      // 已经收集的星星，获得奖励后清零
        shortOpenTime: 0,       // 短时宝箱开启时间(秒)
        longOpenTime: 0,        // 长时宝箱开启时间(秒)
        showChestTips: false,   // 显示开启宝箱提示
    }
});

let GuideObject = cc.Class({
    extends: DataObject,

    properties: {}
});

module.exports = {
    DataObject: DataObject,
    PlayerObject: PlayerObject,
    PropObject: PropObject,
    IapObject: IAPObject,
    SettingObject: SettingObject,
    GuideObject: GuideObject,
    ChestObject: ChestObject,
    AchieveObject: AchieveObject
};