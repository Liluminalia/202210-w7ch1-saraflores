import { Data, id } from './data.js';
import mongoose, { model, Schema } from 'mongoose';
import { Table } from '../interfaces/tables.js';

export class TableMongoData implements Data<Table> {
    #tablesSchema = new Schema({
        name: mongoose.SchemaTypes.String,
        price: mongoose.SchemaTypes.Number,
        color: mongoose.SchemaTypes.String,
        status: mongoose.SchemaTypes.Boolean,
    });

    #TableModel = model('Table', this.#tablesSchema, 'tables');

    constructor() {
        this.#tablesSchema.set('toJSON', {
            transform: (_document, returnedObject) => {
                returnedObject.id = returnedObject._id;
                delete returnedObject.__v;
                delete returnedObject._id;
            },
        });
    }
    async getAll(): Promise<Array<Table>> {
        return this.#TableModel.find();
    }
    async get(id: id): Promise<Table> {
        const result = await this.#TableModel.findById(id);
        if (!result) throw new Error('Not found id');
        return result as Table;
    }
    async post(data: Partial<Table>) {
        const result = await this.#TableModel.create(data);
        return result as Table;
    }
    async patch(id: id, data: Partial<Table>) {
        const result = await this.#TableModel.findByIdAndUpdate(id, data, {
            new: true,
        });
        if (!result) throw new Error('Not found id');
        return result as Table;
    }
    async delete(id: id): Promise<void> {
        const result = await this.#TableModel.findByIdAndDelete(id);
        if (result === null) throw new Error('Not found id');
        return;
    }
    #disconnect() {
        mongoose.disconnect();
        console.log(mongoose.connection.readyState);
    }
    getModel() {
        return this.#TableModel;
    }
}
