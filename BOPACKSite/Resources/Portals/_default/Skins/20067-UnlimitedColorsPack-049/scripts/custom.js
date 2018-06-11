var windowbox=function(e){
	$("body").append("<div id=\"windowbox\"></div>");
	$("#windowbox").css({"position":"fixed","width":"100%","height":"100%"});
	height=$("#windowbox").height();
	width=$("#windowbox").width();
	$("#windowbox").remove();
	if(e=="height"){
	 return height
	}
	if(e=="width"){
	 return width;
	}
}


$(document).ready(function() {
	if($("#pagepiling").length!=0){
		$("body,html").css("overflow","hidden");
	}
})
jQuery(document).ready(function ($) {
	$(".body_bg").css("min-height",windowbox("height")) ;
	$(window).resize(function() {$(".body_bg").css("min-height",windowbox("height"));});
});
jQuery(document).ready(function ($) {
	var f = $("#right_folding"),
		r = $("#main_right"),
		c = $("#rightClose");
	f.click(function (e) {
		if (!$(this).hasClass("open")) {
			$(this).addClass("open");
			r.addClass("unfold");
		} else {
			$(this).removeClass("open");
			r.removeClass("unfold");
		}
	});
	c.click(function (e) {
		f.removeClass("open");
		r.removeClass("unfold");
	});
})
jQuery(document).ready(function ($) {
	if ($(".Login").find(".buttonGroup").find("li").length > 2) {
		$(".Login").addClass("info");
	}
})

jQuery(document).ready(function ($) {
	animationShow({"#searchbut":"#search"});
	animationShow({ "#list_ico1": "#search", "#list_ico2": "#list_con2", "#list_ico3": "#list_con3" });
	animationShow({"#mobile_ico1":"#mobile_user","#mobile_ico2":"#mobile_search"});
	animationShow({"#menu_ico":"#mobile_menu"});
})
//horizontalTab
jQuery(document).ready(function ($) {
	$(".horizontalTab_Bottom_1 .resp-tabs-list,.horizontalTab_Top_1 .resp-tabs-list,.horizontalTab_Top_2 .resp-tabs-list").each(function() {
        $(this).find("li").width((100/ $(this).find("li").length)+"%").show();
    });
	
})

//ourTeam
jQuery(document).ready(function ($) {
	$(".ourTeam").each(function() {
        var e=$(this),
			t=e.find(".ourTeam_thumbnail"),
			c=e.find(".ourTeam_content"),
			p=e.find(".ourTeam_img > img");
			tl=t.children("li"),
			cl=c.children(".item");
			 tl.click(function() {
				if(p.attr("src")!=$(this).attr("bigimg")) {
					$(this).addClass("active").siblings().removeClass("active");				 
					cl.eq( $(this).index()).stop().fadeIn(500).addClass("active").siblings().hide().removeClass("active");
					p.attr("src",$(this).attr("bigimg")).stop().fadeOut(0).fadeIn(500);
				}
    	    });
			tl.each(function() {
				var img =new Image();
					img.src=$(this).attr("bigimg");                
            });
			
    });
})


//Top:
jQuery(document).ready(function ($) {
	jQuery('#to_top').click(function () {
		jQuery('body,html').stop().animate({
			scrollTop: 0
		}, 800);
	});
	var backtop = function () {
		Math.max.call(window.scrollTop, document.body.scrollTop, document.documentElement.scrollTop) > 245 ? jQuery('#to_top').fadeIn(300) : jQuery('#to_top').fadeOut(300)
	}
	$(window).load(function () {
		backtop();
	})
	$(window).scroll(function () {
		backtop();
	})
	
	
	
		jQuery('.time_more span').click(function() {
			
			
		jQuery('body,html').animate({
			scrollTop:$(".time_pad").offset().top-40
		},
		800);
	});

});





jQuery(document).ready(function ($) {
	$("#header_slide").on("click",function(){
	 var e=$(this),box=$("#box-container"),ri=$(".rightmain");
	 if(box.length!=0){
	  if(box.hasClass("delay")) return false;	
	  if(!box.hasClass("active")){
		box.addClass("active");
		e.removeClass("active");
		 $(this).delay(500).queue(function(){
			ri.one("click",function(){
				box.removeClass("active").addClass("delay").delay(500).queue(function(){$(this).removeClass("delay").dequeue()});
				e.addClass("active");
			})
			$(window).one("scroll",function(){
				box.removeClass("active").addClass("delay").delay(500).queue(function(){$(this).removeClass("delay").dequeue()});
				e.addClass("active");
			})
			$(this).dequeue();
		 }) 
		}else{
			box.removeClass("active").addClass("delay").delay(500).queue(function(){$(this).removeClass("delay").dequeue()});;
			e.addClass("active");
		}
	}else{
		e.toggleClass("active");
		$(".left-menu").toggleClass("active");
	}	
		
	})
})
//chart 
$(window).load(function () {
	"use strict";
	var e_1 = $(".percentage1");
	e_1.easyPieChart({
		animate: 2000,
		barColor: e_1.css("color"),
		trackColor: "#eeeeee",
		size: 150,
		lineWidth: 11,
		lineCap: 'square',
		scaleColor: false,
		onStep: function(from, to, percent) {
			$(this.el).find('.percentage_inner span').text(Math.round(percent));
		}
	});
	var e_2 = $(".percentage2");
	e_2.easyPieChart({
		animate: 2000,
		barColor: e_2.css("color"),
		trackColor: "#ebebeb",
		size: 178,
		lineWidth: 5,
		lineCap: 'square',
		scaleColor: false,
		onStep: function(from, to, percent) {
			$(this.el).find('.percentage_inner span').text(Math.round(percent));
		}
	});
	var e_3 = $(".percentage3");
	e_3.easyPieChart({
		animate: 2000,
		barColor: e_3.css("color"),
		trackColor: "transparent",
		size: 178,
		lineWidth: 2,
		lineCap: 'square',
		scaleColor: false,
		onStep: function(from, to, percent) {
			$(this.el).find('.percentage_inner span').text(Math.round(percent));
		}
	});
});

//source_code 
jQuery(document).ready(function ($) {
	var $source = $(".source_code");
	$source.find("a").click(function () {
		$(this).siblings("pre").css("display") == "none" ? $(this).siblings("pre").slideDown(200) : $(this).siblings("pre").slideUp(200);
		$(this).siblings(".source_box").css("display") == "none" ? $(this).siblings(".source_box").slideDown(200) : $(this).siblings(".source_box").slideUp(200);
		return false;
	})
})


