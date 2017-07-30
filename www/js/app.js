// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'firebase'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })
  .config(function () {
    var config = {
      apiKey: "AIzaSyBiQNOs0GGDXUrlriwsWvS2v-Z_mDj55bU",
      authDomain: "sealedbit-3b63c.firebaseapp.com",
      databaseURL: "https://sealedbit-3b63c.firebaseio.com",
      projectId: "sealedbit-3b63c",
      storageBucket: "sealedbit-3b63c.appspot.com",
      messagingSenderId: "102951832251"
    };
    firebase.initializeApp(config);
  })
  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $locationProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.navBar.alignTitle('center');
    //$ionicConfigProvider.views.maxCache(0);
    $stateProvider

      // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })
      .state('login', {
        url: '/',
        templateUrl: 'templates/login.html',
        controller: 'AuthCtrl as auth'
      })
      // Each tab has its own nav history stack:

      .state('tab.dash', {
        url: '/dash',
        views: {
          'tab-dash': {
            templateUrl: 'templates/tab-dash.html',
            controller: 'DashCtrl',
            resolve: {
              urlParam: function ($rootScope) {
                if ($rootScope.urlParams) {
                  $rootScope.urlParams = $rootScope.urlParams.substr(1);
                  var ref = firebase.database().ref().child('product');
                  var storage = firebase.storage().ref().child('product_image');
                  return ref.child($rootScope.urlParams).once('value').then(function (snapshot) {
                    if (snapshot.val() !== null) {
                      var productObject = snapshot.val();
                      return productObject;
                    }
                  });
                } else {
                  return { name: "Frozen Ghost" };
                }
              },
              imageUrl: function ($rootScope) {
                if ($rootScope.urlParams) {
                  //$rootScope.urlParams = $rootScope.urlParams.substr(1);
                  var ref = firebase.database().ref().child('product');
                  var storage = firebase.storage().ref().child('product_image');
                  return storage.child($rootScope.urlParams).child('bottle.jpg').getDownloadURL().then(function (data) {
                    return data;
                  });
                } else {
                  return "http://1.bp.blogspot.com/-x0qgbWJI6ZY/TlL86fmHErI/AAAAAAAAygc/hUIEBa8DXnM/s1600/lovely-package-frozen-ghost-vodka1-e1313218158662.jpg";
                }
              }
            }
          }
        }
      })

      .state('tab.chats', {
        url: '/chats',
        views: {
          'tab-chats': {
            templateUrl: 'templates/tab-chats.html',
            controller: 'ChatsCtrl'
          }
        }
      })
      .state('tab.chat-detail', {
        url: '/chats/:chatId',
        views: {
          'tab-chats': {
            templateUrl: 'templates/chat-detail.html',
            controller: 'ChatDetailCtrl'
          }
        }
      })

      .state('tab.account', {
        url: '/account',
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-account.html',
            controller: 'AccountCtrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise(function ($injector, $location, $rootScope) {
      var state = $injector.get('$state');
      console.log($location.path());
      var rootScope = $injector.get('$rootScope');
      rootScope.urlParams = $location.path();
      state.transitionTo('tab.dash', rootScope, {
        reload: true
      });
      return $location.path();
    });

  });
