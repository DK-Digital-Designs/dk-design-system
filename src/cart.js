/* Commerce demo: quantity controls, running total, sticky cart bar.
   ponytail: plain DOM and a Map. A cart with six products does not need a state library —
   reach for one when there is real cross-page state (see docs/ui-libraries.md). */

const FEE = 600; // cents, flat service fee

function money(cents) {
    const [rand, c] = (cents / 100).toFixed(2).split('.');
    return 'R ' + rand.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + '.' + c;
}

// One runnable check: the grouping branch is the only non-trivial bit here.
console.assert(
    money(14800) === 'R 148.00' && money(123456) === 'R 1 234.56' && money(0) === 'R 0.00',
    'cart.js: money formatting is broken'
);

const cart = new Map(); // id -> qty
const items = document.querySelectorAll('.item[data-id]');
const bar = document.querySelector('.cartbar');
const barTotal = document.querySelector('[data-bar-total]');
const barMeta = document.querySelector('[data-bar-meta]');
const list = document.querySelector('[data-summary-list]');
const empty = document.querySelector('[data-summary-empty]');
const totals = document.querySelector('[data-summary-totals]');
const checkout = document.querySelector('[data-checkout]');

const priceOf = (id) => Number(document.querySelector(`.item[data-id="${id}"]`).dataset.price);
const nameOf = (id) => document.querySelector(`.item[data-id="${id}"] h3`).textContent;

function render() {
    let count = 0;
    let subtotal = 0;
    for (const [id, qty] of cart) {
        count += qty;
        subtotal += qty * priceOf(id);
    }

    for (const item of items) {
        const qty = cart.get(item.dataset.id) ?? 0;
        const control = item.querySelector('.qty');
        if (!control) continue;
        control.classList.toggle('qty--empty', qty === 0);
        control.querySelector('output').textContent = String(qty);
        item.querySelector('[data-dec]').disabled = qty === 0;
    }

    list.replaceChildren(
        ...[...cart].map(([id, qty]) => {
            const li = document.createElement('li');
            const left = document.createElement('span');
            left.textContent = `${qty} × ${nameOf(id)}`;
            const right = document.createElement('span');
            right.textContent = money(qty * priceOf(id));
            li.append(left, right);
            return li;
        })
    );

    empty.hidden = count > 0;
    totals.hidden = count === 0;
    checkout.disabled = count === 0;

    if (count > 0) {
        totals.querySelector('[data-subtotal]').textContent = money(subtotal);
        totals.querySelector('[data-total]').textContent = money(subtotal + FEE);
    }

    bar.classList.toggle('is-up', count > 0);
    barTotal.textContent = money(subtotal + FEE);
    barMeta.textContent = `${count} ${count === 1 ? 'item' : 'items'} · incl. ${money(FEE)} service fee`;
}

document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-inc], [data-dec]');
    if (!btn) return;
    const id = btn.closest('.item').dataset.id;
    const next = (cart.get(id) ?? 0) + (btn.hasAttribute('data-inc') ? 1 : -1);
    if (next <= 0) cart.delete(id);
    else cart.set(id, Math.min(next, 20));
    render();
});

document.querySelector('.chips')?.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    for (const c of document.querySelectorAll('.chip')) c.setAttribute('aria-pressed', String(c === chip));
});

render();
