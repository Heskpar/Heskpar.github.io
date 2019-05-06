'use strict'
/**
* This class manages the toolbar in which buttons for the nodes and edges 
* can be added.
*/
class ToolBar {
    /*
      * class constructor, the toolbar requires a graph as it contains a list
      * of buttons that interact with the graph and require a reference to it 
      * when being created. it should also be noted that a button for the 
      * grabber is added to the list of tools automatically
      * @param {Graph} graph - the graph on which the buttons interact with
      */
  constructor(graph) {
    this.i = 1
    this.tools = []
    this.graph = graph

    this.tools.push(new Button(createGrabber,0,'grabber',this.graph,this.tools))
    this.tools[0].canvas.addEventListener('click', event =>this.tools[0].Switch(event))
  }
/**
* This function adds a tool the toolbar as a type of Node. Nodes and edges
* have different functionality, and as such must be defined separately.
* @param {function} createNode - the function passed will be linked to a button
* which will allow for creation of new nodes based on the function passed in.
*/
  addNode(createNode) {
    const button = new Button(createNode,this.i,'node',this.graph,this.tools)
    this.tools.push(button)
    button.canvas.addEventListener('click', event =>button.Switch(event))
    this.i++
  }
/**
*@param {function} createEdge - this will create a button that allows 
*for connection of new edges based on the edge passed in.
*/
  addEdge(createEdge){
    const button = new Button(createEdge, this.i, 'edge', this.graph, this.tools)
    this.tools.push(button)
    button.canvas.addEventListener('click', event => button.Switch(event))
    this.i++
  }
}
