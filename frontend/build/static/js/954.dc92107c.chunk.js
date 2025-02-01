"use strict";(self.webpackChunkabsensi_frontend=self.webpackChunkabsensi_frontend||[]).push([[954],{1542:(e,r,s)=>{s.d(r,{A:()=>l});var a=s(454),n=(s(9950),s(4414));const l=e=>{let r=Object.assign({},((0,a.A)(e),e));return(0,n.jsx)("div",{className:"nk-content",children:(0,n.jsx)("div",{className:"container-fluid",children:(0,n.jsx)("div",{className:"nk-content-inner",children:(0,n.jsxs)("div",{className:"nk-content-body",children:[r.page?null:r.children,"component"===r.page?(0,n.jsx)("div",{className:"components-preview wide-md mx-auto",children:r.children}):null]})})})})}},1954:(e,r,s)=>{s.r(r),s.d(r,{default:()=>O});var a=s(9950),n=s(3429),l=s(1542),o=s(5988),t=s(7806),c=s(7207),i=s(9343),d=s(4209),m=s(9379),u=s(454),p=s(3120),f=s(1340),h=s(877),g=s(1646),b=s(3452),j=s(9449),x=s(7783),v=s(4414);const y=e=>{let r=Object.assign({},((0,u.A)(e),e));const{register:s,handleSubmit:n,setValue:l,formState:{errors:t},getValues:c,reset:i,control:y}=(0,j.mN)(),[O,N]=(0,a.useState)(!1),w=[{value:"1",label:"Administrator"},{value:"2",label:"Kepala Madrasah"},{value:"3",label:"Guru/Karyawan"}],k=async()=>{N(!0);const e={name:c("name"),username:c("username"),password:c("password"),password_confirmation:c("password_confirmation"),email:c("email"),role:c("role")};await(0,x.M_)(e).then((e=>{(0,o.eI)(e.data.message,"success"),P(),r.setLoadData(!0)})).catch((e=>{(0,o.eI)(e,"error"),N(!1)}))},A=async()=>{N(!0);const e={id:c("id"),name:c("name"),username:c("username"),password:c("password"),password_confirmation:c("password_confirmation"),email:c("email"),role:c("role")};await(0,x.yo)(e).then((e=>{(0,o.eI)(e.data.message,"success"),P(),r.setLoadData(!0)})).catch((e=>{(0,o.eI)(e,"error"),N(!1)}))},P=()=>{i(),l("role",null),r.setUser(null),r.setModal(!1)};return(0,a.useEffect)((()=>{if(null!==r.user){const e=r.user;l("id",e.id),l("name",e.name),l("username",e.username),l("email",e.email),l("role",e.role)}}),[r.user]),(0,v.jsx)(a.Fragment,{children:(0,v.jsxs)(p.A,{isOpen:r.modal,toggle:P,children:[(0,v.jsx)(f.A,{children:null!==r.user?"UBAH":"TAMBAH"}),(0,v.jsx)(h.A,{children:(0,v.jsx)("form",{className:"form-validate is-alter",onSubmit:n((()=>{null===r.user?k().then((()=>N(!1))):A().then((()=>N(!1)))})),children:(0,v.jsxs)(o.fI,{className:"gy-2",children:[(0,v.jsx)(o.fv,{className:"col-md-12",children:(0,v.jsxs)("div",{className:"form-group",children:[(0,v.jsx)(g.A,{htmlFor:"name",className:"form-label",children:"Nama Lengkap"}),(0,v.jsxs)("div",{className:"form-control-wrap",children:[(0,v.jsx)("input",(0,m.A)({className:"form-control",type:"text",id:"name",placeholder:"Ex. Muhammad Arif Muntaha"},s("name",{required:!0}))),t.name&&(0,v.jsx)("span",{className:"invalid",children:"Kolom tidak boleh kosong."})]})]})}),(0,v.jsx)(o.fv,{className:"col-md-12",children:(0,v.jsxs)("div",{className:"form-group",children:[(0,v.jsx)(g.A,{htmlFor:"username",className:"form-label",children:"Nama Pengguna"}),(0,v.jsxs)("div",{className:"form-control-wrap",children:[(0,v.jsx)("input",(0,m.A)({className:"form-control",type:"text",id:"username",placeholder:"Ex. marifmuntaha"},s("username",{required:!0}))),t.username&&(0,v.jsx)("span",{className:"invalid",children:"Kolom tidak boleh kosong."})]})]})}),(0,v.jsx)(o.fv,{className:"col-md-6",children:(0,v.jsxs)("div",{className:"form-group",children:[(0,v.jsx)(g.A,{htmlFor:"password",className:"form-label",children:"Kata Sandi"}),(0,v.jsxs)("div",{className:"form-control-wrap",children:[(0,v.jsx)("input",(0,m.A)({className:"form-control",type:"password",id:"password",placeholder:"Ex. *************"},s("password",{required:null===r.user}))),t.password&&(0,v.jsx)("span",{className:"invalid",children:"Kolom tidak boleh kosong."})]})]})}),(0,v.jsx)(o.fv,{className:"col-md-6",children:(0,v.jsxs)("div",{className:"form-group",children:[(0,v.jsx)(g.A,{htmlFor:"password_confirmation",className:"form-label",children:"Ulangi Sandi"}),(0,v.jsxs)("div",{className:"form-control-wrap",children:[(0,v.jsx)("input",(0,m.A)({className:"form-control",type:"password",id:"password_confirmation",placeholder:"Ex. *************"},s("password_confirmation",{required:null===r.user}))),t.password_confirmation&&(0,v.jsx)("span",{className:"invalid",children:"Kolom tidak boleh kosong."})]})]})}),(0,v.jsx)(o.fv,{className:"col-md-12",children:(0,v.jsxs)("div",{className:"form-group",children:[(0,v.jsx)(g.A,{htmlFor:"email",className:"form-label",children:"Alamat Email"}),(0,v.jsxs)("div",{className:"form-control-wrap",children:[(0,v.jsx)("input",(0,m.A)({className:"form-control",type:"text",id:"email",placeholder:"Ex. marifmuntaha@gmail.com"},s("email",{required:!1}))),t.email&&(0,v.jsx)("span",{className:"invalid",children:"Kolom tidak boleh kosong."})]})]})}),(0,v.jsx)(o.fv,{className:"col-md-12",children:(0,v.jsxs)("div",{className:"form-group",children:[(0,v.jsx)("label",{className:"form-label",htmlFor:"role",children:"Hak Akses"}),(0,v.jsxs)("div",{className:"form-control-wrap",children:[(0,v.jsx)("input",{type:"hidden",id:"role",className:"form-control"}),(0,v.jsx)(j.xI,{control:y,className:"form-control",name:"role",rules:{required:!0},render:e=>{let{field:{onChange:r,value:s,ref:a}}=e;return(0,v.jsx)(o.$t,{inputRef:a,options:w,value:w.find((e=>e.value===s)),onChange:e=>r(e.value),placeholder:"Pilih Hak Akses"})}}),t.role&&(0,v.jsx)("span",{className:"invalid",children:"Kolom tidak boleh kosong."})]})]})}),(0,v.jsx)("div",{className:"form-group",children:(0,v.jsx)(b.A,{size:"lg",className:"btn-block",type:"submit",color:"primary",children:O?(0,v.jsx)(d.A,{size:"sm",color:"light"}):"SIMPAN"})})]})})})]})})},O=()=>{const[e,r]=(0,a.useState)(!1),[s,m]=(0,a.useState)([]),[u,p]=(0,a.useState)(null),[f,h]=(0,a.useState)(!0),[g,b]=(0,a.useState)(!1),[j,O]=(0,a.useState)(!1),N=[{name:"Nama Lengkap",selector:e=>e.name,sortable:!1},{name:"Nama Pengguna",selector:e=>e.username,sortable:!1,hide:370},{name:"Alamat Email",selector:e=>e.email,sortable:!1,hide:370},{name:"Hak Akses",selector:e=>e.role,sortable:!1,hide:"sm",cell:e=>{switch(e.role){case"1":return(0,v.jsx)(c.A,{pill:!0,color:"success",children:"Administrator"});case"2":return(0,v.jsx)(c.A,{pill:!0,color:"warning",children:"Kepala Madrasah"});case"3":return(0,v.jsx)(c.A,{pill:!0,color:"info",children:"Guru/Karyawan"})}}},{name:"Aksi",selector:e=>e.id,sortable:!1,hide:"sm",cell:e=>(0,v.jsxs)(i.A,{size:"sm",children:[(0,v.jsx)(o.$n,{outline:!0,color:"warning",onClick:()=>{p(e),b(!0)},children:(0,v.jsx)(o.In,{name:"edit-alt"})}),(0,v.jsx)(o.$n,{outline:!0,color:"danger",onClick:()=>{O(e.id),(0,x.zr)(e.id).then((e=>{(0,o.eI)(e.data.message,"success"),h(!0)})).catch((e=>(0,o.eI)(e,"error")))},children:j===e.id?(0,v.jsx)(d.A,{size:"sm"}):(0,v.jsx)(o.In,{name:"trash"})})]})}];return(0,a.useEffect)((()=>{f&&(0,x.Jt)().then((e=>{m(e.data.result),h(!1)})).catch((e=>{(0,o.eI)(e,"error"),h(!1)}))}),[f]),(0,v.jsxs)(a.Fragment,{children:[(0,v.jsx)(n.A,{title:"Data Pengguna"}),(0,v.jsxs)(l.A,{page:"component",children:[(0,v.jsx)(o.GE,{size:"lg",wide:"sm",children:(0,v.jsx)(o.X3,{children:(0,v.jsx)(o.n0,{link:"/",icon:"arrow-left",children:"Dashboard"})})}),(0,v.jsxs)(o.eB,{size:"sm",children:[(0,v.jsx)(o.GE,{size:"sm",children:(0,v.jsxs)(o.CZ,{children:[(0,v.jsxs)(o.X3,{children:[(0,v.jsx)(o.E9,{tag:"h4",children:"Data Pengguna"}),(0,v.jsxs)("p",{children:["Just import ",(0,v.jsx)("code",{children:"ReactDataTable"})," from ",(0,v.jsx)("code",{children:"components"}),", it is built in for react dashlite."]})]}),(0,v.jsx)(o.X3,{children:(0,v.jsxs)("div",{className:"toggle-wrap nk-block-tools-toggle",children:[(0,v.jsx)("a",{href:"#more",className:"btn btn-icon btn-trigger toggle-expand me-n1",onClick:s=>{s.preventDefault(),r(!e)},children:(0,v.jsx)(o.In,{name:"more-v"})}),(0,v.jsx)("div",{className:"toggle-expand-content",style:{display:e?"block":"none"},children:(0,v.jsx)("ul",{className:"nk-block-tools g-3",children:(0,v.jsxs)("li",{className:"nk-block-tools-opt",children:[(0,v.jsx)(o.$n,{className:"toggle btn-icon d-md-none",color:"dark",onClick:()=>{b(!0)},children:(0,v.jsx)(o.In,{name:"plus"})}),(0,v.jsxs)(o.$n,{className:"toggle d-none d-md-inline-flex",color:"dark",onClick:()=>{b(!0)},children:[(0,v.jsx)(o.In,{name:"plus"}),(0,v.jsx)("span",{children:"TAMBAH"})]})]})})})]})})]})}),(0,v.jsx)(o.Ns,{children:(0,v.jsx)(t.A,{data:s,columns:N,expandableRows:!0,pagination:!0})})]})]}),(0,v.jsx)(y,{modal:g,setModal:b,user:u,setUser:p,setLoadData:h})]})}},7783:(e,r,s)=>{s.d(r,{Jt:()=>n,M_:()=>l,yo:()=>o,zr:()=>t});const a=new(s(183).g);function n(e){return a.get("/user",e)}function l(e){return a.create("/user",e)}function o(e){const r="/user/".concat(e.id);return a.update("".concat(r),e)}function t(e){const r="/user/".concat(e);return a.delete("".concat(r))}},7207:(e,r,s)=>{s.d(r,{A:()=>f});var a=s(9950),n=s(1942),l=s.n(n),o=s(8738),t=s.n(o),c=s(1497),i=["className","cssModule","color","innerRef","pill","tag"];function d(){return d=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var s=arguments[r];for(var a in s)Object.prototype.hasOwnProperty.call(s,a)&&(e[a]=s[a])}return e},d.apply(this,arguments)}function m(e,r){if(null==e)return{};var s,a,n=function(e,r){if(null==e)return{};var s,a,n={},l=Object.keys(e);for(a=0;a<l.length;a++)s=l[a],r.indexOf(s)>=0||(n[s]=e[s]);return n}(e,r);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)s=l[a],r.indexOf(s)>=0||Object.prototype.propertyIsEnumerable.call(e,s)&&(n[s]=e[s])}return n}var u={children:l().node,className:l().string,color:l().string,cssModule:l().object,innerRef:l().oneOfType([l().object,l().func,l().string]),pill:l().bool,tag:c.Wx};function p(e){var r=e.className,s=e.cssModule,n=e.color,l=void 0===n?"secondary":n,o=e.innerRef,u=e.pill,p=void 0!==u&&u,f=e.tag,h=void 0===f?"span":f,g=m(e,i),b=(0,c.qO)(t()(r,"badge","bg-"+l,!!p&&"rounded-pill"),s);return g.href&&"span"===h&&(h="a"),a.createElement(h,d({},g,{className:b,ref:o}))}p.propTypes=u;const f=p},9343:(e,r,s)=>{s.d(r,{A:()=>g});var a=s(9950),n=s(1942),l=s.n(n),o=s(8738),t=s.n(o),c=s(1497),i=["className","cssModule","size","vertical","tag"];function d(){return d=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var s=arguments[r];for(var a in s)Object.prototype.hasOwnProperty.call(s,a)&&(e[a]=s[a])}return e},d.apply(this,arguments)}function m(e,r){var s=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);r&&(a=a.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),s.push.apply(s,a)}return s}function u(e,r,s){return r in e?Object.defineProperty(e,r,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[r]=s,e}function p(e,r){if(null==e)return{};var s,a,n=function(e,r){if(null==e)return{};var s,a,n={},l=Object.keys(e);for(a=0;a<l.length;a++)s=l[a],r.indexOf(s)>=0||(n[s]=e[s]);return n}(e,r);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)s=l[a],r.indexOf(s)>=0||Object.prototype.propertyIsEnumerable.call(e,s)&&(n[s]=e[s])}return n}var f={"aria-label":l().string,className:l().string,cssModule:l().object,role:l().string,size:l().string,tag:c.Wx,vertical:l().bool};function h(e){var r=e.className,s=e.cssModule,n=e.size,l=e.vertical,o=e.tag,f=void 0===o?"div":o,h=p(e,i),g=(0,c.qO)(t()(r,!!n&&"btn-group-"+n,l?"btn-group-vertical":"btn-group"),s);return a.createElement(f,d({},function(e){for(var r=1;r<arguments.length;r++){var s=null!=arguments[r]?arguments[r]:{};r%2?m(Object(s),!0).forEach((function(r){u(e,r,s[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(s)):m(Object(s)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(s,r))}))}return e}({role:"group"},h),{className:g}))}h.propTypes=f;const g=h},1646:(e,r,s)=>{s.d(r,{A:()=>x});var a=s(9950),n=s(1942),l=s.n(n),o=s(8738),t=s.n(o),c=s(1497),i=["className","cssModule","hidden","widths","tag","check","size","for"];function d(){return d=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var s=arguments[r];for(var a in s)Object.prototype.hasOwnProperty.call(s,a)&&(e[a]=s[a])}return e},d.apply(this,arguments)}function m(e,r,s){return r in e?Object.defineProperty(e,r,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[r]=s,e}function u(e,r){if(null==e)return{};var s,a,n=function(e,r){if(null==e)return{};var s,a,n={},l=Object.keys(e);for(a=0;a<l.length;a++)s=l[a],r.indexOf(s)>=0||(n[s]=e[s]);return n}(e,r);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)s=l[a],r.indexOf(s)>=0||Object.prototype.propertyIsEnumerable.call(e,s)&&(n[s]=e[s])}return n}var p=["xs","sm","md","lg","xl","xxl"],f=l().oneOfType([l().number,l().string]),h=l().oneOfType([l().bool,l().string,l().number,l().shape({size:f,order:f,offset:f})]),g={children:l().node,hidden:l().bool,check:l().bool,size:l().string,for:l().string,tag:c.Wx,className:l().string,cssModule:l().object,xs:h,sm:h,md:h,lg:h,xl:h,xxl:h,widths:l().array},b=function(e,r,s){return!0===s||""===s?e?"col":"col-".concat(r):"auto"===s?e?"col-auto":"col-".concat(r,"-auto"):e?"col-".concat(s):"col-".concat(r,"-").concat(s)};function j(e){var r=e.className,s=e.cssModule,n=e.hidden,l=e.widths,o=void 0===l?p:l,f=e.tag,h=void 0===f?"label":f,g=e.check,j=e.size,x=e.for,v=u(e,i),y=[];o.forEach((function(r,a){var n=e[r];if(delete v[r],n||""===n){var l,o=!a;if((0,c.Gv)(n)){var i,d=o?"-":"-".concat(r,"-");l=b(o,r,n.size),y.push((0,c.qO)(t()((m(i={},l,n.size||""===n.size),m(i,"order".concat(d).concat(n.order),n.order||0===n.order),m(i,"offset".concat(d).concat(n.offset),n.offset||0===n.offset),i))),s)}else l=b(o,r,n),y.push(l)}}));var O=j||y.length,N=!(g||O),w=(0,c.qO)(t()(r,!!n&&"visually-hidden",!!g&&"form-check-label",!!j&&"col-form-label-".concat(j),y,!!O&&"col-form-label",!!N&&"form-label"),s);return a.createElement(h,d({htmlFor:x},v,{className:w}))}j.propTypes=g;const x=j},1340:(e,r,s)=>{s.d(r,{A:()=>f});var a=s(9950),n=s(1942),l=s.n(n),o=s(8738),t=s.n(o),c=s(1497),i=["className","cssModule","children","toggle","tag","wrapTag","closeAriaLabel","close"];function d(){return d=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var s=arguments[r];for(var a in s)Object.prototype.hasOwnProperty.call(s,a)&&(e[a]=s[a])}return e},d.apply(this,arguments)}function m(e,r){if(null==e)return{};var s,a,n=function(e,r){if(null==e)return{};var s,a,n={},l=Object.keys(e);for(a=0;a<l.length;a++)s=l[a],r.indexOf(s)>=0||(n[s]=e[s]);return n}(e,r);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)s=l[a],r.indexOf(s)>=0||Object.prototype.propertyIsEnumerable.call(e,s)&&(n[s]=e[s])}return n}var u={children:l().node,className:l().string,close:l().object,closeAriaLabel:l().string,cssModule:l().object,tag:c.Wx,toggle:l().func,wrapTag:c.Wx};function p(e){var r,s=e.className,n=e.cssModule,l=e.children,o=e.toggle,u=e.tag,p=void 0===u?"h5":u,f=e.wrapTag,h=void 0===f?"div":f,g=e.closeAriaLabel,b=void 0===g?"Close":g,j=e.close,x=m(e,i),v=(0,c.qO)(t()(s,"modal-header"),n);return!j&&o&&(r=a.createElement("button",{type:"button",onClick:o,className:(0,c.qO)("btn-close",n),"aria-label":b})),a.createElement(h,d({},x,{className:v}),a.createElement(p,{className:(0,c.qO)("modal-title",n)},l),j||r)}p.propTypes=u;const f=p}}]);