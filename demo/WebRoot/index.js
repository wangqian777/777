$(document).ready(function(){
	if(localStorage.user==undefined){
//		alert("请先登录！");
//		function jump(count) {    
//            window.setTimeout(function(){    
//                count--;    
//                if(count > 0) {      
//                    jump(count);    
//                } else {    
//                    location.href="login.html";    
//                }    
//            }, 1000);    
//        }    
//        jump(1);
		location.href="login.html"
	}
	$("#用户姓名").html(JSON.parse(localStorage.user).用户姓名);
	$.ajax({
		type:"post",
		url:"getTreeJson.do",
		dataType:"json",
		data:{"table":"菜单","orderBy":"编码"},
		async:false,
		success:function(data){
			$("#动态html").html("<div  class=\"kit-side-fold\"><i class=\"fa fa-navicon\" aria-hidden=\"true\"></i></div>"+getHtml(data));
			
		}
	});
	
	$("#xiugaimima").click(function(){
		openFormCard("updatepwd.html", "修改密码");
	});
	function openFormCard(url, title) {
		layer.open({
			type : 2,
			title : '<span style="font-size:14px;font-weight: bold;">' + title + '<span>',
			maxmin : true,
			shadeClose : true,
			offset : 'auto',
			area : [ '800px', '400px' ],
			content : [ url, 'no' ],
			end : function() {
				
			}
		});
	}
	function getHtml(data) {
        var ulHtml = '<ul class="layui-nav layui-nav-tree" lay-filter="kitNavbar" kit-navbar>';
        for(var i=0;i<data.length;i++){
        	ulHtml+='<li class="layui-nav-item">';
        	if (data[i].nodes !== undefined && data[i].nodes !== null && data[i].nodes.length > 0) {
        		ulHtml += '<a class="" href="javascript:;">';
        		if (data[i].图标名 !== undefined && data[i].图标名 !== '') {
                    if (data[i].图标名.indexOf('fa-') !== -1) {
                        ulHtml += '<i class="fa ' + data[i].图标名 + '" aria-hidden="true" data-icon="' + data[i].图标名 + '"></i>';
                    } else {
                        ulHtml += '<i class="layui-icon" data-icon="' + data[i].图标名 + '">' + data[i].图标名 + '</i>';
                    }
                }
        		ulHtml += '<span>' + data[i].text + '</span>';
                ulHtml += '</a>';
                ulHtml += '<dl class="layui-nav-child">';
                for (var j = 0; j < data[i].nodes.length; j++) {
                    ulHtml += '<dd title="' + data[i].nodes[j].text + '">';
                    ulHtml += '<a href="javascript:;" data-title="'+data[i].nodes[j].text+'" data-url="' + data[i].nodes[j].路径 + '?id='+data[i].nodes[j].ID+'" kit-target  data-id="'+data[i].nodes[j].ID+'">';
                    if (data[i].nodes[j].图标名 !== undefined && data[i].nodes[j].icon !== '') {
                        if (data[i].nodes[j].图标名.indexOf('fa-') !== -1) {
                            ulHtml += '<i class="fa ' + data[i].nodes[j].图标名 + '" data-icon="' + data[i].nodes[j].图标名 + '" aria-hidden="true"></i>';
                        } else {
                            ulHtml += '<i class="layui-icon" data-icon="' + data[i].nodes[j].图标名 + '">' + data[i].nodes[j].图标名 + '</i>';
                        }
                    }
                    ulHtml += '<span>' + data[i].nodes[j].text + '</span>';
                    ulHtml += '</a>';
                    ulHtml += '</dd>';
                }
                ulHtml += '</dl>';
        		
        	}else{
        		ulHtml += '<a href="javascript:;" data-title="'+data[i].text+'" data-url="' + data[i].路径 + '?id='+data[i].ID+'" kit-target  data-id="'+data[i].ID+'">';
        		if (data[i].图标名 !== undefined && data[i].图标名 !== '') {
                    if (data[i].图标名.indexOf('fa-') !== -1) {
                        ulHtml += '<i class="fa ' + data[i].图标名 + '" aria-hidden="true" data-icon="' + data[i].图标名 + '"></i>';
                    } else {
                        ulHtml += '<i class="layui-icon" data-icon="' + data[i].图标名 + '">' + data[i].图标名 + '</i>';
                    }
                }
        		ulHtml += '<span>' + data[i].text + '</span>';
                ulHtml += '</a>';
        	}
        	ulHtml += '</li>';
        }
        ulHtml += '</ul>';
        return ulHtml;
    }
});
