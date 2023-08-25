const Job = require("../models/Job");

const { StatusCodes } = require("http-status-codes");

const { BadRequestError, UnauthenticatedError, NotFoundError } = require("../errors/index");

const getAllJobs = async (req, res) => {
    // jons associated with the user
    const jobs = await Job.find({createdBy:req.user.id}).sort('createdAt DESC');
    res.status(StatusCodes.OK).json({ jobs, count:jobs.length });
};

const getJob = async (req, res) => {
  const {user:{id}, params:{id:jobId}}=req;

  const job=await  Job.findOne({
    _id:jobId,
    createdBy:id,
  })

if(!job){
    throw new NotFoundError(`No job with ${jobId}`)
}
res.status(StatusCodes.OK).json({ job})
};

const createJob = async (req, res) => {
  // get the user by user id for whose the job is associated
  req.body.createdBy = req.user.id;

  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  const {
    body:{company, position},
    user:{id:userId},
    params:{id:jobId},
  }=req

  console.log(req.user);
  console.log(req.params.id);
  console.log(req.body, req.params);
  if(company ==="" || position ==="" ){
    throw new BadRequestError("Company and position are required")
  }

  const job = await Job.findOneAndUpdate(
    {_id:req.params.id, createdBy:userId},
    req.body,
    { new: true , runValidators: true}
  )
    console.log(job)
    // return res.status(StatusCodes.OK).json({job});
    return res.status(StatusCodes.OK).json({job});
};

const deleteJob = async (req, res) => {
  const {
    user:{id},
    params:{id:jobId},
  }=req;

//   find the job by id
  const job = await Job.findOneAndDelete({
    _id:jobId,
    createdBy:id,
  })

  if(!job){
    throw new NotFoundError(`No job with ${jobId}`)
  }

  res.status(StatusCodes.OK).send({"msg":"success"});
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
