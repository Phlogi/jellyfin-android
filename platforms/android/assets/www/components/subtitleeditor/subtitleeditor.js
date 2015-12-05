define(["components/paperdialoghelper","paper-fab","paper-item-body","paper-icon-item"],function(){function e(e,t){Dashboard.showLoadingMsg();var i=$(".popupSubtitleViewer",e).popup("open");$(".subtitleContent",e).html("");var a="Videos/"+c.Id+"/Subtitles/"+t;ApiClient.ajax({type:"GET",url:a}).then(function(t){$(".subtitleContent",e).html(t),Dashboard.hideLoadingMsg(),i.popup("reposition",{})})}function t(e,t){Dashboard.showLoadingMsg();var i=$(".popupSubtitleViewer",e).popup("open");$(".subtitleContent",e).html("");var a="Providers/Subtitles/Subtitles/"+t;ApiClient.get(ApiClient.getUrl(a)).then(function(t){$(".subtitleContent",e).html(t),Dashboard.hideLoadingMsg(),i.popup("reposition",{})})}function i(e,t){var i="Items/"+c.Id+"/RemoteSearch/Subtitles/"+t;ApiClient.ajax({type:"POST",url:ApiClient.getUrl(i)}).then(function(){Dashboard.alert(Globalize.translate("MessageDownloadQueued"))})}function a(e,t){var i=Globalize.translate("MessageAreYouSureDeleteSubtitles");Dashboard.confirm(i,Globalize.translate("HeaderConfirmDeletion"),function(i){if(i){Dashboard.showLoadingMsg();var a=c.Id,n="Videos/"+a+"/Subtitles/"+t;ApiClient.ajax({type:"DELETE",url:ApiClient.getUrl(n)}).then(function(){s(e,a)})}})}function n(t,i){var n=i.MediaStreams||[],o=n.filter(function(e){return"Subtitle"==e.Type}),r="";o.length&&(r+='<h1 style="margin-top:1.5em;">'+Globalize.translate("HeaderCurrentSubtitles")+"</h1>",r+='<div class="paperList">',r+=o.map(function(e){var t="";t+="<paper-icon-item>",t+='<paper-fab mini class="blue" icon="closed-caption" item-icon></paper-fab>';var i=[];return i.push(e.Codec),e.IsDefault&&i.push("Default"),e.IsForced&&i.push("Forced"),t+=3==i.length?"<paper-item-body three-line>":"<paper-item-body two-line>",t+="<div>",t+=e.Language||Globalize.translate("LabelUnknownLanaguage"),t+="</div>",t+="<div secondary>"+i.join(" - ")+"</div>",e.Path&&(t+="<div secondary>"+e.Path+"</div>"),r+="</a>",t+="</paper-item-body>",e.Path&&(t+='<paper-icon-button icon="delete" data-index="'+e.Index+'" title="'+Globalize.translate("Delete")+'" class="btnDelete"></paper-icon-button>'),t+="</paper-icon-item>"}).join(""),r+="</div>");var l=$(".subtitleList",t).html(r).trigger("create");$(".btnViewSubtitles",l).on("click",function(){var i=this.getAttribute("data-index");e(t,i)}),$(".btnDelete",l).on("click",function(){var e=this.getAttribute("data-index");a(t,e)})}function o(e,t){$("#selectLanguage",e).html(t.map(function(e){return'<option value="'+e.ThreeLetterISOLanguageName+'">'+e.DisplayName+"</option>"}));var i=appStorage.getItem("subtitleeditor-language");i?$("#selectLanguage",e).val(i):Dashboard.getCurrentUser().then(function(t){var i=t.Configuration.SubtitleLanguagePreference;i&&$("#selectLanguage",e).val(i)})}function r(e,a){var n="",o="";if(!a.length)return $(".noSearchResults",e).show(),$(".subtitleResults",e).html(""),void Dashboard.hideLoadingMsg();$(".noSearchResults",e).hide();for(var r=0,l=a.length;l>r;r++){var s=a[r],d=s.ProviderName;d!=n&&(r>0&&(o+="</div>"),o+="<h1>"+d+"</h1>",o+='<div class="paperList">',n=d),o+="<paper-icon-item>",o+='<paper-fab mini class="blue" icon="closed-caption" item-icon></paper-fab>',o+=s.Comment?"<paper-item-body three-line>":"<paper-item-body two-line>",o+="<div>"+s.Name+"</div>",o+="<div secondary>"+s.Format+"</div>",s.Comment&&(o+="<div secondary>"+s.Comment+"</div>"),o+="</paper-item-body>",o+='<div style="font-size:86%;opacity:.7;">'+(s.DownloadCount||0)+"</div>",o+='<paper-icon-button icon="cloud-download" data-subid="'+s.Id+'" title="'+Globalize.translate("ButtonDownload")+'" class="btnDownload"></paper-icon-button>',o+="</paper-icon-item>"}a.length&&(o+="</div>");var u=$(".subtitleResults",e).html(o).trigger("create");$(".btnViewSubtitle",u).on("click",function(){var i=this.getAttribute("data-subid");t(e,i)}),$(".btnDownload",u).on("click",function(){var t=this.getAttribute("data-subid");i(e,t)}),Dashboard.hideLoadingMsg()}function l(e,t){appStorage.setItem("subtitleeditor-language",t),Dashboard.showLoadingMsg();var i=ApiClient.getUrl("Items/"+c.Id+"/RemoteSearch/Subtitles/"+t);ApiClient.getJSON(i).then(function(t){r(e,t)})}function s(e,t){function i(t){c=t,n(e,t),Dashboard.hideLoadingMsg()}$(".noSearchResults",e).hide(),"string"==typeof t?ApiClient.getItem(Dashboard.getCurrentUserId(),t).then(i):i(t)}function d(){var e=this,t=$("#selectLanguage",e).val();return l($(e).parents(".editorContent"),t),!1}function u(e){Dashboard.showLoadingMsg();var t=new XMLHttpRequest;t.open("GET","components/subtitleeditor/subtitleeditor.template.html",!0),t.onload=function(){var t=this.response;ApiClient.getItem(Dashboard.getCurrentUserId(),e).then(function(e){var i=PaperDialogHelper.createDialog(),a="";a+='<h2 class="dialogHeader">',a+='<paper-fab icon="arrow-back" mini class="btnCloseDialog"></paper-fab>',a+='<div style="display:inline-block;margin-left:.6em;vertical-align:middle;">'+e.Name+"</div>",a+="</h2>",a+='<div class="editorContent">',a+=Globalize.translateDocument(t),a+="</div>",i.innerHTML=a,document.body.appendChild(i),$(".subtitleSearchForm",i).off("submit",d).on("submit",d),$(i).on("iron-overlay-closed",p),PaperDialogHelper.openWithHash(i,"subtitleeditor");var n=i.querySelector(".editorContent");s(n,e),ApiClient.getCultures().then(function(e){o(n,e)}),$(".btnCloseDialog",i).on("click",function(){PaperDialogHelper.close(i)})})},t.send()}function p(){$(this).remove(),Dashboard.hideLoadingMsg()}var c;return{show:u}});