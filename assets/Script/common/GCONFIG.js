/**
 * Created by skyxu on 2018/3/13.
 * 游戏中全局固定配置文件
 */

"use strict";

let GCONFIG = GCONFIG || {};

GCONFIG.DEBUG_MODE = false; // 是否debug模式

GCONFIG.GUN_COUNTS = 5;

//------------key start------------
GCONFIG.KEY_SETTING = "KEY_SETTING";
GCONFIG.KEY_PLAYERDATA = "KEY_PLAYERDATA";
GCONFIG.KEY_IAPDATA = "KEY_IAPDATA";
GCONFIG.KEY_GAME_GUIDE_DATA = "KEY_GAME_GUIDE_DATA";
GCONFIG.KEY_CHEST_DATA = "KEY_CHEST_DATA";
GCONFIG.KEY_ACHIEVE_DATA = "KEY_ACHIEVE_DATA";

//-------------key end-------------

GCONFIG.ENEMY_MAX_WIDTH = 100;
GCONFIG.ENEMY_MIN_WIDTH = 70;

GCONFIG.ENEMY_MAX_BLOOD = 30;
GCONFIG.ENEMY_MIN_BOOD = 10;

// 每日游戏通知的小时数
GCONFIG.NOTIFICATION_DAILY_GAME_HOURS = 18;
GCONFIG.NOTIFICATION_DAILY_GAME_HOURS_1 = 12;

//------------event start----------
GCONFIG.EVENT_CHANGE_SCENE = "GAME_EVENT_CHANGE_SCENE";
GCONFIG.EVENT_BULLET_CONTACT = "GAME_EVENT_BULLET_CONTACT";             // 敌人被子弹击中
GCONFIG.EVENT_PLAYER_HITED = "GAME_EVENT_PLAYER_BE_HITED";              // 玩家被击中
GCONFIG.EVENT_BULLET_START_SECKILL = "GAME_EVENT_BULLET_START_SECKILL"; // 激光子弹开启秒伤
GCONFIG.EVENT_BULLET_END_SECKILL = "GAME_EVENT_BULLET_END_SECKILL";     // 激光子弹关闭秒伤
GCONFIG.EVENT_ENEMY_DIE = "GAME_EVENT_ENEMY_DIE";                       // 敌人被消灭
GCONFIG.EVENT_ENEMY_BREED = "GAME_EVENT_ENEMY_BREED";                   // 敌人被消灭后分裂
GCONFIG.EVENT_ENEMY_DROPREWARD = "GAME_EVENT_ENEMY_DROPREWARD";         // 敌人被消灭后掉落奖励
GCONFIG.EVENT_ENEMY_COINS_REWARD = "GAME_EVENT_ENEMY_COINS_REWARD";     // 碰到奖励
GCONFIG.EVENT_GAME_ADDSCORE = "GAME_EVENT_ADDSORE";                     // 加分数
GCONFIG.EVENT_GAME_ADDREWARD = "GAME_EVENT_ADDREWARD";                  // 奖励
GCONFIG.EVENT_SELECT_GUN = "GAME_EVENT_SELECT_GUN";                     // 选择角色
GCONFIG.EVENT_USER_COINS_CHANGED = "GAME_EVENT_USER_COINS_CHANGED";     // 金币刷新
GCONFIG.EVENT_TIPS_UPDATE = "GAME_EVENT_TIPS_UPDATE";         // 刷新角色tips

GCONFIG.EVENT_NETWORK_OPENED = "GAME_EVENT_NETWORK_OPENED";
GCONFIG.EVENT_NETWORK_CLOSED = "GAME_EVENT_NETWORK_CLOSED";
GCONFIG.EVENT_CHAT = "GAME_EVENT_CHAT";


GCONFIG.EVENT_START_GAME = "EVENT_START_GAME"; // 开始游戏

GCONFIG.EVENT_CLOSE_AD_REWARD_VIDEO = "EVENT_CLOSE_AD_REWARD_VIDEO"; // 关闭激励视频广告
GCONFIG.EVENT_AD_REWARD_VIDEO_LOADED = "EVENT_AD_REWARD_VIDEO_LOADED"; // 激励视频广告加载完成

GCONFIG.EVENT_CHALLENGELEVEL_SHOW_COMPLETE = "EVENT_CHALLENGELEVEL_SHOW_COMPLETE"; // 挑战关卡界面显示完成

GCONFIG.EVENT_UPDATE_FB_ICON = "GAME_EVENT_UPDATE_FB_ICON";
GCONFIG.EVENT_UPDATE_FB_NAME = "GAME_EVENT_UPDATE_FB_NAME";
GCONFIG.EVENT_BIND_FB_SUC = "GAME_EVENT_BIND_FB_SUC";

GCONFIG.EVENT_SUBS_SUC = "GAME_EVENT_SUBS_SUC";

//------------event end------------


GCONFIG.USER_BASE_COINS = 1000;
GCONFIG.BIND_FB_COINS = 200;
GCONFIG.SUBS_REWARD = 2000;

GCONFIG.UNLOCK_ROLE_LEVEL_ID = 15;

//------sibling index start--------
GCONFIG.SIBLING_INDEX_MAX = 100;
GCONFIG.LOCAL_ZINDEX_MAX = 100;
//------sibling index end----------

//------------IAP start------------
GCONFIG.IAPCFG = {
    coins5:{
        price: 0.99,
        coins: 4000,
        key: "coins5"
    },
    coins6:{
        price: 3.99,
        coins: 20000,
        key: "coins6"
    },
    coins7:{
        price: 6.99,
        coins: 32000,
        key: "coins7"
    },
    coins8:{
        price: 9.99,
        coins: 80000,
        key: "coins8"
    },

    coinsAds: {
        adsNeed: 5,
        coins: 200
    }
};

//------------IAP end--------------

/*--------------------facebook begin-------------------*/
//fb id
GCONFIG.FACEBOOK_ID = "521407594945724";
// fb permissions(exclusive "user_friends")
GCONFIG.FACEBOOK_PERMISSIONS  = ["public_profile", "email"];
/*--------------------facebook end-------------------*/

module.exports = GCONFIG;