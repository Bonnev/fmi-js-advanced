/**
 * Finds the maximum height
 * Jimmy will be able to reach
 *
 * @param {array} tower The heights of the tower.
 * @param {int} jumpHeight The maximum height
 * 		Jimmy can jump.
 * @return {int} The requested maximum height.
 */
function jumpingJimmy(tower, jumpHeight) {
	let heightReached = 0;

	for (const height of tower) {
		if (height <= jumpHeight) {
			heightReached += height;
		} else {
			break;
		}
	}

	return heightReached;
}

console.log(jumpingJimmy(
	[9216, 60, 4563, 496, 8431, 2823, 895, 2022, 1532, 7244], 341276));
