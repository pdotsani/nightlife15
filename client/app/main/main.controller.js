'use strict';

angular.module('nightlife15App')
  .controller('MainCtrl', function ($scope, $http, googleSvc, $modal) {
    $scope.city;
    $scope.bars;

    $scope.searchBars = function() {
      console.log($scope.city);
      googleSvc.findCity($scope.city);
      $scope.bars = googleSvc.returnBars();
      console.log($scope.bars);
      if($scope.bars = []) {
        googleSvc.getBars($scope.city);
        $scope.bars = googleSvc.returnBars();
        console.log($scope.bars);
      }
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

    $scope.$on('going', function(event,args){
      console.log(args);
      $scope.bars.forEach(function(bar) {
        if(bar._id === args._id) bar.going++;
      })
    })

    $scope.$on('not-going', function(event,args){
      console.log(args);
      $scope.bars.forEach(function(bar) {
        if(bar._id === args._id && bar._id > 0) bar.going--;
      })
    })

  })

  .controller('ModalInstanceCtrl', function ($rootScope, $scope, $modalInstance, item) {

    $scope.bar = item;
    console.log($scope.bar);
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