$(document).ready(function () {
	$(".carousel_1").each(function () {
		$(this).owlCarousel({
			items: $(this).attr("data-items") ? $(this).data("items") : 6,
			navigation: $(this).attr("data-navigation") ? $(this).data("navigation") : true,
			pagination: $(this).attr("data-pagination") ? $(this).data("pagination") : true,
			autoPlay: $(this).attr("data-autoplay") ? $(this).data("autoplay") 		 : true,
			autoHeight: $(this).attr("data-autoheight") ? $(this).data("autoheight") : true
		}).css("marginBottom", parseInt($(this).find(".owl-pagination").height()) + parseInt($(this).find(".owl-pagination").css("marginTop")) + parseInt($(this).css("marginBottom")) + "px");
	})
	$(".carousel_2").each(function () {
		$(this).owlCarousel({
			items: $(this).attr("data-items") ? $(this).data("items") : 4,
			navigation: $(this).attr("data-navigation") ? $(this).data("navigation") : true,
			pagination: $(this).attr("data-pagination") ? $(this).data("pagination") : true,
			  autoPlay: $(this).attr("data-autoplay")   ? $(this).data("autoplay") : true,
			autoHeight: $(this).attr("data-autoheight") ? $(this).data("autoheight") : true
		}).css("marginBottom", parseInt($(this).find(".owl-pagination").height()) + parseInt($(this).find(".owl-pagination").css("marginTop")) + parseInt($(this).css("marginBottom")) + "px");
	})
	
		$(".Detail2_carousel_4").each(function () {
		$(this).owlCarousel({
			items: $(this).attr("data-items") ? $(this).data("items") : 4,
			navigation: $(this).attr("data-navigation") ? $(this).data("navigation") : true,
			pagination: $(this).attr("data-pagination") ? $(this).data("pagination") : true,
			  autoPlay: $(this).attr("data-autoplay")   ? $(this).data("autoplay") : true,
			autoHeight: $(this).attr("data-autoheight") ? $(this).data("autoheight") : true
		}).css("marginBottom", parseInt($(this).find(".owl-pagination").height()) + parseInt($(this).find(".owl-pagination").css("marginTop")) + parseInt($(this).css("marginBottom")) + "px");
	})
		
		
		
		
				$(".time_carousel_4").each(function () {
		$(this).owlCarousel({
			items: $(this).attr("data-items") ? $(this).data("items") : 1,
			navigation: $(this).attr("data-navigation") ? $(this).data("navigation") : true,
			pagination: $(this).attr("data-pagination") ? $(this).data("pagination") : true,
			  autoPlay: $(this).attr("data-autoplay")   ? $(this).data("autoplay") : true,
			autoHeight: $(this).attr("data-autoheight") ? $(this).data("autoheight") : true,
				itemsDesktop: [1550, 1],
			itemsDesktopSmall: [1250, 1],
			itemsTablet: [930, 1],
			itemsMobile: [620, 1]
		}).css("marginBottom", parseInt($(this).find(".owl-pagination").height()) + parseInt($(this).find(".owl-pagination").css("marginTop")) + parseInt($(this).css("marginBottom")) + "px");
	})
	
		
		
	
	$(".carousel_3").each(function () {
		var e=$(this);
		$(this).owlCarousel({
			singleItem: true,
			navigation: $(this).attr("data-navigation") ? $(this).data("navigation") : true,
			pagination: $(this).attr("data-pagination") ? $(this).data("pagination") : true,
			autoPlay: $(this).attr("data-autoplay") ? $(this).data("autoplay") : true,
			autoHeight: $(this).attr("data-autoheight") ? $(this).data("autoheight") : true,
			afterAction: function () {var current = this.currentItem;e.find(".owl-item").eq(current).addClass("synced").siblings().removeClass("synced")}
		});
	})
	$(".carousel_4").each(function () {
		$(this).owlCarousel({
			items: $(this).attr("data-items") ? $(this).data("items") : 4,
			navigation: $(this).attr("data-navigation") ? $(this).data("navigation") : true,
			pagination: $(this).attr("data-pagination") ? $(this).data("pagination") : true,
			autoPlay: $(this).attr("data-autoplay") ? $(this).data("autoplay") : true,
			autoHeight: $(this).attr("data-autoheight") ? $(this).data("autoheight") : true,
			itemsDesktop: [1550, 4],
			itemsDesktopSmall: [1250, 3],
			itemsTablet: [930, 2],
			itemsMobile: [620, 1]
		}).css("marginBottom", parseInt($(this).find(".owl-pagination").height()) + parseInt($(this).find(".owl-pagination").css("marginTop")) + parseInt($(this).css("marginBottom")) + "px");
	})
	
	
	
	
		$(".aboutus_carousel_5").each(function () {
		$(this).owlCarousel({
			items: $(this).attr("data-items") ? $(this).data("items") : 4,
			navigation: $(this).attr("data-navigation") ? $(this).data("navigation") : true,
			pagination: $(this).attr("data-pagination") ? $(this).data("pagination") : true,
			autoPlay: $(this).attr("data-autoplay") ? $(this).data("autoplay") : true,
			autoHeight: $(this).attr("data-autoheight") ? $(this).data("autoheight") : true,
			itemsDesktop: [1550, 4],
			itemsDesktopSmall: [1250, 3],
			itemsTablet: [930, 2],
			itemsMobile: [620, 1]
		}).css("marginBottom", parseInt($(this).find(".owl-pagination").height()) + parseInt($(this).find(".owl-pagination").css("marginTop")) + parseInt($(this).css("marginBottom")) + "px");
	})
	
	
	
		$(".aboutus_carousel_4").each(function () {
		$(this).owlCarousel({
			items: $(this).attr("data-items") ? $(this).data("items") : 3,
			navigation: $(this).attr("data-navigation") ? $(this).data("navigation") : true,
			pagination: $(this).attr("data-pagination") ? $(this).data("pagination") : true,
			autoPlay: $(this).attr("data-autoplay") ? $(this).data("autoplay") : true,
			autoHeight: $(this).attr("data-autoheight") ? $(this).data("autoheight") : true,
			itemsDesktop: [1550, 3],
			itemsDesktopSmall: [1250, 3],
			itemsTablet: [930, 2],
			itemsMobile: [620, 1]
		}).css("marginBottom", parseInt($(this).find(".owl-pagination").height()) + parseInt($(this).find(".owl-pagination").css("marginTop")) + parseInt($(this).css("marginBottom")) + "px");
	})
	
	$(".carousel_5").each(function () {
		$(this).owlCarousel({
			singleItem: true,
			navigation: $(this).attr("data-navigation") ? $(this).data("navigation") : true,
			pagination: $(this).attr("data-pagination") ? $(this).data("pagination") : true,
			autoPlay: $(this).attr("data-autoplay") ? $(this).data("autoplay") : true,
			autoHeight: $(this).attr("data-autoheight") ? $(this).data("autoheight") : true
		})
	})
	$(".carousel_6").each(function () {
		$(this).owlCarousel({
			items: $(this).attr("data-items") ? $(this).data("items") : 5,
			navigation: $(this).attr("data-navigation") ? $(this).data("navigation") : true,
			pagination: $(this).attr("data-pagination") ? $(this).data("pagination") : true,
			autoPlay: $(this).attr("data-autoplay") ? $(this).data("autoplay") 		 : true,
			autoHeight: $(this).attr("data-autoheight") ? $(this).data("autoheight") : true
		}).css("marginBottom", parseInt($(this).find(".owl-pagination").height()) + parseInt($(this).find(".owl-pagination").css("marginTop")) + parseInt($(this).css("marginBottom")) + "px");
	})
	$(".carousel_7").each(function () {
		var e=$(this);
		$(this).owlCarousel({
			singleItem: true,
			navigation: $(this).attr("data-navigation") ? $(this).data("navigation") : true,
			pagination: $(this).attr("data-pagination") ? $(this).data("pagination") : true,
			autoPlay: $(this).attr("data-autoplay") ? $(this).data("autoplay") : true,
			autoHeight: $(this).attr("data-autoheight") ? $(this).data("autoheight") : true,
			afterAction: function () {var current = this.currentItem;e.find(".owl-item").eq(current).addClass("synced").siblings().removeClass("synced")}
		});
	})
	$(".carousel_8").each(function () {
		$(this).owlCarousel({
			items: $(this).attr("data-items") ? $(this).data("items") : 4,
			navigation: $(this).attr("data-navigation") ? $(this).data("navigation") : true,
			pagination: $(this).attr("data-pagination") ? $(this).data("pagination") : true,
			autoPlay: $(this).attr("data-autoplay") ? $(this).data("autoplay") : true,
			autoHeight: $(this).attr("data-autoheight") ? $(this).data("autoheight") : true,
			itemsDesktop: [1550, 4],
			itemsDesktopSmall: [1250, 3],
			itemsTablet: [930, 2],
			itemsMobile: [620, 1]
		}).css("marginBottom", parseInt($(this).find(".owl-pagination").height()) + parseInt($(this).find(".owl-pagination").css("marginTop")) + parseInt($(this).css("marginBottom")) + "px");
	})

});
$(document).ready(function () {
	$(".sync_carousel_1").each(function () {
		var sync = $(this),
			sync1 = sync.find(".carousel_main"),
			sync2 = sync.find(".carousel_nav");
		sync1.owlCarousel({
			singleItem: true,
			slideSpeed: 1000,
			navigation: true,
			pagination: false,
			afterAction: syncPosition,
			responsiveRefreshRate: 200
		});
		sync2.owlCarousel({
			items: 4,
			itemsDesktop: [1199, 4],
			itemsDesktopSmall: [979, 4],
			itemsTablet: [768, 4],
			itemsMobile: [479, 4],
			pagination: false,
			responsiveRefreshRate: 100,
			afterInit: function (el) {
				el.find(".owl-item").eq(0).addClass("synced");
			}
		});

		function syncPosition(el) {
			var current = this.currentItem;
			sync2.find(".owl-item").removeClass("synced").eq(current).addClass("synced");
			if (sync2.data("owlCarousel") !== undefined) {
				center(current)
			}
		}
		sync2.on("click", ".owl-item", function (e) {
			e.preventDefault();
			var number = $(this).data("owlItem");
			sync1.trigger("owl.goTo", number);
		});

		function center(number) {
			var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
			var num = number;
			var found = false;
			for (var i in sync2visible) {
				if (num === sync2visible[i]) {
					var found = true;
				}
			}
			if (found === false) {
				if (num > sync2visible[sync2visible.length - 1]) {
					sync2.trigger("owl.goTo", num - sync2visible.length + 2)
				} else {
					if (num - 1 === -1) {
						num = 0;
					}
					sync2.trigger("owl.goTo", num);
				}
			} else if (num === sync2visible[sync2visible.length - 1]) {
				sync2.trigger("owl.goTo", sync2visible[1])
			} else if (num === sync2visible[0]) {
				sync2.trigger("owl.goTo", num - 1)
			}
		}
	})
})
$(document).ready(function () {
	$(".sync_carousel_2").each(function () {
		var sync = $(this),
			sync1 = sync.find(".carousel_main"),
			sync2 = sync.find(".carousel_nav");
		sync1.owlCarousel({
			singleItem: true,
			slideSpeed: 1000,
			navigation: true,
			pagination: false,
			autoPlay: true,
			afterAction: syncPosition,
			responsiveRefreshRate: 200
		});
		sync2.owlCarousel({
			items: 4,
			itemsDesktop: [1199, 4],
			itemsDesktopSmall: [979, 4],
			itemsTablet: [768, 4],
			itemsMobile: [479, 4],
			navigation: true,
			pagination: false,
			responsiveRefreshRate: 100,
			afterInit: function (el) {
				el.find(".owl-item").eq(0).addClass("synced");
			}
		});

		function syncPosition(el) {
			var current = this.currentItem;
			sync2.find(".owl-item").removeClass("synced").eq(current).addClass("synced");
			if (sync2.data("owlCarousel") !== undefined) {
				center(current)
			}
		}
		sync2.on("click", ".owl-item", function (e) {
			e.preventDefault();
			var number = $(this).data("owlItem");
			sync1.trigger("owl.goTo", number);
		});

		function center(number) {
			var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
			var num = number;
			var found = false;
			for (var i in sync2visible) {
				if (num === sync2visible[i]) {
					var found = true;
				}
			}
			if (found === false) {
				if (num > sync2visible[sync2visible.length - 1]) {
					sync2.trigger("owl.goTo", num - sync2visible.length + 2)
				} else {
					if (num - 1 === -1) {
						num = 0;
					}
					sync2.trigger("owl.goTo", num);
				}
			} else if (num === sync2visible[sync2visible.length - 1]) {
				sync2.trigger("owl.goTo", sync2visible[1])
			} else if (num === sync2visible[0]) {
				sync2.trigger("owl.goTo", num - 1)
			}
		}
	})
})


