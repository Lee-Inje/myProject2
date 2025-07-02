// app/form/formStore.ts
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { extQst, Qst, QstType } from '../model/QstListDetailType'
import { GridColDef } from '@mui/x-data-grid';

// 문항타입 목록
const qstTypeJsonData = [
    { code: 'qstRadio', text: '라디오버튼' },
    { code: 'qstCheck', text: '체크박스스' },
    { code: 'qstText', text: '단답형' },
]

// 상태 타입
interface QstTypeState {
    qstTypes: QstType[]
    selectedQstType: string
    selectedQstText: string
    setQstTypes: (list: QstType[]) => void
    setSelectedQstType: (code: string) => void
    setSelectedQstText: (text: string) => void
}

// Zustand + Immer 스토어 생성
export const useQstTypeStore = create<QstTypeState>()(
    immer((set) => ({
        qstTypes: qstTypeJsonData,
        selectedQstType: '',
        selectedQstText: '',
        setQstTypes: (list) => set((state) => { state.qstTypes = list }),
        setSelectedQstType: (code) => set((state) => { state.selectedQstType = code }),
        setSelectedQstText: (text) => set((state) => { state.selectedQstText = text }),
    }))
)


const qstAnswerJsonData: extQst[] = [
    { qstId: 100, qstType: 'qstRadio', qstTypeName: '라디오버튼', qstBody: '문항1:라디오버튼 문항으로 적절한것은?', qstScore: 10, answers: [
        { answerId: 100, answerBody: '답변1', correctAnswerYn: 'Y' },
        { answerId: 200, answerBody: '답변2', correctAnswerYn: 'N' },
        { answerId: 300, answerBody: '답변3', correctAnswerYn: 'N' },
    ] },
    { qstId: 200, qstType: 'qstCheck', qstTypeName: '체크박스스', qstBody: '문항2:체크박스스 문항으로 적절한것은?', qstScore: 20, answers: [
        { answerId: 100, answerBody: '답변1', correctAnswerYn: 'Y' },
        { answerId: 200, answerBody: '답변2', correctAnswerYn: 'N' },
    ] },
    { qstId: 300, qstType: 'qstText', qstTypeName: '단답형', qstBody: '문항3:단답형 문항으로 적절하게 작성하세요.', qstScore: 30, answers: [
        { answerId: 100, answerBody: '답변1', correctAnswerYn: 'Y' },
        { answerId: 200, answerBody: '답변2', correctAnswerYn: 'N' },
    ] },    
]

// 문항 목록
const qstListJsonData: Qst[] = [
    { qstId: 100, qstType: 'qstRadio', qstTypeName: '라디오버튼', qstBody: '문항1:라디오버튼 문항으로 적절한것은?', qstScore: 10 },
    { qstId: 200, qstType: 'qstCheck', qstTypeName: '체크박스스', qstBody: '문항2:체크박스스 문항으로 적절한것은?', qstScore: 20 },
    { qstId: 300, qstType: 'qstText', qstTypeName: '단답형', qstBody: '문항3:단답형 문항으로 적절하게 작성하세요.', qstScore: 30 },
]
// 문항 목록 컬럼 타이틀틀
const columnsJsonData = [
    { field: 'qstId', headerName: '문항ID', width: 50 },
    { field: 'qstType', headerName: '문항타입코드', width: 100 },
    { field: 'qstTypeName', headerName: '문항타입명', width: 100 },
    { field: 'qstBody', headerName: '문항내용', width: 200 },
    { field: 'qstScore', headerName: '점수', width: 50 },
  ];



interface QstListState {
    qstList: Qst[];
    columns: GridColDef[];
    selectedQst: Qst | null;
    dialogOpen: boolean;
    setDialogOpen: (open: boolean) => void;
    selectQst: (qst: Qst | null) => void;
    delQst: (qstId: number) => void;
    chkDelQst: (qstId: number[]) => void;
    saveQst: (qst: Qst) => void;
}

export const useQstListStore = create<QstListState>()(
    immer((set) => ({
        qstList: qstAnswerJsonData,  //qstListJsonData,
        columns: columnsJsonData,
        selectedQst: null,
        dialogOpen: false,
        setDialogOpen: (open: boolean) => set({ dialogOpen: open }),
        selectQst: (qst) => set({ selectedQst: qst }),
        delQst: (qstId: number) => set((state) => { 
            if (confirm( '[' + qstId + ']문항을 삭제하시겠습니까?')) {
                state.qstList = state.qstList.filter(qst => qst.qstId !== qstId);
                state.selectedQst = null;
            }
        }),
        chkDelQst: (qstId: number[]) => set((state) => { 
            console.log('chkDelQst qstId:', qstId);
            if (confirm( '[' + qstId.length + ']개의 문항을 삭제하시겠습니까?')) {
                state.qstList = state.qstList.filter(qst => !qstId.includes(qst.qstId)) 
            }
        }),
        saveQst: (qst: Qst) => set((state) => {
            // 문항 추가 로직 구현
            // qstId가 0이면 신규, 아니면 수정
            if (qst.qstId === 0) {
                // 신규 문항: 가장 큰 qstId + 100 (혹은 1)로 새 id 부여
                const maxId = state.qstList.length > 0 ? Math.max(...state.qstList.map(item => item.qstId)) : 0;
                const newQst = { ...qst, qstId: maxId + 100 };
                state.qstList.push(newQst);
                state.selectedQst = newQst;
            } else {
                // 기존 문항 수정
                const idx = state.qstList.findIndex(item => item.qstId === qst.qstId);
                if (idx !== -1) {
                    state.qstList[idx] = { ...qst };
                    state.selectedQst = { ...qst };
                }
            }
        }),
    }))
)




