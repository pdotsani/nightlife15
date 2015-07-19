'use strict';

angular.module('nightlife15App')
  .controller('MainCtrl', function ($rootScope, $scope, $http, googleSvc, $modal, Auth) {
    $scope.city;
    $scope.bars;
    $scope.isLoggedIn = Auth.isLoggedIn;

    $scope.searchBars = function() {
      console.log($scope.city);
      googleSvc.findCity($scope.city);
      $scope.bars = googleSvc.returnBars();
      console.log($scope.bars);
    };

    $scope.open = function (index) {
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'barModal.html',
        controller: 'ModalInstanceCtrl',
        resolve: {
          item: function () {
            return $scope.bars[index];
          }
        }
      });
    };

    $scope.$on('get-bars', function(event) {
      googleSvc.getBars($scope.city);
      $scope.bars = googleSvc.returnBars();
      console.log($scope.bars);
    })

    $scope.$on('going', function(event,args){
      console.log(args._id);
      $scope.bars.forEach(function(bar) {
        if(bar._id === args._id) {
          bar.going++;
          $http.put('/api/citys/'+$scope.city+"/"+args._id, {going: bar.going})
            .success(function(data) {
              console.log(data);
            });
        };
      });
    });

    $scope.$on('not-going', function(event,args){
      console.log(args._id);
      $scope.bars.forEach(function(bar) {
        if(bar._id === args._id && bar.going > 0) {
          bar.going--;
          console.log(bar.going);
          $http.put('/api/citys/'+$scope.city+"/"+args._id, {going: bar.going})
            .success(function(data) {
              console.log(data);
            });
        };
      });
    });

  })

  .controller('ModalInstanceCtrl', function ($rootScope, $scope, $modalInstance, item, Auth) {

    $scope.bar = item;
    $scope.isLoggedIn = Auth.isLoggedIn;
    
    $scope.going = function () {
      $rootScope.$broadcast('going', $scope.bar);
      $modalInstance.close($scope.selected);
    };

    $scope.notGoing = function () {
      $rootScope.$broadcast('not-going', $scope.bar);
      $modalInstance.close($scope.selected);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });