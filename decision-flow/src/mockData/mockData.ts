export const initialWorkflow = {
  nodes: [
    { id: '1', type: 'input', position: { x: 0, y: 40 }, data: { label: 'Start' } },
    { id: '2', type: 'default', position: { x: 260, y: 40 }, data: { label: 'Revenue Check' } },
    { id: '3', type: 'default', position: { x: 560, y: 0 }, data: { label: 'Expansion' } },
    { id: '4', type: 'default', position: { x: 560, y: 100 }, data: { label: 'Hold' } }
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2', animated: false, data: { rule: null } },
    { id: 'e2-3', source: '2', target: '3', label: 'true', data: { rule: 'revenue > 1000000' } },
    { id: 'e2-4', source: '2', target: '4', label: 'false', data: { rule: 'revenue <= 1000000' } }
  ]
};
export const initialRevenue = [
  { month: 'Jan', value: 900000 },
  { month: 'Feb', value: 1100000 },
  { month: 'Mar', value: 1200000 },
  { month: 'Apr', value: 950000 },
  { month: 'May', value: 1300000 }
];