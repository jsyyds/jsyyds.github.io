---
title: 版本管理——Git
description: Git 是一个开源的分布式版本控制系统，用于敏捷高效地处理任何或小或大的项目。
img: https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Z2l0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80
alt: 版本管理——Git
tags:
  - web development
---
## 版本控制系统

版本控制系统即 VCS (version control system) 是一种记录若干文件的修订记录的系统，它帮助我们查阅或回到某个历史版本。

- “人肉” VCS

- LVCS 本地式

- CVCS 集中式

- DVCS 分布式

### “人肉” VCS

<img src="/img/版本管理_人肉_VCS.jpg" alt="版本管理_人肉_VCS" width="1520" height="234">

不予置评

### Local VCS - 本地式

- 举例

  - RCS(Revision Control System)

<img src="/img/版本管理_LVCS_本地式.jpg" alt="版本管理_LVCS_本地式" width="902" height="767">

- 好处

  - 维持了工作目录简洁

- 缺点

  - 无法支持多用户协同开发

### CVCS - 集中式

- 举例

  - CVS (Concurrent Versions System)

  - **SVN (Subversion)**

  - Perforce

<img src="/img/版本管理_CVCS_集中式.jpg" alt="版本管理_CVCS_集中式" width="907" height="720">

- 好处

  - 管理的点只在中央服务器上，可控性更高

- 缺点

  - 每次操作都要经过网络请求，影响操作流畅性

  - 单点故障，轻则无法操作，重则丢失历史消息

### DVCS - 分布式

- 举例

  - **Git**

  - Mercurial

<img src="/img/版本管理_DVCS_分布式.jpg" alt="版本管理_DVCS_分布式" width="754" height="840">

- 好处

  - 即使中央服务器发生故障，可以很容易从本地仓库还原

  - 如果大部分操作不需要同步到服务器的话，都可以在本地完成，可以让操作更加流畅

### 有了 VCS 之后...

- 可以回退到某个版本

- 可以查看某个历史版本

- 可以对比两个版本的差异

## 分支模型

- 分支

  从目标仓库获得一份项目拷贝，每条拷贝都有和原仓库功能一样的开发线

- 分支模型 (branching model)/工作流 (workflow)

  一个围绕项目*开发/部署/测试*等工作流程的分支操作 (创建，合并等) 规范集合

### 产品级的分支模型

**常驻分支**

- development

  - 从 master 创建

- production (master)

  - 默认分支

**活动分支**

- feature

  - 从 development 创建

- hotfix

  - 从 master 创建

- release: 如 release-110

  - 从 development 分支创建

### 分支模型 - 特性开发

<img src="/img/版本管理_特性开发.jpg" alt="版本管理_特性开发" width="1920" height="1080">

### 分支模型 - 发布线

<img src="/img/版本管理_发布线.jpg" alt="版本管理_发布线" width="1920" height="1080">

### 环境

- 开发环境

  - 跟随测试/开发配置

  - 使用需要提交到下一个 release 的特性分支

- 测试环境

  - 跟随测试配置

  - 使用 release/development 分支

- 预发布环境

  - 跟随线上配置

  - 使用 release 分支

- 生产环境

  - 跟随线上配置

  - 使用 master 分支

## Git

- git 是一个免费开源的分布式版本控制系统 (DVCS)

- git 是一个基于内容寻址的存储系统

### 历史

- git 的出现离不开 linux

  - 1991-2002: 几乎无版本控制 (patch 包)

  - 2002-2005: BitKeeper

  - 2005-至今: linux 的作者 linux 自己开发了 **git!!**

### 优势

- 快！

  不依赖于网络请求

- 完全的分布式

- 轻量级的分支操作

- Git 已经成为现实意义上的标准

  - Android

  - Apache

  - Eclipse

  - Gnome

  - **The Linux KernerPerl**

  - PostgreSQL

  - ...

  - 几乎所有优秀前端的开源项目

- 社区成熟活跃

  - **github**

## Git 命令详解

#### git help

它帮我们列出某个子命令的帮助文档

git help \<command\>

git \<command\> -h

git \<command\> --help

man git-\<command\>

勤查文档

### 基本操作

#### git config

- 用户配置

  - git config --global user.name "lucasliu"

  - git config --global user.email lucasliu@example.com

- 配置级别

  - --local \[默认，高优先级\]: 只影响本仓库

    - .git/config

  - --global \[中优先级\]: 影响到所有当前用户的 git 仓库

    - ~/.gitconfig

  - --system \[低优先级\]: 影响到全系统的 git 仓库

    - /etc/gitconfig

#### git init

初始化仓库

`git status`: 查看当前 git 仓库信息，没有初始化仓库时提示：

