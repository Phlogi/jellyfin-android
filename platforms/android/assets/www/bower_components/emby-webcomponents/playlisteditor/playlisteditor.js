define(["shell","dialogHelper","loading","layoutManager","connectionManager","embyRouter","globalize","emby-input","paper-icon-button-light","emby-select","material-icons","css!./../formdialog","emby-button"],function(e,t,l,n,i,s,r){function o(e,t){for(;!e.classList||!e.classList.contains(t);)if(e=e.parentNode,!e)return null;return e}function a(e){l.show();var t=o(this,"dialog"),n=t.querySelector("#selectPlaylistToAddTo").value,s=i.getApiClient(g);return n?(S=n,u(s,t,n)):d(s,t),e.preventDefault(),!1}function d(e,n){var i=e.getUrl("Playlists",{Name:n.querySelector("#txtNewPlaylistName").value,Ids:n.querySelector(".fldSelectedItemIds").value||"",userId:e.getCurrentUserId()});e.ajax({type:"POST",url:i,dataType:"json"}).then(function(i){l.hide();var s=i.Id;t.close(n),c(e,s)})}function c(e,t){e.getItem(e.getCurrentUserId(),t).then(function(e){s.showItem(e)})}function u(e,n,i){var s=e.getUrl("Playlists/"+i+"/Items",{Ids:n.querySelector(".fldSelectedItemIds").value||"",userId:e.getCurrentUserId()});e.ajax({type:"POST",url:s}).then(function(){l.hide(),t.close(n),require(["toast"],function(e){e(r.translate("sharedcomponents#MessageItemsAdded"))})})}function y(e){e.dispatchEvent(new CustomEvent("change",{}))}function v(e){var t=e.querySelector("#selectPlaylistToAddTo");l.hide(),e.querySelector(".newPlaylistInfo").classList.add("hide");var n={Recursive:!0,IncludeItemTypes:"Playlist",SortBy:"SortName"},s=i.getApiClient(g);s.getItems(s.getCurrentUserId(),n).then(function(e){var n="";n+='<option value="">'+r.translate("sharedcomponents#OptionNew")+"</option>",n+=e.Items.map(function(e){return'<option value="'+e.Id+'">'+e.Name+"</option>"}),t.innerHTML=n,t.value=S||"",y(t),l.hide()})}function m(){var e="";return e+='<div class="dialogContent smoothScrollY" style="padding-top:2em;">',e+='<div class="dialogContentInner dialog-content-centered">',e+='<form style="margin:auto;">',e+='<div class="fldSelectPlaylist">',e+='<select is="emby-select" id="selectPlaylistToAddTo" label="'+r.translate("sharedcomponents#LabelPlaylist")+'" autofocus></select>',e+="</div>",e+='<div class="newPlaylistInfo">',e+='<div class="inputContainer">',e+='<input is="emby-input" type="text" id="txtNewPlaylistName" required="required" label="'+r.translate("sharedcomponents#LabelName")+'" />',e+="</div>",e+="</div>",e+="<div>",e+='<button is="emby-button" type="submit" class="raised btnSubmit block">'+r.translate("sharedcomponents#ButtonOk")+"</button>",e+="</div>",e+='<input type="hidden" class="fldSelectedItemIds" />',e+="</form>",e+="</div>",e+="</div>"}function f(e,t){if(e.querySelector("#selectPlaylistToAddTo").addEventListener("change",function(){this.value?(e.querySelector(".newPlaylistInfo").classList.add("hide"),e.querySelector("#txtNewPlaylistName").removeAttribute("required")):(e.querySelector(".newPlaylistInfo").classList.remove("hide"),e.querySelector("#txtNewPlaylistName").setAttribute("required","required"))}),e.querySelector("form").addEventListener("submit",a),e.querySelector(".fldSelectedItemIds",e).value=t.join(","),t.length)e.querySelector(".fldSelectPlaylist").classList.remove("hide"),v(e);else{e.querySelector(".fldSelectPlaylist").classList.add("hide");var l=e.querySelector("#selectPlaylistToAddTo");l.innerHTML="",l.value="",y(l)}}function p(e,t,l){require(["scrollHelper"],function(n){var i=l?"on":"off";n.centerFocus[i](e,t)})}function h(){var e=this;e.show=function(e){var l=e.items||{};g=e.serverId;var i={removeOnClose:!0,scrollY:!1};i.size=n.tv?"fullscreen":"small";var s=t.createDialog(i);s.classList.add("formDialog");var o="",a=r.translate("sharedcomponents#HeaderAddToPlaylist");return o+='<div class="dialogHeader">',o+='<button is="paper-icon-button-light" class="btnCancel autoSize" tabindex="-1"><i class="md-icon">&#xE5C4;</i></button>',o+='<div class="dialogHeaderTitle">',o+=a,o+="</div>",o+="</div>",o+=m(),s.innerHTML=o,document.body.appendChild(s),f(s,l),s.querySelector(".btnCancel").addEventListener("click",function(){t.close(s)}),n.tv&&p(s.querySelector(".dialogContent"),!1,!0),new Promise(function(e){n.tv&&p(s.querySelector(".dialogContent"),!1,!1),s.addEventListener("close",e),t.open(s)})}}var g,S="";return h});