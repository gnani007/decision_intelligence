import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Node, Edge } from 'reactflow';
import { initialWorkflow, initialRevenue } from '../mockData/mockData';

interface FlowState {
  nodes: Node[];
  edges: Edge[];
  revenue: any,
  latestRevenue: any
  highlightedEdgeId: null
}

const initialState: FlowState = {
  nodes: initialWorkflow.nodes,
  edges: initialWorkflow.edges,
  revenue: initialRevenue,
  highlightedEdgeId: null,
  latestRevenue: initialRevenue[initialRevenue.length - 1].value,
};

const flowSlice = createSlice({
  name: 'flow',
  initialState,
  reducers: {
    setNodes: (state, action: PayloadAction<Node[]>) => {
      state.nodes = action.payload;
    },
    setEdges: (state, action: PayloadAction<Edge[]>) => {
      state.edges = action.payload;
    },
    addEdge: (state, action: PayloadAction<any>) => {
      state.edges.push(action.payload);
    },
    updateEdgeRule: (state, action) => {
      const { id, rule } = action.payload;
      const edges = state.edges.find(x => x.id === id);
      if (edges) edges.data = { ...edges.data, rule };
    },
  },
});

export const {
  setNodes,
  setEdges,
  addEdge,
  updateEdgeRule
} = flowSlice.actions;
export default flowSlice.reducer;
