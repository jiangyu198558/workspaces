// Generated by CoffeeScript 1.12.7
(function() {
  var addTask, config, db, getTask, getTasks, jwt, updateTask;

  jwt = require('jsonwebtoken');

  config = require('./../config/config');

  db = require('./../libs/db');

  addTask = function(req, res, next) {
    var body, data;
    body = req.body;
    data = {
      creator: 'xx',
      taskName: body.taskName,
      creatorDate: Date.now(),
      updateDate: Date.now(),
      status: 'InProgress',
      deleted: false
    };
    return db.tasks.insert(data, function(err, task) {
      if (err) {
        return next(err);
      }
      if (!task) {
        return next('创建任务失败，请重试');
      }
      return res.json(task);
    });
  };

  updateTask = function(req, res, next) {
    var body;
    body = req.body;
    return db.tasks.findOne({
      _id: body._id
    }, function(err, task) {
      if (err) {
        return next(err);
      }
      if (!task) {
        return next('未找到要更新的task');
      }
      return db.tasks.update({
        _id: task._id
      }, {
        $set: {
          taskName: body.taskName,
          updateDate: Date.now(),
          status: body.status,
          deleted: body.deleted || false
        }
      }, function(err, numReplaced) {
        if (err) {
          return next(err);
        }
        if (numReplaced === 0) {
          return next('更新失败，请重试');
        }
        return res.json(true);
      });
    });
  };

  getTask = function(req, res, next) {
    var taskId;
    taskId = req.params.id;
    return db.tasks.findOne({
      _id: taskId
    }, function(err, task) {
      if (err) {
        return next(err);
      }
      return res.json(task);
    });
  };

  getTasks = function(req, res, next) {
    console.log(req.userInfo);
    return db.tasks.find({
      deleted: false,
      creator: 'xx'
    }, function(err, tasks) {
      if (err) {
        return next(err);
      }
      return res.json(tasks);
    });
  };

  module.exports = {
    addTask: addTask,
    updateTask: updateTask,
    getTask: getTask,
    getTasks: getTasks
  };

}).call(this);
