module.exports = {
    plugins: [
        [
            'autoprefixer', {
                "overrideBrowserslist": [
                    "> 1%", // 超过1%的人使用的浏览器
                    "last 2 versions" // 兼容到浏览器最后2个版本
                ]
            }

        ]
    ]
}