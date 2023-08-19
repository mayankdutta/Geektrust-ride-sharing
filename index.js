const Driver = require('./modules/driver')
const Rider = require('./modules/rider')
const Ride = require('./modules/ride')

/**
 * Index.js
 *
 * Represent the Ride Sharing Mechanism.
 */

const DISTANCE_LIMIT = 5.0

class RideSharing {
  /**
   * constructs a new Ride.
   */
  constructor() {
    this.riders = []
    this.drivers = []
    this.rides = []
  }

  /**
   * Add a Driver for specific Ride Sharing
   * @param {id} id of driver.
   * @param {startX, startY} driver's coordinate.
   */
  addDriver(id, startX, startY) {
    this.drivers.push(new Driver(id, startX, startY))
  }

  /**
   * Add a rider for specific Ride Sharing
   * @param {id} id of rider.
   * @param {startX, startY} rider's coordinate.
   */
  addRider(id, startX, startY) {
    this.riders.push(new Rider(id, startX, startY))
  }

  /**
   * Start a Ride.
   * @param {id} to uniquely identify a ride.
   * @param {N} N-th driver to choose.
   * @param {riderID} ID of rider for current ride.
   */
  startRide(id, N, riderID) {
    const nearbyDrivers = this.matchUtil(riderID)

    if (nearbyDrivers.length < N || this.isEmpty(nearbyDrivers)) {
      console.log('INVALID_RIDE')
      return
    }

    for (let ride of this.rides) {
      if (ride.id === id) {
        console.log('INVALID_RIDE')
        return
      }
    }

    console.log('RIDE_STARTED ', id)

    const selectedDriver = nearbyDrivers[N - 1]

    this.drivers[selectedDriver.index].setEngage(id)

    const ride = new Ride(
      id,
      selectedDriver.riderStartX,
      selectedDriver.riderStartY,
      riderID,
      N,
      selectedDriver.driverID
    )

    this.rides.push(ride)
  }

  /**
   * Stop an ongoing ride.
   * @param {id} ID of the ride to be stopped.
   * @param {destX, destY} destination X coordinate.
   * @param {time} time required to reach destination
   */
  stopRide(id, destX, destY, time) {
    if (this.isEmpty(this.rides)) {
      console.log('INVALID_RIDE')
      return
    }

    let currRide = this.rides.find((ride) => ride.getID() === id)
    if (!currRide || !currRide.isEngage()) {
      console.log('INVALID_RIDE')
      return
    }

    const driver = this.drivers.find(
      (driver) => driver.getID() === currRide.driverID
    )

    driver?.setDismiss(destX, destY)

    console.log('RIDE_STOPPED ', id)
    currRide.stopRide(time, destX, destY)
  }

  /**
   * to match the customer with existing drivers.
   * @param {riderID} ID of the rider who is in need of ride.
   */
  match(riderID) {
    const nearbyDrivers = this.matchUtil(riderID)

    if (this.isEmpty(nearbyDrivers)) {
      console.log('NO_DRIVERS_AVAILABLE')
      return
    }

    const driverIDs = nearbyDrivers.map((driver) => driver.driverID)
    console.log('DRIVERS_MATCHED', ...driverIDs)
  }

  /**
   * Helper function to return the matching driver for a rider.
   * @param {riderID} requirs the ID of the rider, for whom ride is being planned.
   * @returns {arr} array of the drivers who are near to the rider.
   */
  matchUtil(riderID) {
    let nearbyDrivers = []

    const rider = this.riders.find((rider) => rider.getID() === riderID)

    if (!rider) {
      return []
    }

    const { startX, startY } = rider

    this.drivers.forEach((driver, index) => {
      let distance = driver.distance(startX, startY)

      if (!driver.isEngage() && distance <= DISTANCE_LIMIT) {
        nearbyDrivers.push({
          driverID: driver.id,
          driverStartX: driver.startX,
          driverStartY: driver.startY,
          distance: distance,
          riderStartX: startX,
          riderStartY: startY,
          index: index,
        })
      }
    })

    nearbyDrivers.sort((obj1, obj2) => obj1.distance - obj2.distance)
    return nearbyDrivers
  }

  /**
   * function to diplay the final billing amount to rider.
   * @param {id} represent the ride ID, to calculate the bill for.
   */
  finalBill(id) {
    const ride = this.rides.find((ride) => ride.id === id && !ride.isEngage())

    if (ride) {
      console.log('BILL', id, ride.driverID, ride.payment)
    } else {
      console.log('INVALID_RIDE')
    }
  }

  getRiders() {
    return this.riders
  }

  getDrivers() {
    return this.drivers
  }

  getRides() {
    return this.rides
  }

  /**
   * to check if array is empty.
   * @param{arr} array
   */

  isEmpty(arr) {
    return !arr.length
  }
}

module.exports = RideSharing
