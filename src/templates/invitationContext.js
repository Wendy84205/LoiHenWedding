import { useState } from 'react';

export const defaultInvitationContent = {
  couple: {
    groomName: 'Minh Trí',
    groomFullName: 'Nguyễn Minh Trí',
    groomBirthDate: '06.05.1998',
    brideName: 'Thanh Hằng',
    brideFullName: 'Phạm Thanh Hằng',
    brideBirthDate: '20.08.2001',
  },
  families: {
    groomFather: 'Ông. Phạm Minh Hải',
    groomMother: 'Bà. Nguyễn Mai Thu',
    groomAddress: 'TP. Hà Nội',
    brideFather: 'Ông. Trần Anh Tài',
    brideMother: 'Bà. Nguyễn Thanh Mai',
    brideAddress: 'TP. Quảng Ninh',
  },
  event: {
    startsAt: '2027-12-15T10:30:00+07:00',
    venueName: 'Khách sạn Mường Thanh Luxury Quảng Ninh',
    address: 'Phường Bãi Cháy, tỉnh Quảng Ninh',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Muong+Thanh+Luxury+Quang+Ninh',
    lunarDate: 'Tức ngày 17 tháng 11 năm Bính Ngọ',
  },
  copy: {
    intro: 'Trân trọng kính mời bạn đến chung vui cùng gia đình chúng mình.',
    story: 'Giữa muôn vàn gặp gỡ, chúng mình may mắn tìm thấy nhau. Từ những ngày đầu bỡ ngỡ, qua bao vui buồn và thử thách, tình yêu vẫn lớn dần thành sự thấu hiểu và đồng hành.',
    quote: 'Chúng mình gặp nhau giữa dòng đời và rồi chúng mình thuộc về nhau.',
    thankYou: 'Cảm ơn bạn đã dành tình cảm cho chúng mình. Sự hiện diện của bạn chính là món quà ý nghĩa nhất trong ngày trọng đại này.',
  },
  schedule: [
    { time: '10:30', label: 'Đón tiếp khách' },
    { time: '10:45', label: 'Lễ thành hôn' },
    { time: '11:00', label: 'Khai tiệc' },
  ],
  media: {
    hero: '',
    bride: '',
    groom: '',
    couple: '',
    venue: '',
    final: '',
    social: '',
    music: '',
    giftQr: '',
    gallery: [],
  },
  gift: {
    groomQr: '',
    brideQr: '',
  },
};

export function useCommercialInvitation() {
  return null;
}

export function useInvitationContent(fallback) {
  return fallback || defaultInvitationContent;
}

export function useRsvpSubmit() {
  const [state, setState] = useState({ status: 'idle', error: '' });
  const submit = async () => {
    setState({ status: 'success', error: '' });
    return true;
  };
  return { ...state, submit, enabled: false };
}

export function useWishSubmit() {
  const [state, setState] = useState({ status: 'idle', error: '' });
  const submit = async () => {
    setState({ status: 'success', error: '' });
    return true;
  };
  return { ...state, submit, enabled: false };
}
