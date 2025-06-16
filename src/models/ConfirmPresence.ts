import mongoose from 'mongoose';

const ConfirmacaoDePresencaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    guests: {
        type: Number,
        required: true,
        default: 1,
    },
    attending: {
        type: String,
        enum: ['Sim', 'Não'],
        required: true,
    }
});

const ConfirmcaoDePresenca = mongoose.models.ConfirmcaoDePresenca || mongoose.model('ConfirmcaoDePresenca', ConfirmacaoDePresencaSchema);

export default ConfirmcaoDePresenca;
