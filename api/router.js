import account from '../endpoints/account.js';
import assets from '../endpoints/assets.js';
import consultations from '../endpoints/consultations.js';
import editor from '../endpoints/editor.js';
import exportRsvps from '../endpoints/export.js';
import guests from '../endpoints/guests.js';
import health from '../endpoints/health.js';
import invitationPage from '../endpoints/invitation-page.js';
import invitation from '../endpoints/invitation.js';
import maintenance from '../endpoints/maintenance.js';
import order from '../endpoints/order.js';
import orders from '../endpoints/orders.js';
import preview from '../endpoints/preview.js';
import publish from '../endpoints/publish.js';
import rsvps from '../endpoints/rsvps.js';
import selfPublish from '../endpoints/self-publish.js';
import sitemap from '../endpoints/sitemap.js';
import upload from '../endpoints/upload.js';
import versions from '../endpoints/versions.js';
import wishes from '../endpoints/wishes.js';

const handlers = Object.freeze({
  account,
  assets,
  consultations,
  editor,
  export: exportRsvps,
  guests,
  health,
  invitation,
  'invitation-page': invitationPage,
  maintenance,
  order,
  orders,
  preview,
  publish,
  rsvps,
  'self-publish': selfPublish,
  sitemap,
  upload,
  versions,
  wishes,
});

export default async function handler(req, res) {
  const routeValue = Array.isArray(req.query.route) ? req.query.route[0] : req.query.route;
  const route = String(routeValue || '').replace(/^\/+|\/+$/g, '');
  const routeHandler = handlers[route];
  if (!routeHandler) {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.status(404).json({ error: 'API endpoint not found.' });
    return;
  }
  await routeHandler(req, res);
}
