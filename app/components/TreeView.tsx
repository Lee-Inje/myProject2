'use client';

import React, { useState, useCallback, useEffect } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
  Typography,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Menu,
  MenuItem
} from '@mui/material';
import {
  ExpandMore,
  ExpandLess,
  Folder,
  InsertDriveFile,
  MoreVert,
  Add,
  Delete,
  Edit
} from '@mui/icons-material';
import { useTreeStore, TreeNode } from '../store/treeStore';

interface TreeItemProps {
  node: TreeNode;
  level: number;
}

const TreeItem: React.FC<TreeItemProps> = ({ node, level }) => {
  const { 
    expandedNodes, 
    selectedNodeId, 
    toggleNode, 
    setSelectedNode, 
    addNode, 
    updateNode, 
    removeNode 
  } = useTreeStore();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(node.name);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemType, setNewItemType] = useState<'folder' | 'file'>('folder');

  const isExpanded = expandedNodes.includes(node.id);
  const isSelected = selectedNodeId === node.id;
  const hasChildren = node.children && node.children.length > 0;

  useEffect(() => {
    setEditName(node.name);
  }, [node.name]);

  const handleToggle = useCallback(() => {
    if (node.type === 'folder') {
      toggleNode(node.id);
    }
  }, [node.id, node.type, toggleNode]);

  const handleSelect = useCallback(() => {
    setSelectedNode(node.id);
  }, [node.id, setSelectedNode]);

  const handleContextMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
    setEditName(node.name);
    handleCloseMenu();
  }, [node.name, handleCloseMenu]);

  const handleSaveEdit = useCallback(() => {
    if (editName.trim() && editName !== node.name) {
      updateNode(node.id, { name: editName.trim() });
    }
    setIsEditing(false);
  }, [editName, node.id, node.name, updateNode]);

  const handleCancelEdit = useCallback(() => {
    setIsEditing(false);
    setEditName(node.name);
  }, [node.name]);

  const handleDelete = useCallback(() => {
    removeNode(node.id);
    handleCloseMenu();
  }, [node.id, removeNode, handleCloseMenu]);

  const handleAddItem = useCallback(() => {
    setShowAddDialog(true);
    handleCloseMenu();
  }, [handleCloseMenu]);

  const handleSaveAddItem = useCallback(() => {
    if (newItemName.trim()) {
      const newNode: TreeNode = {
        id: `node_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: newItemName.trim(),
        type: newItemType,
        ...(newItemType === 'folder' && { children: [] })
      };

      addNode(node.id, newNode);
      setShowAddDialog(false);
      setNewItemName('');
      setNewItemType('folder');
    }
  }, [newItemName, newItemType, node.id, addNode]);

  const handleCancelAddItem = useCallback(() => {
    setShowAddDialog(false);
    setNewItemName('');
    setNewItemType('folder');
  }, []);

  const handleMenuClick = useCallback((handler: () => void) => {
    return () => {
      handler();
      handleCloseMenu();
    };
  }, [handleCloseMenu]);

  return (
    <>
      <ListItem
        disablePadding
        sx={{
          pl: level * 2,
          '&:hover .tree-item-actions': {
            opacity: 1,
          },
        }}
      >
        <ListItemButton
          selected={isSelected}
          onClick={handleSelect}
          onDoubleClick={handleToggle}
          onContextMenu={handleContextMenu}
          sx={{
            minHeight: 40,
            '&.Mui-selected': {
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 36 }}>
            {node.type === 'folder' ? (
              <Folder color={isExpanded ? 'primary' : 'inherit'} />
            ) : (
              <InsertDriveFile />
            )}
          </ListItemIcon>

          {isEditing ? (
            <TextField
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleSaveEdit();
                if (e.key === 'Escape') handleCancelEdit();
              }}
              onBlur={handleSaveEdit}
              autoFocus
              size="small"
              sx={{ flex: 1, mr: 1 }}
            />
          ) : (
            <ListItemText
              primary={node.name}
              primaryTypographyProps={{
                fontSize: '0.875rem',
                fontWeight: isSelected ? 'bold' : 'normal',
              }}
            />
          )}

          <Box
            className="tree-item-actions"
            sx={{
              opacity: 0,
              transition: 'opacity 0.2s',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {node.type === 'folder' && (
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggle();
                }}
              >
                {isExpanded ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            )}

            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handleContextMenu(e);
              }}
            >
              <MoreVert />
            </IconButton>
          </Box>
        </ListItemButton>
      </ListItem>

      {node.type === 'folder' && (
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {node.children?.map((child) => (
              <TreeItem
                key={child.id}
                node={child}
                level={level + 1}
              />
            ))}
          </List>
        </Collapse>
      )}

      {/* 컨텍스트 메뉴 */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        {node.type === 'folder' && (
          <MenuItem onClick={handleMenuClick(handleAddItem)}>
            <Add sx={{ mr: 1 }} />
            새 폴더/파일 추가
          </MenuItem>
        )}
        <MenuItem onClick={handleMenuClick(handleEdit)}>
          <Edit sx={{ mr: 1 }} />
          이름 변경
        </MenuItem>
        <MenuItem onClick={handleMenuClick(handleDelete)} sx={{ color: 'error.main' }}>
          <Delete sx={{ mr: 1 }} />
          삭제
        </MenuItem>
      </Menu>

      {/* 새 아이템 추가 다이얼로그 */}
      <Dialog open={showAddDialog} onClose={handleCancelAddItem} maxWidth="sm" fullWidth>
        <DialogTitle>새 {newItemType === 'folder' ? '폴더' : '파일'} 추가</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="이름"
            fullWidth
            variant="outlined"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleSaveAddItem();
            }}
          />
          <Box sx={{ mt: 2 }}>
            <Button
              variant={newItemType === 'folder' ? 'contained' : 'outlined'}
              onClick={() => setNewItemType('folder')}
              sx={{ mr: 1 }}
            >
              폴더
            </Button>
            <Button
              variant={newItemType === 'file' ? 'contained' : 'outlined'}
              onClick={() => setNewItemType('file')}
            >
              파일
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelAddItem}>취소</Button>
          <Button onClick={handleSaveAddItem} variant="contained">
            추가
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default function TreeView() {
  const { 
    nodes, 
    selectedNodeId, 
    expandAll, 
    collapseAll, 
    addNode 
  } = useTreeStore();

  const handleExpandAll = useCallback(() => {
    expandAll();
  }, [expandAll]);

  const handleCollapseAll = useCallback(() => {
    collapseAll();
  }, [collapseAll]);

  const handleAddRootItem = useCallback(() => {
    const newNode: TreeNode = {
      id: `node_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: '새 폴더',
      type: 'folder',
      children: [],
    };
    addNode(null, newNode);
  }, [addNode]);

  const getSelectedNodeName = useCallback(() => {
    if (!selectedNodeId) return '';
    
    const findNode = (nodes: TreeNode[]): string => {
      for (const node of nodes) {
        if (node.id === selectedNodeId) return node.name;
        if (node.children) {
          const found = findNode(node.children);
          if (found) return found;
        }
      }
      return '';
    };
    
    return findNode(nodes);
  }, [selectedNodeId, nodes]);

  return (
    <Paper sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Button
          variant="outlined"
          size="small"
          onClick={handleExpandAll}
          startIcon={<ExpandMore />}
        >
          모두 펼치기
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={handleCollapseAll}
          startIcon={<ExpandLess />}
        >
          모두 접기
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={handleAddRootItem}
          startIcon={<Add />}
        >
          루트 폴더 추가
        </Button>
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <List>
          {nodes.map((node) => (
            <TreeItem
              key={node.id}
              node={node}
              level={0}
            />
          ))}
        </List>
      </Box>

      {selectedNodeId && (
        <Box sx={{ mt: 2, p: 1, bgcolor: 'grey.100', borderRadius: 1 }}>
          <Typography variant="caption" color="text.secondary">
            선택된 항목: {getSelectedNodeName()}
          </Typography>
        </Box>
      )}
    </Paper>
  );
} 