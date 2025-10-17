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
  applyNodeChanges
} from "reactflow"

import {
  setNodes,
  setEdges,
  addEdge,
  updateEdgeRule
} from '../features/flowSlice';

import { useSelector, useDispatch } from 'react-redux';

const FlowCanvas = () => {
  const nodesList = useSelector((s: any) => s.workflow.nodes);
  const edgesList = useSelector((s: any) => s.workflow.edges);
  const highlight = useSelector((s: any) => s.workflow.highlightedEdgeId);
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
    const newE = {
      id: `${connect.source}-${connect.target}-${Date.now()}`,
      source: connect.source,
      target: connect.target,
      animated: false,
      data: { rule: null }
    };
    dispatch(addEdge(newE));
    setTimeout(() => {
      const r = window.prompt('Define rule (e.g. revenue > 1000000)');
      if (r !== null) dispatch(updateEdgeRule({ id: newE.id, rule: r.trim() || null }));
    }, 30);
  }, [dispatch]);

  return (
    <div>
      <ReactFlow
        nodes={nodesList}
        edges={edgesList.map((x: any) => ({
          ...x,
          style: {
            stroke: x.id === highlight ? '#0ea5a4' : undefined,
            strokeWidth: x.id === highlight ? 2 : undefined
          }
        }))}
        onNodesChange={onNodesChange}    // ✅ this updates positions
        onEdgesChange={onEdgesChange}    // ✅ optional but good practice
        onConnect={onConnectEdge}
        fitView
        nodesDraggable
        nodesConnectable
      />
      <MiniMap />
      <Controls />
      <Background />
    </div>
  )

}

export default FlowCanvas