'use client';

import { useEffect, useState } from "react";
import { extQst, Qst, useQstAnswerStore, useQstListStore } from "../../store/QstAnswerModel";
import { Dialog, DialogTitle, DialogContent, TableContainer, TextField, Button, DialogActions, Stack, Box } from "@mui/material";
import QstTypeCombo from "../common/QstTypeCombo";




interface Props {
  open: boolean;
  onClose: () => void;
}

export default function QstAnsFormDialog({ open, onClose }: Props) {

  // 상태 가져오기
  const { qstList, selectedQst, selectQst, saveQst } = useQstListStore()

  const { qstList: poolQstData, qstInfo, setQstInfo, setQMBody, addAns, delAns, setAnsBody } = useQstAnswerStore();


  const [qstForm, setQstForm] = useState<extQst>({
    qstId: 0,
    qstType: '',
    qstTypeName: '',
    qstBody: '',
    qstScore: 0,
    answers: [],
  });

  useEffect(() => {
    if (selectedQst) {
      setQstInfo(selectedQst as extQst);

      let qstid = selectedQst.qstId;
      let qst = poolQstData.find(qst => qst.qstId === qstid);
      if (qst) setQstInfo(qst as extQst); 
    } else {
      setQstInfo({ qstId: 0, qstType: '', qstTypeName: '', qstBody: '', qstScore: 0, answers: [
        { answerId: 0, answerBody: '', correctAnswerYn: 'N' },
      ] });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setQstForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    saveQst(qstForm);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 3, p: 1, bgcolor: 'grey.50' } }}>
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 700, fontSize: 22, letterSpacing: 1, pb: 1 }}>
        {qstForm.qstId > 0 ? '문항 수정new' : '문항 등록new'}
      </DialogTitle>
      <DialogContent sx={{ px: 4, py: 2, bgcolor: 'grey.50' }}>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {/* 문항 ID는 수정 시 비활성화 */}
          <TextField label="문항 ID" name="qstId" value={qstForm.qstId} onChange={handleChange} fullWidth size="small" InputLabelProps={{ shrink: true }} disabled={!!qstForm.qstId} />
          <Box>
            <QstTypeCombo />
          </Box>
          <TextField label="문항 타입명" name="qstTypeName" value={qstForm.qstTypeName} onChange={handleChange} fullWidth size="small" InputLabelProps={{ shrink: true }} required />
          <TextField label="문항 내용" name="qstBody" value={qstForm.qstBody} onChange={handleChange} fullWidth size="small" InputLabelProps={{ shrink: true }} required multiline minRows={2} />
          <TextField label="문항 점수" name="qstScore" value={qstForm.qstScore} onChange={handleChange} fullWidth size="small" InputLabelProps={{ shrink: true }} required type="number" inputProps={{ min: 0 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextField label="답보기" name="qstAnswer" value={qstForm.qstBody} onChange={handleChange} size="small" sx={{ flex: 1 }} />
            <Button variant="contained" color="primary">추가</Button>
            <Button variant="outlined" color="error">삭제</Button>
          </Box>
          <Box sx={{ bgcolor: 'grey.100', borderRadius: 1, p: 1, fontSize: 13, color: 'grey.700' }}>
            선택문항: {JSON.stringify(qstForm, null, 2)}
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'flex-end', px: 3, pb: 2, pt: 1 }}>
        <Button onClick={onClose} variant="outlined" color="inherit" sx={{ minWidth: 90 }}>
          취소
        </Button>
        <Button onClick={handleSubmit} variant="contained" sx={{ minWidth: 90, ml: 1 }}>
          저장
        </Button>
      </DialogActions>
    </Dialog>
  );
}
