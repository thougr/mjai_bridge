### 原作者AlphaJong的提醒

截止到2022年6月28日，有报告称玩家因为使用这个脚本而被封禁！
目前使用这个机器人已经不安全了，请大家小心!

## 关于这个工程
该项目是雀魂AI出牌的脚本，该项目是基于[AlphaJong](https://github.com/Jimboom7/AlphaJong) 的代码编写的，部分代码参考了[Avenshy](https://github.com/Avenshy/mahjong-helper-majsoul) 的mahjong-helper。原有的AI不太智能，所以本人选择改成采用[Akochan](https://github.com/critter-mj/akochan) 的AI。
由于Akochan采用的是mjai-log的形式通信和阅谱，该项目的工作一部分是将雀魂对战信息转化成mjai-log,
另一部分的工作如：与AI通信、注入原有的通信函数等等。


## 如何上手

* 在地址栏输入chrome://flags/#allow-insecure-localhost并启用，重启浏览器。
* 安装一个可以让你运行用户脚本的浏览器扩展，如 [Tampermonkey](https://www.tampermonkey.net/?locale=zh)油猴插件。
* 直接点击构建好的网页文件 [release of this project](https://github.com/thougr/mjai_bridge/releases/tag/1.0.0) ，并将其安装在你的浏览器扩展中。 (对于油猴插件，你可以在实用工具->从URL安装中输入下载地址)。
* 根据[mjai_server](https://github.com/thougr/mjai_server) 启动AI服务器(推荐用docker)。
* 打开 [雀魂](https://game.maj-soul.com/1/) (打开之前确定你已经登录进雀魂)。
* 进入任一一个对局，当对局开始点击“Start Bot”。
* 你可以勾选 “Autostart new Game”，AI会自动启动新的游戏。
* 对局输出的日志将会显示在浏览器控制台 (Ctrl + Shift + J [Chrome] or Ctrl + Shift + K [Firefox])。

## 存在的问题

* Akochan AI执行速度有点慢，可能取决于电脑CPU，由于本人电脑性能一般，偶尔会出现8秒左右才会作出响应。可以换成Mortal?不过不懂深度学习，超出本人的能力范围。
* 不支持手动，只能自动。
* 代码很乱，有待整理。
* Akochan 随着局数增多变慢，服务器会卡死


## 其他注意事项
本工具封号风险巨大，仅供娱乐，本作者不负责。
其他可参考https://github.com/Jimboom7/AlphaJong