import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Review = mongoose.model('Review', ReviewSchema);

export default Review;
