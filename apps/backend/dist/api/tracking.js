"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackOpen = trackOpen;
exports.trackClick = trackClick;
// 1x1 transparent PNG pixel
const TRACKING_PIXEL = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', 'base64');
async function trackOpen(c) {
    const id = c.req.query('id');
    if (!id) {
        return c.text('Missing id', 400);
    }
    const emailId = parseInt(id, 10);
    if (isNaN(emailId)) {
        return c.text('Invalid id', 400);
    }
    try {
        // Log the open event
        console.log(`[TRACKING] Email opened: ${emailId}`);
        // In production, update database
        // await db.update(emailLogs).set({ 
        //   openedAt: new Date(),
        //   updatedAt: new Date() 
        // }).where(eq(emailLogs.id, emailId));
        // Return tracking pixel
        return new Response(TRACKING_PIXEL, {
            headers: {
                'Content-Type': 'image/png',
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
            },
        });
    }
    catch (error) {
        console.error('[TRACKING] Error tracking open:', error);
        return new Response(TRACKING_PIXEL, {
            headers: { 'Content-Type': 'image/png' },
        });
    }
}
async function trackClick(c) {
    const id = c.req.query('id');
    const redirectUrl = c.req.query('url');
    if (!id) {
        return c.text('Missing id', 400);
    }
    const emailId = parseInt(id, 10);
    if (isNaN(emailId)) {
        return c.text('Invalid id', 400);
    }
    try {
        // Log the click event
        console.log(`[TRACKING] Email clicked: ${emailId}, URL: ${redirectUrl}`);
        // In production, update database
        // await db.update(emailLogs).set({ 
        //   clickedAt: new Date(),
        //   updatedAt: new Date() 
        // }).where(eq(emailLogs.id, emailId));
        if (redirectUrl) {
            return c.redirect(redirectUrl);
        }
        return c.text('Tracked');
    }
    catch (error) {
        console.error('[TRACKING] Error tracking click:', error);
        return c.text('Error', 500);
    }
}
//# sourceMappingURL=tracking.js.map