class BalanceBall {
    constructor(canvasId, options = {}) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');

        // Game settings
        this.settings = {
            gravity: options.gravity || 0.5,
            friction: options.friction || 0.99,
            ballRadius: this.canvas.width * 0.02, // Responsive ball size
            platformWidth: this.canvas.width * 0.15, // Responsive platform width
            platformHeight: this.canvas.height * 0.02, // Responsive platform height
            maxAngle: options.maxAngle || 30,
            levelCount: options.levelCount || 5,
            ...options
        };

        // Game state
        this.currentLevel = 1;
        this.levels = [];
        this.ball = {
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
            lastX: 0,
            lastY: 0
        };
        this.platforms = [];
        this.goal = {
            x: 0,
            y: 0,
            width: this.canvas.width * 0.04,
            height: this.canvas.width * 0.04
        };

        this.score = 0;
        this.isGameOver = false;
        this.isWin = false;
        this.selectedPlatform = null;
        this.touchStartX = null;

        // Make canvas responsive
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        // Generate levels
        this.generateLevels();

        // Touch event listeners
        this.canvas.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        this.canvas.addEventListener('touchmove', (e) => this.handleTouchMove(e));
        this.canvas.addEventListener('touchend', () => this.handleTouchEnd());

        // Keyboard controls
        this.handleKeyDown = this.handleKeyDown.bind(this);
        document.addEventListener('keydown', this.handleKeyDown);

