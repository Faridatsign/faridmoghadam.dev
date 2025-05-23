import { Request, Response } from 'express';
import ProjectSubmission from '../models/ProjectSubmission';
import { validationResult } from 'express-validator';

// Get all submissions
export const getSubmissions = async (req: Request, res: Response) => {
  try {
    const submissions = await ProjectSubmission.find().sort({ createdAt: -1 });
    res.json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new submission
export const createSubmission = async (req: Request, res: Response) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const submission = new ProjectSubmission(req.body);
    await submission.save();
    res.status(201).json(submission);
  } catch (error) {
    console.error('Error creating submission:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update submission status
export const updateSubmissionStatus = async (req: Request, res: Response) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const { status } = req.body;

    const submission = await ProjectSubmission.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    res.json(submission);
  } catch (error) {
    console.error('Error updating submission:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a submission
export const deleteSubmission = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const submission = await ProjectSubmission.findByIdAndDelete(id);

    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    res.json({ message: 'Submission deleted' });
  } catch (error) {
    console.error('Error deleting submission:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 