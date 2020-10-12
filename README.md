# Robot Safe Area

## Problem

There is a robot which can move around on a grid. The robot is placed at point (0,0). From (x, y) the robot can move to (x+1,
y), (x-1, y), (x, y+1), and (x, y-1). Some points are dangerous and contain EMP Mines. To know which points are safe, we check
whether the sum digits of abs(x) plus the sum of the digits of abs(y) are less than or equal to 23. For example, the point (59, 75) is not safe because 5 + 9 + 7 + 5 = 26, which is greater than 23. The point (-51, -7) is safe because 5 + 1 + 7 = 13, which is
less than 23.
How large is the area that the robot can access?

## Answer

592597. The robot can traverse on the grid in four possible directions:

- Up/North `(x, y+1)`
- Down/South `(x, y-1)`
- Right/East `(x+1, y)`
- Left/West `(x-1, y)`

One direction at a time. The robot can move a single step at a time, the same as the king in chess.

The robot cannot jump and skip points, so infinity is not the answer. For instance, (1000, 1000) is a safe point because `1+0+0+0+1+0+0+0 = 2`. However, the robot cannot visit it without visiting (999,999), a not safe point, first. So, the answer is finite.

To solve this, we can create a 2D array that serves as the grid for our robot to survey. Starting at point (0,0), the robot calculates the surrounding points based on from current point. It also determines which points of the 4 is safe to visit. if true, it advances to the next points. Repeats the safe process until it reaches a dead-end where none of the four next points are safe. The robot will keep a record of visited points to save time. That record will serve as area accessible to the robot.

## `SurveyGrid` class

An abstraction class for the 2D array to use as a plot graph. It keeps tracks of visited points on the plot.

## Queue

We can use recursive function that continues to survey further points from the origin

```
explore(0, 0)
  -> explore(0, 0+1)
    -> explore(0, 0+1+1)
    -> explore(0, 0+1-1)
    -> explore(0+1, 0+1)
    -> explore(0-1, 0+1)
  -> explore(0, 0-1)
    -> explore(0, 0-1+1)
    -> explore(0, 0-1-1)
    -> explore(0+1, 0-1)
    -> explore(0-1, 0-1)
  -> explore(0+1, 0)
    -> explore(0+1, 0+1)
    -> explore(0+1, 0-1)
    -> explore(0+1+1, 0)
    -> explore(0+1-1, 0)
  -> explore(0-1, 0)
    -> explore(0-1, 0+1)
    -> explore(0-1, 0-1)
    -> explore(0-1+1, 0)
    -> explore(0-1-1, 0)
```

The stack can fill up really quickly. In practice, I had Node.js using almost 2100MB of memory until the maximum call stack reached.

The solution was to use a flat data structure. An array that stores points (x, y) was more efficient. So, I opted for `Array.pop` and `Array.push` to create a simple queue.
