'use client'
import { Box, Button, Card, Container, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material"
import { useQstTypeStore } from "../../store/QstAnswerModel";





export default function QstTypeCombo() {
  
    // 상태 가져오기
    const { qstTypes, selectedQstType, selectedQstText, setSelectedQstType, setSelectedQstText } = useQstTypeStore()
   
    // 문항타입 선택 핸들러
    const handleChange = (event: SelectChangeEvent) => {
        const selectedCode = event.target.value;
        
        // 선택된 코드에 해당하는 텍스트 찾기
        const selectedType = qstTypes.find(qstType => qstType.code === selectedCode);
        const selectedText = selectedType ? selectedType.text : '';
        
        setSelectedQstType(selectedCode);
        setSelectedQstText(selectedText);
    }


    

  return (
    // <Box
    // sx={{
    //     maxWidth: 800, // 최대 너비
    //     mx: 'auto', // 가운데 정렬
    //     p: 4, // 패딩
    //     display: 'flex',
    //     flexDirection: 'column',
    //     gap: 3, // 각 요소 사이 간격
    // }}
    // >

            <FormControl size="small" sx={{ minWidth: '100%' }}>
                {/* 사용 가능한 사이즈 옵션:
                "small": 작은 사이즈
                "medium": 중간 사이즈 (기본값)
                "large": 큰 사이즈
                다른 사이즈로 변경하고 싶다면:
                size="small" - 더 작게
                size="large" - 더 크게
                또는 minWidth 값을 조정하여 너비를 변경할 수 있습니다:
                sx={{ minWidth: 150 }} - 더 좁게
                sx={{ minWidth: 300 }} - 더 넓게 */}
                <InputLabel id="city-select-label">문항타입 선택</InputLabel>
                <Select
                    labelId="city-select-label"
                    value={selectedQstType}
                    label="문항타입입 선택"
                    onChange={handleChange}
                    size="small"
                >
                    {qstTypes.map((qstType) => (
                    <MenuItem key={qstType.code} value={qstType.code}>
                        {qstType.text}
                    </MenuItem>
                    ))}
                </Select>
                <p>선택된 문항타입 : {selectedQstType} : {selectedQstText}</p>
                {/* <p>문항타입 목록 : {JSON.stringify(qstTypes, null, 2)}</p> */}
            </FormControl>


    // </Box>   
  )

 


}
