import assert from 'node:assert/strict'
import { DEFAULT_LV, parseSettings } from '../src/lowVision/lowVision.ts'

assert.deepEqual(parseSettings(null), DEFAULT_LV)
assert.deepEqual(parseSettings('{bad'), DEFAULT_LV)
assert.deepEqual(parseSettings('[1]'), DEFAULT_LV)
assert.deepEqual(parseSettings('{"enabled":true,"size":"huge"}'), { enabled: true, size: 'normal', scheme: 'bw', images: true })
assert.deepEqual(
  parseSettings('{"enabled":true,"size":"xlarge","scheme":"wb","images":false}'),
  { enabled: true, size: 'xlarge', scheme: 'wb', images: false },
)
console.log('OK')
