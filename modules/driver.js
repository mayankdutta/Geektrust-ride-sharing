const Distance = require('../utils/distance')

/**
 * Driver.js
 *
 * represent the driver object.
 */
class Driver {
  /**
   * initialize driver object with 3 parameter.
   * @param {id} unique ID for driver.
   * @param {posX, posY} driver's current location.
   */
  constructor(id, posX, posY) {
    this.id = id
    this.startX = posX
    this.startY = posY
    this.engage = false
  }

  /**
   * Calculate distance from Driver's current position.
   * @param{posX, posY} position of the Driver.
   * @returns distance in float type.
   */
  distance(posX, posY) {
    return Distance(this.startX, this.startY, posX, posY)
  }

  /**
   * If driver is allcoated drive.
   * He will be engaged in ride.
   * @param {ride} ride ID, driver is engaged in.
   */
  setEngage(ride) {
    this.engage = true
    this.ride = ride
  }

  /**
   * @returns if driver is engage or not.
   */
  isEngage = () => this.engage

  /**
   * @returns driver ID.
   */
  getID = () => this.id

  /**
   * Once ride is completed.
   * Driver current position will be updated.
   * @param {posX, posY} latest position of driver.
   */
  setDismiss(posX, posY) {
    this.engage = false
    this.startX = posX
    this.startY = posY
  }
}

module.exports = Driver
