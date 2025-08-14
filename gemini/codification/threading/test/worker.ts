// File: worker.ts

// This file contains the code that will be executed by each worker thread.
// `self` refers to the global scope within the worker thread.

console.log(`Worker thread started. Simulating some work...`);

// Simulate a long-running task using a simple loop.
for (let i = 0; i < 1_000_000_000; i++) {
  // A small busy-wait loop to simulate work without blocking too much.
}

// Once the work is done, the worker can send a message back to the main thread.
self.postMessage("Work complete!");

// The worker can also terminate itself using `self.close()`.
// This is important for threads that are not being joined, as it ensures they don't linger.
self.close();