import {
  Body,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Img,
  Tailwind,
} from "@react-email/components";
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

export default function EmailLayout({
  children,
  appName = "BluuPay",
  logoUrl,
  supportEmail = 'support@bluupay.co',
  companyAddress = 'Abuja, Nigeria',
  locale = "en-US",
  preview,
}: EmailLayoutProps) {
  return (
    <Html lang={locale}>
      <Head>
        <title>{appName}</title>
      </Head>
      <Preview>{preview}</Preview>
      <Tailwind>
        <Body className="bg-gray-50 font-sans">
          <Container className="mx-auto my-10 max-w-[600px] rounded-lg bg-white p-8 shadow-sm">
            <Section className="mb-8">
              <div className="flex items-center justify-center">
                {logoUrl && (
                  <Img
                    src={logoUrl}
                    alt={`${appName} logo`}
                    width="140"
                    height="50"
                    className="mb-4"
                  />
                )}
              </div>
            </Section>

            {children}

            <Section className="mt-8 border-t border-gray-200 pt-8">
              {supportEmail && (
                <Text className="mb-4 text-center text-sm text-gray-500">
                  Need help?{" "}
                  <Link
                    href={`mailto:${supportEmail}`}
                    className="text-[#040CCC] underline"
                  >
                    Contact support
                  </Link>
                </Text>
              )}
              {companyAddress && (
                <Text className="text-center text-xs text-gray-400">
                  {companyAddress}
                </Text>
              )}
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}