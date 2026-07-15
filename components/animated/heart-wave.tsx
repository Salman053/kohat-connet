'use client';

import React, { memo, useEffect, useRef } from 'react';

interface HeartWaveConfig {
    name: string;
    tag: string;
    rotate: boolean;
    particleCount: number;
    trailSpan: number;
    durationMs: number;
    rotationDurationMs: number;
    pulseDurationMs: number;
    strokeWidth: number;
    heartWaveB: number;
    heartWaveRoot: number;
    heartWaveAmp: number;
    heartWaveScaleX: number;
    heartWaveScaleY: number;
    formula: (config: HeartWaveConfig) => string;
    point: (progress: number, detailScale: number, config: HeartWaveConfig) => { x: number; y: number };
}

const defaultConfig: HeartWaveConfig = {
    name: 'Heart Wave',
    tag: 'f(x) Heart Wave',
    rotate: false,
    particleCount: 104,
    trailSpan: 0.18,
    durationMs: 8400,
    rotationDurationMs: 22000,
    pulseDurationMs: 5600,
    strokeWidth: 3.9,
    heartWaveB: 6.4,
    heartWaveRoot: 3.3,
    heartWaveAmp: 0.9,
    heartWaveScaleX: 23.2,
    heartWaveScaleY: 24.5,
    formula(config) {
        return [
            `f(x) = |x|^(2/3) + ${config.heartWaveAmp.toFixed(2)}√(${config.heartWaveRoot.toFixed(2)} - x²) sin(${config.heartWaveB.toFixed(1)}πx)`,
            `screenX = 50 + x · ${config.heartWaveScaleX.toFixed(1)}`,
            `screenY = 18 + (1.75 - f(x))(${config.heartWaveScaleY.toFixed(1)} + 1.5s)`,
        ].join('\n');
    },
    point(progress, detailScale, config) {
        const xLimit = Math.sqrt(config.heartWaveRoot);
        const x = -xLimit + progress * xLimit * 2;
        const safeRoot = Math.max(0, config.heartWaveRoot - x * x);
        const b = config.heartWaveB;
        const wave = config.heartWaveAmp * Math.sqrt(safeRoot) * Math.sin(b * Math.PI * x);
        const curve = Math.pow(Math.abs(x), 2 / 3);
        const y = curve + wave;
        const scaleX = config.heartWaveScaleX;
        const scaleY = config.heartWaveScaleY + detailScale * 1.5;

        return {
            x: 50 + x * scaleX,
            y: 18 + (1.75 - y) * scaleY,
        };
    },
};

export interface HeartWaveProps {
    /** Optional custom configuration */
    config?: Partial<HeartWaveConfig>;
    /** Additional CSS class names */
    className?: string;
    /** Title to display */
    title?: string;
    /** Tag/subtitle to display */
    tag?: string;
    /** Whether to show the formula */
    showFormula?: boolean;
}

export const HeartWave: React.FC<HeartWaveProps> = ({
    config: customConfig,
    className = '',
    title,
    tag,
    showFormula = true,
}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const groupRef = useRef<SVGGElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const formulaRef = useRef<HTMLPreElement>(null);

    const config = { ...defaultConfig, ...customConfig };

    useEffect(() => {
        const group: SVGGElement = groupRef.current!;
        const path: SVGPathElement = pathRef.current!;

        const formulaEl = formulaRef.current;

        if (!group || !path) return;

        // Set stroke width
        path.setAttribute('stroke-width', String(config.strokeWidth));

        // Set formula text
        if (formulaEl) {
            formulaEl.textContent = typeof config.formula === 'function'
                ? config.formula(config)
                : config.formula;
        }

        // Create particles
        const particles: SVGCircleElement[] = [];
        for (let i = 0; i < config.particleCount; i++) {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('fill', 'currentColor');
            group.appendChild(circle);
            particles.push(circle);
        }

        function normalizeProgress(progress: number): number {
            return ((progress % 1) + 1) % 1;
        }

        function getDetailScale(time: number): number {
            const pulseProgress = (time % config.pulseDurationMs) / config.pulseDurationMs;
            const pulseAngle = pulseProgress * Math.PI * 2;
            return 0.52 + ((Math.sin(pulseAngle + 0.55) + 1) / 2) * 0.48;
        }

        function getRotation(time: number): number {
            if (!config.rotate) return 0;
            return -((time % config.rotationDurationMs) / config.rotationDurationMs) * 360;
        }

        function buildPath(detailScale: number, steps: number = 480): string {
            const points: string[] = [];
            for (let i = 0; i <= steps; i++) {
                const point = config.point(i / steps, detailScale, config);
                points.push(`${i === 0 ? 'M' : 'L'} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`);
            }
            return points.join(' ');
        }

        function getParticle(index: number, progress: number, detailScale: number) {
            const tailOffset = index / (config.particleCount - 1);
            const point = config.point(
                normalizeProgress(progress - tailOffset * config.trailSpan),
                detailScale,
                config
            );
            const fade = Math.pow(1 - tailOffset, 0.56);
            return {
                x: point.x,
                y: point.y,
                radius: 0.9 + fade * 2.7,
                opacity: 0.04 + fade * 0.96,
            };
        }

        const startedAt = performance.now();
        let animationId: number;

        function render(now: number) {
            const time = now - startedAt;
            const progress = (time % config.durationMs) / config.durationMs;
            const detailScale = getDetailScale(time);

            group.setAttribute('transform', `rotate(${getRotation(time)} 50 50)`);
            path.setAttribute('d', buildPath(detailScale));

            particles.forEach((node, index) => {
                const particle = getParticle(index, progress, detailScale);
                node.setAttribute('cx', particle.x.toFixed(2));
                node.setAttribute('cy', particle.y.toFixed(2));
                node.setAttribute('r', particle.radius.toFixed(2));
                node.setAttribute('opacity', particle.opacity.toFixed(3));
            });

            animationId = requestAnimationFrame(render);
        }

        animationId = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(animationId);
            // Clean up particles
            particles.forEach((p) => p.remove());
        };
    }, [config]);

    const displayTitle = title || config.name;
    const displayTag = tag || config.tag;

    return (
        <div className={`flex flex-col items-center gap-5 p-8 ${className}`}>
            <div className="w-[min(72vmin,420px)] aspect-square grid place-items-center">
                <svg
                    ref={svgRef}
                    viewBox="0 0 100 100"
                    fill="none"
                    aria-hidden="true"
                    className="w-full h-full overflow-visible"
                >
                    <g ref={groupRef}>
                        <path
                            ref={pathRef}
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            opacity="0.1"
                        />
                    </g>
                </svg>
            </div>

            <div className="grid gap-1.5 text-center">
                <div className="text-[22px] font-bold">{displayTitle}</div>
                <div className="text-[13px] tracking-[0.18em] uppercase text-white/60">
                    {displayTag}
                </div>
            </div>

            {showFormula && (
                <pre
                    ref={formulaRef}
                    className="max-w-[min(92vw,720px)] px-4 py-3.5 border border-white/10 rounded-[14px] bg-white/5 text-white/80 font-mono text-[13px] leading-relaxed whitespace-pre-wrap"
                />
            )}
        </div>
    );
};

export default memo(HeartWave);