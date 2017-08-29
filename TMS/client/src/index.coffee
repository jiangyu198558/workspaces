angular.module('app', [])
.controller('HelloCtrl', ['$scope', ($scope)->
    $scope.name = 'world'
])