import mongoose, { Schema, model } from 'mongoose';
import { ProtoUser, User } from '../entities/user.js';
import { DataUser, id } from './data.js';

export class UserRepository implements DataUser<User> {
    #schema = new Schema({
        name: {
            type: String,
            required: true,
            unique: true,
        },
        email: String,
        password: String,
        role: String,
    });
    #Model = model('User', this.#schema, 'users');

    constructor() {
        this.#schema.set('toJSON', {
            transform: (_document, returnedObject) => {
                returnedObject.id = returnedObject._id;
                delete returnedObject.__v;
                delete returnedObject._id;
            },
        });
    }

    async post(data: ProtoUser): Promise<User> {
        const result = await this.#Model.create(data);
        return result as User;
    }

    #disconnect() {
        mongoose.disconnect();
        console.log(mongoose.connection.readyState);
    }
    getModel() {
        return this.#Model;
    }
}
