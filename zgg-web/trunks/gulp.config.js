/**
* create by bl.jiang on 2017/7/24
*/
module.exports = {
    "sourcePath": "./src",
    "destPath": "./dist",
    "devServer": "./dev-server",
    "devPort": 8080,
    "version": "1.0.0",         // 版本号
    "platforms": {
        "localhost": {
            "path": "resources/localhost"
        },
        "zgg-web-master": {
            "path": "resources/zgg-web-master"
        },
        "zgg-web-model": {
            "path": "resources/zgg-web-model"
        },
        "zgg-web-develop": {
            "path": "resources/zgg-web-develop"
        }
    }
};