import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Img,
} from "@react-email/components";
import * as React from "react";

/**
 * Props for the VerifyEmailOTP component
 * @interface VerifyEmailOTPProps
 * @property {string} [recipientName] - The name of the recipient
 * @property {string} otp - The one-time password code (required)
 * @property {number} [expiresInMinutes=15] - Number of minutes until the OTP expires
 * @property {string} [supportEmail="support@example.com"] - Support contact email
 * @property {string} [appName="Your App"] - Name of the application
 * @property {string | null} [actionUrl] - Optional URL for the verification button
 * @property {string | null} [logoUrl] - Optional URL for the company logo
 * @property {string | null} [companyAddress] - Optional company address for footer
 * @property {string} [locale="en-US"] - Locale for internationalization
 */
export interface VerifyEmailOTPProps {
  recipientName?: string;
  otp: string;
  expiresInMinutes?: number;
  supportEmail?: string;
  appName?: string;
  actionUrl?: string | null;
  logoUrl?: string | null;
  companyAddress?: string | null;
  locale?: string;
}

/**
 * Email template for OTP-based email verification
 * Renders a responsive, accessible email with an OTP code and optional verification button
 */
export default function VerifyEmailOTP({
  recipientName,
  otp = "123456",
  expiresInMinutes = 15,
  supportEmail = "support@example.com",
  appName = "Your App",
  actionUrl = null,
  logoUrl = null,
  companyAddress = null,
  locale = "en-US",
}: VerifyEmailOTPProps) {
  if (!otp) {
    throw new Error("OTP is required for VerifyEmailOTP component");
  }

  const verificationUrl = actionUrl
    ? `${actionUrl}${actionUrl.includes("?") ? "&" : "?"}code=${encodeURIComponent(
        otp
      )}`
    : null;

  return (
    <Html lang={locale}>
      <Head>
        <title>Email Verification</title>
      </Head>
      <Preview>
        Your {appName} verification code — expires in {String(expiresInMinutes)} minutes
      </Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          {logoUrl && (
            <Section style={styles.logoSection}>
              <Img
                src={logoUrl}
                alt={`${appName} logo`}
                width="140"
                height="50"
                style={styles.logo}
              />
            </Section>
          )}
          
          <Heading style={styles.heading}>Confirm your email</Heading>
          
          <Text style={styles.greeting}>
            {recipientName ? `Hi ${recipientName},` : "Hello,"}
          </Text>
          
          <Text style={styles.instructions}>
            Use the following verification code to confirm your email for {appName}:
          </Text>
          
          <Section style={styles.otpSection}>
            <Text style={styles.otp}>{otp}</Text>
          </Section>
          
          {verificationUrl && (
            <Section style={styles.buttonSection}>
              <Button style={styles.button} href={verificationUrl}>
                Verify Email
              </Button>
            </Section>
          )}
          
          <Text style={styles.expiry}>
            This code expires in {expiresInMinutes} minutes.
          </Text>
          
          <Section style={styles.footer}>
            <Text style={styles.footerText}>
              Need help?{" "}
              <Link href={`mailto:${supportEmail}`} style={styles.link}>
                Contact support
              </Link>
            </Text>
            
            {companyAddress && (
              <Text style={styles.address}>{companyAddress}</Text>
            )}
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

/**
 * Generate a plain text version of the email for clients that don't support HTML
 */
export function plainText({
  appName = "Your App",
  otp,
  expiresInMinutes = 15,
  supportEmail = "support@example.com",
}: VerifyEmailOTPProps): string {
  if (!otp) throw new Error("OTP is required for plainText");
  return `Your ${appName} verification code: ${otp}

This code will expire in ${expiresInMinutes} minutes.

Need help? Contact ${supportEmail}`;
}

const styles = {
  body: {
    backgroundColor: "#f6f9fc",
    color: "#0f1724",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
    WebkitFontSmoothing: "antialiased",
    margin: "0 auto",
    padding: "0",
  },
  container: {
    backgroundColor: "#ffffff",
    border: "1px solid #f0f0f0",
    borderRadius: "5px",
    margin: "40px auto",
    padding: "20px",
    width: "465px",
    maxWidth: "100%",
  },
  logoSection: {
    marginBottom: "24px",
    textAlign: "center" as const,
  },
  logo: {
    display: "inline-block",
    maxWidth: "100%",
    verticalAlign: "middle",
  },
  heading: {
    color: "#1f2937",
    fontSize: "24px",
    fontWeight: "bold",
    margin: "30px 0",
    padding: "0",
    textAlign: "center" as const,
  },
  greeting: {
    color: "#374151",
    fontSize: "16px",
    lineHeight: "24px",
    margin: "0 0 24px 0",
  },
  instructions: {
    color: "#374151",
    fontSize: "16px",
    lineHeight: "24px",
    margin: "0 0 24px 0",
  },
  otpSection: {
    backgroundColor: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: "5px",
    margin: "24px 0",
    padding: "24px",
    textAlign: "center" as const,
  },
  otp: {
    color: "#1f2937",
    fontFamily: "monospace, ui-monospace, SFMono-Regular",
    fontSize: "32px",
    letterSpacing: "6px",
    margin: "0",
    padding: "0",
  },
  buttonSection: {
    margin: "32px 0",
    textAlign: "center" as const,
  },
  button: {
    backgroundColor: "#0b63ff",
    borderRadius: "5px",
    color: "#ffffff",
    display: "inline-block",
    fontSize: "16px",
    fontWeight: "bold",
    padding: "12px 24px",
    textDecoration: "none",
    textAlign: "center" as const,
    width: "100%",
  },
  expiry: {
    color: "#6b7280",
    fontSize: "14px",
    margin: "0 0 24px 0",
    textAlign: "center" as const,
  },
  footer: {
    borderTop: "1px solid #e5e7eb",
    marginTop: "32px",
    paddingTop: "32px",
  },
  footerText: {
    color: "#6b7280",
    fontSize: "14px",
    margin: "0 0 8px 0",
    textAlign: "center" as const,
  },
  link: {
    color: "#0b63ff",
    textDecoration: "underline",
  },
  address: {
    color: "#9ca3af",
    fontSize: "12px",
    lineHeight: "16px",
    margin: "16px 0 0 0",
    textAlign: "center" as const,
  },
} as const;