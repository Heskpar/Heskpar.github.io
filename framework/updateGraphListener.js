/**
* This function uses a button, a list of buttons
 and a graph reference to add
* nodes, edges, and allow for selection between what the user intends to do.
* Users can either select nodes to edit and move them, handled by the 'grabber' selection
* or add nodes in the 'node' selection and so on for edges. 
* @param {button} button - this is the currently active button. It tells the 
* function the current functionality needed by calling the button's type member.
* @param {graph} graph - the graph reference where nodes and edges are kept.
*/
function updateGraphListener(button,graph)
{
  let dragStartPoint = undefined
  let dragStartBounds = undefined
    
  let panel = document.getElementById('graphpanel')
   /*
     * This function repaints the graph and also a selected node
     * if it is defined
     * @param {node} selected - the node to be redrawn if selected.
     */
  function repaint(selected) {
    const ctx = panel.getContext('2d')
    ctx.clearRect(0, 0, panel.width, panel.height)
    panel.innerHTML = ''
    graph.draw()
    if (selected !== undefined) {
      selected.propSheet()
      selected.draw()
      const bounds = selected.getBounds()
      drawGrabber(bounds.x, bounds.y)
      drawGrabber(bounds.x + bounds.width, bounds.y)
      drawGrabber(bounds.x, bounds.y + bounds.height)      
      drawGrabber(bounds.x + bounds.width, bounds.y + bounds.height)
    }    
  }

  if(button.type === 'grabber')
  {	
      let selected = undefined
      /*
	* this creates an event listener which checks if the user clicked on
	* a node, and stores the information.
       */
    panel.addEventListener('mousedown', event => {
      let mousePoint = mouseLocation(event)
      selected = graph.findNode(mousePoint)
      if (selected !== undefined) {
        dragStartPoint = mousePoint
        dragStartBounds = selected.getBounds(mousePoint)
      }
    repaint(selected)
    })
      /*
       *This create an event listener that checks if the user has clicked on
       * a node. if so, it will drag the node with the cursor.
	*/
    panel.addEventListener('mousemove', event => {
      if (dragStartPoint === undefined) return
      let mousePoint = mouseLocation(event)
      if (selected !== undefined) {
        const bounds = selected.getBounds();
        selected.translate(
          dragStartBounds.x - bounds.x 
	  + mousePoint.x - dragStartPoint.x,
          dragStartBounds.y - bounds.y 
          + mousePoint.y - dragStartPoint.y);
        repaint(selected)
      }
    })
	/*
	  *This creates an event listener that occurs when a user has finished
	  * dragging their cursor and resets the drag status values
	  */
    panel.addEventListener('mouseup', event => {
      dragStartPoint = undefined
      dragStartBounds = undefined
    })
  }
  
	

  else if (button.type === 'node')
    {
	/*
	 * This event listener checks if the cursor is on an empty location
	 * when clicking, if so a new node will created.
	 */
    panel.addEventListener('mousedown', event => {
      let mousePoint = mouseLocation(event)
      let selected = graph.findNode(mousePoint)
      if(selected === undefined) {
        var node = button.createNode(mousePoint.x,mousePoint.y,50)
	  node.propSheet()  
        graph.add(node)
        graph.draw()
        repaint(selected)
        const bounds = node.getBounds()
        drawGrabber(bounds.x, bounds.y)
        drawGrabber(bounds.x + bounds.width, bounds.y)
        drawGrabber(bounds.x, bounds.y + bounds.height)      
        drawGrabber(bounds.x + bounds.width, bounds.y + bounds.height)
      }
    })
  }

  else if (button.type === 'edge')
  {
      let startNode = undefined
      /*
	* This event checks to see if the user clicked on a node,
	* if so, it will begin to store drag information.
	*/
    panel.addEventListener('mousedown', event => {
      let mousePoint = mouseLocation(event)
      startNode = graph.findNode(mousePoint)
      dragStartPoint = mousePoint    
    })
      /*
       * This even begins the drag functionality and draws a temporary edge
       *between where the cursor is and where it started dragging from
       */
    panel.addEventListener('mousemove', event => {
      repaint()
      if(startNode===undefined) return
      let mousePoint = mouseLocation(event)
      var tempEdge = createLineEdge() 
      tempEdge.connect(dragStartPoint,{x: mousePoint.x ,y: mousePoint.y })
    })
      /*
	* this event listener activates when the mouse is done dragging. 
	* if the cursor stopped over a node, it will connect the two nodes
	* using the edge type held inside the button.
	*/
    panel.addEventListener('mouseup',event => {
      let mousePoint = mouseLocation(event)
      let endNode = graph.findNode(mousePoint)
      selected = undefined
      if(endNode === undefined) return
      tempEdge  = button.createNode(startNode,endNode)
      tempEdge.draw()
	graph.edges.push(tempEdge)
	repaint()
      startNode = undefined
      endNode = undefined    
    })
    
  }  
}

/*
 * This function returns the mouse location on the graphpanel using an event 
 * argument
 * @param {event} event - the object used to access the cursor location.
*/
function mouseLocation(event) {
  var panel = document.getElementById('graphpanel')
  var rect = panel.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  }
}

