/* Scroll reveal + count-up, on the platform. No animation library needed for this.
   ponytail: IntersectionObserver covers reveals and counters; reach for GSAP + ScrollTrigger
   only when a section needs pinning or scrubbing (see docs/ui-libraries.md). */

const easeOut = (t) => 1 - (1 - t) ** 3;
const at = (t, target) => Math.round(easeOut(Math.min(t, 1)) * target);

// One runnable check: endpoints must hold, or every counter lands on the wrong number.
console.assert(at(0, 500) === 0 && at(1, 500) === 500, 'reveal.js: count-up easing is broken');

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

function countUp(el) {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix ?? '';
    if (reduced || !Number.isFinite(target)) {
        el.textContent = target + suffix;
        return;
    }
    const start = performance.now();
    const tick = (now) => {
        const t = (now - start) / 1400;
        el.textContent = at(t, target).toLocaleString() + suffix;
        if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
}

const io = new IntersectionObserver(
    (entries) => {
        for (const { target, isIntersecting } of entries) {
            if (!isIntersecting) continue;
            target.classList.add('is-in');
            if (target.dataset.count) countUp(target);
            io.unobserve(target);
        }
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.15 }
);

for (const el of document.querySelectorAll('[data-reveal], [data-count]')) io.observe(el);
