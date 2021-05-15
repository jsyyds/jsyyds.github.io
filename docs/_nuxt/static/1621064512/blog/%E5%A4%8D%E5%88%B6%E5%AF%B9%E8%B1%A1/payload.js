__NUXT_JSONP__("/blog/%E5%A4%8D%E5%88%B6%E5%AF%B9%E8%B1%A1", (function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,_,$,aa,ab,ac,ad,ae,af,ag,ah,ai,aj,ak,al,am,an,ao,ap,aq,ar,as,at,au,av,aw,ax,ay,az){return {data:[{article:{slug:V,description:"复制 JS 对象的几种方法",title:V,img:"https:\u002F\u002Fimages.unsplash.com\u002Fphoto-1519227355453-8f982e425321?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHNpbWlsYXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",alt:V,tags:[W],toc:[{id:M,depth:ag,text:M},{id:N,depth:ag,text:N}],body:{type:"root",children:[{type:b,tag:o,props:{},children:[{type:a,value:"在 JS 中，数据类型分为原始类型和对象类型（也叫引用类型）。"}]},{type:a,value:f},{type:b,tag:o,props:{},children:[{type:a,value:"对于原始类型来说，复制一个变量值，本质上就是 copy 了这个变量。一个变量值的修改，不会影响到另外一个变量。"}]},{type:a,value:f},{type:b,tag:o,props:{},children:[{type:a,value:"看一个简单的例子："}]},{type:a,value:f},{type:b,tag:D,props:{className:[E]},children:[{type:b,tag:F,props:{className:[G,H]},children:[{type:b,tag:I,props:{},children:[{type:b,tag:c,props:{className:[d,m]},children:[{type:a,value:r}]},{type:a,value:" val "},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:i}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,v]},children:[{type:a,value:O}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,m]},children:[{type:a,value:r}]},{type:a,value:P},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:i}]},{type:a,value:" val\n"},{type:b,tag:c,props:{className:[d,l,s]},children:[{type:a,value:l}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:b,tag:c,props:{className:[d,t,n,k]},children:[{type:a,value:x}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:p}]},{type:a,value:B},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:q}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,u]},children:[{type:a,value:ah}]},{type:a,value:"\nval "},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:i}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,v]},children:[{type:a,value:Q}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,u]},children:[{type:a,value:"\u002F\u002F 修改 val 的值对 copy 的值不产生影响"}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,l,s]},children:[{type:a,value:l}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:b,tag:c,props:{className:[d,t,n,k]},children:[{type:a,value:x}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:p}]},{type:a,value:B},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:q}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,u]},children:[{type:a,value:ah}]},{type:a,value:f}]}]}]},{type:a,value:f},{type:b,tag:o,props:{},children:[{type:a,value:"而对于对象类型的复制，变量名只是指向这个对象的指针。当我们将保存对象的一个变量赋值给另一个变量时，实际上赋值的是这个指针，也就是两个变量都指向同一个对象。因此，一个对象的修改，会影响到另外一个对象。"}]},{type:a,value:f},{type:b,tag:o,props:{},children:[{type:a,value:"看一个例子："}]},{type:a,value:f},{type:b,tag:D,props:{className:[E]},children:[{type:b,tag:F,props:{className:[G,H]},children:[{type:b,tag:I,props:{},children:[{type:b,tag:c,props:{className:[d,m]},children:[{type:a,value:r}]},{type:a,value:K},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:i}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:y}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,u]},children:[{type:a,value:"\u002F\u002F obj 只是指向对象的指针"}]},{type:a,value:"\n    character"},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:w}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,C]},children:[{type:a,value:"'peacdful'"}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:z}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,m]},children:[{type:a,value:r}]},{type:a,value:P},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:i}]},{type:a,value:K},{type:b,tag:c,props:{className:[d,u]},children:[{type:a,value:"\u002F\u002F copy 变量复制了这个指针，指向同一个对象"}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,l,s]},children:[{type:a,value:l}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:b,tag:c,props:{className:[d,t,n,k]},children:[{type:a,value:x}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:p}]},{type:a,value:B},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:q}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,u]},children:[{type:a,value:"\u002F\u002F {character: 'peaceful'}"}]},{type:a,value:X},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:b,tag:c,props:{className:[d,k]},children:[{type:a,value:"character"}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:i}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,C]},children:[{type:a,value:ai}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,l,s]},children:[{type:a,value:l}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:b,tag:c,props:{className:[d,t,n,k]},children:[{type:a,value:x}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:p}]},{type:a,value:B},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:q}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,u]},children:[{type:a,value:"\u002F\u002F {character: 'lovely'}"}]},{type:a,value:f}]}]}]},{type:a,value:f},{type:b,tag:o,props:{},children:[{type:a,value:"有一副很形象的图描述了对象类型复制的原理："}]},{type:a,value:f},{type:b,tag:o,props:{},children:[{type:b,tag:"img",props:{alt:"",src:"..\u002Fimg\u002F%E5%A4%8D%E5%88%B6%E5%AF%B9%E8%B1%A1_0.png"},children:[]}]},{type:a,value:f},{type:b,tag:o,props:{},children:[{type:a,value:"同理，在复制一个数组时，变量名只是指向这个数组对象的指针；在复制一个函数时，函数名也只是指向这个函数对象的指针："}]},{type:a,value:f},{type:b,tag:D,props:{className:[E]},children:[{type:b,tag:F,props:{className:[G,H]},children:[{type:b,tag:I,props:{},children:[{type:b,tag:c,props:{className:[d,m]},children:[{type:a,value:r}]},{type:a,value:" arr "},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:i}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:Y}]},{type:b,tag:c,props:{className:[d,v]},children:[{type:a,value:"1"}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:A}]},{type:b,tag:c,props:{className:[d,v]},children:[{type:a,value:"2"}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:A}]},{type:b,tag:c,props:{className:[d,v]},children:[{type:a,value:"3"}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:Z}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,m]},children:[{type:a,value:r}]},{type:a,value:P},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:i}]},{type:a,value:" arr\n"},{type:b,tag:c,props:{className:[d,l,s]},children:[{type:a,value:l}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:b,tag:c,props:{className:[d,t,n,k]},children:[{type:a,value:x}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:p}]},{type:a,value:B},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:q}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,u]},children:[{type:a,value:"\u002F\u002F [1,2,3]"}]},{type:a,value:"\narr"},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:Y}]},{type:b,tag:c,props:{className:[d,v]},children:[{type:a,value:"0"}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:Z}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:i}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,C]},children:[{type:a,value:"'keith'"}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,l,s]},children:[{type:a,value:l}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:b,tag:c,props:{className:[d,t,n,k]},children:[{type:a,value:x}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:p}]},{type:a,value:B},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:q}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,u]},children:[{type:a,value:"\u002F\u002F 数组对象被改变：['keith',2,3]"}]},{type:a,value:"\narr "},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:i}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,m,R,aj]},children:[{type:a,value:R}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,l,s]},children:[{type:a,value:l}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:b,tag:c,props:{className:[d,t,n,k]},children:[{type:a,value:x}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:p}]},{type:a,value:B},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:q}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,u]},children:[{type:a,value:"\u002F\u002F ['keith',2,3] 即使 arr = null，也不会影响 copy。因为此时的 arr 变量只是一个指向数组对象的指针"}]},{type:a,value:"\n\n"},{type:b,tag:c,props:{className:[d,m]},children:[{type:a,value:n}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,n]},children:[{type:a,value:ak}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:p}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:q}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:y}]},{type:a,value:al},{type:b,tag:c,props:{className:[d,m,"control-flow"]},children:[{type:a,value:"return"}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,C]},children:[{type:a,value:"'hello world'"}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:z}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,m]},children:[{type:a,value:r}]},{type:a,value:" bar "},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:i}]},{type:a,value:" foo\n"},{type:b,tag:c,props:{className:[d,l,s]},children:[{type:a,value:l}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:b,tag:c,props:{className:[d,t,n,k]},children:[{type:a,value:x}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:p}]},{type:b,tag:c,props:{className:[d,n]},children:[{type:a,value:ak}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:p}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:q}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:q}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,u]},children:[{type:a,value:am}]},{type:a,value:"\nfoo "},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:i}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,m,R,aj]},children:[{type:a,value:R}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,u]},children:[{type:a,value:"\u002F\u002F foo 只是指向函数对象的指针"}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,l,s]},children:[{type:a,value:l}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:b,tag:c,props:{className:[d,t,n,k]},children:[{type:a,value:x}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:p}]},{type:b,tag:c,props:{className:[d,n]},children:[{type:a,value:"bar"}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:p}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:q}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:q}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,u]},children:[{type:a,value:am}]},{type:a,value:f}]}]}]},{type:a,value:f},{type:b,tag:o,props:{},children:[{type:a,value:"因此，我们应该如何实现对象的深浅复制？"}]},{type:a,value:f},{type:b,tag:o,props:{},children:[{type:a,value:"在 JavaScript 中，复制对象分为两种方法，浅复制和深复制。"}]},{type:a,value:f},{type:b,tag:o,props:{},children:[{type:a,value:"浅复制没有办法去真正的复制一个对象，当源对象内部包含对象类型时，复制目标对象只是保存了该对象内部对象类型的引用。而深复制可以实现真正的复制一个对象。"}]},{type:a,value:f},{type:b,tag:an,props:{id:M},children:[{type:b,tag:S,props:{ariaHidden:ao,href:"#%E6%B5%85%E5%A4%8D%E5%88%B6",tabIndex:ap},children:[{type:b,tag:c,props:{className:[aq,ar]},children:[]}]},{type:a,value:M}]},{type:a,value:f},{type:b,tag:o,props:{},children:[{type:a,value:"在 ES6 中，Object 对象新增了一个 assign 方法，可以实现对象的浅复制。"}]},{type:a,value:f},{type:b,tag:o,props:{},children:[{type:a,value:"Object.assifn() 的第一个参数是目标对象，可以跟一或多个源对象作为参数，将源对象的所有可枚举（[[emuerable]]===true）属性复制到目标对象。这种复制属于浅复制。"}]},{type:a,value:f},{type:b,tag:D,props:{className:[E]},children:[{type:b,tag:F,props:{className:[G,H]},children:[{type:b,tag:I,props:{},children:[{type:b,tag:c,props:{className:[d,L,s]},children:[{type:a,value:_}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:b,tag:c,props:{className:[d,t,n,k]},children:[{type:a,value:$}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:p}]},{type:a,value:aa},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:A}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:Y}]},{type:a,value:"source1"},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:A}]},{type:a,value:ab},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:A}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,"spread",h]},children:[{type:a,value:"..."}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:Z}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:q}]},{type:a,value:f}]}]}]},{type:a,value:f},{type:b,tag:"ul",props:{},children:[{type:a,value:f},{type:b,tag:T,props:{},children:[{type:a,value:"如果目标对象与源对象有同名属性，则后面的属性会覆盖前面的属性"}]},{type:a,value:f},{type:b,tag:T,props:{},children:[{type:a,value:"如果只有一个参数，则直接返回该参数。即Object.assign(obj) === obj"}]},{type:a,value:f},{type:b,tag:T,props:{},children:[{type:a,value:"如果第一个参数不是对象，而是基本数据类型（Null、Undefined除外），则会调用对应的基本包装类型"}]},{type:a,value:f},{type:b,tag:T,props:{},children:[{type:a,value:"如果第一个参数是Null和Undefined，则会报错；如果Null和Undefined不是位于第一个参数，则会略过该参数的复制"}]},{type:a,value:f}]},{type:a,value:f},{type:b,tag:o,props:{},children:[{type:a,value:"要实现对象的浅复制，可以使用 Object.assign 方法："}]},{type:a,value:f},{type:b,tag:D,props:{className:[E]},children:[{type:b,tag:F,props:{className:[G,H]},children:[{type:b,tag:I,props:{},children:[{type:b,tag:c,props:{className:[d,m]},children:[{type:a,value:r}]},{type:a,value:as},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:i}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:y}]},{type:a,value:S},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:w}]},{type:b,tag:c,props:{className:[d,v]},children:[{type:a,value:O}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:z}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,m]},children:[{type:a,value:r}]},{type:a,value:at},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:i}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:y}]},{type:a,value:U},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:w}]},{type:b,tag:c,props:{className:[d,v]},children:[{type:a,value:Q}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:z}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,m]},children:[{type:a,value:r}]},{type:a,value:au},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:i}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:y}]},{type:a,value:ac},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:w}]},{type:b,tag:c,props:{className:[d,v]},children:[{type:a,value:ad}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:z}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,m]},children:[{type:a,value:r}]},{type:a,value:K},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:i}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,L,s]},children:[{type:a,value:_}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:b,tag:c,props:{className:[d,t,n,k]},children:[{type:a,value:$}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:p}]},{type:a,value:aa},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:A}]},{type:a,value:av},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:A}]},{type:a,value:ab},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:q}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,l,s]},children:[{type:a,value:l}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:b,tag:c,props:{className:[d,t,n,k]},children:[{type:a,value:x}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:p}]},{type:a,value:ae},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:q}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,u]},children:[{type:a,value:"\u002F\u002F {a: 123, b: 456, c: 789}"}]},{type:a,value:f}]}]}]},{type:a,value:f},{type:b,tag:o,props:{},children:[{type:a,value:"不过对于属性中包含对象类型的对象，Object.assign 方法可能会造成一些错误："}]},{type:a,value:f},{type:b,tag:D,props:{className:[E]},children:[{type:b,tag:F,props:{className:[G,H]},children:[{type:b,tag:I,props:{},children:[{type:b,tag:c,props:{className:[d,m]},children:[{type:a,value:r}]},{type:a,value:as},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:i}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:y}]},{type:a,value:S},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:w}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,v]},children:[{type:a,value:O}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:z}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:J}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,m]},children:[{type:a,value:r}]},{type:a,value:at},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:i}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:y}]},{type:a,value:U},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:w}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,v]},children:[{type:a,value:Q}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:z}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:J}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,m]},children:[{type:a,value:r}]},{type:a,value:au},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:i}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:y}]},{type:a,value:ac},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:w}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,v]},children:[{type:a,value:ad}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:A}]},{type:a,value:" d"},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:w}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:y}]},{type:a,value:af},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:w}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,C]},children:[{type:a,value:ai}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:z}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:z}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:J}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,m]},children:[{type:a,value:r}]},{type:a,value:K},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:i}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,L,s]},children:[{type:a,value:_}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:b,tag:c,props:{className:[d,t,n,k]},children:[{type:a,value:$}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:p}]},{type:a,value:aa},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:A}]},{type:a,value:av},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:A}]},{type:a,value:ab},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:q}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:J}]},{type:a,value:"\nsource2"},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:b,tag:c,props:{className:[d,k]},children:[{type:a,value:aw}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:b,tag:c,props:{className:[d,k]},children:[{type:a,value:af}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:i}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,C]},children:[{type:a,value:"'peaceful'"}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:J}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,l,s]},children:[{type:a,value:l}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:b,tag:c,props:{className:[d,t,n,k]},children:[{type:a,value:x}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:p}]},{type:a,value:ae},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:q}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:J}]},{type:a,value:"   "},{type:b,tag:c,props:{className:[d,u]},children:[{type:a,value:"\u002F\u002F {a: 123, b: 456, c: 789, d: {e: 'peaceful'}}"}]},{type:a,value:f}]}]}]},{type:a,value:f},{type:b,tag:o,props:{},children:[{type:a,value:"从上面的代码中可以看出，source2 对象中 e 属性的改变，仍然会影响到 obj 对象。"}]},{type:a,value:f},{type:b,tag:an,props:{id:N},children:[{type:b,tag:S,props:{ariaHidden:ao,href:"#%E6%B7%B1%E5%A4%8D%E5%88%B6",tabIndex:ap},children:[{type:b,tag:c,props:{className:[aq,ar]},children:[]}]},{type:a,value:N}]},{type:a,value:f},{type:b,tag:o,props:{},children:[{type:a,value:"在实际的开发项目中，前后端进行数据传输，主要是通过 JSON 实现的。JSON 的全称是：JavaScript Object Notation，JavaScript 对象表示法。"}]},{type:a,value:f},{type:b,tag:o,props:{},children:[{type:a,value:"JSON 对象有两个方法，一是将 JS 对象转换成字符串的 JSON.stringify 方法；一个是将字符串转换成 JS 对象的 JSON.parse方法。"}]},{type:a,value:f},{type:b,tag:o,props:{},children:[{type:a,value:"这个两个方法结合使用可以实现对象的深复制。也就是说，当我们需要复制一个 obj 对象时，可以先调用 JSON.stringify(obj)，将其转换为字符串，然后再调用 JSON.parse 方法，将其转换为 JS 对象，就可以轻松的实现对象的深复制。"}]},{type:a,value:f},{type:b,tag:D,props:{className:[E]},children:[{type:b,tag:F,props:{className:[G,H]},children:[{type:b,tag:I,props:{},children:[{type:b,tag:c,props:{className:[d,m]},children:[{type:a,value:r}]},{type:a,value:K},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:i}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:y}]},{type:a,value:"\n    a"},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:w}]},{type:b,tag:c,props:{className:[d,v]},children:[{type:a,value:O}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:A}]},{type:a,value:"\n    b"},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:w}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:y}]},{type:a,value:"\n        c"},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:w}]},{type:b,tag:c,props:{className:[d,v]},children:[{type:a,value:Q}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:A}]},{type:a,value:"\n        d"},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:w}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:y}]},{type:a,value:"\n            e"},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:w}]},{type:b,tag:c,props:{className:[d,v]},children:[{type:a,value:ad}]},{type:a,value:"\n        "},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:z}]},{type:a,value:al},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:z}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:z}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,m]},children:[{type:a,value:r}]},{type:a,value:P},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:i}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,L,s]},children:[{type:a,value:ax}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:b,tag:c,props:{className:[d,t,n,k]},children:[{type:a,value:"parse"}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:p}]},{type:b,tag:c,props:{className:[d,L,s]},children:[{type:a,value:ax}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:b,tag:c,props:{className:[d,t,n,k]},children:[{type:a,value:"stringify"}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:p}]},{type:a,value:ae},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:q}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:q}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,u]},children:[{type:a,value:"\u002F\u002F 无论 obj 对象怎么修改，都不会影响到 copy 对象"}]},{type:a,value:X},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:b,tag:c,props:{className:[d,k]},children:[{type:a,value:U}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:b,tag:c,props:{className:[d,k]},children:[{type:a,value:ac}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:i}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,C]},children:[{type:a,value:"'hello'"}]},{type:a,value:X},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:b,tag:c,props:{className:[d,k]},children:[{type:a,value:U}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:b,tag:c,props:{className:[d,k]},children:[{type:a,value:aw}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:b,tag:c,props:{className:[d,k]},children:[{type:a,value:af}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:i}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,C]},children:[{type:a,value:"'world'"}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,l,s]},children:[{type:a,value:l}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:b,tag:c,props:{className:[d,t,n,k]},children:[{type:a,value:x}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:p}]},{type:a,value:B},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:q}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,u]},children:[{type:a,value:"\u002F\u002F {a:123,b:{c:456,d:{e:789}}}"}]},{type:a,value:f}]}]}]},{type:a,value:f},{type:b,tag:o,props:{},children:[{type:a,value:"当然，使用这种方法实现深复制有一个缺点就是给 JSON.parse 方法传入的字符串必须是合法的 JSON，否则会抛出错误。"}]}]},dir:"\u002Farticles",path:"\u002Farticles\u002F复制对象",extension:".md",createdAt:"2021-05-15T07:00:28.761Z",updatedAt:"2021-05-15T07:02:55.452Z"},tags:{javascript:{slug:W,name:W}},prev:{slug:ay,title:ay},next:{slug:az,title:az}}],fetch:[],mutations:void 0}}("text","element","span","token","punctuation","\n"," ","operator","=",".","property-access","console","keyword","function","p","(",")","let","class-name","method","comment","number",":","log","{","}",",","copy","string","div","nuxt-content-highlight","pre","language-js","line-numbers","code",";"," obj ","known-class-name","浅复制","深复制","123"," copy ","456","null","a","li","b","复制对象","javascript","\nobj","[","]","Object","assign","target"," source2","c","789","obj","e",3,"\u002F\u002F 123","'lovely'","nil","foo","\n    ","\u002F\u002F \"hello world\"","h3","true",-1,"icon","icon-link"," target "," source1 "," source2 "," source1","d","JSON","隐式类型转换","回流与重绘")));