(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{104:function(e,t){},144:function(e,t,a){"use strict";a.r(t);var s,n=a(0),r=a.n(n),c=a(63),l=a.n(c),i=a(65),o=a(7),m=(a(74),a(5)),u=a(64),d=a.n(u),g=0,f=1,h=2,p=a(38),v=a(68),b=a(18),E=a(19),x=a(9),N=a(23),k=a(22),S=a(20),T=a.n(S),C=function(e){var t=e.name,a=e.imgSrc;return r.a.createElement("div",{className:"d-flex align-items-center"},r.a.createElement("img",{src:a||T.a,className:"avatarsUserIdent rounded-circle",alt:"User Avatar"}),r.a.createElement("div",{className:"ml-3"},t))},j=function(e){var t=e.user,a=e.LikeUserToggle,s=e.ToPageChat,n=t.likeThem?r.a.createElement("i",{className:"fas fa-heart fa-lg"}):r.a.createElement("i",{className:"far fa-heart fa-lg"}),c=t.likeThem&&t.likesMe,l=c?r.a.createElement("i",{className:"fas fa-comment fa-lg fa-fw"}):r.a.createElement("i",{className:"fas fa-comment-slash fa-lg fa-fw"}),i=t.unreadMsg?r.a.createElement("span",{className:"notificationBadge"}):"";return r.a.createElement("div",{className:"d-flex justify-content-between align-items-center"},r.a.createElement(C,{name:t.name,imgSrc:t.imgSrc}),r.a.createElement("div",{className:"d-flex align-items-center"},r.a.createElement("button",{className:"btn",onClick:function(){a(t.id,!t.likeThem)}},n),r.a.createElement("button",{className:"btn position-relative",onClick:function(){s(t)},disabled:!c},l,i)))},w=a(21),O=a.n(w),y=function(e){var t=e.users,a=e.LikeUserToggle,s=e.ToPageChat;return r.a.createElement("div",{className:"h-100 w-100 d-flex flex-column"},r.a.createElement("h1",{className:"text-center text-white"},"Users"),r.a.createElement("ul",{className:"list-group bg-secondary p-2 flex-grow-1 position-relative"},r.a.createElement(O.a,{className:"FullSpreadAbsElem",scrollViewClassName:"pad10"},t.map((function(e,t){return r.a.createElement("li",{className:"list-group-item m-0Auto mw1000 innerScrollItem",key:t},r.a.createElement(j,{user:e,LikeUserToggle:a,ToPageChat:s}))})))))},U=function(e){var t=e.ToPageUsers,a=e.user_Chat,s=e.user_Chat_Active;return r.a.createElement("div",{className:"text-white d-flex align-items-center pt-3 pb-3"},r.a.createElement("button",{onClick:t,className:"btn ml-2 text-white"},r.a.createElement("i",{className:"fas fa-arrow-left"})),r.a.createElement("div",{className:"ml-2 fontSize150"},r.a.createElement(C,{name:a.name+(s?"":" [account deleted]"),imgSrc:a.imgSrc})))},_=a(35),I=a.n(_),A=function(e){var t=e.message,a=t.msgText,s=t.fromSender;return console.log("Message created. From sender: ".concat(s,', msg text: "').concat(a,'"')),s?r.a.createElement("div",{className:"d-flex justify-content-end mt-3"},r.a.createElement("div",{className:"messageBox bgLightBlue fromSelf"},r.a.createElement("div",{className:"messageText text-white"},I.a.emojify(a)))):r.a.createElement("div",{className:"d-flex justify-content-start mt-3"},r.a.createElement("div",{className:"messageBox bg-white fromOther"},r.a.createElement("div",{className:"messageText"},I.a.emojify(a))))},M=function(e){Object(N.a)(a,e);var t=Object(k.a)(a);function a(){var e;Object(b.a)(this,a);for(var s=arguments.length,n=new Array(s),r=0;r<s;r++)n[r]=arguments[r];return(e=t.call.apply(t,[this].concat(n))).state={msgText:""},e}return Object(E.a)(a,[{key:"SendMessage",value:function(e){e.preventDefault(),console.log('SendMessage called in Chat.js, msgText: "'.concat(this.state.msgText,'" to user: "').concat(this.props.user_Chat.id,'"')),this.state.msgText&&(this.props.socket.emit("SendMessage",{msgText:this.state.msgText,chatPtnrID:this.props.user_Chat.id}),this.props.user_Chat_Active||console.warn("Message not sent, that user has been removed from the server."),this.props.OnSendMessage(this.props.user_Chat.id,this.state.msgText),this.setState({msgText:""}))}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"h-100 d-flex flex-column justify-content-between"},r.a.createElement("div",null,r.a.createElement("div",{className:"mw1000 m-0Auto"},r.a.createElement(U,{ToPageUsers:this.props.ToPageUsers,user_Chat:this.props.user_Chat,user_Chat_Active:this.props.user_Chat_Active}))),r.a.createElement("div",{className:"flex-grow-1 bg-secondary"},r.a.createElement("div",{className:"mw1000 m-0Auto h-100 position-relative"},r.a.createElement(O.a,{className:"FullSpreadAbsElem",scrollViewClassName:"pad10"},this.props.user_Chat.messages.map((function(e,t){return r.a.createElement("div",{className:"innerScrollItem",key:t},r.a.createElement(A,{message:e}))}))))),r.a.createElement("div",{className:"bg-secondary"},r.a.createElement("form",{className:"mw1000 m-0Auto d-flex align-items-stretch"},r.a.createElement("input",{className:"form-control form-control-lg flex-grow-1 noBorder",type:"text",placeholder:"message",value:this.props.user_Chat_Active?this.state.msgText:"",onChange:function(t){return e.setState({msgText:t.target.value})},onKeyPress:function(t){return"Enter"===t.key?e.SendMessage(t):null},disabled:!this.props.user_Chat_Active}),r.a.createElement("button",{className:"btn noBorder bg-white",onClick:function(t){return e.SendMessage(t)},disabled:!this.props.user_Chat_Active},r.a.createElement("i",{class:"fas fa-paper-plane fa-lg"})))))}}]),a}(n.Component),P=function(){return r.a.createElement("div",null)},L=function(e){Object(N.a)(a,e);var t=Object(k.a)(a);function a(e){var s;return Object(b.a)(this,a),(s=t.call(this,e)).state={page:g,users:[],user_Chat:null},e.socket.on("RecNewUser",(function(e){console.log('Adding user: "'.concat(e.id,'"')),s.setState({users:[].concat(Object(v.a)(s.state.users),[e])})})),e.socket.on("RemoveUser",(function(e){console.log('Removing user: "'.concat(e,'"'));var t=s.state.users.findIndex((function(t){return t.id===e}));s.state.users.splice(t,1),s.setState({users:s.state.users})})),e.socket.on("RecLikeToggle",(function(e){console.log('Liked by user: "'.concat(e.socketID,'"'));var t=s.state.users.findIndex((function(t){return t.id===e.socketID}));s.state.users[t].likesMe=e.likesMe,s.setState({users:s.state.users})})),e.socket.emit("GetUsers",{},(function(e){for(var t=0;t<e.length;t++)console.log('Adding users: "'.concat(e[t].id,'"'));s.setState({users:e})})),e.socket.on("RecMessage",(function(e){console.log('Received message: "'.concat(e.msgText,'" from user: "').concat(e.senderID,'"'));var t=s.state.users.findIndex((function(t){return t.id===e.senderID}));s.state.users[t].messages.push({msgText:e.msgText,fromSender:!1});var a=!1;s.state.user_Chat&&s.state.user_Chat.id===e.senderID&&(a=!0),a||(s.state.users[t].unreadMsg=!0),s.setState({users:s.state.users})})),s.ToPageUsers=s.ToPageUsers.bind(Object(x.a)(s)),s.LikeUserToggle=s.LikeUserToggle.bind(Object(x.a)(s)),s.ToPageChat=s.ToPageChat.bind(Object(x.a)(s)),s.OnSendMessage=s.OnSendMessage.bind(Object(x.a)(s)),s}return Object(E.a)(a,[{key:"ToPageUsers",value:function(){this.setState({user_Chat:null,page:g})}},{key:"LikeUserToggle",value:function(e,t){this.props.socket.emit("LikeUserToggle",{userID:e,isLiked:t}),this.setState((function(a){return{users:a.users.map((function(a){return a.id===e?Object(p.a)({},a,{likeThem:t}):a}))}}))}},{key:"ToPageChat",value:function(e){this.setState((function(t){return{users:t.users.map((function(t){return t.id===e.id?Object(p.a)({},t,{unreadMsg:!1}):t})),user_Chat:e,page:f}}))}},{key:"OnSendMessage",value:function(e,t){console.log('Sent message: "'.concat(t,'" to user: "').concat(e,'"'));var a=this.state.users.findIndex((function(t){return t.id===e}));this.state.users[a].messages.push({msgText:t,fromSender:!0}),this.setState({users:this.state.users})}},{key:"render",value:function(){var e=this;if(this.state.page===g)return r.a.createElement(y,{users:this.state.users,LikeUserToggle:this.LikeUserToggle,ToPageChat:this.ToPageChat});if(this.state.page===f){var t=!0;return this.state.user_Chat&&-1===this.state.users.findIndex((function(t){return t.id===e.state.user_Chat.id}))&&(t=!1),r.a.createElement(M,{socket:this.props.socket,user_Chat:this.state.user_Chat,user_Chat_Active:t,OnSendMessage:this.OnSendMessage,ToPageUsers:this.ToPageUsers})}return this.state.page===h?r.a.createElement(P,null):void 0}}]),a}(n.Component),R=function(e){var t=e.percent,a={width:t+"%"};return r.a.createElement("div",{id:"ImageUploadBar",className:"progress position-absolute h-100 w-100"},r.a.createElement("div",{role:"progressbar",className:"progress-bar progress-bar-striped bg-success progress-bar-animated transitionNone",style:a,"aria-valuenow":t,"aria-valuemin":"0","aria-valuemax":"100"}))},D=window.URL||window.webkitURL,B=["jpg","jpeg","png","gif"],F=function(e){var t=e.GetImgDetails,a=e.disabled,s=e.loadFile,c=e.percent,l=Object(n.useState)(T.a),i=Object(m.a)(l,2),o=i[0],u=i[1],d=s?r.a.createElement(R,{percent:c}):"";return r.a.createElement("div",{className:"mt-2"},r.a.createElement("img",{src:o,id:"AvatarSelected",className:"rounded-circle mt-5 mb-5",alt:"User avatar"}),r.a.createElement("input",{id:"HiddenFileUploader",placeholder:"File",className:"d-none",type:"file",accept:"image/*",capture:"user",onChange:function(e){if(1===e.target.files.length){var a=e.target.value,s=a.slice(2+(a.lastIndexOf(".")-1>>>0));if(-1!==B.indexOf(s)){var n=e.target.files[0],r=new Image;r.onload=function(){console.log("img width: "+r.width+", height: "+r.height)},r.src=D.createObjectURL(n),u(r.src),t(s,n,o)}else alert("Image must have extension: jpg, jpeg, png, or gif")}else alert("Can only use 1 photo at a time.")},disabled:a}),r.a.createElement("button",{className:"btn btn-secondary btn-lg btn-block mt-2 position-relative",onClick:function(){document.getElementById("HiddenFileUploader").click()},disabled:a},r.a.createElement("span",null,"Take/Upload picture"),d))};s=d()();var z=function(){var e=r.a.createRef(),t=Object(n.useState)(""),a=Object(m.a)(t,2),c=a[0],l=a[1],i=Object(n.useState)(null),o=Object(m.a)(i,2),u=o[0],d=o[1],g=Object(n.useState)(""),f=Object(m.a)(g,2),h=f[0],p=f[1],v=Object(n.useState)(0),b=Object(m.a)(v,2),E=b[0],x=b[1],N=Object(n.useState)(!1),k=Object(m.a)(N,2),S=k[0],T=k[1],C=Object(n.useState)(!1),j=Object(m.a)(C,2),w=j[0],O=j[1],y=S&&null!==u;return w?r.a.createElement(L,{socket:s}):r.a.createElement("div",{className:"position-relative h-100"},r.a.createElement("div",{className:"container-fluid h-100 d-flex flex-column justify-content-center align-items-center"},r.a.createElement("div",null,r.a.createElement("h1",{className:"text-center text-white"},"Welcome"),r.a.createElement("hr",{className:"bg-light"}),r.a.createElement("input",{type:"text",className:"form-control form-control-lg",placeholder:"Name",ref:e,disabled:S})),r.a.createElement("div",null,r.a.createElement(F,{GetImgDetails:function(e,t,a){console.log("Ext: ".concat(e,", src: ").concat(a,", file:"),t),l(e),d(t),p(a)},disabled:S,loadFile:y,percent:E}),r.a.createElement("button",{className:"btn btn-primary btn-lg btn-block mt-2",onClick:function(t){t.preventDefault();var a=e.current.value;if(""!==a)if(T(!0),console.log("Submit clicked - Name: ".concat(a,", Ext: ").concat(c,", src: ").concat(h,", file:"),u),null===u)s.emit("AddUser",{name:a,ext:c},(function(){O(!0)}));else{s.on("ImageReqSlice",(function(e){var t=1e5*e.currentSlice,a=u.slice(t,t+Math.min(1e5,u.size-t)),s=t/u.size*100;x(s),r.readAsArrayBuffer(a)})),s.on("ImageUploadError",(function(e){console.log("Could not upload image"),d(null),x(0)})),s.on("ImageUploadEnd",(function(e){r.onload=function(e){console.log("Image upload successful"),d(null),x(100),s.emit("AddUser",{name:a,ext:c},(function(){O(!0)}))},r.readAsDataURL(u)}));var n=u.slice(0,1e5),r=new FileReader;r.onload=function(e){s.emit("ImageUploadSlice",{ext:c,name:a,type:u.type,size:u.size,data:e.target.result})},r.readAsArrayBuffer(n)}else alert("Name required")},disabled:S},"Sign In"))))},G=function(){return r.a.createElement(i.a,null,r.a.createElement(o.a,{path:"/*",exact:!0,component:z}))};l.a.render(r.a.createElement(G,null),document.querySelector("#root"))},20:function(e,t,a){e.exports=a.p+"static/media/SpeechlessGuy.8d8d757b.png"},69:function(e,t,a){e.exports=a(144)},74:function(e,t,a){}},[[69,1,2]]]);
//# sourceMappingURL=main.548d44a0.chunk.js.map