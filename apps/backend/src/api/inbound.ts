import { Context } from 'hono';
import { z } from 'zod';

// Inbound email schema for Haraka webhook
const inboundEmailSchema = z.object({
  from: z.string().email(),
  to: z.array(z.string().email()).or(z.string().email()),
  subject: z.string(),
  body: z.string().optional(),
  html: z.string().optional(),
  text: z.string().optional(),
  headers: z.record(z.string()).optional(),
  attachments: z.array(z.object({
    filename: z.string(),
    contentType: z.string(),
    size: z.number(),
    content: z.string().optional(), // base64 encoded
  })).optional(),
  messageId: z.string().optional(),
  inReplyTo: z.string().optional(),
  references: z.array(z.string()).optional(),
  date: z.string().optional(),
});

type InboundEmail = z.infer<typeof inboundEmailSchema>;

// Process inbound email
async function processInboundEmail(email: InboundEmail): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    // Generate unique ID for this email
    const emailId = crypto.randomUUID();
    
    // Log the email for debugging
    console.log(`[INBOUND] Processing email from ${email.from} to ${email.to}`);
    console.log(`[INBOUND] Subject: ${email.subject}`);
    
    // Here you would:
    // 1. Store in database (using D1 for Cloudflare Workers or SQLite for local)
    // 2. Parse and extract data (contacts, replies, etc.)
    // 3. Trigger any webhooks or notifications
    // 4. Auto-reply if needed
    // 5. Update contact status
    
    // Example: Parse for reply detection
    if (email.inReplyTo || email.references?.length) {
      console.log(`[INBOUND] This is a reply to an existing email`);
      // Handle reply logic - update email log status, notify user, etc.
    }
    
    // Example: Extract contact information
    const contactEmail = email.from;
    const contactName = extractNameFromEmail(email.from);
    
    // Store email data
    const emailData = {
      id: emailId,
      from: email.from,
      to: Array.isArray(email.to) ? email.to.join(', ') : email.to,
      subject: email.subject,
      body: email.body || email.text || '',
      html: email.html,
      headers: email.headers,
      attachments: email.attachments,
      receivedAt: new Date().toISOString(),
      processedAt: new Date().toISOString(),
    };
    
    // In production, store to database
    // await db.insert(inboundEmails).values(emailData);
    
    console.log(`[INBOUND] Email processed successfully: ${emailId}`);
    
    return { success: true, id: emailId };
  } catch (error) {
    console.error('[INBOUND] Error processing email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

// Extract name from email address
function extractNameFromEmail(email: string): string {
  const match = email.match(/^([^<@]+)</);
  if (match) {
    return match[1].trim().replace(/"/g, '');
  }
  return email.split('@')[0];
}

// Webhook handler for Haraka inbound emails
export async function inboundEmailWebhook(c: Context) {
  try {
    const body = await c.req.json();
    
    // Validate incoming data
    const validation = inboundEmailSchema.safeParse(body);
    
    if (!validation.success) {
      console.error('[INBOUND] Validation error:', validation.error.errors);
      return c.json({
        success: false,
        error: 'Invalid email data',
        details: validation.error.errors,
      }, 400);
    }
    
    const email = validation.data;
    
    // Process the email
    const result = await processInboundEmail(email);
    
    if (result.success) {
      return c.json({
        success: true,
        message: 'Email received and processed',
        id: result.id,
        timestamp: new Date().toISOString(),
      }, 200);
    } else {
      return c.json({
        success: false,
        error: result.error,
      }, 500);
    }
  } catch (error) {
    console.error('[INBOUND] Webhook error:', error);
    return c.json({
      success: false,
      error: 'Internal server error',
    }, 500);
  }
}

// GET endpoint for email status check
export async function getEmailStatus(c: Context) {
  const id = c.req.query('id');
  
  if (!id) {
    return c.json({ error: 'Missing email ID' }, 400);
  }
  
  // In production, fetch from database
  // const email = await db.select().from(inboundEmails).where(eq(inboundEmails.id, id));
  
  return c.json({
    id,
    status: 'processed',
    timestamp: new Date().toISOString(),
  });
}
