import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ArrowRight, Trophy, Users, Star } from 'lucide-react';

export function MainBannerSlider() {
    return (
        <section className="relative w-full h-screen min-h-[800px] flex items-center bg-slate-900 overflow-hidden pt-20">
            {/* Background Decor */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900 to-slate-900" />

            <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Text */}
                <div className="space-y-8 animate-in slide-in-from-left duration-700 fade-in">
                    <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight whitespace-pre-line break-keep">
                        공공과 기업의 복잡한 문제를{'\n'}
                        <span className="text-blue-500">실행 가능한 전략</span>으로 전환합니다
                    </h1>
                    <p className="text-lg lg:text-xl text-slate-300 opacity-90 max-w-xl break-keep">
                        단기 강의가 아닌, 조직의 본질적인 변화를 이끄는 맞춤형 솔루션을 제안합니다.
                        메티스 경영연구소는 성장의 파트너입니다.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link
                            href="/programs"
                            className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 group"
                        >
                            교육 프로그램 보기
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/contact"
                            className="px-8 py-4 border border-slate-600 text-white rounded-full font-semibold hover:bg-white/5 transition-colors"
                        >
                            상담 신청하기
                        </Link>
                    </div>
                </div>

                {/* Right Stats Card */}
                <div className="relative animate-in slide-in-from-right duration-700 fade-in">
                    <div className="relative bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-3xl p-8 shadow-2xl">
                        <div className="grid grid-cols-2 gap-8">
                            <StatItem
                                icon={<Trophy className="w-8 h-8 text-yellow-500" />}
                                value="500+"
                                label="누적 교육/컨설팅"
                            />
                            <StatItem
                                icon={<Users className="w-8 h-8 text-blue-500" />}
                                value="120+"
                                label="파트너사"
                            />
                            <StatItem
                                icon={<Star className="w-8 h-8 text-purple-500" />}
                                value="98%"
                                label="고객 만족도"
                            />
                            <StatItem
                                icon={<ArrowRight className="w-8 h-8 text-green-500" />}
                                value="10yr"
                                label="업력"
                            />
                        </div>

                        {/* Decoration */}
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl" />
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl" />
                    </div>
                </div>
            </div>
        </section>
    );
}

function StatItem({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
    return (
        <div className="flex flex-col items-start space-y-2">
            <div className="p-3 bg-slate-900/50 rounded-2xl mb-2">
                {icon}
            </div>
            <span className="text-4xl font-bold text-white">{value}</span>
            <span className="text-slate-400 text-sm">{label}</span>
        </div>
    );
}
