import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import { Data, id } from './data.js';
import mongoose, { Model, model, Mongoose, Schema } from 'mongoose';
import { Table } from '../interfaces/tables.js';

export class TableMongoData implements Data<Table> {
    constructor(public uri: string, public tablesSchema: Schema) {
        uri = `mongodb+srv://${process.env.USER}:${process.env.PASSW}@${process.env.CLUSTER}/${process.env.DBNAME}?retryWrites=true&w=majority`;

        tablesSchema = new Schema({
            name: mongoose.SchemaTypes.String,
            price: mongoose.SchemaTypes.Number,
            color: mongoose.SchemaTypes.String,
            status: mongoose.SchemaTypes.Boolean,
        });
    }
    Table = model('Table', this.tablesSchema, 'tables');

    async getAll(): Promise<Array<Table>> {
        const connector = mongoose.connect(this.uri);
        return await this.Table.find();
    }
    async get(id: id) {
        const connector = mongoose.connect(this.uri);
        return await this.Table.findById(id);
    }
    async post() {
        const connector = mongoose.connect(this.uri);
        return await this.Table.create(this.#createID, {
            name: 'big table',
            price: 500,
            color: 'green',
            status: false,
        });
    }
    async patch(id: id, updatedTable: Partial<Table>) {
        const connector = mongoose.connect(this.uri);
        return await this.Table.findByIdAndUpdate(
            id,
            (updatedTable = {
                name: 'small table',
            })
        );
    }
    async delete(id: id) {
        const connector = mongoose.connect(this.uri);
        return await this.Table.findByIdAndDelete(id);
    }
    #createID() {
        return Math.trunc(Math.random() * 1_000_000_000);
    }
}
