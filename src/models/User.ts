import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export enum UserRole {
    User = 'user',
    SuperAdmin = 'superadmin'
}

export interface UserDocument extends Document {
    username: string;
    password: string;
    role: UserRole;
    validatePassword(password: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: Object.values(UserRole),
        default: UserRole.User
    }
});

UserSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
    let pwdResult = await bcrypt.compare(password, this.password);
    return pwdResult;
};

export default mongoose.model<UserDocument>('User', UserSchema);
