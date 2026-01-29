import { useEffect, useRef } from 'react';

const Confetti = ({ onComplete }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const confetti = [];
        const confettiCount = 150;
        const colors = ['#f97316', '#ec4899', '#06b6d4', '#10b981', '#f59e0b'];

        class ConfettiPiece {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = -20;
                this.size = Math.random() * 8 + 4;
                this.speedY = Math.random() * 3 + 2;
                this.speedX = Math.random() * 2 - 1;
                this.rotation = Math.random() * 360;
                this.rotationSpeed = Math.random() * 10 - 5;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.opacity = 1;
            }

            update() {
                this.y += this.speedY;
                this.x += this.speedX;
                this.rotation += this.rotationSpeed;

                if (this.y > canvas.height - 100) {
                    this.opacity -= 0.02;
                }
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate((this.rotation * Math.PI) / 180);
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = this.color;
                ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
                ctx.restore();
            }
        }

        // Create confetti
        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                confetti.push(new ConfettiPiece());
            }, i * 10);
        }

        // Animation loop
        let animationId;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            confetti.forEach((piece, index) => {
                piece.update();
                piece.draw();

                if (piece.opacity <= 0) {
                    confetti.splice(index, 1);
                }
            });

            if (confetti.length > 0) {
                animationId = requestAnimationFrame(animate);
            } else {
                onComplete?.();
            }
        };

        animate();

        return () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        };
    }, [onComplete]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
        />
    );
};

export default Confetti;
