
const getAllJobs=async (req,res)=>{
    res.send('GET all jobs');
}


const getJob=async (req,res)=>{
    res.send('GET jobs by id');
}


const createJob=async (req,res)=>{
    console.log(req)
    res.json(req.user);
}


const updateJob=async (req,res)=>{
    res.send('Update a Job');
}


const deleteJob=async (req,res)=>{
    res.send('Delete a Job');
}

module.exports={
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}