jQuery(document).ready(function ($) {
	if($("#dnn_content").offset().top<$(".header_bg").height()){
		$("#dnn_content").css("paddingTop",$(".header_bg").height())
	}
}) 


jQuery(document).ready(function ($) {
	if (!$(".HeaderPane").hasClass("DNNEmptyPane")) {
		$(".HeaderPane_mobile").html($(".HeaderPane").html())
	}
}) 

$(document).ready(function() {
	var deleteLog = false;
	if($("#pagepiling").length==0) return false;
	var el=$("#pagepiling"),e=el.children(".section"),start=e.eq(0).data("tooltips")?e.eq(0).data("tooltips"): "page 1",  d=start+" "  ;
	for (i=1;i<e.length;i++){
		var s=e.eq(i).data("tooltips") ? e.eq(i).data("tooltips"): "page "+(i+1)
		d+=","+s  ;
	}
	var data=d.split(",");
	el.pagepiling({
		navigation: {
			'textColor': '#f2f2f2',
			'bulletsColor': '#ccc',
			'position': el.data("navposition")?el.data("navposition"):"right",
			'tooltips': data
		},
		scrollingSpeed:el.data("Speed")?parseInt(el.data("Speed")):700,
		easing:el.data("easing")?el.data("easing"):"swing",
		direction: el.data("direction")?el.data("direction"):"vertical"
	})
	if($(window).scrollTop()>0){
		$("body,html").css("overflow","visible");
		$("#pagepiling").remove();
		$("#pp-nav").remove();
	}
	var w1=$(window).width();
	$("body,html").css("overflow","visible");
	var w2=$(window).width();
	$("body,html").css("overflow","hidden");
	$(window).stop().scrollTop(0);	
	e.css("height",windowbox("height"));
	e.css("width",windowbox("width"));
	el.css("height",windowbox("height"));
	el.css("width",windowbox("width"));
	$("body").css("padding-right",w1-w2);
	$(".gohome").on("click",function(){
		$("#pp-nav").remove();
		el.children(".section.active").css({"top":"auto","bottom":"0"}).siblings().remove()
		
		el.stop().animate({height:0},800,function(){el.remove(); 	$("body").css("padding-right","0");  $("body,html").css("overflow","visible"); });
	})
	$(window).resize(function(){
		e.css("height",windowbox("height"));
		e.css("width",windowbox("width"));
		el.css("height",windowbox("height"));
		el.css("width",windowbox("width"));
	})
	
	
	
	
	
});

