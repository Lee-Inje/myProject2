import React from 'react'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { GridColDef } from "@mui/x-data-grid"


// 문항 타입 : 콤보박스
export interface QstType {
    code: string,
    text: string
}

// 문항 정보
export interface Qst {
    qstId: number,
    qstType: string,
    qstTypeName: string,
    qstBody: string,
    qstScore: number,
}

// 객관식 답안정보
export interface Answer {
    answerId: number,
    answerBody: string,
}

// 객관식 답안정보 확장
export interface extAnswer extends Answer {
    correctAnswerYn : 'Y' | 'N'
}

// 주관식 답안정보
// export interface AnswerText {
//     answerText: string,
// }

// 문항, 답안 정보 객관식식
export interface extQst extends Qst {
    answers: extAnswer[]
}

// 문항 확장 : 주관식식
export interface extQstText extends Qst {
    answerText: string,
}


// 문항타입 목록
const qstTypeJsonData = [
    { code: 'qstRadio', text: '라디오버튼문항' },
    { code: 'qstCheck', text: '체크박스문항' },
    { code: 'qstText', text: '단답형' },
]

// 문항 목록
const qstListJsonData: Qst[] = [
    { qstId: 100, qstType: 'qstRadio', qstTypeName: '라디오버튼문항', qstBody: '문항1:라디오버튼 문항으로 적절한것은?', qstScore: 10 },
    { qstId: 200, qstType: 'qstCheck', qstTypeName: '체크박스문항', qstBody: '문항2:체크박스스 문항으로 적절한것은?', qstScore: 20 },
    { qstId: 300, qstType: 'qstText', qstTypeName: '단답형', qstBody: '문항3:단답형 문항으로 적절하게 작성하세요.', qstScore: 30 },
]


const qstAnswerTextJsonData: extQstText = {
    qstId: 100, qstType: 'qstRadio', qstTypeName: '단답형', qstBody: '단답형 문항으로 적절하게 작성하세요.', qstScore: 10, 
    answerText: '주관식 정답'
}


const qstChoiceJsonData: extQst[] = [
    { qstId: 100, qstType: 'qstRadio', qstTypeName: '라디오버튼문항', qstBody: '문항1:라디오버튼 문항으로 적절한것은?', qstScore: 10, answers: [
        { answerId: 100, answerBody: '답변1', correctAnswerYn: 'Y' },
        { answerId: 200, answerBody: '답변2', correctAnswerYn: 'N' },
        { answerId: 300, answerBody: '답변3', correctAnswerYn: 'N' },
    ] },
    { qstId: 200, qstType: 'qstCheck', qstTypeName: '체크박스문항', qstBody: '문항2:체크박스스 문항으로 적절한것은?', qstScore: 20, answers: [
        { answerId: 100, answerBody: '답변1', correctAnswerYn: 'Y' },
        { answerId: 200, answerBody: '답변2', correctAnswerYn: 'N' },
    ] },
    { qstId: 300, qstType: 'qstText', qstTypeName: '단답형', qstBody: '문항3:단답형 문항으로 적절하게 작성하세요.', qstScore: 30, answers: [
        { answerId: 100, answerBody: '답변1', correctAnswerYn: 'Y' },
        { answerId: 200, answerBody: '답변2', correctAnswerYn: 'N' },
    ] },    
]

const qstAnswerJsonData: extQst = {
    qstId: 300, qstType: 'qstText', qstTypeName: '라디오버튼문항', qstBody: '라디오버튼 문항으로 적절한것은?', qstScore: 30, 
    answers: [
        { answerId: 100, answerBody: '답변1', correctAnswerYn: 'Y' },
        { answerId: 200, answerBody: '답변2', correctAnswerYn: 'N' },
        { answerId: 300, answerBody: '답변3', correctAnswerYn: 'N' },
    ] 
}

// 문항 목록 컬럼 타이틀

// columnsJsonData 타입 정의
const columnsJsonData: GridColDef[] = [
    { field: 'qstId', headerName: '문항ID', width: 50 },
    { field: 'qstType', headerName: '문항타입코드', width: 100 },
    { field: 'qstTypeName', headerName: '문항타입명', width: 100 },
    { field: 'qstBody', headerName: '문항내용', width: 200 },
    { field: 'qstScore', headerName: '점수', width: 50 },
  ];



//   const qstAnswerJsonData2: Qst = {
//     qstId: 300, qstType: 'qstText', qstTypeName: '라디오버튼문항', qstBody: '라디오버튼 문항으로 적절한것은?', qstScore: 30, 
// }

//   interface TestDataState {
//     listData : extQst[],
//     qstData : Qst
//   }

//   export const useTestStore = create<TestDataState>()(
//     immer(() => ({
//         listData:qstChoiceJsonData,
//         qstData:qstAnswerJsonData2
//     }))

//   )


// 문항타입 콤보
interface QstTypeState {
    qstTypes: QstType[]
    selectedQstType: string
    selectedQstText: string
    setQstTypes: (list: QstType[]) => void
    setSelectedQstType: (code: string) => void
    setSelectedQstText: (text: string) => void
    reset: () => void
}

// 문항타입 콤보 Zustand + Immer 스토어 생성
export const useQstTypeStore = create<QstTypeState>()(
    immer((set) => ({
        qstTypes: qstTypeJsonData,
        selectedQstType: '',
        selectedQstText: '',
        setQstTypes: (list) => set((state) => { state.qstTypes = list }),
        setSelectedQstType: (code) => set((state) => { state.selectedQstType = code }),
        setSelectedQstText: (text) => set((state) => { state.selectedQstText = text }),
        reset: () => set((state) => {
            state.qstTypes = [];
            state.selectedQstType = '';
            state.selectedQstText = '';
        })
    }))
)



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
        qstList: qstListJsonData,
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



interface QstAnswerState {
    qstList: extQst[];
    qstInfo: extQst;
    setQstInfo: (qst: extQst) => void;
    setQMBody: (body: string) => void;
    addAns: () => void;
    delAns: (idx: number) => void;
    setAnsBody: (idx: number , text: string ) => void;
}

export const useQstAnswerStore = create<QstAnswerState>()(
    immer((set) => ({
        qstList: qstChoiceJsonData,
        qstInfo: { qstId: 0, qstType: '', qstTypeName: '', qstBody: '', qstScore: 0, answers: [] },
        setQstInfo: (qst: extQst) => set((state) => { state.qstInfo = qst }),
        setQMBody: (body: string) => set((state) => { state.qstInfo.qstBody = body }),
        addAns: () => set((state) => { state.qstInfo.answers.push({ answerId: 0, answerBody: '', correctAnswerYn: 'Y' }) }),
        delAns: (idx: number) => set((state) => { state.qstInfo.answers.splice(idx, 1) }),
        setAnsBody: (idx: number, text: string) => set((state) => { state.qstInfo.answers[idx].answerBody = text }),
    })) 
)   