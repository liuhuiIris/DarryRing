//加载模块
var gulp = require("gulp");
//合并文件
var concat = require("gulp-concat");
//热部署(即时更新)
var connect = require("gulp-connect");
//编译sass
var sass = require("gulp-ruby-sass");
//压缩文件
var uglify = require("gulp-uglify");
//重命名
var rename = require("gulp-rename");

//定义处理html的任务
gulp.task("refreshHTML",function(){
	gulp.src("./*.html").pipe(connect.reload());
});

//编译sass任务
gulp.task("compileSass",function(){
	sass("./scss/**/*.scss",{style:"compact"}).pipe(gulp.dest("./css"));
});

//处理CSS任务
gulp.task("css",function(){
	gulp.src("./css/*.css").pipe(connect.reload());
});

//处理JS任务
gulp.task("js",function(){
	gulp.src("./js/pagejs/index.js").pipe(uglify()).pipe(rename("index.min.js")).pipe(gulp.dest("./dist/js/pagin"));
	gulp.src("./js/pagejs/diamond.js").pipe(uglify()).pipe(rename("diamond.min.js")).pipe(gulp.dest("./dist/js/pagin"));
	gulp.src("./js/pagejs/login.js").pipe(uglify()).pipe(rename("login.min.js")).pipe(gulp.dest("./dist/js/pagin"));
	gulp.src("./js/pagejs/detail.js").pipe(uglify()).pipe(rename("detail.min.js")).pipe(gulp.dest("./dist/js/pagin"));
	gulp.src("./js/pagejs/shoppingcar.js").pipe(uglify()).pipe(rename("shoppingcar.min.js")).pipe(gulp.dest("./dist/js/pagin"));
	gulp.src("./js/module/header.js").pipe(uglify()).pipe(rename("header.min.js")).pipe(gulp.dest("./dist/js/module"));
	gulp.src("./js/module/footer.js").pipe(uglify()).pipe(rename("footer.min.js")).pipe(gulp.dest("./dist/js/module"));
	gulp.src("./js/module/nav.js").pipe(uglify()).pipe(rename("nav.min.js")).pipe(gulp.dest("./dist/js/module"));
	gulp.src("./js/module/sub_nav.js").pipe(uglify()).pipe(rename("sub_nav.min.js")).pipe(gulp.dest("./dist/js/module"));
	gulp.src("./js/module/url.js").pipe(uglify()).pipe(rename("url.min.js")).pipe(gulp.dest("./dist/js/module"));
	gulp.src("./js/module/error_msg.js").pipe(uglify()).pipe(rename("error_msg.min.js")).pipe(gulp.dest("./dist/js/module"));
	gulp.src("./js/module/GetData.js").pipe(uglify()).pipe(rename("GetData.min.js")).pipe(gulp.dest("./dist/js/module"));
	//plug下的所有JS文件压缩并同时合并成一个文件
	gulp.src("./js/plug/*.js").pipe(uglify()).pipe(concat("plug.min.js")).pipe(gulp.dest("./dist/js/plugin")).pipe(connect.reload());
})

//监听任务
gulp.task("watch",function(){
	//让tomcat启动一个服务器，使其实时刷新浏览器
	connect.server({
		livereload:true
	});
	gulp.watch("./*.html",["refreshHTML"]);
	gulp.watch("./scss/**/*.scss",["compileSass"]);
	gulp.watch("./css/**/*.css",["css"]);
	gulp.watch("./js/**/*.js",["js"]);
});