`fatal: Not a git repository (or any of the parent directorise): .git`

`git init` 初始化 git 仓库，产生 .git 文件夹，它几乎记录了所有我们提交的信息，以及一些引用关系。

#### git status

对状态的跟踪

- 未跟踪 <-> 跟踪

- 工作目录 <-> 暂存区

- 暂存区 <-> 最新提交

<img src="/img/版本管理_git_status.jpg" alt="版本管理_git_status" width="1805" height="822">

#### git add

添加文件内容到**暂存区 (同时文件被跟踪)**

<img src="/img/版本管理_git_add.jpg" alt="版本管理_git_add" width="911" height="748">

<img src="/img/版本管理_git_add1.jpg" alt="版本管理_git_add1" width="600" height="683">

我们可以通过 `git add .` 来添加当前目录的所有文件。这时可能会出现我们不希望被跟踪的一些配置文件被跟踪，这需要配置我们的忽略文件。

- .gitignore

  - 在添加时**忽略**匹配的问价

  - 仅作用于**未追踪**的文件

<img src="/img/版本管理_gitignore.jpg" alt="版本管理_gitignore" width="900" height="600">

github 官方 gitignore 模板：https://github.com/github/gitignore

#### git rm

- git rm --cached : 仅从暂存区删除

- git rm : 从暂存区与工作目录删除

- git rm $(git ls-files --deleted) : 删除所有被跟踪，但是在工作目录被删除的文件

\<!-- 在这里插入 -->

### 暂存区

暂存区可以想象成一个购物车：

- 每类物品之只能放置一次的购物车

  - 货架和购物车可以出现同种物品

  - 货架上的物品可以替换掉购物车物品

  - 可以删除物品

  - 提交购物车完成购买，生成购买记录

- 其中

  - 物品：文件

  - 货架：工作目录

  - 购物车：暂存区

  - 购买： 提交内容

\<!-- /在这里结束插入 -->

#### git commit

根据暂存区内容创建一个提交记录

- git commit -m '***'

  `-m` 参数帮助我们对这个提交进行注释，这样我们在进行 log 命令的时候可以得到一个友好的提示。

  <img src="/img/版本管理_git_commit.jpg" alt="版本管理_git_commit" width="772" height="328">


- git commit -a -m '***'

  直接提交到提交区。

  <img src="/img/版本管理_git_commit1.jpg" alt="版本管理_git_commit1" width="773" height="279">

#### git log

显示提交历史记录

```
$ git log

commit 2679dde...2458e : SHA-1 编码的 HASH 标识符

Author: lucasliu <lucasliu@example.com> : git config 配置的提交者信息

Date: Thu Mar 5 15:40:55 2020 +0800 : 提交时间
```

- git log --oneline

  显示精简提交历史记录

- git log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit

\<!-- 在这里插入 -->

### git 中的 alias 命令

