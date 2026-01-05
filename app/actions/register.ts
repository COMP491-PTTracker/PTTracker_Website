'use server';

import { Resend } from 'resend';
import { render } from '@react-email/render';
import { WelcomeEmail } from '@/components/emails/WelcomeEmail';

// ============================================================================
// Type Definitions
// ============================================================================

interface SendWelcomeEmailParams {
    email: string;
    temporaryPassword: string;
}

interface SendWelcomeEmailResult {
    success: boolean;
    error?: string;
    data?: {
        emailId: string;
    };
}

// ============================================================================
// Server Action
// ============================================================================

/**
 * Sends a welcome email to a newly registered patient with their temporary credentials.
 * This should be called AFTER the patient has been created in the database.
 *
 * @param params - The email parameters
 * @param params.email - The patient's email address
 * @param params.temporaryPassword - The temporary password that was set for the patient
 * @returns A promise resolving to a SendWelcomeEmailResult object
 */
export async function sendWelcomeEmail(params: SendWelcomeEmailParams): Promise<SendWelcomeEmailResult> {
    const { email, temporaryPassword } = params;

    // Validate inputs
    if (!email || !email.includes('@')) {
        return {
            success: false,
            error: 'Invalid email address provided.',
        };
    }

    if (!temporaryPassword) {
        return {
            success: false,
            error: 'Temporary password is required.',
        };
    }

    // Check for API key
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        console.error('RESEND_API_KEY is not configured');
        return {
            success: false,
            error: 'Email service is not configured. Please contact support.',
        };
    }

    try {
        // Render email to HTML manually (avoids Next.js App Router bundler issue)
        const emailHtml = await render(WelcomeEmail({ email, temporaryPassword }));

        // Initialize Resend client
        const resend = new Resend(apiKey);

        // Send welcome email using HTML instead of react option
        const { data: emailData, error: emailError } = await resend.emails.send({
            from: 'PTTracker <welcome@pttracker.xyz>',
            to: email,
            subject: 'Welcome to PTTracker - Your Login Credentials',
            html: emailHtml,
        });

        if (emailError) {
            console.error('Email sending error:', emailError);
            return {
                success: false,
                error: 'Failed to send welcome email. Please try again or contact support.',
            };
        }

        console.log('Email sent successfully:', emailData?.id);

        return {
            success: true,
            data: {
                emailId: emailData?.id ?? 'unknown',
            },
        };
    } catch (error) {
        console.error('Email error:', error);
        return {
            success: false,
            error: 'An unexpected error occurred while sending the email.',
        };
    }
}
