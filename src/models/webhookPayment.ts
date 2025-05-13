import mongoose from 'mongoose';

const CobrancaStatusSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true,
    },
    checkoutId: {
        type: String,
        required: true,
    },
    orderId: {
        type: String,
        required: true,
    },
    data: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

const CobrancaStatus = mongoose.models.CobrancaStatus || mongoose.model('CobrancaStatus', CobrancaStatusSchema);

export default CobrancaStatus;
