// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { trackEvent } from './analytics';

describe('trackEvent', () => {
  afterEach(() => {
    // @ts-expect-error - test-only cleanup of a global stub
    delete window.gtag;
  });

  it('calls window.gtag with the event name and params', () => {
    const gtag = vi.fn();
    window.gtag = gtag;

    trackEvent('click_cta', { plan: 'pro' });

    expect(gtag).toHaveBeenCalledWith('event', 'click_cta', { plan: 'pro' });
  });

  it('defaults params to an empty object when omitted', () => {
    const gtag = vi.fn();
    window.gtag = gtag;

    trackEvent('scroll_depth');

    expect(gtag).toHaveBeenCalledWith('event', 'scroll_depth', {});
  });

  it('does not throw when window.gtag is not a function', () => {
    // @ts-expect-error - simulating gtag not having loaded yet
    window.gtag = undefined;

    expect(() => trackEvent('click_cta')).not.toThrow();
  });
});
