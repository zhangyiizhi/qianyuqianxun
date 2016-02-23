"use strict";Z(function(){function a(a){locationReady(function(){console.log("province",myProvince),console.log("city",myCity);var b,c="";for(b in myProvince)c+='<option value="'+b+'">'+myProvince[b]+"</option>";e("#provinceInput").html(c).mySelect(function(a){return myProvince[a]}).on("change",function(){var a,b=this.value,c=myCity[b],d="";for(a in c)d+='<option value="'+a+'">'+c[a]+"</option>";e("#cityInput").html(d).trigger("change")}).trigger("change"),e("#cityInput").mySelect(function(a){var b=e("#provinceInput").val();return myCity[b][a]}),a&&a()})}function b(){l||(l=!0,Z.ajax({url:window.actionUrl.getActRegisterInfo.url,type:window.actionUrl.getActRegisterInfo.type,data:Z.extend({actId:f,actToken:g},getCommonReqData()),success:function(b){console.log("getRegisterInfo reply",b),b=checkReply(b),b&&(Z("#nicknameInput").val(b.nickname),Z("#birthdayInput").val(b.birthday),Z("#wxInput").val(b.wx),Z("#sexInput").val(b.sex).trigger("change"),Z("#mobileInput").val(b.mobile),Z("#selfIntroInput").val(b.selfIntro),Z("#expectationInput").val(b.expectation),Z("#submit").html("提交修改"),a(function(){var a,c,d;for(d in myProvince)if(myProvince[d]==b.province){a=d;break}var e=myCity[a];for(d in e)if(e[d]==b.city){c=d;break}console.log("province",a,b.province),console.log("city",e,c,b.city),a&&c&&(Z("#provinceInput").val(a).trigger("change"),Z("#cityInput").val(c).trigger("change"))}),qiNiuReady(function(){var a=b.headImg,d=Math.ceil(4*window.fontSize),f="?"+qnImg.base()+qnImg.and+qnImg.min(d*window.dpi,d*window.dpi),g=a+f,i={fid:"",isHead:" "+j,text:"头像",osrc:a+k,psrc:g},l=format(h,i);Z(l).insertBefore(Z("#qnPicker"));for(var m=b.photos||[],n=m.length,o=0;n>o;o++)i.fid="",i.text="",i.isHead="",i.osrc=m[o]+k,i.psrc=m[o]+f,l=format(h,i),Z(l).insertBefore(Z("#qnPicker"));e("#qnCon .imgBlock").each(function(){var a=e(this).attr("psrc");a&&lazyLoadImg(a,this)}),c()}))},error:function(a){noNetwork()},complete:function(){l=!1}}))}function c(){var a,b,c=i.length;for(b=0;c>b;b++)i[b].refresh(),a=i[b].getOption("browse_button")[0],Z(a).width()<1&&(i[b].destroy(),i.splice(b,1),c--,b--)}function d(a){var b=Z("#"+a).val();return b&&b.length?b:(Z("#"+a).addClass("warning").focus(),!1)}var e=Z,f=getValueFromSearch("actId"),g=getValueFromSearch("actToken"),h=['<div class="imgBlock bgCon ing{isHead}" fid="{fid}" psrc="{psrc}" osrc="{osrc}">','<div class="text">{text}</div>','<img class="delete" src="'+window.imgUrl.close+'">','<div class="progress"></div>',"</div>"].join(""),i=[],j="head",k="?"+qnImg.base();Z("#sexInput").mySelect(function(a){switch(parseInt(a)){case 0:return"女";case 1:return"男";default:alert("性别选择异常"+a)}});var l=!1;Z.ajax({url:window.actionUrl.getActDetail.url,type:window.actionUrl.getActDetail.type,data:Z.extend({actId:f,actToken:g},getCommonReqData()),success:function(c){if(c=checkReply(c)){replaceImgSrc(Z("#actNav"));var d=Math.ceil(2.2*window.fontSize),h="?"+qnImg.base()+qnImg.and+qnImg.min(d*window.dpi,d*window.dpi);lazyLoadImg(c.creatorHead+h,Z("#creatorHead"));var i=Math.ceil(e(document.body).width()),j=Math.ceil(3.3*window.fontSize),k="?"+qnImg.base()+qnImg.and+qnImg.min(i,j)+qnImg.and+qnImg.blur(15,5);lazyLoadImg(c.cover+k,Z("#actNav")),Z("#creatorName").html(c.creatorName),Z("#actTitle").html(c.title),Z("#actNum").html(getDateFromTs(c.createTime)+"桌"),Z("#actNav").on("click",function(){window.location.href="actDetail.html"+getCommonParams()+"&actId="+encodeURIComponent(f)+"&actToken="+encodeURIComponent(g)}),0==c.registered?b():a()}},error:function(a){noNetwork()}}),Z(window).on("resize",c),qiNiuReady(function(){var a=myUp({bb:"qnPicker",con:"qnCon"});i.push(a),a.bind("FileUploaded",function(a,b,c){console.log("FileUploaded",b.id);var d=a.getOption("domain");c=JSON.parse(c.response);var f=Math.ceil(4*window.fontSize),g="?"+qnImg.base()+qnImg.and+qnImg.min(f*window.dpi,f*window.dpi),h=d+c.key,i=h+g;e(".imgBlock").each(function(){var a=e(this);a.attr("fid")==b.id&&(a.removeClass("ing").find(".progress").css("top",100-b.percent+"%"),lazyLoadImg(i,a.attr("osrc",h+k)),a.hasClass(j)&&a.find(".text").html("头像"))})}),a.bind("BeforeUpload",function(a,b){console.log("BeforeUpload",b.id);var c=" "+j;e(".imgBlock."+j).length&&(c="");var d={isHead:c,fid:b.id,text:"上传中",psrc:"",osrc:""},f=format(h,d);Z(f).insertBefore(Z("#qnPicker"))}),a.bind("UploadProgress",function(a,b){console.log("UploadProgress",b.id,b.percent),e(".imgBlock").each(function(){e(this).attr("fid")==b.id&&Z(this).find(".progress").css("top",100-b.percent+"%")})})}),Z("#qnCon").on("click",".delete",function(){if(confirm("确认要删除这张头像吗")){var a,b=Z(this).parent(),d=b.hasClass(j);b.addClass("empty").remove(),d&&(a=Z("#qnCon").find(".imgBlock")[0],e(a).hasClass("empty")||e(a).addClass(j).find(".text").html("头像")),c()}}).on("click",".imgBlock",function(a){if(!e(this).hasClass("empty")){for(var b=a.target;!e(b).hasClass("imgBlock");){if(e(b).hasClass("delete"))return;b=b.parentNode}var c=e(this).attr("osrc");if(c){var d=[];e("#qnCon .imgBlock").each(function(){if(!e(this).hasClass("empty")){var a=e(this).attr("osrc");a&&d.push(a)}}),wxPreviewImg(c,d)}}});var m=!1;Z("#submit").on("click",function(){if(!m&&myProvince){var a=d("nicknameInput");if(a){var b=d("mobileInput");if(b){var c=d("wxInput");if(c){var e,h=Z("#qnCon").find(".imgBlock"),i=h.length,k=0;for(e=0;i>e;e++)Z(h[e]).hasClass("empty")||k++;if(console.log("imgNum",k),2>k)return void alert("请上传至少两张照片");var l=Z("."+j).attr("osrc"),n=[];h.each(function(){Z(this).hasClass("empty")||Z(this).hasClass(j)||n.push(Z(this).attr("osrc"))});var o=d("selfIntroInput");if(o){var p=d("expectationInput");if(p){var q=Z("#birthdayInput").val(),r=Z("#sexInput").val(),s=Z("#provinceInput").val(),t=myProvince[s],u=Z("#cityInput").val(),v=myCity[s][u];m=!0,Z("#submit").html("加入中...");var w={actId:f,actToken:g,nickname:a,mobile:b,wx:c,province:t,city:v,selfIntro:o,expectation:p,birthday:q,sex:r,imgHead:l,photos:n};console.log("reqData",w),Z.ajax({url:window.actionUrl.registerAct.url,type:window.actionUrl.registerAct.type,data:Z.extend(getCommonReqData(),w),success:function(a){console.log("submit reply",a),a=checkReply(a),a&&(0==a.status?(alert("恭喜加入约会挑战"),window.location.href="challengerCard.html"+getCommonParams()+"&uHead="+encodeURIComponent(w.imgHead)+"&uName="+encodeURIComponent(w.nickname)+"&uSex="+encodeURIComponent(w.sex)+"&actId="+encodeURIComponent(f)+"&actToken="+encodeURIComponent(g)):(alert("加入失败，请重试"),pageReload()))},error:function(a){console.log("submit error",a),noNetwork()},complete:function(){console.log("submit complete"),m=!1,Z("#submit").html("加入挑战")}})}}}}}}}),Z(".footer").on("click",".back",function(){window.location.href="actDetail.html"+getCommonParams()+"&actId="+encodeURIComponent(f)+"&actToken="+encodeURIComponent(g)})});
//# sourceMappingURL=registerAct.js.map