$(document).ready(function() {
	$("#fixedToggle").on("click",function(){
		$(this).toggleClass("show");
		var e=$("#fixedContent");
		var fixedsize=function(){
			if(e.height()>windowbox("height")&& e.css("display")!="none"){
				if(e.parent(".wrap").length==0){	
					e.wrap("<div  style=\overflow:auto;\" class=\"wrap\"></div>");
				}
				e.parent(".wrap").width(windowbox("width")+"px").height(windowbox("height")+"px");
				if($("#fixedToggle").css("position")!="fixed"){
					$("#fixedToggle").hide().css({"position":"fixed","bottom":0,"right":0,"transform":"rotateX(180deg)"}).show(100);
				}
			}else{
				if(e.parent(".wrap").length>0){	e.unwrap();}
				$("#fixedToggle").attr("style"," ");
			}
		}
		e.slideToggle(300,function(){fixedsize()});
		$(window).resize(function() {fixedsize();});
		
	})
})

$(document).ready(function() {
	if($("#Breadcrumb_style_5").length!=0){
		var bre=$("#Breadcrumb_style_5"),bor=bre.find(".breadcrumbBox");
		bre.height(windowbox("height")-bre.offset().top)
		bor.height($(window).height()-bor.offset().top)
		
		$(window).resize(function() {
			bre.height(windowbox("height")-bre.offset().top)
			bor.height(windowbox("height")-bor.offset().top)
		})
	
		$("#breadcrumb_gonext").on("click",function(){
		$("html,body").animate({scrollTop:windowbox("height")},800)
		})
	}

})

