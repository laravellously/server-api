import * as React from "react";
export interface EmailLayoutProps {
    children: React.ReactNode;
    appName?: string;
    logoUrl?: string;
    supportEmail?: string;
    companyAddress?: string;
    locale?: string;
    preview: string;
}
export default function EmailLayout({ children, appName, logoUrl, supportEmail, companyAddress, locale, preview, }: EmailLayoutProps): React.JSX.Element;
