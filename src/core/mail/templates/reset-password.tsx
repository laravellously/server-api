import { Heading, Link, Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "./layout";

export interface ResetPasswordEmailProps {
  recipientName?: string;
  appName?: string;
  logoUrl?: string;
  supportEmail?: string;
  companyAddress?: string;
  locale?: string;
  resetUrl: string;
}

export default function ResetPasswordEmail({
  recipientName,
  appName = "BluuPay",
  logoUrl,
  supportEmail,
  companyAddress,
  locale,
  resetUrl,
}: ResetPasswordEmailProps) {
  const preview = `Reset your ${appName} password`;

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
        Reset your password
      </Heading>

      <Text className="mb-6 text-base text-gray-700">
        {recipientName ? `Hi ${recipientName},` : "Hello,"}
      </Text>

      <Text className="mb-6 text-base text-gray-700">
        We received a request to reset your password for {appName}. Click the
        button below to choose a new password.
      </Text>

      <Section className="mb-8 text-center">
        <Link
          href={resetUrl}
          className="inline-block rounded-lg bg-[#040CCC] px-6 py-3 text-center text-sm font-semibold text-white no-underline"
        >
          Reset Password
        </Link>
      </Section>

      <Text className="mb-6 text-sm text-gray-600">
        If the button doesn't work, copy and paste this URL into your browser:
        <br />
        <Link href={resetUrl} className="text-[#040CCC] underline">
          {resetUrl}
        </Link>
      </Text>

      <Text className="text-sm text-gray-500">
        If you didn't request this, you can safely ignore this email.
      </Text>
    </EmailLayout>
  );
}