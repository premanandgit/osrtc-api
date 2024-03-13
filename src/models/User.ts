import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface UserDocument extends Document {
    username: string;
    password: string;
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
    }
});

UserSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
    let pwdResult = await bcrypt.compare(password, this.password);
    return pwdResult;
};

export default mongoose.model<UserDocument>('User', UserSchema);
