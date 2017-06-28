##CSAIR-H5

### 分支介绍
    master：主干分支，生产上线的代码
    dev: 开发版本的分支（该分支可以繁衍更多的分支，主要在于开发者延展或版本管理扩展）
    docs：该分支由master分支分下来，不合并到master下，主要在于开发人员项目文档和日志的存放与管理。
    
### 开发人员需要checkout两个分支
    分支一: dev
    分支二：docs
    
    命令行：
        git clone https://git.coding.net/Sonny/CSAIR-H5.git -b dev -l CSAIR-H5-dev 
        git clone https://git.coding.net/Sonny/CSAIR-H5.git -b docs -l CSAIR-H5-docs 
        
    以上命令克隆远程两个分支
    
    查看分支：git branch
    切换分支：git checkout docs|dev
    根据当前分支创建本地分支：git checkout -b localName

### 代码提交步骤
    1   git add . ：提交内容到缓冲区中
    2   git status  ：查看添加文件的状态
    3   git pull origin dev ：拉取远程更新的内容
    4   git commit -m "add comment xxxx" ：添加备注
    5   git push origin dev ：提交当前内容
