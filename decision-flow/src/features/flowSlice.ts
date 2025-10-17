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

    pushRevenuePoint(state, a) {
      state.revenue.push(a.payload);
      state.latestRevenue = a.payload.value;
      if (state.revenue.length > 20) state.revenue.shift();
    },

    evaluatePaths(state) {
      const edgesBySource = {} as any;

      state.edges.forEach(e => {
        edgesBySource[e.source] = edgesBySource[e.source] || []; edgesBySource[e.source].push(e);
      });

      state.highlightedEdgeId = null;

      Object.keys(edgesBySource).forEach(src => {
        const list = edgesBySource[src];
        for (const e of list) {
          if (!e.data || !e.data.rule) continue;
          const rule = e.data.rule;
          try {
            const expr = rule.replace(/revenue/g, state.latestRevenue);
            if (eval(expr)) {
              state.highlightedEdgeId = e.id; break;
            }
          } catch (err) {
            console.log(err)
          }
        }
      });
    }
  },
});

export const {
  setNodes,
  setEdges,
  addEdge,
  updateEdgeRule,
  pushRevenuePoint,
  evaluatePaths
} = flowSlice.actions;
export default flowSlice.reducer;
