import * as React from "react";
interface NextStep {
    title: string;
    description: string;
}
export interface WelcomeEmailProps {
    recipientName?: string;
    appName?: string;
    logoUrl?: string;
    supportEmail?: string;
    companyAddress?: string;
    locale?: string;
    nextSteps: NextStep[];
    ctaUrl?: string;
}
export default function WelcomeEmail({ recipientName, appName, logoUrl, supportEmail, companyAddress, locale, nextSteps, ctaUrl, }: WelcomeEmailProps): React.JSX.Element;
export {};
