import mongoose from 'mongoose';

const ListadePresentesSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }
});

const ListadePresentes = mongoose.models.ListadePresentes || mongoose.model('ListadePresentes', ListadePresentesSchema);

export default ListadePresentes;
