(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-38232476"],{"0419":function(t,e,n){},"371d":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("AlbumForm",{attrs:{primary_button_text:"上传专辑",negative_button_text:"清空表单数据",form:t.form},on:{onClear:t.onClear,onSubmit:t.onSubmit}})},r=[],i=n("c7eb"),o=n("5530"),s=n("1da1"),l=(n("b0c0"),n("a825")),u=n("d86f"),m={components:{AlbumForm:l["a"]},data:function(){return{form:{id:"",name:"",artist:"",imageUrl:"",dynamicTags:[],desc:""}}},methods:{onSubmit:function(){var t=this;return Object(s["a"])(Object(i["a"])().mark((function e(){var n,a;return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=Object(o["a"])(Object(o["a"])({},t.form),{},{username:t.$store.getters.name,num:t.form.dynamicTags.length}),e.next=3,Object(u["v"])(n);case 3:a=e.sent,"success"===a.data.msg?(t.onClear(),t.$message("上传成功，请等待管理员审核")):t.$message.error(a.data.msg);case 5:case"end":return e.stop()}}),e)})))()},onClear:function(){this.form={name:"",artist:"",imageUrl:"",dynamicTags:[],desc:""}}}},c=m,f=n("2877"),p=Object(f["a"])(c,a,r,!1,null,null,null);e["default"]=p.exports},a434:function(t,e,n){"use strict";var a=n("23e7"),r=n("23cb"),i=n("a691"),o=n("50c4"),s=n("7b0b"),l=n("65f0"),u=n("8418"),m=n("1dde"),c=n("ae40"),f=m("splice"),p=c("splice",{ACCESSORS:!0,0:0,1:2}),d=Math.max,b=Math.min,h=9007199254740991,g="Maximum allowed length exceeded";a({target:"Array",proto:!0,forced:!f||!p},{splice:function(t,e){var n,a,m,c,f,p,v=s(this),_=o(v.length),x=r(t,_),y=arguments.length;if(0===y?n=a=0:1===y?(n=0,a=_-x):(n=y-2,a=b(d(i(e),0),_-x)),_+n-a>h)throw TypeError(g);for(m=l(v,a),c=0;c<a;c++)f=x+c,f in v&&u(m,c,v[f]);if(m.length=a,n<a){for(c=x;c<_-a;c++)f=c+a,p=c+n,f in v?v[p]=v[f]:delete v[p];for(c=_;c>_-a+n;c--)delete v[c-1]}else if(n>a)for(c=_-a;c>x;c--)f=c+a-1,p=c+n-1,f in v?v[p]=v[f]:delete v[p];for(c=0;c<n;c++)v[c+x]=arguments[c+2];return v.length=_-a+n,m}})},a825:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-container"},[n("el-form",{ref:"form",attrs:{model:t.form,"label-width":"120px"}},[n("el-form-item",{attrs:{label:"专辑名称"}},[n("el-input",{model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),n("el-form-item",{attrs:{label:"歌手名字"}},[n("el-input",{model:{value:t.form.artist,callback:function(e){t.$set(t.form,"artist",e)},expression:"form.artist"}})],1),n("el-form-item",{attrs:{label:"专辑封面"}},[n("el-input",{attrs:{placeholder:"请输入图片链接"},model:{value:t.form.imageUrl,callback:function(e){t.$set(t.form,"imageUrl",e)},expression:"form.imageUrl"}})],1),n("el-form-item",{attrs:{label:"添加歌曲"}},[t._l(t.form.dynamicTags,(function(e){return n("el-tag",{key:e,attrs:{closable:"","disable-transitions":!1},on:{close:function(n){return t.handleClose(e)}}},[t._v(" "+t._s(e)+" ")])})),t.inputVisible?n("el-input",{ref:"saveTagInput",staticClass:"input-new-tag",attrs:{size:"small"},on:{blur:t.handleInputConfirm},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleInputConfirm(e)}},model:{value:t.inputValue,callback:function(e){t.inputValue=e},expression:"inputValue"}}):n("el-button",{staticClass:"button-new-tag",attrs:{size:"small"},on:{click:t.showInput}},[t._v("+ New Track")])],2),n("el-form-item",{attrs:{label:"简介"}},[n("el-input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:9}},model:{value:t.form.desc,callback:function(e){t.$set(t.form,"desc",e)},expression:"form.desc"}})],1),n("el-form-item",[n("el-button",{attrs:{type:"primary",loading:t.loading},on:{click:t.onSubmit}},[t._v(t._s(t.primary_button_text))]),n("el-button",{on:{click:t.onClear}},[t._v(t._s(t.negative_button_text))])],1)],1)],1)},r=[],i=(n("a434"),{name:"AlbumForm",props:["primary_button_text","negative_button_text","form"],data:function(){return{inputVisible:!1,inputValue:"",loading:!1}},methods:{showInput:function(){var t=this;this.inputVisible=!0,this.$nextTick((function(e){t.$refs.saveTagInput.$refs.input.focus()}))},handleInputConfirm:function(){var t=this.inputValue;t&&this.form.dynamicTags.push(t),this.inputVisible=!1,this.inputValue=""},handleClose:function(t){this.form.dynamicTags.splice(this.form.dynamicTags.indexOf(t),1)},onSubmit:function(){this.$emit("onSubmit")},onClear:function(){this.$emit("onClear")}}}),o=i,s=(n("e074"),n("2877")),l=Object(s["a"])(o,a,r,!1,null,"5922dff9",null);e["a"]=l.exports},e074:function(t,e,n){"use strict";n("0419")}}]);