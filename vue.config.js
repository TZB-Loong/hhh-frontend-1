
module.exports = {
    publicPath: '/', //输出目录
    outputDir: "dist", // 打包生成的文件存放地址
    assetsDir: '', //放置生成的静态资源包
    indexPath: 'index.html', // 生成的index.html 路径
    filenameHashing: "true", //静态资源的页面缓存
    lintOnSave:true,//是否在每次保存时使用eslint检查
    transpileDependencies:['vux'], //导入vux 
    pages: {
        index: {
            entry: 'src/main.js', //page 入口
            template: 'public/index.html', //模板来源
            filename: 'index.html', //在 dist/index.html 的输出
            title: 'Index Page', //在 dist/index.html 的输出,template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            chunks: ['chunk-vendors', 'chunk-common', 'index'] //提取出来的通用 chunk 和 vendor chunk
        },
        // 当使用只有入口的字符串格式时，
        // 模板会被推导为 `public/subpage.html`
        // 并且如果找不到的话，就回退到 `public/index.html`。
        // 输出文件名会被推导为 `subpage.html`
        // subpage: 'src/subpage/main.js'
    },
    chainWebpack:config=>{ //合并到webpack配置文件中
        
    },
    configureWebpack:config=>{
        // vux2必须配合vux-loader使用
        require('vux-loader').merge(config, {
            options: {},
            plugins:[{name:'vux-ui'},{ name:'duplicate-style'}],
            resolve:{extensions: ['.js', '.vue', '.json']}
        })
    },
    lintOnSave: 'error',// 是否在保存的时候检查(true,false) error 错误直接显示在浏览器（强制导致编译失败） 
    productionSourceMap: true,// 生产环境是否生成 sourceMap 文件
    css: {
        extract: true,// 是否使用css分离插件 ExtractTextPlugin
        sourceMap: false,// 开启 CSS source maps
        loaderOptions: {},// css预设器配置项
        requireModuleExtension: false// 启用 CSS modules for all css / pre-processor files.
    },

    devServer: { //环境配置
        host: 'localhost',
        port: 8080,
        https: false,
        hotOnly: false,
        open: true, //配置自动启动浏览器
        proxy: {// 配置多个代理(配置一个 proxy: 'http://localhost:4000' ) 
            '/api': {
                target: 'https://ce-sit.evergrandelife.com.cn/',
                ws: true,
                changeOrigin: true,
                pathRewrite:{
                    "^/api":''
                }
            },
        }
        // pluginOptions: {// 第三方插件配置
        //     // ...
        // }
    }
}