"use client";

import { useEffect, useRef } from "react";

interface GlitterParticlesProps {
    density?: number;
    speed?: number;
    color?: string;
    className?: string;
}

export default function GlitterParticles({
    density = 50,
    speed = 1,
    color = "#D4AF37", // Gold
    className,
}: GlitterParticlesProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        const pixelRatio = window.devicePixelRatio || 1;

        const resize = () => {
            canvas.width = canvas.clientWidth * pixelRatio;
            canvas.height = canvas.clientHeight * pixelRatio;
            ctx.scale(pixelRatio, pixelRatio);
            initParticles();
        };

        // Helper to convert hex to RGB
        const hexToRgb = (hex: string) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result
                ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
                : "212, 175, 55"; // default gold
        };

        interface Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            opacity: number;
            fadeSpeed: number;
        }

        const createParticle = (): Particle => ({
            x: Math.random() * (canvas.clientWidth || 0),
            y: Math.random() * (canvas.clientHeight || 0),
            size: Math.random() * 2 + 0.5,
            speedX: (Math.random() - 0.5) * speed * 0.5,
            speedY: (Math.random() - 0.5) * speed * 0.5,
            opacity: Math.random(),
            fadeSpeed: Math.random() * 0.02 + 0.005
        });

        const updateParticle = (p: Particle) => {
            p.x += p.speedX;
            p.y += p.speedY;
            p.opacity += p.fadeSpeed;

            if (p.opacity > 1 || p.opacity < 0) {
                p.fadeSpeed = -p.fadeSpeed;
            }

            // Wrap around
            if (p.x < 0) p.x = canvas.clientWidth || 0;
            if (p.x > (canvas.clientWidth || 0)) p.x = 0;
            if (p.y < 0) p.y = canvas.clientHeight || 0;
            if (p.y > (canvas.clientHeight || 0)) p.y = 0;
        };

        const drawParticle = (p: Particle) => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${hexToRgb(color)}, ${p.opacity})`;
            ctx.fill();
        };

        const initParticles = () => {
            // Check for reduced motion preference
            const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            if (prefersReducedMotion) return;

            particles = [];
            // Cap density calculation to avoid crushing performance on high-res monitors
            const rawCount = (canvas.clientWidth * canvas.clientHeight) / 10000 * (density / 10);
            const particleCount = Math.min(rawCount, 150); // Hard cap at 150 particles

            for (let i = 0; i < particleCount; i++) {
                particles.push(createParticle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width / pixelRatio, canvas.height / pixelRatio);

            particles.forEach((p) => {
                updateParticle(p);
                drawParticle(p);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener("resize", resize);
        resize();
        animate();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [density, speed, color]);

    return (
        <canvas
            ref={canvasRef}
            className={className}
            style={{ width: "100%", height: "100%", pointerEvents: "none" }}
        />
    );
}
