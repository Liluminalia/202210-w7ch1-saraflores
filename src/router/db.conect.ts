import mongoose from 'mongoose';
import { USER, CLUSTER, PASSW } from './config.js';
export function dbConnect() {
    const DBName =
        process.env.NODE_ENV !== 'test' ? 'saraData' : 'CodersTesting';
    let uri = `mongodb+srv://${USER}:${PASSW}`;
    uri += `@${CLUSTER}/${DBName}?retryWrites=true&w=majority`;
    console.log('conecting to', DBName);
    console.log({ uri });
    return mongoose.connect(uri);
}
dbConnect();
console.log(mongoose.connection.readyState);
