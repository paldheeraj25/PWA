angular.module('starter.controllers')

  .controller('DashCtrl', function ($scope, $state, $stateParams, $http, $location) {
    //console.log($location.host());
    var req = {
      method: 'GET',
      url: 'http://' + $location.host() + ':8012/api/products/' + $stateParams.id,
      headers: {
        'id': $stateParams.id
      }
    };

    $http(req).then(function (data) {
      if (data) {
        //console.log(data.data);
        $scope.urlParam = data.data.name;
        $scope.imageUrl = data.data.imageurl;
      } else {
        return { name: "Frozen Ghost1" };
      }
    });
  });