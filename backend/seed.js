/**
 * Seed script — run once: node seed.js
 * Creates demo users + 15 LeetCode-style problems
 */
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Problem = require('./models/Problem');
const Contest = require('./models/Contest');

const PROBLEMS = [
  {
    title: 'Two Sum',
    slug: 'two-sum',
    difficulty: 'Easy',
    tags: ['Array', 'Hash Table'],
    description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.',
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]' },
      { input: 'nums = [3,3], target = 6', output: '[0,1]' }
    ],
    constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', '-10^9 <= target <= 10^9', 'Only one valid answer exists.'],
    hints: ['Try using a hash map to store seen numbers.'],
    starterCode: {
      javascript: `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nfunction twoSum(nums, target) {\n  \n}`,
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
    description: 'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid.\n\nAn input string is valid if:\n- Open brackets must be closed by the same type of brackets.\n- Open brackets must be closed in the correct order.\n- Every close bracket has a corresponding open bracket of the same type.',
    examples: [
      { input: 's = "()"', output: 'true' },
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' }
    ],
    constraints: ['1 <= s.length <= 10^4', 's consists of parentheses only "()[]{}"'],
    hints: ['Use a stack to track opening brackets.'],
    starterCode: {
      javascript: `/**\n * @param {string} s\n * @return {boolean}\n */\nfunction isValid(s) {\n  \n}`,
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
    title: 'Longest Substring Without Repeating Characters',
    slug: 'longest-substring-without-repeating-characters',
    difficulty: 'Medium',
    tags: ['Hash Table', 'String', 'Sliding Window'],
    description: 'Given a string `s`, find the length of the longest substring without repeating characters.',
    examples: [
      { input: 's = "abcabcbb"', output: '3', explanation: 'The answer is "abc", with length 3.' },
      { input: 's = "bbbbb"', output: '1', explanation: 'The answer is "b", with length 1.' },
      { input: 's = "pwwkew"', output: '3', explanation: 'The answer is "wke", with length 3.' }
    ],
    constraints: ['0 <= s.length <= 5 * 10^4', 's consists of English letters, digits, symbols and spaces.'],
    hints: ['Use the sliding window technique with a set.'],
    starterCode: {
      javascript: `/**\n * @param {string} s\n * @return {number}\n */\nfunction lengthOfLongestSubstring(s) {\n  \n}`,
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
    title: 'Median of Two Sorted Arrays',
    slug: 'median-of-two-sorted-arrays',
    difficulty: 'Hard',
    tags: ['Array', 'Binary Search', 'Divide and Conquer'],
    description: 'Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively, return the median of the two sorted arrays.\n\nThe overall run time complexity should be `O(log(m+n))`.',
    examples: [
      { input: 'nums1 = [1,3], nums2 = [2]', output: '2.00000', explanation: 'Merged array = [1,2,3], median is 2.' },
      { input: 'nums1 = [1,2], nums2 = [3,4]', output: '2.50000', explanation: 'Merged array = [1,2,3,4], median is (2+3)/2 = 2.5.' }
    ],
    constraints: ['nums1.length == m', 'nums2.length == n', '0 <= m <= 1000', '0 <= n <= 1000', '1 <= m + n <= 2000', '-10^6 <= nums1[i], nums2[i] <= 10^6'],
    hints: ['Try binary search on the smaller array.'],
    starterCode: {
      javascript: `/**\n * @param {number[]} nums1\n * @param {number[]} nums2\n * @return {number}\n */\nfunction findMedianSortedArrays(nums1, nums2) {\n  \n}`,
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
    title: 'Binary Tree Level Order Traversal',
    slug: 'binary-tree-level-order-traversal',
    difficulty: 'Medium',
    tags: ['Tree', 'BFS', 'Binary Tree'],
    description: 'Given the root of a binary tree, return the level order traversal of its nodes\' values (i.e., from left to right, level by level).',
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '[[3],[9,20],[15,7]]' },
      { input: 'root = [1]', output: '[[1]]' },
      { input: 'root = []', output: '[]' }
    ],
    constraints: ['The number of nodes in the tree is in the range [0, 2000].', '-1000 <= Node.val <= 1000'],
    hints: ['Use a queue (BFS) and process level by level.'],
    starterCode: {
      javascript: `/**\n * @param {TreeNode} root\n * @return {number[][]}\n */\nfunction levelOrder(root) {\n  \n}`,
      python: `def level_order(root):\n    pass`,
      java: `class Solution {\n    public List<List<Integer>> levelOrder(TreeNode root) {\n        \n    }\n}`
    },
    testCases: [
      { input: [null], expected: [] }
    ],
    acceptance: 67, totalSubmissions: 5647, acceptedSubmissions: 3783
  },
  {
    title: 'Best Time to Buy and Sell Stock',
    slug: 'best-time-to-buy-and-sell-stock',
    difficulty: 'Easy',
    tags: ['Array', 'Dynamic Programming'],
    description: 'You are given an array `prices` where `prices[i]` is the price of a given stock on the `i`th day.\n\nYou want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\n\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return `0`.',
    examples: [
      { input: 'prices = [7,1,5,3,6,4]', output: '5', explanation: 'Buy on day 2 (price=1) and sell on day 5 (price=6). Profit = 6-1 = 5.' },
      { input: 'prices = [7,6,4,3,1]', output: '0', explanation: 'No transactions done, max profit = 0.' }
    ],
    constraints: ['1 <= prices.length <= 10^5', '0 <= prices[i] <= 10^4'],
    hints: ['Track the minimum price seen so far.'],
    starterCode: {
      javascript: `/**\n * @param {number[]} prices\n * @return {number}\n */\nfunction maxProfit(prices) {\n  \n}`,
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
    title: 'Climbing Stairs',
    slug: 'climbing-stairs',
    difficulty: 'Easy',
    tags: ['Dynamic Programming', 'Math', 'Memoization'],
    description: 'You are climbing a staircase. It takes `n` steps to reach the top.\n\nEach time you can either climb `1` or `2` steps. In how many distinct ways can you climb to the top?',
    examples: [
      { input: 'n = 2', output: '2', explanation: 'Two ways: 1+1 or 2.' },
      { input: 'n = 3', output: '3', explanation: 'Three ways: 1+1+1, 1+2, or 2+1.' }
    ],
    constraints: ['1 <= n <= 45'],
    hints: ['This is essentially the Fibonacci sequence.'],
    starterCode: {
      javascript: `/**\n * @param {number} n\n * @return {number}\n */\nfunction climbStairs(n) {\n  \n}`,
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
    title: 'Merge Intervals',
    slug: 'merge-intervals',
    difficulty: 'Medium',
    tags: ['Array', 'Sorting'],
    description: 'Given an array of `intervals` where `intervals[i] = [starti, endi]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.',
    examples: [
      { input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]', explanation: 'Intervals [1,3] and [2,6] overlap → merge to [1,6].' },
      { input: 'intervals = [[1,4],[4,5]]', output: '[[1,5]]', explanation: 'Intervals [1,4] and [4,5] are considered overlapping.' }
    ],
    constraints: ['1 <= intervals.length <= 10^4', 'intervals[i].length == 2', '0 <= starti <= endi <= 10^4'],
    hints: ['Sort by start time first.'],
    starterCode: {
      javascript: `/**\n * @param {number[][]} intervals\n * @return {number[][]}\n */\nfunction merge(intervals) {\n  \n}`,
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
    title: 'Binary Search',
    slug: 'binary-search',
    difficulty: 'Easy',
    tags: ['Array', 'Binary Search'],
    description: 'Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return `-1`.\n\nYou must write an algorithm with `O(log n)` runtime complexity.',
    examples: [
      { input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4', explanation: '9 exists in nums and its index is 4.' },
      { input: 'nums = [-1,0,3,5,9,12], target = 2', output: '-1', explanation: '2 does not exist in nums so return -1.' }
    ],
    constraints: ['1 <= nums.length <= 10^4', '-10^4 < nums[i], target < 10^4', 'All integers in nums are unique.', 'nums is sorted in ascending order.'],
    hints: ['Track left and right pointers.'],
    starterCode: {
      javascript: `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number}\n */\nfunction search(nums, target) {\n  \n}`,
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
    title: 'Number of Islands',
    slug: 'number-of-islands',
    difficulty: 'Medium',
    tags: ['Array', 'DFS', 'BFS', 'Matrix'],
    description: 'Given an `m x n` 2D binary grid `grid` which represents a map of `\'1\'s` (land) and `\'0\'s` (water), return the number of islands.\n\nAn island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.',
    examples: [
      { input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', output: '1' },
      { input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', output: '3' }
    ],
    constraints: ['m == grid.length', 'n == grid[i].length', '1 <= m, n <= 300', 'grid[i][j] is \'0\' or \'1\''],
    hints: ['Use DFS to sink each island you find.'],
    starterCode: {
      javascript: `/**\n * @param {character[][]} grid\n * @return {number}\n */\nfunction numIslands(grid) {\n  \n}`,
      python: `def num_islands(grid):\n    pass`,
      java: `class Solution {\n    public int numIslands(char[][] grid) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[["1","1","0"],["0","1","0"],["0","0","1"]]], expected: 2 }
    ],
    acceptance: 59, totalSubmissions: 7200, acceptedSubmissions: 4248
  },
  {
    title: 'Reverse Linked List',
    slug: 'reverse-linked-list',
    difficulty: 'Easy',
    tags: ['Linked List', 'Recursion'],
    description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
    examples: [
      { input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]' },
      { input: 'head = [1,2]', output: '[2,1]' },
      { input: 'head = []', output: '[]' }
    ],
    constraints: ['The number of nodes in the list is the range [0, 5000].', '-5000 <= Node.val <= 5000'],
    hints: ['Use three pointers: prev, curr, next.'],
    starterCode: {
      javascript: `/**\n * @param {ListNode} head\n * @return {ListNode}\n */\nfunction reverseList(head) {\n  \n}`,
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
    tags: ['Tree', 'DFS', 'BFS', 'Binary Tree'],
    description: 'Given the root of a binary tree, return its maximum depth.\n\nA binary tree\'s maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.',
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '3' },
      { input: 'root = [1,null,2]', output: '2' }
    ],
    constraints: ['The number of nodes in the tree is in the range [0, 10^4].', '-100 <= Node.val <= 100'],
    hints: ['Use recursion: max depth = 1 + max(left depth, right depth).'],
    starterCode: {
      javascript: `/**\n * @param {TreeNode} root\n * @return {number}\n */\nfunction maxDepth(root) {\n  \n}`,
      python: `def max_depth(root):\n    pass`,
      java: `class Solution {\n    public int maxDepth(TreeNode root) {\n        \n    }\n}`
    },
    testCases: [
      { input: [null], expected: 0 }
    ],
    acceptance: 82, totalSubmissions: 7100, acceptedSubmissions: 5822
  },
  {
    title: 'Single Number',
    slug: 'single-number',
    difficulty: 'Easy',
    tags: ['Array', 'Bit Manipulation'],
    description: 'Given a non-empty array of integers `nums`, every element appears twice except for one. Find that single one.\n\nYou must implement a solution with a linear runtime complexity and use only constant extra space.',
    examples: [
      { input: 'nums = [2,2,1]', output: '1' },
      { input: 'nums = [4,1,2,1,2]', output: '4' },
      { input: 'nums = [1]', output: '1' }
    ],
    constraints: ['1 <= nums.length <= 3 * 10^4', '-3 * 10^4 <= nums[i] <= 3 * 10^4', 'Each element in the array appears twice except for one element which appears only once.'],
    hints: ['XOR of two identical numbers is 0. XOR of a number with 0 is the number itself.'],
    starterCode: {
      javascript: `/**\n * @param {number[]} nums\n * @return {number}\n */\nfunction singleNumber(nums) {\n  \n}`,
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
    title: 'Coin Change',
    slug: 'coin-change',
    difficulty: 'Medium',
    tags: ['Array', 'Dynamic Programming', 'BFS'],
    description: 'You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.\n\nReturn the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return `-1`.\n\nYou may assume that you have an infinite number of each kind of coin.',
    examples: [
      { input: 'coins = [1,5,10,25], amount = 41', output: '4', explanation: '25 + 10 + 5 + 1 = 41, 4 coins.' },
      { input: 'coins = [2], amount = 3', output: '-1' },
      { input: 'coins = [1], amount = 0', output: '0' }
    ],
    constraints: ['1 <= coins.length <= 12', '1 <= coins[i] <= 2^31 - 1', '0 <= amount <= 10^4'],
    hints: ['Build up a DP table from amount 0 to the target.'],
    starterCode: {
      javascript: `/**\n * @param {number[]} coins\n * @param {number} amount\n * @return {number}\n */\nfunction coinChange(coins, amount) {\n  \n}`,
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
    title: 'Word Search',
    slug: 'word-search',
    difficulty: 'Hard',
    tags: ['Array', 'DFS', 'Backtracking', 'Matrix'],
    description: 'Given an `m x n` grid of characters `board` and a string `word`, return `true` if `word` exists in the grid.\n\nThe word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.',
    examples: [
      { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"', output: 'true' },
      { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"', output: 'true' },
      { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"', output: 'false' }
    ],
    constraints: ['m == board.length', 'n = board[i].length', '1 <= m, n <= 6', '1 <= word.length <= 15', 'board and word consist only of lowercase and uppercase English letters.'],
    hints: ['Use DFS with backtracking. Mark cells as visited.'],
    starterCode: {
      javascript: `/**\n * @param {character[][]} board\n * @param {string} word\n * @return {boolean}\n */\nfunction exist(board, word) {\n  \n}`,
      python: `def exist(board, word):\n    pass`,
      java: `class Solution {\n    public boolean exist(char[][] board, String word) {\n        \n    }\n}`
    },
    testCases: [
      { input: [[["A","B"],["C","D"]], "AB"], expected: true },
      { input: [[["A","B"],["C","D"]], "AZ"], expected: false }
    ],
    acceptance: 40, totalSubmissions: 4700, acceptedSubmissions: 1880
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Promise.all([User.deleteMany(), Problem.deleteMany(), Contest.deleteMany()]);
    console.log('Cleared existing data');

    // Create users
    const [admin, alice, bob, charlie] = await User.create([
      { username: 'admin', email: 'admin@codearena.com', password: 'password', role: 'admin', score: 2000, solved: [] },
      { username: 'alice', email: 'alice@example.com', password: 'password', role: 'user', score: 980, solved: [] },
      { username: 'bob', email: 'bob@example.com', password: 'password', role: 'user', score: 650, solved: [] },
      { username: 'charlie', email: 'charlie@example.com', password: 'password', role: 'user', score: 350, solved: [] },
    ]);
    console.log('Created 4 users');

    // Create problems
    const createdProblems = await Problem.insertMany(
      PROBLEMS.map(p => ({ ...p, createdBy: admin._id }))
    );
    console.log(`Created ${createdProblems.length} problems`);

    // Give users some solved problems
    const ids = createdProblems.map(p => p._id.toString());
    alice.solved = ids.slice(0, 6);
    bob.solved = ids.slice(0, 4);
    charlie.solved = ids.slice(0, 2);
    await Promise.all([alice.save(), bob.save(), charlie.save()]);

    // Create a demo contest
    const now = new Date();
    await Contest.create({
      title: 'Weekly Contest 1',
      description: 'Practice contest with classic problems. Solve as many as you can in 90 minutes!',
      startTime: new Date(now.getTime() + 2 * 60 * 60 * 1000), // 2h from now
      endTime: new Date(now.getTime() + 3.5 * 60 * 60 * 1000),
      problems: createdProblems.slice(0, 4).map(p => p._id),
      createdBy: admin._id
    });

    await Contest.create({
      title: 'Biweekly Contest 12',
      description: 'Medium-hard problems. Rating changes apply!',
      startTime: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), // ended
      endTime: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000 + 90 * 60 * 1000),
      problems: createdProblems.slice(2, 6).map(p => p._id),
      createdBy: admin._id,
      status: 'ended'
    });

    console.log('Created 2 contests');
    console.log('\n✅ Seed complete!\n');
    console.log('Demo credentials:');
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
