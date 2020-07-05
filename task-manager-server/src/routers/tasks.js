const express = require("express");
const moment = require("moment");
const Task = require("../models/task");
const auth = require("../middleware/auth");

const router = new express.Router();

router.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
    ownerName: req.user.name,
  });
  try {
    await task.save();
    console.log("response", req.body);
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/mytasks", auth, async (req, res) => {
  const match = {};
  const sort = {};
  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;

    console.log(sort);
  }
  try {
    //const tasks = await Task.find({ owner: req.user._id });
    await req.user
      .populate({
        path: "tasks",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort: {
            createdAt: -1,
          },
        },
      })
      .execPopulate();

    res.send(req.user.tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/all-tasks", async (req, res) => {
    console.log('search',req.query.search)
  let match = {"$regex":""};
  const sort = {};
  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
   
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
   
    console.log(sort);
  }
  if (req.query.search) {
    match={ "$regex":req.query.search}
  }

 
  try {
  
    const tasks = await Task.find( {description:match} ).limit(req.query.limit).sort({ createdAt: 1 }).skip(0);
    //   const clientEncryption = encryptedClient.getClientEncryption();
    //     clientEncryption.decrypt(avatar)
    const processedTasks = tasks.map(
      ({ description, completed, createdAt, updatedAt, ownerName, owner }) => {
        return {
          description,
          completed: completed.toString(),
          createdAt: moment.parseZone(createdAt).format("L"),
          updatedAt: moment.parseZone(updatedAt).format("L"),
          ownerName,
          owner,
        };
      }
    );

    res.send(processedTasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const valid = ["description", "completed"];
  const update = Object.keys(req.body);
  const isValid = update.every((key) => valid.includes(key));
  if (!isValid) {
    res.status(404).send({ error: "invalid update" });
  }
  try {
    //const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      res.status(404).send({ error: "invalid task" });
    }
    update.forEach((field) => (task[field] = req.body[field]));
    await task.save();
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const deleted = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!deleted) {
      return res.status(404).send({ error: "invalid id" });
    }
    res.status(200).send(deleted);
  } catch (error) {
    res.status(400).send();
  }
});

module.exports = router;
