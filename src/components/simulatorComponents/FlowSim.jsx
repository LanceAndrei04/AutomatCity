import React, { useState, useCallback } from 'react';
import html2canvas from 'html2canvas'; // Import html2canvas
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faDownload } from '@fortawesome/free-solid-svg-icons';
import CustomNodes from './node/CustomNodes';
import CircleButton from '../CircleButton';
import NodePopup from './node/nodePopup';
import { toast } from 'sonner';
import CustomEdge from './edges/CustomEdge';

const initialEdges = [];

const FlowSim = ({ isDfa, onGetNodes, onGetEdges }) => {
  const nodeTypes = {
    custom: CustomNodes,
  };

  const edgeTypes = {
    custom: CustomEdge,
  };

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState(initialEdges);
  const [popupState, setPopupState] = useState(null);
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [edgeName, setEdgeName] = useState('');
  const [selectedEdge, setSelectedEdge] = useState(null);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => {
      onGetNodes(nds)
      return applyNodeChanges(changes, nds)
    }),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => {
      onGetEdges(eds)
      return applyEdgeChanges(changes, eds)
    }),
    []
  );

  const onConnect = useCallback(
    (params) => {
      if (params.sourceHandle === 'source-right') {
        setEdges((eds) => {
          const newEdges = addEdge({ ...params, data: { label: '' } }, eds)
          onGetEdges(newEdges)
          return newEdges
        });
      }
    },
    []
  );

  const onSelectionChange = useCallback(
    (selected) => {
      setSelectedNodes(selected.nodes);
    },
    []
  );

  const onEdgeClick = (event, edge) => {
    setSelectedEdge(edge);
    setEdgeName(edge.data?.label || '');
  };

  const handleEdgeNameChange = (event) => {
    setEdgeName(event.target.value);
  };

  const handleEdgeNameSubmit = () => {
    if (selectedEdge) {
      const updatedEdges = edges.map((e) => {
        if (e.id === selectedEdge.id) {
          e.data = { ...e.data, label: edgeName.trim() };
        }
        return e;
      });
      setEdges(prevEdges => {
        onGetEdges(updatedEdges)
        return updatedEdges
      });
      setSelectedEdge(null);
      setEdgeName('');
    }
  };

  const handleButtonClick = (state) => {
    if (state === 'initial') {
      const initialNodeExists = nodes.some((node) => node.data.state === 'initial');
      if (initialNodeExists) {
        toast.error('Only one Initial State node is allowed!', {
          style: { backgroundColor: '#ed1c24', color: 'white' },
        });
        return;
      }
    }

    if (state === 'trap') {
      if (!isDfa) {
        toast.error('Trap State is not available in NFA!', {
          style: { backgroundColor: '#ed1c24', color: 'white' },
        });
        return;
      }
    }

    setPopupState(state);
  };

  const handleAddNode = ({ state, label }) => {
    const isFinalState = state == "final"
    const isInitialState = state == "initial"

    setNodes((nds) => {

      const nodeAlreadyExist = nds.some((node) => {
        console.log(node)
        return node.id === label.toUpperCase()
      });

      if (nodeAlreadyExist) {
        toast.error(`${label.toUpperCase()} already exist!`, {
          style: { backgroundColor: '#ed1c24', color: 'white' },
        });
        return nds
      }

      const newNode = {
        id: label.toUpperCase(),
        data: { label, state, isFinalState, isInitialState },
        position: { x: Math.random() * 400, y: Math.random() * 400 },
        type: 'custom',
      };

      return [...nds, newNode]
      
    });
    setPopupState(null);
  };

  const handleDeleteAll = () => {
    setNodes([]); // Clear all nodes
    setEdges([]); // Clear all edges
    toast.success('All nodes and edges have been deleted', {
      style: { backgroundColor: '#4CAF50', color: 'white' },
    });
  };

  // Function to capture screenshot
  const captureScreenshot = () => {
    const flowContainer = document.getElementById('react-flow'); // React Flow container
    html2canvas(flowContainer).then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL(); // Convert canvas to image data URL
      link.download = 'flow-screenshot.png'; // Set filename for the download
      link.click(); // Trigger download
    });
  };

  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <ReactFlow
        id="react-flow" // Add an id to the React Flow container
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        onSelectionChange={onSelectionChange}
        onEdgeClick={onEdgeClick}
      >
        <Background color="grey"  />
        <Controls />
      </ReactFlow>

      {selectedEdge && (
        <div style={{ position: 'absolute', bottom: '10px', left: '10px' }}>
          <div className="neumorphic-panel">
            <input
              type="text"
              value={edgeName}
              onChange={handleEdgeNameChange}
              placeholder="Output"
              style={{ padding: '8px', marginBottom: '10px' }}
            />
            <button
              onClick={handleEdgeNameSubmit}
              style={{ padding: '8px 16px', backgroundColor: '#4CAF50', color: 'white' }}
            >
              Save Name
            </button>
          </div>
        </div>
      )}

      <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
        <div className="flex space-x-2 neumorphic-container">
          <CircleButton
            color="bg-green-500"
            title="Initial State"
            onClick={() => handleButtonClick('initial')}
            className="w-16 h-16 sm:w-20 sm:h-20"
          />
          <CircleButton
            color="bg-yellow-500"
            title="State"
            onClick={() => handleButtonClick('regular')}
            className="w-16 h-16 sm:w-20 sm:h-20"
          />
          <CircleButton
            color="bg-red-500"
            title="Trap State"
            onClick={() => handleButtonClick('trap')}
            className="w-16 h-16 sm:w-20 sm:h-20"
          />
          <CircleButton
            color="bg-blue-500"
            title="Final State"
            onClick={() => handleButtonClick('final')}
            className="w-16 h-16 sm:w-20 sm:h-20"
          />
        </div>
      </div>

      {popupState && (
        <NodePopup
          nodeState={popupState}
          onAddNode={handleAddNode}
          onClose={() => setPopupState(null)}
        />
      )}

      <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '10px' }}>
        <button
          onClick={handleDeleteAll} // Add the delete function here
          className="p-2 bg-gray-100 rounded-full shadow-md neumorphic-btn hover:bg-red-300"
          title="Delete"
        >
          <FontAwesomeIcon icon={faTrash} size="lg" />
        </button>

        <button
          onClick={captureScreenshot} // Add the screenshot capture function here
          className="p-2 bg-gray-100 rounded-full shadow-md neumorphic-btn hover:bg-blue-300"
          title="Download Screenshot"
        >
          <FontAwesomeIcon icon={faDownload} size="lg" />
        </button>
      </div>
    </div>
  );
};

export default FlowSim;