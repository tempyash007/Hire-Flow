import express from 'express';
import {
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob,
    closeJob
} from '../controllers/jobController.js';
import { protect, isRecruiter } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllJobs);
router.get('/:id', getJobById);

router.post('/', protect, isRecruiter, createJob);
router.patch('/:id', protect, isRecruiter, updateJob);
router.delete('/:id', protect, isRecruiter, deleteJob);
router.patch('/:id/close', protect, isRecruiter, closeJob);

export default router;