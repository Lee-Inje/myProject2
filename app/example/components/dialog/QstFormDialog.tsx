'use client';

import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Stack,
  TableContainer
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useQstListStore, useQstTypeStore } from '../../store/qstStore';
import { Qst } from '../../model/QstListDetailType';
import QstTypeSelectBox from '../common/QstTypeSelectBox';


interface Props {
  open: boolean;
  onClose: () => void;
}

export default function QstFormDialog({ open, onClose }: Props) {

  // 상태 가져오기
  const { qstList, selectedQst, selectQst, saveQst } = useQstListStore()

  const [qstForm, setQstForm] = useState<Qst>({
    qstId: 0,
    qstType: '',
    qstTypeName: '',
    qstBody: '',
    qstScore: 0,
  });

  useEffect(() => {
    if (selectedQst) setQstForm(selectedQst);
    else setQstForm({ qstId: 0, qstType: '', qstTypeName: '', qstBody: '', qstScore: 0 });
  }, [selectedQst]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setQstForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    saveQst(qstForm);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{qstForm.qstId ? '문항 수정' : '문항 등록'}</DialogTitle>
      <DialogContent>
      <TableContainer> 
        <table style={{ minWidth: '100%', borderSpacing: '0 12px' }} >
            <tbody>
              <tr style={{ display: 'none' }}>
                <td width="70px" style={{ paddingRight: '16px', verticalAlign: 'top' }}>문항 ID</td>
                <td width="100%"><TextField label="문항 ID" name="qstId" value={qstForm.qstId} onChange={handleChange} fullWidth /></td>
              </tr>
              <tr>
                <td style={{ paddingRight: '16px', verticalAlign: 'top' }}>문항 타입</td>
                <td><QstTypeSelectBox /></td>
              </tr>
              <tr>
                <td style={{ paddingRight: '16px', verticalAlign: 'top' }}>문항 타입명</td>
                <td><TextField label="문항 타입명" name="qstTypeName" value={qstForm.qstTypeName} onChange={handleChange} fullWidth /></td>
              </tr> 
              <tr>
                <td style={{ paddingRight: '16px', verticalAlign: 'top' }}>문항 내용</td>
                <td><TextField label="문항 내용" name="qstBody" value={qstForm.qstBody} onChange={handleChange} fullWidth /></td>
              </tr>
              <tr>
                <td style={{ paddingRight: '16px', verticalAlign: 'top' }}>문항 점수</td>
                <td><TextField label="문항 점수" name="qstScore" value={qstForm.qstScore} onChange={handleChange} fullWidth /></td>
              </tr>
              <tr>
                <td style={{ paddingRight: '16px', verticalAlign: 'top' }}>답보기</td>
                <td>
                  <TextField label="답보기" name="qstAnswer" value={qstForm.qstBody} onChange={handleChange} style={{ paddingRight: '16px' }} />
                  <Button variant="contained" color="primary" style={{ marginRight: '5px' }}>추가</Button>
                  <Button variant="contained" color="primary">삭제</Button>
                </td>
              </tr>

            </tbody>
          </table>
      </TableContainer>






        {/* <Stack spacing={2} sx={{ mt: 2 }}>
          <TextField label="문항 ID" name="qstId" value={qstForm.qstId} onChange={handleChange} fullWidth />
          <TextField label="문항 타입" name="qstType" value={qstForm.qstType} onChange={handleChange} fullWidth />
          <TextField label="문항 타입명" name="qstTypeName" value={qstForm.qstTypeName} onChange={handleChange} fullWidth />
          <TextField label="문항 내용" name="qstBody" value={qstForm.qstBody} onChange={handleChange} fullWidth />
          <TextField label="문항 점수" name="qstScore" value={qstForm.qstScore} onChange={handleChange} fullWidth />
          <QstTypeSelectBox />
 
          <p>선택문항: {JSON.stringify(qstForm, null, 2)}</p>
        </Stack> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button onClick={handleSubmit} variant="contained">저장</Button>
      </DialogActions>
    </Dialog>
  );
}
