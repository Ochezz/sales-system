import { Router } from 'express';
import ga from './routes/ga.js'
import member from './routes/member.js';
import channel from './routes/channel.js';
import interested from './routes/interested.js';
import pr from './routes/pr.js';
import popup from './routes/popup.js';
import visit from './routes/visit.js';
import contractor from './routes/contractor.js';
import payments from './routes/payments.js';
import user from './routes/user.js';
import auth from './routes/auth.js';

export default () => {
    const app = Router();
    ga(app);
    member(app);
    channel(app);
    interested(app);
    pr(app);
    popup(app);
    visit(app);
    contractor(app);
    payments(app);
    user(app);
    auth(app);

    return app;
}