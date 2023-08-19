const Distance = require('../utils/distance')

const DECIMAL_PLACES = 2.0
const DISTANCE_PRICE = 6.5
const BASE_PRICE = 50.0
const TIME_PRICE = 2.0
const TWENTY_PERCENT = 5.0

/**
 * Ride.js
 *
 * Represent the blueprint of Ride.
 */
class Ride {
  /**
   * Ride object initialization.
   * @param {id} unique ID for every ride.
   * @param {startX, startY} starting position of ride.
   * @param {riderID} unique rider ID, for who booked the ride.
   * @param {driverID} unique driver ID of the driver.
   */
  constructor(id, startX, startY, riderID, N, driverID) {
    this.id = id
    this.riderID = riderID
    this.N = N

    this.startX = startX
    this.startY = startY

    this.driverID = driverID

    this.engage = true
  }

  /**
   * Method to stop the ride.
   * @param{time} time taken to complete the ride.
   * @param{destX, destY} represents the destination position.
   */
  stopRide(time, destX, destY) {
    this.engage = false
    this.time = time
    this.destX = destX
    this.destY = destY

    this.rideDistance = Distance(
      this.startX,
      this.startY,
      this.destX,
      this.destY
    )

    this.bill()
  }

  /**
   * Calculate the final payment
   * @returns final bill amount
   */
  bill() {
    let timeCost = (TIME_PRICE * this.time).toFixed(DECIMAL_PLACES)
    let distCost = (
      DISTANCE_PRICE *
      Distance(this.destX, this.destY, this.startX, this.startY)
    ).toFixed(DECIMAL_PLACES)

    // 20% extra addition of the total price.
    let extraPrice =
      (BASE_PRICE + parseFloat(timeCost) + parseFloat(distCost)) /
      TWENTY_PERCENT

    this.payment = (
      BASE_PRICE +
      parseFloat(timeCost) +
      parseFloat(distCost) +
      parseFloat(extraPrice)
    ).toFixed(DECIMAL_PLACES)

    return this.payment
  }

  /**
   * @returns ride ID.
   */
  getID = () => this.id

  /**
   * @returns {boolean} engagement of the driver.
   */
  isEngage = () => this.engage
}

module.exports = Ride
