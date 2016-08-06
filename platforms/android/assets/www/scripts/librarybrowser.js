define(["viewManager","appSettings","appStorage","apphost","datetime","itemHelper","mediaInfo","scroller","indicators","dom","imageLoader","scrollStyles"],function(e,t,a,r,i,n,s,l,o,d){function c(e){var t=browserInfo.mobile?"3.5%":"0.5%",a=[{opacity:"0",transform:"translate3d("+t+", 0, 0)",offset:0},{opacity:"1",transform:"none",offset:1}];e.animate(a,{duration:160,iterations:1,easing:"ease-out"})}function u(e){var t=e.querySelector(".pageTabButtonSelectionBar");if(t){var a=[{transform:"translate3d(-100%, 0, 0)",offset:0},{transform:"none",offset:1}];t.animate&&t.animate(a,{duration:120,iterations:1,easing:"ease-out"})}}var m=function(t,r,i){var s="pagesize_v4",m={getDefaultPageSize:function(){return 100},getSavedQueryKey:function(e){return t.location.href.split("#")[0]+(e||"")},loadSavedQueryValues:function(e,t){var r=a.getItem(e+"_"+Dashboard.getCurrentUserId());return r?(r=JSON.parse(r),Object.assign(t,r)):t},saveQueryValues:function(e,t){var r={};t.SortBy&&(r.SortBy=t.SortBy),t.SortOrder&&(r.SortOrder=t.SortOrder);try{a.setItem(e+"_"+Dashboard.getCurrentUserId(),JSON.stringify(r))}catch(i){}},saveViewSetting:function(e,t){try{a.setItem(e+"_"+Dashboard.getCurrentUserId()+"_view",t)}catch(r){}},getSavedView:function(e){var t=a.getItem(e+"_"+Dashboard.getCurrentUserId()+"_view");return t},getSavedViewSetting:function(e){return new Promise(function(t){var a=LibraryBrowser.getSavedView(e);t(a)})},allowSwipe:function(e){function t(e){return d.parentWithTag(e,"input")?!1:e.classList?!e.classList.contains("hiddenScrollX")&&!e.classList.contains("smoothScrollX")&&!e.classList.contains("libraryViewNav"):!0}for(var a=e;null!=a;){if(!t(a))return!1;a=a.parentNode}return!0},selectedTab:function(e,t){if(null==t)return e.selectedTabIndex||0;var a=LibraryBrowser.selectedTab(e);if(e.selectedTabIndex=t,a==t)e.dispatchEvent(new CustomEvent("beforetabchange",{detail:{selectedTabIndex:t}})),e.dispatchEvent(new CustomEvent("tabchange",{detail:{selectedTabIndex:t}}));else{var r=e.querySelectorAll(".pageTabButton");r[t].click()}},configureSwipeTabs:function(e,t){var a=e.querySelectorAll(".pageTabContent").length;require(["hammer"],function(r){var i=new r(e);i.get("swipe").set({direction:r.DIRECTION_HORIZONTAL}),i.on("swipeleft",function(e){if(LibraryBrowser.allowSwipe(e.target)){var r=parseInt(LibraryBrowser.selectedTab(t)||"0");a-1>r&&LibraryBrowser.selectedTab(t,r+1)}}),i.on("swiperight",function(e){if(LibraryBrowser.allowSwipe(e.target)){var a=parseInt(LibraryBrowser.selectedTab(t)||"0");a>0&&LibraryBrowser.selectedTab(t,a-1)}})})},configurePaperLibraryTabs:function(e,t,a,i){if(browserInfo.safari||LibraryBrowser.configureSwipeTabs(e,t),!browserInfo.safari||!AppInfo.isNativeApp)for(var n=t.querySelectorAll(".pageTabButton"),s=0,o=n.length;o>s;s++){var m=r.createElement("div");m.classList.add("pageTabButtonSelectionBar"),n[s].appendChild(m)}t.addEventListener("click",function(e){var r=t.querySelector(".is-active"),n=d.parentWithClass(e.target,"pageTabButton");if(n&&n!=r){r&&(r.classList.remove("is-active"),a[parseInt(r.getAttribute("data-index"))].classList.remove("is-active")),n.classList.add("is-active"),u(n);var s=parseInt(n.getAttribute("data-index")),l=a[s];t.dispatchEvent(new CustomEvent("beforetabchange",{detail:{selectedTabIndex:s}})),setTimeout(function(){i&&-1!=i.indexOf(s)&&l.animate&&c(l),t.selectedTabIndex=s,t.dispatchEvent(new CustomEvent("tabchange",{detail:{selectedTabIndex:s}})),l.classList.add("is-active")},120),t.scroller&&t.scroller.toCenter(n,!1)}}),e.addEventListener("viewbeforeshow",LibraryBrowser.onTabbedpagebeforeshow);var g=t.querySelector(".contentScrollSlider");g?(t.scroller=new l(t,{horizontal:1,itemNav:0,mouseDragging:1,touchDragging:1,slidee:t.querySelector(".contentScrollSlider"),smart:!0,releaseSwing:!0,scrollBy:200,speed:120,elasticBounds:1,dragHandle:1,dynamicHandle:1,clickBar:1,hiddenScroll:!0,requireAnimation:!0}),t.scroller.init()):t.classList.add("hiddenScrollX")},onTabbedpagebeforeshow:function(e){var t=e.target,a=0,r=!1;t.getAttribute("data-firstload")||(a=300,r=!0,t.setAttribute("data-firstload","1")),a?setTimeout(function(){LibraryBrowser.onTabbedpagebeforeshowInternal(t,e,r)},a):LibraryBrowser.onTabbedpagebeforeshowInternal(t,e,r)},onTabbedpagebeforeshowInternal:function(e,t,a){var r=e.querySelector(".libraryViewNav");if(a){var i=null!=e.firstTabIndex?e.firstTabIndex:parseInt(getParameterByName("tab")||"0");LibraryBrowser.selectedTab(r,i)}else{if(!t.detail.isRestored)return void LibraryBrowser.selectedTab(r,0);r.dispatchEvent(new CustomEvent("beforetabchange",{detail:{selectedTabIndex:LibraryBrowser.selectedTab(r)}})),r.dispatchEvent(new CustomEvent("tabchange",{detail:{selectedTabIndex:LibraryBrowser.selectedTab(r)}}))}},showTab:function(a,i){var n=function(){r.removeEventListener("pagebeforeshow",n),-1!=t.location.href.toLowerCase().indexOf(a.toLowerCase())&&(this.firstTabIndex=i)};-1!=t.location.href.toLowerCase().indexOf(a.toLowerCase())?n.call(e.currentView()):(pageClassOn("pagebeforeshow","page",n),Dashboard.navigate(a))},getArtistLinksHtml:function(e,t){for(var a=[],r=0,i=e.length;i>r;r++){var n=e[r],s=t?' class="'+t+'"':"";a.push("<a"+s+' href="itemdetails.html?id='+n.Id+'">'+n.Name+"</a>")}return a=a.join(" / ")},playInExternalPlayer:function(e){Dashboard.loadExternalPlayer().then(function(){ExternalPlayer.showMenu(e)})},getHref:function(e,t,a){var r=LibraryBrowser.getHrefInternal(e,t);return"tv"==t&&(a||(a=LibraryMenu.getTopParentId()),a&&(r+=-1==r.indexOf("?")?"?topParentId=":"&topParentId=",r+=a)),r},getHrefInternal:function(e,t){if(!e)throw new Error("item cannot be null");if(e.url)return e.url;var a=e.Id||e.ItemId;if("livetv"==e.CollectionType)return"livetv.html";if("channels"==e.CollectionType)return"channels.html";if("folders"!=t){if("movies"==e.CollectionType)return"movies.html?topParentId="+e.Id;if("boxsets"==e.CollectionType)return"itemlist.html?topParentId="+e.Id+"&parentId="+e.Id;if("tvshows"==e.CollectionType)return"tv.html?topParentId="+e.Id;if("music"==e.CollectionType)return"music.html?topParentId="+e.Id;if("games"==e.CollectionType)return a?"itemlist.html?parentId="+a:"#";if("playlists"==e.CollectionType)return"playlists.html?topParentId="+e.Id;if("photos"==e.CollectionType)return"photos.html?topParentId="+e.Id}else if(e.IsFolder)return a?"itemlist.html?parentId="+a:"#";if("CollectionFolder"==e.Type)return"itemlist.html?topParentId="+e.Id+"&parentId="+e.Id;if("PhotoAlbum"==e.Type)return"itemlist.html?context=photos&parentId="+a;if("Playlist"==e.Type)return"itemdetails.html?id="+a;if("TvChannel"==e.Type)return"itemdetails.html?id="+a;if("Channel"==e.Type)return"channelitems.html?id="+a;if(e.IsFolder&&"Channel"==e.SourceType||"ChannelFolderItem"==e.Type)return"channelitems.html?id="+e.ChannelId+"&folderId="+e.Id;if("Program"==e.Type)return"itemdetails.html?id="+a;if("BoxSet"==e.Type)return"itemdetails.html?id="+a;if("MusicAlbum"==e.Type)return"itemdetails.html?id="+a;if("GameSystem"==e.Type)return"itemdetails.html?id="+a;if("Genre"==e.Type)return"itemdetails.html?id="+a;if("MusicGenre"==e.Type)return"itemdetails.html?id="+a;if("GameGenre"==e.Type)return"itemdetails.html?id="+a;if("Studio"==e.Type)return"itemdetails.html?id="+a;if("Person"==e.Type)return"itemdetails.html?id="+a;if("Recording"==e.Type)return"itemdetails.html?id="+a;if("MusicArtist"==e.Type)return"itemdetails.html?id="+a;var r=t?"&context="+t:"";return"Series"==e.Type||"Season"==e.Type||"Episode"==e.Type?"itemdetails.html?id="+a+r:e.IsFolder?a?"itemlist.html?parentId="+a:"#":"itemdetails.html?id="+a},getListItemInfo:function(e){for(var t=e;!t.getAttribute("data-id");)t=t.parentNode;var a=t.getAttribute("data-id"),r=t.getAttribute("data-index"),i=t.getAttribute("data-mediatype");return{id:a,index:r,mediaType:i,context:t.getAttribute("data-context")}},getFutureDateText:function(e){var t=[];t[0]=Globalize.translate("OptionSunday"),t[1]=Globalize.translate("OptionMonday"),t[2]=Globalize.translate("OptionTuesday"),t[3]=Globalize.translate("OptionWednesday"),t[4]=Globalize.translate("OptionThursday"),t[5]=Globalize.translate("OptionFriday"),t[6]=Globalize.translate("OptionSaturday");var a=t[e.getDay()];return e=e.toLocaleDateString(),-1==e.toLowerCase().indexOf(a.toLowerCase())?a+" "+e:e},renderName:function(e,t,a,r){var i=n.getDisplayName(e,{includeParentInfo:!1});Dashboard.setPageTitle(i),t.innerHTML=a?'<a class="detailPageParentLink" href="'+LibraryBrowser.getHref(e,r)+'">'+i+"</a>":i},renderParentName:function(e,t,a){var r=[],i=a?"&context="+a:"";e.AlbumArtists?r.push(LibraryBrowser.getArtistLinksHtml(e.AlbumArtists,"detailPageParentLink")):e.ArtistItems&&e.ArtistItems.length&&"MusicVideo"==e.Type?r.push(LibraryBrowser.getArtistLinksHtml(e.ArtistItems,"detailPageParentLink")):e.SeriesName&&"Episode"==e.Type&&r.push('<a class="detailPageParentLink" href="itemdetails.html?id='+e.SeriesId+i+'">'+e.SeriesName+"</a>"),e.SeriesName&&"Season"==e.Type?r.push('<a class="detailPageParentLink" href="itemdetails.html?id='+e.SeriesId+i+'">'+e.SeriesName+"</a>"):null!=e.ParentIndexNumber&&"Episode"==e.Type?r.push('<a class="detailPageParentLink" href="itemdetails.html?id='+e.SeasonId+i+'">'+e.SeasonName+"</a>"):e.Album&&"Audio"==e.Type&&(e.AlbumId||e.ParentId)?r.push('<a class="detailPageParentLink" href="itemdetails.html?id='+(e.AlbumId||e.ParentId)+i+'">'+e.Album+"</a>"):e.Album&&"MusicVideo"==e.Type&&e.AlbumId?r.push('<a class="detailPageParentLink" href="itemdetails.html?id='+e.AlbumId+i+'">'+e.Album+"</a>"):e.Album?r.push(e.Album):"Program"==e.Type&&e.EpisodeTitle&&r.push(e.Name),r.length?(t.classList.remove("hide"),t.innerHTML=r.join(" - ")):t.classList.add("hide")},showLayoutMenu:function(e,a,r){var i=!0;r||(i=!1,r=e.getAttribute("data-layouts"),r=r?r.split(","):["List","Poster","PosterCard","Thumb","ThumbCard"]);var n=r.map(function(e){return{name:Globalize.translate("Option"+e),id:e,selected:a==e}});require(["actionsheet"],function(a){a.show({items:n,positionTo:e,callback:function(a){e.dispatchEvent(new CustomEvent("layoutchange",{detail:{viewStyle:a},bubbles:!0,cancelable:!1})),i||t.$&&$(e).trigger("layoutchange",[a])}})})},getQueryPagingHtml:function(e){var t=e.startIndex,r=e.limit,i=e.totalRecordCount;if(r&&e.updatePageSizeSetting!==!1)try{a.setItem(e.pageSizeKey||s,r)}catch(n){}var l="",o=Math.min(t+r,i),d=i>20||i>r;if(l+='<div class="listPaging">',d){l+='<span style="vertical-align:middle;">';var c=i?t+1:0;l+=c+"-"+o+" of "+i,l+="</span>"}if((d||e.viewButton||e.filterButton||e.sortButton||e.addLayoutButton)&&(l+='<div style="display:inline-block;">',d&&(l+='<button is="paper-icon-button-light" class="btnPreviousPage autoSize" '+(t?"":"disabled")+'><i class="md-icon">&#xE5C4;</i></button>',l+='<button is="paper-icon-button-light" class="btnNextPage autoSize" '+(t+r>=i?"disabled":"")+'><i class="md-icon">arrow_forward</i></button>'),e.addLayoutButton&&(l+='<button is="paper-icon-button-light" title="'+Globalize.translate("ButtonSelectView")+'" class="btnChangeLayout autoSize" data-layouts="'+(e.layouts||"")+'" onclick="LibraryBrowser.showLayoutMenu(this, \''+(e.currentLayout||"")+'\');"><i class="md-icon">view_comfy</i></button>'),e.sortButton&&(l+='<button is="paper-icon-button-light" class="btnSort autoSize" title="'+Globalize.translate("ButtonSort")+'"><i class="md-icon">sort_by_alpha</i></button>'),e.filterButton&&(l+='<button is="paper-icon-button-light" class="btnFilter autoSize" title="'+Globalize.translate("ButtonFilter")+'"><i class="md-icon">filter_list</i></button>'),l+="</div>",d&&e.showLimit)){var u="selectPageSize",m=e.pageSizes||[20,50,100,200,300,400,500],g=m.map(function(e){return r==e?'<option value="'+e+'" selected="selected">'+e+"</option>":'<option value="'+e+'">'+e+"</option>"}).join("");l+='<div class="pageSizeContainer"><label class="labelPageSize" for="'+u+'">'+Globalize.translate("LabelLimit")+'</label><select style="width:auto;" class="selectPageSize" id="'+u+'" data-inline="true" data-mini="true">'+g+"</select></div>"}return l+="</div>"},showSortMenu:function(e){require(["dialogHelper","emby-radio"],function(t){function a(){var t=this.value;if(this.checked){var a=e.query.SortBy!=t;e.query.SortBy=t.replace("_",","),e.query.StartIndex=0,e.callback&&a&&e.callback()}}function i(){var t=this.value;if(this.checked){var a=e.query.SortOrder!=t;e.query.SortOrder=t,e.query.StartIndex=0,e.callback&&a&&e.callback()}}var n=t.createDialog({removeOnClose:!0,modal:!1,entryAnimationDuration:160,exitAnimationDuration:200});n.classList.add("ui-body-a"),n.classList.add("background-theme-a"),n.classList.add("formDialog");var s="";s+='<div style="margin:0;padding:1.25em 1.5em 1.5em;">',s+='<h2 style="margin:0 0 .5em;">',s+=Globalize.translate("HeaderSortBy"),s+="</h2>";var l,o,d;for(s+="<div>",l=0,o=e.items.length;o>l;l++){var c=e.items[l],u=c.id.replace(",","_");d=(e.query.SortBy||"").replace(",","_")==u?" checked":"",s+='<label class="radio-label-block"><input type="radio" is="emby-radio" name="SortBy" data-id="'+c.id+'" value="'+u+'" class="menuSortBy" '+d+" /><span>"+c.name+"</span></label>"}s+="</div>",s+='<h2 style="margin: 1em 0 .5em;">',s+=Globalize.translate("HeaderSortOrder"),s+="</h2>",s+="<div>",d="Ascending"==e.query.SortOrder?" checked":"",s+='<label class="radio-label-block"><input type="radio" is="emby-radio" name="SortOrder" value="Ascending" class="menuSortOrder" '+d+" /><span>"+Globalize.translate("OptionAscending")+"</span></label>",d="Descending"==e.query.SortOrder?" checked":"",s+='<label class="radio-label-block"><input type="radio" is="emby-radio" name="SortOrder" value="Descending" class="menuSortOrder" '+d+" /><span>"+Globalize.translate("OptionDescending")+"</span></label>",s+="</div>",s+="</div>",n.innerHTML=s,r.body.appendChild(n);var m=browserInfo.animate?0:100;setTimeout(function(){t.open(n)},m);var g=n.querySelectorAll(".menuSortBy");for(l=0,o=g.length;o>l;l++)g[l].addEventListener("change",a);var p=n.querySelectorAll(".menuSortOrder");for(l=0,o=p.length;o>l;l++)p[l].addEventListener("change",i)})},renderDetailImage:function(e,t,a,r){var i=t.ImageTags||{};t.PrimaryImageTag&&(i.Primary=t.PrimaryImageTag);var n,s="",l="portrait",d=360,c=!1;r&&i.Thumb?(n=ApiClient.getScaledImageUrl(t.Id,{type:"Thumb",maxHeight:d,tag:t.ImageTags.Thumb}),l="thumb"):i.Primary?(n=ApiClient.getScaledImageUrl(t.Id,{type:"Primary",maxHeight:d,tag:t.ImageTags.Primary}),c=!0):t.BackdropImageTags&&t.BackdropImageTags.length?(n=ApiClient.getScaledImageUrl(t.Id,{type:"Backdrop",maxHeight:d,tag:t.BackdropImageTags[0]}),l="thumb"):i.Thumb?(n=ApiClient.getScaledImageUrl(t.Id,{type:"Thumb",maxHeight:d,tag:t.ImageTags.Thumb}),l="thumb"):i.Disc?(n=ApiClient.getScaledImageUrl(t.Id,{type:"Disc",maxHeight:d,tag:t.ImageTags.Disc}),l="square"):t.AlbumId&&t.AlbumPrimaryImageTag?(n=ApiClient.getScaledImageUrl(t.AlbumId,{type:"Primary",maxHeight:d,tag:t.AlbumPrimaryImageTag}),l="square"):"Audio"==t.MediaType||"MusicAlbum"==t.Type||"MusicGenre"==t.Type?(n="css/images/items/detail/audio.png",l="square"):"Game"==t.MediaType||"GameGenre"==t.Type?(n="css/images/items/detail/game.png",l="square"):"Person"==t.Type?(n="css/images/items/detail/person.png",l="square"):"Genre"==t.Type||"Studio"==t.Type?(n="css/images/items/detail/video.png",l="square"):"TvChannel"==t.Type?(n="css/images/items/detail/tv.png",l="square"):(n="css/images/items/detail/video.png",l="square"),s+='<div style="position:relative;">',a&&(s+="<a class='itemDetailGalleryLink' href='#'>"),c&&t.PrimaryImageAspectRatio&&(t.PrimaryImageAspectRatio>=1.48?l="thumb":t.PrimaryImageAspectRatio>=.85&&t.PrimaryImageAspectRatio<=1.34&&(l="square")),s+="<img class='itemDetailImage lazy' src='css/images/empty.png' />",a&&(s+="</a>");var u=t.IsFolder||!t.UserData?"":o.getProgressBarHtml(t);s+='<div class="detailImageProgressContainer">',u&&(s+=u),s+="</div>",s+="</div>",e.innerHTML=s,"thumb"==l?(e.classList.add("thumbDetailImageContainer"),e.classList.remove("portraitDetailImageContainer"),e.classList.remove("squareDetailImageContainer")):"square"==l?(e.classList.remove("thumbDetailImageContainer"),e.classList.remove("portraitDetailImageContainer"),e.classList.add("squareDetailImageContainer")):(e.classList.remove("thumbDetailImageContainer"),e.classList.add("portraitDetailImageContainer"),e.classList.remove("squareDetailImageContainer"));var m=e.querySelector("img");m.onload=function(){-1==m.src.indexOf("empty.png")&&m.classList.add("loaded")},ImageLoader.lazyImage(m,n)},renderDetailPageBackdrop:function(e,t){var a,r=i.availWidth,n=!1,s=e.querySelector("#itemBackdrop");return t.BackdropImageTags&&t.BackdropImageTags.length?(a=ApiClient.getScaledImageUrl(t.Id,{type:"Backdrop",index:0,maxWidth:r,tag:t.BackdropImageTags[0]}),s.classList.remove("noBackdrop"),ImageLoader.lazyImage(s,a,!1),n=!0):t.ParentBackdropItemId&&t.ParentBackdropImageTags&&t.ParentBackdropImageTags.length?(a=ApiClient.getScaledImageUrl(t.ParentBackdropItemId,{type:"Backdrop",index:0,tag:t.ParentBackdropImageTags[0],maxWidth:r}),s.classList.remove("noBackdrop"),ImageLoader.lazyImage(s,a,!1),n=!0):(s.classList.add("noBackdrop"),s.style.backgroundImage=""),n}};return m}(window,document,screen);return window.LibraryBrowser=m,m});