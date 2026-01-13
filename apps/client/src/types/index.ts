export interface SocialLink {
    id: string;
    platform: 'KAKAO' | 'BLOG' | 'INSTAGRAM' | 'WEB' | 'LINKEDIN' | 'YOUTUBE';
    url: string;
    buttonLabel?: string;
}

export interface Consultant {
    id: string;
    name: string;
    slug: string;
    position: string;
    department?: string;
    phone?: string;
    email?: string;
    profileImage?: string;
    introduction?: string;
    socialLinks?: SocialLink[];
    // Relations
    portfolios?: Portfolio[];
}

export interface Portfolio {
    id: string;
    title: string;
    clientName?: string;
    imageUrl?: string;
    category?: string;
    description?: string;
    periodStart?: string;
    periodEnd?: string;
}
