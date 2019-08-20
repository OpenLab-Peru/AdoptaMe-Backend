import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

const hashPassword = (password) => {
  return new Promise((res, rej) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) { return rej(err); }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) { return rej(err); }
        return res(hash);
      });
    });
  })
}
 
export const UserSchema = new mongoose.Schema({

  // 0: Not deleted | 1: Deleted
  isDeleted: { type: Number, default: 0, enum: [0, 1] },
  // 0: Removed | 1: Active
  status: { type: Number, default: 1 },
  email: { type: String, unique: [true, 'Ya existe un usuario registrado con el mismo correo.'] },
  password: { type: String },
  passwordResetToken: String,
  passwordResetExpires: Date,

  name: String,
  lastName: String,
  dni: { type: String, unique: [true, 'Ya existe un usuario registrado con el mismo dni.'] },
  cellphone: { type: String, unique: [true, 'Ya existe un usuario registrado con el mismo telefono.'] },
  district: Number,
  department: Number,
  country: Number,
  picture: { type: String, default: 'https://res.cloudinary.com/evertdz/image/upload/v1563019024/nopath-1_mp9kdx.png' }
}, { timestamps: true, versions: false });

/**
 * Password hash middleware.
 */
UserSchema.pre('save', async function save(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  user.password = await hashPassword(user.password);
});

/**
 * Helper method for validating user's password.
 */
UserSchema.methods.comparePassword = function comparePassword(candidatePassword) {
  return new Promise((res, rej) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if(err) return rej(err);
      return res(isMatch);
    });
  })
};

/**
 * Helper method for validating user's password.
 */
UserSchema.methods.compareAccessToToken = function compareAccessToToken(candidateToken) {
  return new Promise((res, rej) => {
    bcrypt.compare(candidateToken, this.accessToken, (err, isMatch) => {
      if(err) return rej(err);
      return res(isMatch);
    });
  })
};