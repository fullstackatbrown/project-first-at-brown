require('dotenv').config();

const schedule = require('node-schedule');
const { GoogleSpreadsheet } = require('google-spreadsheet');

const room = require('../models/room.js');
const roomConfig = require('../config/roomConfig.json');

const TIMEZONE = 'America/New_York';

const INTERVALS = {
  DAY: 'DAY',
  WEEK: 'WEEK',
  USED: 'USED',
  NEW: 'NEW',
};

const doc = new GoogleSpreadsheet(
  '19SV-3-bjpWGtafXQVVFv2a-kkXhAEau9794Pdh5VVBo'
);

/**
 * Initializes google spreadsheet connection
 * @return {Promise<void>}
 */
exports.init = async () => {
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/gm, '\n'),
  });

  for (const roomConfigItem of roomConfig) {
    const rule = new schedule.RecurrenceRule();
    rule.tz = TIMEZONE;

    if (roomConfigItem.intervalType === 'daily') {
      rule.hour = roomConfigItem.hour;
      schedule.scheduleJob(rule, () => updateRooms(INTERVALS.DAY));
    } else if (roomConfigItem.intervalType === 'weekly') {
      rule.dayOfWeek = roomConfigItem.day;
      rule.hour = roomConfigItem.hour;
      schedule.scheduleJob(rule, () => updateRooms(INTERVALS.WEEK));
    } else {
      console.log(
        'unsupported interval type in room config: ' +
          roomConfigItem.intervalType
      );
    }
  }

  // TESTING
  // const testRule = new schedule.RecurrenceRule();
  // testRule.second = [0, 15, 30, 45];
  // testRule.tz = 'Etc/UTC';
  // schedule.scheduleJob(testRule, () => {
  //   console.log('TEST UPDATING');
  //   updateRooms(INTERVALS.DAY);
  // });
};

/**
 * Updates the status of rooms with the given type
 * @param {string} type The type of room to update
 */
const updateRooms = async (type) => {
  await doc.loadInfo();

  // Get columns A and B of all rows excluding the header (row 1)
  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows();

  // Collect indices of new prompts and switch current prompt to used
  const newIndices = [];
  for (let i = 0; i < rows.length; i++) {
    if (rows[i].status === type) {
      rows[i].status = INTERVALS.USED;
    } else if (rows[i].status === INTERVALS.NEW) {
      newIndices.push(i);
    }
  }

  // if no new indices, reset everything, except for anything currently in use
  if (newIndices.length == 0) {
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].status === INTERVALS.USED) {
        rows[i].status = INTERVALS.NEW;
        newIndices.push(i);
      }
    }
  }

  // get random prompt and use it
  const randomIndex = newIndices[Math.floor(Math.random() * newIndices.length)];
  rows[randomIndex].status = type;
  await room.createInterval({
    prompt: rows[randomIndex].prompt,
    interval: `1 ${INTERVALS[type]}`,
  });

  for (const row of rows) row.save();
};
