import test from 'node:test';
import assert from 'node:assert/strict';
import {
  runZeroHallucinationAudit,
  calculatePacketTelemetry,
  extractCodeBlock,
  checkBalancedBrackets,
  generateMobileBridgeFiles,
  buildDeterministicAgentResponse,
} from './agentEngine.ts';

test('runZeroHallucinationAudit validates code syntax and anti-hallucination protocols', () => {
  const query = 'Create a fast sorting algorithm';
  const goodCode = '```typescript\nfunction sort(a: number[]) {\n  return a.slice().sort((x, y) => x - y);\n}\n```';
  const audit = runZeroHallucinationAudit(query, goodCode, 'CODING');

  assert.ok(audit.confidenceScore >= 0.8, 'Confidence score should be high for clean code');
  assert.ok(audit.zeroHallucinationScore >= 0.8, 'Zero hallucination score should pass');
  assert.equal(audit.checks.length, 4, 'Should execute 4 deterministic security & validity checks');

  const syntaxCheck = audit.checks.find(c => c.id === 'syntax_logic');
  assert.ok(syntaxCheck, 'Syntax check must exist');
  assert.equal(syntaxCheck?.status, 'passed', 'Clean bracket syntax should pass');
});

test('checkBalancedBrackets ignores brackets inside string literals and comments', () => {
  const codeWithStringBrackets = `
    // This comment has { an unclosed brace
    /* and this multi-line comment has ( unclosed paren */
    const msg = "Braces inside strings { [ ( should not fail";
    function execute() {
      return 42;
    }
  `;
  const result = checkBalancedBrackets(codeWithStringBrackets);
  assert.equal(result.balanced, true, 'Should ignore brackets inside strings and comments');

  const trulyUnbalanced = `
    function fail() {
      if (true) {
        return false;
      // Missing closing brace
    }
  `;
  const failResult = checkBalancedBrackets(trulyUnbalanced);
  assert.equal(failResult.balanced, false, 'Should catch truly unbalanced code');
});

test('extractCodeBlock handles CRLF line endings and untagged markdown blocks', () => {
  const crlfMd = '```typescript\r\nconst x = 1;\r\n```';
  const extracted = extractCodeBlock(crlfMd);
  assert.ok(extracted !== null);
  assert.equal(extracted?.code, 'const x = 1;');

  const untaggedMd = '```\nconsole.log("untagged");\n```';
  const untagged = extractCodeBlock(untaggedMd);
  assert.ok(untagged !== null);
  assert.equal(untagged?.code, 'console.log("untagged");');
});

test('runZeroHallucinationAudit handles special regex characters in query without crashing', () => {
  const specialQuery = 'How does Array.prototype.map() [v2.0] handle $regex (test)?';
  const content = 'Explanation of Array.prototype.map with deterministic time complexity.';
  const audit = runZeroHallucinationAudit(specialQuery, content, 'CODING');

  assert.ok(audit.confidenceScore > 0);
  assert.equal(audit.checks.length, 4);
});

test('calculatePacketTelemetry computes compression savings for mobile packets', () => {
  const sample = JSON.stringify({ query: 'Execute business workflow', data: Array(50).fill('high throughput payload') });
  const telemetry = calculatePacketTelemetry(sample, false);

  assert.ok(telemetry.rawBytes > 0, 'Raw bytes must be positive');
  assert.ok(telemetry.compressedBytes < telemetry.rawBytes, 'Compressed bytes must be smaller than raw');
  assert.ok(telemetry.savingsPercent >= 50, 'Mobile delta compression should save at least 50% bytes');
  assert.equal(telemetry.estimatedLatencyMs, 25, 'Deterministic latency test verified');
});

test('generateMobileBridgeFiles creates Flutter, React Native and Capacitor wrappers with AdMob config', () => {
  const bridge = generateMobileBridgeFiles('OmniAgent AI', 'ca-app-pub-test~123', 'https://example.com');

  assert.ok(bridge.reactNativeCode.includes('react-native-google-mobile-ads'), 'React Native should import AdMob');
  assert.ok(bridge.flutterCode.includes('google_mobile_ads'), 'Flutter should import google_mobile_ads');
  assert.ok(bridge.capacitorConfig.includes('com.omniagent.ai.commercial'), 'Capacitor should have app ID');
  assert.ok(bridge.androidManifest.includes('com.google.android.gms.ads.APPLICATION_ID'), 'Manifest should have AdMob metadata');
  assert.ok(bridge.androidManifest.includes('android.permission.RECORD_AUDIO'), 'Manifest should have voice record permission');
});

test('buildDeterministicAgentResponse delivers structured responses across all 4 modes', () => {
  const modes = ['CODING', 'BUSINESS', 'TRANSLATION', 'SOLVER'] as const;
  for (const m of modes) {
    const res = buildDeterministicAgentResponse('Test query for enterprise scalability', m);
    assert.ok(res.markdown.length > 30, `Mode ${m} markdown should be non-empty`);
  }
});
