const TinyQueue = require('tinyqueue');
const {readFileSync} = require('fs');
const fileContents = readFileSync('./nodes.txt');
const lines = fileContents.toString().split('\n');

const startNode = lines[0];

/**
 * Map where the key is a node
 * and the value is an object
 * with the following properties:
 * 		visited: whether is has been visited
 * 		minDistance: the minimum found distance
 * 		children: the nodes it can reach
 * 			each child is an object with:
 * 			to: the name of the child
 * 			distance: the distance to that child
 */
const nodes = new Map();

for (let i = 1; i < lines.length; i++) {
	const [from, to, distance] = lines[i].split(' ');

	// Add node from-to
	if (!nodes.get(from)) {
		nodes.set(from, {visited: false, minDistance: Infinity, children: []});
	}
	nodes.get(from).children.push({to, distance: +distance});

	// Add node to-from
	if (!nodes.get(to)) {
		nodes.set(to, {visited: false, minDistance: Infinity, children: []});
	}
	nodes.get(to).children.push({to: from, distance: +distance});
}

nodes.get(startNode).minDistance = 0;

/**
 * Checks whether there are any
 * nodes which are not visited
 *
 * @return {int} Whether all nodes are visited.
 */
function checkIfAllVisited() {
	return !Array.from(nodes.values()).some((node) => !node.visited);
};

// Priority queue with nodes
const queue = new TinyQueue(
	[{node: '1', distance: 0}],
	(a, b) => a.distance - b.distance);

// While not all are visited
while (!checkIfAllVisited()) {
	// Get node with min distance
	const {node: currentNodeName} = queue.pop();
	const currentNode = nodes.get(currentNodeName);
	currentNode.visited = true;
	const {children, minDistance} = currentNode;

	// For each of its children
	for (let i = 0; i < children.length; i++) {
		const {to, distance} = children[i];

		const child = nodes.get(to);

		// If the child was already visited, continue
		if (child.visited) {
			continue;
		}

		const newDistance = distance + minDistance;

		if (newDistance < child.minDistance) { // found new shortest distance
			child.minDistance = newDistance;
			queue.push({node: to, distance: newDistance});
		}
	}
}

console.log(Array
	.from(nodes)
	.map(([name, node]) => `${name}:${node.minDistance}`));
