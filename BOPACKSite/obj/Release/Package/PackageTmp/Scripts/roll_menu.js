
//roll_menu.js

(function(e){e.fn.roll_menu=function(op){op=$.extend({MTop:450},op||{});var e=$(this),h=op.MTop,p=e.css("position");var roll=function(e){if($(window).width()<767){if(e.siblings(".roll_replace").length!=0){e.siblings(".roll_replace").remove();e.removeClass("roll_activated");}
return false;};var rollsubmenu=e.find(".dnngo_boxslide");if($(window).scrollTop()>h){if(e.siblings(".roll_replace").length==0){$("<div class='roll_replace'></div>").insertBefore(e);e.siblings(".roll_replace").height(e.height()).css("position",p);e.addClass("roll_activated").css({"top":-e.height(),"opacity":0}).animate({"top":0,"opacity":1},300);}
rollsubmenu.each(function(){if($(this).height()>$(window).height()-e.height()){$(this).css({"height":$(window).height()-e.height(),"overflow":"auto","marginRight":"-20px","width":$(this).parent(".dnngo_menuslide").width()+18});if(!e.parent().hasClass("submenu_box")){$(this).wrap("<div class='submenu_box'></div>").parent(".submenu_box").css({"overflow":"hidden"})}}})}
else if(e.siblings(".roll_replace").length!=0){e.siblings(".roll_replace").remove();e.removeClass("roll_activated");rollsubmenu.each(function(){$(this).attr("style"," ")
if($(this).parent().hasClass("submenu_box")){$(this).unwrap();}})}};roll(e);$(window).scroll(function(){roll(e)});$(window).resize(function(){roll(e)})}})(jQuery);