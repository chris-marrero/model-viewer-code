export async function read_file(path) {
    const response = await fetch(path);
    const data = await response.arrayBuffer();
    return new Uint8Array(data);
}