import init, { main } from '/pkg/model_viewer.js';

async function run() {
    await init();
    await main();
}

run();