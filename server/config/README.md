To configure the number and duration of prompt rooms, modify `roomConfig.json`. Each object in the array defines a single room that will be refreshed (i.e. delete old prompt, create new prompt) on a regular basis. The number of objects in the array will be the number of active rooms at any given time.

The object's `"intervalType"` property indicates whether the room should be refreshed every day (`"daily"`) or week (`"weekly"`). If daily, the property `"hour"` is expected, indicating the hour of the day (0 to 23) that the old room should expire and the new room should be created. Similarly, if weekly, the properties `"hour"` and `"day"` are expected, indicating the hour and day of the week (0 to 6, with 0 being Sunday) that the old room should expire and the new room should be created.

Timezone is America/New_York.

Example: Configuring two daily rooms (refreshed at 3:00 and 15:00) and a weekly room (refreshed at 3:00 on Sundays)

```
[
  {
    "intervalType": "daily",
    "hour": 3
  },
  {
    "intervalType": "daily",
    "hour": 15
  },
  {
    "intervalType": "weekly",
		"day": 0,
    "hour": 3
  }
]
```
