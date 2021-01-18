import mongoose from 'mongoose';

const PlanetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    climate: {
        type: String,
        required: true,
    },
    terrain: {
        type: String,
        required: true,
    },
    appearances: {
        type: Number,
    },
}, {
    timestamps: true,
});

export default mongoose.model('Planet', PlanetSchema);