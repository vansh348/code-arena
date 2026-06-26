cat > /home/claude/seed.js << 'SEEDEOF'
/**
 * Seed script — run once: node seed.js
 * Creates demo users + 100 LeetCode-style problems
 */
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Problem = require('./models/Problem');
const Contest = require('./models/Contest');

const PROBLEMS = [
  // ─── EASY (40 problems) ───────────────────────────────────────────────────────
  {
    title: 'Two Sum',
    slug: 'two-sum',
    difficulty: 'Easy',
    tags: ['Array', 'Hash Table'],
    description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.',
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'nums[0] + nums[1] == 9.' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]' },
    ],
    constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9'],
    hints: ['Use a hash map to store seen numbers.'],
    starterCode: {
      javascript: `function twoSum(nums, target) {\n  \n}`,
      python: `def two_sum(nums, target):\n    pass`,
      java: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[2,7,11,15], 9], expected: [0,1] },
      { input: [[3,2,4], 6], expected: [1,2] },
      { input: [[3,3], 6], expected: [0,1] }
    ],
    acceptance: 72, totalSubmissions: 8542, acceptedSubmissions: 6150
  },
  {
    title: 'Valid Parentheses',
    slug: 'valid-parentheses',
    difficulty: 'Easy',
    tags: ['Stack', 'String'],
    description: 'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid.',
    examples: [
      { input: 's = "()"', output: 'true' },
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' }
    ],
    constraints: ['1 <= s.length <= 10^4'],
    hints: ['Use a stack to track opening brackets.'],
    starterCode: {
      javascript: `function isValid(s) {\n  \n}`,
      python: `def is_valid(s):\n    pass`,
      java: `class Solution {\n    public boolean isValid(String s) {\n        \n    }\n}`
    },
    testCases: [
      { input: ['()'], expected: true },
      { input: ['()[]{}'], expected: true },
      { input: ['(]'], expected: false },
      { input: ['{[]}'], expected: true }
    ],
    acceptance: 65, totalSubmissions: 6210, acceptedSubmissions: 4036
  },
  {
    title: 'Climbing Stairs',
    slug: 'climbing-stairs',
    difficulty: 'Easy',
    tags: ['Dynamic Programming', 'Math'],
    description: 'You are climbing a staircase. It takes `n` steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
    examples: [
      { input: 'n = 2', output: '2' },
      { input: 'n = 3', output: '3' }
    ],
    constraints: ['1 <= n <= 45'],
    hints: ['This is essentially the Fibonacci sequence.'],
    starterCode: {
      javascript: `function climbStairs(n) {\n  \n}`,
      python: `def climb_stairs(n):\n    pass`,
      java: `class Solution {\n    public int climbStairs(int n) {\n        \n    }\n}`
    },
    testCases: [
      { input: [2], expected: 2 },
      { input: [3], expected: 3 },
      { input: [5], expected: 8 }
    ],
    acceptance: 73, totalSubmissions: 9100, acceptedSubmissions: 6643
  },
  {
    title: 'Best Time to Buy and Sell Stock',
    slug: 'best-time-to-buy-and-sell-stock',
    difficulty: 'Easy',
    tags: ['Array', 'Dynamic Programming'],
    description: 'Given an array `prices` where `prices[i]` is the price on the ith day, return the maximum profit. If no profit is possible, return 0.',
    examples: [
      { input: 'prices = [7,1,5,3,6,4]', output: '5' },
      { input: 'prices = [7,6,4,3,1]', output: '0' }
    ],
    constraints: ['1 <= prices.length <= 10^5'],
    hints: ['Track the minimum price seen so far.'],
    starterCode: {
      javascript: `function maxProfit(prices) {\n  \n}`,
      python: `def max_profit(prices):\n    pass`,
      java: `class Solution {\n    public int maxProfit(int[] prices) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[7,1,5,3,6,4]], expected: 5 },
      { input: [[7,6,4,3,1]], expected: 0 },
      { input: [[1,2]], expected: 1 }
    ],
    acceptance: 68, totalSubmissions: 7300, acceptedSubmissions: 4964
  },
  {
    title: 'Binary Search',
    slug: 'binary-search',
    difficulty: 'Easy',
    tags: ['Array', 'Binary Search'],
    description: 'Given a sorted array of integers `nums` and an integer `target`, return the index of `target`, or -1 if not found. Must run in O(log n).',
    examples: [
      { input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4' },
      { input: 'nums = [-1,0,3,5,9,12], target = 2', output: '-1' }
    ],
    constraints: ['1 <= nums.length <= 10^4', 'All integers are unique.'],
    hints: ['Track left and right pointers.'],
    starterCode: {
      javascript: `function search(nums, target) {\n  \n}`,
      python: `def search(nums, target):\n    pass`,
      java: `class Solution {\n    public int search(int[] nums, int target) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[-1,0,3,5,9,12], 9], expected: 4 },
      { input: [[-1,0,3,5,9,12], 2], expected: -1 }
    ],
    acceptance: 81, totalSubmissions: 6200, acceptedSubmissions: 5022
  },
  {
    title: 'Single Number',
    slug: 'single-number',
    difficulty: 'Easy',
    tags: ['Array', 'Bit Manipulation'],
    description: 'Given a non-empty array where every element appears twice except for one, find that single one. Must use O(1) extra space.',
    examples: [
      { input: 'nums = [2,2,1]', output: '1' },
      { input: 'nums = [4,1,2,1,2]', output: '4' }
    ],
    constraints: ['1 <= nums.length <= 3*10^4'],
    hints: ['XOR of two identical numbers is 0.'],
    starterCode: {
      javascript: `function singleNumber(nums) {\n  \n}`,
      python: `def single_number(nums):\n    pass`,
      java: `class Solution {\n    public int singleNumber(int[] nums) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[2,2,1]], expected: 1 },
      { input: [[4,1,2,1,2]], expected: 4 },
      { input: [[1]], expected: 1 }
    ],
    acceptance: 87, totalSubmissions: 6800, acceptedSubmissions: 5916
  },
  {
    title: 'Reverse Linked List',
    slug: 'reverse-linked-list',
    difficulty: 'Easy',
    tags: ['Linked List', 'Recursion'],
    description: 'Given the head of a singly linked list, reverse the list and return the reversed list.',
    examples: [
      { input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]' },
      { input: 'head = [1,2]', output: '[2,1]' }
    ],
    constraints: ['The number of nodes is in [0, 5000].'],
    hints: ['Use three pointers: prev, curr, next.'],
    starterCode: {
      javascript: `function reverseList(head) {\n  \n}`,
      python: `def reverse_list(head):\n    pass`,
      java: `class Solution {\n    public ListNode reverseList(ListNode head) {\n        \n    }\n}`
    },
    testCases: [
      { input: [null], expected: null }
    ],
    acceptance: 78, totalSubmissions: 8900, acceptedSubmissions: 6942
  },
  {
    title: 'Maximum Depth of Binary Tree',
    slug: 'maximum-depth-of-binary-tree',
    difficulty: 'Easy',
    tags: ['Tree', 'DFS', 'Binary Tree'],
    description: 'Given the root of a binary tree, return its maximum depth (number of nodes along the longest path from root to farthest leaf).',
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '3' },
      { input: 'root = [1,null,2]', output: '2' }
    ],
    constraints: ['Number of nodes in [0, 10^4].'],
    hints: ['max depth = 1 + max(left depth, right depth).'],
    starterCode: {
      javascript: `function maxDepth(root) {\n  \n}`,
      python: `def max_depth(root):\n    pass`,
      java: `class Solution {\n    public int maxDepth(TreeNode root) {\n        \n    }\n}`
    },
    testCases: [
      { input: [null], expected: 0 }
    ],
    acceptance: 82, totalSubmissions: 7100, acceptedSubmissions: 5822
  },
  {
    title: 'Palindrome Number',
    slug: 'palindrome-number',
    difficulty: 'Easy',
    tags: ['Math'],
    description: 'Given an integer `x`, return true if `x` is a palindrome, and false otherwise.',
    examples: [
      { input: 'x = 121', output: 'true' },
      { input: 'x = -121', output: 'false' },
      { input: 'x = 10', output: 'false' }
    ],
    constraints: ['-2^31 <= x <= 2^31 - 1'],
    hints: ['Negative numbers are never palindromes.'],
    starterCode: {
      javascript: `function isPalindrome(x) {\n  \n}`,
      python: `def is_palindrome(x):\n    pass`,
      java: `class Solution {\n    public boolean isPalindrome(int x) {\n        \n    }\n}`
    },
    testCases: [
      { input: [121], expected: true },
      { input: [-121], expected: false },
      { input: [10], expected: false }
    ],
    acceptance: 58, totalSubmissions: 9200, acceptedSubmissions: 5336
  },
  {
    title: 'Roman to Integer',
    slug: 'roman-to-integer',
    difficulty: 'Easy',
    tags: ['Hash Table', 'Math', 'String'],
    description: 'Given a Roman numeral string `s`, convert it to an integer.',
    examples: [
      { input: 's = "III"', output: '3' },
      { input: 's = "LVIII"', output: '58' },
      { input: 's = "MCMXCIV"', output: '1994' }
    ],
    constraints: ['1 <= s.length <= 15'],
    hints: ['If a smaller value appears before a larger one, subtract it.'],
    starterCode: {
      javascript: `function romanToInt(s) {\n  \n}`,
      python: `def roman_to_int(s):\n    pass`,
      java: `class Solution {\n    public int romanToInt(String s) {\n        \n    }\n}`
    },
    testCases: [
      { input: ['III'], expected: 3 },
      { input: ['LVIII'], expected: 58 },
      { input: ['MCMXCIV'], expected: 1994 }
    ],
    acceptance: 63, totalSubmissions: 7500, acceptedSubmissions: 4725
  },
  {
    title: 'Longest Common Prefix',
    slug: 'longest-common-prefix',
    difficulty: 'Easy',
    tags: ['String', 'Trie'],
    description: 'Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string "".',
    examples: [
      { input: 'strs = ["flower","flow","flight"]', output: '"fl"' },
      { input: 'strs = ["dog","racecar","car"]', output: '""' }
    ],
    constraints: ['1 <= strs.length <= 200', '0 <= strs[i].length <= 200'],
    hints: ['Compare character by character vertically.'],
    starterCode: {
      javascript: `function longestCommonPrefix(strs) {\n  \n}`,
      python: `def longest_common_prefix(strs):\n    pass`,
      java: `class Solution {\n    public String longestCommonPrefix(String[] strs) {\n        \n    }\n}`
    },
    testCases: [
      { input: [['flower','flow','flight']], expected: 'fl' },
      { input: [['dog','racecar','car']], expected: '' }
    ],
    acceptance: 42, totalSubmissions: 8100, acceptedSubmissions: 3402
  },
  {
    title: 'Contains Duplicate',
    slug: 'contains-duplicate',
    difficulty: 'Easy',
    tags: ['Array', 'Hash Table', 'Sorting'],
    description: 'Given an integer array `nums`, return true if any value appears at least twice in the array, and return false if every element is distinct.',
    examples: [
      { input: 'nums = [1,2,3,1]', output: 'true' },
      { input: 'nums = [1,2,3,4]', output: 'false' }
    ],
    constraints: ['1 <= nums.length <= 10^5'],
    hints: ['Use a Set to track seen elements.'],
    starterCode: {
      javascript: `function containsDuplicate(nums) {\n  \n}`,
      python: `def contains_duplicate(nums):\n    pass`,
      java: `class Solution {\n    public boolean containsDuplicate(int[] nums) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[1,2,3,1]], expected: true },
      { input: [[1,2,3,4]], expected: false },
      { input: [[1,1,1,3,3,4,3,2,4,2]], expected: true }
    ],
    acceptance: 62, totalSubmissions: 7800, acceptedSubmissions: 4836
  },
  {
    title: 'Missing Number',
    slug: 'missing-number',
    difficulty: 'Easy',
    tags: ['Array', 'Math', 'Bit Manipulation'],
    description: 'Given an array `nums` containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.',
    examples: [
      { input: 'nums = [3,0,1]', output: '2' },
      { input: 'nums = [0,1]', output: '2' },
      { input: 'nums = [9,6,4,2,3,5,7,0,1]', output: '8' }
    ],
    constraints: ['n == nums.length', '1 <= n <= 10^4'],
    hints: ['Use the formula n*(n+1)/2 and subtract the sum of the array.'],
    starterCode: {
      javascript: `function missingNumber(nums) {\n  \n}`,
      python: `def missing_number(nums):\n    pass`,
      java: `class Solution {\n    public int missingNumber(int[] nums) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[3,0,1]], expected: 2 },
      { input: [[0,1]], expected: 2 },
      { input: [[9,6,4,2,3,5,7,0,1]], expected: 8 }
    ],
    acceptance: 65, totalSubmissions: 6400, acceptedSubmissions: 4160
  },
  {
    title: 'Fizz Buzz',
    slug: 'fizz-buzz',
    difficulty: 'Easy',
    tags: ['Math', 'String', 'Simulation'],
    description: 'Given an integer n, return a string array where answer[i] == "FizzBuzz" if i is divisible by 3 and 5, "Fizz" if divisible by 3, "Buzz" if divisible by 5, or the number as a string otherwise.',
    examples: [
      { input: 'n = 3', output: '["1","2","Fizz"]' },
      { input: 'n = 5', output: '["1","2","Fizz","4","Buzz"]' }
    ],
    constraints: ['1 <= n <= 10^4'],
    hints: ['Check divisibility by 15 first, then 3, then 5.'],
    starterCode: {
      javascript: `function fizzBuzz(n) {\n  \n}`,
      python: `def fizz_buzz(n):\n    pass`,
      java: `class Solution {\n    public List<String> fizzBuzz(int n) {\n        \n    }\n}`
    },
    testCases: [
      { input: [3], expected: ['1','2','Fizz'] },
      { input: [5], expected: ['1','2','Fizz','4','Buzz'] }
    ],
    acceptance: 72, totalSubmissions: 5600, acceptedSubmissions: 4032
  },
  {
    title: 'Count Primes',
    slug: 'count-primes',
    difficulty: 'Easy',
    tags: ['Math', 'Enumeration', 'Number Theory'],
    description: 'Given an integer n, return the number of prime numbers that are strictly less than n.',
    examples: [
      { input: 'n = 10', output: '4', explanation: 'There are 4 primes: 2, 3, 5, 7.' },
      { input: 'n = 0', output: '0' },
      { input: 'n = 1', output: '0' }
    ],
    constraints: ['0 <= n <= 5 * 10^6'],
    hints: ['Use the Sieve of Eratosthenes algorithm.'],
    starterCode: {
      javascript: `function countPrimes(n) {\n  \n}`,
      python: `def count_primes(n):\n    pass`,
      java: `class Solution {\n    public int countPrimes(int n) {\n        \n    }\n}`
    },
    testCases: [
      { input: [10], expected: 4 },
      { input: [0], expected: 0 },
      { input: [1], expected: 0 }
    ],
    acceptance: 34, totalSubmissions: 5900, acceptedSubmissions: 2006
  },
  {
    title: 'Power of Two',
    slug: 'power-of-two',
    difficulty: 'Easy',
    tags: ['Math', 'Bit Manipulation', 'Recursion'],
    description: 'Given an integer n, return true if it is a power of two. Otherwise, return false.',
    examples: [
      { input: 'n = 1', output: 'true' },
      { input: 'n = 16', output: 'true' },
      { input: 'n = 3', output: 'false' }
    ],
    constraints: ['-2^31 <= n <= 2^31 - 1'],
    hints: ['A power of two in binary has exactly one 1 bit. n & (n-1) == 0.'],
    starterCode: {
      javascript: `function isPowerOfTwo(n) {\n  \n}`,
      python: `def is_power_of_two(n):\n    pass`,
      java: `class Solution {\n    public boolean isPowerOfTwo(int n) {\n        \n    }\n}`
    },
    testCases: [
      { input: [1], expected: true },
      { input: [16], expected: true },
      { input: [3], expected: false }
    ],
    acceptance: 47, totalSubmissions: 5200, acceptedSubmissions: 2444
  },
  {
    title: 'Reverse String',
    slug: 'reverse-string',
    difficulty: 'Easy',
    tags: ['Two Pointers', 'String'],
    description: 'Write a function that reverses a string. The input is given as an array of characters s. You must do this in-place with O(1) extra memory.',
    examples: [
      { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]' },
      { input: 's = ["H","a","n","n","a","h"]', output: '["h","a","n","n","a","H"]' }
    ],
    constraints: ['1 <= s.length <= 10^5'],
    hints: ['Use two pointers from both ends.'],
    starterCode: {
      javascript: `function reverseString(s) {\n  \n}`,
      python: `def reverse_string(s):\n    pass`,
      java: `class Solution {\n    public void reverseString(char[] s) {\n        \n    }\n}`
    },
    testCases: [
      { input: [['h','e','l','l','o']], expected: ['o','l','l','e','h'] },
      { input: [['H','a','n','n','a','h']], expected: ['h','a','n','n','a','H'] }
    ],
    acceptance: 78, totalSubmissions: 6100, acceptedSubmissions: 4758
  },
  {
    title: 'First Bad Version',
    slug: 'first-bad-version',
    difficulty: 'Easy',
    tags: ['Binary Search', 'Interactive'],
    description: 'You have n versions [1, 2, ..., n]. Given an API isBadVersion(version) which returns whether version is bad, find the first bad version minimizing API calls.',
    examples: [
      { input: 'n = 5, bad = 4', output: '4' },
      { input: 'n = 1, bad = 1', output: '1' }
    ],
    constraints: ['1 <= bad <= n <= 2^31 - 1'],
    hints: ['Use binary search. If mid is bad, search left; otherwise search right.'],
    starterCode: {
      javascript: `function solution(isBadVersion) {\n  return function(n) {\n    \n  };\n}`,
      python: `def firstBadVersion(n):\n    pass`,
      java: `public class Solution extends VersionControl {\n    public int firstBadVersion(int n) {\n        \n    }\n}`
    },
    testCases: [
      { input: [5], expected: 4 },
      { input: [1], expected: 1 }
    ],
    acceptance: 44, totalSubmissions: 5000, acceptedSubmissions: 2200
  },
  {
    title: 'Move Zeroes',
    slug: 'move-zeroes',
    difficulty: 'Easy',
    tags: ['Array', 'Two Pointers'],
    description: 'Given an integer array nums, move all 0s to the end while maintaining the relative order of the non-zero elements. Must do in-place without making a copy.',
    examples: [
      { input: 'nums = [0,1,0,3,12]', output: '[1,3,12,0,0]' },
      { input: 'nums = [0]', output: '[0]' }
    ],
    constraints: ['1 <= nums.length <= 10^4'],
    hints: ['Use a slow pointer to track where the next non-zero should go.'],
    starterCode: {
      javascript: `function moveZeroes(nums) {\n  \n}`,
      python: `def move_zeroes(nums):\n    pass`,
      java: `class Solution {\n    public void moveZeroes(int[] nums) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[0,1,0,3,12]], expected: [1,3,12,0,0] },
      { input: [[0]], expected: [0] }
    ],
    acceptance: 62, totalSubmissions: 6700, acceptedSubmissions: 4154
  },
  {
    title: 'Intersection of Two Arrays II',
    slug: 'intersection-of-two-arrays-ii',
    difficulty: 'Easy',
    tags: ['Array', 'Hash Table', 'Sorting'],
    description: 'Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must appear as many times as it shows in both arrays.',
    examples: [
      { input: 'nums1 = [1,2,2,1], nums2 = [2,2]', output: '[2,2]' },
      { input: 'nums1 = [4,9,5], nums2 = [9,4,9,8,4]', output: '[4,9]' }
    ],
    constraints: ['1 <= nums1.length, nums2.length <= 1000'],
    hints: ['Use a frequency map for the smaller array.'],
    starterCode: {
      javascript: `function intersect(nums1, nums2) {\n  \n}`,
      python: `def intersect(nums1, nums2):\n    pass`,
      java: `class Solution {\n    public int[] intersect(int[] nums1, int[] nums2) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[1,2,2,1],[2,2]], expected: [2,2] },
      { input: [[4,9,5],[9,4,9,8,4]], expected: [4,9] }
    ],
    acceptance: 56, totalSubmissions: 5500, acceptedSubmissions: 3080
  },
  {
    title: 'Maximum Subarray',
    slug: 'maximum-subarray',
    difficulty: 'Easy',
    tags: ['Array', 'Dynamic Programming', 'Divide and Conquer'],
    description: 'Given an integer array nums, find the subarray with the largest sum and return its sum.',
    examples: [
      { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6', explanation: '[4,-1,2,1] has the largest sum = 6.' },
      { input: 'nums = [1]', output: '1' },
      { input: 'nums = [5,4,-1,7,8]', output: '23' }
    ],
    constraints: ['1 <= nums.length <= 10^5'],
    hints: ['Kadane\'s algorithm: keep a running max.'],
    starterCode: {
      javascript: `function maxSubArray(nums) {\n  \n}`,
      python: `def max_sub_array(nums):\n    pass`,
      java: `class Solution {\n    public int maxSubArray(int[] nums) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[-2,1,-3,4,-1,2,1,-5,4]], expected: 6 },
      { input: [[1]], expected: 1 },
      { input: [[5,4,-1,7,8]], expected: 23 }
    ],
    acceptance: 50, totalSubmissions: 8900, acceptedSubmissions: 4450
  },
  {
    title: 'Plus One',
    slug: 'plus-one',
    difficulty: 'Easy',
    tags: ['Array', 'Math'],
    description: 'You are given a large integer represented as an integer array digits. Increment the large integer by one and return the resulting array.',
    examples: [
      { input: 'digits = [1,2,3]', output: '[1,2,4]' },
      { input: 'digits = [4,3,2,1]', output: '[4,3,2,2]' },
      { input: 'digits = [9]', output: '[1,0]' }
    ],
    constraints: ['1 <= digits.length <= 100'],
    hints: ['Handle carry from right to left.'],
    starterCode: {
      javascript: `function plusOne(digits) {\n  \n}`,
      python: `def plus_one(digits):\n    pass`,
      java: `class Solution {\n    public int[] plusOne(int[] digits) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[1,2,3]], expected: [1,2,4] },
      { input: [[4,3,2,1]], expected: [4,3,2,2] },
      { input: [[9]], expected: [1,0] }
    ],
    acceptance: 45, totalSubmissions: 7200, acceptedSubmissions: 3240
  },
  {
    title: 'Sqrt(x)',
    slug: 'sqrt-x',
    difficulty: 'Easy',
    tags: ['Math', 'Binary Search'],
    description: 'Given a non-negative integer x, return the square root of x rounded down to the nearest integer. You must not use any built-in exponent function or operator.',
    examples: [
      { input: 'x = 4', output: '2' },
      { input: 'x = 8', output: '2' }
    ],
    constraints: ['0 <= x <= 2^31 - 1'],
    hints: ['Use binary search between 0 and x.'],
    starterCode: {
      javascript: `function mySqrt(x) {\n  \n}`,
      python: `def my_sqrt(x):\n    pass`,
      java: `class Solution {\n    public int mySqrt(int x) {\n        \n    }\n}`
    },
    testCases: [
      { input: [4], expected: 2 },
      { input: [8], expected: 2 },
      { input: [0], expected: 0 }
    ],
    acceptance: 38, totalSubmissions: 6800, acceptedSubmissions: 2584
  },
  {
    title: 'Excel Sheet Column Number',
    slug: 'excel-sheet-column-number',
    difficulty: 'Easy',
    tags: ['Math', 'String'],
    description: 'Given a string columnTitle that represents the column title as appears in an Excel sheet, return its corresponding column number.',
    examples: [
      { input: 'columnTitle = "A"', output: '1' },
      { input: 'columnTitle = "AB"', output: '28' },
      { input: 'columnTitle = "ZY"', output: '701' }
    ],
    constraints: ['1 <= columnTitle.length <= 7'],
    hints: ['Treat it as a base-26 number system.'],
    starterCode: {
      javascript: `function titleToNumber(columnTitle) {\n  \n}`,
      python: `def title_to_number(column_title):\n    pass`,
      java: `class Solution {\n    public int titleToNumber(String columnTitle) {\n        \n    }\n}`
    },
    testCases: [
      { input: ['A'], expected: 1 },
      { input: ['AB'], expected: 28 },
      { input: ['ZY'], expected: 701 }
    ],
    acceptance: 63, totalSubmissions: 5100, acceptedSubmissions: 3213
  },
  {
    title: 'Happy Number',
    slug: 'happy-number',
    difficulty: 'Easy',
    tags: ['Hash Table', 'Math', 'Two Pointers'],
    description: 'Write an algorithm to determine if a number n is happy. Starting with any positive integer, replace the number by the sum of the squares of its digits, repeat until the number equals 1 or loops endlessly.',
    examples: [
      { input: 'n = 19', output: 'true', explanation: '1^2+9^2=82, 8^2+2^2=68, 6^2+8^2=100, 1^2+0^2+0^2=1.' },
      { input: 'n = 2', output: 'false' }
    ],
    constraints: ['1 <= n <= 2^31 - 1'],
    hints: ['Use a set to detect cycles, or Floyd\'s cycle detection.'],
    starterCode: {
      javascript: `function isHappy(n) {\n  \n}`,
      python: `def is_happy(n):\n    pass`,
      java: `class Solution {\n    public boolean isHappy(int n) {\n        \n    }\n}`
    },
    testCases: [
      { input: [19], expected: true },
      { input: [2], expected: false }
    ],
    acceptance: 55, totalSubmissions: 5900, acceptedSubmissions: 3245
  },
  {
    title: 'Linked List Cycle',
    slug: 'linked-list-cycle',
    difficulty: 'Easy',
    tags: ['Hash Table', 'Linked List', 'Two Pointers'],
    description: 'Given head of a linked list, determine if the linked list has a cycle in it.',
    examples: [
      { input: 'head = [3,2,0,-4], pos = 1', output: 'true' },
      { input: 'head = [1,2], pos = 0', output: 'true' },
      { input: 'head = [1], pos = -1', output: 'false' }
    ],
    constraints: ['The number of nodes is in [0, 10^4].'],
    hints: ['Use Floyd\'s slow and fast pointer algorithm.'],
    starterCode: {
      javascript: `function hasCycle(head) {\n  \n}`,
      python: `def has_cycle(head):\n    pass`,
      java: `class Solution {\n    public boolean hasCycle(ListNode head) {\n        \n    }\n}`
    },
    testCases: [
      { input: [null], expected: false }
    ],
    acceptance: 50, totalSubmissions: 7400, acceptedSubmissions: 3700
  },
  {
    title: 'Majority Element',
    slug: 'majority-element',
    difficulty: 'Easy',
    tags: ['Array', 'Hash Table', 'Divide and Conquer', 'Sorting'],
    description: 'Given an array nums of size n, return the majority element (appears more than ⌊n/2⌋ times).',
    examples: [
      { input: 'nums = [3,2,3]', output: '3' },
      { input: 'nums = [2,2,1,1,1,2,2]', output: '2' }
    ],
    constraints: ['n == nums.length', '1 <= n <= 5*10^4'],
    hints: ['Boyer-Moore Voting Algorithm: candidate and count.'],
    starterCode: {
      javascript: `function majorityElement(nums) {\n  \n}`,
      python: `def majority_element(nums):\n    pass`,
      java: `class Solution {\n    public int majorityElement(int[] nums) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[3,2,3]], expected: 3 },
      { input: [[2,2,1,1,1,2,2]], expected: 2 }
    ],
    acceptance: 64, totalSubmissions: 6500, acceptedSubmissions: 4160
  },
  {
    title: 'Reverse Bits',
    slug: 'reverse-bits',
    difficulty: 'Easy',
    tags: ['Divide and Conquer', 'Bit Manipulation'],
    description: 'Reverse bits of a given 32-bit unsigned integer.',
    examples: [
      { input: 'n = 00000010100101000001111010011100', output: '964176192' },
      { input: 'n = 11111111111111111111111111111101', output: '3221225471' }
    ],
    constraints: ['The input must be a binary string of length 32.'],
    hints: ['Process bit by bit using shift and OR.'],
    starterCode: {
      javascript: `function reverseBits(n) {\n  \n}`,
      python: `def reverse_bits(n):\n    pass`,
      java: `public class Solution {\n    public int reverseBits(int n) {\n        \n    }\n}`
    },
    testCases: [
      { input: [43261596], expected: 964176192 },
      { input: [4294967293], expected: 3221225471 }
    ],
    acceptance: 59, totalSubmissions: 5200, acceptedSubmissions: 3068
  },
  {
    title: 'Number of 1 Bits',
    slug: 'number-of-1-bits',
    difficulty: 'Easy',
    tags: ['Divide and Conquer', 'Bit Manipulation'],
    description: 'Write a function that takes the binary representation of a positive integer and returns the number of set bits it has (Hamming weight).',
    examples: [
      { input: 'n = 11', output: '3', explanation: '11 = 1011 in binary, has 3 set bits.' },
      { input: 'n = 128', output: '1' }
    ],
    constraints: ['1 <= n <= 2^31 - 1'],
    hints: ['n & (n-1) clears the lowest set bit.'],
    starterCode: {
      javascript: `function hammingWeight(n) {\n  \n}`,
      python: `def hamming_weight(n):\n    pass`,
      java: `public class Solution {\n    public int hammingWeight(int n) {\n        \n    }\n}`
    },
    testCases: [
      { input: [11], expected: 3 },
      { input: [128], expected: 1 },
      { input: [2147483645], expected: 30 }
    ],
    acceptance: 71, totalSubmissions: 5600, acceptedSubmissions: 3976
  },
  {
    title: 'Symmetric Tree',
    slug: 'symmetric-tree',
    difficulty: 'Easy',
    tags: ['Tree', 'DFS', 'BFS', 'Binary Tree'],
    description: 'Given the root of a binary tree, check whether it is a mirror of itself (symmetric around its center).',
    examples: [
      { input: 'root = [1,2,2,3,4,4,3]', output: 'true' },
      { input: 'root = [1,2,2,null,3,null,3]', output: 'false' }
    ],
    constraints: ['The number of nodes is in [1, 1000].'],
    hints: ['Recursively check if left subtree mirrors right subtree.'],
    starterCode: {
      javascript: `function isSymmetric(root) {\n  \n}`,
      python: `def is_symmetric(root):\n    pass`,
      java: `class Solution {\n    public boolean isSymmetric(TreeNode root) {\n        \n    }\n}`
    },
    testCases: [
      { input: [null], expected: true }
    ],
    acceptance: 54, totalSubmissions: 6800, acceptedSubmissions: 3672
  },
  {
    title: 'Path Sum',
    slug: 'path-sum',
    difficulty: 'Easy',
    tags: ['Tree', 'DFS', 'BFS', 'Binary Tree'],
    description: 'Given the root of a binary tree and an integer targetSum, return true if the tree has a root-to-leaf path such that adding up all values along the path equals targetSum.',
    examples: [
      { input: 'root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22', output: 'true' },
      { input: 'root = [1,2,3], targetSum = 5', output: 'false' }
    ],
    constraints: ['The number of nodes is in [0, 5000].'],
    hints: ['Recursively subtract node value from target, check leaves.'],
    starterCode: {
      javascript: `function hasPathSum(root, targetSum) {\n  \n}`,
      python: `def has_path_sum(root, target_sum):\n    pass`,
      java: `class Solution {\n    public boolean hasPathSum(TreeNode root, int targetSum) {\n        \n    }\n}`
    },
    testCases: [
      { input: [null, 0], expected: false }
    ],
    acceptance: 48, totalSubmissions: 5900, acceptedSubmissions: 2832
  },
  {
    title: 'Pascal\'s Triangle',
    slug: 'pascals-triangle',
    difficulty: 'Easy',
    tags: ['Array', 'Dynamic Programming'],
    description: 'Given an integer numRows, return the first numRows of Pascal\'s triangle.',
    examples: [
      { input: 'numRows = 5', output: '[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]' },
      { input: 'numRows = 1', output: '[[1]]' }
    ],
    constraints: ['1 <= numRows <= 30'],
    hints: ['Each element is the sum of the two above it.'],
    starterCode: {
      javascript: `function generate(numRows) {\n  \n}`,
      python: `def generate(num_rows):\n    pass`,
      java: `class Solution {\n    public List<List<Integer>> generate(int numRows) {\n        \n    }\n}`
    },
    testCases: [
      { input: [5], expected: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]] },
      { input: [1], expected: [[1]] }
    ],
    acceptance: 72, totalSubmissions: 5400, acceptedSubmissions: 3888
  },
  {
    title: 'Excel Sheet Column Title',
    slug: 'excel-sheet-column-title',
    difficulty: 'Easy',
    tags: ['Math', 'String'],
    description: 'Given an integer columnNumber, return its corresponding column title as it appears in an Excel sheet.',
    examples: [
      { input: 'columnNumber = 1', output: '"A"' },
      { input: 'columnNumber = 28', output: '"AB"' },
      { input: 'columnNumber = 701', output: '"ZY"' }
    ],
    constraints: ['1 <= columnNumber <= 2^31 - 1'],
    hints: ['It\'s base-26 but 1-indexed. Subtract 1 before taking modulo.'],
    starterCode: {
      javascript: `function convertToTitle(columnNumber) {\n  \n}`,
      python: `def convert_to_title(column_number):\n    pass`,
      java: `class Solution {\n    public String convertToTitle(int columnNumber) {\n        \n    }\n}`
    },
    testCases: [
      { input: [1], expected: 'A' },
      { input: [28], expected: 'AB' },
      { input: [701], expected: 'ZY' }
    ],
    acceptance: 38, totalSubmissions: 5700, acceptedSubmissions: 2166
  },
  // NEW EASY PROBLEMS ──────────────────────────────────────────────────────────
  {
    title: 'Merge Sorted Array',
    slug: 'merge-sorted-array',
    difficulty: 'Easy',
    tags: ['Array', 'Two Pointers', 'Sorting'],
    description: 'You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and integers m and n representing element counts. Merge nums2 into nums1 as one sorted array in-place.',
    examples: [
      { input: 'nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3', output: '[1,2,2,3,5,6]' },
      { input: 'nums1 = [1], m = 1, nums2 = [], n = 0', output: '[1]' },
    ],
    constraints: ['nums1.length == m + n', '0 <= m, n <= 200'],
    hints: ['Merge from the end to avoid overwriting elements.'],
    starterCode: {
      javascript: `function merge(nums1, m, nums2, n) {\n  \n}`,
      python: `def merge(nums1, m, nums2, n):\n    pass`,
      java: `class Solution {\n    public void merge(int[] nums1, int m, int[] nums2, int n) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[1,2,3,0,0,0], 3, [2,5,6], 3], expected: [1,2,2,3,5,6] },
      { input: [[1], 1, [], 0], expected: [1] }
    ],
    acceptance: 47, totalSubmissions: 6900, acceptedSubmissions: 3243
  },
  {
    title: 'Valid Anagram',
    slug: 'valid-anagram',
    difficulty: 'Easy',
    tags: ['Hash Table', 'String', 'Sorting'],
    description: 'Given two strings s and t, return true if t is an anagram of s, and false otherwise.',
    examples: [
      { input: 's = "anagram", t = "nagaram"', output: 'true' },
      { input: 's = "rat", t = "car"', output: 'false' }
    ],
    constraints: ['1 <= s.length, t.length <= 5*10^4', 's and t consist of lowercase English letters.'],
    hints: ['Use a character frequency map.'],
    starterCode: {
      javascript: `function isAnagram(s, t) {\n  \n}`,
      python: `def is_anagram(s, t):\n    pass`,
      java: `class Solution {\n    public boolean isAnagram(String s, String t) {\n        \n    }\n}`
    },
    testCases: [
      { input: ['anagram', 'nagaram'], expected: true },
      { input: ['rat', 'car'], expected: false }
    ],
    acceptance: 63, totalSubmissions: 7100, acceptedSubmissions: 4473
  },
  {
    title: 'Two Sum II - Input Array Is Sorted',
    slug: 'two-sum-ii',
    difficulty: 'Easy',
    tags: ['Array', 'Two Pointers', 'Binary Search'],
    description: 'Given a 1-indexed sorted array of integers, find two numbers that add up to a target. Return their indices. Must use only O(1) extra space.',
    examples: [
      { input: 'numbers = [2,7,11,15], target = 9', output: '[1,2]' },
      { input: 'numbers = [2,3,4], target = 6', output: '[1,3]' }
    ],
    constraints: ['2 <= numbers.length <= 3*10^4', 'Exactly one solution exists.'],
    hints: ['Use two pointers from both ends.'],
    starterCode: {
      javascript: `function twoSum(numbers, target) {\n  \n}`,
      python: `def two_sum(numbers, target):\n    pass`,
      java: `class Solution {\n    public int[] twoSum(int[] numbers, int target) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[2,7,11,15], 9], expected: [1,2] },
      { input: [[2,3,4], 6], expected: [1,3] }
    ],
    acceptance: 60, totalSubmissions: 5800, acceptedSubmissions: 3480
  },
  {
    title: 'Remove Duplicates from Sorted Array',
    slug: 'remove-duplicates-from-sorted-array',
    difficulty: 'Easy',
    tags: ['Array', 'Two Pointers'],
    description: 'Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. Return the number of unique elements k.',
    examples: [
      { input: 'nums = [1,1,2]', output: '2, nums = [1,2,_]' },
      { input: 'nums = [0,0,1,1,1,2,2,3,3,4]', output: '5, nums = [0,1,2,3,4,_,_,_,_,_]' }
    ],
    constraints: ['1 <= nums.length <= 3*10^4'],
    hints: ['Use a slow pointer to track position of last unique element.'],
    starterCode: {
      javascript: `function removeDuplicates(nums) {\n  \n}`,
      python: `def remove_duplicates(nums):\n    pass`,
      java: `class Solution {\n    public int removeDuplicates(int[] nums) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[1,1,2]], expected: 2 },
      { input: [[0,0,1,1,1,2,2,3,3,4]], expected: 5 }
    ],
    acceptance: 54, totalSubmissions: 6500, acceptedSubmissions: 3510
  },
  {
    title: 'Implement Stack using Queues',
    slug: 'implement-stack-using-queues',
    difficulty: 'Easy',
    tags: ['Stack', 'Queue', 'Design'],
    description: 'Implement a last-in-first-out (LIFO) stack using only two queues. The implemented stack should support push, top, pop, and empty operations.',
    examples: [
      { input: 'MyStack stack = new MyStack(); stack.push(1); stack.push(2); stack.top(); stack.pop(); stack.empty();', output: '2, 2, false' }
    ],
    constraints: ['1 <= x <= 9', 'At most 100 calls will be made.'],
    hints: ['On push, enqueue then rotate all elements so newest is at front.'],
    starterCode: {
      javascript: `class MyStack {\n  constructor() {\n    \n  }\n  push(x) {\n    \n  }\n  pop() {\n    \n  }\n  top() {\n    \n  }\n  empty() {\n    \n  }\n}`,
      python: `class MyStack:\n    def __init__(self):\n        pass\n    def push(self, x):\n        pass\n    def pop(self):\n        pass\n    def top(self):\n        pass\n    def empty(self):\n        pass`,
      java: `class MyStack {\n    public MyStack() {}\n    public void push(int x) {}\n    public int pop() { return 0; }\n    public int top() { return 0; }\n    public boolean empty() { return true; }\n}`
    },
    testCases: [
      { input: [1], expected: 1 }
    ],
    acceptance: 60, totalSubmissions: 4200, acceptedSubmissions: 2520
  },

  // ─── MEDIUM (46 problems) ─────────────────────────────────────────────────────
  {
    title: 'Longest Substring Without Repeating Characters',
    slug: 'longest-substring-without-repeating-characters',
    difficulty: 'Medium',
    tags: ['Hash Table', 'String', 'Sliding Window'],
    description: 'Given a string `s`, find the length of the longest substring without repeating characters.',
    examples: [
      { input: 's = "abcabcbb"', output: '3' },
      { input: 's = "bbbbb"', output: '1' },
      { input: 's = "pwwkew"', output: '3' }
    ],
    constraints: ['0 <= s.length <= 5*10^4'],
    hints: ['Use the sliding window technique with a set.'],
    starterCode: {
      javascript: `function lengthOfLongestSubstring(s) {\n  \n}`,
      python: `def length_of_longest_substring(s):\n    pass`,
      java: `class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        \n    }\n}`
    },
    testCases: [
      { input: ['abcabcbb'], expected: 3 },
      { input: ['bbbbb'], expected: 1 },
      { input: ['pwwkew'], expected: 3 },
      { input: [''], expected: 0 }
    ],
    acceptance: 51, totalSubmissions: 9874, acceptedSubmissions: 5035
  },
  {
    title: 'Add Two Numbers',
    slug: 'add-two-numbers',
    difficulty: 'Medium',
    tags: ['Linked List', 'Math', 'Recursion'],
    description: 'You are given two non-empty linked lists representing two non-negative integers stored in reverse order. Add the two numbers and return the sum as a linked list.',
    examples: [
      { input: 'l1 = [2,4,3], l2 = [5,6,4]', output: '[7,0,8]', explanation: '342 + 465 = 807.' },
      { input: 'l1 = [0], l2 = [0]', output: '[0]' }
    ],
    constraints: ['The number of nodes in each list is in [1, 100].'],
    hints: ['Simulate the addition digit by digit, tracking carry.'],
    starterCode: {
      javascript: `function addTwoNumbers(l1, l2) {\n  \n}`,
      python: `def add_two_numbers(l1, l2):\n    pass`,
      java: `class Solution {\n    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\n        \n    }\n}`
    },
    testCases: [
      { input: [null, null], expected: null }
    ],
    acceptance: 42, totalSubmissions: 8200, acceptedSubmissions: 3444
  },
  {
    title: 'Binary Tree Level Order Traversal',
    slug: 'binary-tree-level-order-traversal',
    difficulty: 'Medium',
    tags: ['Tree', 'BFS', 'Binary Tree'],
    description: 'Given the root of a binary tree, return the level order traversal of its node values (left to right, level by level).',
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '[[3],[9,20],[15,7]]' },
      { input: 'root = [1]', output: '[[1]]' }
    ],
    constraints: ['Number of nodes in [0, 2000].'],
    hints: ['Use a queue (BFS) and process level by level.'],
    starterCode: {
      javascript: `function levelOrder(root) {\n  \n}`,
      python: `def level_order(root):\n    pass`,
      java: `class Solution {\n    public List<List<Integer>> levelOrder(TreeNode root) {\n        \n    }\n}`
    },
    testCases: [
      { input: [null], expected: [] }
    ],
    acceptance: 67, totalSubmissions: 5647, acceptedSubmissions: 3783
  },
  {
    title: 'Merge Intervals',
    slug: 'merge-intervals',
    difficulty: 'Medium',
    tags: ['Array', 'Sorting'],
    description: 'Given an array of intervals, merge all overlapping intervals and return an array of non-overlapping intervals.',
    examples: [
      { input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]' },
      { input: 'intervals = [[1,4],[4,5]]', output: '[[1,5]]' }
    ],
    constraints: ['1 <= intervals.length <= 10^4'],
    hints: ['Sort by start time first.'],
    starterCode: {
      javascript: `function merge(intervals) {\n  \n}`,
      python: `def merge(intervals):\n    pass`,
      java: `class Solution {\n    public int[][] merge(int[][] intervals) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[[1,3],[2,6],[8,10],[15,18]]], expected: [[1,6],[8,10],[15,18]] },
      { input: [[[1,4],[4,5]]], expected: [[1,5]] }
    ],
    acceptance: 47, totalSubmissions: 5800, acceptedSubmissions: 2726
  },
  {
    title: 'Number of Islands',
    slug: 'number-of-islands',
    difficulty: 'Medium',
    tags: ['Array', 'DFS', 'BFS', 'Matrix'],
    description: 'Given an m x n 2D binary grid representing a map of 1s (land) and 0s (water), return the number of islands.',
    examples: [
      { input: 'grid = [["1","1","0"],["0","1","0"],["0","0","1"]]', output: '2' }
    ],
    constraints: ['1 <= m, n <= 300'],
    hints: ['Use DFS to sink each island you find.'],
    starterCode: {
      javascript: `function numIslands(grid) {\n  \n}`,
      python: `def num_islands(grid):\n    pass`,
      java: `class Solution {\n    public int numIslands(char[][] grid) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[["1","1","0"],["0","1","0"],["0","0","1"]]], expected: 2 }
    ],
    acceptance: 59, totalSubmissions: 7200, acceptedSubmissions: 4248
  },
  {
    title: 'Coin Change',
    slug: 'coin-change',
    difficulty: 'Medium',
    tags: ['Array', 'Dynamic Programming', 'BFS'],
    description: 'Given coins of different denominations and an amount, return the fewest number of coins needed to make up that amount. Return -1 if not possible.',
    examples: [
      { input: 'coins = [1,5,10,25], amount = 41', output: '4' },
      { input: 'coins = [2], amount = 3', output: '-1' }
    ],
    constraints: ['1 <= coins.length <= 12', '0 <= amount <= 10^4'],
    hints: ['Build up a DP table from amount 0 to target.'],
    starterCode: {
      javascript: `function coinChange(coins, amount) {\n  \n}`,
      python: `def coin_change(coins, amount):\n    pass`,
      java: `class Solution {\n    public int coinChange(int[] coins, int amount) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[1,5,10,25], 41], expected: 4 },
      { input: [[2], 3], expected: -1 },
      { input: [[1], 0], expected: 0 }
    ],
    acceptance: 43, totalSubmissions: 6100, acceptedSubmissions: 2623
  },
  {
    title: 'Product of Array Except Self',
    slug: 'product-of-array-except-self',
    difficulty: 'Medium',
    tags: ['Array', 'Prefix Sum'],
    description: 'Given an integer array nums, return an array answer such that answer[i] is equal to the product of all elements except nums[i]. Must run in O(n) without using division.',
    examples: [
      { input: 'nums = [1,2,3,4]', output: '[24,12,8,6]' },
      { input: 'nums = [-1,1,0,-3,3]', output: '[0,0,9,0,0]' }
    ],
    constraints: ['2 <= nums.length <= 10^5'],
    hints: ['Use prefix and suffix product arrays.'],
    starterCode: {
      javascript: `function productExceptSelf(nums) {\n  \n}`,
      python: `def product_except_self(nums):\n    pass`,
      java: `class Solution {\n    public int[] productExceptSelf(int[] nums) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[1,2,3,4]], expected: [24,12,8,6] },
      { input: [[-1,1,0,-3,3]], expected: [0,0,9,0,0] }
    ],
    acceptance: 66, totalSubmissions: 5900, acceptedSubmissions: 3894
  },
  {
    title: 'Find Minimum in Rotated Sorted Array',
    slug: 'find-minimum-in-rotated-sorted-array',
    difficulty: 'Medium',
    tags: ['Array', 'Binary Search'],
    description: 'Given a sorted rotated array of unique elements, find the minimum element. Must run in O(log n).',
    examples: [
      { input: 'nums = [3,4,5,1,2]', output: '1' },
      { input: 'nums = [4,5,6,7,0,1,2]', output: '0' }
    ],
    constraints: ['n == nums.length', '1 <= n <= 5000'],
    hints: ['Use binary search. The minimum is at the rotation point.'],
    starterCode: {
      javascript: `function findMin(nums) {\n  \n}`,
      python: `def find_min(nums):\n    pass`,
      java: `class Solution {\n    public int findMin(int[] nums) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[3,4,5,1,2]], expected: 1 },
      { input: [[4,5,6,7,0,1,2]], expected: 0 },
      { input: [[11,13,15,17]], expected: 11 }
    ],
    acceptance: 49, totalSubmissions: 5400, acceptedSubmissions: 2646
  },
  {
    title: 'Search in Rotated Sorted Array',
    slug: 'search-in-rotated-sorted-array',
    difficulty: 'Medium',
    tags: ['Array', 'Binary Search'],
    description: 'Given a rotated sorted array and a target, return the index of target or -1 if not found. Must run in O(log n).',
    examples: [
      { input: 'nums = [4,5,6,7,0,1,2], target = 0', output: '4' },
      { input: 'nums = [4,5,6,7,0,1,2], target = 3', output: '-1' }
    ],
    constraints: ['1 <= nums.length <= 5000', 'All values are unique.'],
    hints: ['In binary search, determine which half is sorted.'],
    starterCode: {
      javascript: `function search(nums, target) {\n  \n}`,
      python: `def search(nums, target):\n    pass`,
      java: `class Solution {\n    public int search(int[] nums, int target) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[4,5,6,7,0,1,2], 0], expected: 4 },
      { input: [[4,5,6,7,0,1,2], 3], expected: -1 },
      { input: [[1], 0], expected: -1 }
    ],
    acceptance: 40, totalSubmissions: 6200, acceptedSubmissions: 2480
  },
  {
    title: '3Sum',
    slug: '3sum',
    difficulty: 'Medium',
    tags: ['Array', 'Two Pointers', 'Sorting'],
    description: 'Given an integer array nums, return all triplets [nums[i], nums[j], nums[k]] such that they sum to zero. The solution set must not contain duplicate triplets.',
    examples: [
      { input: 'nums = [-1,0,1,2,-1,-4]', output: '[[-1,-1,2],[-1,0,1]]' },
      { input: 'nums = [0,0,0]', output: '[[0,0,0]]' }
    ],
    constraints: ['3 <= nums.length <= 3000'],
    hints: ['Sort first, then use two pointers for the inner loop.'],
    starterCode: {
      javascript: `function threeSum(nums) {\n  \n}`,
      python: `def three_sum(nums):\n    pass`,
      java: `class Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[-1,0,1,2,-1,-4]], expected: [[-1,-1,2],[-1,0,1]] },
      { input: [[0,0,0]], expected: [[0,0,0]] }
    ],
    acceptance: 34, totalSubmissions: 7800, acceptedSubmissions: 2652
  },
  {
    title: 'Container With Most Water',
    slug: 'container-with-most-water',
    difficulty: 'Medium',
    tags: ['Array', 'Two Pointers', 'Greedy'],
    description: 'Given n non-negative integers representing an elevation map, find two lines that together with the x-axis form a container that holds the most water.',
    examples: [
      { input: 'height = [1,8,6,2,5,4,8,3,7]', output: '49' },
      { input: 'height = [1,1]', output: '1' }
    ],
    constraints: ['n == height.length', '2 <= n <= 10^5'],
    hints: ['Use two pointers from both ends, move the shorter one inward.'],
    starterCode: {
      javascript: `function maxArea(height) {\n  \n}`,
      python: `def max_area(height):\n    pass`,
      java: `class Solution {\n    public int maxArea(int[] height) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[1,8,6,2,5,4,8,3,7]], expected: 49 },
      { input: [[1,1]], expected: 1 }
    ],
    acceptance: 55, totalSubmissions: 6600, acceptedSubmissions: 3630
  },
  {
    title: 'Subarray Sum Equals K',
    slug: 'subarray-sum-equals-k',
    difficulty: 'Medium',
    tags: ['Array', 'Hash Table', 'Prefix Sum'],
    description: 'Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.',
    examples: [
      { input: 'nums = [1,1,1], k = 2', output: '2' },
      { input: 'nums = [1,2,3], k = 3', output: '2' }
    ],
    constraints: ['1 <= nums.length <= 2*10^4'],
    hints: ['Use prefix sums and a hashmap to count.'],
    starterCode: {
      javascript: `function subarraySum(nums, k) {\n  \n}`,
      python: `def subarray_sum(nums, k):\n    pass`,
      java: `class Solution {\n    public int subarraySum(int[] nums, int k) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[1,1,1], 2], expected: 2 },
      { input: [[1,2,3], 3], expected: 2 }
    ],
    acceptance: 44, totalSubmissions: 5800, acceptedSubmissions: 2552
  },
  {
    title: 'Spiral Matrix',
    slug: 'spiral-matrix',
    difficulty: 'Medium',
    tags: ['Array', 'Matrix', 'Simulation'],
    description: 'Given an m x n matrix, return all elements of the matrix in spiral order.',
    examples: [
      { input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]', output: '[1,2,3,6,9,8,7,4,5]' },
      { input: 'matrix = [[1,2],[3,4]]', output: '[1,2,4,3]' }
    ],
    constraints: ['1 <= m, n <= 10'],
    hints: ['Track top, bottom, left, right boundaries.'],
    starterCode: {
      javascript: `function spiralOrder(matrix) {\n  \n}`,
      python: `def spiral_order(matrix):\n    pass`,
      java: `class Solution {\n    public List<Integer> spiralOrder(int[][] matrix) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[[1,2,3],[4,5,6],[7,8,9]]], expected: [1,2,3,6,9,8,7,4,5] },
      { input: [[[1,2],[3,4]]], expected: [1,2,4,3] }
    ],
    acceptance: 46, totalSubmissions: 5200, acceptedSubmissions: 2392
  },
  {
    title: 'Jump Game',
    slug: 'jump-game',
    difficulty: 'Medium',
    tags: ['Array', 'Dynamic Programming', 'Greedy'],
    description: 'Given an integer array nums where each element is the max jump length, return true if you can reach the last index from the first index.',
    examples: [
      { input: 'nums = [2,3,1,1,4]', output: 'true' },
      { input: 'nums = [3,2,1,0,4]', output: 'false' }
    ],
    constraints: ['1 <= nums.length <= 10^4'],
    hints: ['Track the maximum reachable index.'],
    starterCode: {
      javascript: `function canJump(nums) {\n  \n}`,
      python: `def can_jump(nums):\n    pass`,
      java: `class Solution {\n    public boolean canJump(int[] nums) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[2,3,1,1,4]], expected: true },
      { input: [[3,2,1,0,4]], expected: false }
    ],
    acceptance: 38, totalSubmissions: 6900, acceptedSubmissions: 2622
  },
  {
    title: 'Unique Paths',
    slug: 'unique-paths',
    difficulty: 'Medium',
    tags: ['Math', 'Dynamic Programming', 'Combinatorics'],
    description: 'A robot is on an m x n grid at the top-left corner. It can only move down or right. How many unique paths are there to reach the bottom-right corner?',
    examples: [
      { input: 'm = 3, n = 7', output: '28' },
      { input: 'm = 3, n = 2', output: '3' }
    ],
    constraints: ['1 <= m, n <= 100'],
    hints: ['Use DP: dp[i][j] = dp[i-1][j] + dp[i][j-1].'],
    starterCode: {
      javascript: `function uniquePaths(m, n) {\n  \n}`,
      python: `def unique_paths(m, n):\n    pass`,
      java: `class Solution {\n    public int uniquePaths(int m, int n) {\n        \n    }\n}`
    },
    testCases: [
      { input: [3,7], expected: 28 },
      { input: [3,2], expected: 3 }
    ],
    acceptance: 62, totalSubmissions: 5700, acceptedSubmissions: 3534
  },
  {
    title: 'Rotate Image',
    slug: 'rotate-image',
    difficulty: 'Medium',
    tags: ['Array', 'Math', 'Matrix'],
    description: 'Given an n x n 2D matrix representing an image, rotate the image by 90 degrees clockwise in-place.',
    examples: [
      { input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]', output: '[[7,4,1],[8,5,2],[9,6,3]]' },
    ],
    constraints: ['n == matrix.length == matrix[i].length', '1 <= n <= 20'],
    hints: ['Transpose first, then reverse each row.'],
    starterCode: {
      javascript: `function rotate(matrix) {\n  \n}`,
      python: `def rotate(matrix):\n    pass`,
      java: `class Solution {\n    public void rotate(int[][] matrix) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[[1,2,3],[4,5,6],[7,8,9]]], expected: [[7,4,1],[8,5,2],[9,6,3]] }
    ],
    acceptance: 73, totalSubmissions: 5300, acceptedSubmissions: 3869
  },
  {
    title: 'Group Anagrams',
    slug: 'group-anagrams',
    difficulty: 'Medium',
    tags: ['Array', 'Hash Table', 'String', 'Sorting'],
    description: 'Given an array of strings strs, group the anagrams together. You can return the answer in any order.',
    examples: [
      { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]' },
      { input: 'strs = [""]', output: '[[""]]' }
    ],
    constraints: ['1 <= strs.length <= 10^4', '0 <= strs[i].length <= 100'],
    hints: ['Sort each string and use it as a key in a hash map.'],
    starterCode: {
      javascript: `function groupAnagrams(strs) {\n  \n}`,
      python: `def group_anagrams(strs):\n    pass`,
      java: `class Solution {\n    public List<List<String>> groupAnagrams(String[] strs) {\n        \n    }\n}`
    },
    testCases: [
      { input: [['eat','tea','tan','ate','nat','bat']], expected: [['bat'],['nat','tan'],['ate','eat','tea']] },
      { input: [['a']], expected: [['a']] }
    ],
    acceptance: 67, totalSubmissions: 5900, acceptedSubmissions: 3953
  },
  {
    title: 'Top K Frequent Elements',
    slug: 'top-k-frequent-elements',
    difficulty: 'Medium',
    tags: ['Array', 'Hash Table', 'Heap', 'Bucket Sort'],
    description: 'Given an integer array nums and an integer k, return the k most frequent elements.',
    examples: [
      { input: 'nums = [1,1,1,2,2,3], k = 2', output: '[1,2]' },
      { input: 'nums = [1], k = 1', output: '[1]' }
    ],
    constraints: ['1 <= nums.length <= 10^5'],
    hints: ['Use a frequency map, then a heap or bucket sort.'],
    starterCode: {
      javascript: `function topKFrequent(nums, k) {\n  \n}`,
      python: `def top_k_frequent(nums, k):\n    pass`,
      java: `class Solution {\n    public int[] topKFrequent(int[] nums, int k) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[1,1,1,2,2,3], 2], expected: [1,2] },
      { input: [[1], 1], expected: [1] }
    ],
    acceptance: 65, totalSubmissions: 5600, acceptedSubmissions: 3640
  },
  {
    title: 'Longest Palindromic Substring',
    slug: 'longest-palindromic-substring',
    difficulty: 'Medium',
    tags: ['String', 'Dynamic Programming'],
    description: 'Given a string s, return the longest palindromic substring in s.',
    examples: [
      { input: 's = "babad"', output: '"bab"' },
      { input: 's = "cbbd"', output: '"bb"' }
    ],
    constraints: ['1 <= s.length <= 1000'],
    hints: ['Expand around center for each character.'],
    starterCode: {
      javascript: `function longestPalindrome(s) {\n  \n}`,
      python: `def longest_palindrome(s):\n    pass`,
      java: `class Solution {\n    public String longestPalindrome(String s) {\n        \n    }\n}`
    },
    testCases: [
      { input: ['babad'], expected: 'bab' },
      { input: ['cbbd'], expected: 'bb' }
    ],
    acceptance: 33, totalSubmissions: 7200, acceptedSubmissions: 2376
  },
  {
    title: 'Decode Ways',
    slug: 'decode-ways',
    difficulty: 'Medium',
    tags: ['String', 'Dynamic Programming'],
    description: 'A message containing letters from A-Z can be encoded into numbers using A=1, B=2, ..., Z=26. Given a string of digits, return the number of ways to decode it.',
    examples: [
      { input: 's = "12"', output: '2', explanation: '"AB" (1 2) or "L" (12).' },
      { input: 's = "226"', output: '3' },
      { input: 's = "06"', output: '0' }
    ],
    constraints: ['1 <= s.length <= 100'],
    hints: ['Use DP. dp[i] = ways to decode s[0..i].'],
    starterCode: {
      javascript: `function numDecodings(s) {\n  \n}`,
      python: `def num_decodings(s):\n    pass`,
      java: `class Solution {\n    public int numDecodings(String s) {\n        \n    }\n}`
    },
    testCases: [
      { input: ['12'], expected: 2 },
      { input: ['226'], expected: 3 },
      { input: ['06'], expected: 0 }
    ],
    acceptance: 32, totalSubmissions: 6100, acceptedSubmissions: 1952
  },
  {
    title: 'House Robber',
    slug: 'house-robber',
    difficulty: 'Medium',
    tags: ['Array', 'Dynamic Programming'],
    description: 'You are a robber planning to rob houses. Adjacent houses have security systems. Given an array of non-negative integers representing money in each house, return the maximum amount you can rob without alerting police.',
    examples: [
      { input: 'nums = [1,2,3,1]', output: '4' },
      { input: 'nums = [2,7,9,3,1]', output: '12' }
    ],
    constraints: ['1 <= nums.length <= 100'],
    hints: ['dp[i] = max(dp[i-1], dp[i-2] + nums[i]).'],
    starterCode: {
      javascript: `function rob(nums) {\n  \n}`,
      python: `def rob(nums):\n    pass`,
      java: `class Solution {\n    public int rob(int[] nums) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[1,2,3,1]], expected: 4 },
      { input: [[2,7,9,3,1]], expected: 12 }
    ],
    acceptance: 50, totalSubmissions: 6700, acceptedSubmissions: 3350
  },
  {
    title: 'Course Schedule',
    slug: 'course-schedule',
    difficulty: 'Medium',
    tags: ['DFS', 'BFS', 'Graph', 'Topological Sort'],
    description: 'There are numCourses courses. Given prerequisites pairs, return true if you can finish all courses (i.e., no cycle exists).',
    examples: [
      { input: 'numCourses = 2, prerequisites = [[1,0]]', output: 'true' },
      { input: 'numCourses = 2, prerequisites = [[1,0],[0,1]]', output: 'false' }
    ],
    constraints: ['1 <= numCourses <= 2000'],
    hints: ['Detect a cycle in a directed graph using DFS or BFS topological sort.'],
    starterCode: {
      javascript: `function canFinish(numCourses, prerequisites) {\n  \n}`,
      python: `def can_finish(num_courses, prerequisites):\n    pass`,
      java: `class Solution {\n    public boolean canFinish(int numCourses, int[][] prerequisites) {\n        \n    }\n}`
    },
    testCases: [
      { input: [2, [[1,0]]], expected: true },
      { input: [2, [[1,0],[0,1]]], expected: false }
    ],
    acceptance: 46, totalSubmissions: 5900, acceptedSubmissions: 2714
  },
  {
    title: 'Implement Trie',
    slug: 'implement-trie',
    difficulty: 'Medium',
    tags: ['Hash Table', 'String', 'Design', 'Trie'],
    description: 'Implement a trie with insert, search, and startsWith methods.',
    examples: [
      { input: 'Trie trie = new Trie(); trie.insert("apple"); trie.search("apple"); trie.search("app"); trie.startsWith("app");', output: 'true, false, true' }
    ],
    constraints: ['1 <= word.length, prefix.length <= 2000'],
    hints: ['Each node stores children and an end-of-word flag.'],
    starterCode: {
      javascript: `class Trie {\n  constructor() {\n    \n  }\n  insert(word) {\n    \n  }\n  search(word) {\n    \n  }\n  startsWith(prefix) {\n    \n  }\n}`,
      python: `class Trie:\n    def __init__(self):\n        pass\n    def insert(self, word):\n        pass\n    def search(self, word):\n        pass\n    def starts_with(self, prefix):\n        pass`,
      java: `class Trie {\n    public Trie() {}\n    public void insert(String word) {}\n    public boolean search(String word) { return false; }\n    public boolean startsWith(String prefix) { return false; }\n}`
    },
    testCases: [
      { input: ['apple'], expected: true }
    ],
    acceptance: 61, totalSubmissions: 4800, acceptedSubmissions: 2928
  },
  {
    title: 'Kth Smallest Element in a BST',
    slug: 'kth-smallest-element-in-bst',
    difficulty: 'Medium',
    tags: ['Tree', 'DFS', 'Binary Search Tree'],
    description: 'Given the root of a binary search tree and an integer k, return the kth smallest value (1-indexed).',
    examples: [
      { input: 'root = [3,1,4,null,2], k = 1', output: '1' },
      { input: 'root = [5,3,6,2,4,null,null,1], k = 3', output: '3' }
    ],
    constraints: ['1 <= k <= n <= 10^4'],
    hints: ['In-order traversal of a BST gives sorted order.'],
    starterCode: {
      javascript: `function kthSmallest(root, k) {\n  \n}`,
      python: `def kth_smallest(root, k):\n    pass`,
      java: `class Solution {\n    public int kthSmallest(TreeNode root, int k) {\n        \n    }\n}`
    },
    testCases: [
      { input: [null, 1], expected: 0 }
    ],
    acceptance: 71, totalSubmissions: 4900, acceptedSubmissions: 3479
  },
  {
    title: 'Validate Binary Search Tree',
    slug: 'validate-binary-search-tree',
    difficulty: 'Medium',
    tags: ['Tree', 'DFS', 'Binary Search Tree'],
    description: 'Given the root of a binary tree, determine if it is a valid binary search tree (BST).',
    examples: [
      { input: 'root = [2,1,3]', output: 'true' },
      { input: 'root = [5,1,4,null,null,3,6]', output: 'false' }
    ],
    constraints: ['Number of nodes in [1, 10^4].'],
    hints: ['Pass min and max constraints as you recurse.'],
    starterCode: {
      javascript: `function isValidBST(root) {\n  \n}`,
      python: `def is_valid_bst(root):\n    pass`,
      java: `class Solution {\n    public boolean isValidBST(TreeNode root) {\n        \n    }\n}`
    },
    testCases: [
      { input: [null], expected: true }
    ],
    acceptance: 33, totalSubmissions: 6500, acceptedSubmissions: 2145
  },
  {
    title: 'Lowest Common Ancestor of a Binary Tree',
    slug: 'lowest-common-ancestor-binary-tree',
    difficulty: 'Medium',
    tags: ['Tree', 'DFS', 'Binary Tree'],
    description: 'Given a binary tree, find the lowest common ancestor (LCA) of two given nodes p and q.',
    examples: [
      { input: 'root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1', output: '3' },
      { input: 'root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4', output: '5' }
    ],
    constraints: ['The number of nodes is in [2, 10^5].'],
    hints: ['If both nodes are found in different subtrees, current node is LCA.'],
    starterCode: {
      javascript: `function lowestCommonAncestor(root, p, q) {\n  \n}`,
      python: `def lowest_common_ancestor(root, p, q):\n    pass`,
      java: `class Solution {\n    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n        \n    }\n}`
    },
    testCases: [
      { input: [null, null, null], expected: null }
    ],
    acceptance: 60, totalSubmissions: 5200, acceptedSubmissions: 3120
  },
  {
    title: 'Letter Combinations of a Phone Number',
    slug: 'letter-combinations-of-a-phone-number',
    difficulty: 'Medium',
    tags: ['Hash Table', 'String', 'Backtracking'],
    description: 'Given a string containing digits from 2-9, return all possible letter combinations that the number could represent (like a phone keypad).',
    examples: [
      { input: 'digits = "23"', output: '["ad","ae","af","bd","be","bf","cd","ce","cf"]' },
      { input: 'digits = ""', output: '[]' }
    ],
    constraints: ['0 <= digits.length <= 4'],
    hints: ['Use backtracking to build combinations.'],
    starterCode: {
      javascript: `function letterCombinations(digits) {\n  \n}`,
      python: `def letter_combinations(digits):\n    pass`,
      java: `class Solution {\n    public List<String> letterCombinations(String digits) {\n        \n    }\n}`
    },
    testCases: [
      { input: ['23'], expected: ['ad','ae','af','bd','be','bf','cd','ce','cf'] },
      { input: [''], expected: [] }
    ],
    acceptance: 57, totalSubmissions: 5800, acceptedSubmissions: 3306
  },
  {
    title: 'Combination Sum',
    slug: 'combination-sum',
    difficulty: 'Medium',
    tags: ['Array', 'Backtracking'],
    description: 'Given an array of distinct integers candidates and a target integer, return all unique combinations of candidates where the chosen numbers sum to target. The same number may be chosen unlimited times.',
    examples: [
      { input: 'candidates = [2,3,6,7], target = 7', output: '[[2,2,3],[7]]' },
      { input: 'candidates = [2,3,5], target = 8', output: '[[2,2,2,2],[2,3,3],[3,5]]' }
    ],
    constraints: ['1 <= candidates.length <= 30'],
    hints: ['Use backtracking. Start from current index to avoid duplicates.'],
    starterCode: {
      javascript: `function combinationSum(candidates, target) {\n  \n}`,
      python: `def combination_sum(candidates, target):\n    pass`,
      java: `class Solution {\n    public List<List<Integer>> combinationSum(int[] candidates, int target) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[2,3,6,7], 7], expected: [[2,2,3],[7]] },
      { input: [[2,3,5], 8], expected: [[2,2,2,2],[2,3,3],[3,5]] }
    ],
    acceptance: 70, totalSubmissions: 5400, acceptedSubmissions: 3780
  },
  {
    title: 'Permutations',
    slug: 'permutations',
    difficulty: 'Medium',
    tags: ['Array', 'Backtracking'],
    description: 'Given an array nums of distinct integers, return all possible permutations.',
    examples: [
      { input: 'nums = [1,2,3]', output: '[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]' },
      { input: 'nums = [0,1]', output: '[[0,1],[1,0]]' }
    ],
    constraints: ['1 <= nums.length <= 6'],
    hints: ['Use backtracking with a used array.'],
    starterCode: {
      javascript: `function permute(nums) {\n  \n}`,
      python: `def permute(nums):\n    pass`,
      java: `class Solution {\n    public List<List<Integer>> permute(int[] nums) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[1,2,3]], expected: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]] },
      { input: [[0,1]], expected: [[0,1],[1,0]] }
    ],
    acceptance: 76, totalSubmissions: 5100, acceptedSubmissions: 3876
  },
  {
    title: 'Word Break',
    slug: 'word-break',
    difficulty: 'Medium',
    tags: ['Hash Table', 'String', 'Dynamic Programming', 'Trie'],
    description: 'Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of words from wordDict.',
    examples: [
      { input: 's = "leetcode", wordDict = ["leet","code"]', output: 'true' },
      { input: 's = "catsandog", wordDict = ["cats","dog","sand","and","cat"]', output: 'false' }
    ],
    constraints: ['1 <= s.length <= 300'],
    hints: ['Use DP. dp[i] = true if s[0..i] can be segmented.'],
    starterCode: {
      javascript: `function wordBreak(s, wordDict) {\n  \n}`,
      python: `def word_break(s, word_dict):\n    pass`,
      java: `class Solution {\n    public boolean wordBreak(String s, List<String> wordDict) {\n        \n    }\n}`
    },
    testCases: [
      { input: ['leetcode', ['leet','code']], expected: true },
      { input: ['catsandog', ['cats','dog','sand','and','cat']], expected: false }
    ],
    acceptance: 44, totalSubmissions: 5900, acceptedSubmissions: 2596
  },
  {
    title: 'Clone Graph',
    slug: 'clone-graph',
    difficulty: 'Medium',
    tags: ['Hash Table', 'DFS', 'BFS', 'Graph'],
    description: 'Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.',
    examples: [
      { input: 'adjList = [[2,4],[1,3],[2,4],[1,3]]', output: '[[2,4],[1,3],[2,4],[1,3]]' }
    ],
    constraints: ['The number of nodes is in [0, 100].'],
    hints: ['Use a hash map to map old nodes to new nodes.'],
    starterCode: {
      javascript: `function cloneGraph(node) {\n  \n}`,
      python: `def clone_graph(node):\n    pass`,
      java: `class Solution {\n    public Node cloneGraph(Node node) {\n        \n    }\n}`
    },
    testCases: [
      { input: [null], expected: null }
    ],
    acceptance: 56, totalSubmissions: 4700, acceptedSubmissions: 2632
  },
  {
    title: 'Maximum Product Subarray',
    slug: 'maximum-product-subarray',
    difficulty: 'Medium',
    tags: ['Array', 'Dynamic Programming'],
    description: 'Given an integer array nums, find a subarray that has the largest product and return the product.',
    examples: [
      { input: 'nums = [2,3,-2,4]', output: '6' },
      { input: 'nums = [-2,0,-1]', output: '0' }
    ],
    constraints: ['1 <= nums.length <= 2*10^4'],
    hints: ['Track both max and min products at each position.'],
    starterCode: {
      javascript: `function maxProduct(nums) {\n  \n}`,
      python: `def max_product(nums):\n    pass`,
      java: `class Solution {\n    public int maxProduct(int[] nums) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[2,3,-2,4]], expected: 6 },
      { input: [[-2,0,-1]], expected: 0 }
    ],
    acceptance: 34, totalSubmissions: 6100, acceptedSubmissions: 2074
  },
  {
    title: 'Find Peak Element',
    slug: 'find-peak-element',
    difficulty: 'Medium',
    tags: ['Array', 'Binary Search'],
    description: 'A peak element is greater than its neighbors. Given nums, find a peak element and return its index. Must run in O(log n).',
    examples: [
      { input: 'nums = [1,2,3,1]', output: '2' },
      { input: 'nums = [1,2,1,3,5,6,4]', output: '5' }
    ],
    constraints: ['1 <= nums.length <= 1000'],
    hints: ['Use binary search. Move toward the larger neighbor.'],
    starterCode: {
      javascript: `function findPeakElement(nums) {\n  \n}`,
      python: `def find_peak_element(nums):\n    pass`,
      java: `class Solution {\n    public int findPeakElement(int[] nums) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[1,2,3,1]], expected: 2 },
      { input: [[1]], expected: 0 }
    ],
    acceptance: 46, totalSubmissions: 5200, acceptedSubmissions: 2392
  },
  {
    title: 'Sort Colors',
    slug: 'sort-colors',
    difficulty: 'Medium',
    tags: ['Array', 'Two Pointers', 'Sorting'],
    description: 'Given an array nums with n objects colored red, white, or blue (0, 1, 2), sort them in-place so that objects of the same color are adjacent in order red, white, blue. Must do in one pass using O(1) space.',
    examples: [
      { input: 'nums = [2,0,2,1,1,0]', output: '[0,0,1,1,2,2]' },
      { input: 'nums = [2,0,1]', output: '[0,1,2]' }
    ],
    constraints: ['1 <= n <= 300'],
    hints: ['Dutch National Flag algorithm: three pointers low, mid, high.'],
    starterCode: {
      javascript: `function sortColors(nums) {\n  \n}`,
      python: `def sort_colors(nums):\n    pass`,
      java: `class Solution {\n    public void sortColors(int[] nums) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[2,0,2,1,1,0]], expected: [0,0,1,1,2,2] },
      { input: [[2,0,1]], expected: [0,1,2] }
    ],
    acceptance: 61, totalSubmissions: 5800, acceptedSubmissions: 3538
  },
  {
    title: 'Jump Game II',
    slug: 'jump-game-ii',
    difficulty: 'Medium',
    tags: ['Array', 'Dynamic Programming', 'Greedy'],
    description: 'Given a 0-indexed array of integers nums, return the minimum number of jumps to reach the last index.',
    examples: [
      { input: 'nums = [2,3,1,1,4]', output: '2', explanation: 'Jump from index 0 to 1, then to last.' },
      { input: 'nums = [2,3,0,1,4]', output: '2' }
    ],
    constraints: ['1 <= nums.length <= 10^4'],
    hints: ['Track the current reach and maximum reach greedily.'],
    starterCode: {
      javascript: `function jump(nums) {\n  \n}`,
      python: `def jump(nums):\n    pass`,
      java: `class Solution {\n    public int jump(int[] nums) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[2,3,1,1,4]], expected: 2 },
      { input: [[2,3,0,1,4]], expected: 2 }
    ],
    acceptance: 40, totalSubmissions: 5700, acceptedSubmissions: 2280
  },
  {
    title: 'Gas Station',
    slug: 'gas-station',
    difficulty: 'Medium',
    tags: ['Array', 'Greedy'],
    description: 'There are n gas stations along a circular route. Given gas[i] and cost[i] arrays, find the starting gas station index from which you can travel around the circuit, or -1 if impossible.',
    examples: [
      { input: 'gas = [1,2,3,4,5], cost = [3,4,5,1,2]', output: '3' },
      { input: 'gas = [2,3,4], cost = [3,4,3]', output: '-1' }
    ],
    constraints: ['1 <= n <= 10^5'],
    hints: ['If total gas >= total cost, a solution exists. Track running sum.'],
    starterCode: {
      javascript: `function canCompleteCircuit(gas, cost) {\n  \n}`,
      python: `def can_complete_circuit(gas, cost):\n    pass`,
      java: `class Solution {\n    public int canCompleteCircuit(int[] gas, int[] cost) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[1,2,3,4,5],[3,4,5,1,2]], expected: 3 },
      { input: [[2,3,4],[3,4,3]], expected: -1 }
    ],
    acceptance: 45, totalSubmissions: 5500, acceptedSubmissions: 2475
  },
  {
    title: 'Set Matrix Zeroes',
    slug: 'set-matrix-zeroes',
    difficulty: 'Medium',
    tags: ['Array', 'Hash Table', 'Matrix'],
    description: 'Given an m x n integer matrix, if an element is 0, set its entire row and column to 0s. You must do it in place.',
    examples: [
      { input: 'matrix = [[1,1,1],[1,0,1],[1,1,1]]', output: '[[1,0,1],[0,0,0],[1,0,1]]' },
    ],
    constraints: ['1 <= m, n <= 200'],
    hints: ['Use the first row/col as markers to avoid extra space.'],
    starterCode: {
      javascript: `function setZeroes(matrix) {\n  \n}`,
      python: `def set_zeroes(matrix):\n    pass`,
      java: `class Solution {\n    public void setZeroes(int[][] matrix) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[[1,1,1],[1,0,1],[1,1,1]]], expected: [[1,0,1],[0,0,0],[1,0,1]] }
    ],
    acceptance: 54, totalSubmissions: 5100, acceptedSubmissions: 2754
  },
  {
    title: 'Longest Increasing Subsequence',
    slug: 'longest-increasing-subsequence',
    difficulty: 'Medium',
    tags: ['Array', 'Binary Search', 'Dynamic Programming'],
    description: 'Given an integer array nums, return the length of the longest strictly increasing subsequence.',
    examples: [
      { input: 'nums = [10,9,2,5,3,7,101,18]', output: '4', explanation: '[2,3,7,101].' },
      { input: 'nums = [7,7,7,7,7,7,7]', output: '1' }
    ],
    constraints: ['1 <= nums.length <= 2500'],
    hints: ['Use DP O(n^2) or patience sort with binary search O(n log n).'],
    starterCode: {
      javascript: `function lengthOfLIS(nums) {\n  \n}`,
      python: `def length_of_lis(nums):\n    pass`,
      java: `class Solution {\n    public int lengthOfLIS(int[] nums) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[10,9,2,5,3,7,101,18]], expected: 4 },
      { input: [[7,7,7,7,7,7,7]], expected: 1 }
    ],
    acceptance: 52, totalSubmissions: 5600, acceptedSubmissions: 2912
  },
  // NEW MEDIUM PROBLEMS ────────────────────────────────────────────────────────
  {
    title: 'Partition Equal Subset Sum',
    slug: 'partition-equal-subset-sum',
    difficulty: 'Medium',
    tags: ['Array', 'Dynamic Programming'],
    description: 'Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal.',
    examples: [
      { input: 'nums = [1,5,11,5]', output: 'true', explanation: '[1,5,5] and [11].' },
      { input: 'nums = [1,2,3,5]', output: 'false' }
    ],
    constraints: ['1 <= nums.length <= 200', '1 <= nums[i] <= 100'],
    hints: ['This is a 0/1 knapsack problem. Target = sum/2.'],
    starterCode: {
      javascript: `function canPartition(nums) {\n  \n}`,
      python: `def can_partition(nums):\n    pass`,
      java: `class Solution {\n    public boolean canPartition(int[] nums) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[1,5,11,5]], expected: true },
      { input: [[1,2,3,5]], expected: false }
    ],
    acceptance: 47, totalSubmissions: 5400, acceptedSubmissions: 2538
  },
  {
    title: 'Flatten Binary Tree to Linked List',
    slug: 'flatten-binary-tree-to-linked-list',
    difficulty: 'Medium',
    tags: ['Linked List', 'Stack', 'Tree', 'DFS', 'Binary Tree'],
    description: 'Given the root of a binary tree, flatten the tree into a linked list in-place following preorder traversal.',
    examples: [
      { input: 'root = [1,2,5,3,4,null,6]', output: '[1,null,2,null,3,null,4,null,5,null,6]' },
      { input: 'root = []', output: '[]' }
    ],
    constraints: ['The number of nodes is in [0, 2000].'],
    hints: ['For each node, attach left subtree between node and right, then recurse.'],
    starterCode: {
      javascript: `function flatten(root) {\n  \n}`,
      python: `def flatten(root):\n    pass`,
      java: `class Solution {\n    public void flatten(TreeNode root) {\n        \n    }\n}`
    },
    testCases: [
      { input: [null], expected: null }
    ],
    acceptance: 62, totalSubmissions: 5100, acceptedSubmissions: 3162
  },
  {
    title: 'Populating Next Right Pointers in Each Node',
    slug: 'populating-next-right-pointers',
    difficulty: 'Medium',
    tags: ['Linked List', 'Tree', 'BFS', 'DFS', 'Binary Tree'],
    description: 'Given a perfect binary tree, populate each node\'s next pointer to point to its next right node. If there is no next right node, set it to null.',
    examples: [
      { input: 'root = [1,2,3,4,5,6,7]', output: '[1,#,2,3,#,4,5,6,7,#]' },
      { input: 'root = []', output: '[]' }
    ],
    constraints: ['The number of nodes is in [0, 2^12 - 1].'],
    hints: ['Use previously set next pointers to traverse level without extra queue.'],
    starterCode: {
      javascript: `function connect(root) {\n  \n}`,
      python: `def connect(root):\n    pass`,
      java: `class Solution {\n    public Node connect(Node root) {\n        \n    }\n}`
    },
    testCases: [
      { input: [null], expected: null }
    ],
    acceptance: 65, totalSubmissions: 4900, acceptedSubmissions: 3185
  },
  {
    title: 'Rotate List',
    slug: 'rotate-list',
    difficulty: 'Medium',
    tags: ['Linked List', 'Two Pointers'],
    description: 'Given the head of a linked list, rotate the list to the right by k places.',
    examples: [
      { input: 'head = [1,2,3,4,5], k = 2', output: '[4,5,1,2,3]' },
      { input: 'head = [0,1,2], k = 4', output: '[2,0,1]' }
    ],
    constraints: ['0 <= k <= 2*10^9'],
    hints: ['Connect tail to head, then cut at position (len - k % len - 1).'],
    starterCode: {
      javascript: `function rotateRight(head, k) {\n  \n}`,
      python: `def rotate_right(head, k):\n    pass`,
      java: `class Solution {\n    public ListNode rotateRight(ListNode head, int k) {\n        \n    }\n}`
    },
    testCases: [
      { input: [null, 0], expected: null }
    ],
    acceptance: 38, totalSubmissions: 5200, acceptedSubmissions: 1976
  },
  {
    title: 'Daily Temperatures',
    slug: 'daily-temperatures',
    difficulty: 'Medium',
    tags: ['Array', 'Stack', 'Monotonic Stack'],
    description: 'Given an array of integers temperatures representing daily temperatures, return an array answer where answer[i] is the number of days until a warmer temperature. If no future warmer day exists, answer[i] == 0.',
    examples: [
      { input: 'temperatures = [73,74,75,71,69,72,76,73]', output: '[1,1,4,2,1,1,0,0]' },
      { input: 'temperatures = [30,40,50,60]', output: '[1,1,1,0]' }
    ],
    constraints: ['1 <= temperatures.length <= 10^5', '30 <= temperatures[i] <= 100'],
    hints: ['Use a monotonic decreasing stack of indices.'],
    starterCode: {
      javascript: `function dailyTemperatures(temperatures) {\n  \n}`,
      python: `def daily_temperatures(temperatures):\n    pass`,
      java: `class Solution {\n    public int[] dailyTemperatures(int[] temperatures) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[73,74,75,71,69,72,76,73]], expected: [1,1,4,2,1,1,0,0] },
      { input: [[30,40,50,60]], expected: [1,1,1,0] }
    ],
    acceptance: 67, totalSubmissions: 5600, acceptedSubmissions: 3752
  },
  {
    title: 'Decode String',
    slug: 'decode-string',
    difficulty: 'Medium',
    tags: ['String', 'Stack', 'Recursion'],
    description: 'Given an encoded string, return its decoded string. The encoding rule is: k[encoded_string], where the encoded_string inside the brackets is repeated exactly k times.',
    examples: [
      { input: 's = "3[a]2[bc]"', output: '"aaabcbc"' },
      { input: 's = "3[a2[c]]"', output: '"accaccacc"' },
      { input: 's = "2[abc]3[cd]ef"', output: '"abcabccdcdcdef"' }
    ],
    constraints: ['1 <= s.length <= 30', 'Guaranteed the input is always valid.'],
    hints: ['Use a stack. Push current string and count when you see [, pop and repeat when you see ].'],
    starterCode: {
      javascript: `function decodeString(s) {\n  \n}`,
      python: `def decode_string(s):\n    pass`,
      java: `class Solution {\n    public String decodeString(String s) {\n        \n    }\n}`
    },
    testCases: [
      { input: ['3[a]2[bc]'], expected: 'aaabcbc' },
      { input: ['3[a2[c]]'], expected: 'accaccacc' },
      { input: ['2[abc]3[cd]ef'], expected: 'abcabccdcdcdef' }
    ],
    acceptance: 58, totalSubmissions: 5300, acceptedSubmissions: 3074
  },

  // ─── HARD (14 problems) ───────────────────────────────────────────────────────
  {
    title: 'Median of Two Sorted Arrays',
    slug: 'median-of-two-sorted-arrays',
    difficulty: 'Hard',
    tags: ['Array', 'Binary Search', 'Divide and Conquer'],
    description: 'Given two sorted arrays nums1 and nums2, return the median. Must run in O(log(m+n)).',
    examples: [
      { input: 'nums1 = [1,3], nums2 = [2]', output: '2.00000' },
      { input: 'nums1 = [1,2], nums2 = [3,4]', output: '2.50000' }
    ],
    constraints: ['0 <= m, n <= 1000', '1 <= m + n <= 2000'],
    hints: ['Binary search on the smaller array.'],
    starterCode: {
      javascript: `function findMedianSortedArrays(nums1, nums2) {\n  \n}`,
      python: `def find_median_sorted_arrays(nums1, nums2):\n    pass`,
      java: `class Solution {\n    public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[1,3],[2]], expected: 2.0 },
      { input: [[1,2],[3,4]], expected: 2.5 }
    ],
    acceptance: 38, totalSubmissions: 4231, acceptedSubmissions: 1607
  },
  {
    title: 'Word Search II',
    slug: 'word-search-ii',
    difficulty: 'Hard',
    tags: ['Array', 'Backtracking', 'Trie', 'Matrix'],
    description: 'Given an m x n board of characters and a list of strings words, return all words on the board. Words can be constructed from sequentially adjacent cells.',
    examples: [
      { input: 'board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]', output: '["eat","oath"]' }
    ],
    constraints: ['1 <= m, n <= 12'],
    hints: ['Build a Trie from words, then DFS on the board.'],
    starterCode: {
      javascript: `function findWords(board, words) {\n  \n}`,
      python: `def find_words(board, words):\n    pass`,
      java: `class Solution {\n    public List<String> findWords(char[][] board, String[] words) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[["a","b"],["c","d"]], ["ab","cb","ad","bd","ac","ca","da","bc","db","adcb","dabc","abb","adc"]], expected: ["ab","ac","ad","bd","bc","db","cb"] }
    ],
    acceptance: 38, totalSubmissions: 4100, acceptedSubmissions: 1558
  },
  {
    title: 'Merge K Sorted Lists',
    slug: 'merge-k-sorted-lists',
    difficulty: 'Hard',
    tags: ['Linked List', 'Divide and Conquer', 'Heap', 'Merge Sort'],
    description: 'You are given an array of k linked-lists, each sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.',
    examples: [
      { input: 'lists = [[1,4,5],[1,3,4],[2,6]]', output: '[1,1,2,3,4,4,5,6]' },
      { input: 'lists = []', output: '[]' }
    ],
    constraints: ['0 <= k <= 10^4'],
    hints: ['Use a min-heap or divide and conquer merging.'],
    starterCode: {
      javascript: `function mergeKLists(lists) {\n  \n}`,
      python: `def merge_k_lists(lists):\n    pass`,
      java: `class Solution {\n    public ListNode mergeKLists(ListNode[] lists) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[null]], expected: null }
    ],
    acceptance: 50, totalSubmissions: 5100, acceptedSubmissions: 2550
  },
  {
    title: 'Trapping Rain Water',
    slug: 'trapping-rain-water',
    difficulty: 'Hard',
    tags: ['Array', 'Two Pointers', 'Dynamic Programming', 'Stack'],
    description: 'Given n non-negative integers representing an elevation map, compute how much water it can trap after raining.',
    examples: [
      { input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', output: '6' },
      { input: 'height = [4,2,0,3,2,5]', output: '9' }
    ],
    constraints: ['1 <= n <= 2*10^4'],
    hints: ['Use two pointers. Water at each position = min(maxLeft, maxRight) - height[i].'],
    starterCode: {
      javascript: `function trap(height) {\n  \n}`,
      python: `def trap(height):\n    pass`,
      java: `class Solution {\n    public int trap(int[] height) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[0,1,0,2,1,0,1,3,2,1,2,1]], expected: 6 },
      { input: [[4,2,0,3,2,5]], expected: 9 }
    ],
    acceptance: 59, totalSubmissions: 5600, acceptedSubmissions: 3304
  },
  {
    title: 'N-Queens',
    slug: 'n-queens',
    difficulty: 'Hard',
    tags: ['Array', 'Backtracking'],
    description: 'The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other. Return all distinct solutions.',
    examples: [
      { input: 'n = 4', output: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]' },
      { input: 'n = 1', output: '[["Q"]]' }
    ],
    constraints: ['1 <= n <= 9'],
    hints: ['Use backtracking with sets for columns, diagonals, and anti-diagonals.'],
    starterCode: {
      javascript: `function solveNQueens(n) {\n  \n}`,
      python: `def solve_n_queens(n):\n    pass`,
      java: `class Solution {\n    public List<List<String>> solveNQueens(int n) {\n        \n    }\n}`
    },
    testCases: [
      { input: [1], expected: [['Q']] },
      { input: [4], expected: [['.Q..','...Q','Q...','..Q.'],['..Q.','Q...','...Q','.Q..']] }
    ],
    acceptance: 68, totalSubmissions: 3900, acceptedSubmissions: 2652
  },
  {
    title: 'Word Search',
    slug: 'word-search',
    difficulty: 'Hard',
    tags: ['Array', 'DFS', 'Backtracking', 'Matrix'],
    description: 'Given an m x n grid of characters and a string word, return true if word exists in the grid. The word can be constructed from sequentially adjacent cells. The same cell may not be used more than once.',
    examples: [
      { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"', output: 'true' },
      { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"', output: 'false' }
    ],
    constraints: ['1 <= m, n <= 6', '1 <= word.length <= 15'],
    hints: ['Use DFS with backtracking. Mark cells as visited.'],
    starterCode: {
      javascript: `function exist(board, word) {\n  \n}`,
      python: `def exist(board, word):\n    pass`,
      java: `class Solution {\n    public boolean exist(char[][] board, String word) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[["A","B"],["C","D"]], "AB"], expected: true },
      { input: [[["A","B"],["C","D"]], "AZ"], expected: false }
    ],
    acceptance: 40, totalSubmissions: 4700, acceptedSubmissions: 1880
  },
  {
    title: 'Longest Valid Parentheses',
    slug: 'longest-valid-parentheses',
    difficulty: 'Hard',
    tags: ['String', 'Dynamic Programming', 'Stack'],
    description: 'Given a string containing just ( and ), return the length of the longest valid parentheses substring.',
    examples: [
      { input: 's = "(()"', output: '2' },
      { input: 's = ")()())"', output: '4' },
      { input: 's = ""', output: '0' }
    ],
    constraints: ['0 <= s.length <= 3*10^4'],
    hints: ['Use a stack to track indices, or DP.'],
    starterCode: {
      javascript: `function longestValidParentheses(s) {\n  \n}`,
      python: `def longest_valid_parentheses(s):\n    pass`,
      java: `class Solution {\n    public int longestValidParentheses(String s) {\n        \n    }\n}`
    },
    testCases: [
      { input: ['(()'], expected: 2 },
      { input: [')()())'], expected: 4 },
      { input: [''], expected: 0 }
    ],
    acceptance: 33, totalSubmissions: 4900, acceptedSubmissions: 1617
  },
  {
    title: 'Regular Expression Matching',
    slug: 'regular-expression-matching',
    difficulty: 'Hard',
    tags: ['String', 'Dynamic Programming', 'Recursion'],
    description: 'Given an input string s and a pattern p, implement regular expression matching with . and *. . matches any single character, * matches zero or more of the preceding element.',
    examples: [
      { input: 's = "aa", p = "a"', output: 'false' },
      { input: 's = "aa", p = "a*"', output: 'true' },
      { input: 's = "ab", p = ".*"', output: 'true' }
    ],
    constraints: ['1 <= s.length <= 20', '1 <= p.length <= 30'],
    hints: ['Use 2D DP. dp[i][j] = isMatch(s[i:], p[j:]).'],
    starterCode: {
      javascript: `function isMatch(s, p) {\n  \n}`,
      python: `def is_match(s, p):\n    pass`,
      java: `class Solution {\n    public boolean isMatch(String s, String p) {\n        \n    }\n}`
    },
    testCases: [
      { input: ['aa', 'a'], expected: false },
      { input: ['aa', 'a*'], expected: true },
      { input: ['ab', '.*'], expected: true }
    ],
    acceptance: 28, totalSubmissions: 5200, acceptedSubmissions: 1456
  },
  {
    title: 'Sliding Window Maximum',
    slug: 'sliding-window-maximum',
    difficulty: 'Hard',
    tags: ['Array', 'Queue', 'Sliding Window', 'Monotonic Queue'],
    description: 'Given an array nums and a sliding window of size k, return the max values for each sliding window position.',
    examples: [
      { input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3', output: '[3,3,5,5,6,7]' },
      { input: 'nums = [1], k = 1', output: '[1]' }
    ],
    constraints: ['1 <= nums.length <= 10^5', '1 <= k <= nums.length'],
    hints: ['Use a monotonic deque to track max in window.'],
    starterCode: {
      javascript: `function maxSlidingWindow(nums, k) {\n  \n}`,
      python: `def max_sliding_window(nums, k):\n    pass`,
      java: `class Solution {\n    public int[] maxSlidingWindow(int[] nums, int k) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[1,3,-1,-3,5,3,6,7], 3], expected: [3,3,5,5,6,7] },
      { input: [[1], 1], expected: [1] }
    ],
    acceptance: 46, totalSubmissions: 4800, acceptedSubmissions: 2208
  },
  {
    title: 'Serialize and Deserialize Binary Tree',
    slug: 'serialize-and-deserialize-binary-tree',
    difficulty: 'Hard',
    tags: ['String', 'Tree', 'DFS', 'BFS', 'Design', 'Binary Tree'],
    description: 'Design an algorithm to serialize and deserialize a binary tree.',
    examples: [
      { input: 'root = [1,2,3,null,null,4,5]', output: '[1,2,3,null,null,4,5]' }
    ],
    constraints: ['The number of nodes is in [0, 10^4].'],
    hints: ['Use BFS or DFS with a delimiter to mark null nodes.'],
    starterCode: {
      javascript: `const serialize = function(root) {\n  \n};\nconst deserialize = function(data) {\n  \n};`,
      python: `class Codec:\n    def serialize(self, root):\n        pass\n    def deserialize(self, data):\n        pass`,
      java: `public class Codec {\n    public String serialize(TreeNode root) { return ""; }\n    public TreeNode deserialize(String data) { return null; }\n}`
    },
    testCases: [
      { input: [null], expected: null }
    ],
    acceptance: 57, totalSubmissions: 4300, acceptedSubmissions: 2451
  },
  {
    title: 'Find Median from Data Stream',
    slug: 'find-median-from-data-stream',
    difficulty: 'Hard',
    tags: ['Two Pointers', 'Design', 'Sorting', 'Heap'],
    description: 'Implement a MedianFinder class that supports addNum(num) and findMedian() operations.',
    examples: [
      { input: 'addNum(1), addNum(2), findMedian(), addNum(3), findMedian()', output: '1.5, 2.0' }
    ],
    constraints: ['-10^5 <= num <= 10^5', 'At most 5*10^4 calls will be made.'],
    hints: ['Use two heaps: a max-heap for the lower half and min-heap for the upper half.'],
    starterCode: {
      javascript: `class MedianFinder {\n  constructor() {\n    \n  }\n  addNum(num) {\n    \n  }\n  findMedian() {\n    \n  }\n}`,
      python: `class MedianFinder:\n    def __init__(self):\n        pass\n    def add_num(self, num):\n        pass\n    def find_median(self):\n        pass`,
      java: `class MedianFinder {\n    public MedianFinder() {}\n    public void addNum(int num) {}\n    public double findMedian() { return 0.0; }\n}`
    },
    testCases: [
      { input: [1], expected: 1.0 }
    ],
    acceptance: 51, totalSubmissions: 3900, acceptedSubmissions: 1989
  },
  {
    title: 'Largest Rectangle in Histogram',
    slug: 'largest-rectangle-in-histogram',
    difficulty: 'Hard',
    tags: ['Array', 'Stack', 'Monotonic Stack'],
    description: 'Given an array of integers heights representing histogram bar heights, find the area of the largest rectangle in the histogram.',
    examples: [
      { input: 'heights = [2,1,5,6,2,3]', output: '10' },
      { input: 'heights = [2,4]', output: '4' }
    ],
    constraints: ['1 <= heights.length <= 10^5'],
    hints: ['Use a monotonic stack to find the nearest smaller bar on each side.'],
    starterCode: {
      javascript: `function largestRectangleArea(heights) {\n  \n}`,
      python: `def largest_rectangle_area(heights):\n    pass`,
      java: `class Solution {\n    public int largestRectangleArea(int[] heights) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[2,1,5,6,2,3]], expected: 10 },
      { input: [[2,4]], expected: 4 }
    ],
    acceptance: 43, totalSubmissions: 4600, acceptedSubmissions: 1978
  },
  {
    title: 'Edit Distance',
    slug: 'edit-distance',
    difficulty: 'Hard',
    tags: ['String', 'Dynamic Programming'],
    description: 'Given two strings word1 and word2, return the minimum number of operations (insert, delete, replace) required to convert word1 to word2.',
    examples: [
      { input: 'word1 = "horse", word2 = "ros"', output: '3' },
      { input: 'word1 = "intention", word2 = "execution"', output: '5' }
    ],
    constraints: ['0 <= word1.length, word2.length <= 500'],
    hints: ['Classic 2D DP problem. dp[i][j] = min ops to convert word1[0..i] to word2[0..j].'],
    starterCode: {
      javascript: `function minDistance(word1, word2) {\n  \n}`,
      python: `def min_distance(word1, word2):\n    pass`,
      java: `class Solution {\n    public int minDistance(String word1, String word2) {\n        \n    }\n}`
    },
    testCases: [
      { input: ['horse', 'ros'], expected: 3 },
      { input: ['intention', 'execution'], expected: 5 }
    ],
    acceptance: 56, totalSubmissions: 4700, acceptedSubmissions: 2632
  },
  {
    title: 'Word Break II',
    slug: 'word-break-ii',
    difficulty: 'Hard',
    tags: ['Hash Table', 'String', 'Dynamic Programming', 'Backtracking', 'Trie'],
    description: 'Given a string s and a dictionary wordDict, add spaces in s to construct a sentence where each word is a valid dictionary word. Return all such possible sentences.',
    examples: [
      { input: 's = "catsanddog", wordDict = ["cat","cats","and","sand","dog"]', output: '["cats and dog","cat sand dog"]' },
    ],
    constraints: ['1 <= s.length <= 20', '1 <= wordDict.length <= 1000'],
    hints: ['Use memoized DFS/backtracking.'],
    starterCode: {
      javascript: `function wordBreak(s, wordDict) {\n  \n}`,
      python: `def word_break(s, word_dict):\n    pass`,
      java: `class Solution {\n    public List<String> wordBreak(String s, List<String> wordDict) {\n        \n    }\n}`
    },
    testCases: [
      { input: ['catsanddog', ['cat','cats','and','sand','dog']], expected: ['cats and dog','cat sand dog'] }
    ],
    acceptance: 46, totalSubmissions: 4400, acceptedSubmissions: 2024
  },
  {
    title: 'Minimum Window Substring',
    slug: 'minimum-window-substring',
    difficulty: 'Hard',
    tags: ['Hash Table', 'String', 'Sliding Window'],
    description: 'Given strings s and t, return the minimum window substring of s such that every character in t (including duplicates) is included in the window.',
    examples: [
      { input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"' },
      { input: 's = "a", t = "a"', output: '"a"' },
      { input: 's = "a", t = "aa"', output: '""' }
    ],
    constraints: ['1 <= s.length, t.length <= 10^5'],
    hints: ['Expand right pointer, then shrink left pointer when window is valid.'],
    starterCode: {
      javascript: `function minWindow(s, t) {\n  \n}`,
      python: `def min_window(s, t):\n    pass`,
      java: `class Solution {\n    public String minWindow(String s, String t) {\n        \n    }\n}`
    },
    testCases: [
      { input: ['ADOBECODEBANC', 'ABC'], expected: 'BANC' },
      { input: ['a', 'a'], expected: 'a' },
      { input: ['a', 'aa'], expected: '' }
    ],
    acceptance: 41, totalSubmissions: 5100, acceptedSubmissions: 2091
  },
  {
    title: 'Burst Balloons',
    slug: 'burst-balloons',
    difficulty: 'Hard',
    tags: ['Array', 'Dynamic Programming', 'Divide and Conquer'],
    description: 'Given n balloons indexed 0 to n-1, each balloon has a number on it. If you burst balloon i you get nums[i-1]*nums[i]*nums[i+1] coins. Return the maximum coins you can collect by bursting all balloons.',
    examples: [
      { input: 'nums = [3,1,5,8]', output: '167' },
      { input: 'nums = [1,5]', output: '10' }
    ],
    constraints: ['1 <= n <= 300'],
    hints: ['Think of it as: which balloon to burst LAST in a range.'],
    starterCode: {
      javascript: `function maxCoins(nums) {\n  \n}`,
      python: `def max_coins(nums):\n    pass`,
      java: `class Solution {\n    public int maxCoins(int[] nums) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[3,1,5,8]], expected: 167 },
      { input: [[1,5]], expected: 10 }
    ],
    acceptance: 57, totalSubmissions: 3800, acceptedSubmissions: 2166
  },
  {
    title: 'Count of Smaller Numbers After Self',
    slug: 'count-of-smaller-numbers-after-self',
    difficulty: 'Hard',
    tags: ['Array', 'Binary Search', 'Divide and Conquer', 'Binary Indexed Tree', 'Merge Sort'],
    description: 'Given an integer array nums, return an integer array counts where counts[i] is the number of smaller elements to the right of nums[i].',
    examples: [
      { input: 'nums = [5,2,6,1]', output: '[2,1,1,0]' },
      { input: 'nums = [-1]', output: '[0]' }
    ],
    constraints: ['1 <= nums.length <= 10^5'],
    hints: ['Use merge sort or Binary Indexed Tree (Fenwick Tree).'],
    starterCode: {
      javascript: `function countSmaller(nums) {\n  \n}`,
      python: `def count_smaller(nums):\n    pass`,
      java: `class Solution {\n    public List<Integer> countSmaller(int[] nums) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[5,2,6,1]], expected: [2,1,1,0] },
      { input: [[-1]], expected: [0] }
    ],
    acceptance: 42, totalSubmissions: 4100, acceptedSubmissions: 1722
  },
  // NEW HARD PROBLEMS ──────────────────────────────────────────────────────────
  {
    title: 'Longest Consecutive Sequence',
    slug: 'longest-consecutive-sequence',
    difficulty: 'Hard',
    tags: ['Array', 'Hash Table', 'Union Find'],
    description: 'Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence. Must run in O(n).',
    examples: [
      { input: 'nums = [100,4,200,1,3,2]', output: '4', explanation: '[1,2,3,4].' },
      { input: 'nums = [0,3,7,2,5,8,4,6,0,1]', output: '9' }
    ],
    constraints: ['0 <= nums.length <= 10^5'],
    hints: ['Use a HashSet. For each sequence start (num-1 not in set), count forward.'],
    starterCode: {
      javascript: `function longestConsecutive(nums) {\n  \n}`,
      python: `def longest_consecutive(nums):\n    pass`,
      java: `class Solution {\n    public int longestConsecutive(int[] nums) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[100,4,200,1,3,2]], expected: 4 },
      { input: [[0,3,7,2,5,8,4,6,0,1]], expected: 9 }
    ],
    acceptance: 47, totalSubmissions: 5800, acceptedSubmissions: 2726
  },
  {
    title: 'First Missing Positive',
    slug: 'first-missing-positive',
    difficulty: 'Hard',
    tags: ['Array', 'Hash Table'],
    description: 'Given an unsorted integer array nums, return the smallest missing positive integer. Must run in O(n) time and use O(1) auxiliary space.',
    examples: [
      { input: 'nums = [1,2,0]', output: '3' },
      { input: 'nums = [3,4,-1,1]', output: '2' },
      { input: 'nums = [7,8,9,11,12]', output: '1' }
    ],
    constraints: ['1 <= nums.length <= 10^5'],
    hints: ['Place each number in its correct index position (nums[i] should be at index nums[i]-1).'],
    starterCode: {
      javascript: `function firstMissingPositive(nums) {\n  \n}`,
      python: `def first_missing_positive(nums):\n    pass`,
      java: `class Solution {\n    public int firstMissingPositive(int[] nums) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[1,2,0]], expected: 3 },
      { input: [[3,4,-1,1]], expected: 2 },
      { input: [[7,8,9,11,12]], expected: 1 }
    ],
    acceptance: 37, totalSubmissions: 4900, acceptedSubmissions: 1813
  },
  {
    title: 'Sudoku Solver',
    slug: 'sudoku-solver',
    difficulty: 'Hard',
    tags: ['Array', 'Hash Table', 'Backtracking', 'Matrix'],
    description: 'Write a program to solve a Sudoku puzzle by filling in the empty cells. Each row, column, and 3x3 box must contain 1-9 exactly once.',
    examples: [
      { input: 'board = [["5","3",".",".","7",".",".",".","."],...]', output: '[["5","3","4","6","7","8","9","1","2"],...]' }
    ],
    constraints: ['board.length == 9', 'board[i].length == 9', 'The puzzle has a unique solution.'],
    hints: ['Backtrack: find an empty cell, try 1-9, recurse. Undo on failure.'],
    starterCode: {
      javascript: `function solveSudoku(board) {\n  \n}`,
      python: `def solve_sudoku(board):\n    pass`,
      java: `class Solution {\n    public void solveSudoku(char[][] board) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]], expected: true }
    ],
    acceptance: 59, totalSubmissions: 3600, acceptedSubmissions: 2124
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Promise.all([User.deleteMany(), Problem.deleteMany(), Contest.deleteMany()]);
    console.log('Cleared existing data');

    const [admin, alice, bob, charlie] = await User.create([
      { username: 'admin', email: 'admin@codearena.com', password: 'password', role: 'admin', score: 2000, solved: [] },
      { username: 'alice', email: 'alice@example.com', password: 'password', role: 'user', score: 980, solved: [] },
      { username: 'bob', email: 'bob@example.com', password: 'password', role: 'user', score: 650, solved: [] },
      { username: 'charlie', email: 'charlie@example.com', password: 'password', role: 'user', score: 350, solved: [] },
    ]);
    console.log('Created 4 users');

    const createdProblems = await Problem.insertMany(
      PROBLEMS.map(p => ({ ...p, createdBy: admin._id }))
    );
    console.log(`Created ${createdProblems.length} problems`);

    const ids = createdProblems.map(p => p._id.toString());
    alice.solved = ids.slice(0, 10);
    bob.solved = ids.slice(0, 6);
    charlie.solved = ids.slice(0, 3);
    await Promise.all([alice.save(), bob.save(), charlie.save()]);

    const now = new Date();
    await Contest.create({
      title: 'Weekly Contest 1',
      description: 'Practice contest with classic problems. Solve as many as you can in 90 minutes!',
      startTime: new Date(now.getTime() + 2 * 60 * 60 * 1000),
      endTime: new Date(now.getTime() + 3.5 * 60 * 60 * 1000),
      problems: createdProblems.slice(0, 4).map(p => p._id),
      createdBy: admin._id
    });

    await Contest.create({
      title: 'Biweekly Contest 12',
      description: 'Medium-hard problems. Rating changes apply!',
      startTime: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
      endTime: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000 + 90 * 60 * 1000),
      problems: createdProblems.slice(2, 6).map(p => p._id),
      createdBy: admin._id,
      status: 'ended'
    });

    console.log('Created 2 contests');
    console.log('\n✅ Seed complete!');
    console.log(`📊 Total problems: ${createdProblems.length}`);
    console.log(`   Easy:   ${createdProblems.filter(p => p.difficulty === 'Easy').length}`);
    console.log(`   Medium: ${createdProblems.filter(p => p.difficulty === 'Medium').length}`);
    console.log(`   Hard:   ${createdProblems.filter(p => p.difficulty === 'Hard').length}`);
    console.log('\nDemo credentials:');
    console.log('  admin@codearena.com / password  (admin)');
    console.log('  alice@example.com   / password  (user)');
    console.log('  bob@example.com     / password  (user)');
    console.log('  charlie@example.com / password  (user)');
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
}

seed();
