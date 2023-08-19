const fs = require('fs')

const RideSharing = require('./index')

/**
 * starting of the whole project.
 * @param{filename} taking input from file.
 * calling a callback to proceed with data fetched.
 */

function processInputFile(filename) {
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) throw err

    // read complete line.
    const inputLines = data.toString().split('\n')

    let rideSharing = new RideSharing()

    for (let i = 0; i < inputLines.length; i++) {
      // breaking down a line base on space.
      const inputArr = inputLines[i].split(' ').map((str) => str.trim())

      const command = inputArr[0]
      const id = inputArr[1]

      switch (command) {
        case 'ADD_DRIVER':
          const driverPositionX = parseFloat(inputArr[2])
          const driverPositionY = parseFloat(inputArr[3])
          rideSharing.addDriver(id, driverPositionX, driverPositionY)
          break

        case 'ADD_RIDER':
          const riderPositionX = parseFloat(inputArr[2])
          const riderPositionY = parseFloat(inputArr[3])
          rideSharing.addRider(id, riderPositionX, riderPositionY)
          break

        case 'MATCH':
          rideSharing.match(id)
          break

        case 'START_RIDE':
          const N = parseInt(inputArr[2])
          const riderID = inputArr[3]
          rideSharing.startRide(id, N, riderID)
          break

        case 'STOP_RIDE':
          const destX = parseFloat(inputArr[2])
          const destY = parseFloat(inputArr[3])
          const time = parseFloat(inputArr[4])
          rideSharing.stopRide(id, destX, destY, time)
          break

        case 'BILL':
          rideSharing.finalBill(id)
          break

        default:
          break
      }
    }
  })
}

// Read input filename from command line arguments
const filename = process.argv[2]

// Start processing the input file
processInputFile(filename)
