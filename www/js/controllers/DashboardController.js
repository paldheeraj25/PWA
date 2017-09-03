angular.module('starter.controllers')

  .controller('DashCtrl', function ($scope, $state, $stateParams, $http) {
    var req = {
      method: 'GET',
      url: '/api/products/' + $stateParams.id,
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