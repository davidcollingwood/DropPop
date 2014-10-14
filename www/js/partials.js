angular.module('partials', [])
.run(['$templateCache', function($templateCache) {
  return $templateCache.put('/partials/app.html', [
'',
'<ion-side-menus>',
'  <ion-side-menu-content ng-controller="AppCtrl">',
'    <ion-nav-bar animation="nav-title-slide-ios7" class="bar-positive">',
'      <ion-nav-back-button class="button-icon ion-ios7-arrow-left"></ion-nav-back-button>',
'    </ion-nav-bar>',
'    <ion-nav-view name="app" animation="slide-left-right-ios7"></ion-nav-view>',
'  </ion-side-menu-content>',
'  <ion-side-menu side="left">',
'    <ion-content class="has-header">',
'      <div class="list">',
'        <div ui-sref="app.explore" menu-close nav-clear class="item item-icon-left"><i class="icon ion-map"></i>Explore</div>',
'        <div ui-sref="app.article" menu-close nav-clear class="item item-icon-left"><i class="icon ion-document-text"></i>Article</div>',
'        <div ui-sref="app.profile" menu-close nav-clear class="item item-icon-left"><i class="icon ion-ios7-person"></i>Profile</div>',
'        <div ui-sref="app.friends" menu-close nav-clear class="item item-icon-left"><i class="icon ion-ios7-people"></i>Friends</div>',
'        <div ui-sref="app.favourites" menu-close nav-clear class="item item-icon-left"><i class="icon ion-star"></i>Favourites</div>',
'        <div ui-sref="app.settings" menu-close nav-clear class="item item-icon-left"><i class="icon ion-gear-a"></i>Settings</div>',
'      </div>',
'    </ion-content>',
'  </ion-side-menu>',
'</ion-side-menus>',''].join("\n"));
}])
.run(['$templateCache', function($templateCache) {
  return $templateCache.put('/partials/article-modal.html', [
'',
'<ion-modal-view ng-controller="ArticleModalCtrl">',
'  <ion-header-bar class="bar-positive">',
'    <button ng-click="cancel()" class="button button-clear">Cancel</button>',
'    <h1 class="title">Create Article</h1>',
'    <button ng-click="save()" class="button button-clear">Save</button>',
'  </ion-header-bar>',
'  <ion-content class="form">',
'    <div class="list">',
'      <div class="item item-input">',
'        <input type="text" placeholder="Title" ng-model="article.title">',
'      </div>',
'      <div class="item item-input">',
'        <textarea placeholder="Content..." ng-model="article.content"></textarea>',
'      </div>',
'    </div>',
'  </ion-content>',
'</ion-modal-view>',''].join("\n"));
}])
.run(['$templateCache', function($templateCache) {
  return $templateCache.put('/partials/article.html', [
'',
'<ion-view title="Article" class="article">',
'  <ion-nav-buttons side="left">',
'    <button ng-click="toggleMenu()" class="button button-icon ion-ios7-arrow-left"></button>',
'  </ion-nav-buttons>',
'  <ion-nav-buttons side="right">',
'    <button ng-click="drop()" class="button button-icon ion-ios7-upload-outline"></button>',
'  </ion-nav-buttons>',
'  <ion-content padding="true">',
'    <h2 class="title">An Interesting Title</h2><small class="author">by The Author</small>',
'    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet rhoncus enim, quis fermentum magna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin vitae placerat massa, id vestibulum est. Duis feugiat felis ligula, nec commodo purus rutrum ac. Mauris id malesuada mauris, vel ultricies magna. Suspendisse porttitor mattis sapien eget accumsan. Donec pharetra consectetur ipsum. Fusce aliquam tortor dignissim, vestibulum nisi id, condimentum nisi.</p>',
'    <p>Vivamus libero diam, sagittis eu lacus id, lobortis imperdiet enim. Curabitur semper lacinia arcu. Pellentesque venenatis metus vitae justo feugiat tempor. Integer porta, ligula ac mattis pulvinar, libero elit viverra purus, quis vehicula ex lorem eget tortor. Nam nec felis nec nulla tincidunt condimentum. Donec hendrerit mi libero, non consequat nunc scelerisque sed. Nunc eu metus purus. Vivamus sit amet commodo nisi. Sed vehicula magna in nisl bibendum, at lacinia diam aliquet. In hac habitasse platea dictumst.</p>',
'    <p>Cras semper sagittis euismod. Proin venenatis accumsan velit ac tempor. Etiam quis lectus fringilla, sollicitudin leo nec, venenatis nisi. Nunc blandit nunc non fringilla feugiat. Vestibulum varius mi at arcu sagittis fringilla. Duis nulla sem, gravida id aliquet sit amet, ultricies in purus. Donec quis leo nec urna pretium pulvinar. Pellentesque in tellus purus. Sed mollis semper justo at efficitur. Mauris velit massa, efficitur id sagittis eget, fermentum sed risus. Cras lectus elit, tincidunt in maximus elementum, tincidunt sit amet dolor. Vestibulum sapien mauris, porta cursus auctor vitae, condimentum vel est. Donec nunc risus, gravida vel dui a, sagittis finibus libero. Donec at dui vel ex porta sollicitudin eget eget felis.</p>',
'  </ion-content>',
'  <button ng-click="cancelDrop()" class="button button-icon ion-ios7-close-outline"></button>',
'</ion-view>',''].join("\n"));
}])
.run(['$templateCache', function($templateCache) {
  return $templateCache.put('/partials/explore.html', [
'',
'<ion-view title="Explore" class="explore">',
'  <ion-nav-buttons side="left">',
'    <button ng-click="toggleMenu()" class="button button-icon ion-navicon"></button>',
'  </ion-nav-buttons>',
'  <ion-nav-buttons side="right">',
'    <button ng-click="loadWorld()" class="button button-icon ion-map"></button>',
'  </ion-nav-buttons>',
'  <ion-content></ion-content>',
'</ion-view>',''].join("\n"));
}])
.run(['$templateCache', function($templateCache) {
  return $templateCache.put('/partials/favourites.html', [
'',
'<ion-view title="Favourites">',
'  <ion-nav-buttons side="left">',
'    <button ng-click="toggleMenu()" class="button button-icon ion-navicon"></button>',
'  </ion-nav-buttons>',
'  <ion-nav-buttons side="right">',
'    <button class="button button-icon ion-ios7-search"></button>',
'  </ion-nav-buttons>',
'  <ion-content>',
'    <ion-list>',
'      <ion-item ng-repeat="article in favourites" ui-sref="app.article" class="item-icon-right">',
'        <h2>{{ article.title }}</h2>',
'        <p>{{ article.author }}</p><i class="icon ion-ios7-arrow-right"></i>',
'      </ion-item>',
'    </ion-list>',
'  </ion-content>',
'</ion-view>',''].join("\n"));
}])
.run(['$templateCache', function($templateCache) {
  return $templateCache.put('/partials/friend.html', [
'',
'<ion-view title="{{ friend.getName() | capitalise }}" class="friend">',
'  <ion-content padding="true">',
'    <div class="large-avatar"><img ng-src="{{ friend.getPicture() }}"></div>',
'  </ion-content>',
'</ion-view>',''].join("\n"));
}])
.run(['$templateCache', function($templateCache) {
  return $templateCache.put('/partials/friends.html', [
'',
'<ion-view title="Friends" class="friends">',
'  <ion-nav-buttons side="left">',
'    <button ng-click="toggleMenu()" class="button button-icon ion-navicon"></button>',
'  </ion-nav-buttons>',
'  <ion-nav-buttons side="right">',
'    <button ng-click="search()" class="button button-icon ion-ios7-search"></button>',
'  </ion-nav-buttons>',
'  <div ng-show="is_searching" class="bar bar-header item-input-inset">',
'    <label class="item-input-wrapper"><i class="icon ion-ios7-search placeholder-icon"></i>',
'      <input type="search" placeholder="Search" ng-model="friends_filter">',
'    </label>',
'    <button ng-click="cancelSearch()" class="button button-clear">Cancel</button>',
'  </div>',
'  <ion-content>',
'    <div class="list">',
'      <div ng-repeat="friend in friends track by $index" ui-sref="app.friend({ friend_id: $index })" class="item item-avatar item-icon-right"><img ng-src="{{ friend.getPicture(&quot;small&quot;) }}">{{ friend.getName() | capitalise }}<i class="icon ion-ios7-arrow-right"></i></div>',
'    </div>',
'  </ion-content>',
'</ion-view>',''].join("\n"));
}])
.run(['$templateCache', function($templateCache) {
  return $templateCache.put('/partials/image-resolution.html', [
'',
'<ion-view title="Image Resolution">',
'  <ion-content class="form">',
'    <div ng-click="done()" class="list">',
'      <ion-radio ng-model="settings.imageResolution" ng-value="\'low\'">{{ \'low\' | imageResolution }}</ion-radio>',
'      <ion-radio ng-model="settings.imageResolution" ng-value="\'good\'">{{ \'good\' | imageResolution }}</ion-radio>',
'      <ion-radio ng-model="settings.imageResolution" ng-value="\'high\'">{{ \'high\' | imageResolution }}</ion-radio>',
'      <ion-radio ng-model="settings.imageResolution" ng-value="\'very_high\'">{{ \'very_high\' | imageResolution }}</ion-radio>',
'    </div>',
'  </ion-content>',
'</ion-view>',''].join("\n"));
}])
.run(['$templateCache', function($templateCache) {
  return $templateCache.put('/partials/language.html', [
'',
'<ion-view title="Language">',
'  <ion-content class="form">',
'    <div ng-click="done()" class="list">',
'      <ion-radio ng-model="settings.language" ng-value="\'eng\'">{{ \'eng\' | language }}</ion-radio>',
'    </div>',
'  </ion-content>',
'</ion-view>',''].join("\n"));
}])
.run(['$templateCache', function($templateCache) {
  return $templateCache.put('/partials/privacy.html', [
'',
'<ion-view title="Privacy">',
'  <ion-content></ion-content>',
'</ion-view>',''].join("\n"));
}])
.run(['$templateCache', function($templateCache) {
  return $templateCache.put('/partials/profile.html', [
'',
'<ion-view title="Profile">',
'  <ion-nav-buttons side="left">',
'    <button ng-click="toggleMenu()" class="button button-icon ion-navicon"></button>',
'  </ion-nav-buttons>',
'  <ion-content></ion-content>',
'</ion-view>',''].join("\n"));
}])
.run(['$templateCache', function($templateCache) {
  return $templateCache.put('/partials/report-modal.html', [
'',
'<ion-modal-view ng-controller="ReportModalCtrl">',
'  <ion-header-bar class="bar-assertive">',
'    <button ng-click="cancel()" class="button button-clear">Cancel</button>',
'    <h1 class="title">Report a Problem</h1>',
'    <button ng-click="send()" class="button button-clear">Send</button>',
'  </ion-header-bar>',
'  <ion-content class="form">',
'    <div class="list">',
'      <div class="item item-input">',
'        <input type="text" placeholder="Your name" ng-model="report.name">',
'      </div>',
'      <div class="item item-input">',
'        <input type="email" placeholder="Your email" ng-model="report.email">',
'      </div>',
'      <div class="item item-input">',
'        <textarea placeholder="Describe your issue..." ng-model="report.description"></textarea>',
'      </div>',
'    </div>',
'  </ion-content>',
'</ion-modal-view>',''].join("\n"));
}])
.run(['$templateCache', function($templateCache) {
  return $templateCache.put('/partials/settings.html', [
'',
'<ion-view title="Settings">',
'  <ion-nav-buttons side="left">',
'    <button ng-click="toggleMenu()" class="button button-icon ion-navicon"></button>',
'  </ion-nav-buttons>',
'  <ion-nav-buttons side="right">',
'    <button ng-click="logout()" class="button button-icon ion-logout"></button>',
'  </ion-nav-buttons>',
'  <ion-content class="form">',
'    <div class="list">',
'      <ion-toggle ng-model="settings.notifications">Notifications</ion-toggle>',
'      <ion-toggle ng-model="settings.sync">Sync Data</ion-toggle>',
'      <div ui-sref="app.image-resolution" class="item item-icon-right">Image Resolution',
'        <div class="item-note">{{ settings.imageResolution | imageResolution }}</div><i class="icon ion-ios7-arrow-right"></i>',
'      </div>',
'      <div ui-sref="app.language" class="item item-icon-right">Language',
'        <div class="item-note">{{ settings.language | language }}</div><i class="icon ion-ios7-arrow-right"></i>',
'      </div>',
'    </div>',
'    <div class="list">',
'      <div ui-sref="app.privacy" class="item item-icon-right">Privacy<i class="icon ion-ios7-arrow-right"></i></div>',
'      <div ui-sref="app.terms" class="item item-icon-right">Terms and Conditions<i class="icon ion-ios7-arrow-right"></i></div>',
'    </div>',
'    <button ng-click="report()" class="button button-full button-assertive">Report a Problem</button>',
'  </ion-content>',
'</ion-view>',''].join("\n"));
}])
.run(['$templateCache', function($templateCache) {
  return $templateCache.put('/partials/terms.html', [
'',
'<ion-view title="Terms and Conditions">',
'  <ion-content></ion-content>',
'</ion-view>',''].join("\n"));
}]);