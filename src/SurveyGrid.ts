/**
 * SurveyGrid abstracts all the mapping of a plot to 2D array, and provides some helper methods
 *
 */
export interface SurveyGrid {
  area: number;
  getPlot(): boolean[][];
  isInBounds(xIdx: number, yIdx: number): boolean;
  isPointVisited(x: number, y: number): boolean;
  visitPoint(x: number, y: number): void;
  getPointIndices(x: number, y: number): [xIndex: number, yIndex: number];
}

export class SurveyGrid implements SurveyGrid {
  // keeps track of points (x, y) visited
  private visitPlot: boolean[][];
  plotSize: number;
  plotSizeHalf: number;
  area: number;

  constructor(size = 1000) {
    this.plotSize = size;
    this.plotSizeHalf = Math.floor(this.plotSize / 2);
    this.area = size * size;
    // Build a 2d array
    this.visitPlot = new Array(size)
      .fill(false)
      .map(() => new Array(size).fill(false));
  }

  /**
   * Return the plot
   */
  getPlot = () => this.visitPlot;

  /**
   * Checks if x-y index pair is in the bounds
   */
  isInBounds = (xIdx: number, yIdx: number): boolean =>
    this.visitPlot[xIdx] !== undefined &&
    this.visitPlot[xIdx][yIdx] !== undefined;

  /**
   * Takes a coordinate and returns corresponding indecies on the 2d array
   * @param {number} x x-coordinate
   * @param {number} y y-coordinate
   */
  getPointIndices = (
    x: number,
    y: number
  ): [xIndex: number, yIndex: number] => {
    return [x + this.plotSizeHalf, y + this.plotSizeHalf];
  };

  /**
   * Checks if a point on the plot has been visited
   * @throws Error if coordinate result in out-of-bound indices
   */
  isPointVisited = (x: number, y: number): boolean => {
    const [ptXIdx, ptYIdx] = this.getPointIndices(x, y);

    return this.visitPlot[ptXIdx][ptYIdx] === true;
  };

  /**
   * Marks a coordiantes as visited on the grid
   * @param {number} x x-coordinate
   * @param {number} y y-coordinate
   */
  visitPoint = (x: number, y: number): void => {
    const [ptXIdx, ptYIdx] = this.getPointIndices(x, y);
    this.visitPlot[ptXIdx][ptYIdx] = true;
  };
}
