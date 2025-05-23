import mongoose from 'mongoose';

export interface IProjectSubmission extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  status: 'new' | 'in-progress' | 'completed' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

const projectSubmissionSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    projectType: {
      type: String,
      required: true,
      enum: ['web', 'mobile', 'data', 'ml', 'other'],
    },
    budget: {
      type: String,
      required: true,
      enum: ['small', 'medium', 'large', 'enterprise'],
    },
    timeline: {
      type: String,
      required: true,
      enum: ['urgent', 'normal', 'flexible'],
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['new', 'in-progress', 'completed', 'rejected'],
      default: 'new',
    },
  },
  { timestamps: true }
);

const ProjectSubmission = mongoose.model<IProjectSubmission>('ProjectSubmission', projectSubmissionSchema);

export default ProjectSubmission; 