- git config alias.shortname \<fullcommand\>

  ```
  $ git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"

  $ git lg

\<!-- /在这里结束插入 -->

#### git diff

显示不同版本差异

- git diff:

  - 工作目录与暂存区的差异

- git diff -cashed \[\<reference\>\]

  - 暂存区与某次提交差异，默认为 HEAD

- git diff \<reference\>

  - 工作目录与某次提交的差异

<img src="/img/版本管理_git_diff.jpg" alt="版本管理_git_diff" width="843" height="517">

#### 撤销本地修改

- git checkout -- \<file\>

  将文件内容从暂存区复制到工作目录 (放弃修改)

<img src="/img/版本管理_git_checkout.jpg" alt="版本管理_git_checkout" width="650" height="349">

#### 撤销暂存区内容

- git reset HEAD \<file\>

  将文件内容从上次提交复制到暂存区 (撤销上次提交)

<img src="/img/版本管理_git_reset.jpg" alt="版本管理_git_reset" width="652" height="340">

#### 撤销全部改动

- git checkout HEAD -- \<file\>

  将内容从上次提交复制到工作目录

<img src="/img/版本管理_git_checkout1.jpg" alt="版本管理_git_checkout1" width="689" height="334">

#### 基本操作总结

<img src="/img/版本管理_基本操作总结.jpg" alt="版本管理_基本操作总结" width="1920" height="1080">


### 分支操作

#### git branch

分支的增删改查都靠它

- git branch \<branchName\>

  创建一个分支

- git branch -d \<branchName\>

  删除指定的分支

- git branch -v

  显示所有的分支信息

#### git checkout

通过移动 HEAD 检出版本，可用于分支切换

- git checkout \<branchName\>

  将 HEAD 指针指向目标分支

- git checkout -b \<branchName\>

  创建一个分支并将 HEAD 指针指向它

- git checkout \<reference\>

  将其指向任何引用对象上

- git checkout -

  恢复到上一个分支

#### git reset

将当前分支回退到历史某个版本

- git reset --mixed \<commit\> (默认)

  回退到某一版本，并将当前内容复制到暂存区

- git reset --hard \<commit\>

  回退到某一版本，并将当前内容复制到暂存区和工作目录

- git reset --soft \<commit\>

  回退到某一版本，暂存区和工作区保持当前状态

#### git reflog

重新找回被回退的版本，但要尽快

\<!-- 在这儿开始插入 -->

### 使用捷径

- A^ : A 上的父提交

- A~n : 在 A 之前的第 n 次提交

<img src="/img/版本管理_使用捷径.jpg" alt="版本管理_使用捷径" width="1048" height="659">

\<!-- /在这里结束插入 -->

#### reset vs checkout

命令|范例|移动(HEAD/branch)|说明
-|-|-|-
git reset \<commit\>|git reset HEAD^ --soft|是/是|完全回退到某提交
git reset \<file\>|git reset README.md|否/否|恢复暂存区到某提交状态
git checkout \<commit\>|git checkout master|是/否|移动当前指针 HEAD 到某提交
git checkout \<file\>|git checkout -- README.md<br>git checkout HEAD -- xx.log|否/否|恢复工作目录到某状态

#### git stash

保存目前的工作目录和暂存区状态，并返回到干净的工作空间

- git stash save '***'

  将工作目录和暂存区保存起来，并写入注解

- git stash list

  查看 stash 目录

- git stash apply *stash@{0}*

  将保存的内容恢复到工作目录

- git stash drop *stash@{0}*

  将对应的 stash 记录删除

- git stash pop

  stash apply + stash drop

<img src="/img/版本管理_git_stash.jpg" alt="版本管理_git_stash" width="879" height="696">

#### git merge

合并分支

\<!-- 在这儿开始插入 -->

`$ git cat-file -p HEAD`

显示某个 git 对象的具体信息

\<!-- /在这儿结束插入 -->

<img src="/img/版本管理_git_merge.jpg" alt="版本管理_git_merge" width="1171" height="670">

<img src="/img/版本管理_git_merge1.jpg" alt="版本管理_git_merge1" width="1126" height="468">

#### merge fast-forward

快速向前合并

<img src="/img/版本管理_git_merge2.jpg" alt="版本管理_git_merge2" width="1021" height="437">

`$ git merge next --no-ff`

不使用 fast-forward 方式合并

<img src="/img/版本管理_git_merge3.jpg" alt="版本管理_git_merge1" width="1107" height="548">

#### merge 的不足

<img src="/img/版本管理_git_merge4.jpg" alt="版本管理_git_merge4" width="1519" height="820">

#### git rebase

修剪提交历史基线，俗称“变基”

<img src="/img/版本管理_git_rebase.jpg" alt="版本管理_git_rebase" width="1118" height="456">

`$ git rebase master`

<img src="/img/版本管理_git_rebase1.jpg" alt="版本管理_git_rebase1" width="1587" height="580">

#### git rebase --onto

<img src="/img/版本管理_git_rebase2.jpg" alt="版本管理_git_rebase2" width="1121" height="422">

`$ git rebase --onto master 5751363`

<img src="/img/版本管理_git_rebase3.jpg" alt="版本管理_git_rebase3" width="1581" height="597">

#### rebase vs merge

<img src="/img/版本管理_git_rebase_vs_git_merge.jpg" alt="版本管理_git_rebase_vs_git_merge" width="1920" height="1080">

#### 勿在共有分支使用 rebase

<img src="/img/版本管理_git_rebase4.jpg" alt="版本管理_git_rebase4" width="1397" height="387">

<img src="/img/版本管理_git_rebase5.jpg" alt="版本管理_git_rebase5" width="1484" height="419">

#### git tag

对某个提交设置一个不变的别名

`$ git tag v0.1 e39d0b2`

<img src="/img/版本管理_git_tag.jpg" alt="版本管理_git_tag" width="1116" height="451">

`$ git checkout v0.1`

### 远程操作

#### git push

提交本地历史到远程

#### git remote

远程仓库相关配置操作

配置远程映射：

`$ git remote add origin ~/git-server`

添加一个远程仓库别名

`$ git remote -v`

查看远程仓库信息

#### git fetch

获取远程仓库的提交历史

#### git fetch + merge

- 解决 git push 冲突

- git fetch + git merge = git pull

#### git clone

克隆一个远程仓库作为本地仓库

git init + git remote + git pull = git clone

### 其他参考

- [git-简明指南](http://rogerdudler.github.io/git-guide/index.zh.html)

- http://try.github.io/

- https://git-scm.com/book/zh/v2