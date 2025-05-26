import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

/**
 * User interface
 * Defines the structure of a User document in MongoDB
 * Extends mongoose Document to include MongoDB document properties
 */
export interface IUser extends mongoose.Document {
  username: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

/**
 * User Schema
 * Defines the structure and validation rules for User documents
 */
const userSchema = new mongoose.Schema(
  {
    // Username field with validation
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    // Password field with validation
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

/**
 * Pre-save middleware
 * Hashes password before saving to database
 * Only hashes if password field is modified
 */
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  try {
    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

/**
 * Password comparison method
 * Compares candidate password with stored hashed password
 * @param candidatePassword - Password to compare
 * @returns Promise<boolean> - True if passwords match
 */
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Create and export User model
const User = mongoose.model<IUser>('User', userSchema);

export default User; 