import React, { useRef, useEffect } from 'react';

interface PhpRunnerGameProps {
  onClose: () => void;
}

export const PhpRunnerGame: React.FC<PhpRunnerGameProps> = ({ onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = '/assets/sprites/php.png';
    img.crossOrigin = 'anonymous';

    let x = 50;
    let y = 200;
    let velocity = 0;
    let gravity = 1;
    let isJumping = false;
    let obstacles: { x: number; width: number; height: number; passed?: boolean }[] = [];
    let score = 0;
    const groundY = canvas.height - 100;
    const phpWidth = 80;
    const phpHeight = 80;

    const jump = () => {
      if (!isJumping) {
        isJumping = true;
        velocity = 18;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') jump();
    };

    const handleTouch = () => jump();

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouch);
    window.addEventListener('mousedown', handleTouch);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // desenha personagem (elefante PHP)
      if (img.complete) {
        ctx.save();
        ctx.translate(x + phpWidth, y); // move a origem pro centro
        ctx.scale(-1, 1); // inverte horizontalmente
        ctx.drawImage(img, 0, 0, img.width, img.height, -phpWidth, 0, phpWidth, phpHeight);
        ctx.restore();
      }

      // obstáculos
      ctx.fillStyle = 'red';
      obstacles.forEach((obs) => {
        ctx.fillRect(obs.x, groundY - obs.height, obs.width, obs.height);
      });

      // pontuação
      ctx.fillStyle = 'white';
      ctx.font = '20px monospace';
      ctx.fillText(`Pulos certos: ${score}`, 20, 40);
    };

    const update = () => {
      if (isJumping) {
        velocity -= gravity;
        y -= velocity;
        if (y >= groundY - phpHeight) {
          y = groundY - phpHeight;
          isJumping = false;
          velocity = 0;
        }
      }

      // move obstáculos
      obstacles.forEach((obs) => {
        obs.x -= 5;

        // colisão
        const collided =
          x + phpWidth > obs.x &&
          x < obs.x + obs.width &&
          y + phpHeight > groundY - obs.height;

        if (collided) {
          score = 0;
          obstacles = [];
          return;
        }

        // passou com sucesso
        if (!obs.passed && obs.x + obs.width < x) {
          score++;
          obs.passed = true;
        }
      });

      // remove obstáculos fora da tela
      obstacles = obstacles.filter((obs) => obs.x + obs.width > 0);

      // adiciona novos obstáculos com maior espaçamento
      if (Math.random() < 0.015) {
        const width = 40 + Math.random() * 30;
        const height = 40 + Math.random() * 30;
        const lastX = obstacles.length > 0 ? obstacles[obstacles.length - 1].x : 0;
        if (canvas.width - lastX > 300) {
          obstacles.push({ x: canvas.width + 100, width, height });
        }
      }

      draw();
      requestAnimationFrame(update);
    };

    img.onload = () => {
      update();
    };

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouch);
      window.removeEventListener('mousedown', handleTouch);
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
      >
        Fechar
      </button>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        className="w-full h-full touch-none"
      />
    </div>
  );
};