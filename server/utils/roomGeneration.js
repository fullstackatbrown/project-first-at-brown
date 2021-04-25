require('dotenv').config()

const schedule = require('node-schedule')
const {GoogleSpreadsheet} = require('google-spreadsheet')

const INTERVALS = {
	DAY: "DAY",
	WEEK: "WEEK",
	UNUSED: "UNUSED",
}

const doc = new GoogleSpreadsheet('19SV-3-bjpWGtafXQVVFv2a-kkXhAEau9794Pdh5VVBo')

/**
 * Initializes google spreadsheet connection
 * @return {Promise<void>}
 */
exports.init = async () => {
	await doc.useServiceAccountAuth({
		client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
		private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/gm, '\n'),
	})

	const dailyRule = new schedule.RecurrenceRule()
	dailyRule.hour = 0
	dailyRule.tz = 'Etc/UTC'

	updateRooms(INTERVALS.DAY)
	schedule.scheduleJob(dailyRule, () => updateRooms(INTERVALS.DAY))

	const weeklyRule = new schedule.RecurrenceRule()
	weeklyRule.dayOfWeek = 0
	weeklyRule.tz = 'Etc/UTC'

	schedule.scheduleJob(weeklyRule, () => updateRooms(INTERVALS.WEEK))
}


/**
 * Updates the status of rooms with the given type
 * @param {string} type The type of room to update
 */
const updateRooms = async (type) => {
	await doc.loadInfo()
	console.log("Hey!")

	// Get columns A and B of all rows excluding the header (row 1)
	const sheet = doc.sheetsByIndex[0]
	const rows = await sheet.getRows()
	// Swap `type` <=> 'UNUSED'
	for (let i = 0; i < rows.length; i++) {
		if (rows[i].status === type) {
			rows[i].status = INTERVALS.UNUSED
		} else if (rows[i].status === INTERVALS.UNUSED) {
			rows[i].status = type
		}
	}
	for (const row of rows) row.save()
}
