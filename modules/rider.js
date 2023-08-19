/**
 * Rider.js
 *
 * representing the rider class.
 */
class Rider {
  /**
   * Intialize Rider object.
   * @param {id} unique ID of every riderr.
   * @param {posX} current position(X-coordinate) of rider.
   * @param {posY} current position(Y-coordinate) of rider.
   */
  constructor(id, posX, posY) {
    this.id = id
    this.startX = posX
    this.startY = posY
  }

  /**
   * @returns X-coordinate of rider current position.
   */
  getPositionX = () => this.startX

  /**
   * @returns Y-coordinate of rider current position.
   */
  getPositionY = () => this.startY

  /**
   * @returns Rider's current ID of rider current position.
   */
  getID = () => this.id
}

module.exports = Rider
