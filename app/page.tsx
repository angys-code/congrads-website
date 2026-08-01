'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Brain, Clock3, Gauge, ScanSearch, ShieldAlert, Sparkles, Activity } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type ModeId = 'off-the-cuff' | 'deep-research';

type Mode = {
    id: ModeId;
    label: string;
    subtitle: string;
    min: number;
    max: number;
    defaultMinutes: number;
    accent: string;
};

type Topic = {
    name: string;
    tag: string;
    summary: string;
    signal: string;
    icon: LucideIcon;
    accent: string;
};

const modes: Mode[] = [
    {
        id: 'off-the-cuff',
        label: 'Off the Cuff',
        subtitle: 'Fast interpretation, sharper instincts, less setup.',
        min: 3,
        max: 12,
        defaultMinutes: 5,
        accent: '#ff4d4d',
    },
    {
        id: 'deep-research',
        label: 'deep research',
        subtitle: 'Slower, denser, and built for layered evidence.',
        min: 15,
        max: 60,
        defaultMinutes: 25,
        accent: '#f7b733',
    },
];

const topics: Topic[] = [
    {
        name: 'Psychology',
        tag: 'cognition / motivation',
        summary: 'Pattern recognition around bias, emotion, identity, and decision-making.',
        signal: 'best for narrative depth',
        icon: Brain,
        accent: '#ff5f5f',
    },
    {
        name: 'Human Behavior',
        tag: 'habits / social cues',
        summary: 'What people do, why they do it, and how context shifts the output.',
        signal: 'ideal for field notes',
        icon: Activity,
        accent: '#ff874d',
    },
    {
        name: 'Body Language',
        tag: 'micro-signals / posture',
        summary: 'Nonverbal positioning, contradictions, comfort, and defensive cues.',
        signal: 'best in quick sessions',
        icon: ScanSearch,
        accent: '#ffbc4d',
    },
    {
        name: 'Neuroscience',
        tag: 'brain / perception',
        summary: 'A cleaner lens on attention, memory, stress response, and learning.',
        signal: 'strongest with deep research',
        icon: Sparkles,
        accent: '#ff6565',
    },
    {
        name: 'Forensics',
        tag: 'evidence / reconstruction',
        summary: 'A methodical approach to clues, timelines, inconsistencies, and verification.',
        signal: 'needs high confidence',
        icon: ShieldAlert,
        accent: '#ff3d3d',
    },
    {
        name: 'Supplementation',
        tag: 'performance / recovery',
        summary: 'Sort signal from hype around dosage, timing, stacking, and response.',
        signal: 'good for comparison grids',
        icon: Gauge,
        accent: '#f7d14d',
    },
];

