import * as React from "react";
export interface ResetPasswordEmailProps {
    recipientName?: string;
    appName?: string;
    logoUrl?: string;
    supportEmail?: string;
    companyAddress?: string;
    locale?: string;
    resetUrl: string;
}
export default function ResetPasswordEmail({ recipientName, appName, logoUrl, supportEmail, companyAddress, locale, resetUrl, }: ResetPasswordEmailProps): React.JSX.Element;
