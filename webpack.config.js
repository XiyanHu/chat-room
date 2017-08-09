var webpack = require('webpack');
var path = require("path")

module.exports = {
	entry:[
		// for hot loader: WebpackDevServer host and port
		"webpack-dev-server/client?http://localhost:8080",
		// for hot loader: "only" prevents reload on syntax errors
		"webpack/hot/only-dev-server",
		// our appʼs entry point
		"./src/client/index.js"
	],
	module:{//这里通过正则表达式去匹配不同后缀的文件名，然后给它们定义不同的加载器
		loaders:[{
			test:/\.jsx?$/,
			include: path.join(__dirname,"src"),
			loaders: ["react-hot-loader","babel-loader"],//specify -loader
		}]
	},
	resolve:{//resolve属性中的extensions数组中用于配置程序可以自行补全哪些文件后缀
		extensions:[".js",".jsx"]
	},
	output:{
		path: __dirname + "/public/build",
		filename:"boundle.js",
		publicPath:"http://localhost:8080/build",
	},
	devServer: {
		contentBase: "./public",
		hot: true,
		host:"localhost",
		proxy:{
			"*": "http://localhost:"+3000
		}
	},
	plugins:[
		new webpack.HotModuleReplacementPlugin()
	]	
}