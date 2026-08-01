'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Activity, Brain, BookOpen, Clock3, ScanSearch, ShieldAlert, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type ModeId = 'off-the-cuff' | 'deep-research';
type SessionPhase = 'idle' | 'scanning' | 'ready' | 'running' | 'paused' | 'finished';

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
    prompts: string[];
};

const modes: Mode[] = [
    {
        id: 'off-the-cuff',
        label: 'Off the Cuff',
        subtitle: 'Fast interpretation, sharper instincts, less setup.',
        min: 3,
        max: 12,
        defaultMinutes: 5,
        accent: '#ff5050',
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
        accent: '#ff6666',
        prompts: [
            'heuristic biases',
            'confirmation bias under stress',
            'self-serving bias in conflict',
            'anchoring effects in judgment',
            'availability bias in memory',
            'loss aversion in decision-making',
            'cognitive dissonance after mistakes',
            'halo effect in first impressions',
            'fundamental attribution error',
            'negativity bias in social evaluation',
            'framing effects in persuasion',
            'sunk cost fallacy in relationships',
            'motivated reasoning in debate',
            'projection bias in assumptions',
            'ego protection and defensiveness',
            'emotional regulation during conflict',
            'social comparison and self-worth',
            'self-esteem and identity defense',
            'personality traits and behavior',
            'habits formed by reward loops',
            'attachment style and trust patterns',
            'implicit memory and habit cues',
            'mindset shifts after failure',
            'attention bias toward threats',
            'coping strategies under pressure',
        ],
    },
    {
        name: 'Human Behavior',
        tag: 'habits / social cues',
        summary: 'What people do, why they do it, and how context shifts the output.',
        signal: 'ideal for field notes',
        icon: Activity,
        accent: '#ff8452',
        prompts: [
            'conformity in group settings',
            'habit loops and friction',
            'decision-making under social pressure',
            'group polarization online',
            'peer influence and identity',
            'social proof in purchasing',
            'bystander effect in emergencies',
            'obedience to authority',
            'rituals that shape behavior',
            'environmental cues and routines',
            'public self versus private self',
            'norms inside close communities',
            'impression management in conversation',
            'micro-habits and repetition',
            'status signals in groups',
            'reactance when controlled',
            'emotional contagion in crowds',
            'habit formation through reward',
            'social anxiety and avoidance',
            'behavioral nudges in daily life',
            'reciprocity and obligation',
            'scarcity cues and urgency',
            'identity-driven choices',
            'ritualized decision patterns',
            'conflict escalation dynamics',
        ],
    },
    {
        name: 'Body Language',
        tag: 'micro-signals / posture',
        summary: 'Nonverbal positioning, contradictions, comfort, and defensive cues.',
        signal: 'best in quick sessions',
        icon: ScanSearch,
        accent: '#ffbf55',
        prompts: [
            'posture shifts during tension',
            'micro-expressions and pauses',
            'defensive gestures in conversation',
            'eye contact and avoidance',
            'hand placement during uncertainty',
            'weight shifting and stance changes',
            'smiles that do not match tone',
            'fidgeting as a stress response',
            'head nods and agreement cues',
            'chin placement and confidence',
            'mirroring and rapport signals',
            'crossed arms in context',
            'pacing and physical restlessness',
            'voice posture and body alignment',
            'self-soothing gestures',
            'open versus closed posture',
            'gesture timing and verbal mismatch',
            'sudden stillness under pressure',
            'leaning forward as engagement',
            'leaning back as distance',
            'touching the face while unsure',
            'lip compression and restraint',
            'foot direction and intention',
            'turning away during discomfort',
            'reaction latency in conversation',
        ],
    },
    {
        name: 'Neuroscience',
        tag: 'brain / perception',
        summary: 'A cleaner lens on attention, memory, stress response, and learning.',
        signal: 'strongest with deep research',
        icon: Sparkles,
        accent: '#ff6a6a',
        prompts: [
            'memory consolidation and sleep',
            'stress response and attention',
            'dopamine, reward, and learning',
            'working memory limits',
            'default mode network activity',
            'neuroplasticity and practice',
            'prefrontal control under fatigue',
            'amygdala activation and threat',
            'attention filtering and salience',
            'habit circuits and repetition',
            'sleep stages and recall',
            'neurotransmitters in motivation',
            'reward prediction error',
            'stress hormones and cognition',
            'decision fatigue and control',
            'learning by spaced repetition',
            'emotion and memory encoding',
            'focus states and distraction',
            'brain fog and cognitive load',
            'dopamine seeking and novelty',
            'executive function under pressure',
            'sensory gating and filtering',
            'neural pathways in habit loops',
            'retrieval cues and recall',
            'sleep deprivation effects on judgment',
        ],
    },
    {
        name: 'Forensics',
        tag: 'evidence / reconstruction',
        summary: 'A methodical approach to clues, timelines, inconsistencies, and verification.',
        signal: 'needs high confidence',
        icon: ShieldAlert,
        accent: '#ff4747',
        prompts: [
            'timeline reconstruction',
            'evidence chain inconsistencies',
            'witness reliability checks',
            'scene contamination risk',
            'pattern inference from clues',
            'alibi verification methods',
            'forensic bias and assumptions',
            'trace evidence interpretation',
            'digital evidence timelines',
            'camera footage corroboration',
            'interview inconsistency analysis',
            'probabilistic reasoning in cases',
            'case reconstruction errors',
            'chain of custody issues',
            'victimology and context',
            'forensic skepticism and limits',
            'scene mapping and spatial logic',
            'suspect behavior and contradiction',
            'cross-checking testimony',
            'hypothesis testing in investigations',
            'misleading physical evidence',
            'pattern matching versus proof',
            'sequence of events analysis',
            'motive opportunity means',
            'forensic documentation standards',
        ],
    },
    {
        name: 'Philosophy',
        tag: 'performance / recovery',
        summary: 'Sort signal from hype around meaning, truth, ethics, and reasoning.',
        signal: 'good for comparison grids',
        icon: BookOpen,
        accent: '#f7d14d',
        prompts: [
            'heuristic biases',
            'the nature of truth',
            'the ethics of persuasion',
            'free will and responsibility',
            'moral relativism versus realism',
            'epistemology of belief',
            'what makes an argument valid',
            'meaning and subjective experience',
            'the problem of other minds',
            'virtue ethics in modern life',
            'stoicism and emotional control',
            'existential anxiety and purpose',
            'the philosophy of identity',
            'justice and fairness',
            'consciousness and perception',
            'determinism versus agency',
            'language and reality',
            'the limits of certainty',
            'pragmatism in decision-making',
            'logic and informal fallacies',
            'theories of the good life',
            'social contract and order',
            'beauty and aesthetics',
            'skepticism and doubt',
            'the role of reason in belief',
        ],
    },
];

