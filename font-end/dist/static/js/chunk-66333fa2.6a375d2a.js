(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-66333fa2"],{"3ddd":function(t,e,a){"use strict";a("c136")},"3ef5":function(t,e,a){"use strict";a("9b29")},"4df4":function(t,e,a){"use strict";var n=a("0366"),s=a("7b0b"),r=a("9bdd"),i=a("e95a"),c=a("50c4"),o=a("8418"),l=a("35a1");t.exports=function(t){var e,a,u,m,d,p,f=s(t),b="function"==typeof this?this:Array,h=arguments.length,v=h>1?arguments[1]:void 0,y=void 0!==v,k=l(f),x=0;if(y&&(v=n(v,h>2?arguments[2]:void 0,2)),void 0==k||b==Array&&i(k))for(e=c(f.length),a=new b(e);e>x;x++)p=y?v(f[x],x):f[x],o(a,x,p);else for(m=k.call(f),d=m.next,a=new b;!(u=d.call(m)).done;x++)p=y?r(m,v,[u.value,x],!0):u.value,o(a,x,p);return a.length=x,a}},7558:function(t,e,a){"use strict";a("7e8f")},"7b3b":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"playlist-container"},[a("div",{staticClass:"top-wrap"},[a("div",{staticClass:"img-wrap"},[a("el-image",{staticClass:"albumTrack",attrs:{src:t.albumInfo.imageUrl,fit:"fit"}},[a("div",{staticClass:"image-slot",attrs:{slot:"error"},slot:"error"},[a("i",{staticClass:"el-icon-picture-outline"})])]),a("i",{staticClass:"data__cover_mask"})],1),a("div",{staticClass:"info-wrap"},[a("h1",{staticClass:"title"},[t._v(t._s(t.albumInfo.name))]),a("div",{staticClass:"author-wrap"},[a("i",{staticClass:"el-icon-user",staticStyle:{"font-size":"23px","margin-right":"20px"}}),a("span",[t._v(t._s(t.albumInfo.artist))])]),a("div",{staticClass:"play-wrap"},[a("el-button",{staticClass:"playButton",on:{click:t.playAllMusic}},[a("i",{staticClass:"el-icon-video-play"}),a("span",[t._v("播放音乐")])])],1),a("div",{staticClass:"desc-wrap"},[a("h2",[t._v("专辑介绍:")]),a("span",{staticClass:"desc"},[t._v(" "+t._s(t.albumInfo.desc)+" ")]),a("el-button",{attrs:{type:"text"},on:{click:t.openDetailDialog}},[t._v("[查看详情]")])],1)])]),a("div",{staticClass:"play-table"},[a("p",{staticStyle:{"font-size":"16px",color:"#31c27c"}},[t._v("曲目列表")]),a("el-divider"),a("table",{staticClass:"el-table"},[t._m(0),a("tbody",t._l(t.tracks,(function(e,n){return a("tr",{key:n,staticClass:"el-table__row"},[a("td",[t._v(t._s(n+1))]),a("td",[a("el-button",{attrs:{type:"text"},on:{click:function(e){return t.playMusic(n,!0)}}},[t._v(t._s(e.name))])],1),a("td",[t._v(t._s(e.artists))]),a("td",[t._v(t._s(e.duration))]),a("td",[t._v(t._s(e.lastPlayTime))]),a("td",[a("el-button",{attrs:{type:"text"},on:{click:function(e){return t.playMusic(n,!0)}}},[t._v("播放")])],1)])})),0)])],1),a("div",{staticClass:"comment"},[a("ArticleComment",{attrs:{album_id:this.$route.params.id}})],1),a("div",{staticClass:"player"},[a("audio",{attrs:{src:t.musicUrl,controls:"",autoplay:""},on:{ended:t.overAudio}})])])},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("th"),a("th",[t._v("歌曲")]),a("th",[t._v("歌手")]),a("th",[t._v("时长")]),a("th",[t._v("最近一次听歌时间")]),a("th",[t._v("操作")])])}],r=a("b85c"),i=a("c7eb"),c=a("1da1"),o=(a("b0c0"),a("a434"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{"margin-top":"20px"}},[a("h3",{staticStyle:{"font-size":"17px","font-weight":"400","line-height":"28px"}},[t._v("发表评论")]),a("el-divider"),a("div",{staticClass:"my-reply"},[a("el-avatar",{staticClass:"header-img",attrs:{size:40,src:t.avatar}}),a("div",{staticClass:"reply-info"},[a("el-input",{attrs:{type:"textarea",autosize:"",placeholder:"输入评论"},on:{focus:t.showReplyBtn},model:{value:t.replyComment,callback:function(e){t.replyComment=e},expression:"replyComment"}}),a("div",{directives:[{name:"show",rawName:"v-show",value:t.btnShow,expression:"btnShow"}],staticClass:"reply-btn-box"},[a("el-button",{staticClass:"reply-btn",attrs:{size:"medium",type:"primary"},on:{click:t.sendComment}},[t._v("发表评论")])],1)],1),a("h3",{staticStyle:{"margin-top":"50px",display:"block","font-size":"16px","font-weight":"400"}},[t._v("精彩评论")]),a("el-divider"),t._l(t.comments,(function(e,n){return a("div",{key:n,staticClass:"author-title reply-father"},[a("el-avatar",{staticClass:"header-img",attrs:{size:40,src:e.headImg}}),a("div",{staticClass:"author-info"},[a("span",{staticClass:"author-name"},[t._v(t._s(e.name))]),a("span",{staticClass:"author-time"},[t._v(t._s(e.time))])]),a("div",{staticClass:"talk-box"},[a("p",[a("span",{staticClass:"reply"},[t._v(t._s(e.comment))])])]),a("div",{staticClass:"icon-btn"},[a("div",{on:{click:function(a){return t.like(e,!0)}}},[a("svg-icon",{staticClass:"like_icon",attrs:{"icon-class":"like"}}),a("span",[t._v(t._s(e.like))])],1),a("span",{on:{click:function(a){return t.showReplyInput(n,e.userId)}}},[t._v(t._s(e.inputShow?"取消回复":"回复"))])]),a("div",{staticClass:"reply-box"},t._l(e.reply,(function(s,r){return a("div",{key:r,staticClass:"author-title"},[a("el-avatar",{staticClass:"header-img",attrs:{size:40,src:s.fromHeadImg}}),a("div",{staticClass:"author-info"},[a("span",{staticClass:"author-name"},[t._v(t._s(s.from))]),a("span",{staticClass:"author-time"},[t._v(t._s(s.time))])]),a("div",{staticClass:"talk-box"},[a("p",[a("span",{staticStyle:{"margin-right":"5px",color:"#999"}},[t._v("回复 "+t._s(s.to)+":")]),a("span",{staticClass:"reply"},[t._v(t._s(s.comment))])])]),a("div",{staticClass:"icon-btn"},[a("div",{on:{click:function(e){return t.like(s,!1)}}},[a("svg-icon",{staticClass:"like_icon",attrs:{"icon-class":"like"}}),a("span",[t._v(t._s(s.like))])],1),a("span",{on:{click:function(a){return t.showReplyInput(n,e.userId)}}},[t._v("回复")])]),a("div",{staticClass:"reply-box"})],1)})),0),a("div",{directives:[{name:"show",rawName:"v-show",value:e.inputShow,expression:"item.inputShow"}],staticClass:"my-reply my-comment-reply"},[a("el-avatar",{staticClass:"header-img",attrs:{size:40,src:t.avatar}}),a("div",{staticClass:"reply-info"},[a("el-input",{attrs:{type:"textarea",autosize:"",placeholder:"输入评论"},on:{focus:t.showReplyBtn},model:{value:t.replyComment,callback:function(e){t.replyComment=e},expression:"replyComment"}})],1),a("div",{staticClass:" reply-btn-box"},[a("el-button",{staticClass:"reply-btn",attrs:{size:"medium",type:"primary"},on:{click:function(e){return t.sendCommentReply(n)}}},[t._v("发表评论")])],1)],1)],1)}))],2)],1)}),l=[],u=a("5530"),m=a("d86f"),d={name:"ArticleComment",props:["album_id"],data:function(){return{btnShow:!1,avatar:this.$store.getters.avatar,replyComment:"",toId:-1,comments:[]}},mounted:function(){this.getCommentsList()},methods:{getCommentsList:function(){var t=this;return Object(c["a"])(Object(i["a"])().mark((function e(){var a,n,s,c,o,l,d,p;return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(m["h"])({albumId:t.album_id});case 2:if(a=e.sent,"success"===a.data.msg){n=[],s=Object(r["a"])(a.data.result);try{for(s.s();!(c=s.n()).done;){o=c.value,l=Object(r["a"])(o.reply);try{for(l.s();!(d=l.n()).done;)p=d.value,p["inputShow"]=!1,p["isClickLike"]=!1}catch(i){l.e(i)}finally{l.f()}n.push(Object(u["a"])(Object(u["a"])({},o),{},{inputShow:!1,isClickLike:!1}))}}catch(i){s.e(i)}finally{s.f()}t.comments=n}case 4:case"end":return e.stop()}}),e)})))()},like:function(t,e){return Object(c["a"])(Object(i["a"])().mark((function a(){return Object(i["a"])().wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(t.like+=t.isClickLike?-1:1,t.isClickLike=!t.isClickLike,!e){a.next=7;break}return a.next=5,Object(m["r"])({commentId:t.commentId,like:t.like});case 5:a.next=9;break;case 7:return a.next=9,Object(m["s"])({commentId:t.commentId,like:t.like});case 9:case"end":return a.stop()}}),a)})))()},showReplyBtn:function(){this.btnShow=!0},hideReplyBtn:function(){var t=document.getElementById("replyInput");this.btnShow=!1,t.style.padding="10px",t.style.border="none"},showReplyInput:function(t,e){var a=this.comments[t];a.inputShow||(this.toId=e),a.inputShow=!a.inputShow},sendComment:function(){var t=this;return Object(c["a"])(Object(i["a"])().mark((function e(){var a;return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.replyComment){e.next=4;break}t.$message({showClose:!0,type:"warning",message:"评论不能为空"}),e.next=15;break;case 4:return e.next=6,Object(m["o"])({username:t.$store.getters.name,albumId:t.album_id,comment:t.replyComment});case 6:if(a=e.sent,"success"!==a.data.msg){e.next=14;break}return t.$message("评论发表成功"),t.replyComment="",e.next=12,t.getCommentsList();case 12:e.next=15;break;case 14:t.$message.error("接口请求错误");case 15:case"end":return e.stop()}}),e)})))()},sendCommentReply:function(t){var e=this;return Object(c["a"])(Object(i["a"])().mark((function a(){var n;return Object(i["a"])().wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(e.replyComment){a.next=4;break}e.$message({showClose:!0,type:"warning",message:"评论不能为空"}),a.next=15;break;case 4:return a.next=6,Object(m["n"])({commentId:e.comments[t].commentId,from:e.$store.getters.id,to:e.toId,reply:e.replyComment});case 6:if(n=a.sent,"success"!==n.data.msg){a.next=14;break}return e.replyComment="",e.$message("评论发表成功"),a.next=12,e.getCommentsList();case 12:a.next=15;break;case 14:e.$message.error("接口请求错误");case 15:case"end":return a.stop()}}),a)})))()}}},p=d,f=(a("3ddd"),a("2877")),b=Object(f["a"])(p,o,l,!1,null,"3d106207",null),h=b.exports,v={name:"TrackList",components:{ArticleComment:h},data:function(){return{musicUrl:"",musicIndex:0,isAllPlay:!1,albumInfo:{id:"",name:"",artist:"",imageUrl:"",desc:""},tracks:[]}},watch:{tracks:{handler:function(t,e){},deep:!0}},mounted:function(){var t=this;return Object(c["a"])(Object(i["a"])().mark((function e(){var a;return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.attainAlbumInfo();case 2:return e.next=4,Object(m["m"])({albumId:t.$route.params.id});case 4:if(a=e.sent,a.data.result){e.next=10;break}return e.next=8,t.getNetWork();case 8:e.next=12;break;case 10:return e.next=12,t.getTracks();case 12:case"end":return e.stop()}}),e)})))()},methods:{openDetailDialog:function(){this.$alert(this.albumInfo.desc,"专辑简介详情",{customClass:"alertBox"})},attainAlbumInfo:function(){var t=this;return Object(c["a"])(Object(i["a"])().mark((function e(){var a;return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(m["e"])({albumId:t.$route.params.id});case 2:a=e.sent,t.albumInfo=a.data.result;case 4:case"end":return e.stop()}}),e)})))()},getNetWork:function(){var t=this;return Object(c["a"])(Object(i["a"])().mark((function e(){return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.getTrackFromNetwork();case 2:return e.next=4,t.updateTrack();case 4:return e.next=6,t.getTrackLastPlayTimeFunction();case 6:case"end":return e.stop()}}),e)})))()},getTrackFromNetwork:function(){var t=this;return Object(c["a"])(Object(i["a"])().mark((function e(){var a,n,s,c,o,l,u,d,p,f,b,h,v;return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=t.albumInfo.dynamicTags,n=a.length,e.next=4,Object(m["c"])(t.albumInfo.name);case 4:if(s=e.sent,0!==s.length){e.next=7;break}return e.abrupt("return");case 7:console.log("getMusicList: ",s),c=[],o=Object(r["a"])(s),e.prev=10,o.s();case 12:if((l=o.n()).done){e.next=27;break}if(u=l.value,d=a.indexOf(u.name),-1===d){e.next=25;break}p="",f=!1,b=Object(r["a"])(u.artists);try{for(b.s();!(h=b.n()).done;)v=h.value,p+=v.name+" ","群星"!==t.albumInfo.artist&&v.name===t.albumInfo.artist&&(f=!0)}catch(i){b.e(i)}finally{b.f()}if(u.artists=p,u["lastPlayTime"]="",("群星"===t.albumInfo.artist||f)&&(c.push(u),n-=1,a.splice(d,1)),0!==n){e.next=25;break}return e.abrupt("break",27);case 25:e.next=12;break;case 27:e.next=32;break;case 29:e.prev=29,e.t0=e["catch"](10),o.e(e.t0);case 32:return e.prev=32,o.f(),e.finish(32);case 35:if(t.tracks=c,console.log("myTrackList: ",t.tracks),0===t.tracks.length){e.next=40;break}return e.next=40,Object(m["p"])({albumId:t.$route.params.id});case 40:case"end":return e.stop()}}),e,null,[[10,29,32,35]])})))()},updateTrack:function(){var t=this;return Object(c["a"])(Object(i["a"])().mark((function e(){var a,n,s;return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:a=Object(r["a"])(t.tracks),e.prev=1,a.s();case 3:if((n=a.n()).done){e.next=9;break}return s=n.value,e.next=7,Object(m["t"])({trackName:s.name,duration:s.duration,artist:s.artists,musicId:s.id});case 7:e.next=3;break;case 9:e.next=14;break;case 11:e.prev=11,e.t0=e["catch"](1),a.e(e.t0);case 14:return e.prev=14,a.f(),e.finish(14);case 17:case"end":return e.stop()}}),e,null,[[1,11,14,17]])})))()},getTrackLastPlayTimeFunction:function(){var t=this;return Object(c["a"])(Object(i["a"])().mark((function e(){var a,n,s,c;return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:a=Object(r["a"])(t.tracks),e.prev=1,a.s();case 3:if((n=a.n()).done){e.next=11;break}return s=n.value,e.next=7,Object(m["j"])({trackName:s.name});case 7:c=e.sent,s.lastPlayTime=c.data.result;case 9:e.next=3;break;case 11:e.next=16;break;case 13:e.prev=13,e.t0=e["catch"](1),a.e(e.t0);case 16:return e.prev=16,a.f(),e.finish(16);case 19:case"end":return e.stop()}}),e,null,[[1,13,16,19]])})))()},getTracks:function(){var t=this;return Object(c["a"])(Object(i["a"])().mark((function e(){var a;return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(m["k"])({albumId:t.$route.params.id});case 2:a=e.sent,"success"===a.data.msg?t.tracks=a.data.result:t.$message.error(a.data.msg);case 4:case"end":return e.stop()}}),e)})))()},playMusic:function(t,e){var a=this;return Object(c["a"])(Object(i["a"])().mark((function n(){var s,r;return Object(i["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return e&&(a.isAllPlay=!1),s=a.tracks[t],n.next=4,Object(m["i"])(s.id);case 4:return r=n.sent,a.musicUrl=r.data.data[0].url,n.next=8,Object(m["u"])({trackName:s.name});case 8:case"end":return n.stop()}}),n)})))()},playAllMusic:function(){this.isAllPlay=!0,this.musicIndex=0,this.playMusic(0,!1)},overAudio:function(){if(this.isAllPlay){if(this.musicIndex+=1,this.musicIndex>=this.tracks.length)return this.musicIndex=0,void this.playMusic(this.musicIndex,!1);this.playMusic(this.musicIndex,!1)}}}},y=v,k=(a("7558"),a("3ef5"),Object(f["a"])(y,n,s,!1,null,"a8cb8d68",null));e["default"]=k.exports},"7e8f":function(t,e,a){},"9b29":function(t,e,a){},a434:function(t,e,a){"use strict";var n=a("23e7"),s=a("23cb"),r=a("a691"),i=a("50c4"),c=a("7b0b"),o=a("65f0"),l=a("8418"),u=a("1dde"),m=a("ae40"),d=u("splice"),p=m("splice",{ACCESSORS:!0,0:0,1:2}),f=Math.max,b=Math.min,h=9007199254740991,v="Maximum allowed length exceeded";n({target:"Array",proto:!0,forced:!d||!p},{splice:function(t,e){var a,n,u,m,d,p,y=c(this),k=i(y.length),x=s(t,k),w=arguments.length;if(0===w?a=n=0:1===w?(a=0,n=k-x):(a=w-2,n=b(f(r(e),0),k-x)),k+a-n>h)throw TypeError(v);for(u=o(y,n),m=0;m<n;m++)d=x+m,d in y&&l(u,m,y[d]);if(u.length=n,a<n){for(m=x;m<k-n;m++)d=m+n,p=m+a,d in y?y[p]=y[d]:delete y[p];for(m=k;m>k-n+a;m--)delete y[m-1]}else if(a>n)for(m=k-n;m>x;m--)d=m+n-1,p=m+a-1,d in y?y[p]=y[d]:delete y[p];for(m=0;m<a;m++)y[m+x]=arguments[m+2];return y.length=k-n+a,u}})},a630:function(t,e,a){var n=a("23e7"),s=a("4df4"),r=a("1c7e"),i=!r((function(t){Array.from(t)}));n({target:"Array",stat:!0,forced:i},{from:s})},b85c:function(t,e,a){"use strict";a.d(e,"a",(function(){return r}));a("a4d3"),a("e01a"),a("d3b7"),a("d28b"),a("3ca3"),a("ddb0"),a("fb6a"),a("b0c0"),a("a630"),a("ac1f"),a("00b4");function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var a=0,n=new Array(e);a<e;a++)n[a]=t[a];return n}function s(t,e){if(t){if("string"===typeof t)return n(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);return"Object"===a&&t.constructor&&(a=t.constructor.name),"Map"===a||"Set"===a?Array.from(t):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?n(t,e):void 0}}function r(t,e){var a="undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!a){if(Array.isArray(t)||(a=s(t))||e&&t&&"number"===typeof t.length){a&&(t=a);var n=0,r=function(){};return{s:r,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,c=!0,o=!1;return{s:function(){a=a.call(t)},n:function(){var t=a.next();return c=t.done,t},e:function(t){o=!0,i=t},f:function(){try{c||null==a["return"]||a["return"]()}finally{if(o)throw i}}}}},c136:function(t,e,a){}}]);