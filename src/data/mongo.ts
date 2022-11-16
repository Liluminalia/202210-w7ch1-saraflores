import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config({ path: '../../.env' });
import mongoose, { model, Schema } from 'mongoose';

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSW}@${process.env.CLUSTER}/${process.env.DBNAME}?retryWrites=true&w=majority`;

const thingsSchema = new Schema({
    name: mongoose.SchemaTypes.String,
    age: mongoose.SchemaTypes.Number,
    status: mongoose.SchemaTypes.Boolean,
});
const main = async () => {
    //en el constructor
    const connector = await mongoose.connect(uri);
    console.log(connector);

    const Thing = model('Thing', thingsSchema, 'things');
    //codigo comentado
    // Thing.find; //get all
    // Thing.findById; // get
    // Thing.create; // add
    // Thing.updateOne; // update
    // Thing.findByIdAndUpdate; // update
    // Thing.deleteOne; // delete

    //funciones
    await Thing.create({
        name: 'lolita',
        age: 50,
        status: false,
    });
    connector.disconnect();
};
main();
