(this["webpackJsonpto-do-mern"]=this["webpackJsonpto-do-mern"]||[]).push([[0],{104:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),c=a(10),r=a.n(c),o=(a(91),a(11)),i=a(14),l=a(106),d=a(135),u=a(150),j=a(136),b=a(3);function h(e){var t=e.setRegisterLoginToggle,a=Object(n.useState)(""),s=Object(o.a)(a,2),c=s[0],r=s[1],h=Object(i.f)(),p={},g=function(e){p[e.target.id]=e.target.value,console.log(p)};return Object(b.jsxs)(l.a,{elevation:2,className:"authForm-wrapper",children:[Object(b.jsxs)("form",{onSubmit:function(e){e.preventDefault(),console.log(p);var t={email:p.email,pass:p.pass},a="https://getitdone-backend-app.herokuapp.com/auth/login",n={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)};console.log(t,a,n),fetch(a,n).then((function(e){return e.json().then((function(e){"failed"==e.status?r(e.message):(r(e.message),localStorage.setItem("token",e.data),setTimeout((function(){h.push("/tasks")}),3e3))}))}))},className:"authForm",children:[Object(b.jsx)(d.a,{children:Object(b.jsx)(u.a,{id:"email",label:"Email","aria-describedby":"my-helper-text",autoFocus:"true",required:"true",onChange:g})}),Object(b.jsx)(d.a,{children:Object(b.jsx)(u.a,{id:"pass",label:"Password",required:"true",onChange:g})}),Object(b.jsx)(j.a,{type:"submit",variant:"contained",color:"secondary",children:"Login"})]}),Object(b.jsxs)("p",{children:["New here?",Object(b.jsx)("span",{style:{textDecoration:"underline",display:"block",cursor:"pointer"},onClick:function(){return t(!1)},children:"Register"})]}),Object(b.jsx)("p",{children:c})]})}var p=function(e){var t=e.setRegisterLoginToggle,a=Object(n.useState)(!1),s=Object(o.a)(a,2),c=s[0],r=s[1],i=Object(n.useState)(!1),h=Object(o.a)(i,2),p=(h[0],h[1]),g=Object(n.useState)(!1),O=Object(o.a)(g,2),f=O[0],m=O[1],x=Object(n.useState)(""),k=Object(o.a)(x,2),T=k[0],y=k[1],v=Object(n.useState)(""),S=Object(o.a)(v,2),C=S[0],w=S[1],F=Object(n.useState)(""),N=Object(o.a)(F,2),P=N[0],B=N[1],E=Object(n.useState)({email:"",pass:"",passConf:""}),I=Object(o.a)(E,2),M=I[0],R=(I[1],function(e){M[e.target.id]=e.target.value,r(!1),m(!1),y(""),console.log(M)}),D=function(e){if(e.preventDefault(),M.pass!==M.passConf)r(!0),y("Please make sure the passwords match.");else{var a={email:M.email,pass:M.pass},n={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)};console.log(n),fetch("https://getitdone-backend-app.herokuapp.com/auth/register",n).then((function(e){return e.json().then((function(e){"failed"==e.status?(w(e.message),m(!0)):(p(!0),B(e.message+"\u2705 Redirecting to login page..."),setTimeout((function(){t(!0)}),3e3))}))}))}};return Object(b.jsxs)(l.a,{elevation:2,className:"authForm-wrapper",children:[Object(b.jsxs)("form",{onSubmit:D,className:"authForm",children:[Object(b.jsx)(d.a,{children:Object(b.jsx)(u.a,{id:"email",label:"Email","aria-describedby":"my-helper-text",autoFocus:"true",required:"true",error:f,helperText:C,onChange:R})}),Object(b.jsx)(d.a,{children:Object(b.jsx)(u.a,{id:"pass",label:"Password",required:"true",onChange:R})}),Object(b.jsx)(d.a,{children:Object(b.jsx)(u.a,{id:"passConf",label:"Confirm Password",required:"true",error:c,helperText:T,onChange:R})}),Object(b.jsx)(j.a,{type:"submit",variant:"contained",color:"secondary",onClick:function(){return D},children:"Register"})]}),Object(b.jsxs)("p",{children:["Have an account?",Object(b.jsx)("span",{style:{textDecoration:"underline",display:"block",cursor:"pointer"},onClick:function(){return t(!0)},children:"Log In"})]}),Object(b.jsx)("p",{children:P})]})};var g=function(){var e=Object(n.useState)(!0),t=Object(o.a)(e,2),a=t[0],s=t[1];return Object(b.jsxs)("div",{className:"main",style:{display:"block"},children:[Object(b.jsx)("h1",{children:"get it done"}),a?Object(b.jsx)(h,{setRegisterLoginToggle:s}):Object(b.jsx)(p,{setRegisterLoginToggle:s})]})},O=a(58),f=a(23),m=a(57),x=a(138),k=a(142),T=a(143),y=a(137),v=a(139),S=a(140),C=a(141),w=a(153),F=a(151),N=Object(y.a)({root:{boxShadow:"0 3px 5px 2px rgba(255, 105, 135, .3)",color:"#330745",padding:"2%",margin:"2% auto",width:"500px"},checkBox:{fill:"#330745"},label:{width:"500px"}});var P=function(e){var t=e.task,a=e.deleteTask,n=e.updateFormToggle,s=e.setMessage,c=e.displayMessage,r=N();return Object(b.jsx)(x.a,{item:!0,children:Object(b.jsx)(v.a,{className:r.root,children:Object(b.jsxs)(S.a,{children:[Object(b.jsx)(C.a,{control:Object(b.jsx)(w.a,{className:r.checkBox,onChange:function(){return function(e){t.isFinished=!e;var a=Object(f.a)({},t),n={method:"POST",headers:{"Content-Type":"application/json","x-auth-token":localStorage.getItem("token")},body:JSON.stringify(a)};fetch("https://getitdone-backend-app.herokuapp.com/tasks/status",n).then((function(e){return e.json().then((function(e){"success"==e.status?(a.isFinished?s(e.message):s("Back to the drawing board."),c()):console.log(e.message)}))})).catch((function(e){return console.log(e)}))}(t.isFinished)},checked:!!t.isFinished}),label:t.title,labelPlacement:"left",style:t.isFinished?{textDecoration:"line-through",color:"darkgray"}:null,classes:r.label}),Object(b.jsxs)(F.a,{children:[!t.isFinished&&Object(b.jsx)(k.a,{onClick:function(){return n("edit",t)},children:"Edit"}),Object(b.jsx)(T.a,{onClick:function(){return a(t._id)},children:"Delete"})]})]})})})};var B=function(e){var t=e.tasks,a=e.updateFormToggle,s=e.deleteTask,c=e.setMessage,r=e.displayMessage,i=Object(n.useState)(t),l=Object(o.a)(i,2),d=l[0],u=l[1];Object(n.useEffect)((function(){u(t)}),[z]);var j=d.map((function(e,t){return Object(b.jsx)(m.b,{draggableId:e._id,index:t,children:function(t){return Object(b.jsx)("div",Object(f.a)(Object(f.a)(Object(f.a)({ref:t.innerRef},t.draggableProps),t.dragHandleProps),{},{children:Object(b.jsx)(P,{task:e,deleteTask:s,updateFormToggle:a,setMessage:c,displayMessage:r})}),e._id)}},e._id)}));return Object(b.jsx)(x.a,{container:!0,justify:"center",spacing:1,style:{padding:"3%"},children:Object(b.jsx)(m.a,{onDragEnd:function(e){if(e.destination){var t=Array.from(d),a=t.splice(e.source.index,1),n=Object(o.a)(a,1)[0];t.splice(e.destination.index,0,n),u(t)}},children:Object(b.jsx)(m.c,{droppableId:"tasks",children:function(e){return Object(b.jsxs)("div",Object(f.a)(Object(f.a)({},e.droppableProps),{},{ref:e.innerRef,children:[j,e.placeholder]}))}})})})},E=a(154),I=a(145),M=a(146),R=a(147);var D=function(e){var t;return t=e.currentTask?{title:"Edit Task",text:"Change of plans?",label:e.currentTask.title,placeholder:e.currentTask.title,submitBtn:"Save Changes",cancelBtn:"Cancel"}:{title:"Add New Task",text:"What's your plan?",label:"Enter Task",placeholder:"What's your plan?",submitBtn:"Add Task",cancelBtn:"Cancel"},Object(b.jsxs)(E.a,{open:e.setFormToggle,fullWidth:"true",children:[Object(b.jsx)(I.a,{children:t.title}),Object(b.jsx)(M.a,{children:Object(b.jsx)(u.a,{autoFocus:!0,fullwidth:!0,id:"standard-basic",label:t.text,placeholder:t.label,onChange:function(t){"add"==e.formAction?e.setNewTask({title:t.target.value,isFinished:!1}):e.setNewTask(Object(f.a)(Object(f.a)({},e.currentTask),{},{title:t.target.value}))}})}),Object(b.jsxs)(R.a,{children:[Object(b.jsx)(j.a,{type:"submit",variant:"contained",color:"primary",onClick:"add"==e.formAction?e.addTask:e.editTaskTitle,children:t.submitBtn}),Object(b.jsx)(j.a,{variant:"outlined",color:"primary",onClick:function(){return e.setFormToggle(!1)},children:t.cancelBtn})]})]})},L=a(144),J=a(74);var _=function(e){var t=e.message,a=e.showMessage,n=t;return Object(b.jsx)(L.a,{in:a,className:"message",children:Object(b.jsx)(J.a,{children:n})})},q=(a(98),a(148)),A=a(149),W=a(72),H=a.n(W);a(99);var z=function(){var e=Object(n.useState)(!1),t=Object(o.a)(e,2),a=t[0],s=t[1],c=Object(n.useState)([]),r=Object(o.a)(c,2),l=r[0],d=r[1],u=Object(n.useState)({}),j=Object(o.a)(u,2),h=j[0],p=j[1],g=Object(n.useState)(),f=Object(o.a)(g,2),m=f[0],x=f[1],k=Object(n.useState)(null),T=Object(o.a)(k,2),y=T[0],v=T[1],S=Object(n.useState)(!0),C=Object(o.a)(S,2),w=C[0],N=C[1],P=Object(n.useState)(""),E=Object(o.a)(P,2),I=E[0],M=E[1],R=Object(n.useState)(!1),L=Object(o.a)(R,2),J=L[0],W=L[1],z=Object(i.f)(),G=function(e,t){v(e),x(t),s((function(e){return!e}))};Object(n.useEffect)((function(){var e={headers:{"x-auth-token":localStorage.getItem("token")}};fetch("https://getitdone-backend-app.herokuapp.com/tasks/all",e).then((function(e){return e.json().then((function(e){"success"==e.status?(d(e.data),N(!1)):"failed"==e.status&&(N(!1),z.push("/auth"))}))})).catch((function(e){console.log(e),N(!1),M("Sorry, there seems to be something wrong with your request.")}))}),[]);var K=function(){W(!0),setTimeout((function(){W(!1)}),3e3)};return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsxs)(F.a,{className:"main",display:"flex",children:[Object(b.jsxs)("div",{className:"info-wrapper",children:[Object(b.jsx)("h1",{children:"get it done"}),Object(b.jsx)("h3",{children:"What's on for today?"}),Object(b.jsx)("p",{className:"tip",children:"(\ud83d\udca1 Tip: Rearrange your tasks with drag&drop.)"}),Object(b.jsx)(q.a,{color:"primary","aria-label":"add",style:{marginBottom:"3%"},onClick:function(){return G("add")},children:Object(b.jsx)(H.a,{})}),Object(b.jsx)(_,{message:I,showMessage:J})]}),w?Object(b.jsx)(A.a,{color:"secondary"}):Object(b.jsx)("div",{className:"task-wrapper",children:Object(b.jsx)(B,{className:"taskWrapper",tasks:l,deleteTask:function(e){console.log(e);var t="https://getitdone-backend-app.herokuapp.com/tasks/"+e,a={method:"DELETE",headers:{"x-auth-token":localStorage.getItem("token")}};fetch(t,a).then((function(e){return e.json().then((function(e){var t;"success"===e.status?(t=l.filter((function(t){return t._id!==e.data})),d(t),M(e.message),K()):(M(e.message),K())}))})).catch((function(e){return console.log(e)}))},updateFormToggle:G,setMessage:M,displayMessage:K})})]}),a&&Object(b.jsx)(D,{setFormToggle:s,updateFormToggle:G,formAction:y,currentTask:m,addTask:function(){s(!1);var e={method:"POST",headers:{"Content-Type":"application/json","x-auth-token":localStorage.getItem("token")},body:JSON.stringify(h)};fetch("https://getitdone-backend-app.herokuapp.com/tasks/new",e).then((function(e){return e.json().then((function(e){"success"==e.status?(d([].concat(Object(O.a)(l),[e.data])),p({}),M(e.message),K()):(M(e.message),K())}))})).catch((function(e){return M(e)}))},editTaskTitle:function(){s(!1);var e={method:"POST",headers:{"Content-Type":"application/json","x-auth-token":localStorage.getItem("token")},body:JSON.stringify(h)};fetch("https://getitdone-backend-app.herokuapp.com/tasks/title",e).then((function(e){return e.json().then((function(e){if("success"===e.status){var t=[];(t=Object(O.a)(l))[l.findIndex((function(t){return t._id==e.data._id}))]=e.data,d(Object(O.a)(t)),M(e.message),K()}else M(e.message),K()}))})).catch((function(e){return console.log(e)}))},newTask:h,tasks:l,setNewTask:p,setTasks:d})]})};var G=function(){return Object(b.jsxs)(i.c,{children:[Object(b.jsx)(i.a,{path:"/tasks",children:Object(b.jsx)(z,{})}),Object(b.jsx)(i.a,{path:"/auth",children:Object(b.jsx)(g,{})}),Object(b.jsx)(i.a,{path:"/",children:Object(b.jsx)(g,{})})]})},K=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,156)).then((function(t){var a=t.getCLS,n=t.getFID,s=t.getFCP,c=t.getLCP,r=t.getTTFB;a(e),n(e),s(e),c(e),r(e)}))},Q=a(47);r.a.render(Object(b.jsx)(Q.a,{children:Object(b.jsx)(s.a.StrictMode,{children:Object(b.jsx)(G,{})})}),document.getElementById("root")),K()},91:function(e,t,a){},98:function(e,t,a){}},[[104,1,2]]]);
//# sourceMappingURL=main.b4eef4b3.chunk.js.map