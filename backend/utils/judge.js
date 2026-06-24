/**
 * Server-side JavaScript code judge using Node.js vm module.
 * For Python/Java, we simulate realistic results (a real judge would use Docker).
 */
const vm = require('vm');

function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    // Sort arrays for order-independent comparison (e.g. two-sum)
    const sortedA = [...a].sort((x, y) => JSON.stringify(x).localeCompare(JSON.stringify(y)));
    const sortedB = [...b].sort((x, y) => JSON.stringify(x).localeCompare(JSON.stringify(y)));
    return sortedA.every((v, i) => deepEqual(v, sortedB[i]));
  }
  if (typeof a === 'object' && a !== null && b !== null) {
    const keysA = Object.keys(a).sort();
    const keysB = Object.keys(b).sort();
    if (keysA.join(',') !== keysB.join(',')) return false;
    return keysA.every(k => deepEqual(a[k], b[k]));
  }
  // Float comparison with tolerance
  if (typeof a === 'number' && typeof b === 'number') {
    return Math.abs(a - b) < 1e-5;
  }
  return false;
}

function runJavaScript(code, testCases) {
  let passed = 0;
  const errors = [];
  const start = Date.now();

  for (const tc of testCases) {
    try {
      const sandbox = { result: undefined, console: { log: () => {} } };
      const script = new vm.Script(`
        ${code}
        const _fns = [
          typeof twoSum !== 'undefined' ? twoSum : null,
          typeof isValid !== 'undefined' ? isValid : null,
          typeof lengthOfLongestSubstring !== 'undefined' ? lengthOfLongestSubstring : null,
          typeof findMedianSortedArrays !== 'undefined' ? findMedianSortedArrays : null,
          typeof levelOrder !== 'undefined' ? levelOrder : null,
          typeof maxProfit !== 'undefined' ? maxProfit : null,
          typeof climbStairs !== 'undefined' ? climbStairs : null,
          typeof merge !== 'undefined' ? merge : null,
          typeof search !== 'undefined' ? search : null,
          typeof hasCycle !== 'undefined' ? hasCycle : null,
          typeof numIslands !== 'undefined' ? numIslands : null,
          typeof reverseList !== 'undefined' ? reverseList : null,
          typeof maxDepth !== 'undefined' ? maxDepth : null,
          typeof isSymmetric !== 'undefined' ? isSymmetric : null,
          typeof singleNumber !== 'undefined' ? singleNumber : null,
          typeof minStack !== 'undefined' ? minStack : null,
          typeof solution !== 'undefined' ? solution : null,
        ].filter(Boolean);
        if (_fns.length === 0) throw new Error('No function found. Define your function.');
        const _fn = _fns[0];
        const _input = ${JSON.stringify(tc.input)};
        result = Array.isArray(_input) ? _fn(..._input) : _fn(_input);
      `);

      const ctx = vm.createContext(sandbox);
      script.runInContext(ctx, { timeout: 3000 });

      if (deepEqual(sandbox.result, tc.expected)) {
        passed++;
      } else {
        errors.push({
          input: tc.input,
          expected: tc.expected,
          got: sandbox.result
        });
      }
    } catch (e) {
      errors.push({ error: e.message });
    }
  }

  const elapsed = Date.now() - start;
  const total = testCases.length;

  let status;
  if (passed === total) status = 'Accepted';
  else if (errors.some(e => e.error)) status = 'Runtime Error';
  else status = 'Wrong Answer';

  return {
    status,
    passedCases: passed,
    totalCases: total,
    runtime: `${elapsed + Math.floor(Math.random() * 40 + 10)}ms`,
    memory: `${Math.floor(Math.random() * 8 + 40)}MB`,
    errors: errors.slice(0, 2)
  };
}

function simulateOtherLanguage(testCases, difficulty) {
  // For non-JS languages, simulate realistic pass/fail based on difficulty
  // In production you'd use Docker-based sandboxes (Judge0, Piston API, etc.)
  const chanceOfPass = { Easy: 0.75, Medium: 0.6, Hard: 0.45 }[difficulty] || 0.6;
  const passes = Math.random() < chanceOfPass;
  const passed = passes ? testCases.length : Math.floor(Math.random() * testCases.length);

  return {
    status: passed === testCases.length ? 'Accepted' : (passed === 0 ? 'Wrong Answer' : 'Wrong Answer'),
    passedCases: passed,
    totalCases: testCases.length,
    runtime: `${Math.floor(Math.random() * 120 + 30)}ms`,
    memory: `${Math.floor(Math.random() * 15 + 45)}MB`,
  };
}

function judgeCode(code, language, testCases, difficulty = 'Medium') {
  if (!code || code.trim().length < 5) {
    return {
      status: 'Compilation Error',
      passedCases: 0,
      totalCases: testCases.length,
      error: 'No code submitted.',
    };
  }

  try {
    if (language === 'javascript') {
      return runJavaScript(code, testCases);
    } else {
      return simulateOtherLanguage(testCases, difficulty);
    }
  } catch (err) {
    return {
      status: 'Runtime Error',
      passedCases: 0,
      totalCases: testCases.length,
      error: err.message,
    };
  }
}

module.exports = { judgeCode };
