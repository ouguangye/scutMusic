# scutMusic
前端基于vue2, 后端基于django的前后端分离项目

## 项目背景
做一个音乐播放网站
音乐来源是基于网易云接口。
使用用户身份包括普通用户和管理员。

### 功能
### 普通用户功能
- 登录、注册、找回密码
- 查看、搜索所有专辑
- 收藏自己喜欢的专辑
- 上传专辑
- 查看自己专辑上传状态，相关状态分为审核未通过、待审核、审核已通过
- 修改自己上传的专辑
- 进入专辑详情页面， 依次播放专辑中所有歌曲 或者 只播放单一一首歌曲
- 对专辑进行评论、或者对他人的评论进行评论
### 管理员用户功能
- 查看、修改数据库的内容
- 对用户上传的专辑进行审核 

## 安装
python环境 3.7 +
npm 环境 16+ 或者 以下的版本

所需python包 
- django 3.2.15  
- django-simpleui
- django-cors-headers
- djangorestframework


部署 [网易云接口](https://github.com/Binaryify/NeteaseCloudMusicApi) 项目在3000 端口上
## 运行
运行
``` 
python manager.py runserver
``` 
然后打开网址 http://127.0.0.1:8000/ 即可

## 直接访问
[个人部署在服务器上的项目，可能已经失效](http://140.82.50.156/)

## 服务器部署
如果想把项目部署在服务器上，可以参考 [ngnix 部署运行相关指令](https://gist.github.com/mediocrer/db848bdb4a02ee0ce788cbe4d1170de0)

## 使用
### 用户端
#### 登录、注册、找回密码
![1](https://user-images.githubusercontent.com/78332649/216554326-70ba5853-f12b-4d2b-9023-012a198072cb.png)

#### 查看、搜索所有专辑
![2](https://user-images.githubusercontent.com/78332649/216554591-c3a61020-aa72-452c-8c32-2e9b36e87bd5.png)

#### 收藏专辑
![3](https://user-images.githubusercontent.com/78332649/216555206-ac256935-8fd7-4f11-8e3c-065f0975ebac.png)

#### 上传专辑

![4](https://user-images.githubusercontent.com/78332649/216555679-229f6a9b-147e-48e8-b448-14858d5cccdd.png)

#### 查看自己专辑上传状态，相关状态分为审核未通过、待审核、审核已通过

![5](https://user-images.githubusercontent.com/78332649/216555953-6f14ec8d-ea96-4c65-b86a-f6bdf05df422.png)

#### 修改自己上传的专辑

![6](https://user-images.githubusercontent.com/78332649/216556088-7a1a5a90-f29b-4cb7-9084-ec8ac5d65ce2.png)

#### 进入专辑详情页面， 依次播放专辑中所有歌曲 或者 只播放单一一首歌曲

![7](https://user-images.githubusercontent.com/78332649/216556313-35dc617f-bff9-44ad-9a1b-1e438bae5e4b.png)

#### 对专辑进行评论、或者对他人的评论进行评论

![9](https://user-images.githubusercontent.com/78332649/216556488-4530603d-065e-4a7b-9d1c-b4f6447ea864.png)

### 管理员

#### 登录
![1](https://user-images.githubusercontent.com/78332649/216556922-6f28fc53-740e-4125-aa9b-387a651bffc0.png)

![2](https://user-images.githubusercontent.com/78332649/216556927-fd506d7f-e776-4ac1-9e43-58ff89e9697c.png)

#### 审核、修改 用户上传的专辑
![3](https://user-images.githubusercontent.com/78332649/216556931-8f1143be-cf71-40fb-9d99-cfcc523f195f.png)


## 参考
- [基于Vue2、element UI的高仿网易云播放器（PC）](https://github.com/isolcat/vue2-element-music)
- [Element UI](https://element.eleme.cn/#/zh-CN/component/divider)
- [Django框架教程](http://c.biancheng.net/django/)
- [网易云接口](https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=neteasecloudmusicapi)
- [手把手教你配置Django SimpleUI打造美丽后台](https://zhuanlan.zhihu.com/p/372185998)
