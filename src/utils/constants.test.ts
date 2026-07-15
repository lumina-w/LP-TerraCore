import { describe, expect, it } from 'vitest';
import { FAQ, FEATURES, PLANS, PROBLEMS } from './constants';

describe('PLANS', () => {
  it('has at least one plan', () => {
    expect(PLANS.length).toBeGreaterThan(0);
  });

  it('every plan has non-empty required fields', () => {
    for (const plan of PLANS) {
      expect(plan.name).toBeTruthy();
      expect(plan.target).toBeTruthy();
      expect(plan.ctaText).toBeTruthy();
      expect(plan.ctaEvent).toBeTruthy();
      expect(plan.features.length).toBeGreaterThan(0);
    }
  });

  it('has unique plan names', () => {
    const names = PLANS.map((p) => p.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it('has unique ctaEvent identifiers (used for analytics)', () => {
    const events = PLANS.map((p) => p.ctaEvent);
    expect(new Set(events).size).toBe(events.length);
  });

  it('has exactly one highlighted plan', () => {
    expect(PLANS.filter((p) => p.highlight).length).toBe(1);
  });
});

describe('PROBLEMS', () => {
  it('every entry has an icon, title and description', () => {
    expect(PROBLEMS.length).toBeGreaterThan(0);
    for (const problem of PROBLEMS) {
      expect(problem.icon).toBeTruthy();
      expect(problem.title).toBeTruthy();
      expect(problem.desc).toBeTruthy();
    }
  });
});

describe('FEATURES', () => {
  it('every entry has an icon, title and description', () => {
    expect(FEATURES.length).toBeGreaterThan(0);
    for (const feature of FEATURES) {
      expect(feature.icon).toBeTruthy();
      expect(feature.title).toBeTruthy();
      expect(feature.description).toBeTruthy();
    }
  });
});

describe('FAQ', () => {
  it('every entry has a question and an answer', () => {
    expect(FAQ.length).toBeGreaterThan(0);
    for (const item of FAQ) {
      expect(item.q).toBeTruthy();
      expect(item.a).toBeTruthy();
    }
  });

  it('has no duplicate questions', () => {
    const questions = FAQ.map((f) => f.q);
    expect(new Set(questions).size).toBe(questions.length);
  });
});
