import * as mongoose from 'mongoose';
 
export const FavoriteSchema = new mongoose.Schema({
  // 0: Not deleted | 1: Deleted
  isDeleted: { type: Number, default: 0, enum: [0, 1] },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

}, { timestamps: true, versions: false });
