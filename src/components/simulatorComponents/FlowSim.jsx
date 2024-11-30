import React, { useState, useCallback, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  useStore,
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

const FlowSim = ({ isDfa, onGetNodes, onGetEdges, testPath = null }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState(initialEdges);
  const [popupState, setPopupState] = useState(null);
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [edgeName, setEdgeName] = useState('');
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [animatedNodes, setAnimatedNodes] = useState(new Set());
  const [animatedEdges, setAnimatedEdges] = useState(new Set());
  const reactFlowInstance = useRef(null);

  // Handle test path animation
  useEffect(() => {
    if (testPath && testPath.path) {
      animatePath(testPath.path, testPath.accepted);
    }
  }, [testPath]);

  const animatePath = async (path, isAccepted) => {
    setAnimatedNodes(new Set());
    setAnimatedEdges(new Set());

    // Animate each step in the path
    for (let i = 0; i < path.length - 1; i++) {
      const currentNode = path[i];
      const nextNode = path[i + 1];
      
      // Find the edge between these nodes
      const edge = edges.find(e => 
        e.source === currentNode && 
        e.target === nextNode
      );

      // Animate current node
      setAnimatedNodes(prev => new Set([...prev, currentNode]));
      
      // Animate edge if found
      if (edge) {
        setAnimatedEdges(prev => new Set([...prev, edge.id]));
      }

      // Wait before moving to next node
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Animate final node
    if (path.length > 0) {
      setAnimatedNodes(prev => new Set([...prev, path[path.length - 1]]));
    }

    // Clear animation after delay
    setTimeout(() => {
      setAnimatedNodes(new Set());
      setAnimatedEdges(new Set());
    }, 2000);
  };

  const nodeTypes = {
    custom: CustomNodes,
  };

  const edgeTypes = {
    custom: CustomEdge,
  };

  // Style nodes based on animation state
  const getNodeStyle = (node) => {
    if (animatedNodes.has(node.id)) {
      return {
        background: '#4ade80',
        boxShadow: '0 0 10px #4ade80',
        transition: 'all 0.3s ease'
      };
    }
    return {};
  };

  // Style edges based on animation state
  const getEdgeStyle = (edge) => {
    if (animatedEdges.has(edge.id)) {
      return {
        stroke: '#4ade80',
        strokeWidth: 3,
        transition: 'all 0.3s ease'
      };
    }
    return {};
  };

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => {
      const updatedNodes = applyNodeChanges(changes, nds);
      onGetNodes(updatedNodes);
      return updatedNodes;
    }),
    [onGetNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => {
      const updatedEdges = applyEdgeChanges(changes, eds);
      onGetEdges(updatedEdges);
      return updatedEdges;
    }),
    [onGetEdges]
  );

  const onConnect = useCallback(
    (params) => {
      if (params.sourceHandle === 'source-right') {
        setEdges((eds) => {
          const newEdges = addEdge({
            ...params,
            type: 'custom',
            data: { label: '' }
          }, eds);
          onGetEdges(newEdges);
          return newEdges;
        });
      }
    },
    [onGetEdges]
  );

  const onSelectionChange = useCallback(
    (selected) => {
      setSelectedNodes(selected.nodes);
    },
    []
  );

  const onEdgeClick = (event, edge) => {
    event.stopPropagation();
    setSelectedEdge(edge);
    setEdgeName(edge.data?.label || '');
  };

  const handleEdgeNameChange = (event) => {
    setEdgeName(event.target.value);
  };

  const handleEdgeNameSubmit = () => {
    if (selectedEdge) {
      setEdges((prevEdges) => {
        const updatedEdges = prevEdges.map((e) => {
          if (e.id === selectedEdge.id) {
            return {
              ...e,
              data: { ...e.data, label: edgeName.trim() }
            };
          }
          return e;
        });
        onGetEdges(updatedEdges);
        return updatedEdges;
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
          style: { backgroundColor: '#ef4444', color: 'white' }
        });
        return;
      }
    }

    if (state === 'trap') {
      if (!isDfa) {
        toast.error('Trap State is not available in NFA!', {
          style: { backgroundColor: '#ef4444', color: 'white' }
        });
        return;
      }
    }

    setPopupState(state);
  };

  const handleAddNode = ({ state, label }) => {
    const isFinalState = state === "final";
    const isInitialState = state === "initial";

    setNodes((nds) => {
      const nodeAlreadyExist = nds.some((node) => node.id === label.toUpperCase());

      if (nodeAlreadyExist) {
        toast.error(`${label.toUpperCase()} already exists!`, {
          style: { backgroundColor: '#ef4444', color: 'white' }
        });
        return nds;
      }

      // Get the flow container dimensions
      const flowContainer = document.querySelector('.react-flow');
      let centerX = 0;
      let centerY = 0;

      if (flowContainer) {
        const rect = flowContainer.getBoundingClientRect();
        centerX = rect.width / 2;
        centerY = rect.height / 2;
      }

      const newNode = {
        id: label.toUpperCase(),
        data: { label, state, isFinalState, isInitialState },
        position: { x: centerX, y: centerY },
        type: 'custom',
      };

      const updatedNodes = [...nds, newNode];
      onGetNodes(updatedNodes); 
      return updatedNodes;
    });
    setPopupState(null);
  };

  const handleDeleteAll = () => {
    setNodes([]);
    setEdges([]);
    onGetNodes([]);
    onGetEdges([]);
    toast.success('All nodes and edges have been deleted', {
      style: { backgroundColor: '#22c55e', color: 'white' }
    });
  };

  const onInit = (instance) => {
    reactFlowInstance.current = instance;
  };

  const captureScreenshot = () => {
    html2canvas(document.body, {
      backgroundColor: '#ffffff',
      useCORS: true,
      allowTaint: true,
      foreignObjectRendering: true,
      width: window.innerWidth,
      height: window.innerHeight,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      x: window.scrollX,
      y: window.scrollY,
      scrollX: window.scrollX,
      scrollY: window.scrollY
    }).then(canvas => {
      const link = document.createElement('a');
      link.download = 'automata-diagram.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }).catch(err => {
      console.error('Screenshot error:', err);
      toast.error('Failed to capture screenshot', {
        style: { backgroundColor: '#ef4444', color: 'white' }
      });
    });
  };

  return (
    <div className="react-flow-wrapper" style={{ height: '100%', position: 'relative' }}>
      <ReactFlow
        nodes={nodes.map(node => ({
          ...node,
          style: { ...node.style, ...getNodeStyle(node) }
        }))}
        edges={edges.map(edge => ({
          ...edge,
          style: { ...edge.style, ...getEdgeStyle(edge) }
        }))}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        onInit={onInit}
        onSelectionChange={onSelectionChange}
        onEdgeClick={onEdgeClick}
      >
        <Background color="grey" />
        <Controls />
      </ReactFlow>

      {/* State Buttons */}
      <div className="absolute top-2 left-2 z-10">
        <div className="flex flex-col sm:flex-row gap-2 neumorphic-container p-2">
          <div className="flex gap-2">
            <CircleButton
              color="bg-green-500"
              title="Initial State"
              onClick={() => handleButtonClick('initial')}
              className="w-12 h-12 sm:w-16 sm:h-16"
            />
            <CircleButton
              color="bg-yellow-500"
              title="State"
              onClick={() => handleButtonClick('regular')}
              className="w-12 h-12 sm:w-16 sm:h-16"
            />
          </div>
          <div className="flex gap-2">
            <CircleButton
              color="bg-red-500"
              title="Trap State"
              onClick={() => handleButtonClick('trap')}
              className="w-12 h-12 sm:w-16 sm:h-16"
            />
            <CircleButton
              color="bg-blue-500"
              title="Final State"
              onClick={() => handleButtonClick('final')}
              className="w-12 h-12 sm:w-16 sm:h-16"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="absolute top-2 right-2 z-10">
        <div className="flex gap-2">
          <button
            onClick={handleDeleteAll}
            className="p-2 bg-gray-100 rounded-full shadow-md hover:bg-red-100 transition-colors"
            title="Delete All"
          >
            <FontAwesomeIcon icon={faTrash} className="w-5 h-5" />
          </button>
          <button
            onClick={captureScreenshot}
            className="p-2 bg-gray-100 rounded-full shadow-md hover:bg-blue-100 transition-colors"
            title="Download Screenshot"
          >
            <FontAwesomeIcon icon={faDownload} className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Edge Label Input */}
      {selectedEdge && (
        <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg">
          <input
            type="text"
            value={edgeName}
            onChange={handleEdgeNameChange}
            placeholder="Enter input"
            className="p-2 border rounded mb-2 w-full"
          />
          <button
            onClick={handleEdgeNameSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-800 w-full"
          >
            Save Input
          </button>
        </div>
      )}

      {popupState && (
        <NodePopup
          nodeState={popupState}
          onAddNode={handleAddNode}
          onClose={() => setPopupState(null)}
        />
      )}
    </div>
  );
};

export default FlowSim;
