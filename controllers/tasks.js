const { model } = require("mongoose");
const asyncWrapper = require("../middleware/asyncWrapper");
const Task = require("../models/Task");
const errorHandlerMiddleWare = require("../middleware/errorHandler");
const { createCustomError } = require("../errors/custom-errors");
const getAllTasks = asyncWrapper(async (req, res) => {
  // wait till the query strings get executed.
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

const getTask = asyncWrapper(async (req, res, next) => {
  // id is coming from "/:id" params
  const ID = req.params.id;
  const task = await Task.findOne({ _id: ID });
  if (!task) {
    // return res.status(404).json({ msg: "not found" });
    return next(createCustomError(`task with ${ID} was not found`, 404));
  }
  res.status(200).json(task);
});

const createTask = asyncWrapper(async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: TaskID } = req.params;
  // find the doc with the given id, update it with the req.body data and return the updated one, do validation as well.(null values)
  const task = await Task.findOneAndUpdate({ _id: TaskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError(`task with ${ID} was not found`, 404));
  }
  res.status(200).json(task);
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: TaskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: TaskID });
  if (!task) {
    return next(createCustomError(`task with ${ID} was not found`, 404));
  }
  res.status(200).json({ success: "Task deleted successfully" });
});

module.exports = { getAllTasks, getTask, createTask, updateTask, deleteTask };
