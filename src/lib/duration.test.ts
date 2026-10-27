import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatDuration, formatRange } from './duration.ts';

test('counts the start and end month, like LinkedIn', () => {
  assert.equal(formatDuration('2025-04', '2026-10'), '1 yr 7 mos');
  assert.equal(formatDuration('2026-01', '2026-05'), '5 mos');
  assert.equal(formatDuration('2023-01', '2025-03'), '2 yrs 3 mos');
  assert.equal(formatDuration('2026-05', '2026-05'), '1 mo');
  assert.equal(formatDuration('2025-01', '2025-12'), '1 yr');
});

test('formats a finished range', () => {
  assert.equal(formatRange('2021-11', '2022-03'), 'Nov 2021 - Mar 2022 · 5 mos');
});
