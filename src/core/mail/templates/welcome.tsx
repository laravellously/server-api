import { Heading, Link, Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "./layout";

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

const n: NextStep[] = [
  {
    title: 'Step One',
    description: 'Start Step One'
  }
]

export default function WelcomeEmail({
  recipientName,
  appName = "BluuPay",
  logoUrl,
  supportEmail,
  companyAddress,
  locale,
  nextSteps = n,
  ctaUrl,
}: WelcomeEmailProps) {
  const preview = `Start exploring ${appName} with these quick next steps`;

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
        Welcome to {appName}!
      </Heading>

      <Text className="mb-6 text-base text-gray-700">
        {recipientName ? `Hi ${recipientName},` : "Hello,"} we're excited to have
        you on board. Let's get you started with your new account.
      </Text>

      <Section className="mb-8">
        {nextSteps.map((step, index) => (
          <div key={index} className="mb-4">
            <Text className="m-0 font-semibold text-gray-900">
              {step.title}
            </Text>
            <Text className="m-0 text-gray-700">{step.description}</Text>
          </div>
        ))}
      </Section>

      {ctaUrl && (
        <Section className="mb-8 text-center">
          <Link
            href={ctaUrl}
            className="inline-block rounded-lg bg-[#040CCC] px-6 py-3 text-center text-sm font-semibold text-white no-underline"
          >
            Get Started
          </Link>
        </Section>
      )}
    </EmailLayout>
  );
}