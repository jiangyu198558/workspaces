angular.module('tmsApp')
.controller('IndexCtrl', ['$scope', '$location', '$rootScope', ($scope, $location, $rootScope)->
    #scope 变量
    $scope.task = {
        description: ''
    }
    #UI 操作
    $scope.taskList = []
    $scope.addTask = ->
        task = angular.copy($scope.task)
        task.checked = false
        task.status = 'InProgress'
        $scope.taskList.push(task)
        $scope.task.description = ""
])