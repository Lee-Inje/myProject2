// 문항 타입
export interface QstType {
    code: string
    text: string
}

{/* // 문항 목록
// export interface QstList {
//     qstId: number,
//     qstType: string,
//     qstTypeName: string,
//     qstBody: string,
//     qstScore: number,
// }*/}


// 문항
export interface Qst {
    qstId: number,
    qstType: string,
    qstTypeName: string,
    qstBody: string,
    qstScore: number,
}

// 답변
export interface Answer {
    answerId: number,
    answerBody: string,
}

// 문항 확장 : 선택형
export interface extQst extends Qst {
    answers: extAnswer[]
}

// 문항 확장 : 주관식식
export interface extQstText extends Qst {
    answerText: string
}


// 답변 확장
export interface extAnswer extends Answer {
    correctAnswerYn : 'Y' | 'N'
}

