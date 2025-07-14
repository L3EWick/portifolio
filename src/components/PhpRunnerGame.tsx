import React, { useRef, useEffect, useState } from "react";

interface PhpRunnerGameProps {
  onClose: () => void;
}


const ELEPHANT_SRC = "/assets/sprites/php.png";
const CACTUS_SRC = "/assets/sprites/cactus.png";
const BG_SRC = "/assets/img/background.png";


const GAME_WIDTH = 1024;
const GAME_HEIGHT = 240;
const GROUND_Y = 200;
const GRAVITY = 0.7;
const JUMP_VELOCITY = -12.5;
const OBSTACLE_SPACING = 500;
const OBSTACLE_SPEED = 5;
const ELEPHANT = {
  width: 60,
  height: 60,
  x: 60,
};

type Obstacle = {
  x: number;
  width: number;
  height: number;
  hasScored: boolean;
};

export const PhpRunnerGame: React.FC<PhpRunnerGameProps> = ({ onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [restartKey, setRestartKey] = useState(0);


  const assetsRef = useRef<{
    elephant: HTMLImageElement;
    cactus: HTMLImageElement;
    bg: HTMLImageElement;
  }>();

  useEffect(() => {

    const elephant = new window.Image();
    elephant.src = ELEPHANT_SRC;
    const cactus = new window.Image();
    cactus.src = CACTUS_SRC;
    const bg = new window.Image();
    bg.src = BG_SRC;
    let loaded = 0;
    const checkLoaded = () => {
      loaded++;
      if (loaded === 3) setIsReady(true);
    };
    elephant.onload = checkLoaded;
    cactus.onload = checkLoaded;
    bg.onload = checkLoaded;
    assetsRef.current = { elephant, cactus, bg };

  }, [restartKey]);

  useEffect(() => {
    if (!isReady) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationId: number;
    let running = true;


    let elephantY = GROUND_Y - ELEPHANT.height;
    let velocityY = 0;
    let isJumping = false;
    let obstacles: Obstacle[] = [];
    let localScore = 0;
    const startTime = performance.now();


    const resetObstacles = () => {
      obstacles = [];
      for (let i = 0; i < 3; i++) {
        const x = GAME_WIDTH + i * OBSTACLE_SPACING;
        const height = 40 + Math.floor(Math.random() * 32);
        const width = 23 + Math.floor(Math.random() * 13);
        obstacles.push({ x, width, height, hasScored: false });
      }
    };

    const resetGame = () => {
      running = true;
      setGameOver(false);
      setScore(0);
      localScore = 0;
      elephantY = GROUND_Y - ELEPHANT.height;
      velocityY = 0;
      isJumping = false;
      resetObstacles();
      draw();
      requestAnimationFrame(gameLoop);
    };


    const draw = () => {
      ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

      const bgImg = assetsRef.current?.bg;
      if (bgImg) {
        ctx.drawImage(bgImg, 0, 0, GAME_WIDTH, GAME_HEIGHT);
      } else {
        ctx.fillStyle = "#222";
        ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
      }

      ctx.fillStyle = "#888";
      ctx.fillRect(0, GROUND_Y, GAME_WIDTH, 4);

      for (const ob of obstacles) {
        const cactusImg = assetsRef.current?.cactus;
        if (cactusImg) {
          ctx.drawImage(
            cactusImg,
            ob.x,
            GROUND_Y - ob.height,
            ob.width,
            ob.height
          );
        } else {
          ctx.fillStyle = "#0a0";
          ctx.fillRect(ob.x, GROUND_Y - ob.height, ob.width, ob.height);
        }
      }

      const eleImg = assetsRef.current?.elephant;
      if (eleImg) {
        ctx.drawImage(
          eleImg,
          ELEPHANT.x,
          elephantY,
          ELEPHANT.width,
          ELEPHANT.height
        );
      } else {
        ctx.fillStyle = "#fff";
        ctx.fillRect(
          ELEPHANT.x,
          elephantY,
          ELEPHANT.width,
          ELEPHANT.height
        );
      }

      ctx.fillStyle = "#000";
      ctx.fillRect(10, 10, 160, 60);

      ctx.font = "20px monospace";
      ctx.fillStyle = "#fff";
      ctx.fillText(`Pontos: ${localScore}`, 20, 35);
      const elapsedSeconds = Math.floor((performance.now() - startTime) / 1000);
      ctx.fillText(`Tempo: ${elapsedSeconds}s`, 20, 60);
    };


    const isColliding = (ob: Obstacle) => {

      const ex = ELEPHANT.x, ey = elephantY, ew = ELEPHANT.width, eh = ELEPHANT.height;
      const ox = ob.x, oy = GROUND_Y - ob.height, ow = ob.width, oh = ob.height;
      return (
        ex < ox + ow &&
        ex + ew > ox &&
        ey < oy + oh &&
        ey + eh > oy
      );
    };


    function gameLoop() {
      if (!running) return;

      velocityY += GRAVITY;
      elephantY += velocityY;
      if (elephantY > GROUND_Y - ELEPHANT.height) {
        elephantY = GROUND_Y - ELEPHANT.height;
        velocityY = 0;
        isJumping = false;
      }

      for (const ob of obstacles) {
        ob.x -= OBSTACLE_SPEED;
      }

      if (obstacles.length && obstacles[0].x + obstacles[0].width < 0) {
        obstacles.shift();

        const last = obstacles[obstacles.length - 1];
        const x = last.x + OBSTACLE_SPACING;
        const height = 40 + Math.floor(Math.random() * 32);
        const width = 23 + Math.floor(Math.random() * 13);
        obstacles.push({ x, width, height, hasScored: false });
      }

      for (const ob of obstacles) {
        if (!ob.hasScored && ob.x + ob.width < ELEPHANT.x) {
          ob.hasScored = true;
          localScore += 1;
          setScore(localScore);
        }
      }

      for (const ob of obstacles) {
        if (isColliding(ob)) {
          running = false;
          setGameOver(true);
          draw();
          return;
        }
      }
      draw();
      animationId = requestAnimationFrame(gameLoop);
    }


    const jump = () => {
      if (!isJumping && !gameOver) {
        velocityY = JUMP_VELOCITY;
        isJumping = true;
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.code === "Space" || e.code === "ArrowUp") && !gameOver) {
        jump();
      }
      if ((e.code === "Space" || e.code === "ArrowUp") && gameOver) {
        handleRestart();
      }
    };
    const onTouchStart = () => {
      if (!gameOver) jump();
      else handleRestart();
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("mousedown", onTouchStart);


    resetGame();

    function handleRestart() {
      setRestartKey((k) => k + 1);
    }


    return () => {
      running = false;
      cancelAnimationFrame(animationId);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("mousedown", onTouchStart);
    };

  }, [isReady, restartKey]);


  const handleRestart = () => {
    setRestartKey((k) => k + 1);
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center"
      style={{ width: GAME_WIDTH, height: GAME_HEIGHT, margin: "0 auto" }}
    >
      {gameOver && (
        <div className="absolute inset-0 bg-black bg-opacity-70 z-20 flex flex-col items-center justify-center">
          <div className="text-white text-2xl mb-2">Game Over!</div>
          <div className="text-white text-lg mb-4">Pontuação: {score}</div>
          <button
            onClick={handleRestart}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Jogar Novamente
          </button>
        </div>
      )}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 z-30 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
      >
        Fechar
      </button>
      <canvas
        ref={canvasRef}
        width={GAME_WIDTH}
        height={GAME_HEIGHT}
        className="block w-full h-full bg-black border border-gray-700 rounded"
        tabIndex={0}
        style={{ outline: "none" }}
      />
    </div>
  );
};