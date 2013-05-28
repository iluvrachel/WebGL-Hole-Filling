"use strict";


/**
 * Vertex structure.
 * (Original Java code by Henning Tjaden.)
 * @param {int} index
 */
function Vertex( index ) {
	this.index = index;
	this.edges = [];
	this.firstEdge = null;
}


/**
 * Set up the first edge.
 */
Vertex.prototype.setUpFirstEdge = function() {
	var edge;

	for( var i = 0; i < this.edges.length; i++ ) {
		edge = this.edges[i];

		if( edge.pair == null ) {
			this.firstEdge = edge;
			return;
		}
	}

	if( this.edges.length > 0 ) {
		this.firstEdge = this.edges[0];
	}
};


/**
 * Return if the vertex is a border point.
 * @return {boolean} True if vertex is a border point, false otherwise.
 */
Vertex.prototype.isBorderPoint = function() {
	if( this.edges.length > 0 ) {
		return ( this.firstEdge.pair == null );
	}
	return true;
};


/**
 * Get the neighbour vertices of the vertex.
 * @return {Array} List of all neighbour vertices.
 */
Vertex.prototype.getNeighbours = function() {
	var neighbours = [];

	// Has edges
	if( this.edges.length > 0 ) {
		// Is border vertex
		if( this.firstEdge.pair == null ) {
			var next = this.firstEdge.next;

			// Add the other two points of the triangle
			neighbours.push( this.firstEdge.vertex.index );
			neighbours.push( next.vertex.index );

			// Single triangle
			if( next.next.pair == null ) {
				return neighbours;
			}
			else {
				next = next.next.pair;
			}

			// Has neighbouring triangle
			while( next != null ) {
				// First vertex of the next triangle
				neighbours.push( next.vertex.index );
				next = next.next;
				// Second vertex of the next triangle
				neighbours.push( next.vertex.index );
				// Switch to the neighbouring triangle
				next = next.next.pair;
			}
		}
		// Is an inner vertex of the mesh
		else {
			var next = this.firstEdge.pair.next;

			neighbours.push( this.firstEdge.vertex.index );

			// Is new neighbour triangle
			while( next != this.firstEdge && next.pair != null ) {
				// First vertex of the next triangle
				neighbours.push( next.vertex.index );
				next = next.pair.next;
			}
		}
	}

	return neighbours;
};