/*
 * angular-ui-bootstrap
 * http://angular-ui.github.io/bootstrap/

 * Version: 0.13.4 - 2015-09-03
 * License: MIT
 */
angular.module("ui.bootstrap",["ui.bootstrap.modal"]),angular.module("ui.bootstrap.modal",[]).factory("$$stackedMap",function(){return{createNew:function(){var e=[];return{add:function(n,t){e.push({key:n,value:t})},get:function(n){for(var t=0;t<e.length;t++)if(n==e[t].key)return e[t]},keys:function(){for(var n=[],t=0;t<e.length;t++)n.push(e[t].key);return n},top:function(){return e[e.length-1]},remove:function(n){for(var t=-1,a=0;a<e.length;a++)if(n==e[a].key){t=a;break}return e.splice(t,1)[0]},removeTop:function(){return e.splice(e.length-1,1)[0]},length:function(){return e.length}}}}}).factory("$$multiMap",function(){return{createNew:function(){var e={};return{entries:function(){return Object.keys(e).map(function(n){return{key:n,value:e[n]}})},get:function(n){return e[n]},hasKey:function(n){return!!e[n]},keys:function(){return Object.keys(e)},put:function(n,t){e[n]||(e[n]=[]),e[n].push(t)},remove:function(n,t){var a=e[n];if(a){var o=a.indexOf(t);-1!==o&&a.splice(o,1),a.length||delete e[n]}}}}}}).directive("modalBackdrop",["$animate","$injector","$modalStack",function(e,n,t){function a(n,a,r){r.modalInClass&&(o?o(a,{addClass:r.modalInClass}).start():e.addClass(a,r.modalInClass),n.$on(t.NOW_CLOSING_EVENT,function(n,t){var l=t();o?o(a,{removeClass:r.modalInClass}).start().then(l):e.removeClass(a,r.modalInClass).then(l)}))}var o=null;return n.has("$animateCss")&&(o=n.get("$animateCss")),{restrict:"EA",replace:!0,templateUrl:"template/modal/backdrop.html",compile:function(e,n){return e.addClass(n.backdropClass),a}}}]).directive("modalWindow",["$modalStack","$q","$animate","$injector",function(e,n,t,a){var o=null;return a.has("$animateCss")&&(o=a.get("$animateCss")),{restrict:"EA",scope:{index:"@"},replace:!0,transclude:!0,templateUrl:function(e,n){return n.templateUrl||"template/modal/window.html"},link:function(a,r,l){r.addClass(l.windowClass||""),a.size=l.size,a.close=function(n){var t=e.getTop();t&&t.value.backdrop&&"static"!==t.value.backdrop&&n.target===n.currentTarget&&(n.preventDefault(),n.stopPropagation(),e.dismiss(t.key,"backdrop click"))},a.$isRendered=!0;var s=n.defer();l.$observe("modalRender",function(e){"true"==e&&s.resolve()}),s.promise.then(function(){var s=null;l.modalInClass&&(s=o?o(r,{addClass:l.modalInClass}).start():t.addClass(r,l.modalInClass),a.$on(e.NOW_CLOSING_EVENT,function(e,n){var a=n();o?o(r,{removeClass:l.modalInClass}).start().then(a):t.removeClass(r,l.modalInClass).then(a)})),n.when(s).then(function(){var e=r[0].querySelectorAll("[autofocus]");e.length?e[0].focus():r[0].focus()});var i=e.getTop();i&&e.modalRendered(i.key)})}}}]).directive("modalAnimationClass",[function(){return{compile:function(e,n){n.modalAnimation&&e.addClass(n.modalAnimationClass)}}}]).directive("modalTransclude",function(){return{link:function(e,n,t,a,o){o(e.$parent,function(e){n.empty(),n.append(e)})}}}).factory("$modalStack",["$animate","$timeout","$document","$compile","$rootScope","$q","$injector","$$multiMap","$$stackedMap",function(e,n,t,a,o,r,l,s,i){function u(){for(var e=-1,n=b.keys(),t=0;t<n.length;t++)b.get(n[t]).value.backdrop&&(e=t);return e}function c(e,n){var a=t.find("body").eq(0),o=b.get(e).value;b.remove(e),m(o.modalDomEl,o.modalScope,function(){var n=o.openedClass||g;k.remove(n,e),a.toggleClass(n,k.hasKey(n))}),d(),n&&n.focus?n.focus():a.focus()}function d(){if(v&&-1==u()){var e=h;m(v,h,function(){e=null}),v=void 0,h=void 0}}function m(n,t,a){function o(){o.done||(o.done=!0,p?p(n,{event:"leave"}).start().then(function(){n.remove()}):e.leave(n),t.$destroy(),a&&a())}var l,s=null,i=function(){return l||(l=r.defer(),s=l.promise),function(){l.resolve()}};return t.$broadcast(C.NOW_CLOSING_EVENT,i),r.when(s).then(o)}function f(e,n,t){return!e.value.modalScope.$broadcast("modal.closing",n,t).defaultPrevented}var p=null;l.has("$animateCss")&&(p=l.get("$animateCss"));var v,h,$,g="modal-open",b=i.createNew(),k=s.createNew(),C={NOW_CLOSING_EVENT:"modal.stack.now-closing"},w=0,y="a[href], area[href], input:not([disabled]), button:not([disabled]),select:not([disabled]), textarea:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable=true]";return o.$watch(u,function(e){h&&(h.index=e)}),t.bind("keydown",function(e){if(e.isDefaultPrevented())return e;var n=b.top();if(n&&n.value.keyboard)switch(e.which){case 27:e.preventDefault(),o.$apply(function(){C.dismiss(n.key,"escape key press")});break;case 9:C.loadFocusElementList(n);var t=!1;e.shiftKey?C.isFocusInFirstItem(e)&&(t=C.focusLastFocusableElement()):C.isFocusInLastItem(e)&&(t=C.focusFirstFocusableElement()),t&&(e.preventDefault(),e.stopPropagation())}}),C.open=function(e,n){var r=t[0].activeElement,l=n.openedClass||g;b.add(e,{deferred:n.deferred,renderDeferred:n.renderDeferred,modalScope:n.scope,backdrop:n.backdrop,keyboard:n.keyboard,openedClass:n.openedClass}),k.put(l,e);var s=t.find("body").eq(0),i=u();if(i>=0&&!v){h=o.$new(!0),h.index=i;var c=angular.element('<div modal-backdrop="modal-backdrop"></div>');c.attr("backdrop-class",n.backdropClass),n.animation&&c.attr("modal-animation","true"),v=a(c)(h),s.append(v)}var d=angular.element('<div modal-window="modal-window"></div>');d.attr({"template-url":n.windowTemplateUrl,"window-class":n.windowClass,size:n.size,index:b.length()-1,animate:"animate"}).html(n.content),n.animation&&d.attr("modal-animation","true");var m=a(d)(n.scope);b.top().value.modalDomEl=m,b.top().value.modalOpener=r,s.append(m),s.addClass(l),C.clearFocusListCache()},C.close=function(e,n){var t=b.get(e);return t&&f(t,n,!0)?(t.value.modalScope.$$uibDestructionScheduled=!0,t.value.deferred.resolve(n),c(e,t.value.modalOpener),!0):!t},C.dismiss=function(e,n){var t=b.get(e);return t&&f(t,n,!1)?(t.value.modalScope.$$uibDestructionScheduled=!0,t.value.deferred.reject(n),c(e,t.value.modalOpener),!0):!t},C.dismissAll=function(e){for(var n=this.getTop();n&&this.dismiss(n.key,e);)n=this.getTop()},C.getTop=function(){return b.top()},C.modalRendered=function(e){var n=b.get(e);n&&n.value.renderDeferred.resolve()},C.focusFirstFocusableElement=function(){return $.length>0?($[0].focus(),!0):!1},C.focusLastFocusableElement=function(){return $.length>0?($[$.length-1].focus(),!0):!1},C.isFocusInFirstItem=function(e){return $.length>0?(e.target||e.srcElement)==$[0]:!1},C.isFocusInLastItem=function(e){return $.length>0?(e.target||e.srcElement)==$[$.length-1]:!1},C.clearFocusListCache=function(){$=[],w=0},C.loadFocusElementList=function(e){if((void 0===$||!$.length0)&&e){var n=e.value.modalDomEl;n&&n.length&&($=n[0].querySelectorAll(y))}},C}]).provider("$modal",function(){var e={options:{animation:!0,backdrop:!0,keyboard:!0},$get:["$injector","$rootScope","$q","$templateRequest","$controller","$modalStack",function(n,t,a,o,r,l){function s(e){return e.template?a.when(e.template):o(angular.isFunction(e.templateUrl)?e.templateUrl():e.templateUrl)}function i(e){var t=[];return angular.forEach(e,function(e){t.push(angular.isFunction(e)||angular.isArray(e)?a.when(n.invoke(e)):angular.isString(e)?a.when(n.get(e)):a.when(e))}),t}var u={},c=null;return u.getPromiseChain=function(){return c},u.open=function(n){var o=a.defer(),u=a.defer(),d=a.defer(),m={result:o.promise,opened:u.promise,rendered:d.promise,close:function(e){return l.close(m,e)},dismiss:function(e){return l.dismiss(m,e)}};if(n=angular.extend({},e.options,n),n.resolve=n.resolve||{},!n.template&&!n.templateUrl)throw new Error("One of template or templateUrl options is required.");var f,p=a.all([s(n)].concat(i(n.resolve)));return f=c=a.all([c]).then(function(){return p},function(){return p}).then(function(e){var a=(n.scope||t).$new();a.$close=m.close,a.$dismiss=m.dismiss,a.$on("$destroy",function(){a.$$uibDestructionScheduled||a.$dismiss("$uibUnscheduledDestruction")});var s,i={},c=1;n.controller&&(i.$scope=a,i.$modalInstance=m,angular.forEach(n.resolve,function(n,t){i[t]=e[c++]}),s=r(n.controller,i),n.controllerAs&&(n.bindToController&&angular.extend(s,a),a[n.controllerAs]=s)),l.open(m,{scope:a,deferred:o,renderDeferred:d,content:e[0],animation:n.animation,backdrop:n.backdrop,keyboard:n.keyboard,backdropClass:n.backdropClass,windowClass:n.windowClass,windowTemplateUrl:n.windowTemplateUrl,size:n.size,openedClass:n.openedClass}),u.resolve(!0)},function(e){u.reject(e),o.reject(e)}).finally(function(){c===f&&(c=null)}),m},u}]};return e});