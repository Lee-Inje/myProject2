import { DataGrid, GridRenderCellParams, GridRowParams } from "@mui/x-data-grid";
import { Qst, useQstListStore } from "../store/QstAnswerModel"
    import { Box, Button, Container, Typography } from "@mui/material";
import QstAnsFormDialog from "./dialog/QstAnsFormDialog";

export default function QstList() {
    // 상태 가져오기
    const { qstList, columns, selectedQst, dialogOpen, setDialogOpen, selectQst, delQst, chkDelQst } = useQstListStore();

    // 옵션에 따른 버튼추가 기능 추가(삭제,수정 등등등 의 버튼들.... )
    const addColumns = [
        ...columns,
        {
            field: "edit",
            headerName: "수정",
            width: 80,
            sortable: false,
            filterable: false,
            renderCell: (params: GridRenderCellParams) => (
                <Button
                    color="primary"
                    size="small"
                    onClick={() => {
                        console.log('수정버튼 클릭 :', params.row);
                        selectQst(params.row as Qst);
                        setDialogOpen(true);
                    }}
                >
                    수정
                </Button>
            ),
        },
        {
            field: "delete",
            headerName: "삭제",
            width: 80,
            sortable: false,
            filterable: false,
            renderCell: (params: GridRenderCellParams) => (
                <Button
                    color="secondary"
                    size="small"
                    onClick={() => delQst(params.row.qstId)}
                >
                    삭제
                </Button>
            ),
        },
    ];
      
    // 행 클릭 이벤트: 콘솔 출력만
    const handleRowClick = (params: GridRowParams) => {
        console.log('Row clicked:', params.row);
        selectQst(params.row as Qst);
        setDialogOpen(true);
        //delQst(params.row.qstId);
    };

    
    return (
        <Container sx={{ mt: 4, width: '100%' }}>


        <Box
        sx={{
            maxWidth: 1000, // 최대 너비
            mx: 'auto', // 가운데 정렬
            p: 4, // 패딩
            display: 'flex',
            flexDirection: 'column',
            gap: 3, // 각 요소 사이 간격
        }}
        >
            <Typography variant="h6">문항 목록</Typography>


            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button variant="contained" onClick={() => { selectQst(null); setDialogOpen(true); }} color="primary" size="small">
                    신규 문항 등록
                </Button>
                <Button variant="contained" onClick={() => { alert('선택 삭제');  }} color="error" size="small">
                    선택 삭제
                </Button>
            </Box>


            <Box sx={{ height: 400, width: '100%' }}>



                <DataGrid
                    rows={qstList}
                    columns={addColumns}
                    pageSizeOptions={[5, 10, 20]}
                    initialState={{ 
                        pagination: { 
                            paginationModel: { pageSize: 5 } 
                        } 
                    }}
                    // getRowId는 각 행(row)의 고유 식별자를 지정하는 함수입니다.
                    // DataGrid는 기본적으로 row의 'id' 필드를 사용하지만,
                    // 데이터에 'id'가 없고 다른 필드(예: qstId)를 고유키로 쓸 때 getRowId를 지정합니다.
                    // 아래처럼 설정하면 각 row의 qstId가 고유키로 사용됩니다.
                    getRowId={(row) => row.qstId}
                    // 예시: row 데이터가 { qstId: 100, ... } 이면, 해당 row의 id는 100이 됩니다.
                    onRowClick={handleRowClick}
                    
                    // checkboxSelection 옵션을 true로 설정하면 각 행(row) 왼쪽에 체크박스가 표시되어
                    // 여러 행을 동시에 선택할 수 있습니다.
                    // 선택된 행의 id들은 onRowSelectionModelChange 이벤트를 통해 배열로 전달됩니다.
                    checkboxSelection={true}

                    disableRowSelectionOnClick={true}
                    onRowSelectionModelChange={(selectionModel) => {
                        // 체크박스 선택 이벤트 핸들러
                        // selectionModel은 선택된 row의 id 배열
                        console.log('선택된 row:', selectionModel as number[]);

                        //chkDelQst(selectionModel as number[]);
                        // 필요시 상태 업데이트 등 추가 로직 작성
                    }}
                // onRowDoubleClick 사용법 예시
                onRowDoubleClick={(params) => {
                    // params.row에 더블클릭한 행의 데이터가 들어있음
                    console.log('Row double clicked:', params.row);
                    //selectQst(params.row);
                    //setDialogOpen(true);
                }}
                />
                <p>선택문항: {JSON.stringify(selectedQst, null, 2)}</p>
            </Box>
        </Box>
        <QstAnsFormDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </Container>
    )
}   