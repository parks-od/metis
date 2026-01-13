import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Mail, Share2, Globe, FileText, Download } from 'lucide-react';
import { cn, formatPhoneNumber } from '@/lib/utils';
import { Consultant } from '@/types';

// Mock data fetcher - replace with fetch(`${process.env.API_URL}/consultants/${slug}`) in real integration
// For MVP, we'll try to fetch but fallback to mock if API not ready or empty
async function getConsultant(slug: string): Promise<Consultant | null> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/consultants/${slug}`, {
            next: { revalidate: 60 },
        });
        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        // Fallback for demo when server isn't running or during build
        if (slug === 'john-doe') {
            return {
                id: '1',
                name: 'John Doe',
                slug: 'john-doe',
                position: 'Senior Consultant',
                department: 'Strategy',
                phone: '01012345678',
                email: 'john@metis.com',
                introduction: '기업의 전략적 의사결정을 돕는 파트너입니다.\n데이터 기반의 분석과 통찰력 있는 제언으로\n고객의 성장을 지원합니다.',
                socialLinks: [
                    { id: '1', platform: 'WEB', url: 'https://metis.com', buttonLabel: 'Website' },
                    { id: '2', platform: 'LINKEDIN', url: 'https://linkedin.com', buttonLabel: 'LinkedIn' },
                ],
                portfolios: [], // Populate if needed
            } as Consultant;
        }
        return null;
    }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const consultant = await getConsultant(params.slug);
    if (!consultant) return { title: 'Consultant Not Found' };

    return {
        title: `${consultant.name} ${consultant.position} | Metis Consulting`,
        description: consultant.introduction,
        openGraph: {
            title: `${consultant.name} - Digital Business Card`,
            description: `${consultant.department} / ${consultant.position}`,
            // images: [consultant.profileImage || '/default-profile.png'],
        },
    };
}

export default async function ConsultantPage({ params }: { params: { slug: string } }) {
    const consultant = await getConsultant(params.slug);

    if (!consultant) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-24 max-w-md mx-auto shadow-2xl overflow-hidden relative">
            {/* Top Pattern */}
            <div className="absolute top-0 left-0 right-0 h-48 bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-transparent to-transparent" />
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
            </div>

            {/* Header Profile */}
            <div className="relative pt-20 px-6 text-center">
                <div className="w-32 h-32 mx-auto rounded-full border-4 border-slate-50 shadow-xl bg-white overflow-hidden relative mb-6">
                    {consultant.profileImage ? (
                        <Image src={consultant.profileImage} alt={consultant.name} fill className="object-cover" />
                    ) : (
                        <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400 text-4xl font-bold">
                            {consultant.name[0]}
                        </div>
                    )}
                </div>

                <div className="space-y-2 mb-8 animate-in slide-in-from-bottom fade-in duration-700">
                    <h1 className="text-2xl font-bold text-slate-900">{consultant.name}</h1>
                    <p className="text-blue-600 font-medium">{consultant.position}</p>
                    <p className="text-slate-500 text-sm">{consultant.department}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center gap-4 mb-10">
                    <ActionButton href={`tel:${consultant.phone}`} icon={<Phone className="w-5 h-5" />} label="Call" primary />
                    <ActionButton href={`mailto:${consultant.email}`} icon={<Mail className="w-5 h-5" />} label="Email" />
                    <ActionButton href="#" icon={<Share2 className="w-5 h-5" />} label="Share" />
                </div>
            </div>

            {/* Body Content */}
            <div className="px-6 space-y-8 animate-in slide-in-from-bottom fade-in duration-700 delay-150">
                {/* Introduction */}
                <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-500" /> About Me
                    </h2>
                    <p className="text-slate-600 leading-relaxed whitespace-pre-line break-keep text-sm">
                        {consultant.introduction || "안녕하세요, 성공적인 비즈니스를 돕는 파트너입니다."}
                    </p>
                </section>

                {/* Social Links */}
                {consultant.socialLinks && consultant.socialLinks.length > 0 && (
                    <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Globe className="w-4 h-4 text-blue-500" /> Channels
                        </h2>
                        <div className="grid gap-3">
                            {consultant.socialLinks.map((link) => (
                                <Link
                                    key={link.id}
                                    href={link.url}
                                    target="_blank"
                                    className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group"
                                >
                                    <span className="font-medium text-slate-700">{link.buttonLabel || link.platform}</span>
                                    <Share2 className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* Portfolios Preview (Optional) */}
                {consultant.portfolios && consultant.portfolios.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold text-slate-900 mb-4 px-2">Recent Projects</h2>
                        <div className="space-y-4">
                            {consultant.portfolios.map(pf => (
                                <div key={pf.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                                    <h3 className="font-bold text-slate-800">{pf.title}</h3>
                                    <p className="text-sm text-slate-500 mt-1">{pf.clientName}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>

            {/* Sticky Footer */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-slate-200 safe-area-pb z-50 md:max-w-md md:mx-auto">
                <button className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2">
                    <Download className="w-5 h-5" />
                    연락처 저장 (vCard)
                </button>
            </div>
        </div>
    );
}

function ActionButton({ href, icon, label, primary }: { href: string, icon: React.ReactNode, label: string, primary?: boolean }) {
    return (
        <div className="flex flex-col items-center gap-2">
            <Link
                href={href}
                className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform hover:-translate-y-1 active:translate-y-0",
                    primary ? "bg-blue-600 text-white" : "bg-white text-slate-700 border border-slate-100"
                )}
            >
                {icon}
            </Link>
            <span className="text-xs font-medium text-slate-500">{label}</span>
        </div>
    );
}
