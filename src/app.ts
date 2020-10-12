import { SurveyGrid } from './SurveyGrid'
import { isPointSafe, moves } from './helpers'

type Point = {
  x: number
  y: number
}

// Simple queue structure for iterating points
// Contains SAFE points pending exploring its surroundings
const safePointsQueue = new Array<Point>()

// Survey grid 2000x2000
const surveyGrid = new SurveyGrid(2000)

// Info
console.log(`Total survey area: ${surveyGrid.area}`)

// Target to output
let totalSafeArea = 0

// Starting the origin (0,0), we start exploring points one-step at a time
safePointsQueue.push({ x: 0, y: 0 })
surveyGrid.visitPoint(0, 0)
totalSafeArea++ // 0+0 = 0 < 24 (safe point)

// console.log(surveyGrid.isPointVisited(1000, 1000))

// Keep testing the points beyond safe points until the queue is empty
while (safePointsQueue.length != 0) {
  // Get last element from the queue
  // Current point
  const point = safePointsQueue.pop() as Point

  // For each point, we test all possible sourrdings: up, bottom, left and right
  for (const move of moves) {
    const nextPoint = {
      x: point.x + move.dx,
      y: point.y + move.dy,
    }

    // Test if the next move would be safe to visit, then add it to pending list
    if (
      !surveyGrid.isPointVisited(nextPoint.x, nextPoint.y) &&
      isPointSafe(nextPoint.x, nextPoint.y)
    ) {
      // Increase count
      totalSafeArea++
      // set as visited
      surveyGrid.visitPoint(nextPoint.x, nextPoint.y)
      // Push next point to queue for surveying
      safePointsQueue.push(nextPoint)
    }
  }
}

console.log(`Total safe area: ${totalSafeArea}`)
