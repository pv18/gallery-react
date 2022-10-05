import VirtualSelect from './VirtualSelect';
import TextField from '@mui/material/TextField';

const AlbumSelect = (props:any) => {
    return (
        <VirtualSelect
            sx={{width: 300}}
            renderInput={(params) => <TextField {...params} label={'Album id'}/>}
            renderOption={(props, option) => [props, option]}
            renderGroup={(params) => params}
            {...props}
        />
    );
}

export default AlbumSelect
