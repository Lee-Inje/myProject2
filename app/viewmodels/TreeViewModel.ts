import { useTreeStore, TreeNode } from '../store/TreeViewModel';

export class TreeViewModel {
  // store 상태를 매번 새로 가져오도록 수정
  private get store() {
    return useTreeStore.getState();
  }

  // 데이터 접근자
  get nodes(): TreeNode[] {
    return this.store.nodes;
  }

  get selectedNodeId(): string | null {
    return this.store.selectedNodeId;
  }

  get expandedNodes(): Set<string> {
    return this.store.expandedNodes;
  }

  // 노드 확장/축소 상태 관리
  isNodeExpanded(nodeId: string): boolean {
    return this.store.expandedNodes.includes(nodeId);
  }

  toggleNode(nodeId: string): void {
    this.store.toggleNode(nodeId);
  }

  expandAll(): void {
    this.store.expandAll();
  }

  collapseAll(): void {
    this.store.collapseAll();
  }

  // 노드 선택 관리
  isNodeSelected(nodeId: string): boolean {
    return this.store.selectedNodeId === nodeId;
  }

  selectNode(nodeId: string): void {
    this.store.setSelectedNode(nodeId);
  }

  // 노드 조작
  hasChildren(node: TreeNode): boolean {
    return !!(node.children && node.children.length > 0);
  }

  getNodeById(nodeId: string): TreeNode | undefined {
    const findNode = (nodes: TreeNode[]): TreeNode | undefined => {
      for (const node of nodes) {
        if (node.id === nodeId) return node;
        if (node.children) {
          const found = findNode(node.children);
          if (found) return found;
        }
      }
      return undefined;
    };
    return findNode(this.store.nodes);
  }

  getNodePath(nodeId: string): TreeNode[] {
    const path: TreeNode[] = [];
    const findPath = (nodes: TreeNode[], targetId: string): boolean => {
      for (const node of nodes) {
        path.push(node);
        if (node.id === targetId) {
          return true;
        }
        if (node.children && findPath(node.children, targetId)) {
          return true;
        }
        path.pop();
      }
      return false;
    };
    findPath(this.store.nodes, nodeId);
    return path;
  }

  addFolder(parentId: string | null, name: string): void {
    const newNode: TreeNode = {
      id: `node_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      type: 'folder',
      children: [],
    };

    this.store.addNode(parentId, newNode);
  }

  addFile(parentId: string, name: string): void {
    const newNode: TreeNode = {
      id: `node_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      type: 'file',
    };

    this.store.addNode(parentId, newNode);
  }

  updateNodeName(nodeId: string, newName: string): void {
    this.store.updateNode(nodeId, { name: newName });
  }

  removeNode(nodeId: string): void {
    this.store.removeNode(nodeId);
  }

  // 유틸리티 메서드
  getNodeDepth(nodeId: string): number {
    return this.getNodePath(nodeId).length - 1;
  }

  getSiblingNodes(nodeId: string): TreeNode[] {
    const path = this.getNodePath(nodeId);
    if (path.length <= 1) {
      return this.store.nodes;
    }
    const parent = path[path.length - 2];
    return parent.children || [];
  }

  canMoveNode(nodeId: string, targetParentId: string): boolean {
    if (nodeId === targetParentId) return false;
    
    const targetPath = this.getNodePath(targetParentId);
    const nodePath = this.getNodePath(nodeId);
    
    // 자기 자신의 하위로 이동할 수 없음
    return !nodePath.some(node => node.id === targetParentId);
  }

  // 노드 이동 (선택적 기능)
  moveNode(nodeId: string, newParentId: string | null): void {
    this.store.moveNode(nodeId, newParentId);
  }

  // 노드 복사 (선택적 기능)
  copyNode(nodeId: string, newParentId: string): void {
    const node = this.getNodeById(nodeId);
    if (node) {
      const newNode: TreeNode = {
        ...node,
        id: `node_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: `${node.name} (복사본)`,
      };
      this.store.addNode(newParentId, newNode);
    }
  }
} 