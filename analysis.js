$(function(){
	// var fullpage=$('.fullpage');
	// var section=fullpage.children();
	// var vh=$(window).height();
	// var current=0;
	// var flag=true;
	// $(window).on('wheel',function(e){
	// 	if(e.originalEvent.wheelDeltaY<0){
	// 		if(flag){
	// 			flag=false;
	// 			current+=1;
	// 			if(current>3){
	// 				current=3;
	// 				flag=true;
	// 			}
	// 			fullpage.css('transform','translate3d(0,'+-current*vh+'px,0)');
	// 		}
	// 	}else{
	// 		if(flag){
	// 			flag=false;
	// 			current-=1;
	// 			if(current<0){
	// 				current=0;
	// 				flag=true;
	// 			}
	// 			fullpage.css('transform','translate3d(0,'+-current*vh+'px,0)');
	// 		}
	// 	}
	// })
	// fullpage.on('transitionend',function(){
	// 	flag=true;
	// })
	
	var fullpage=$('.fullpage');
	var section=fullpage.children();
	var lis=$('.slide li');
	var downs=$('.fullpage .down');
	var vh=$(window).height();
	var state={
		current:0,
		flag:true
	}
	windowResize=function(){
		window.onresize=function(){
			vh=$(window).height();
		}
	}
	move=function(){
		windowResize();
		fullpage.css('transform','translate3d(0,'+-state.current*vh+'px,0)');
		section.removeClass('active').eq(state.current).addClass('active');
		lis.removeClass('active').eq(state.current).addClass('active');
	}
	next=function(){
		state.current+=1;
		state.flag=false;
		if(state.current>section.length-1){
			state.current=section.length-1;
			state.flag=true;
		}
		// state.current=++state.current>section.length-1?section.length-1:state.current;
		move();	
	}
	prev=function(){
		state.current-=1;
		state.flag=false;
		if(state.current<0){
			state.current=0;
			state.flag=true;
		}
		// state.current=--state.current<0?0:state.current;
		move();
	}
	flagTrue=function(){
		fullpage.on('transitionend',function(){
			state.flag=true;
		})
	}
	mouseWheel=function(e){
		if(e.originalEvent.wheelDeltaY<0){
			next();
		}else{
			prev();
		}
		flagTrue();
	}
	$(window).on('wheel',function(e){
		if(state.flag){
			mouseWheel(e);
		}
	})
	lis.on('click',function(){
		state.current=$(this).index();
		move()
	})
	lis.hover(
		function(){
			$(this).children().addClass('active');
		},
		function(){
			$(this).children().removeClass('active');
		}
	)
	downs.on('click',function(){
		state.current=$(this).parent().index()+1;
		move()
	})
	document.onkeydown=function(e){
		if(e.keyCode==38){
			prev();
		}
		if(e.keyCode==40){
			next();
		}
	}


})