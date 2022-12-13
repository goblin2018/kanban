#!/usr/bin/env bash

table=$2
host=127.0.0.1
port=3369
dbname=$1
username=goblin
passwd=xy2089

echo "开始创建数据库 $dbname 表 $1"
goctl model mysql datasource -url="${username}:${passwd}@tcp(${host}:${port})/${dbname}" -table=${table} -dir=. -cache=true --style=goZero