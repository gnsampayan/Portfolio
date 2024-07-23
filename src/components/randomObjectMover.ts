// RandomObjectMover.ts
class RandomObjectMover {
    private $object: HTMLElement;
    private $container: HTMLElement | Window;
    private container_is_window: boolean;
    private pixels_per_second: number;
    private current_position: { x: number, y: number };
    private is_running: boolean;
    private boundEvent?: () => void;

    constructor(obj: HTMLElement, container: HTMLElement | Window) {
        this.$object = obj;
        this.$container = container;
        this.container_is_window = container === window;
        this.pixels_per_second = 10;
        this.current_position = { x: 0, y: 0 };
        this.is_running = false;
    }

    // Set the speed of movement in Pixels per Second.
    setSpeed(pxPerSec: number) {
        this.pixels_per_second = pxPerSec;
    }

    private _getContainerDimensions() {
        if (this.container_is_window) {
            return { height: (this.$container as Window).innerHeight, width: (this.$container as Window).innerWidth };
        } else {
            return { height: (this.$container as HTMLElement).clientHeight, width: (this.$container as HTMLElement).clientWidth };
        }
    }

    private _generateNewPosition() {
        const containerSize = this._getContainerDimensions();
        const availableHeight = containerSize.height - this.$object.clientHeight;
        const availableWidth = containerSize.width - this.$object.clientWidth;

        const y = Math.floor(Math.random() * availableHeight);
        const x = Math.floor(Math.random() * availableWidth);

        return { x, y };
    }

    private _calcDelta(a: { x: number, y: number }, b: { x: number, y: number }) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    private _moveOnce() {
        const next = this._generateNewPosition();
        const delta = this._calcDelta(this.current_position, next);
        const speed = Math.round((delta / this.pixels_per_second) * 100) / 100;

        this.$object.style.transition = `transform ${speed}s linear`;
        this.$object.style.transform = `translate3d(${next.x}px, ${next.y}px, 0)`;

        this.current_position = next;
    }

    start() {
        if (this.is_running) {
            return;
        }

        this.$object.style.willChange = 'transform';
        this.$object.style.pointerEvents = 'auto';

        this.boundEvent = this._moveOnce.bind(this);
        this.$object.addEventListener('transitionend', this.boundEvent);

        this._moveOnce();
        this.is_running = true;
    }

    stop() {
        if (!this.is_running) {
            return;
        }

        if (this.boundEvent) {
            this.$object.removeEventListener('transitionend', this.boundEvent);
        }

        this.is_running = false;
    }
}

export default RandomObjectMover;
