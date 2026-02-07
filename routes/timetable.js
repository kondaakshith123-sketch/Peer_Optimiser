const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Timetable = require('../models/Timetable');

// @route   POST api/timetable/add
// @desc    Add class slot
// @access  Private
router.post('/add', auth, async (req, res) => {
    const { day, startTime, endTime, subject, location } = req.body;

    try {
        const newSlot = new Timetable({
            userId: req.user.id,
            day,
            startTime,
            endTime,
            subject,
            location
        });

        const slot = await newSlot.save();
        res.json(slot);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/timetable/my
// @desc    Get current user's timetable
// @access  Private
router.get('/my', auth, async (req, res) => {
    try {
        const timetable = await Timetable.find({ userId: req.user.id });
        res.json(timetable);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/timetable/free-slots
// @desc    Calculate free slots for a specific day (or today)
// @access  Private
router.get('/free-slots', auth, async (req, res) => {
    const day = req.query.day || 'MON'; // Default to MON or get from query

    try {
        const timetable = await Timetable.find({ userId: req.user.id, day })
            .sort({ startTime: 1 }); // Sort by start time

        const freeSlots = [];
        let collegeStart = "09:00";
        const collegeEnd = "17:00";

        // Helper to convert time string "HH:MM" to minutes
        const toMinutes = (timeStr) => {
            const [hours, minutes] = timeStr.split(':').map(Number);
            return hours * 60 + minutes;
        };

        // Helper to convert minutes to time string "HH:MM"
        const toTimeStr = (minutes) => {
            const h = Math.floor(minutes / 60).toString().padStart(2, '0');
            const m = (minutes % 60).toString().padStart(2, '0');
            return `${h}:${m}`;
        };

        let lastEndTime = toMinutes(collegeStart);

        timetable.forEach(slot => {
            if (slot.isCancelled) return; // Skip cancelled classes

            const slotStart = toMinutes(slot.startTime);
            const slotEnd = toMinutes(slot.endTime);

            if (slotStart > lastEndTime) {
                // Found a gap
                freeSlots.push({
                    startTime: toTimeStr(lastEndTime),
                    endTime: toTimeStr(slotStart),
                    duration: slotStart - lastEndTime
                });
            }

            lastEndTime = Math.max(lastEndTime, slotEnd);
        });

        // Check gap after last class until college end
        const collegeEndMins = toMinutes(collegeEnd);
        if (lastEndTime < collegeEndMins) {
            freeSlots.push({
                startTime: toTimeStr(lastEndTime),
                endTime: collegeEnd,
                duration: collegeEndMins - lastEndTime
            });
        }

        res.json({ day, freeSlots });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
