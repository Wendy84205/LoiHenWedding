import React, { createContext, useContext, useMemo, useState } from 'react';
import { normalizeInvitationContent } from './invitationContent.js';
import { submitRsvp, submitWish } from './commerceApi.js';

const CommercialInvitationContext = createContext(null);

export function CommercialInvitationProvider({ invitation, children }) {
  const [wishes, setWishes] = useState(invitation.wishes || []);
  const value = useMemo(() => ({
    invitation,
    content: normalizeInvitationContent(invitation.content),
    wishes,
    async sendRsvp(payload) {
      await submitRsvp({ slug: invitation.slug, guestToken: invitation.guestToken || '', website: '', ...payload });
    },
    async sendWish(payload) {
      await submitWish({ slug: invitation.slug, guestToken: invitation.guestToken || '', website: '', ...payload });
      setWishes((current) => [{ id: `local-${Date.now()}`, full_name: payload.fullName, message: payload.message, created_at: new Date().toISOString() }, ...current]);
    },
  }), [invitation, wishes]);
  return <CommercialInvitationContext.Provider value={value}>{children}</CommercialInvitationContext.Provider>;
}

export function useCommercialInvitation() {
  return useContext(CommercialInvitationContext);
}

export function useInvitationContent(fallback = {}) {
  const commerce = useCommercialInvitation();
  return commerce?.content || normalizeInvitationContent(fallback);
}

export function useRsvpSubmit() {
  const commerce = useCommercialInvitation();
  const [state, setState] = useState({ status: 'idle', error: '' });
  const submit = async (payload) => {
    if (!commerce) {
      setState({ status: 'success', error: '' });
      return true;
    }
    setState({ status: 'loading', error: '' });
    try {
      await commerce.sendRsvp(payload);
      setState({ status: 'success', error: '' });
      return true;
    } catch (error) {
      setState({ status: 'error', error: error.message });
      return false;
    }
  };
  return { ...state, submit, enabled: Boolean(commerce) };
}

export function useWishSubmit() {
  const commerce = useCommercialInvitation();
  const [state, setState] = useState({ status: 'idle', error: '' });
  const submit = async (payload) => {
    if (!commerce) {
      setState({ status: 'success', error: '' });
      return true;
    }
    setState({ status: 'loading', error: '' });
    try {
      await commerce.sendWish(payload);
      setState({ status: 'success', error: '' });
      return true;
    } catch (error) {
      setState({ status: 'error', error: error.message });
      return false;
    }
  };
  return { ...state, submit, enabled: Boolean(commerce) };
}
