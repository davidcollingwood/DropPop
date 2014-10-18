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
'        <div ng-click="loadWorld()" class="item item-icon-left"><i class="icon ion-map"></i>Explore</div>',
'        <div ui-sref="app.user" menu-close nav-clear class="item item-icon-left"><i class="icon ion-ios7-person"></i>Profile</div>',
'        <div ui-sref="app.friends" menu-close nav-clear class="item item-icon-left"><i class="icon ion-ios7-people"></i>Friends</div>',
'        <div ui-sref="app.favourites" menu-close nav-clear class="item item-icon-left"><i class="icon ion-ios7-star"></i>Favourites</div>',
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
'  <ion-nav-buttons side="right">',
'    <button ng-class="getFavouriteClass()" ng-click="toggleFavourite()" class="button button-icon"></button>',
'    <button ng-click="drop()" class="button button-icon ion-ios7-upload-outline"></button>',
'  </ion-nav-buttons>',
'  <ion-content>',
'    <h2 class="title">{{ article.title }}</h2><small class="author">by {{ article.author }}</small>',
'    <p ng-bind-html="article.content"></p><small class="dropped-by">Dropped By</small>',
'    <div class="list">',
'      <div ng-repeat="profile in profiles track by $index" ui-sref="app.profile({ profile_id: $index })" class="item item-avatar item-icon-right"><img ng-src="{{ profile.getPicture(&quot;small&quot;) }}">{{ profile.getName() | capitalise }}<i class="icon ion-ios7-arrow-right"></i></div>',
'    </div>',
'  </ion-content>',
'  <button ng-click="cancelDrop()" class="button button-icon ion-ios7-close-outline"></button>',
'</ion-view>',''].join("\n"));
}])
.run(['$templateCache', function($templateCache) {
  return $templateCache.put('/partials/favourites.html', [
'',
'<ion-view title="Favourites" class="favourites">',
'  <ion-nav-buttons side="left">',
'    <button ng-click="toggleMenu()" class="button button-icon ion-navicon"></button>',
'  </ion-nav-buttons>',
'  <ion-nav-buttons side="right">',
'    <button class="button button-icon ion-ios7-search"></button>',
'  </ion-nav-buttons>',
'  <ion-content>',
'    <ion-list>',
'      <ion-item ng-repeat="favourite in favourites" ui-sref="app.article({ article_id: getArticleId(favourite) })" class="item-icon-right">',
'        <h2 class="title">{{ favourite.title }}</h2><small class="author">by {{ favourite.author }}</small><i class="icon ion-ios7-arrow-right"></i>',
'      </ion-item>',
'    </ion-list>',
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
'      <div ng-repeat="friend in friends track by $index" ui-sref="app.profile({ profile_id: getProfileId(friend) })" class="item item-avatar item-icon-right"><img ng-src="{{ friend.getPicture(&quot;small&quot;) }}">{{ friend.getName() | capitalise }}<i class="icon ion-ios7-arrow-right"></i></div>',
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
'<ion-view title="{{ profile.getName() | capitalise }}" class="profile">',
'  <ion-nav-buttons side="left" ng-if="is_me">',
'    <button ng-click="toggleMenu()" class="button button-icon ion-navicon"></button>',
'  </ion-nav-buttons>',
'  <ion-nav-buttons side="right">',
'    <button ng-class="getFriendClass()" ng-click="toggleFriend()" class="button button-icon"></button>',
'  </ion-nav-buttons>',
'  <ion-content>',
'    <div class="large-avatar"><img ng-src="{{ profile.getPicture() }}"></div>',
'    <div class="row">',
'      <div class="col"><i class="icon ion-pin"></i>{{ profile.bubbles_popped }}</div>',
'      <div class="col"><i class="icon ion-ios7-upload-outline"></i>{{ profile.bubbles_dropped }}</div>',
'      <div class="col"><i class="icon ion-ios7-people"></i>{{ profile.count_friends }}</div>',
'    </div>',
'    <div class="list">',
'      <div class="item-divider"><i class="icon ion-ios7-clock-outline"></i>Recently Read</div>',
'      <div ng-repeat="article in profile.getRecentArticles()" ui-sref="app.article({ article_id: getArticleId(article) })" class="item item-icon-right">',
'        <h2 class="title">{{ article.title }}</h2><small class="author">by {{ article.author }}</small><i class="icon ion-ios7-arrow-right"></i>',
'      </div>',
'      <div ng-if="!is_me" class="item-divider"><i class="icon ion-ios7-star-outline"></i>Favourite Articles</div>',
'      <div ng-if="!is_me" ng-repeat="article in profile.getFavouriteArticles()" ui-sref="app.article({ article_id: getArticleId(article) })" class="item item-icon-right">',
'        <h2 class="title">{{ article.title }}</h2><small class="author">by {{ article.author }}</small><i class="icon ion-ios7-arrow-right"></i>',
'      </div>',
'    </div>',
'  </ion-content>',
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