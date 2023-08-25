const Job = require("../models/Job");

const { StatusCodes } = require("http-status-codes");

const { BadRequestError, UnauthenticatedError } = require("../errors/index");
const getAllJobs = async (req, res) => {
    // jons associated with the user
    const jobs = await Job.find({createdBy:req.user.id}).sort('createdAt DESC');
    res.status(StatusCodes.OK).json({ jobs, count:jobs.length });
};

const getJob = async (req, res) => {
  res.send("GET jobs by id");
};

const createJob = async (req, res) => {
  // get the user by user id for whose the job is associated
  req.body.createdBy = req.user.id;

  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  res.send("Update a Job");
};

const deleteJob = async (req, res) => {
  res.send("Delete a Job");
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
