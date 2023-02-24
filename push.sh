#! /bin/bash


echo image:**$1** version:**$2**
if  [ -z "$1"  -o  -z "$2" ]
then
  echo wrong input
  exit 1
fi
web=$(docker image ls | grep kanban-$1 | grep latest | awk '{print $3}' )
docker tag $web registry.cn-shenzhen.aliyuncs.com/uqi/kanban-$1:$2
docker push registry.cn-shenzhen.aliyuncs.com/uqi/kanban-$1:$2
echo push registry.cn-shenzhen.aliyuncs.com/uqi/kanban-$1:$2 Done.



# eval$( shell docker image ls | grep kanban-web | grep latest | awk '{print $3}')