/**
 * Test.js
 *
 * Tests for Index.js
 */

const { expect } = require('chai')

const RideSharing = require('./index')
const Rider = require('./modules/rider')
const Driver = require('./modules/driver')

const Distance = require('./utils/distance')

describe('Index.JS ', function () {
  // for Rider function
  describe('Adding the Riders', function () {
    let rideSharing = new RideSharing()
    it('adds the rider', function () {
      let riders = rideSharing.getRiders()

      rideSharing.addRider(2, -1, -1)
      riders.push(new Rider(2, -1, -1))

      expect(rideSharing.getRiders()).to.equal(riders)
    })
  })

  // for Driver function.
  describe('Adding drivers', function () {
    let rideSharing = new RideSharing()
    it('Adding the Driver', function () {
      let drivers = rideSharing.getDrivers()

      rideSharing.addDriver(12, 0, 0)
      drivers.push(new Driver(12, 0, 0))

      expect(rideSharing.getDrivers()).to.equal(drivers)
    })
  })

  // for starting the ride.
  describe('Starting Ride', () => {
    it('Start the ride', () => {
      let rideSharing = new RideSharing()
      rideSharing.startRide(10, 0, 12)

      let rides = rideSharing.getRides()

      rides.push(10, 0, 12)

      expect(rideSharing.getRides()).to.equal(rides)
    })
  })
})

describe('Driver.JS', () => {
  describe('Distance: ', () => {
    it('check the correctness of distance: ', () => {
      let driver = new Driver(1, 2, 3)
      let dist = Distance(0, 1, 2, 3)

      expect(driver.distance(0, 1, 2, 3)).to.equal(dist)
      expect(driver.getID()).to.equal(1)
    })
  })

  describe('Engagement', () => {
    it('checking engagement of driver: ', () => {
      let driver = new Driver()
      driver.setEngage(1)

      expect(driver.isEngage()).to.equal(true)
    })
  })
})

describe('Rider.JS', () => {
  describe('get position', () => {
    it('checks the id', () => {
      let rider = new Rider(1, 2, 3)
      expect(rider.getID()).to.equal(1)
      expect(rider.getPositionX()).to.equal(2)
      expect(rider.getPositionY()).to.equal(3)
    })
  })
})
