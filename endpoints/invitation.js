import { allowMethod, sendError } from '../server/commerce.js';
import { getInvitationBundle } from '../server/invitations.js';

export default async function handler(req, res) {
  if (!allowMethod(req, res, ['GET'])) return;
  try {
    const slug = String(req.query.slug || '').trim();
    const preview = String(req.query.preview || '').trim();
    const guest = String(req.query.guest || '').trim();
    const invitation = await getInvitationBundle(slug, preview, guest);
    res.status(200).json({ invitation });
  } catch (error) {
    sendError(res, error);
  }
}
