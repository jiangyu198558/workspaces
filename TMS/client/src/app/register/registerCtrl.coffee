angular.module('tmsApp')
.controller('RegisterCtrl', ['$scope', ($scope)->
    $scope.userEntity = {
      username: ''
      password: ''
      password2: ''
    }
    $scope.doRegister = ->
      console.log($scope.userEntity)
])