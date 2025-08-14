// File: main.ts

// This is the main application file. It will create and manage three worker threads.

// The Worker API is a Web Worker implementation for Deno.
// It allows for running JavaScript/TypeScript code on a separate thread.
// The first argument is the URL of the worker script. We use import.meta.url
// to get the base path and construct a path to our worker.ts file.
// The 'type: "module"' option is important for using ES modules.

const worker1 = new Worker(new URL("./worker.ts", import.meta.url).href, { type: "module" });
const worker2 = new Worker(new URL("./worker.ts", import.meta.url).href, { type: "module" });
const worker3 = new Worker(new URL("./worker.ts", import.meta.url).href, { type: "module" });

/**
 * Creates a promise that resolves when a worker sends a 'Work complete!' message.
 * This simulates the behavior of a 'join' operation.
 * @param worker The Worker instance to wait for.
 * @returns A promise that resolves when the worker completes its task.
 */
function awaitWorkerCompletion(worker: Worker): Promise<void> {
  return new Promise((resolve) => {
    worker.onmessage = (e) => {
      console.log(`Main thread received message from worker: ${e.data}`);
      if (e.data === "Work complete!") {
        resolve();
      }
    };
  });
}

// We explicitly wait for worker1 to finish its task and terminate by awaiting a promise.
console.log("Main thread is waiting for worker1 to finish...");
await awaitWorkerCompletion(worker1);
console.log("Main thread finished waiting for worker1.");

// We explicitly wait for worker3 to finish its task and terminate.
console.log("Main thread is waiting for worker3 to finish...");
await awaitWorkerCompletion(worker3);
console.log("Main thread finished waiting for worker3.");

// This is the listener for worker2. We are not awaiting a promise for this worker,
// so the main thread will not block and will just log the message when it arrives.
worker2.onmessage = (e) => {
  console.log(`Main thread received message from worker2: ${e.data}`);
};

// We do NOT wait for worker2.
// This means the main thread will continue its execution without waiting for worker2.
// The worker2 thread will run in the background until it completes its task and terminates itself.
console.log("Main thread is NOT waiting for worker2. It is running in the background.");

// This message will be printed after worker1 and worker3 have finished,
// but before worker2 has necessarily finished.
console.log("Main thread has finished its tasks and is exiting.");
console.log("The Deno process will exit when worker2 completes, as it is the last running thread.");