        // Load first level
        this.loadLevel(1);
    }

    resizeCanvas() {
        const container = this.canvas.parentElement;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        const aspectRatio = 4 / 3;

        let width = containerWidth;
        let height = width / aspectRatio;

        if (height > containerHeight) {
            height = containerHeight;
            width = height * aspectRatio;
        }

        this.canvas.width = width;
        this.canvas.height = height;

        // Update responsive dimensions
        this.settings.ballRadius = width * 0.02;
        this.settings.platformWidth = width * 0.15;
        this.settings.platformHeight = height * 0.02;
        this.goal.width = width * 0.04;
        this.goal.height = width * 0.04;
    }

    generateLevels() {
        for (let level = 1; level <= this.settings.levelCount; level++) {
            const platforms = [];
            const platformCount = level + 2; // More platforms for higher levels

            for (let i = 0; i < platformCount; i++) {
                const minX = this.canvas.width * 0.2;
                const maxX = this.canvas.width * 0.8;
                const minY = this.canvas.height * 0.3;
                const maxY = this.canvas.height * 0.8;

                // Ensure platforms are well-distributed
                const sectionWidth = (maxX - minX) / platformCount;
                const x = minX + sectionWidth * i + Math.random() * (sectionWidth * 0.5);
                const y = minY + Math.random() * (maxY - minY);

                platforms.push({
                    x,
                    y,
                    width: this.settings.platformWidth,
                    height: this.settings.platformHeight,
                    angle: 0
                });
            }

            // Set ball start position
            const ballStart = {
                x: this.canvas.width * 0.25,
                y: this.canvas.height * 0.2
            };

            // Set goal position (gets progressively harder to reach)
            const goal = {
                x: this.canvas.width * (0.8 + Math.random() * 0.1),
                y: this.canvas.height * (0.7 + (level / this.settings.levelCount) * 0.2),
                width: this.goal.width,
                height: this.goal.height
            };

            this.levels.push({
                platforms,
                ballStart,
                goal,
                timeLimit: 60 + level * 30, // Increasing time limit per level
                minScore: level * 1000 // Minimum score to advance
            });
        }
    }

    loadLevel(levelNumber) {
        const level = this.levels[levelNumber - 1];
        this.currentLevel = levelNumber;
        this.platforms = level.platforms;
        this.ball = {
            x: level.ballStart.x,
            y: level.ballStart.y,
            vx: 0,
            vy: 0,
            lastX: level.ballStart.x,
            lastY: level.ballStart.y
        };
        this.goal = level.goal;
        this.remainingTime = level.timeLimit;
        this.isGameOver = false;
        this.isWin = false;
    }

    handleTouchStart(event) {
        event.preventDefault();
        const touch = event.touches[0];
        const rect = this.canvas.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        // Find the closest platform to the touch point
        this.selectedPlatform = this.platforms.reduce((closest, platform) => {
            const distance = Math.hypot(platform.x - x, platform.y - y);
            if (!closest || distance < closest.distance) {
                return { platform, distance };
            }
            return closest;
        }, null)?.platform;

        if (this.selectedPlatform) {
            this.touchStartX = x;
        }
    }

    handleTouchMove(event) {
        event.preventDefault();
        if (!this.selectedPlatform || !this.touchStartX) return;

        const touch = event.touches[0];
        const rect = this.canvas.getBoundingClientRect();
        const x = touch.clientX - rect.left;

        // Calculate angle based on touch movement
        const dx = x - this.touchStartX;
        const angleChange = (dx / this.canvas.width) * this.settings.maxAngle;
        this.selectedPlatform.angle = Math.max(
            -this.settings.maxAngle,
            Math.min(this.settings.maxAngle, angleChange)
        );
    }

    handleTouchEnd() {
        this.selectedPlatform = null;
        this.touchStartX = null;
    }

    handleKeyDown(event) {
        if (this.isGameOver) return;

        // Control the platform closest to the ball
        const closestPlatform = this.platforms.reduce((closest, platform) => {
            const distance = Math.hypot(platform.x - this.ball.x, platform.y - this.ball.y);
            if (!closest || distance < closest.distance) {
                return { platform, distance };
            }
            return closest;
        }, null)?.platform;

        if (!closestPlatform) return;

        const angleStep = 5;
        switch (event.key) {
            case 'ArrowLeft':
                closestPlatform.angle = Math.max(closestPlatform.angle - angleStep, -this.settings.maxAngle);
                break;
            case 'ArrowRight':
                closestPlatform.angle = Math.min(closestPlatform.angle + angleStep, this.settings.maxAngle);
                break;
        }
    }

    update() {
        if (this.isGameOver) return;

        // Store previous position
        this.ball.lastX = this.ball.x;
        this.ball.lastY = this.ball.y;

        // Apply gravity
        this.ball.vy += this.settings.gravity;

        // Apply velocity
        this.ball.x += this.ball.vx;
        this.ball.y += this.ball.vy;

        // Apply friction
        this.ball.vx *= this.settings.friction;
        this.ball.vy *= this.settings.friction;

        // Check all platform collisions
        this.platforms.forEach(platform => {
            if (this.checkPlatformCollision(platform)) {
                this.resolveCollision(platform);
            }
        });

        // Check wall collisions with bouncing
        if (this.ball.x < this.settings.ballRadius) {
            this.ball.x = this.settings.ballRadius;
            this.ball.vx = Math.abs(this.ball.vx) * 0.5;
        }
        if (this.ball.x > this.canvas.width - this.settings.ballRadius) {
            this.ball.x = this.canvas.width - this.settings.ballRadius;
            this.ball.vx = -Math.abs(this.ball.vx) * 0.5;
        }

        // Check goal collision
        if (this.checkGoalCollision()) {
            this.handleLevelComplete();
        }

        // Check if ball fell off screen
        if (this.ball.y > this.canvas.height + this.settings.ballRadius) {
            this.isGameOver = true;
            this.isWin = false;
        }
    }

    checkGoalCollision() {
        // Calculate the center of the ball
        const ballCenterX = this.ball.x;
        const ballCenterY = this.ball.y;

        // Calculate the center and half sizes of the goal
        const goalCenterX = this.goal.x + this.goal.width / 2;
        const goalCenterY = this.goal.y + this.goal.height / 2;
        const goalHalfWidth = this.goal.width / 2;
        const goalHalfHeight = this.goal.height / 2;

        // Calculate the closest point on the goal to the ball's center
        const closestX = Math.max(this.goal.x, Math.min(ballCenterX, this.goal.x + this.goal.width));
        const closestY = Math.max(this.goal.y, Math.min(ballCenterY, this.goal.y + this.goal.height));

        // Calculate the distance between the closest point and the ball's center
        const distanceX = ballCenterX - closestX;
        const distanceY = ballCenterY - closestY;
        const distanceSquared = distanceX * distanceX + distanceY * distanceY;

        // Check if the distance is less than the ball's radius
        return distanceSquared < (this.settings.ballRadius * this.settings.ballRadius);
    }

    checkPlatformCollision(platform) {
        // Transform ball position relative to platform
        const angle = platform.angle * Math.PI / 180;
        const cos = Math.cos(-angle);
        const sin = Math.sin(-angle);

        // Get ball position relative to platform center
        const dx = this.ball.x - platform.x;
        const dy = this.ball.y - platform.y;

        // Rotate point
        const rotatedX = dx * cos - dy * sin;
        const rotatedY = dx * sin + dy * cos;

        // Get previous position
        const prevDx = this.ball.lastX - platform.x;
        const prevDy = this.ball.lastY - platform.y;
        const rotatedPrevX = prevDx * cos - prevDy * sin;
        const rotatedPrevY = prevDx * sin + prevDy * cos;

        // Check if ball is within platform bounds
        return (
            Math.abs(rotatedX) < platform.width / 2 + this.settings.ballRadius &&
            Math.abs(rotatedY) < platform.height / 2 + this.settings.ballRadius &&
            // Check if ball was not already colliding in previous frame
            (Math.abs(rotatedPrevX) >= platform.width / 2 + this.settings.ballRadius ||
                Math.abs(rotatedPrevY) >= platform.height / 2 + this.settings.ballRadius)
        );
    }

    resolveCollision(platform) {
        const angle = platform.angle * Math.PI / 180;

        // Calculate normal vector of the platform
        const normalX = Math.sin(angle);
        const normalY = -Math.cos(angle);

        // Calculate relative velocity
        const relativeVelocityX = this.ball.vx;
        const relativeVelocityY = this.ball.vy;

        // Calculate velocity along the normal
        const velocityAlongNormal =
            relativeVelocityX * normalX +
            relativeVelocityY * normalY;

        // Only bounce if we're moving towards the platform
        if (velocityAlongNormal > 0) return;

        // Calculate restitution (bounciness)
        const restitution = 0.7;

        // Calculate impulse scalar
        const impulseScalar = -(1 + restitution) * velocityAlongNormal;

        // Apply impulse
        this.ball.vx += impulseScalar * normalX;
        this.ball.vy += impulseScalar * normalY;

        // Add platform angle influence
        this.ball.vx += Math.sin(angle) * this.settings.gravity * 2;
    }

    handleLevelComplete() {
        if (this.currentLevel < this.settings.levelCount) {
            this.score += 1000 + this.remainingTime * 10;
            this.loadLevel(this.currentLevel + 1);
        } else {
            this.isGameOver = true;
            this.isWin = true;
            this.score += 2000 + this.remainingTime * 20;
        }
    }

    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw background (can be enhanced with gradients/patterns)
        this.ctx.fillStyle = '#f0f0f0';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw platforms
        this.platforms.forEach(platform => {
            this.ctx.save();
            this.ctx.translate(platform.x, platform.y);
            this.ctx.rotate(platform.angle * Math.PI / 180);

            // Platform shadow
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            this.ctx.fillRect(
                -platform.width / 2 + 2,
                -platform.height / 2 + 2,
                platform.width,
                platform.height
            );

            // Platform
            this.ctx.fillStyle = platform === this.selectedPlatform ? '#4a90e2' : '#666';
            this.ctx.fillRect(
                -platform.width / 2,
                -platform.height / 2,
                platform.width,
                platform.height
            );

            this.ctx.restore();
        });

        // Draw goal with glow effect
        this.ctx.shadowBlur = 20;
        this.ctx.shadowColor = '#4CAF50';
        this.ctx.fillStyle = '#4CAF50';
        this.ctx.fillRect(this.goal.x, this.goal.y, this.goal.width, this.goal.height);
        this.ctx.shadowBlur = 0;

        // Draw ball with shadow
        this.ctx.beginPath();
        this.ctx.arc(
            this.ball.x + 2,
            this.ball.y + 2,
            this.settings.ballRadius,
            0,
            Math.PI * 2
        );
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        this.ctx.fill();

        this.ctx.beginPath();
        this.ctx.arc(
            this.ball.x,
            this.ball.y,
            this.settings.ballRadius,
            0,
            Math.PI * 2
        );
        this.ctx.fillStyle = '#e74c3c';
        this.ctx.fill();

        // Draw UI
        this.drawUI();
    }

    drawUI() {
        // Draw level and score
        this.ctx.fillStyle = '#000';
        this.ctx.font = `${this.canvas.width * 0.03}px Arial`;
        this.ctx.fillText(`Level: ${this.currentLevel}`, 10, 30);
        this.ctx.fillText(`Score: ${this.score}`, 10, 60);

        // Draw time remaining
        if (this.remainingTime) {
            this.ctx.fillStyle = this.remainingTime < 30 ? '#e74c3c' : '#000';
            this.ctx.fillText(
                `Time: ${Math.ceil(this.remainingTime)}s`,
                10,
                90
            );
        }

        // Draw game over/win screen
        if (this.isGameOver) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            this.ctx.fillStyle = this.isWin ? '#4CAF50' : '#e74c3c';
            this.ctx.font = `bold ${this.canvas.width * 0.06}px Arial`;
            this.ctx.textAlign = 'center';

            const message = this.isWin ? 'Congratulations!' : 'Game Over';
            this.ctx.fillText(
                message,
                this.canvas.width / 2,
                this.canvas.height / 2 - 40
            );

            this.ctx.font = `${this.canvas.width * 0.04}px Arial`;
            this.ctx.fillText(
                `Final Score: ${this.score}`,
                this.canvas.width / 2,
                this.canvas.height / 2 + 20
            );

            // Draw retry button
            this.drawButton(
                'Tap to Retry',
                this.canvas.width / 2,
                this.canvas.height / 2 + 80
            );
        }

        // Draw touch controls hint
        if (!this.isGameOver && !this.touchStartX) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.font = `${this.canvas.width * 0.025}px Arial`;
            this.ctx.textAlign = 'center';
            this.ctx.fillText(
                'Tap and drag platforms to tilt',
                this.canvas.width / 2,
                this.canvas.height - 20
            );
        }
    }

    drawButton(text, x, y) {
        const width = this.canvas.width * 0.3;
        const height = this.canvas.height * 0.08;
        const radius = 10;

        this.ctx.fillStyle = '#4a90e2';
        this.ctx.beginPath();
        this.ctx.roundRect(x - width / 2, y - height / 2, width, height, radius);
        this.ctx.fill();

        this.ctx.fillStyle = '#fff';
        this.ctx.font = `${this.canvas.width * 0.03}px Arial`;
        this.ctx.fillText(text, x, y + 6);
    }

    gameLoop(timestamp) {
        if (!this.lastTime) this.lastTime = timestamp;
        const deltaTime = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;

        if (!this.isGameOver && this.remainingTime) {
            this.remainingTime -= deltaTime;
            if (this.remainingTime <= 0) {
                this.isGameOver = true;
                this.isWin = false;
            }
        }

        this.update();
        this.draw();
        requestAnimationFrame((t) => this.gameLoop(t));
    }

    start() {
        this.lastTime = null;
        this.gameLoop(0);
    }

    reset() {
        this.score = 0;
        this.loadLevel(1);
    }

    // Handle canvas clicks/touches for button interaction
    handleClick(event) {
        if (!this.isGameOver) return;

        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Check if click is within retry button bounds
        const buttonX = this.canvas.width / 2;
        const buttonY = this.canvas.height / 2 + 80;
        const buttonWidth = this.canvas.width * 0.3;
        const buttonHeight = this.canvas.height * 0.08;

        if (
            x >= buttonX - buttonWidth / 2 &&
            x <= buttonX + buttonWidth / 2 &&
            y >= buttonY - buttonHeight / 2 &&
            y <= buttonY + buttonHeight / 2
        ) {
            this.reset();
        }
    }
}