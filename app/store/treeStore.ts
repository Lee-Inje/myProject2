import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface TreeNode {
  id: string;
  name: string;
  type: 'folder' | 'file';
  children?: TreeNode[];
}

interface TreeState {
  nodes: TreeNode[];
  selectedNodeId: string | null;
  expandedNodes: string[];
  
  // 노드 선택 관리
  setSelectedNode: (nodeId: string | null) => void;
  
  // 노드 확장/축소 관리
  toggleNode: (nodeId: string) => void;
  expandAll: () => void;
  collapseAll: () => void;
  
  // 노드 조작
  addNode: (parentId: string | null, node: TreeNode) => void;
  updateNode: (nodeId: string, updates: Partial<TreeNode>) => void;
  removeNode: (nodeId: string) => void;
  moveNode: (nodeId: string, newParentId: string | null) => void;
}

export const useTreeStore = create<TreeState>()(
  immer((set, get) => ({
    nodes: [
      {
        id: 'root1',
        name: '프로젝트',
        type: 'folder',
        children: [
          {
            id: 'folder1',
            name: '문서',
            type: 'folder',
            children: [
              { id: 'file1', name: 'README.md', type: 'file' },
              { id: 'file2', name: '설계서.pdf', type: 'file' },
            ],
          },
          {
            id: 'folder2',
            name: '소스코드',
            type: 'folder',
            children: [
              { id: 'file3', name: 'main.ts', type: 'file' },
              { id: 'file4', name: 'utils.ts', type: 'file' },
            ],
          },
        ],
      },
      {
        id: 'root2',
        name: '백업',
        type: 'folder',
        children: [
          { id: 'file5', name: 'backup.zip', type: 'file' },
        ],
      },
    ],
    selectedNodeId: null,
    expandedNodes: ['root1', 'folder1', 'folder2'],

    // 노드 선택 관리
    setSelectedNode: (nodeId) =>
      set((state) => {
        state.selectedNodeId = nodeId;
      }),

    // 노드 확장/축소 관리
    toggleNode: (nodeId) =>
      set((state) => {
        const index = state.expandedNodes.indexOf(nodeId);
        if (index > -1) {
          state.expandedNodes.splice(index, 1);
        } else {
          state.expandedNodes.push(nodeId);
        }
      }),

    expandAll: () =>
      set((state) => {
        const expandAllNodes = (nodes: TreeNode[]) => {
          nodes.forEach(node => {
            if (node.type === 'folder') {
              if (!state.expandedNodes.includes(node.id)) {
                state.expandedNodes.push(node.id);
              }
              if (node.children) {
                expandAllNodes(node.children);
              }
            }
          });
        };
        expandAllNodes(state.nodes);
      }),

    collapseAll: () =>
      set((state) => {
        state.expandedNodes = [];
      }),

    // 노드 조작
    addNode: (parentId, node) =>
      set((state) => {
        if (parentId === null) {
          state.nodes.push(node);
        } else {
          const addToParent = (nodes: TreeNode[]): boolean => {
            for (const n of nodes) {
              if (n.id === parentId) {
                if (!n.children) n.children = [];
                n.children.push(node);
                return true;
              }
              if (n.children && addToParent(n.children)) {
                return true;
              }
            }
            return false;
          };
          addToParent(state.nodes);
        }
      }),

    updateNode: (nodeId, updates) =>
      set((state) => {
        const updateNodeRecursive = (nodes: TreeNode[]): boolean => {
          for (const node of nodes) {
            if (node.id === nodeId) {
              Object.assign(node, updates);
              return true;
            }
            if (node.children && updateNodeRecursive(node.children)) {
              return true;
            }
          }
          return false;
        };
        updateNodeRecursive(state.nodes);
      }),

    removeNode: (nodeId) =>
      set((state) => {
        const removeFromArray = (nodes: TreeNode[]): boolean => {
          for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].id === nodeId) {
              nodes.splice(i, 1);
              return true;
            }
            if (nodes[i].children && removeFromArray(nodes[i].children!)) {
              return true;
            }
          }
          return false;
        };
        removeFromArray(state.nodes);
        
        // 선택된 노드가 삭제된 경우 선택 해제
        if (state.selectedNodeId === nodeId) {
          state.selectedNodeId = null;
        }
      }),

    moveNode: (nodeId, newParentId) =>
      set((state) => {
        let nodeToMove: TreeNode | null = null;
        
        // 노드 찾기 및 제거
        const findAndRemove = (nodes: TreeNode[]): boolean => {
          for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].id === nodeId) {
              nodeToMove = nodes[i];
              nodes.splice(i, 1);
              return true;
            }
            if (nodes[i].children && findAndRemove(nodes[i].children!)) {
              return true;
            }
          }
          return false;
        };
        
        if (findAndRemove(state.nodes) && nodeToMove) {
          // 새 위치에 추가
          if (newParentId === null) {
            state.nodes.push(nodeToMove);
          } else {
            const addToParent = (nodes: TreeNode[]): boolean => {
              for (const n of nodes) {
                if (n.id === newParentId) {
                  if (!n.children) n.children = [];
                  n.children.push(nodeToMove!);
                  return true;
                }
                if (n.children && addToParent(n.children)) {
                  return true;
                }
              }
              return false;
            };
            addToParent(state.nodes);
          }
        }
      }),
  }))
); 