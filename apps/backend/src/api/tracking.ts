import { eq } from 'drizzle-orm';
import { db, emailLogs } from '../db/index';
import { Request, Response } from 'express';

export async function trackOpen(req: Request, res: Response) {
  const id = req.query.id as string;
  
  if (!id) {
    res.status(400).send('Missing id');
    return;
  }

  const emailId = parseInt(id, 10);
  if (isNaN(emailId)) {
    res.status(400).send('Invalid id');
    return;
  }

  await db.update(emailLogs).set({ 
    openedAt: new Date(),
    updatedAt: new Date()
  }).where(eq(emailLogs.id, emailId));

  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.status(200).send('');
}

export async function trackClick(req: Request, res: Response) {
  const id = req.query.id as string;
  const redirectUrl = req.query.url as string;
  
  if (!id) {
    res.status(400).send('Missing id');
    return;
  }

  const emailId = parseInt(id, 10);
  if (isNaN(emailId)) {
    res.status(400).send('Invalid id');
    return;
  }

  await db.update(emailLogs).set({ 
    clickedAt: new Date(),
    updatedAt: new Date()
  }).where(eq(emailLogs.id, emailId));

  if (redirectUrl) {
    res.redirect(redirectUrl);
    return;
  }

  res.status(200).send('Tracked');
}