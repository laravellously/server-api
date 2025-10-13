import { Heading, Link, Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "./layout";

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

export default function LoginNotifyEmail({
  recipientName,
  appName = "BluuPay",
  logoUrl,
  supportEmail,
  companyAddress,
  locale,
  loginLocation,
  loginDevice,
  loginTime,
  securityUrl,
}: LoginNotifyEmailProps) {
  const preview = `Your ${appName} account was accessed from a new device`;
  const formattedTime = loginTime instanceof Date
    ? loginTime.toLocaleString(locale)
    : loginTime;

  return (
    <EmailLayout
      appName={appName}
      logoUrl={logoUrl}
      supportEmail={supportEmail}
      companyAddress={companyAddress}
      locale={locale}
      preview={preview}
    >
      <Heading className="mb-6 text-center text-2xl font-bold text-gray-900">
        New login detected
      </Heading>

      <Text className="mb-6 text-base text-gray-700">
        {recipientName ? `Hi ${recipientName},` : "Hello,"} your {appName} account
        was just accessed.
      </Text>

      <Section className="mb-8">
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="w-full">
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="bg-gray-50 px-4 py-2 text-sm font-medium text-gray-500">
                  Device
                </td>
                <td className="px-4 py-2 text-sm text-gray-900">
                  {loginDevice}
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="bg-gray-50 px-4 py-2 text-sm font-medium text-gray-500">
                  Location
                </td>
                <td className="px-4 py-2 text-sm text-gray-900">
                  {loginLocation}
                </td>
              </tr>
              <tr>
                <td className="bg-gray-50 px-4 py-2 text-sm font-medium text-gray-500">
                  Time
                </td>
                <td className="px-4 py-2 text-sm text-gray-900">
                  {formattedTime}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Text className="mb-6 text-base text-gray-700">
        If this was you, no action is needed. If not, secure your account
        immediately.
      </Text>

      {securityUrl && (
        <Section className="mb-8 text-center">
          <Link
            href={securityUrl}
            className="inline-block rounded-lg border border-gray-300 bg-white px-6 py-3 text-center text-sm font-semibold text-gray-700 no-underline shadow-sm hover:bg-gray-50"
          >
            Review Security Settings
          </Link>
        </Section>
      )}
    </EmailLayout>
  );
}