const mongoose = require('mongoose');

const TimetableSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    day: {
        type: String, // MON, TUE, WED, THU, FRI, SAT, SUN
        required: true
    },
    startTime: {
        type: String, // "09:00"
        required: true
    },
    endTime: {
        type: String, // "10:00"
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    location: {
        type: String
    },
    isCancelled: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Timetable', TimetableSchema);
