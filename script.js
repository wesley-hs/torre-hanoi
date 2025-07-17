class TowerOfHanoi {
    constructor() {
        this.towers = [[], [], []];
        this.selectedDisk = null;
        this.selectedTower = null;
        this.moves = 0;
        this.startTime = null;
        this.gameTimer = null;
        this.diskCount = 3;
        this.gameWon = false;
        
        this.initializeGame();
        this.setupEventListeners();
    }

    initializeGame() {
        this.diskCount = parseInt(document.getElementById('disks').value);
        this.resetGame();
        this.renderGame();
        this.updateMinMoves();
    }

    resetGame() {
        this.towers = [[], [], []];
        this.selectedDisk = null;
        this.selectedTower = null;
        this.moves = 0;
        this.startTime = null;
        this.gameWon = false;
        
        // Clear timer
        if (this.gameTimer) {
            clearInterval(this.gameTimer);
            this.gameTimer = null;
        }
        
        // Create disks in first tower (largest to smallest)
        for (let i = this.diskCount; i >= 1; i--) {
            this.towers[0].push(i);
        }
        
        this.updateStats();
        this.clearMessage();
        this.hideVictoryPopup();
    }

    setupEventListeners() {
        document.getElementById('restart').addEventListener('click', () => {
            this.initializeGame();
        });

        document.getElementById('disks').addEventListener('change', () => {
            this.initializeGame();
        });

        document.getElementById('play-again').addEventListener('click', () => {
            this.initializeGame();
        });

        // Add click listeners to towers
        document.querySelectorAll('.tower').forEach(tower => {
            tower.addEventListener('click', (e) => {
                const towerIndex = parseInt(tower.getAttribute('data-tower'));
                this.handleTowerClick(towerIndex);
            });
        });
    }

    handleTowerClick(towerIndex) {
        if (this.gameWon) return;

        // Start timer on first move
        if (!this.startTime) {
            this.startTimer();
        }

        if (this.selectedTower === null) {
            // Select a disk
            if (this.towers[towerIndex].length > 0) {
                this.selectedTower = towerIndex;
                this.selectedDisk = this.towers[towerIndex][this.towers[towerIndex].length - 1];
                this.highlightSelectedDisk();
                this.showMessage(`Disco selecionado! Clique na torre de destino.`);
            } else {
                this.showMessage(`Torre vazia! Selecione uma torre com discos.`);
            }
        } else {
            // Try to move the disk
            if (towerIndex === this.selectedTower) {
                // Deselect
                this.clearSelection();
                this.showMessage(`Disco desselecionado.`);
            } else {
                // Try to move
                this.attemptMove(this.selectedTower, towerIndex);
            }
        }
    }

    attemptMove(fromTower, toTower) {
        const disk = this.towers[fromTower][this.towers[fromTower].length - 1];
        const topDiskOnDestination = this.towers[toTower].length > 0 
            ? this.towers[toTower][this.towers[toTower].length - 1] 
            : null;

        if (topDiskOnDestination === null || disk < topDiskOnDestination) {
            // Valid move
            this.moveDisk(fromTower, toTower);
            this.moves++;
            this.updateStats();
            this.clearSelection();
            this.showMessage(`Movimento válido! Movimentos: ${this.moves}`);
            
            // Check for win
            if (this.towers[2].length === this.diskCount) {
                this.gameWon = true;
                this.showVictory();
            }
        } else {
            // Invalid move
            this.showInvalidMove(toTower);
            this.showMessage(`Movimento inválido! Não pode colocar disco maior sobre menor.`);
        }
    }

    moveDisk(fromTower, toTower) {
        const disk = this.towers[fromTower].pop();
        this.towers[toTower].push(disk);
        this.renderGame();
    }

    clearSelection() {
        this.selectedDisk = null;
        this.selectedTower = null;
        this.clearHighlights();
    }

    highlightSelectedDisk() {
        this.clearHighlights();
        const towerElement = document.getElementById(`tower-${this.selectedTower}`);
        const diskElements = towerElement.querySelectorAll('.disk');
        if (diskElements.length > 0) {
            diskElements[diskElements.length - 1].classList.add('selected');
        }
    }

    showInvalidMove(towerIndex) {
        const tower = document.getElementById(`tower-${towerIndex}`);
        tower.classList.add('invalid');
        setTimeout(() => {
            tower.classList.remove('invalid');
        }, 1000);
    }

    clearHighlights() {
        document.querySelectorAll('.disk').forEach(disk => {
            disk.classList.remove('selected');
        });
        document.querySelectorAll('.tower').forEach(tower => {
            tower.classList.remove('highlight', 'invalid');
        });
    }

    renderGame() {
        document.querySelectorAll('.tower').forEach(tower => {
            const disks = tower.querySelectorAll('.disk');
            disks.forEach(disk => disk.remove());
        });

        this.towers.forEach((tower, towerIndex) => {
            const towerElement = document.getElementById(`tower-${towerIndex}`);
            
            tower.forEach((diskSize, diskIndex) => {
                const diskElement = document.createElement('div');
                diskElement.className = `disk size-${diskSize}`;
                diskElement.style.bottom = `${25 + (diskIndex * 25)}px`;
                
                towerElement.appendChild(diskElement);
            });
        });
    }

    startTimer() {
        this.startTime = Date.now();
        this.gameTimer = setInterval(() => {
            this.updateTimer();
        }, 1000);
    }

    updateTimer() {
        if (!this.startTime) return;
        
        const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        
        document.getElementById('time').textContent = 
            `Tempo: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    updateStats() {
        document.getElementById('moves').textContent = `Movimentos: ${this.moves}`;
    }

    updateMinMoves() {
        const minMoves = Math.pow(2, this.diskCount) - 1;
        document.getElementById('min-moves').textContent = `Mínimo: ${minMoves}`;
    }

    showMessage(message) {
        document.getElementById('message').textContent = message;
        setTimeout(() => {
            this.clearMessage();
        }, 3000);
    }

    clearMessage() {
        document.getElementById('message').textContent = '';
    }

    showVictory() {
        if (this.gameTimer) {
            clearInterval(this.gameTimer);
        }

        const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        const minMoves = Math.pow(2, this.diskCount) - 1;
        
        document.getElementById('final-moves').textContent = this.moves;
        document.getElementById('final-time').textContent = timeString;
        document.getElementById('final-min').textContent = minMoves;
        
        document.getElementById('victory-popup').classList.add('show');
        
        // Add celebration effect
        this.createCelebrationEffect();
    }

    hideVictoryPopup() {
        document.getElementById('victory-popup').classList.remove('show');
    }

    createCelebrationEffect() {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.position = 'fixed';
                confetti.style.width = '10px';
                confetti.style.height = '10px';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.left = Math.random() * window.innerWidth + 'px';
                confetti.style.top = '-10px';
                confetti.style.zIndex = '9999';
                confetti.style.borderRadius = '50%';
                confetti.style.pointerEvents = 'none';
                
                document.body.appendChild(confetti);
                
                const animation = confetti.animate([
                    {
                        transform: 'translateY(0) rotate(0deg)',
                        opacity: 1
                    },
                    {
                        transform: `translateY(${window.innerHeight + 100}px) rotate(720deg)`,
                        opacity: 0
                    }
                ], {
                    duration: 3000,
                    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                });
                
                animation.onfinish = () => {
                    confetti.remove();
                };
            }, i * 100);
        }
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TowerOfHanoi();
});

// Add keyboard controls
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Clear selection on escape
        const game = window.game;
        if (game) {
            game.clearSelection();
            game.showMessage('Seleção cancelada.');
        }
    }
});

// Store game instance globally for debugging
window.addEventListener('load', () => {
    window.game = new TowerOfHanoi();
});
