angular.module('tmsApp')
.controller('IndexCtrl', ['$scope', '$location', '$http', '$rootScope', 'tmsUtil', ($scope, $location, $http, $rootScope, tmsUtil)->
    #scope 变量
    $scope.task = {
        taskName: ''
    }
    $scope.taskList = []
    init = ->
        $http.get("#{Tms.apiAddress}/api/task")
        .then((res)->
            tasks = res.data
            $scope.taskList = tasks
        ,tmsUtil.processHttpError)
    #UI 操作
    $scope.changeTaskStatus = (task)->
        task.status = if task.checked then 'Finish' else 'InProgress'

    $scope.deleteTask = (task, index)->
        task.deleted = true
        $http.put("#{Tms.apiAddress}/api/task", task)
        .then((res)->
            $scope.taskList.splice(index, 1)
        ,tmsUtil.processHttpError)

    $scope.editTask = (task)->
        task.isEditing = true
        task.tempTaskName = task.taskName
        

    $scope.cancelEditTask = (task)->
        task.isEditing = false

    $scope.saveTask = (task)->
        oldTaskName = task.taskName
        task.taskName = task.tempTaskName
        $http.put("#{Tms.apiAddress}/api/task", task)
        .then((res)->
            task.isEditing = false
        ,(err)->
            task.isEditing = false
            task.taskName = oldTaskName
            tmsUtil.processHttpError
        )

    $scope.addTask = ->
        task = angular.copy($scope.task)
        $http.post("#{Tms.apiAddress}/api/task", {
            taskName: $scope.task.taskName
        }).then((res)->
            newTask = res.data
            task._id = newTask._id
            task.deleted = newTask.deleted
            $scope.taskList.push(task)
            $scope.task.taskName = ''
        ,tmsUtil.processHttpError)

    $scope.exit = ->
        $http.post("#{Tms.apiAddresss}/api/user/logout")
        .then((res)->
            alert('注销成功')
            $location.path('/login')
        ,tmsUtil.processHttpError)

    init()
])