const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
};

export default function Home() {
    const [selectedMode] = useState<ModeId>('off-the-cuff');
    const [timerMinutes, setTimerMinutes] = useState(5);
    const [sessionPhase, setSessionPhase] = useState<SessionPhase>('idle');
    const [selectedTopic, setSelectedTopic] = useState<Topic>(topics[0]);
    const [scanTopic, setScanTopic] = useState<Topic | null>(null);
    const [researchSubject, setResearchSubject] = useState('');
    const [scanStep, setScanStep] = useState(0);
    const [secondsLeft, setSecondsLeft] = useState(0);
    const [secondsTotal, setSecondsTotal] = useState(0);

    const currentMode = useMemo(
        () => modes.find((mode) => mode.id === selectedMode) ?? modes[0],
        [selectedMode],
    );

    useEffect(() => {
        setTimerMinutes((current) => {
            if (current < currentMode.min || current > currentMode.max) {
                return currentMode.defaultMinutes;
            }
            return current;
        });
    }, [currentMode]);

    useEffect(() => {
        if (sessionPhase !== 'scanning') {
            return;
        }

        const scanInterval = window.setInterval(() => {
            setScanStep((current) => current + 1);
        }, 130);

        const revealTimeout = window.setTimeout(() => {
            setSessionPhase('ready');
            setScanStep(0);
        }, 2400);

        return () => {
            window.clearInterval(scanInterval);
            window.clearTimeout(revealTimeout);
        };
    }, [sessionPhase]);

    useEffect(() => {
        if (sessionPhase !== 'running') {
            return;
        }

        const countdown = window.setInterval(() => {
            setSecondsLeft((current) => {
                if (current <= 1) {
                    window.clearInterval(countdown);
                    setSessionPhase('finished');
                    return 0;
                }

                return current - 1;
            });
        }, 1000);

        return () => window.clearInterval(countdown);
    }, [sessionPhase]);

    const sessionTopic = scanTopic ?? selectedTopic;
    const scanSubjectPool = sessionTopic.prompts;
    const scanPreview = scanSubjectPool[scanStep % scanSubjectPool.length];
    const timerDisplay = sessionPhase === 'running' ? formatTime(secondsLeft) : `${timerMinutes} min`;
    const progress = secondsTotal > 0 ? ((secondsTotal - secondsLeft) / secondsTotal) * 100 : 0;
    const timerLocked = sessionPhase === 'scanning' || sessionPhase === 'running';
    const canPause = sessionPhase === 'running' || sessionPhase === 'paused';

    const startSession = () => {
        if (sessionPhase === 'scanning' || sessionPhase === 'running') {
            return;
        }

        respinSession();
    };

    const respinSession = () => {
        const subject = selectedTopic.prompts[Math.floor(Math.random() * selectedTopic.prompts.length)];

        setScanTopic(selectedTopic);
        setResearchSubject(subject);
        setScanStep(0);
        setSessionPhase('scanning');
        setSecondsLeft(0);
        setSecondsTotal(timerMinutes * 60);
    };

    const startTimer = () => {
        const totalSeconds = timerMinutes * 60;
        setSecondsTotal(totalSeconds);
        setSecondsLeft(secondsLeft > 0 ? secondsLeft : totalSeconds);
        setSessionPhase('running');
    };

    const pauseTimer = () => {
        if (sessionPhase === 'running') {
            setSessionPhase('paused');
            return;
        }

        if (sessionPhase === 'paused') {
            setSessionPhase('running');
        }
    };

    const stopSession = () => {
        setSessionPhase('idle');
        setScanTopic(null);
        setResearchSubject('');
        setScanStep(0);
        setSecondsLeft(0);
        setSecondsTotal(0);
    };

    const resetSession = () => {
        stopSession();
    };

    const primaryActionLabel = () => {
        if (sessionPhase === 'scanning') return 'Scanning topics...';
        if (sessionPhase === 'ready') return 'Start timer';
        if (sessionPhase === 'paused') return 'Resume timer';
        if (sessionPhase === 'running') return 'Timer running';
        if (sessionPhase === 'finished') return 'Run another session';
        return 'Start session';
    };

    const sessionStatusLabel = () => {
        if (sessionPhase === 'scanning') return 'finding topic';
        if (sessionPhase === 'ready') return 'topic revealed';
        if (sessionPhase === 'paused') return 'timer paused';
        if (sessionPhase === 'running') return 'timer live';
        if (sessionPhase === 'finished') return 'session complete';
        return 'ready to scan';
    };

    const handlePrimaryAction = () => {
        if (sessionPhase === 'scanning' || sessionPhase === 'running') {
            return;
        }

        if (sessionPhase === 'ready') {
            startTimer();
            return;
        }

        if (sessionPhase === 'paused') {
            pauseTimer();
            return;
        }

        if (sessionPhase === 'finished') {
            resetSession();
            startSession();
            return;
        }

        startSession();
    };

    const handleRespin = () => {
        if (sessionPhase === 'scanning') {
            return;
        }

        respinSession();
    };

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
                        {sessionStatusLabel()}
                    </div>
                </header>

                <section className="grid flex-1 gap-8 py-10 lg:grid-cols-[1.06fr_0.94fr] lg:items-center">
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
                                Start a session, let the interface scan for a topic, then launch the timer once the prompt is revealed. The same flow works across psychology, human behavior, body language, neuroscience, forensics, and supplementation.
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
                                <p className="mt-3 text-3xl font-semibold text-white">{topics.length}</p>
                                <p className="mt-2 text-sm text-zinc-400">Built-in domains ready to cycle.</p>
                            </div>
                            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                                <p className="text-xs uppercase tracking-[0.24em] text-zinc-400">Mode</p>
                                <p className="mt-3 text-3xl font-semibold text-white">{currentMode.label}</p>
                                <p className="mt-2 text-sm text-zinc-400">{currentMode.subtitle}</p>
                            </div>
                            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                                <p className="text-xs uppercase tracking-[0.24em] text-zinc-400">Timer</p>
                                <p className="mt-3 text-3xl font-semibold text-white">{timerDisplay}</p>
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
                                    {sessionStatusLabel()}
                                </div>
                            </div>

                            <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-4">
                                {sessionPhase === 'scanning' ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-zinc-500">
                                            <span>Scanning archives</span>
                                            <span>Locking target</span>
                                        </div>
                                        <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01))] p-5">
                                            <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(255,255,255,0.03)_50%,transparent_100%)] animate-[pulse_1.8s_ease-in-out_infinite]" />
                                            <div className="relative flex items-start gap-4">
                                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-black/30 shadow-[0_0_36px_rgba(255,91,91,0.18)]">
                                                    <div className="h-7 w-7 rounded-full border-2 border-[#ff5757] border-t-transparent animate-spin" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Topic preview</p>
                                                    <h4 className="mt-2 text-3xl font-semibold text-white transition-all duration-300">
                                                        {sessionTopic.name}
                                                    </h4>
                                                    <p className="mt-1 text-sm text-zinc-400">Scanning for a subtopic</p>
                                                    <p className="mt-4 text-sm leading-6 text-zinc-300 capitalize">{scanPreview}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-xs text-zinc-500">
                                                <span>Scan progress</span>
                                                <span>{Math.min(100, Math.round((scanStep / 18) * 100))}%</span>
                                            </div>
                                            <div className="h-2 overflow-hidden rounded-full bg-white/10">
                                                <div
                                                    className="h-full rounded-full bg-[linear-gradient(90deg,#ff5555,#ffb347)] transition-all duration-200"
                                                    style={{ width: `${Math.min(100, Math.round((scanStep / 18) * 100))}%` }}
                                                />
                                            </div>
                                        </div>
                                        <p className="text-sm text-zinc-400">
                                            The topic will lock in automatically, then you can start the timer.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-zinc-500">
                                            <span>Session target</span>
                                            <span>{sessionPhase === 'running' ? 'Timer active' : 'Subject locked'}</span>
                                        </div>

                                        <div className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01))] p-5">
                                            <div className="flex items-start gap-4">
                                                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-black/30" style={{ color: sessionTopic.accent }}>
                                                    <sessionTopic.icon className="h-6 w-6" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Research area</p>
                                                    <h4 className="mt-2 text-3xl font-semibold text-white capitalize">{researchSubject || sessionTopic.prompts[0]}</h4>
                                                    <p className="mt-1 text-sm text-zinc-400">{sessionTopic.name}</p>
                                                    <p className="mt-4 text-sm leading-6 text-zinc-300">Study the area through this subtopic, then use the timer to work the idea deeper.</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid gap-3 sm:grid-cols-3">
                                            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                                <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Mode</p>
                                                <p className="mt-2 text-sm text-zinc-200">{currentMode.label}</p>
                                            </div>
                                            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                                <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Timer</p>
                                                <p className="mt-2 text-sm text-zinc-200">{sessionPhase === 'running' ? formatTime(secondsLeft) : `${timerMinutes} minutes`}</p>
                                            </div>
                                            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                                <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Domain</p>
                                                <p className="mt-2 text-sm text-zinc-200">{sessionTopic.name}</p>
                                            </div>
                                        </div>

                                        {sessionPhase === 'running' && (
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-xs text-zinc-500">
                                                    <span>Timer progress</span>
                                                    <span>{Math.max(0, Math.min(100, Math.round(progress)))}%</span>
                                                </div>
                                                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                                                    <div
                                                        className="h-full rounded-full bg-[linear-gradient(90deg,#ff5555,#ffb347)] transition-all duration-200"
                                                        style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {sessionPhase === 'paused' && (
                                            <div className="rounded-2xl border border-[#ffb34733] bg-[#ffb34710] px-4 py-3 text-sm text-zinc-200">
                                                Session paused. Resume to continue from the exact remaining time, or stop to end it.
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="rounded-3xl border border-white/10 bg-black/25 p-4">
                                <div className="flex items-center justify-between text-sm text-zinc-300">
                                    <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4 text-[#ffb347]" /> Timer</span>
                                    <span>{sessionPhase === 'running' ? formatTime(secondsLeft) : `${timerMinutes} min`}</span>
                                </div>

                                <input
                                    type="range"
                                    min={currentMode.min}
                                    max={currentMode.max}
                                    value={timerMinutes}
                                    onChange={(event) => setTimerMinutes(Number(event.target.value))}
                                    disabled={timerLocked}
                                    className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-[#ff6a4d] disabled:cursor-not-allowed disabled:opacity-50"
                                />

                                <div className="mt-4 flex flex-wrap gap-2">
                                    {[currentMode.min, currentMode.defaultMinutes, Math.min(currentMode.max, currentMode.defaultMinutes + 10), currentMode.max]
                                        .filter((value, index, array) => array.indexOf(value) === index)
                                        .map((minutes) => (
                                            <button
                                                key={minutes}
                                                type="button"
                                                onClick={() => setTimerMinutes(minutes)}
                                                disabled={timerLocked}
                                                className={`rounded-full border px-3 py-1.5 text-sm transition ${timerMinutes === minutes ? 'border-transparent bg-[#ff5b5b] text-white shadow-[0_0_22px_rgba(255,91,91,0.25)]' : 'border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10'} ${timerLocked ? 'cursor-not-allowed opacity-60' : ''}`}
                                            >
                                                {minutes}m
                                            </button>
                                        ))}
                                </div>

                                <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-zinc-300">
                                    <span>Research area</span>
                                    <span className="text-white">{selectedTopic.name}</span>
                                </div>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-[1.2fr_0.8fr]">
                                <button
                                    type="button"
                                    onClick={handlePrimaryAction}
                                    className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-5 py-4 text-sm font-semibold text-black transition hover:bg-[#ffe8c4]"
                                >
                                    {primaryActionLabel()}
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                                </button>

                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={pauseTimer}
                                        disabled={!canPause}
                                        className={`rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm font-semibold text-white transition hover:bg-white/10 ${!canPause ? 'cursor-not-allowed opacity-60' : ''}`}
                                    >
                                        {sessionPhase === 'paused' ? 'Resume' : 'Pause'}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={stopSession}
                                        disabled={sessionPhase === 'idle'}
                                        className={`rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm font-semibold text-white transition hover:bg-white/10 ${sessionPhase === 'idle' ? 'cursor-not-allowed opacity-60' : ''}`}
                                    >
                                        Stop
                                    </button>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleRespin}
                                disabled={sessionPhase === 'scanning' || selectedTopic.prompts.length === 0}
                                className={`w-full rounded-2xl border border-[#ffb34733] bg-[#ffb34710] px-5 py-4 text-sm font-semibold text-[#f8e6bd] transition hover:bg-[#ffb3471d] ${sessionPhase === 'scanning' || selectedTopic.prompts.length === 0 ? 'cursor-not-allowed opacity-60' : ''}`}
                            >
                                Respin
                            </button>
                        </div>
                    </aside>
                </section>

                <section className="pb-6">
                    <div className="mb-5 flex items-end justify-between gap-4">
                        <div>
                            <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">Topic atlas</p>
                            <h3 className="mt-2 text-2xl font-semibold text-white">Pick the topic area. The scan reveals the specific subtopic.</h3>
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

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {topic.prompts.slice(0, 2).map((prompt) => (
                                            <span key={prompt} className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-zinc-400">
                                                {prompt}
                                            </span>
                                        ))}
                                    </div>

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
