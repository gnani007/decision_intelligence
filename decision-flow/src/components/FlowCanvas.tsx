import {
  useCallback,
  useMemo,
  useState,
  useEffect
} from "react"
import 'reactflow/dist/style.css';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  applyEdgeChanges,
  applyNodeChanges,
  ReactFlowProvider
} from "reactflow"

import {
  setNodes,
  setEdges,
  addEdge,
  updateEdgeRule
} from '../features/flowSlice';

import { useSelector, useDispatch } from 'react-redux';

const FlowCanvas = () => {
  const nodesList = useSelector((s: any) => s.flow.nodes);
  const edgesList = useSelector((s: any) => s.flow.edges);
  const highlight = useSelector((s: any) => s.flow.highlightedEdgeId);
  const dispatch = useDispatch()

  const onNodesChange = useCallback(
    (changes: any) => {
      dispatch(setNodes(applyNodeChanges(changes, nodesList)));
    },
    [dispatch, nodesList]
  );

  const onEdgesChange = useCallback(
    (changes: any) => {
      dispatch(setEdges(applyEdgeChanges(changes, edgesList)));
    },
    [dispatch, edgesList]
  );

  const onConnectEdge = useCallback((connect: any) => {
    const newEdge = {
      id: `${connect.source}-${connect.target}-${Date.now()}`,
      source: connect.source,
      target: connect.target,
      animated: false,
      data: { rule: null }
    };
    dispatch(addEdge(newEdge));
    setTimeout(() => {
      const r = window.prompt('Define rule (e.g. revenue > 1000000)');
      if (r !== null) dispatch(updateEdgeRule({ id: newEdge.id, rule: r.trim() || null }));
    }, 30);
  }, [dispatch]);

  console.log(nodesList, "test node list")
  console.log(edgesList, "test edgesList")

  return (
    <div style={{ width: '100%', height: '75vh' }}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodesList}
          edges={edgesList.map((x: any) => ({
            ...x,
            style: {
              stroke: x.id === highlight ? '#0ea5a4' : undefined,
              strokeWidth: x.id === highlight ? 2 : undefined
            }
          }))}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnectEdge}
          fitView
          nodesDraggable
          nodesConnectable
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  )

}

export default FlowCanvas