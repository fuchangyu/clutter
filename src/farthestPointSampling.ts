function farthestPointSampling (arr: number[][], num: number): number[][] {
  const arrLength: number = arr.length

  if (num >= arrLength || num === 0) {
    return arr
  }

  const nPoints: number = arr.length
  const nDim: number = arr[0].length // 假设所有点具有相同的维度

  const sampledIndices: number[] = [0]
  const minDistances: number[] = new Array(nPoints).fill(Infinity)
  for (let i = 1; i < num; i++) {
    const currentPoint: number[] = arr[sampledIndices[i - 1]]
    const distToCurrentPoint: number[] = new Array(nPoints)

    for (let j = 0; j < nPoints; j++) {
      const diff: number[] = []
      for (let k = 0; k < nDim; k++) {
        diff.push(arr[j][k] - currentPoint[k])
      }
      distToCurrentPoint[j] = Math.sqrt(diff.reduce((sum, val) => sum + val * val, 0))
    }

    for (let j = 0; j < nPoints; j++) {
      minDistances[j] = Math.min(minDistances[j], distToCurrentPoint[j])
    }

    const farthestPointIdx: number = minDistances.indexOf(Math.max(...minDistances))
    sampledIndices.push(farthestPointIdx)
  }

  return sampledIndices.sort((a, b) => a - b).map(i => arr[i])
}


// 示例用法
// 假设我们有一个二维数组arr，每个子数组表示一个点的坐标
const arr3d = Array.from({ length: 100 }, () => Array.from({ length: 3 }, () => Math.random())); // 100个三维点

const sampling3d = farthestPointSampling(arr3d, 50);

console.log(sampling3d)
