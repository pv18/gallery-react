import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Photo} from '../types/shared';
import {styled} from '@mui/material';

type Props = {
    image: Photo | null
    onClose: () => void
}

const Image = styled('img')({
    width: '100%',
    height: 'calc(100vh - 64px)',
    objectFit: 'cover'
})

const PhotoModal = ({image,onClose}: Props) => {
    const handleClose = () => {
        onClose()
    };

    return (
        <Dialog
            fullScreen
            open={!!image}
            onClose={handleClose}
        >
            <AppBar sx={{position: 'relative'}}>
                <Toolbar sx={{display: 'flex', justifyContent: 'flex-end'}}>
                    <IconButton
                        color="inherit"
                        onClick={handleClose}
                    >
                        <CloseIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Image src={image?.url} alt={'props.image?.title'} loading={'lazy'}/>
        </Dialog>
    );
}

export default PhotoModal


