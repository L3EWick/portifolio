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
    img.crossOrigin = "anonymous";

    let x = 50;
    let y = 200;
    let velocity = 0;
    let gravity = 1;
    let isJumping = false;
    let obstacles: { x: number; width: number; height: number }[] = [];
    let score = 0;

    const jump = () => {
      if (!isJumping) {
        isJumping = true;
        velocity = 15;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        jump();
      }
    };

    const handleTouch = () => {
      jump();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouch);
    window.addEventListener('mousedown', handleTouch);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // desenha personagem
      if (img.complete) {
        ctx.save();
        ctx.translate(x + 40, y); // move a origem pro centro do personagem
        ctx.scale(-1, 1); // inverte horizontalmente
        ctx.drawImage(img, 0, 0, img.width, img.height, -40, 0, 40, 40);
        ctx.restore();
      }

      // desenha obstáculos
      ctx.fillStyle = 'red';
      obstacles.forEach(obs => {
        ctx.fillRect(obs.x, 200, obs.width, obs.height);
      });

      // desenha pontuação
      ctx.fillStyle = 'white';
      ctx.font = '20px monospace';
      ctx.fillText(`Score: ${score}`, 20, 40);
    };

    const update = () => {
      if (isJumping) {
        velocity -= gravity;
        y -= velocity;
        if (y >= 200) {
          y = 200;
          isJumping = false;
          velocity = 0;
        }
      }

      // move obstáculos
      for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].x -= 5;

        // colisão
        if (
          x + 40 > obstacles[i].x &&
          x < obstacles[i].x + obstacles[i].width &&
          y + 40 > 200
        ) {
          score = 0;
          obstacles = [];
          break;
        }
      }

      // remove obstáculos que saíram da tela
      obstacles = obstacles.filter(obs => obs.x + obs.width > 0);

      // adiciona novos obstáculos
      if (Math.random() < 0.02) {
        obstacles.push({ x: canvas.width, width: 30 + Math.random() * 20, height: 40 });
      }

      score++;
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
        className="w-full h-full"
      />
    </div>
  );
};
