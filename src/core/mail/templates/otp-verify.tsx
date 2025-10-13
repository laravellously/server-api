import { Heading, Link, Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "./layout";

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

export default function OTPVerifyEmail({
  recipientName,
  otp = '12345',
  expiresInMinutes = 15,
  appName = "BluuPay",
  logoUrl,
  supportEmail,
  companyAddress,
  locale,
  actionUrl,
}: OTPVerifyEmailProps) {
  if (!otp) {
    throw new Error("OTP is required for OTPVerifyEmail component");
  }

  const preview = `Your ${appName} verification code — expires in ${expiresInMinutes} minutes`;
  const verificationUrl = actionUrl
    ? `${actionUrl}${actionUrl.includes("?") ? "&" : "?"}code=${encodeURIComponent(
        otp
      )}`
    : null;

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
        Verify your email
      </Heading>

      <Text className="mb-6 text-base text-gray-700">
        {recipientName ? `Hi ${recipientName},` : "Hello,"}
      </Text>

      <Text className="mb-6 text-base text-gray-700">
        Use the code below to verify your email for {appName}:
      </Text>

      <Section className="mb-8">
        <div className="rounded-lg bg-gray-50 border border-gray-200 px-6 py-4 text-center">
          <Text className="font-mono text-3xl tracking-[.25em] text-gray-900">
            {otp}
          </Text>
        </div>
      </Section>

      {verificationUrl && (
        <Section className="mb-8 text-center">
          <Link
            href={verificationUrl}
            className="inline-block rounded-lg bg-[#040CCC] px-6 py-3 text-center text-sm font-semibold text-white no-underline"
          >
            Verify Email
          </Link>
        </Section>
      )}

      <Text className="text-center text-sm text-gray-500">
        This code expires in {expiresInMinutes} minutes
      </Text>
    </EmailLayout>
  );
}