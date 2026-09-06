import Bull from 'bull';
import { sendStatusEmail } from '../config/mailer.js';

let emailQueue = null;
const isRedisEnabled = process.env.ENABLE_REDIS === 'true';

const createQueue = () => {
    if (!isRedisEnabled || !process.env.REDIS_URL) {
        console.log('Email queue disabled — emails will be sent directly via mailer.');
        return;
    }

    try {
        const redisUrl = new URL(process.env.REDIS_URL);

        emailQueue = new Bull('emailQueue', {
            redis: {
                host: redisUrl.hostname,
                port: Number(redisUrl.port),
                password: redisUrl.password,
                tls: {},
                enableReadyCheck: false,
                maxRetriesPerRequest: null,
                retryStrategy: (times) => {
                    if (times > 2) return null;
                    return 1000;
                }
            },
            defaultJobOptions: {
                attempts: 3,
                backoff: { type: 'exponential', delay: 2000 }
            }
        });

        emailQueue.process(async (job) => {
            const { toEmail, seekerName, jobTitle, company, status, interviewDate } = job.data;
            await sendStatusEmail(toEmail, seekerName, jobTitle, company, status, interviewDate);
            console.log(`Email sent to ${toEmail} — status: ${status}`);
        });

        emailQueue.on('ready', () => {
            console.log('Email queue ready');
        });

        emailQueue.on('completed', (job) => {
            console.log(`Email job ${job.id} completed`);
        });

        emailQueue.on('failed', (job, error) => {
            console.log(`Email job ${job.id} failed:`, error.message);
        });

        emailQueue.on('error', (error) => {
            if (error.message.includes('ECONNRESET') || error.message.includes('ETIMEDOUT') || error.message.includes('ENOTFOUND')) {
                return;
            }
            console.log('Queue error:', error.message);
        });

    } catch (err) {
        console.log('Queue creation failed:', err.message);
    }
};

createQueue();

export default {
    add: async (data) => {
        if (!emailQueue) {
            try {
                const { toEmail, seekerName, jobTitle, company, status, interviewDate } = data;
                await sendStatusEmail(toEmail, seekerName, jobTitle, company, status, interviewDate);
                console.log(`Email sent directly to ${toEmail} — status: ${status}`);
            } catch (err) {
                console.log('Direct email fallback failed:', err.message);
            }
            return;
        }
        try {
            await emailQueue.add(data);
        } catch (err) {
            console.log('Queue add failed (non-critical):', err.message);
        }
    }
};