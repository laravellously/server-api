import * as React from "react";
export interface LoginNotifyEmailProps {
    recipientName?: string;
    appName?: string;
    logoUrl?: string;
    supportEmail?: string;
    companyAddress?: string;
    locale?: string;
    loginLocation: string;
    loginDevice: string;
    loginTime: Date | string;
    securityUrl?: string;
}
export default function LoginNotifyEmail({ recipientName, appName, logoUrl, supportEmail, companyAddress, locale, loginLocation, loginDevice, loginTime, securityUrl, }: LoginNotifyEmailProps): React.JSX.Element;
