
function Distance(x1, y1, x2, y2) {
  let ans = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)
  return ans.toFixed(2)
}

module.exports = Distance;
