function lttp (arr: number[][], num: number): number[][]{

  const seriesLength: number = arr.length

  if (num >= seriesLength || num === 0) {
    return arr
  }

  if (num === 1) {
    return [[arr[0][0], arr[0][1]]]
  }

  const downsampled: number[][] = []
  let sampledIndex = 0
  let bucket = (seriesLength - 2) / (num - 2)
  let point: number = 0
  let nextPoint: number = 0
  let area: number
  let maxAreaPoint: number[] = []
  let maxArea: number

  downsampled[sampledIndex++] = arr[point]

  for (let count = 0; count < num - 2; count++) {
    let averageX = 0
    let averageY = 0
    let averageRangeStart = Math.floor((count + 1) * bucket) + 1
    let averageRangeEnd = Math.floor((count + 2) * bucket) + 1

    if (averageRangeEnd > seriesLength) {
      averageRangeEnd = seriesLength
    }

    let averageRangeLength = averageRangeEnd - averageRangeStart

    if (averageRangeStart > averageRangeEnd) {
      averageRangeStart++
    }

    if (averageRangeStart < averageRangeEnd) {
      averageX = averageX + arr[averageRangeStart][0]
      averageY = averageY + arr[averageRangeStart][1]
    }

    averageX = averageX / averageRangeLength
    averageY = averageY / averageRangeLength

    let rangeOffs = Math.floor((count) * bucket) + 1
    let rangeTo = Math.floor((count + 1) * bucket) + 1
    let pointBucketX = arr[point][0]
    let pointBucketY = arr[point][1]

    maxArea = -1
    area = -1

    while (rangeOffs < rangeTo) {

      area = Math.abs((pointBucketX - averageX) * (arr[rangeOffs][1] - pointBucketY) - (pointBucketX - arr[rangeOffs][0]) * (averageY - pointBucketY)) * 0.5;

      if (area > maxArea) {
        maxArea = area
        maxAreaPoint = arr[rangeOffs]
        nextPoint = rangeOffs
      }
      rangeOffs++
    }

    downsampled[sampledIndex++] = maxAreaPoint
    point = nextPoint
  }

  downsampled[sampledIndex++] = arr[seriesLength - 1]

  return downsampled
}


// 示例用法
// 假设我们有一个二维数组arr，每个子数组表示一个点的坐标
const arr2d = Array.from({ length: 100 }, () => Array.from({ length: 2 }, () => Math.random())); // 100个三维点

const sampling2d = lttp(arr2d, 50);

console.log(sampling2d)

