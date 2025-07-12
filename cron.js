const cron = require("node-cron");

// * second(optional) * min * hour * day of month(1-31) * month(1-12) * day of week(0-6)
cron.schedule("*/1 * * * * *", () => {
  console.log(`Task running every minute ${new Date().toLocaleTimeString}`);
});
