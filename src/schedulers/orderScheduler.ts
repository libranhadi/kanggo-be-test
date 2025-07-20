import cron from 'node-cron';
import { updateOrdersToActive, updateOrdersToCompleted } from '../service/cron/orderCron';
const timezone = 'Asia/Jakarta';
cron.schedule('0 7 * * *', async () => {
try {
    const count = await updateOrdersToActive();
    console.log(`[07:00] Updated ${count} orders to active`);
} catch (error) {
    console.error('[07:00] Error updating to active:', error);
}
}, { timezone });

cron.schedule('0 17 * * *', async () => {
try {
    const count = await updateOrdersToCompleted();
    console.log(`[17:00] Updated ${count} orders to completed`);
} catch (error) {
    console.error('[17:00] Error updating to completed:', error);
}
}, { timezone });