export default function Home() {
    const [selectedMode, setSelectedMode] = useState<ModeId>('off-the-cuff');
    const [selectedTopic, setSelectedTopic] = useState<Topic>(topics[0]);
    const currentMode = useMemo(
        () => modes.find((mode) => mode.id === selectedMode) ?? modes[0],
        [selectedMode],
    );
    const [timerMinutes, setTimerMinutes] = useState(currentMode.defaultMinutes);

    useEffect(() => {
        setTimerMinutes((current) => {
            if (current < currentMode.min || current > currentMode.max) {
                return currentMode.defaultMinutes;
            }

            return current;
        });
    }, [currentMode]);

    const topicCount = topics.length;
    const presetMinutes = [
        currentMode.min,
        currentMode.defaultMinutes,
        Math.min(currentMode.max, currentMode.defaultMinutes + 10),
        currentMode.max,
    ].filter((value, index, array) => array.indexOf(value) === index);

    const nextModeLabel = currentMode.id === 'off-the-cuff' ? 'quick read' : 'full synthesis';
    const sessionLabel = `${timerMinutes} min`;

    return (
        <main className="min-h-screen overflow-hidden bg-[#050505] text-zinc-100">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,72,72,0.22),transparent_32%),radial-gradient(circle_at_top_right,rgba(255,190,74,0.14),transparent_28%),linear-gradient(180deg,#090909_0%,#050505_48%,#060606_100%)]" />
            <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:84px_84px]" />
            <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle,rgba(255,94,94,0.16),transparent_65%)] blur-3xl" />

            <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 pb-12 pt-6 sm:px-8 lg:px-10">
                <header className="flex items-center justify-between border-b border-white/10 pb-5">
                    <div>
                        <p className="text-xs uppercase tracking-[0.38em] text-zinc-400">Congrads</p>
                        <h1 className="mt-1 text-lg font-semibold text-white">Research interface</h1>
                    </div>

                    <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-zinc-300 md:flex">
                        <span className="h-2 w-2 rounded-full bg-[#ff5b5b] shadow-[0_0_16px_rgba(255,91,91,0.8)]" />
                        Dark mode active
                    </div>
                </header>

                <section className="grid flex-1 gap-8 py-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.25em] text-zinc-300">
                            <Sparkles className="h-3.5 w-3.5 text-[#ffb347]" />
                            Inspired by unprompted.cool
                        </div>

                        <div className="max-w-3xl space-y-5">
                            <h2 className="text-5xl font-semibold tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
                                Dark research for how people think, move, and react.
                            </h2>
                            <p className="max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">
                                Use the same two modes, then tune the timer to move from quick intuition to deeper investigation. The content can pivot between psychology, human behavior, body language, neuroscience, forensics, and supplementation without breaking the visual system.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3 text-sm text-zinc-200">
                            {['Psychology', 'Human behavior', 'Body language', 'Neuroscience', 'Forensics', 'Supplementation'].map((item) => (
                                <span key={item} className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                                    {item}
                                </span>
                            ))}
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3">
                            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                                <p className="text-xs uppercase tracking-[0.24em] text-zinc-400">Topics</p>
                                <p className="mt-3 text-3xl font-semibold text-white">{topicCount}</p>
                                <p className="mt-2 text-sm text-zinc-400">Built-in domains ready to swap instantly.</p>
                            </div>
                            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                                <p className="text-xs uppercase tracking-[0.24em] text-zinc-400">Mode</p>
                                <p className="mt-3 text-3xl font-semibold text-white">{currentMode.label}</p>
                                <p className="mt-2 text-sm text-zinc-400">{currentMode.subtitle}</p>
                            </div>
                            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                                <p className="text-xs uppercase tracking-[0.24em] text-zinc-400">Timer</p>
                                <p className="mt-3 text-3xl font-semibold text-white">{sessionLabel}</p>
                                <p className="mt-2 text-sm text-zinc-400">Adjustable from {currentMode.min} to {currentMode.max} minutes.</p>
                            </div>
                        </div>
                    </div>

                    <aside className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0b0d]/90 p-5 shadow-[0_24px_120px_rgba(0,0,0,0.55)] backdrop-blur-xl">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,127,80,0.16),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(255,213,92,0.12),transparent_30%)]" />

                        <div className="relative space-y-5">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Session console</p>
                                    <h3 className="mt-2 text-2xl font-semibold text-white">Choose a mode, topic, and timer.</h3>
                                </div>
                                <div className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-zinc-300">
                                    {nextModeLabel}
                                </div>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2">
                                {modes.map((mode) => {
                                    const active = selectedMode === mode.id;

                                    return (
                                        <button
                                            key={mode.id}
                                            type="button"
                                            onClick={() => setSelectedMode(mode.id)}
                                            className={`rounded-3xl border p-4 text-left transition duration-200 ${active ? 'border-transparent bg-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]' : 'border-white/10 bg-white/[0.04] hover:bg-white/[0.08]'}`}
                                            style={active ? { boxShadow: `0 0 0 1px ${mode.accent}66, 0 0 32px ${mode.accent}22` } : undefined}
                                        >
                                            <div className="flex items-center justify-between gap-2">
                                                <p className="text-sm font-semibold text-white">{mode.label}</p>
                                                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: mode.accent }} />
                                            </div>
                                            <p className="mt-2 text-sm leading-6 text-zinc-400">{mode.subtitle}</p>
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="rounded-3xl border border-white/10 bg-black/25 p-4">
                                <div className="flex items-center justify-between text-sm text-zinc-300">
                                    <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4 text-[#ffb347]" /> Timer</span>
                                    <span>{sessionLabel}</span>
                                </div>

                                <input
                                    type="range"
                                    min={currentMode.min}
                                    max={currentMode.max}
                                    value={timerMinutes}
                                    onChange={(event) => setTimerMinutes(Number(event.target.value))}
                                    className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-[#ff6a4d]"
                                />

                                <div className="mt-4 flex flex-wrap gap-2">
                                    {presetMinutes.map((minutes) => (
                                        <button
                                            key={minutes}
                                            type="button"
                                            onClick={() => setTimerMinutes(minutes)}
                                            className={`rounded-full border px-3 py-1.5 text-sm transition ${timerMinutes === minutes ? 'border-transparent bg-[#ff5b5b] text-white shadow-[0_0_22px_rgba(255,91,91,0.25)]' : 'border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10'}`}
                                        >
                                            {minutes}m
                                        </button>
                                    ))}
                                </div>

                                <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-zinc-300">
                                    <span>Session type</span>
                                    <span className="text-white">{selectedTopic.name}</span>
                                </div>
                            </div>

                            <button
                                type="button"
                                className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-5 py-4 text-sm font-semibold text-black transition hover:bg-[#ffe8c4]"
                            >
                                Start session
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                            </button>

                            <div className="grid gap-3 sm:grid-cols-3">
                                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                    <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Focus</p>
                                    <p className="mt-2 text-sm text-zinc-200">{selectedTopic.tag}</p>
                                </div>
                                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                    <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Depth</p>
                                    <p className="mt-2 text-sm text-zinc-200">{currentMode.id === 'off-the-cuff' ? 'Fast signal' : 'Layered evidence'}</p>
                                </div>
                                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                    <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Pace</p>
                                    <p className="mt-2 text-sm text-zinc-200">{sessionLabel}</p>
                                </div>
                            </div>
                        </div>
                    </aside>
                </section>

                <section className="pb-6">
                    <div className="mb-5 flex items-end justify-between gap-4">
                        <div>
                            <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">Topic atlas</p>
                            <h3 className="mt-2 text-2xl font-semibold text-white">Swap subjects without changing the atmosphere.</h3>
                        </div>
                        <div className="hidden text-sm text-zinc-400 sm:block">Red and amber tones keep the interface dark but expressive.</div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {topics.map((topic) => {
                            const active = selectedTopic.name === topic.name;
                            const Icon = topic.icon;

                            return (
                                <button
                                    key={topic.name}
                                    type="button"
                                    onClick={() => setSelectedTopic(topic)}
                                    className={`group rounded-[1.75rem] border p-5 text-left transition duration-200 ${active ? 'border-transparent bg-white/10' : 'border-white/10 bg-white/[0.04] hover:bg-white/[0.07]'}`}
                                    style={active ? { boxShadow: `0 0 0 1px ${topic.accent}77, 0 18px 60px rgba(0,0,0,0.35)` } : undefined}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/30" style={{ color: topic.accent }}>
                                                    <Icon className="h-5 w-5" />
                                                </span>
                                                <div>
                                                    <p className="text-lg font-semibold text-white">{topic.name}</p>
                                                    <p className="text-sm text-zinc-400">{topic.tag}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="mt-1 h-2.5 w-2.5 rounded-full" style={{ backgroundColor: topic.accent }} />
                                    </div>

                                    <p className="mt-4 text-sm leading-6 text-zinc-300">{topic.summary}</p>

                                    <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-zinc-400">
                                        {topic.signal}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </section>
            </div>
        </main>
    );
}
