angular.module('starter.controllers')

  .controller('DashCtrl', function ($scope, $state, $stateParams, $http, $location) {
    console.log($location.host());
    var req = {
      method: 'GET',
      url: 'http://' + $location.host() + ':5012/api/products/' + $stateParams.id,
      headers: {
        'id': $stateParams.id
      }
    };

    $http(req).then(function (data) {
      if (data.data != "") {
        //console.log(data.data);
        $scope.urlParam = data.data.name;
        $scope.imageUrl = data.data.imageurl;
      } else {
        $scope.urlParam = "Frozen Ghost1";
        $scope.imageUrl = "http://1.bp.blogspot.com/-x0qgbWJI6ZY/TlL86fmHErI/AAAAAAAAygc/hUIEBa8DXnM/s1600/lovely-package-frozen-ghost-vodka1-e1313218158662.jpg";
      }
    });
  });