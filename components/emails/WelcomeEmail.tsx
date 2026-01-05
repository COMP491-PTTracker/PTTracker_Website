import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Preview,
    Section,
    Text,
} from '@react-email/components';
import * as React from 'react';

interface WelcomeEmailProps {
    email: string;
    temporaryPassword: string;
}

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({
    email,
    temporaryPassword,
}) => {
    return (
        <Html>
            <Head />
            <Preview>Welcome to PTTracker - Your login credentials are inside</Preview>
            <Body style={main}>
                <Container style={container}>
                    {/* Header */}
                    <Section style={header}>
                        <Img
                            src="https://pttracker.xyz/assets/pttracker3.png"
                            alt="PTTracker"
                            width="180"
                            height="auto"
                            style={logoImage}
                        />
                    </Section>

                    {/* Main Content */}
                    <Section style={content}>
                        <Heading style={title}>Welcome to PTTracker!</Heading>

                        <Text style={text}>Hello,</Text>

                        <Text style={text}>
                            Your account has been created successfully. Below are your login credentials:
                        </Text>

                        {/* Credentials Box */}
                        <Section style={credentialsBox}>
                            <Text style={label}>Email:</Text>
                            <Text style={value}>{email}</Text>
                            <Text style={label}>Temporary Password:</Text>
                            <Text style={passwordValue}>{temporaryPassword}</Text>
                        </Section>

                        <Text style={warningText}>
                            ⚠️ For security reasons, please change your password after your first login.
                        </Text>

                        {/* Login Button */}
                        <Section style={buttonContainer}>
                            <Button style={button} href="https://pttracker.xyz/login">
                                Login Now
                            </Button>
                        </Section>

                        <Text style={text}>
                            If you did not request this account, please ignore this email or contact our support team.
                        </Text>
                    </Section>

                    {/* Footer */}
                    <Section style={footer}>
                        <Text style={footerText}>
                            © {new Date().getFullYear()} PTTracker. All rights reserved.
                        </Text>
                        <Text style={footerText}>
                            Physical Therapy Progress Tracking Made Simple
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

// Styles
const main: React.CSSProperties = {
    backgroundColor: '#f4f4f5',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
};

const container: React.CSSProperties = {
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
};

const header: React.CSSProperties = {
    backgroundColor: '#0f172a',
    padding: '24px',
    textAlign: 'center' as const,
};

const logoImage: React.CSSProperties = {
    margin: '0 auto',
};

const logo: React.CSSProperties = {
    color: '#ffffff',
    fontSize: '28px',
    fontWeight: 'bold',
    margin: 0,
};

const content: React.CSSProperties = {
    padding: '32px 24px',
};

const title: React.CSSProperties = {
    color: '#0f172a',
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '24px',
    marginTop: 0,
};

const text: React.CSSProperties = {
    color: '#374151',
    fontSize: '16px',
    lineHeight: '24px',
    marginBottom: '16px',
};

const credentialsBox: React.CSSProperties = {
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '24px',
};

const label: React.CSSProperties = {
    color: '#64748b',
    fontSize: '14px',
    marginBottom: '4px',
    marginTop: '0',
};

const value: React.CSSProperties = {
    color: '#0f172a',
    fontSize: '16px',
    fontWeight: '500',
    marginTop: '0',
    marginBottom: '12px',
};

const passwordValue: React.CSSProperties = {
    color: '#0f172a',
    fontSize: '18px',
    fontWeight: 'bold',
    fontFamily: 'monospace',
    backgroundColor: '#fef3c7',
    padding: '4px 8px',
    borderRadius: '4px',
    marginTop: '0',
};

const warningText: React.CSSProperties = {
    color: '#b45309',
    fontSize: '14px',
    backgroundColor: '#fffbeb',
    padding: '12px',
    borderRadius: '6px',
    marginBottom: '24px',
};

const buttonContainer: React.CSSProperties = {
    textAlign: 'center' as const,
    marginBottom: '24px',
};

const button: React.CSSProperties = {
    backgroundColor: '#2563eb',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: 'bold',
    padding: '14px 32px',
    borderRadius: '8px',
    textDecoration: 'none',
};

const footer: React.CSSProperties = {
    backgroundColor: '#f8fafc',
    padding: '24px',
    textAlign: 'center' as const,
    borderTop: '1px solid #e2e8f0',
};

const footerText: React.CSSProperties = {
    color: '#64748b',
    fontSize: '14px',
    margin: '4px 0',
};

export default WelcomeEmail;
