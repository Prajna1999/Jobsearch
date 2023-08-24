const {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}=require("../controllers/jobs");
const router=require('express').Router();

router.get('/',getAllJobs);
router.get('/:id',getJob);
router.post('/',createJob);
router.patch('/:id',updateJob);
router.delete('/:id',deleteJob);
module.exports = router;