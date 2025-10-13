import * as React from 'react';
export declare class MailService {
    private transporter;
    constructor();
    sendEmail(to: string, subject: string, template: React.ReactElement): Promise<void>;
}
