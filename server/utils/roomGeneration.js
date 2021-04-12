require('dotenv').config();

const schedule = require('node-schedule');
const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});
const sheets = google.sheets({ version: 'v4', auth });

/**
 * Updates the status of rooms with the given type
 * @see https://docs.google.com/spreadsheets/d/19SV-3-bjpWGtafXQVVFv2a-kkXhAEau9794Pdh5VVBo/edit
 * @param {string} type The type of room to update
 */
async function updateRooms(type) {
  try {
    // Get columns A and B of all rows excluding the header (row 1)
    const rows = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: 'A2:B',
    }).data.values;

    // Swap `type` <=> 'UNUSED'
    for (const row of rows) {
      if (row[0] === type) {
        row[0] = 'UNUSED';
      } else if (row[0] === 'UNUSED') {
        row[0] = type;
      }
    }

    // Update columns A and B of all rows excluding the header (row 1)
    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: 'A2:B',
      valueInputOption: 'RAW',
      requestBody: {
        range: 'A2:B',
        values: rows,
      },
    });
  } catch (err) {
    console.error(`The Sheets API returned an error: ${err}`);
  }
}

const dailyRule = new schedule.RecurrenceRule();
dailyRule.hour = 0;
dailyRule.tz = 'Etc/UTC';

schedule.scheduleJob(dailyRule, () => {
  updateRooms('DAILY');
});

const weeklyRule = new schedule.RecurrenceRule();
weeklyRule.dayOfWeek = 0;
weeklyRule.tz =  'Etc/UTC';

schedule.scheduleJob(weeklyRule, () => {
  updateRooms('WEEKLY');
});
