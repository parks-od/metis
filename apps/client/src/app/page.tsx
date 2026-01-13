import { MainBannerSlider } from '@/components/main-banner-slider';
import { Lightbulb, Users, Trophy, Check } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Header Overlay */}
            <header className="absolute top-0 left-0 right-0 z-50 py-6">
                <div className="container mx-auto px-6 flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold text-white tracking-tighter">
                        METIS <span className="text-sm font-normal opacity-80 ml-2">메티스 경영연구소</span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-8 text-white/90">
                        <Link href="/about" className="hover:text-blue-400 transition-colors">연구소 소개</Link>
                        <Link href="/programs" className="hover:text-blue-400 transition-colors">프로그램</Link>
                        <Link href="/consultants" className="hover:text-blue-400 transition-colors">컨설턴트</Link>
                        <Link
                            href="/inquiry"
                            className="px-6 py-2 bg-blue-600 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors"
                        >
                            상담 신청
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <MainBannerSlider />

            {/* Challenge Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                            이런 고민, 있으신가요?
                        </h2>
                        <p className="text-slate-600 text-lg">
                            많은 조직이 겪고 있는 문제입니다. 메티스가 해결의 실마리를 제공합니다.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <ChallengeCard
                            icon={<Lightbulb className="w-10 h-10 text-yellow-500" />}
                            title="실행되지 않는 전략"
                            desc="화려한 보고서로 끝나는 전시 행정이 아닌, 현장에 즉시 적용 가능한 실용적 전략이 필요합니다."
                        />
                        <ChallengeCard
                            icon={<Users className="w-10 h-10 text-blue-500" />}
                            title="리더십의 부재"
                            desc="변화하는 환경 속에서 구성원을 이끌고 성과를 만들어낼 진짜 리더십 교육이 시급합니다."
                        />
                        <ChallengeCard
                            icon={<Trophy className="w-10 h-10 text-purple-500" />}
                            title="정체된 성과"
                            desc="열심히 일하지만 성과가 나지 않는 조직, 문제의 원인을 정확히 진단하고 처방해야 합니다."
                        />
                    </div>
                </div>
            </section>

            {/* Founder Profile */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        {/* Image Placeholder */}
                        <div className="w-full max-w-md aspect-[4/5] bg-slate-200 rounded-2xl shadow-xl overflow-hidden relative group">
                            <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium">
                                대표 이미지
                            </div>
                            {/* Fallback pattern */}
                            <div className="absolute inset-0 bg-slate-300 animate-pulse" />
                        </div>

                        <div className="flex-1 space-y-8">
                            <div>
                                <span className="text-blue-600 font-bold tracking-wider text-sm uppercase mb-2 block">Founder Message</span>
                                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
                                    조직의 성장을 돕는<br />진정성 있는 파트너
                                </h2>
                                <blockquote className="border-l-4 border-blue-600 pl-6 py-2 text-xl text-slate-700 italic font-medium leading-relaxed">
                                    "컨설팅은 단순한 조언이 아닙니다.<br />
                                    고객과 함께 문제를 정의하고, 끝까지 해결해내는 과정입니다."
                                </blockquote>
                            </div>

                            <div className="space-y-4">
                                <CareerItem text="現 메티스 경영연구소 대표이사" />
                                <CareerItem text="前 글로벌 컨설팅 펌 수석 컨설턴트" />
                                <CareerItem text="경영학 박사 (인사조직 전공)" />
                            </div>

                            <div className="flex flex-wrap gap-2 pt-4">
                                {['조직문화', '리더십코칭', '성과관리', '변화관리'].map((tag) => (
                                    <span key={tag} className="px-4 py-1.5 bg-slate-200 text-slate-700 rounded-full text-sm font-medium">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Expertise */}
            <section className="py-24 bg-slate-900 text-white">
                <div className="container mx-auto px-6">
                    <div className="mb-16">
                        <span className="text-blue-500 font-bold tracking-wider text-sm uppercase mb-2 block">Our Solution</span>
                        <h2 className="text-3xl lg:text-4xl font-bold">
                            조직의 경쟁력을 높이는<br />3가지 전문 영역
                        </h2>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        <ExpertiseCard
                            title="전략/문제해결"
                            items={['비전 및 중장기 전략 수립', '사업 타당성 분석', '디자인 씽킹 워크숍']}
                        />
                        <ExpertiseCard
                            title="리더십/조직개발"
                            items={['임원/팀장 리더십 코칭', '조직문화 진단 및 개선', '갈등 관리 및 소통 교육']}
                            highlight
                        />
                        <ExpertiseCard
                            title="디지털/AI"
                            items={['DX 역량 강화 교육', '생성형 AI 업무 활용', '데이터 기반 의사결정']}
                        />
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="bg-blue-600 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">
                        <div className="flex-1 p-12 lg:p-16 text-white bg-blue-600">
                            <h3 className="text-3xl font-bold mb-6">프로젝트 문의하기</h3>
                            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                                궁금하신 점이 있으시거나 상담이 필요하시면<br />남겨주세요.
                                전문 컨설턴트가 24시간 이내에<br />빠르게 답변 드리겠습니다.
                            </p>
                            <div className="space-y-4 text-blue-100">
                                <p>📞 02-1234-5678</p>
                                <p>📧 contact@metis.com</p>
                            </div>
                        </div>

                        <div className="flex-1 bg-white p-12 lg:p-16">
                            <form className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">이름 / 기업명</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder="입력해주세요" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">연락처</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder="010-0000-0000" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">문의 내용</label>
                                    <textarea className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all h-32 resize-none" placeholder="문의하실 내용을 간단히 적어주세요"></textarea>
                                </div>
                                <button className="w-full bg-slate-900 text-white font-bold py-4 rounded-lg hover:bg-slate-800 transition-colors">
                                    문의하기
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

function ChallengeCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:-translate-y-1 transition-transform duration-300">
            <div className="bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
            <p className="text-slate-600 leading-relaxed break-keep">{desc}</p>
        </div>
    );
}

function CareerItem({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-3 text-slate-700">
            <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-blue-600" />
            </div>
            <span className="font-medium">{text}</span>
        </div>
    );
}

function ExpertiseCard({ title, items, highlight }: { title: string, items: string[], highlight?: boolean }) {
    return (
        <div className={cn(
            "p-8 rounded-3xl border transition-colors h-full flex flex-col",
            highlight ? "bg-blue-600 border-blue-500" : "bg-slate-800 border-slate-700 hover:bg-slate-750"
        )}>
            <h3 className="text-2xl font-bold mb-8">{title}</h3>
            <ul className="space-y-4 mb-8 flex-1">
                {items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                        <span className={cn("w-1.5 h-1.5 rounded-full mt-2.5 shrink-0", highlight ? "bg-white" : "bg-blue-500")} />
                        <span className={cn("text-lg", highlight ? "text-blue-50" : "text-slate-300")}>{item}</span>
                    </li>
                ))}
            </ul>
            <Link
                href="#"
                className={cn(
                    "inline-flex items-center font-semibold mt-auto",
                    highlight ? "text-white hover:text-blue-100" : "text-blue-400 hover:text-blue-300"
                )}
            >
                상세 커리큘럼 보기 <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
        </div>
    );
}