jQuery(document).ready(function($) {
    $(".full_screen_pic").each(function() {
        var full = $(this).find("li");
        full.height(windowbox("height"));
        $(window).resize(function() {
            full.height(windowbox("height"))
        })
    });
    $("#nextPage").click(function() {
            jQuery('body,html').animate({
                scrollTop: windowbox("height")
            }, 500);
        })
	$(window).load(function() {
		$(".full_screen_pic").addClass("animations");
    });

})

jQuery(document).ready(function ($) {
	$(window).load(function() {
		jQuery("#header1 .dnngo_gomenu > ul").lavaLamp({
			fx: 'easeOutExpo',
			speed: 600
		});
		jQuery("#header2 .dnngo_gomenu > ul").lavaLamp({
			fx: 'easeOutExpo',
			speed: 600
		});
		jQuery("#header5 .dnngo_gomenu > ul").lavaLamp({
			fx: 'easeOutExpo',
			speed: 600
		});
    });
	
});

if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
	var msViewportStyle = document.createElement("style");
	msViewportStyle.appendChild(
	document.createTextNode("@-ms-viewport{width:auto!important}"));
	document.getElementsByTagName("head")[0].
	appendChild(msViewportStyle);
}

//jQuery(document).ready(function ($) {
//		var e=$(".roll_menu");
//		e.roll_menu({ MTop:e.offset().top+e.height()+100 }); 
//});


//gmap

jQuery(document).ready(function($) { 
	$(".modal").each(function() {$(this).insertAfter("body")}); 
});