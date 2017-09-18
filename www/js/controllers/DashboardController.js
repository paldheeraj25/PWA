angular.module('starter.controllers')

  .controller('DashCtrl', function ($scope, $state, $stateParams, $http, $location) {
    console.log($location.host());
    var _instance = this;
    var tagid = $stateParams.id.substring(0, 14);
    var tamperCode = $stateParams.id.substring(14, 16);
    $scope.tamperStatus = tamperCode === "00" ? false : true;
    var req = {
      method: 'GET',
      url: 'http://' + $location.host() + ':5012/api/products/' + $stateParams.id,
      headers: {
        'id': tagid
      }
    };

    $http(req).then(function (data) {
      if (data.data != "") {
        //console.log(data.data);
        $scope.engageData = data.data;
        $scope.urlParam = data.data.name;
        $scope.imageUrl = data.data.imageurl;
        var manufacture = new Date(data.data.manufacture_date);
        var expire = new Date(data.data.expire_date);
        if (manufacture < expire) {
          $scope.freshInfo = true;
        } else {
          $scope.freshInfo = false;
        }
      } else {
        $scope.urlParam = "Frozen Ghost1";
        $scope.imageUrl = "http://1.bp.blogspot.com/-x0qgbWJI6ZY/TlL86fmHErI/AAAAAAAAygc/hUIEBa8DXnM/s1600/lovely-package-frozen-ghost-vodka1-e1313218158662.jpg";
      }
    });
  });