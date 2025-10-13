import * as React from "react";
export interface OTPVerifyEmailProps {
    recipientName?: string;
    otp: string;
    expiresInMinutes?: number;
    appName?: string;
    logoUrl?: string;
    supportEmail?: string;
    companyAddress?: string;
    locale?: string;
    actionUrl?: string;
}
export default function OTPVerifyEmail({ recipientName, otp, expiresInMinutes, appName, logoUrl, supportEmail, companyAddress, locale, actionUrl, }: OTPVerifyEmailProps): React.JSX.Element;
