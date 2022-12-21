# scutMusic
一个基于vue, django的前后端开发的项目

## 配置环境
python环境 3.7 (python版本其实倒是问题不大)
npm 环境 16+ 或者 以下的版本

所需python包 
- django 3.2.15  
- django-simpleui
- django-cors-headers
- djangorestframework

## 运行
终端输入 python manager.py runserver 
然后打开网址 http://127.0.0.1:8000/ 即可

## 直接访问
http://140.82.50.156/

## 服务器部署 指令链接
https://gist.github.com/mediocrer/db848bdb4a02ee0ce788cbe4d1170de0

重新部署操作
sudo systemctl stop nginx
sudo pkill -f uwsgi -9

python manager.py collectstatic

sudo systemctl start nginx
uwsgi --ini uwsgi.ini