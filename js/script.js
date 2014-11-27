(function ($) {
	var $focus = $('#focus'), //轮播图盒子
		sWidth = $focus.width(), //轮播图盒子的宽度 （显示面积）
		len = $focus.find('li').length, //轮播图的数量
		index = 0, //索引
		picTimer; //计时器

	// 给轮播图添加左右按钮和小按钮
	var btn = "<div class='btn'>";
	for(var i = 0; i < len; i++){
		btn += "<span></span>";
	};
	btn += "</div><div class='preNext pre'><</div><div class='preNext next'>></div>";
	$focus.append(btn);

	// 给小按钮和左右按钮添加鼠标移出移入事件
	$focus.find('span').css('opacity', 0.2).hover(function() {
		$(this).stop(true, false).animate({"opacity": "0.5"},300);
	}, function() {
		$(this).stop(true, false).animate({"opacity": "0.2"},300);
	});

	$focus.find('.preNext').css("opacity", 0.2).hover(function() {
		$(this).stop(true, false).animate({"opacity": "0.5"},300);
	}, function() {
		$(this).stop(true, false).animate({"opacity": "0.2"},300);
	});

	// 给小按钮和左右按钮添加点击事件
	$focus.find('.pre').click(function() {
		index -= 1;
		if(index == -1) index = len - 1;
		showPics(index);
	});

	$focus.find('.next').click(function() {
		index += 1;
		if(index == len) index = 0;
		showPics(index);
	});

	$focus.find('span').click(function() {
		index = $(this).index();
		showPics(index);
	});

	// 设置ul的宽度，和默认小按钮的样式
	$focus.find('ul').css("width", sWidth * (len));
	$focus.find('span').eq(0).css("opacity", "1");

	// 给轮播图盒子设置鼠标移入移出事件,滑入停止自动轮播，滑出继续自动轮播
	$focus.hover(function() {
		clearInterval(picTimer);
	}, function() {
		picTimer = setInterval(function() {
			showPics(index);
			index++;
			if(index == len) index = 0;
		},3000);
	}).trigger('mouseleave');

	// 显示图片函数，根据接收的index值显示相应的内容
	var showPics = function(index) {
		var nowLeft = -index * sWidth;
		$focus.find('ul').stop(true, false).animate({"left": nowLeft}, 300);
		$focus.find('span').stop(true, false).animate({"opacity": "0.4"}, 300).eq(index).stop(true, false).animate({"opacity": "1"}, 300);
	};
})(jQuery);