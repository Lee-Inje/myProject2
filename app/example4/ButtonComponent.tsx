import { Button, Box } from "@mui/material";
import { Inputs } from "./StateViewModel";

interface Props {
    inputs: Inputs;
    handleTextClear: () => void;
    handleAddUser: (inputs: Inputs) => void;
}

export default function ButtonComponent({ inputs, handleTextClear, handleAddUser }: Props) {
    return (
        <Box sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" onClick={() => handleTextClear()}>초기화2</Button> &nbsp;
            <Button variant="contained" color="primary" onClick={() => handleAddUser(inputs)}>추가2</Button>
        </Box>
    );
}
