// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { initReveal } from './reveal';

class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = '';
  readonly scrollMargin = '';
  readonly thresholds: ReadonlyArray<number> = [];
  static instances: MockIntersectionObserver[] = [];
  observed: Element[] = [];
  callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    MockIntersectionObserver.instances.push(this);
  }

  observe(el: Element) {
    this.observed.push(el);
  }
  unobserve(el: Element) {
    this.observed = this.observed.filter((o) => o !== el);
  }
  disconnect() {
    this.observed = [];
  }
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

describe('initReveal', () => {
  beforeEach(() => {
    MockIntersectionObserver.instances = [];
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
    document.body.innerHTML = '';
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('immediately marks elements already within the viewport as revealed', () => {
    const el = document.createElement('div');
    el.className = 'reveal';
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({ top: 10 } as DOMRect);
    document.body.appendChild(el);

    initReveal();

    expect(el.classList.contains('in')).toBe(true);
  });

  it('observes elements below the fold instead of revealing them immediately', () => {
    const el = document.createElement('div');
    el.className = 'reveal';
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({ top: 9999 } as DOMRect);
    document.body.appendChild(el);

    initReveal();

    expect(el.classList.contains('in')).toBe(false);
    expect(MockIntersectionObserver.instances[0].observed).toContain(el);
  });

  it('adds the "in" class and stops observing once an entry intersects', () => {
    const el = document.createElement('div');
    el.className = 'reveal';
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({ top: 9999 } as DOMRect);
    document.body.appendChild(el);

    initReveal();
    const observer = MockIntersectionObserver.instances[0];
    observer.callback(
      [{ target: el, isIntersecting: true } as unknown as IntersectionObserverEntry],
      observer,
    );

    expect(el.classList.contains('in')).toBe(true);
    expect(observer.observed).not.toContain(el);
  });
});
