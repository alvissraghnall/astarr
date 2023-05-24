
export function splitArrayIntoChunks<T>(array: Array<T>, chunkSize: number): T[][] {
    const chunks = [];
    
    // Calculate the number of chunks needed
    const numChunks = Math.ceil(array.length / chunkSize);
    
    // Split the array into chunks
    for (let i = 0; i < numChunks; i++) {
      const start = i * chunkSize;
      const end = start + chunkSize;
      const chunk = array.slice(start, end);
      chunks.push(chunk);
    }
    
    return chunks;
}
  